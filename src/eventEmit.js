'use strict';
var util = require('./util');
var { before }=util;

var EventEmit = function () {
  this.on = function (name, callback) {
    var _event = this._event = this._event || {};
    var arr = _event[name];
    if (arr && arr.length >= 0) {
      arr.push(callback);
    } else {
      _event[name] = [callback];
    }
    return this;
  };

  this.once = function (name, callback) {
    var _call = before(1, callback);
    this.on(name, _call);
  };

  this.off = function (name, callback) {
    var _event = this._event || {};
    var arr = _event[name] || [];
    arr.forEach((item, index)=> {
      if (item === callback) {
        arr.splice(index, 1);
      }
    })
  };

  this.trigger = function (name) {
    var _event = this._event || {};
    var serviceArr = _event[name] || [];
    serviceArr.forEach(item=> {
      item.apply(this)
    });

    var allArr = _event['all'] || [];
    allArr.forEach(item=> {
      item.apply(this)
    });
  };

  this.listenTo = function (model, type, callback) {
    // model._event
    // callback
  }
};

module.exports = EventEmit;

