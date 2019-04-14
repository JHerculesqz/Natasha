export default {
  split: function (strMsg, strSplitter) {
    var arrRes = new Array();
    arrRes = strMsg.split(strSplitter);
    return arrRes;
  }
}
