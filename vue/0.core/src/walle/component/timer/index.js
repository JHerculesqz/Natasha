export default {
  timer: undefined,
  startTimer: function (oCallback, iInterval) {
    this.timer = setInterval(function(){
      oCallback();
    }, iInterval);
  },
  endTimer: function(){
    if(this.timer != undefined){
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
