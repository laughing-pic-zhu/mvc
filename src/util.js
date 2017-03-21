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

var extend = function (props) {
  var parent = this;
  var child = function () {
    parent.apply(this, arguments);
  };
  child.prototype = Object.assign(Object.create(parent.prototype), props, { constructor: child });
  return child;
};

module.exports = {
  before, extend
};
