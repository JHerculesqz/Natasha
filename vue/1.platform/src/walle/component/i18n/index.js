import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n); // 通过插件的形式挂载

export default {
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
    document.cookie = 'locale=' + encodeURIComponent(strLang) + ';path=/';
  },
  getCurrentLocal : function () {
    const reg = new RegExp('(^| )locale=([^;]*)(;|$)');
    const r = document.cookie.match(reg);
    let locale = r != null ? decodeURIComponent(r[2]):'zh';
    return locale;
  }
}
