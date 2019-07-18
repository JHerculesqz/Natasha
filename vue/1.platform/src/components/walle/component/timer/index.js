export default {
  startTimer: function (oCallback, iInterval) {
    var timer = setInterval(function(){
      oCallback();
    }, iInterval);

    return timer;
  },
  endTimer: function(timer){
    if(timer != undefined){
      clearInterval(timer);
    }
  }
}
