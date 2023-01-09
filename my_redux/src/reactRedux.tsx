import connect from "./lib/connect";
import { Dispatch } from "./lib/type";

function ReactReduxTest(props: any) {
  const { name, count, add } = props;
  return (
    <div>
      <div>name:{name}</div>
      <div> count*2:{count}</div>
      <button onClick={add}>add</button>
    </div>
  );
}

function mapStateToProps(store: any) {
  return {
    name: store.name,
    count: store.count * 2,
  };
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    add: () => dispatch({ type: "add" }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxTest);
