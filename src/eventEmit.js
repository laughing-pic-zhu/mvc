'use strict';

import {before} from './util';

var EventEmit = function () {
  this.on = function (name, callback, id) {
    if (!name)return;
    var _event = this._event = this._event || {};
    var calObj = {
      callback: callback,
      id: id
    };
    var keys = name.split(' ');
    keys.forEach(key=> {
      var arr = _event[key];
      if (arr && arr.length >= 0) {
        arr.push(calObj);
      } else {
        _event[key] = [calObj];
      }
    });
    return this;
  };

  this.once = function (name, callback, id) {
    var _call = before(1, callback);
    this.on(name, _call, id);
  };

  this.off = function (name, callback, id) {
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
  };

  this.trigger = function (...arg) {
    const _event = this._event || {};
    const name = arg.shift();
    const serviceArr = _event[name] || [];
    serviceArr.forEach(item=> {
      var callback = item.callback;
      callback.apply(this, arg)
    });

    var allArr = _event['all'] || [];
    allArr.forEach(item=> {
      var callback = item.callback;
      callback.apply(this, arg)
    });
  };

};

export default EventEmit

