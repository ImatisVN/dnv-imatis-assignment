import { ProductModel } from "./ProductModel";

export type ItemModel = {
  id: string;
  customerId: string;
  product: ProductModel;
  quantity: number;
};
