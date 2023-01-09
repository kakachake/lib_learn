import React, {
  cloneElement,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { StoreContext } from "./provider";

export type IMapStateToProps<T = any> = (state: T) => Record<string, any>;

export type IMapDispatchToProps<T = any> = (dispatch: Dispatch<T>) => {
  [key: string]: Function;
};

export default function connect(
  mapStateToProps: IMapStateToProps,
  mapDispatchToProps: IMapDispatchToProps
) {
  return (Component: React.ComponentType) => {
    const Wrapper: React.ComponentType<
      PropsWithChildren<{
        [key: string]: any;
      }>
    > = (props) => {
      const { children, ...rest } = props;
      const store = useContext(StoreContext);
      console.log(store);

      const [_, forceUpdate] = useState({});

      function fr() {
        forceUpdate({});
      }

      useEffect(() => {
        store?.subscribe(fr);
        return () => {
          store?.unSubscribe(fr);
        };
      }, []);
      return (
        <Component
          key={1}
          {...rest}
          {...mapStateToProps(store?.getState())}
          {...mapDispatchToProps(store?.dispatch)}
        />
      );
    };

    Wrapper.displayName = `ReduxConnect_${Component.displayName}`;

    return Wrapper;
  };
}
