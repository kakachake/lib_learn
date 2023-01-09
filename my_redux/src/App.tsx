import { useCallback, useEffect, useState } from "react";
import store from "./store";
import "./App.css";
import ReactRedux from "./reactRedux";

function App() {
  const { name, count } = store.getState();
  const [_, forceUpdate] = useState({});

  const up = useCallback(() => {
    forceUpdate({});
  }, []);

  function handleDispatch() {
    store.dispatch({
      type: "add",
    });
  }

  function handleUnSub() {
    store.unSubscribe(up);
  }

  function handleSub() {
    store.subscribe(up);
    up();
  }

  return (
    <div className="App">
      {name}
      {count}
      <button onClick={handleDispatch}>dispatch</button>
      <button onClick={handleUnSub}>取消订阅</button>
      <button onClick={handleSub}>订阅</button>
      <ReactRedux />
    </div>
  );
}

export default App;
