import { createContext, PropsWithChildren } from "react";
import { Store } from "./redux";

export const StoreContext = createContext<Store>({} as Store);

export default function Provider(
  props: PropsWithChildren<{
    store: Store;
  }>
) {
  const { store, children } = props;
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
