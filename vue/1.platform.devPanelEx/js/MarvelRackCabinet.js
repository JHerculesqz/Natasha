(function ($) {
  $.MarvelRackCabinet = function () {
    //region const
    const iXPlaceholder = "iXPlaceholder";
    const iYPlaceholder = "iYPlaceholder";
    const startPos = "startpos";
    const toStr = Object.prototype.toString;
    //endregion

    //region Fields
    var self = this;

    var m_Draw;

    var m_oOptions = {
      id: "",
      buObjId: "",
      imgUrl: "",
      subBuObjIds: [], //废弃
      subBuObjs: [{id: "", dir: 0}], //0表示竖向，1表示横向
      viewBox: [0, 0, 800, 900] //默认值
    };

    var m_oEventOptions = {
      callbackOnClick: function (strRackId, evt) {
      },
      callbackOnContextmenu: function (strRackId, evt) {
      }
    };

    var ACTIVE_CLASS_NAME = "devPanelEx-rect-active";
    var arr_ActiveIds = [];
    var HOVER_CLASS_NAME = "devPanelEx-rect-hover";
    var arr_DisabledIds = [];
    var DISABLED_CLASS_NAME = "devPanelEx-rect-disabled";
    var arr_NoPicIds = [];
    var arr_subCard_NoPicIds = [];
    var NOPIC_CLASS_NAME = "devPanelEx-rect-nopicture";

    //endregion

    //region imsg
    this.init = function (options, oEventOptions, oAfterCallback) {
      var self = this;
      $.extend(m_oOptions, options);
      $.extend(m_oEventOptions, oEventOptions);
      $.ajax({
        type: 'GET',
        url: m_oOptions.imgUrl,
        success: function (data) {
          //处理id，确保唯一性
          data = _preHandleData(data);
          //init
          _init(data);
          //bindEvent
          _bindEvent();
          //callback
          oAfterCallback && oAfterCallback(1);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          //如果机框图片加载失败，使用默认机框图片再加载一次
          var _productType = m_oOptions.produtType;
          var nePanelChassisConfigs = NEPanelConfig.getNePanelChassisConfig();
          var _oParams = nePanelChassisConfigs[_productType];
          m_oOptions.imgUrl = URL_ROOT + "statics/devPanelEx/image/txt/" + _oParams.chassisBomCode + ".txt?_=" + CACHE_VERSION;
          self.initDefualtPic(m_oOptions, oAfterCallback);
        }
      });
    };

    this.initDefualtPic = function (options, oAfterCallback) {
      $.ajax({
        type: 'GET',
        url: m_oOptions.imgUrl,
        success: function (data) {
          //处理id，确保唯一性
          data = _preHandleData(data);
          //init
          _init(data);
          //bindEvent
          _bindEvent();
          //callback
          oAfterCallback && oAfterCallback(1);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          _addNoPictureColor(m_oOptions.id);
          oAfterCallback && oAfterCallback(1);
        }
      });
    };

    var _preHandleData = function (data) {
      m_oOptions.subBuObjs.forEach(function (oSubBuObj, index) {
        var strId = oSubBuObj.id;
        var strTargetId = _generateId(strId);
        data = data.replace("id=\"" + strId + "\"", "id=\"" + strTargetId + "\"");
      });

      return data;
    };

    var _generateId = function () {
      var strId = Array.prototype.join.call(arguments, "_");
      return m_oOptions.id + "_" + strId;
    };

    var _init = function (data) {
      //清空dom
      if (m_Draw) {
        m_Draw.clear();
      } else {
        m_Draw = SVG(m_oOptions.id);
      }
      m_Draw.viewbox(m_oOptions.viewBox);
      m_Draw.svg(data);
    };

    var _bindEvent = function () {
      if (m_oOptions.hasChassis) {
        m_oOptions.subBuObjs.forEach(function (oSubBuObj, index) {
          var strSubObjId = oSubBuObj.id;
          var strTargetId = _generateId(strSubObjId);
          var oBD = SVG.get(strTargetId);
          _bindEventToMainSlot(oBD, strSubObjId);
        });
        var strSlotId = m_oOptions.id;
        var chassisBD = SVG.get(strSlotId);
        chassisBD.off("mousedown");
      } else {
        var strSlotId = m_oOptions.id;
        var oBD = SVG.get(strSlotId);

        oBD.mousedown(function (evt) {
          if (_isLeftClick(evt)) {
            m_oEventOptions.callbackOnClick(m_oOptions.buObjId, strSlotId, evt);
          } else if (_isRightClick(evt)) {
            m_oEventOptions.callbackOnContextmenu(m_oOptions.buObjId, strSlotId, evt);
          }
          evt.stopPropagation();
        });
      }
    };
    var _bindEventToMainSlot = function (oBD, strSlotId) {
      oBD.mousedown(function (evt) {
        if (_isLeftClick(evt)) {
          m_oEventOptions.callbackOnClick(m_oOptions.buObjId, strSlotId, evt);
        } else if (_isRightClick(evt)) {
          m_oEventOptions.callbackOnContextmenu(m_oOptions.buObjId, strSlotId, evt);
        }
        evt.stopPropagation();
      });
      oBD.mouseover(function (evt) {
        _onMouseover(oBD, evt);
      });
      oBD.mouseout(function (evt) {
        _onMouseout(oBD, evt);
      });
      oBD.dblclick(function (evt) {
        m_oEventOptions.callbackOndblclick && m_oEventOptions.callbackOndblclick(m_oOptions.buObjId, strSlotId, evt);
        evt.stopPropagation();
      });
    };

    var _removeEventToMainSlot = function (oBD) {
      oBD.off("mousedown");
      oBD.off("mouseover");
      oBD.off("mouseout");
      oBD.off("dblclick");
    };

    var _isLeftClick = function (evt) {
      return evt.button == 0 || evt.which == 1;
    };

    var _isRightClick = function (evt) {
      return evt.button == 2 || evt.which == 3;
    };

    var _onMouseover = function (oElement, oEvent) {
      var oChild = oElement.children()[0];
      oChild.addClass(HOVER_CLASS_NAME);
    };

    var _onMouseout = function (oElement, oEvent) {
      var oChild = oElement.children()[0];
      oChild.removeClass(HOVER_CLASS_NAME);
    };

    this.addNode = function (strSlotId, oBuObj, oAfterCallback, oEventCallback) {
      var oHandleData = function (data, slotPos) {
        return _setPos4InsertElement(data, slotPos);
      };

      _addNode(strSlotId, oBuObj, oHandleData, oAfterCallback, oEventCallback);
    };
    this.addNoPictureColor = function (strSlotId) {
      _addNoPictureColor(strSlotId);
    };

    var _addNode = function (strSlotId, oBuObj, oHandleData, oAfterCallback, oEventCallback) {
      var strNodeImsgUrl;
      var isUp = true;
      if (typeof oBuObj === "object") {
        strNodeImsgUrl = oBuObj.imgUrl;
        isUp = oBuObj.isUp;
      } else if (typeof oBuObj === "string") {
        strNodeImsgUrl = oBuObj;
      }
      //当单板占多个槽位时，strSlotId需要传递所有的槽位号，第一个槽位号表示起点位置。
      var slotNum = 1;
      if (toStr.call(strSlotId) === "[object Array]") {
        slotNum = strSlotId.length;
        strSlotId = strSlotId[0];
      }
      $.ajax({
        type: 'GET',
        url: strNodeImsgUrl,
        success: function (data) {
          //找到目标槽位
          var strTargetId = _generateId(strSlotId);
          var slotPos = _getSlotPos(strTargetId);

          //处理数据
          data = oHandleData(data, slotPos);

          //添加到svg标签中
          _addSvgData2Element(m_Draw, data);

          //标记节点的插入槽位号
          var oElement = _setLastChildProp(m_Draw, startPos, strTargetId);

          //判断是否需要旋转, slotNum表示槽位的数量
          _rotateElement(strSlotId, slotPos, slotNum, oElement, isUp);

          //event
          var oEventOptions = Object.assign({
            callbackOnClick: function (strSlotId, oBuObj, evt) {
            },
            callbackOnContextmenu: function (strSlotId, oBuObj, evt) {
            }
          }, oEventCallback);
          oElement.mousedown(function (evt) {
            if (_isLeftClick(evt)) {
              oEventOptions.callbackOnClick(strSlotId, oBuObj, evt);
            } else if (_isRightClick(evt)) {
              oEventOptions.callbackOnContextmenu(strSlotId, oBuObj, evt);
            }
            evt.stopPropagation();
          });

          // _removeNoPictureColor(strSlotId);

          //callback
          if (oAfterCallback) {
            oAfterCallback();
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          //隐藏的bug:如果是占据多个槽位的场景，那么只有一个槽位会加上颜色
          _addNoPictureColor(strSlotId);
        }
      });
    };

    var _addNoPictureColor = function (strSlotId) {
      if (m_oOptions.hasChassis) {
        var strTargetId = _generateId(strSlotId);
        var oElement = SVG.get(strTargetId);
        if (oElement) {
          arr_NoPicIds.push(strSlotId);
          var oChild = oElement.children()[0];
          oChild.addClass(NOPIC_CLASS_NAME);
        }
      } else {
        var strTargetId = _generateId("slot1");
        var oElement = SVG.get(strTargetId);
        if (oElement) {
          arr_NoPicIds.push("slot1");
          var oChild = oElement.children()[0];
          oChild.addClass(NOPIC_CLASS_NAME);
        }
      }
    };
    var _removeNoPictureColor = function (strSlotId) {
      var isDel = false;
      var _arr = [];
      for (var i = 0; i < arr_NoPicIds.length; i++) {
        if (arr_NoPicIds[i] == strSlotId) {
          isDel = true;
        } else {
          _arr.push(arr_NoPicIds[i]);
        }
      }
      if (isDel) {
        arr_NoPicIds = _arr;
        var strTargetId = _generateId(strSlotId);
        var oElement = SVG.get(strTargetId);
        if (oElement) {
          var oChild = oElement.children()[0];
          oChild.removeClass(NOPIC_CLASS_NAME);
        }
      }
    };
    var _getSlotPos = function (strId) {
      var oBDTarget = SVG.get(strId);
      var oBDTargetChild = oBDTarget.children()[0];
      var iX = oBDTargetChild.x();
      var iY = oBDTargetChild.y();
      var iWidth = oBDTargetChild.width();
      var iHeight = oBDTargetChild.height();
      return {
        x: iX,
        y: iY,
        w: iWidth,
        h: iHeight
      };
    };

    var _setPos4InsertElement = function (data, slotPos) {
      return data.replace(iXPlaceholder, slotPos.x).replace(iYPlaceholder, slotPos.y);
    };

    var _addSvgData2Element = function (oElement, data) {
      oElement.svg(data);
    };

    var _setLastChildProp = function (oParentEle, strProp, strPropVal) {
      var oChildren = oParentEle.children();
      var oElement = oChildren[oChildren.length - 1];
      oElement.attr(strProp, strPropVal);
      return oElement;
    };

    var _rotateElement = function (strSlotId, oSlotPos, slotNum, oElement, isUp) {
      var arrRes = m_oOptions.subBuObjs.filter(function (oSubBuObj) {
        return oSubBuObj.id == strSlotId;
      });
      if (arrRes.length) {
        var iDir = arrRes[0].dir;
        if (iDir) {
          oElement.center(oSlotPos.x + oSlotPos.w / 2, oSlotPos.y + oSlotPos.h / 2 * slotNum);
          oElement.rotate(90);
        } else {
          if (!isUp) { // 如果是下框，旋转180
            oElement.center(oSlotPos.x + oSlotPos.w / 2, oSlotPos.y + oSlotPos.h / 2 * slotNum);
            oElement.rotate(-180);
          }
        }
      }
    };

    this.removeNode = function (strSlotId) {
      var strTargetId = _generateId(strSlotId);
      var oElement = _findElementByStartPos(strTargetId);
      _removeNoPictureColor(strSlotId);
      if (oElement) {
        oElement.remove();
      }
    };

    var _findElementByStartPos = function (strPropVal) {
      var oElement = SVG.select("g[" + startPos + "='" + strPropVal + "']");
      if (oElement.length()) {
        return oElement.members[0];
      }
    };

    this.setActiveStyle = function () {
      if (arguments.length) {
        var strTargetId = _generateId.apply(self, arguments);
        var oElement = SVG.get(strTargetId);
        if (oElement) {
          arr_ActiveIds.push(strTargetId);
          var oChild = oElement.children()[0];
          oChild.addClass(ACTIVE_CLASS_NAME);
        }
      }
    };

    this.removeAllActiveStyle = function () {
      arr_ActiveIds.forEach(function (strTargetId) {
        var oElement = SVG.get(strTargetId);
        if (oElement) {
          var oChild = oElement.children()[0];
          oChild.removeClass(ACTIVE_CLASS_NAME);
        }
      });
      arr_ActiveIds = [];
    };

    this.setDisabledStyle = function (strSlotId) {
      if (arguments.length) {
        var strTargetId = _generateId.apply(self, arguments);
        var oElement = SVG.get(strTargetId);
        if (oElement) {
          arr_DisabledIds.push(strSlotId);
          var oChild = oElement.children()[0];
          oChild.addClass(DISABLED_CLASS_NAME);
        }
      }
    };

    this.removeAllDisabledStyle = function () {
      arr_DisabledIds.forEach(function (strSlotId) {
        var strTargetId = _generateId(strSlotId);
        var oElement = SVG.get(strTargetId);
        if (oElement) {
          var oChild = oElement.children()[0];
          oChild.removeClass(DISABLED_CLASS_NAME);
        }
      });
      arr_DisabledIds = [];
    };

    //region 母单板/子单板
    this.addMainNode = function (strSlotId, oBuObj, oAfterCallback, oEventCallback) {
      var strSlotIdOrigin = strSlotId;
      if (toStr.call(strSlotId) === "[object Array]") {
        strSlotId = strSlotId[0];
      }
      var oHandleData = function (data, slotPos) {
        //设置坐标
        data = _setPos4InsertElement(data, slotPos);

        //替换id
        oBuObj.subBuObjs.forEach(function (oSubBuObj) {
          var strSubBuObjId = oSubBuObj.id;
          var strId = _generateId(strSlotId, strSubBuObjId);
          data = data.replace("id=\"" + strSubBuObjId + "\"", "id=\"" + strId + "\"");
        });

        return data;
      };

      var oAfterCallbackEx = function () {
        var oEventOptions = Object.assign({
          callbackOnSubClick: function (strSlotId, oBuObj, strSubBuObjId, evt) {
          },
          callbackOnSubdblclick: function (strSlotId, oBuObj, strSubBuObjId, evt) {
          },
          callbackOnSubContextmenu: function (strSlotId, oBuObj, strSubBuObjId, evt) {
          }
        }, oEventCallback);

        //childEvent
        oBuObj.subBuObjs.forEach(function (oSubBuObj) {
          var strSubBuObjId = oSubBuObj.id;
          var strTargetId = _generateId(strSlotId, strSubBuObjId);
          var oElement = SVG.get(strTargetId);
          oElement.mousedown(function (evt) {
            if (_isLeftClick(evt)) {
              oEventOptions.callbackOnSubClick(strSlotId, oBuObj, strSubBuObjId, evt);
            } else if (_isRightClick(evt)) {
              oEventOptions.callbackOnSubContextmenu(strSlotId, oBuObj, strSubBuObjId, evt);
            }
            evt.stopPropagation();
          });
          oElement.dblclick(function (evt) {
            oEventOptions.callbackOnSubdblclick(strSlotId, oBuObj, strSubBuObjId, evt);
          });
          oElement.mouseover(function (evt) {
            _onMouseover(oElement, evt);
          });
          oElement.mouseout(function (evt) {
            _onMouseout(oElement, evt);
          });
        });

        //callback
        if (oAfterCallback) {
          oAfterCallback();
        }
      };

      _addNode(strSlotIdOrigin, oBuObj, oHandleData, oAfterCallbackEx, oEventCallback);
    };

    this.addSubNode = function (strFirstSlotId, strSecondSlotId, oBuObj, oAfterCallback, oEventCallback) {
      var isUp = true;
      if (typeof oBuObj === "object") {
        isUp = oBuObj.isUp;
      }
      $.ajax({
        type: 'GET',
        url: oBuObj.imgUrl,
        success: function (data) {
          //找到主单板
          var strTargetId = _generateId(strFirstSlotId);
          var oMainBoard = _findElementByStartPos(strTargetId);

          //找到子槽位
          var strTargetId = _generateId(strFirstSlotId, strSecondSlotId);
          var slotPos = _getSlotPos(strTargetId);

          //替换坐标
          data = _setPos4InsertElement(data, slotPos);

          //插入主单板
          _addSvgData2Element(oMainBoard, data);

          //设置属性
          var oElement = _setLastChildProp(oMainBoard, startPos, strTargetId);

          //event
          var oEventOptions = Object.assign({
            callbackOnClick: function (strFirstSlotId, strSecondSlotId, oBuObj, evt) {
            },
            callbackOndblclick: function (strFirstSlotId, strSecondSlotId, oBuObj, evt) {
            },
            callbackOnContextmenu: function (strFirstSlotId, strSecondSlotId, oBuObj, evt) {
            }
          }, oEventCallback);
          oElement.mousedown(function (evt) {
            if (_isLeftClick(evt)) {
              oEventOptions.callbackOnClick(strFirstSlotId, strSecondSlotId, oBuObj, evt);
            } else if (_isRightClick(evt)) {
              oEventOptions.callbackOnContextmenu(strFirstSlotId, strSecondSlotId, oBuObj, evt);
            }
            evt.stopPropagation();
          });
          oElement.dblclick(function (evt) {
            oEventOptions.callbackOndblclick(strFirstSlotId, strSecondSlotId, oBuObj, evt);
            evt.stopPropagation();
          });

          //callback
          if (oAfterCallback) {
            oAfterCallback();
          }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          var strTargetId = _generateId(strFirstSlotId, strSecondSlotId);
          var oElement = SVG.get(strTargetId);
          if (oElement) {
            arr_subCard_NoPicIds.push(strTargetId);
            var oChild = oElement.children()[0];
            oChild.addClass(NOPIC_CLASS_NAME);
          }
          if (oAfterCallback) {
            oAfterCallback();
          }
        }
      });
    };

    this.removeSubNode = function (strFirstSlotId, strSecondSlotId) {
      var strTargetId = _generateId(strFirstSlotId, strSecondSlotId);
      _removeSubCardNoPictureColor(strTargetId);
      var oElement = _findElementByStartPos(strTargetId);
      if (oElement) {
        oElement.remove();
      }
    };
    var _removeSubCardNoPictureColor = function (strSlotId) {
      var isDel = false;
      var _arr = [];
      for (var i = 0; i < arr_subCard_NoPicIds.length; i++) {
        if (arr_subCard_NoPicIds[i] == strSlotId) {
          isDel = true;
        } else {
          _arr.push(arr_subCard_NoPicIds[i]);
        }
      }
      if (isDel) {
        arr_subCard_NoPicIds = _arr;
        var oElement = SVG.get(strSlotId);
        if (oElement) {
          var oChild = oElement.children()[0];
          oChild.removeClass(NOPIC_CLASS_NAME);
        }
      }
    };

    this.exportPng = function (strPicName, options) {
      if (!strPicName.endsWith(".png")) {
        console.error("picture name must end with .png");
        return;
      }
      var outerDom = document.getElementById(m_oOptions.id);
      var oOptions = options || {};
      var iWidth = outerDom.clientWidth,
        iHeight = outerDom.clientHeight;
      oOptions = Object.assign({
        encoderOptions: 1,
        scale: 1,
        responsive: false,
        canvg: false,
        width: iWidth,
        height: iHeight,
      }, oOptions);
      var svgDom = outerDom.firstElementChild;
      var newSvgDom = svgDom.cloneNode(true);
      var str = newSvgDom.innerHTML.replace("devPanelEx-rect-active", "");
      newSvgDom.innerHTML = str;
      saveSvgAsPng(newSvgDom, strPicName, oOptions);
    };

    this.getSVGDataUrl = function (callback) {
      if (m_Draw) {
        var oOptions = {};
        oOptions = Object.assign({encoderOptions: 1, scale: 1}, oOptions);
        var svgDom = document.getElementById(m_oOptions.id).firstElementChild;
        var newSvgDom = svgDom.cloneNode(true);
        var str = newSvgDom.innerHTML.replace("devPanelEx-rect-active", "");
        newSvgDom.innerHTML = str;
        svgAsPngUri(newSvgDom, oOptions, function (url) {
          callback(url);
        });
      } else {
        callback("");
      }
    };
    //endregion

    //endregion
  }
})(jQuery);
