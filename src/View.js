import  {extend, uniqueId} from './util';

function View(param) {
  this.init(param || {});
}

View.prototype = {
  constructor: View,

  tagName: 'div',

  init: function (param) {
    this.$id = uniqueId('view');
    this.model = param.model;
    this.id = param.id||'';
    this.className = param.className||'';
    this._ensureElement();
    var initialize = this.initialize || function () {
      };
    initialize.apply(this);
  },

  setElement: function (element) {
    this.undelegateEvents();
    this.el=element;
    this.$el = $(element);
    this.delegateEvents(this.events || {});
  },

  _ensureElement: function () {
    if (!this.el) {
      this.setElement(document.createElement(this.tagName));
      const attrs = {};
      if(this.id){
        attrs['id']=this.id;
      }
      if(this.className){
        attrs['className']=this.className;
      }
      this.$el.attr(attrs);
    }else{
      this.setElement(this.el);
    }
  },

  $: function (str) {
    return this.$el.find(str);
  },

  delegateEvents: function (events) {
    var $el = this.$el;
    Object.keys(events).forEach(item=> {
      var arr = item.split(' ');
      if (arr.length === 2) {
        var event = arr[0];
        var dom = arr[1];
        $el.on(event + '.delegateEvents' + this.$id, dom, this[events[item]].bind(this));
      }
    })
  },

  undelegateEvents: function () {
    if (this.$el) {
      this.$el.off('.delegateEvents' + this.$id);
    }
  },

  remove: function () {
    this.stopListening();
    this.$el.remove();
  },

  listenTo: function (model, type, callback) {
    const _listenTo = this._listenTo = this._listenTo || [];
    let flag = true;
    _listenTo.some(item=> {
      if (item.uid === model.uid) {
        flag = false;
        return true;
      }
    });
    if (flag) {
      _listenTo.push(model);
    }
    model.on(type, callback, this);
  },

  stopListening: function () {
    const _listenTo = this._listenTo = this._listenTo || [];
    _listenTo.forEach(item=> {
      item.off(null, null, this);
    });
  }
};

View.extend = extend.bind(View);
export default View;