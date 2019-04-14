export default {
  initTheme : function() {
    //get cookie
    let theme = this.getCurrentTheme();

    //themeChange
    this.themeChange(theme);
  },
  themeChange: function (strTheme) {
    //1.kill me
    var strClassName = document.body.className;
    if(strClassName){
      document.body.classList.remove(strClassName);
      document.cookie = 'theme=' + "" + ';path=/';
    }

    //2.change new girl friend
    if(strTheme){
      document.body.classList.add(strTheme);
      document.cookie = 'theme=' + encodeURIComponent(strTheme) + ';path=/';
    }
  },
  getCurrentTheme : function () {
    //get cookie
    const reg = new RegExp('(^| )theme=([^;]*)(;|$)');
    const r = document.cookie.match(reg);
    let theme = r != null ? decodeURIComponent(r[2]):'';
    return theme;
  }
}
