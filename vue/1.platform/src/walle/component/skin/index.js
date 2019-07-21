export default {
  initTheme : function() {
    //get cookie
    var theme = this.getCurrentTheme();

    //themeChange
    this.themeChange(theme);
  },
  themeChange: function (strTheme) {
    //1.kill me
    var strClassName = document.body.className;
    if(strClassName){
      document.body.classList.remove(strClassName);
      document.cookie = 'marvelTheme=' + "" + ';path=/';
    }

    //2.change new girl friend
    if(strTheme){
      document.body.classList.add(strTheme);
      document.cookie = 'marvelTheme=' + encodeURIComponent(strTheme) + ';path=/';
    }
  },
  getCurrentTheme : function () {
    //get cookie
    const reg = new RegExp('(^| )marvelTheme=([^;]*)(;|$)');
    const r = document.cookie.match(reg);
    var theme = r != null ? decodeURIComponent(r[2]):'';
    return theme;
  }
}
