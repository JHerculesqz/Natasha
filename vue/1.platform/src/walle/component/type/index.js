const toStr = Object.prototype.toString;

export function isString(arg) {
  return toStr.call(arg) === "[object String]";
}

export function isArray(arg) {
  return toStr.call(arg) === "[object Array]";
}
