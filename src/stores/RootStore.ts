import { Instance, types } from "mobx-state-tree";
import { createContext, useContext } from "react";
import { CheckoutStore } from "./domains/CheckoutStore";

const RootStore = types.model({
  checkoutStore: CheckoutStore,
});

let initialState = RootStore.create({
  checkoutStore: {
    items: [],
  },
});

export const rootStore = initialState;

export type RootStoreInstance = Instance<typeof RootStore>;
const RootStoreContext = createContext<null | RootStoreInstance>(null);

export const RootStoreProvider = RootStoreContext.Provider;

export function useStores() {
  let rootStore = useContext(RootStoreContext);
  if (rootStore === null) {
    rootStore = initialState;
  }

  return rootStore;
}
