import  {extend} from './util';

function View(param) {
  this.init(param||{});
}

View.prototype = {
  constructor: View,

  init: function (param) {
    if(!this.el){
      this.el=document.createElement(this.tagName||'div');
    }
    this.$el=$(this.el);
    this.delegateEvents(this.events || {});
    this.model=param.model;
    var initialize = this.initialize || function () {
      };
    initialize.apply(this);
  },

  $:function(str){
    return this.$el.find(str);
  },

  delegateEvents: function (events) {
    var $el = this.$el;
    Object.keys(events).forEach(item=> {
      var arr = item.split(' ');
      if (arr.length === 2) {
        var event = arr[0];
        var dom = arr[1];
        $el.on(event, dom, this[events[item]].bind(this));
      }
    })
  },

  listenTo: function (model, type, callback) {
    model.on(type, callback.bind(this));
  }
};

View.extend = extend.bind(View);
export default View;