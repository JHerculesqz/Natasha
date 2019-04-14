import DateUtils from "../date"

export default {
  debug: function (strModuleName, strMethodName, strMsg) {
    var strLog = "[" + strModuleName + "." + strMethodName + "]" +
      "[" + DateUtils.now() + "]" +
      strMsg;
    console.log(strLog);
  }
}
