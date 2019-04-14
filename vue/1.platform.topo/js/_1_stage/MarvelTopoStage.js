(function ($) {
    $.MarvelTopoStage = function () {
        //region Const

        var ZOOM_SCALE = 1.15;
        var MIN_SCALE = 0.02;

        this.MODEL_EMPTY = '';
        this.MODEL_CREATE_NODE = 'createNode';
        this.MODEL_CREATE_LINK = 'createLink';

        //endregion

        //region Fields

        var self = this;

        this.model = self.MODEL_EMPTY;

        this.eventOptions = {
            //region node
            callbackOnNodeClick: function (oNode, oEvent) {
            },
            callbackGenerateNodeProp: function (oNode) {
            },
            callbackGenerateNodeTip: function (oNode) {
            },
            //endregion
            //region nodeGroup
            callbackOnNodeGroupClick: function (oNodeGroup, oEvent) {
            },
            //endregion
            //region linkGroup
            callbackOnLinkGroupClick: function (oLinkGroup, oEvent) {
            },
            callbackOnLinkClick: function (oLink, oEvent) {
            },
            callbackGenerateLinkProp: function (oNode) {
            },
            callbackGenerateLinkTip: function (oNode) {
            },
            //endregion
            //region stage
            callbackOnClick: function (oEvent) {},
            callbackOnRightClick: function (oBuObj, iX, iY, oEvent) {
            }, //oBuObj为background时,表示点击的是背景
            callbackOnPositionUpdate: function (bUpdate) {
            },
            callbackOnAreaSelect: function(oSelectTopoData){}
            //endregion
        };

        this.config = {
            areaSelect: "node"
        };

        //endregion

        //region init

        this.init = function (strId, iWidth, iHeight, oEventOptions, oTopo) {
            //region 1._initContainer

            _initContainer(strId, oTopo);

            //endregion

            //region 2.init oStage

            var oStage = new Konva.Stage({
                id: $.MarvelTopoStage.id++,
                container: strId,
                width: iWidth,
                height: iHeight,
                draggable: false
            });

            //endregion

            //region 3.event

            //滚轮缩放
            _initEventWheel(strId, oStage, oTopo);
            //stage拖动
            _initEventDragstart(oStage, oTopo);
            _initEventDragmove(oStage, oTopo);
            _initEventDragend(oStage, oTopo);
            //放大、缩小网元
            _initEventAddMinus(oTopo);
            //快捷键ctrl、esc、space
            _initEventCtrlPress(oTopo);
            _initEventEscPress(oTopo);
            _initEventSpacePress(oTopo);
            //鼠标事件
            _initEventMouseDown(oStage, oTopo);
            _initEventMouseUp(oStage, oTopo);
            _initEventMouseMove(oStage, oTopo);
            _initEventMouseEnter(oStage, oTopo);
            _initEventMouseLeave(oStage, oTopo);
            //右键事件
            _initContextmenu(oStage, oTopo);

            //endregion

            //region initEventOpions
            $.extend(self.eventOptions, oEventOptions);
            //endregion

            return oStage;
        };

        var _initContainer = function (strId, oTopo) {
            $("#" + strId).css("background-color", oTopo.Resource.getTheme().stage["bgColor"]);
            $("#" + strId).css("background-image", oTopo.Resource.getTheme().stage["bgImg"]);
        };

        //endregion

        //region event

        //region 滚轮事件
        var _initEventWheel = function (strId, oStage, oTopo) {
            document.getElementById(strId).addEventListener('wheel', function (e) {
                e.preventDefault();
                var oldScale = oStage.scaleX();
                var mousePointTo = {
                    x: oStage.getPointerPosition().x / oldScale - oStage.x() / oldScale,
                    y: oStage.getPointerPosition().y / oldScale - oStage.y() / oldScale
                };
                //往上滚deltaY小于0
                var newScale = e.deltaY < 0 ? oldScale * ZOOM_SCALE : oldScale / ZOOM_SCALE;
                //限制最小的缩放比
                newScale = Math.max(newScale, MIN_SCALE);
                oStage.scale({x: newScale, y: newScale});
                var newPos = {
                    x: -(mousePointTo.x - oStage.getPointerPosition().x / newScale) * newScale,
                    y: -(mousePointTo.y - oStage.getPointerPosition().y / newScale) * newScale
                };
                oStage.position(newPos);
                //重置backgroundLayer
                oTopo.Layer.reSetBackgroundLayer(oTopo);
                oStage.batchDraw();
            });
        };
        //endregion

        //region drag事件
        var _initEventDragstart = function (oStage, oTopo) {
            oStage.on("dragstart", function (evt) {
                var oTarget = evt.target;
                if (oTarget.nodeType === "Group") {
                    oTopo.Sprite.NodeGroup.stageEventDragstart(evt, oTopo);
                }
            });
        };

        var _initEventDragmove = function (oStage, oTopo) {
            oStage.on("dragmove", function (evt) {
                var oTarget = evt.target;
                if (oTarget.nodeType === "Group") {
                    oTopo.Sprite.NodeGroup.stageEventDragmove(evt, oTopo);
                }
            });
        };

        var _initEventDragend = function (oStage, oTopo) {
            oStage.on("dragend", function (evt) {
                var oTarget = evt.target;
                //oStageLayer不移动 确保oStageLayer处于原始位置
                if (oTarget.nodeType === "Stage") {
                    //重置backgroundLayer
                    oTopo.Layer.reSetBackgroundLayer(oTopo);
                }
                else if (oTarget.nodeType === "Group") {
                    oTopo.Sprite.NodeGroup.stageEventDragend(evt, oTopo);
                }
            });
        };
        //endregion

        //region 键盘事件
        var _initEventAddMinus = function (oTopo) {
            keyboardJS.bind('+', function (e) {
                oTopo.Sprite.NodeGroup.zoomInSelectNodeGroupAndNodes(oTopo);
            });
            keyboardJS.bind('-', function (e) {
                oTopo.Sprite.NodeGroup.zoomOutSelectNodeGroupAndNodes(oTopo);
            });
        };

        var _initEventCtrlPress = function (oTopo) {
            keyboardJS.bind('ctrl', function (e) {
                keyboardJS.isCtrlPress = true;
            }, function (e) {
                keyboardJS.isCtrlPress = false;
            });
        };

        var _initEventEscPress = function (oTopo) {
            keyboardJS.bind('esc', function (e) {
                //down
                if (self.model === self.MODEL_CREATE_NODE) {
                    oTopo.Sprite.Node.eventEscPress(e, oTopo);
                }
                else if (self.model == self.MODEL_CREATE_LINK) {
                    oTopo.Sprite.LinkGroup.eventEscPress(e, oTopo);
                }
            }, function (e) {
                //up
            });
        };

        var _initEventSpacePress = function (oTopo) {
            keyboardJS.bind('space', function (e) {
                //按下空格键才可以拖动
                _setDraggable4Stage(true, oTopo);
                keyboardJS.isSpacePress = true;
            }, function (e) {
                _setDraggable4Stage(false, oTopo);
                keyboardJS.isSpacePress = false;
            });
        };
        //endregion

        //region 鼠标事件
        var _initEventMouseDown = function (oStage, oTopo) {
            oStage.on("mousedown", function (e) {
                if (self.model === self.MODEL_CREATE_NODE) {
                    oTopo.Sprite.Node.stageEventMouseDown(e, oTopo);
                }
                else if (self.model == self.MODEL_CREATE_LINK) {
                    oTopo.Sprite.LinkGroup.stageEventMouseDown(e, oTopo);
                }
                else if (self.model === self.MODEL_EMPTY) {
                    oTopo.Sprite.Box.stageEventMouseDown(e, oTopo);
                }
            });
        };

        var _initEventMouseUp = function (oStage, oTopo) {
            oStage.on("mouseup", function (e) {
                if (self.model === self.MODEL_CREATE_NODE) {

                }
                else if (self.model === self.MODEL_EMPTY) {
                    oTopo.Sprite.Box.stageEventMouseUp(e, oTopo);
                }
            });
        };

        var _initEventMouseMove = function (oStage, oTopo) {
            oStage.on("mousemove", function (e) {
                if (self.model === self.MODEL_CREATE_NODE) {
                    oTopo.Sprite.Node.stageEventMouseMove(e, oTopo);
                }
                else if (self.model == self.MODEL_CREATE_LINK) {
                    oTopo.Sprite.LinkGroup.stageEventMouseMove(e, oTopo);
                }
                else if (self.model === self.MODEL_EMPTY) {
                    oTopo.Sprite.Box.stageEventMouseMove(e, oTopo);
                }
            });
        };

        var _initEventMouseEnter = function (oStage, oTopo) {
            oStage.on("mouseenter", function (e) {
                if (self.model === self.MODEL_CREATE_NODE) {
                    oTopo.Sprite.Node.stageEventMouseEnter(e, oTopo);
                }
            });
        };

        var _initEventMouseLeave = function (oStage, oTopo) {
            oStage.on("mouseleave", function (e) {
                if (self.model === self.MODEL_CREATE_NODE) {
                    oTopo.Sprite.Node.stageEventMouseLeave(e, oTopo);
                }
            });
        };
        //endregion

        //region 点击事件
        var _initContextmenu = function (oStage, oTopo) {
            //屏蔽默认的右键事件
            oStage.on("contentContextmenu", function (e) {
                e.evt.preventDefault();
            });

            oStage.on("click", function (e) {
                if (oTopo.Utils.isRightClick(e.evt)) {
                    var oData;
                    //点击的是背景画布
                    if (self.eventIsFiredOnBackground(e, oTopo)) {
                        oData = "background";
                    }
                    //点击的是画布上的元素
                    else {
                        oData = oTopo.Api.getSelectedData(oTopo);
                    }
                    self.eventOptions.callbackOnRightClick(oData, e.evt.clientX, e.evt.clientY, e);
                }
                e.evt.stopPropagation();
            });
        };
        //endregion

        var _setDraggable4Stage = function (bEnable, oTopo) {
            oTopo.ins.stage.draggable(bEnable);
        };

        //endregion

        //region imsg

        this.eventIsFiredOnBackground = function (oEvent, oTopo) {
            return oEvent.target.attrs.id == self.getIdentityValue(oTopo.Layer.BACKGROUND_SHAPE_ID, oTopo)
        };

        this.getPointerPos4DrawInStage = function (oTopo) {
            var iScale = oTopo.ins.stage.scaleX();
            return {
                x: (oTopo.ins.stage.pointerPos.x - oTopo.ins.stage.x()) / iScale,
                y: (oTopo.ins.stage.pointerPos.y - oTopo.ins.stage.y()) / iScale
            };
        };

        this.getPosInCanvas = function (oSprite, oTopo) {
            var iScale = oTopo.ins.stage.scaleX();
            return {
                x: oSprite.x() * iScale + oTopo.ins.stage.x(),
                y: oSprite.y() * iScale + oTopo.ins.stage.y()
            }
        };

        this.getBuObjByEventTarget = function (oEventTarget) {
            if (!oEventTarget) {
                return undefined;
            }
            if (oEventTarget.tag) {
                return oEventTarget.tag;
            }
            else {
                return self.getBuObjByEventTarget(oEventTarget.parent);
            }
        };

        this.clearAllGroups = function (oTopo) {
            var arrGroup = oTopo.ins.stage.find("Group");
            arrGroup.forEach(function (oGroup, index) {
                oGroup.destroy();
            });
        };

        this.findOne = function (strId, oTopo) {
            var strWrapperId = self.getIdentityValue(strId, oTopo);
            var oEle = oTopo.ins.stage.findOne("#" + strWrapperId);
            return oEle;
        };

        this.findGroupByTagAttr = function (strAttrKey, oAttrValue, oTopo) {
            var arrRes = [];

            var arrGroup = oTopo.ins.stage.find("Group");
            for (var i = 0; i < arrGroup.length; i++) {
                var oGroup = arrGroup[i];
                if (oGroup.tag && undefined != oGroup.tag[strAttrKey]) {
                    if (oGroup.tag[strAttrKey] == oAttrValue) {
                        arrRes.push(oGroup);
                    }
                }
            }

            return arrRes;
        };

        this.getIdentityValue = function (value, oTopo) {
            return oTopo.ins.stage.id() + "_" + value;
        };

        this.updateModel = function (strModel) {
            self.model = strModel;
        };

        this.setConfig = function (oConfig) {
            Object.assign(self.config, oConfig);
        };

        //endregion
    };
    $.MarvelTopoStage.id = 1;
})(jQuery);