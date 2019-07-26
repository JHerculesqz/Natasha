import Timer from "../../../walle/component/timer";

function startTimer(oCallback, iInterval) {
  let timer = setInterval(function () {
    oCallback();
  }, iInterval);
  this.arrTimer.push(timer);
  return timer;
}

function endTimer(timer) {
  if (timer != undefined) {
    for (let i = 0; i < this.arrTimer.length; i++) {
      if (this.arrTimer[i] == timer) {
        this.arrTimer.splice(i, 1);
        break;
      }
    }
    clearInterval(timer);
  }
}

function mountEvent(strSubject, oCallback) {
  this.Bus.$on(strSubject, oCallback);
  this.arrMountEvent.push({
    subject: strSubject,
    callback: oCallback
  })
}

let isInstalled = false;
export default {
  install(Vue) {
    if (isInstalled) {
      return
    }
    isInstalled = true;

    Vue.mixin({
      data() {
        return {
          arrTimer: [],
          arrMountEvent: []
        };
      },
      beforeDestroy() {
        this.arrTimer.forEach((oTimer) => {
          Timer.endTimer(oTimer, this);
        });
        this.arrMountEvent.forEach((oMountEvent) => {
          this.Bus.$off(oMountEvent.subject, oMountEvent.callback);
        })
      }
    });

    //1.定时器处理
    Vue.prototype.$startTimer = startTimer;
    Vue.prototype.$endTime = endTimer;

    //1.mounted事件处理
    Vue.prototype.$mountEvent = mountEvent;
  }

}
