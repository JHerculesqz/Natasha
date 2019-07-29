(function ($) {
  $.MarvelDevPanel_2 = function () {
    var self = this;

    //region Const
    var SLOT_NUM_MAX = 256;

    //endregion

    //#region Fields

    //#endregion

    //region init

    this.init = function (oOptions) {
      //#region setUp

      $("#" + oOptions.id).bind("contextmenu", function () {
        return false;
      });

      //#endregion

      //#region slot
      for(var i = 1; i<SLOT_NUM_MAX; i++){
        var oSlot = SVG.get('slot' + i);
        if(oSlot != null){
          _bindClickFunction(oSlot, "slot" + i, oOptions.events);
        }
      }
      //#endregion
    };

    var _bindClickFunction = function (oSlot, strId, oEventOptions) {
      oSlot.mousedown(function (e) {
        if (_isRightClick(e)) {
          oEventOptions.contextMenu4BD({id: strId}, e.clientX, e.clientY, this);
        } 
        else if (_isLeftClick(e)) {
          oEventOptions.click4BD({id: strId}, this);
        }
      });
      oSlot.mouseover(function (e) {
        oEventOptions.mouseOver({id:strId}, e.clientX, e.clientY, this);
      });
      oSlot.mouseout(function (e) {
        oEventOptions.mouseOut({id:strId}, e.clientX, e.clientY, this);
      });
    };

    var _isRightClick = function (evt) {
      if (evt.button == 2 || evt.which == 3) {
        return true;
      }
      return false;
    };

    var _isLeftClick = function (evt) {
      if (evt.button == 0 || evt.which == 1) {
        return true;
      }
      return false;
    };

    //endregion

    //region event

    //#region insertBoard

    this.insertBoard = function (strId, strLabel) {
      var oBj = SVG.get(strId);
      if(oBj == null){
        return;
      }
      var oSlot1 = SVG.adopt(oBj.node.firstElementChild.firstElementChild);
      if (oSlot1 != undefined) {
        oSlot1.opacity(0.7);
      }
      var oSlot2 = oBj.node.lastElementChild.firstElementChild;
      if (oSlot2 != undefined) {
        var iWidth = oBj.node.firstElementChild.getBBox().width;
        var iHeight = oBj.node.firstElementChild.getBBox().height;
        var iLength = iWidth > iHeight ? iWidth : iHeight;
        var iStrLength = (iLength - 15) / 9;
        if(iStrLength < strLabel.length){
          oSlot2.textContent = strLabel.substring(0, iStrLength) + "...";
        }
        else{
          oSlot2.textContent = strLabel;
        }
      }
    };
    this.colorDoubleBoard = function (strId, strLabel) {
      var oBj = SVG.get(strId);
      if(oBj == null){
        return;
      }
      var oSlot1 = SVG.adopt(oBj.node.firstElementChild.firstElementChild);
      if(oSlot1 != undefined){
        oSlot1.opacity(0.7);
      }
    };
    
    this._changePathStyle = function (strSlotKey,arrSlots) {
      for(var i=0; i< arrSlots.length; i++){
        var strSlotId  = strSlotKey + arrSlots[i];
        var oBj = SVG.get(strSlotId);
        if(oBj == null){
          return;
        }
        var oSlot1 = SVG.adopt(oBj.node.firstElementChild.lastElementChild.firstElementChild);
        oSlot1.attr("fill", "#4DB9DF");
        oSlot1.opacity(1);
      }
    };
    this._colorBoardPath = function (strSlot, isClear) {
      var oBj = SVG.get(strSlot);
      if(oBj == null){
        return;
      }
      var oSlot1 = SVG.adopt(oBj.node.firstElementChild.lastElementChild.firstElementChild);
      if(isClear){
        oSlot1.attr("fill","#00252D");
        oSlot1.opacity(0.5);
      }
      else{
        oSlot1.attr("fill","#009BD1");
        oSlot1.opacity(1);
      }
    };

    //#endregion

    //#region changeLabel

    this.changeLabel = function (strId, strLabel) {
      var oBj = SVG.get(strId);
      if(oBj == null){
        return;
      }
      var oSlot2 = oBj.node.lastElementChild.firstElementChild;
      if (oSlot2 != undefined) {
        oSlot2.textContent = strLabel;
      }
    };

    //#endregion

    //#region colorBoard
    
    this.colorBoard = function (strId, strLabel) {
      var oBj = SVG.get(strId);
      if(oBj == null){
        return;
      }
      var oSlot1 = SVG.adopt(oBj.node.firstElementChild.firstElementChild);
      if(oSlot1 != undefined){
        oSlot1.opacity(1);
      }
    };
    
    //#endregion

    //#region clearBoard

    this.clearBoard = function (strId) {
      var oBj = SVG.get(strId);
      if(oBj == null){
        return;
      }
      var oSlot1 = SVG.adopt(oBj.node.firstElementChild.firstElementChild);
      if (oSlot1 != undefined) {
        oSlot1.opacity(0.3);
      }
      var oSlot2 = oBj.node.lastElementChild.firstElementChild;
      if (oSlot2 != undefined) {
        oSlot2.textContent = "";
      }
    };

    //#endregion

    //endregion
  }
})(jQuery);
