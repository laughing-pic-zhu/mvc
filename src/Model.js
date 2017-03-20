var EventEmit = require('./EventEmit');
function Model(obj) {
  this.set = function (key, value) {
    this.attributes[key] = value;
    this.trigger('change');
  };

  this.clear = function () {
    this.attributes = {};
    this.trigger('destroy');
  };

  this.toJSON = function () {
    return JSON.stringify(this.attributes)
  };

  this.init = function () {
    if (obj) {
      this.attributes = obj;
    }
  };

  this.init();
}

Model.prototype = new EventEmit();
Model.prototype.constructor = Model;

module.exports = Model;