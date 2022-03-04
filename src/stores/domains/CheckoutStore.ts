import { Checkout } from "logic/Checkout";
import { cast, flow, types } from "mobx-state-tree";
import { CustomerModel } from "models/CustomerModel";
import { PricingRule } from "models/PricingRule";
import { ProductModel } from "models/ProductModel";
import {
  getCustomers,
  getPricingRules,
  getProducts,
} from "services/data/DataService";
import { StatusEnum } from "stores/enums/StatusEnum";
import { withStatus } from "stores/extensions/with-status";
import { CustomerStoreModel } from "stores/models/CustomerStoreModel";
import { ItemStoreModel } from "stores/models/ItemStoreModel";
import { ProductStoreModel } from "stores/models/ProductStoreModel";
import { v4 as uuidV4 } from "uuid";

export const CheckoutStore = types
  .model("CheckoutStore")
  .extend(withStatus)
  .props({
    products: types.array(ProductStoreModel),
    items: types.array(ItemStoreModel),
    customers: types.array(CustomerStoreModel),
    currentCustomer: types.maybeNull(CustomerStoreModel),
    pricingRules: types.frozen([]),
  })
  .views((self) => ({
    totalAmount() {
      return self.items && self.items.length > 0
        ? self.items
            .map((item) => item.product.retailPrice * item.quantity)
            .reduce((total, current) => total + current)
        : 0;
    },
    finalAmount() {
      if (!self.items) {
        return 0;
      }

      const checkoutProcess = new Checkout(self.pricingRules);
      self.items.forEach((item) => {
        checkoutProcess.add({
          ...item,
          customerId: self.currentCustomer
            ? self.currentCustomer.id
            : "Default",
        });
      });
      return checkoutProcess.total();
    },
  }))
  .actions((self) => ({
    setProducts(products: any) {
      self.products = cast(products);
    },
    setPricingRules(pricingRules: any) {
      self.pricingRules = cast(pricingRules);
    },
    setCustomers(customers: any) {
      self.customers = cast(customers);
    },
    setCurrentCustomer(customer: any) {
      self.currentCustomer = { ...customer };
    },
    addToCart(product: any) {
      try {
        let item = self.items.find((item) => item.product.id === product.id);
        if (!item) {
          self.items.push({
            id: uuidV4(),
            product: product.id,
            quantity: 0,
          });
        } else {
          item.quantity++;
        }
      } catch (err) {
        console.error(err);
      }
    },
    minusFromCart(product: any) {
      try {
        let item = self.items.find((item) => item.product.id === product.id);
        if (item && item.quantity > 0) {
          item.quantity--;
        }
      } catch (err) {
        console.error(err);
      }
    },
  }))
  .actions((self) => ({
    getMenu: flow(function* () {
      self.setStatus(StatusEnum.Handling);

      try {
        const products: ProductModel[] = yield getProducts();
        const pricingRules: PricingRule[] = yield getPricingRules();
        const customers: CustomerModel[] = yield getCustomers();

        self.setProducts(products);
        self.setPricingRules(pricingRules);
        self.setCustomers(customers);
        self.setCurrentCustomer(customers[0]);

        products.forEach((product) => {
          self.addToCart(product);
        });

        self.setStatus(StatusEnum.Success);
      } catch (error) {
        self.setStatus(StatusEnum.Error);
      }
    }),
  }));
