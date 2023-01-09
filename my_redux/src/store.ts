import reduxCatch from "./lib/middleware/catch";
import log from "./lib/middleware/log";
import createStore, { Action, applyMiddleware } from "./lib/redux";

interface Store {
  name: string;
  count: number;
}

const initialState = {
  name: "hello world",
  count: 1,
};

const reducer = (store: Store = initialState, action: Action) => {
  switch (action.type) {
    case "add":
      return {
        ...store,
        count: store.count + 1,
      };
    default:
      return store;
  }
};

const log1 =
  (next) =>
  (...args) => {
    console.log("log1 before next", args);
    next(...args);
    console.log("log1 after next", args);
  };

const log2 =
  (next) =>
  (...args) => {
    console.log("log2 before next", args);
    next(...args);
    console.log("log2 after next", args);
  };

const store = createStore(reducer, applyMiddleware(...[log1, log2]));

export default store;
