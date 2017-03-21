var { extend }=require('./util');

function View(param) {
  this.init(param);
}

View.prototype = {
  init: function (param) {
    var initialize = this.initialize || function () {
      };
    initialize.apply(this);
  },

  delegateEvents: function (events) {
    Object.keys(events).forEach(item=> {
      var arr = item.split(' ');
      if (arr.length === 2) {
        var type = arr[0];
        var dom = arr[1];
      }
    })
  },

  listenTo: function (model, type, callback) {
    model.on(type, callback.bind(this));
  }

};
View.extend = extend;
module.exports = View;