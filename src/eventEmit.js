'use strict';

import {before} from './util';

var EventEmit = function () {
  this.on = function (name, callback,id) {
    var _event = this._event = this._event || {};
    var arr = _event[name];
    var calObj={
      callback:callback,
      id:id
    };
    if (arr && arr.length >= 0) {
      arr.push(calObj);
    } else {
      _event[name] = [calObj];
    }

    return this;
  };

  this.once = function (name, callback,id) {
    var _call = before(1, callback);
    this.on(name, _call,id);
  };

  this.off = function (name, callback,id) {
    var _event = this._event || {};
    if (name && callback) {
      var arr = _event[name] || [];
      arr.forEach((item, index)=> {
        if (item === callback) {
          arr.splice(index, 1);
        }
      })
    } else if (id) {
      Object.keys(_event).forEach(key=> {
        var arr = _event[key] || [];
        arr.forEach((item, index)=> {
          if (item.id === id) {
            arr.splice(index, 1);
          }
        })
      })
    }
    ;
  }

  this.trigger = function (name,option) {
    var _event = this._event || {};
    var serviceArr = _event[name] || [];
    serviceArr.forEach(item=> {
      var callback=item.callback;
      callback.call(this,option)
    });

    var allArr = _event['all'] || [];
    allArr.forEach(item=> {
      var callback=item.callback;
      callback.call(this,option)
    });
  };

  this.listenTo = function (model, type, callback) {
   
  }
};

export default EventEmit

