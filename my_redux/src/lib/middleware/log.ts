const log =
  (next) =>
  (...args) => {
    console.log("log before next", args);
    next();
    console.log("log after next", args);
  };

export default log;
