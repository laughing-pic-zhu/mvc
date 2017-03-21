var EventEmit = require('./EventEmit');
var { extend }=require('./util');
function Model(obj) {
  this.init(obj);
}

var obj = {
  default: {},
  set: function (key, value) {
    this.attributes[key] = value;
    this.trigger('change');
  },

  clear: function () {
    this.attributes = {};
    this.trigger('destroy');
  },

  toJSON: function () {
    return JSON.stringify(this.attributes)
  },

  init: function (obj) {
    this.attributes = obj ? obj : this.default;
  }
};

obj.__proto__ = new EventEmit();

Model.prototype = obj;
Model.prototype.constructor = Model;
Model.extend = extend;

module.exports = Model;