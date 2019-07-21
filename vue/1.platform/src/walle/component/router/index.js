export default {
  to: function (oRouter, strPageName, oParam) {
    if(oParam == undefined){
      oRouter.push({
        name: strPageName
      });
    }
    else{
      oRouter.push({
        name: strPageName,
        query: oParam
      });
    }
  },
  toEx: function(oRouter, strRedirectUrl){
    oRouter.push({
      path: strRedirectUrl
    });
  },
  getParam: function(oRouter, strKey){
    var strValue = oRouter.query[strKey];
    return strValue;
  }
}
