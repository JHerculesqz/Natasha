export default {
  divId: undefined,
  parentDivId: undefined,
  scroll: function(strDivId, strParentDivId){
    this.divId = strDivId;
    this.parentDivId = strParentDivId;
    var anchor = document.querySelector(this.divId);
    var oParentDiv = document.querySelector(this.parentDivId);
    oParentDiv.scrollTop = anchor.offsetHeight;
  }
}
