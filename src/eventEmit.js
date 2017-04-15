'use strict';

import {before} from './util';
const SEPARATE = /\s+/;
var EventEmit = function () {
  this.eventsApi = function (iteratee, name, callback, context) {
    let event;
    if (name && typeof name === 'object') {
      Object.keys(name).forEach(key=> {
        event = this.eventsApi(key, name[key], context);
      })
    } else if (SEPARATE.test(name)) {
      var keys = name.split(SEPARATE);
      keys.forEach(key=> {
        event = iteratee.call(this,key, name[key], context);
      });
    } else {
      event = iteratee.call(this,name, callback, context);
    }
    return event;
  };

  this.on = function (name, callback, context) {
    return this.eventsApi(this.onApi, name, callback, context);
  };

  this.onApi = function (name, callback, context) {
    const _event = this._event || (this._event = {});
    const calObj = {
      callback: callback,
      context: context
    };
    const arr = _event[name] || (_event[name] = []);
    arr.push(calObj);
    return _event
  };

  this.once = function (name, callback, context) {
    var _call = before(1, callback);
    this.on(name, _call, context);
  };

  this.off = function (name, callback, context) {
    return this.eventsApi(this.offApi, name, callback, context);
  };

  this.offApi = function (name, callback, context) {
    const _event = this._event || {};
    if (!name && !callback && !context) {
      this._event = {};
      return;
    }
    const names = name ? [name] : Object.keys(_event);
    names.forEach(name=> {
      const compute = _event[name];
      const remain = [];
      // const
      compute.forEach(item=> {
        if (callback && item.callback !== callback || item.context !== context) {
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
    return this.eventsApi(this.triggerApi, name, void 0, ...arg);
  };

  this.triggerApi = function (name, callback, ...arg) {
    const _event = this._event || {};
    const events = _event[name];
    const allEvents = _event['all'];
    if (events) {
      this.triggerEvents(events, arg);
    }
    if (allEvents) {
      arg.unshift(name);
      this.triggerEvents(allEvents, arg);
    }
  };

  this.triggerEvents = function (events, arg) {
    events.forEach(item=> {
      const { callback, context }= item;
      callback.apply(context, arg)
    });
  }
};

export default EventEmit

