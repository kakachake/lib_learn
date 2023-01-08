import { useState } from "react";
import "./App.css";
import FallBackExample from "./components/FallBackExample";
import ResetKeysExample from "./components/ResetKeysExample";
import ResetPropKeysExample from "./components/ResetPropKeysExample";

const renderList = [
  {
    name: "FallBack例子",
    render: () => {
      return <FallBackExample />;
    },
  },
  {
    name: "ResetKeysExample例子",
    render: () => {
      return <ResetKeysExample />;
    },
  },
  {
    name: "ResetPropKeysExample例子",
    render: () => {
      const [retry, setRetry] = useState(0);
      return (
        <div>
          <ResetPropKeysExample retry={retry} />
          <button onClick={() => setRetry(retry + 1)}>retry</button>
        </div>
      );
    },
  },
];

function App() {
  const [cur, setCur] = useState(0);

  const CurrentRender = renderList[cur].render;
  return (
    <div className="App">
      <div className="headerBar">
        {renderList.map((item, index) => {
          return (
            <div
              key={item.name}
              onClick={() => {
                setCur(index);
              }}
              className={index === cur ? "active" : ""}
            >
              <button>{item.name}</button>
            </div>
          );
        })}
      </div>
      <CurrentRender />
    </div>
  );
}

export default App;
