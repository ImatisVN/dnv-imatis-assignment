import { types } from "mobx-state-tree";
import { ProductStoreModel } from "./ProductStoreModel";

export const ItemStoreModel = types.model("ItemStoreModel").props({
  id: types.identifier,
  product: types.reference(ProductStoreModel),
  quantity: types.number,
});
