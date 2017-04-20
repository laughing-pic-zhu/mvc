import Event from './Event';
import {extend, splice} from './util';

function Collection(obj) {
  obj = obj || {};
  this.models = obj.models || [];
  this.length=this.models.length;
}

const obj = {
  constructor: Collection,

  _addReference: function (model) {
    model.on('all', this._onModelEvent, this);
  },

  _onModelEvent: function (name, model) {
    if (name === 'destroy') {
      this.remove(model);
      return;
    }
    this.trigger(name, model);
  },

  _removeReference: function (model) {
    if (this === model.collection) delete model.collection;
    model.off('all', this._onModelEvent, this);
  },

  at: function (index) {
    return this.models[index];
  },

  push: function (model) {
    this.add(model, this.length);
  },

  pop: function () {
    const model = this.at(this.length - 1);
    this.remove(model);
  },

  unshift: function (model) {
    this.add(model, 0);
  },

  shift: function () {
    const model = this.at(0);
    this.remove(model);
  },

  add: function (model, index) {
    const Model = this.model;
    const _model = new Model(model, this);
    splice(this.models, [_model], index);
    this.length = this.models.length;
    this._addReference(_model);
    this.trigger('add', _model);
  },

  remove: function (model) {
    const models = this.models;
    const remains = [];
    models.forEach((item)=> {
      if (item !== model) {
        remains.push(item);
      } else {
        this._removeReference(model);
      }
    });
    const len = remains.length;
    if (len < this.length) {
      this.models = remains;
      this.length = len;
      this.trigger('update', this);
    }
  },

  reset: function () {
    this.models.forEach(model=>{
      this._removeReference(model);
    });
    this.models=[];
    this.length=0;
  },

  toJSON: function () {
    return this.models;
  },

  each: function (callback, t) {
    this.models.forEach(function (model) {
      callback.call(this, model);
    }, t)
  }
};


Collection.prototype = Object.assign(new Event(), obj);
Collection.extend = extend.bind(Collection);

export default  Collection;