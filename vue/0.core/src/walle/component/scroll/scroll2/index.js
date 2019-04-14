export default {
  div: undefined,
  parentDiv: undefined,
  total: 0,
  step: 0,
  moveDistance: 0,
  scroll: function(strDivId, strParentDivId){
    //1.init
    this.div = document.querySelector(strDivId);
    this.parentDiv = document.querySelector(strParentDivId);

    //2.get total/step
    this.total = this.div.offsetHeight;
    this.step = this.total / 10;//this.total / 1000;

    //4._scroll
    this._scroll();
  },
  _scroll: function(){
    var self = this;

    //1.scroll
    this.parentDiv.scrollTop += this.step;
    this.moveDistance += this.step;

    //2.if this.moveDistance < this.total,延迟移动
    if(this.moveDistance < this.total){
      setTimeout(function(){
        self._scroll()
      }, 0.1);
    }
    else{
      this.total = 0;
      this.step = 0;
      this.moveDistance = 0;
    }
  }
}
