'use strict';

import {before} from './util';
const SEPARATE = /\s+/;
var EventEmit = function () {
  this.on = function (name, callback, id) {
    return this.eventsApi(name, callback, id);
  };

  this.eventsApi = function (name, callback, id) {
    let event;
    if (name && typeof name === 'object') {
      Object.keys(name).forEach(key=> {
        event = this.eventsApi(key, name[key], id);
      })
    } else if (SEPARATE.test(name)) {
      var keys = name.split(SEPARATE);
      keys.forEach(key=> {
        event = this.iteratee(key, name[key], id);
      });
    } else {
      event = this.iteratee(name, callback, id);
    }
    return event;
  };

  this.iteratee = function (name, callback, id) {
    const _event = this._event || (this._event = {});
    const calObj = {
      callback: callback,
      id: id
    };
    const arr = _event[name] || (_event[name] = []);
    arr.push(calObj);
    return _event
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

