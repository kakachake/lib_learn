const defaults = {
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
};

export default defaults;
