const isDate = (inputVariable) => {
  if (Object.prototype.toString.call(inputVariable) === "[object Date]") {
    if (isNaN(inputVariable)) {
      return false;
    }
    return true;
  }
  return false;
};

const isString = (inputVariable) => {
  return typeof inputVariable === "string" || inputVariable instanceof String;
};

module.exports = {
  isDate,
  isString,
};
