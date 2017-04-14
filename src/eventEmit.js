'use strict';

import {before} from './util';
const SEPARATE = /\s+/;
var EventEmit = function () {
  this.on = function (name, callback, id) {
    return this.eventsApi(this.onApi,name, callback, id);
  };

  this.eventsApi = function (onApi,name, callback, id) {
    let event;
    if (name && typeof name === 'object') {
      Object.keys(name).forEach(key=> {
        event = this.eventsApi(key, name[key], id);
      })
    } else if (SEPARATE.test(name)) {
      var keys = name.split(SEPARATE);
      keys.forEach(key=> {
        event = onApi.call(this,key, name[key], id);
      });
    } else {
      event = onApi.call(this,name, callback, id);
    }
    return event;
  };

  this.onApi = function (name, callback, id) {
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
    return this.eventsApi(this.offApi,name, callback, id);
  };

  this.offApi = function (name, callback, id) {
    const _event = this._event || {};
    if (!name && !callback && !id) {
      this._event = {};
      return;
    }
    const names = name ? [name] : Object.keys(_event);
    names.forEach(name=> {
      const compute = _event[name];
      const remain = [];
      compute.forEach(item=> {
        if (callback && item.callback !== callback || item.id !== id) {
          remain.push(item);
        }
      });

      if (remain.length > 0) {
        _event[name] = remain;
      } else {
        delete _event[name];
      }
    });
  };

  this.trigger = function (...arg) {
    const name = arg.shift();
    return this.eventsApi(this.triggerApi,name, ...arg);
  };

  this.triggerApi=function(...arg){
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

