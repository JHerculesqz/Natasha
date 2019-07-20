export default {
  divId: undefined,
  parentDivId: undefined,
  topGap: undefined,
  scroll: function(strDivId, strParentDivId, iTopGap){
    this.divId = strDivId;
    this.parentDivId = strParentDivId;
    this.topGap = iTopGap;
    var offsetTop = window.$(this.divId).offset().top - window.$(this.parentDivId).offset().top;

    if(window.$(this.divId).offset() && window.$(this.parentDivId).offset()){
      window.$(this.parentDivId).animate({
        scrollTop:window.$(this.parentDivId).scrollTop() + offsetTop - this.topGap
      },{
        duration: 500,
        easing: "swing"
      });
    }
  },
}
