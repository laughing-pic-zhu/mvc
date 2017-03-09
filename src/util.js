var before = function (n, callback) {
  return ()=> {
    if (n >= 1) {
      callback.apply(this);
      n--;
    } else {
      callback = undefined;
    }
    return this
  }
};

module.exports={
  before
};
