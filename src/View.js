import  {extend, uniqueId} from './util';

function View(param) {
  this.init(param || {});
}

View.prototype = {
  constructor: View,

  tagName: 'div',

  init: function (param) {
    if (!this.el) {
      this.el = document.createElement(this.tagName);
    }
    this.$id = uniqueId('view');
    this.$el = $(this.el);
    this.delegateEvents(this.events || {});
    this.model = param.model;
    var initialize = this.initialize || function () {
      };
    initialize.apply(this);
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
        $el.on(event, dom, this[events[item]].bind(this));
      }
    })
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