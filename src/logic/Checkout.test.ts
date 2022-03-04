import { Checkout } from "logic/Checkout";
import { ItemModel } from "models/ItemModel";
import pricingRules from "mocks/pricing-rules.json";
import products from "mocks/products.json";
import { PricingRule } from "models/PricingRule";
import { ProductModel } from "models/ProductModel";
import { SizeEnum } from "services/enums/SizeEnum";
import { v4 as uuidV4 } from "uuid";

describe("Checkout process test", () => {
  let co: Checkout;
  let items: ItemModel[];
  let basicProduct: any;
  let standardProduct: any;
  let advancedProduct: any;

  beforeEach(() => {
    co = new Checkout(pricingRules as PricingRule[]);
    basicProduct = products.find(
      (product) => product.size === SizeEnum.Basic.toString()
    );
    standardProduct = products.find(
      (product) => product.size === SizeEnum.Standard.toString()
    );
    advancedProduct = products.find(
      (product) => product.size === SizeEnum.Advanced.toString()
    );
  });

  it("should has basic, standard and advanced product", () => {
    expect(basicProduct).not.toBeUndefined();
    expect(standardProduct).not.toBeUndefined();
    expect(advancedProduct).not.toBeUndefined();
  });

  it("should handle Default customer order", () => {
    items = [
      {
        id: uuidV4(),
        customerId: "Default",
        product: basicProduct as ProductModel,
        quantity: 1,
      },
      {
        id: uuidV4(),
        customerId: "Default",
        product: standardProduct as ProductModel,
        quantity: 1,
      },
      {
        id: uuidV4(),
        customerId: "Default",
        product: advancedProduct as ProductModel,
        quantity: 1,
      },
    ];

    items.forEach((item) => co.add(item));
    const total = co.total();

    expect(total).toBe(379.97);
  });

  it("should handle IMT customer order", () => {
    items = [
      {
        id: uuidV4(),
        customerId: "IMT",
        product: basicProduct as ProductModel,
        quantity: 6,
      },
      {
        id: uuidV4(),
        customerId: "IMT",
        product: advancedProduct as ProductModel,
        quantity: 1,
      },
    ];

    items.forEach((item) => co.add(item));
    const total = co.total();

    expect(total).toBe(549.95);
  });

  it("should handle FWH customer order", () => {
    items = [
      {
        id: uuidV4(),
        customerId: "FWH",
        product: standardProduct as ProductModel,
        quantity: 1,
      },
      {
        id: uuidV4(),
        customerId: "FWH",
        product: advancedProduct as ProductModel,
        quantity: 20,
      },
    ];

    items.forEach((item) => co.add(item));
    const total = co.total();

    expect(total).toBe(2929.79);
  });

  it("should handle DNV customer order", () => {
    items = [
      {
        id: uuidV4(),
        customerId: "DNV",
        product: basicProduct as ProductModel,
        quantity: 1,
      },
      {
        id: uuidV4(),
        customerId: "DNV",
        product: standardProduct as ProductModel,
        quantity: 11,
      },
      {
        id: uuidV4(),
        customerId: "DNV",
        product: advancedProduct as ProductModel,
        quantity: 1,
      },
    ];

    items.forEach((item) => co.add(item));
    const total = co.total();

    expect(total).toBe(1029.92);
  });
});
