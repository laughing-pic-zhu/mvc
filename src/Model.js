import Event from './Event';
import {extend, uniqueId} from './util';

function Model(obj, collection) {
  this.uid = uniqueId('m');
  this._changing = false;
  this.changed = {};
  this._previousAttributes = {};
  this.attributes = Object.assign({}, this.default, obj || {});
  if (collection) {
    this.collection = collection;
  }
}

var obj = {
  constructor: Model,
  set: function (obj) {
    this._changing = true;
    this.changed = obj;
    this._previousAttributes = Object.assign({}, this.attributes);
    this.attributes = Object.assign({}, this.attributes, obj);
    const keys = [];
    Object.keys(obj).forEach(key=> {
      keys.push(key);
      this._trigger('change:' + key, this);
    }, this);

    if (keys.length > 0) {
      this._trigger('change', this);
    }
    this._changing = false;
  },

  get: function (key) {
    return this.attributes[key];
  },

  destroy: function () {
    this.attributes = {};
    this._trigger('destroy',this);
  },

  toJSON: function () {
    return this.attributes;
  },

  _trigger: function (name, ...arg) {
    this.trigger(name, ...arg);
  }
};

Model.prototype = Object.assign(Object.create(new Event()), obj);
Model.extend = extend.bind(Model);

export default  Model;