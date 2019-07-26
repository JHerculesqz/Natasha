const toStr = Object.prototype.toString;

export function isString(arg) {
  return toStr.call(arg) === "[object String]";
}

export function isArrays(arg) {
  return toStr.call(arg) === "[object Array]";
}
