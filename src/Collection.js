import Event from './Event';
import {extend} from './util';

function Collection(obj) {
  obj = obj || {};
  this.models = obj.models || []
}

const obj = {
  constructor: Collection,

  _addReference: function (model) {
    model.on('all',this._onModelEvent,this);
  },

  _onModelEvent: function (name,model) {
    if(name==='change'||name==='remove'||name==='destroy'){
      this.trigger(name,model);
    }
  },

  push: function (model) {
    const Model = this.model;
    const _model = new Model(model, this);
    this.models.push(_model);
    this.length = this.models.length;
    this._addReference(_model);
    this.trigger('add', _model);
  },

  pop: function () {
    this.model.pop();
    this.trigger('remove');
  },

  remove: function (model) {
    const models = this.models;
    models.forEach((item, index)=> {
      if (item === model) {
        models.splice(index, 1);
        this.length = --this.length;
      }
    })
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


Collection.prototype = Object.assign(Object.create(new Event()), obj);
Collection.extend = extend.bind(Collection);

export default  Collection;