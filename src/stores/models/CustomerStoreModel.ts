import { types } from "mobx-state-tree";

export const CustomerStoreModel = types.model("CustomerStoreModel").props({
  id: types.identifier,
  name: types.string,
});
