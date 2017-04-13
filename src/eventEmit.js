'use strict';

import {before} from './util';
const SEPARATE = /\s+/;
var EventEmit = function () {
  this.on = function (name, callback, id) {
    if (!name)return;
    const _event  = this._event || (this._event={});

    if (typeof name === 'object') {
      Object.keys(name).forEach(key=> {
        const arr = _event[key] || (_event[key]=[]);
        const calObj = {
          callback: name[key],
          id: id
        };
        arr.push(calObj);
      })
    }else if (SEPARATE.test(name)) {
      const calObj = {
        callback: callback,
        id: id
      };
      var keys = name.split(SEPARATE);
      keys.forEach(key=> {
        const arr = _event[key] || (_event[key]=[]);
        arr.push(calObj);
      });
    }else{
      const calObj = {
        callback: callback,
        id: id
      };
      const arr = _event[name] || (_event[name]=[]);
      arr.push(calObj);
    }

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
    const events = _event[name];
    const allEvents = _event['all'];
    if (events) {
      this.triggerEvents(events, arg);
    }
    if (allEvents) {
      this.triggerEvents(allEvents, arg);
    }
  };

  this.triggerEvents = function (events, arg) {
    events.forEach(item=> {
      var callback = item.callback;
      callback.apply(this, arg)
    });
  }

};

export default EventEmit

