import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n); // 通过插件的形式挂载

export default {
  defaultLang:"en",
  supportLang:["zh","en"],
  initI18n: function (oMessages) {
    //get cookie
    var strLang = this.getCurrentLocal();

    //与换肤不同，需要先构造出oI18n
    var oI18n = new VueI18n({
      locale: strLang,    // 语言标识
      messages: oMessages
    });

    //localeChange
    this.localeChange(oI18n, strLang);

    return oI18n;
  },
  localeChange: function (oI18n, strLang) {
    oI18n.locale = strLang;
    document.cookie = 'marvelLocale=' + encodeURIComponent(strLang) + ';path=/';
  },
  getCurrentLocal : function () {
    const reg = new RegExp('(^| )marvelLocale=([^;]*)(;|$)');
    const r = document.cookie.match(reg);
    var locale = r != null ? decodeURIComponent(r[2]):this.defaultLang;
    return this.supportLang.indexOf(locale) > -1 ? locale : "en";
  },
  setDefaultLang : function (strDefaultLang) {
    this.defaultLang = strDefaultLang;
  }
}
