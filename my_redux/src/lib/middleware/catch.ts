const reduxCatch =
  (next) =>
  (...args) => {
    try {
      return next();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

export default reduxCatch;
