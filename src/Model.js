import EventEmit from './EventEmit';
import {extend, uniqueId} from './util';

function Model(obj, collection) {
  this.uid = uniqueId('m');
  this.attributes = Object.assign({}, this.default, obj || {});
  if (collection) {
    this.collection = collection;
  }
}

var obj = {
  constructor: Model,
  set: function (obj) {
    this.attributes = Object.assign(this.attributes, obj);
    const keys = [];
    Object.keys(obj).forEach(key=> {
      keys.push(key);
      this._trigger('change:' + key);
    });

    if (keys.length > 0) {
      this._trigger('change');
    }
  },

  get: function (key) {
    return this.attributes[key];
  },

  destroy: function () {
    this.attributes = {};
    if (this.collection) {
      this.collection.remove(this);
    }
    this._trigger('destroy');
  },

  toJSON: function () {
    return this.attributes;
  },

  _trigger: function (name) {
    var collection = this.collection;
    if ((name === 'change' || name === 'destroy') && collection) {
      collection.trigger('change');
    }
    this.trigger(name);
  }
};

Model.prototype = Object.assign(Object.create(new EventEmit()), obj);
Model.extend = extend.bind(Model);

export default  Model;