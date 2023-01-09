import createStore from "./redux";

export interface Action {
  type: string;
  payload?: any;
}

export type Reducer<S> = (store: S, action: Action) => S;

export type Store = ReturnType<typeof createStore>;

export type Dispatch<S> = (action: Action) => void;
