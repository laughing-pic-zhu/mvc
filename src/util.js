export const before = (n, callback)=> {
  return ()=> {
    if (n >= 1) {
      callback.apply(this);
      n--;
    } else {
      callback = undefined;
    }
    return this
  }
};

export const splice = (array, insert, at)=> {
  at = Math.max(0, Math.min(array.length, at));
  let len = insert.length;
  let tail = [];
  for (let i = at; i < array.length; i++) {
    tail.push(array[i]);
  }
  for (let i = 0; i < tail.length; i++) {
    array[i + at + len] = tail[i];
  }
  for (let i = 0; i < len; i++) {
    array[i + at] = insert[i];
  }
  return array;
};

export const extend = function (props) {
  var parent = this;
  var child = function () {
    parent.apply(this, arguments);
  };
  child.prototype = Object.assign(Object.create(parent.prototype), props, { constructor: child });
  return child;
};

let idCounter = 0;
export const uniqueId = function (prefix) {
  const id = ++idCounter;
  return `${ prefix + id }`
};

