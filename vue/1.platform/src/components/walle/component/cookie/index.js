var COOKIEPATH = { path: '/'};
export default {
  getCookie: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "= ([^;]*)(;|$)");
    if (document.cookie == "") {
      return null;
    } else if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  },

  setCookie: function (c_name, value) {
    document.cookie = c_name + "=" + escape(value);
  },

  delCookie: function (arrKeys) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
}
