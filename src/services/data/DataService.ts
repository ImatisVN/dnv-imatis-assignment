import { ProductModel } from "models/ProductModel";
import { PricingRule } from "models/PricingRule";
import pricingRules from "mocks/pricing-rules.json";
import products from "mocks/products.json";
import customers from "mocks/customers.json";
import { CustomerModel } from "models/CustomerModel";

export const getProducts = async (): Promise<ProductModel[]> =>
  Promise.resolve(products as ProductModel[]);

export const getPricingRules = async (): Promise<PricingRule[]> =>
  Promise.resolve(pricingRules as PricingRule[]);

export const getCustomers = async (): Promise<CustomerModel[]> =>
  Promise.resolve(customers as CustomerModel[]);
