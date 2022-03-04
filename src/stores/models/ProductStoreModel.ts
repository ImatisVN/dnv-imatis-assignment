import { types } from "mobx-state-tree";
import { SizeEnum } from "services/enums/SizeEnum";

export const ProductStoreModel = types.model("ProductStoreModel").props({
  id: types.identifier,
  name: types.string,
  description: types.string,
  image: types.string,
  size: types.frozen<SizeEnum>(),
  retailPrice: types.number,
  currency: types.string,
});
