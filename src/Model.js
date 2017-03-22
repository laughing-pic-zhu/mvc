import EventEmit from './EventEmit';
import {extend} from './util';

function Model(obj) {
  this.init(obj || {});
}

var obj = {
  constructor: Model,
  set: function (model) {
    var _model = Object.assign(this.attributes, model);
    this.attributes = _model;
    this.trigger('change');
  },

  destroy: function () {
    this.attributes = {};
    this.trigger('destroy');
  },

  toJSON: function () {
    return this.attributes;
  },

  init: function (obj) {
    this.attributes = Object.assign(this.default, obj);
  }
};

Model.prototype = Object.assign(Object.create(new EventEmit()), obj);
Model.extend = extend.bind(Model);

export default  Model;