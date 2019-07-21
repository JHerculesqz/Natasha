//潜规则：localStorage不支持存储bool，不要犯傻哦
export default {
  set: function (strKey, strVal) {
    localStorage.setItem(strKey, strVal);
  },
  get: function (strKey) {
    return localStorage.getItem(strKey);
  }
}
