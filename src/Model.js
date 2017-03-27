import EventEmit from './EventEmit';
import {extend} from './util';

function Model(obj, collection) {
  this.attributes = Object.assign({}, this.default, obj || {});
  if (collection) {
    this.collection = collection;
  }
}

var obj = {
  constructor: Model,
  set: function (model) {
    var _model = Object.assign(this.attributes, model);
    this.attributes = _model;
    this._trigger('change');
  },

  destroy: function () {
    this.attributes = {};
    if(this.collection){
      this.collection.remove(this);
    }
    this._trigger('destroy');
  },

  toJSON: function () {
    return this.attributes;
  },

  _trigger: function (name) {
    var collection=this.collection;
    if ((name === 'change' || name === 'destroy')&&collection) {
      collection.trigger('change');
    }
    this.trigger(name);
  }
};

Model.prototype = Object.assign(Object.create(new EventEmit()), obj);
Model.extend = extend.bind(Model);

export default  Model;