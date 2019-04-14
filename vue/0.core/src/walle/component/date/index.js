import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

export default {
  calendar: function (strDate) {
    var strRes = moment(strDate).calendar();
    return strRes;
  },
  now: function(){
    var oDate = new Date();
    var strRes = oDate.format("yyyyMMdd-hh:mm:ss");
    return strRes;
  },
  getDaysInOneMonth(strYear, strMonth){
    var oMonth = parseInt(strMonth, 10);
    var oDay= new Date(strYear, oMonth, 0);
    return oDay.getDate();
  }
}
