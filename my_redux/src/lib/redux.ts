import { Action, Reducer } from "./type";

/**
 * 初始化
 * @param reducer
 */
export default function createStore<S = any>(reducer: Reducer<S>, enhancer?) {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentStore: S;
  let observers: (() => void)[] = [];

  function getState() {
    return currentStore;
  }

  function dispatch(action: Action) {
    currentStore = reducer(currentStore, action);
    observers.forEach((fn) => {
      fn();
    });
  }

  function subscribe(fn: () => void) {
    unSubscribe(fn);
    observers.push(fn);
  }

  function unSubscribe(fn: () => void) {
    observers = observers.filter((item) => item !== fn);
  }

  dispatch({
    type: "@@redux_init",
  });

  return {
    getState,
    dispatch,
    subscribe,
    unSubscribe,
  };
}

// 第一种实现
function compose1(...middlewares) {
  return (dispatch) =>
    middlewares.reduceRight((res, cur) => {
      return cur(res);
    }, dispatch);
}

// 第二种实现
function compose2(...middlewares) {
  return middlewares.reduce((prev, cur) => {
    return (...args) => {
      return prev(cur(...args));
    };
  });
}

export function applyMiddleware(...middlewares) {
  return (createStore) => {
    return (reducer) => {
      const store = createStore(reducer);
      console.log(compose2(...middlewares));

      const dispatch = compose2(...middlewares)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
}

export * from "./type";
