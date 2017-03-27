import EventEmit from './EventEmit';
import {extend} from './util';

function Collection(obj) {
  obj=obj||{};
  this.models = obj.models || []
}

const obj = {
  constructor: Collection,

  push: function (model) {
    const Model = this.model;
    const _model = new Model(model,this);
    this.models.push(_model);
    this.length = this.models.length;
    this.trigger('add', _model);
  },

  pop: function () {
    this.model.pop();
    this.trigger('remove');
  },

  remove:function(model){
    const models = this.models;
    models.forEach((item,index)=>{
        if(item===model){
          models.splice(index,1);
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


Collection.prototype = Object.assign(Object.create(new EventEmit()), obj);
Collection.extend = extend.bind(Collection);

export default  Collection;