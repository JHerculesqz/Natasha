(function ($) {
    $.MarvelRackPanel = function () {
        //region const
        const iXPlaceholder = "iXPlaceholder";
        const iYPlaceholder = "iYPlaceholder";
        const startPos = "startPos";
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
        //endregion

        //region imsg
        this.init = function (options, oEventOptions) {
            $.extend(m_oOptions, options);
            $.extend(m_oEventOptions, oEventOptions);
            $.get(m_oOptions.imgUrl, function (data) {
                //处理id，确保唯一性
                data = _preHandleData(data);
                //init
                _init(data);
                //bindEvent
                _bindEvent();
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
            }
            else {
                m_Draw = SVG(m_oOptions.id);
            }
            m_Draw.viewbox(m_oOptions.viewBox);
            m_Draw.svg(data);
        };

        var _bindEvent = function () {
            m_oOptions.subBuObjs.forEach(function (oSubBuObj, index) {
                var strSubObjId = oSubBuObj.id;
                var strTargetId = _generateId(strSubObjId);
                var oBD = SVG.get(strTargetId);
                oBD.mousedown(function (evt) {
                    if (_isLeftClick(evt)) {
                        m_oEventOptions.callbackOnClick(m_oOptions.buObjId, strSubObjId, evt);
                    }
                    else if (_isRightClick(evt)) {
                        m_oEventOptions.callbackOnContextmenu(m_oOptions.buObjId, strSubObjId, evt);
                    }
                });
                oBD.mouseover(function (evt) {
                    _onMouseover(oBD, evt);
                });
                oBD.mouseout(function (evt) {
                    _onMouseout(oBD, evt);
                });
            });
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

        var _addNode = function (strSlotId, oBuObj, oHandleData, oAfterCallback, oEventCallback) {
            var strNodeImsgUrl;
            if (typeof oBuObj === "object") {
                strNodeImsgUrl = oBuObj.imgUrl;
            }
            else if (typeof oBuObj === "string") {
                strNodeImsgUrl = oBuObj;
            }
            $.get(strNodeImsgUrl, function (data) {
                //找到目标槽位
                var strTargetId = _generateId(strSlotId);
                var slotPos = _getSlotPos(strTargetId);

                //处理数据
                data = oHandleData(data, slotPos);

                //添加到svg标签中
                _addSvgData2Element(m_Draw, data);

                //标记节点的插入槽位号
                var oElement = _setLastChildProp(m_Draw, startPos, strTargetId);

                //判断是否需要旋转
                _rotateElement(strSlotId, slotPos, oElement);

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
                    }
                    else if (_isRightClick(evt)) {
                        oEventOptions.callbackOnContextmenu(strSlotId, oBuObj, evt);
                    }
                    evt.stopPropagation();
                });

                //callback
                if (oAfterCallback) {
                    oAfterCallback();
                }
            });
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

        var _rotateElement = function (strSlotId, oSlotPos, oElement) {
            var arrRes = m_oOptions.subBuObjs.filter(function (oSubBuObj) {
                return oSubBuObj.id == strSlotId;
            });
            if (arrRes.length) {
                var iDir = arrRes[0].dir;
                if (iDir) {
                    oElement.center(oSlotPos.x + oSlotPos.w / 2, oSlotPos.y + oSlotPos.h / 2);
                    oElement.rotate(-90);
                }
            }
        };

        this.removeNode = function (strSlotId) {
            var strTargetId = _generateId(strSlotId);
            var oElement = _findElementByStartPos(strTargetId);
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

        //region 母单板/子单板
        this.addMainNode = function (strSlotId, oBuObj, oAfterCallback, oEventCallback) {
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
                        }
                        else if (_isRightClick(evt)) {
                            oEventOptions.callbackOnSubContextmenu(strSlotId, oBuObj, strSubBuObjId, evt);
                        }
                        evt.stopPropagation();
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

            _addNode(strSlotId, oBuObj, oHandleData, oAfterCallbackEx, oEventCallback);
        };

        this.addSubNode = function (strFirstSlotId, strSecondSlotId, oBuObj, oAfterCallback, oEventCallback) {
            $.get(oBuObj.imgUrl, function (data) {
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
                    callbackOnContextmenu: function (strFirstSlotId, strSecondSlotId, oBuObj, evt) {
                    }
                }, oEventCallback);
                oElement.mousedown(function (evt) {
                    if (_isLeftClick(evt)) {
                        oEventOptions.callbackOnClick(strFirstSlotId, strSecondSlotId, oBuObj, evt);
                    }
                    else if (_isRightClick(evt)) {
                        oEventOptions.callbackOnContextmenu(strFirstSlotId, strSecondSlotId, oBuObj, evt);
                    }
                    evt.stopPropagation();
                });

                //callback
                if (oAfterCallback) {
                    oAfterCallback();
                }
            });
        };

        this.removeSubNode = function (strFirstSlotId, strSecondSlotId) {
            var strTargetId = _generateId(strFirstSlotId, strSecondSlotId);
            var oElement = _findElementByStartPos(strTargetId);
            if (oElement) {
                oElement.remove();
            }
        };
        //endregion

        //region export

        this.exportPng = function (strPicName, options) {
            if (!strPicName.endsWith(".png")) {
                console.error("picture name must end with .png");
                return;
            }
            var oOptions = options || {};
            oOptions = Object.assign({encoderOptions: 1, scale: 1}, oOptions);
            saveSvgAsPng(document.getElementById(m_oOptions.id).firstElementChild, strPicName, oOptions);
        };

        //endregion

        //endregion
    }
})(jQuery);
