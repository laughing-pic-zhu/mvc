function View(param) {

  this.init = function () {
    var initialize = param.initialize || function () {
      };
    initialize.apply(this);
  };

  this.delegateEvents = function () {

  };

  this.listenTo = function (model, type, callback) {
    model.on(type, callback.bind(this));
  };

  this.init();
}

module.exports = View;