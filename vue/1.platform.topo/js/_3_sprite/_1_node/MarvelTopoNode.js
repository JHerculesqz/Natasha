(function ($) {
    $.MarvelTopoNode = function () {
        //region Const

        var ICON_WIDTH = 32;
        var ICON_HEIGHT = 32;

        //endregion

        //region Fields
        var self = this;

        //region createNode
        const STATUS_START = "start";
        const STATUS_FREE = "";
        var createNodeData = {
            status: STATUS_FREE,
            buObj: undefined,
            autoCreate: true,
            continue: false,
            callback: undefined
        };
        //endregion

        //endregion

        //region draw

        this.draw = function (oBuObj, oTopo) {
            //region 0._destroyNodeById

            _destroyNodeById(oBuObj.id, oTopo);

            //endregion

            //region 1.getPos

            var oPos = _getPos(oBuObj);

            //endregion

            //region 2.node

            //0.1生成属性
            oTopo.Sprite.NodeGroup.generateProp(oBuObj, oTopo);

            var oGroup = new Konva.Group({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                x: oPos.x,
                y: oPos.y,
                visible: oBuObj.uiHide == true ? false : true,
                opacity: oBuObj.uiOpacity != undefined ? oBuObj.uiOpacity : 1.0,
                draggable: true
            });
            oGroup.tag = oBuObj;

            //1.oImage
            var oImage = new Konva.Image({
                x: 0,
                y: 0,
                image: oTopo.Resource.m_mapImage[oBuObj.uiImgKey],
                opacity: oGroup.opacity(),
                width: ICON_WIDTH,
                height: ICON_HEIGHT
            });
            oGroup.add(oImage);

            //2.oLabel
            var oLabel = new Konva.Text({
                x: 0,
                y: 0,
                text: oBuObj.uiLabel,
                opacity: oGroup.opacity(),
                fill: oTopo.Resource.getTheme().node.labelColor
            });
            oTopo.Sprite.NodeGroup._setLabelCenter(ICON_WIDTH, ICON_HEIGHT, oLabel);
            oGroup.add(oLabel);

            //endregion

            //region 3.parent

            oTopo.ins.layerNode.add(oGroup);

            //endregion

            //region 4.event

            oGroup.on('mouseover', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOver(oGroup, oTopo);
            });
            oGroup.on('mouseout', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOut(oGroup, oTopo);
            });
            oGroup.on('mousedown', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeClick(oGroup, evt, oTopo);
                //evt.cancelBubble = true;
                //evt.evt.stopPropagation();
            });
            oGroup.on('dragmove', function (evt) {
                oTopo.Sprite.NodeGroup.onNodeOrNodeGroupMove(oGroup, oTopo);
            });

            //endregion

            return oGroup;
        };

        this.drawInGroup = function (oBuObj, oExpandGroupExists, oTopo) {
            //region 0._destroyNodeById

            _destroyNodeById(oBuObj.id, oTopo);

            //endregion

            //region 1.getPos

            var oPos = _getPos(oBuObj);

            //endregion

            //region 2.node

            //0.1生成属性
            oTopo.Sprite.NodeGroup.generateProp(oBuObj, oTopo);

            var oGroup = new Konva.Group({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                x: oPos.x,
                y: oPos.y,
                draggable: true,
                visible: oBuObj.uiHide == true ? false : true,
                opacity: oBuObj.uiOpacity != undefined ? oBuObj.uiOpacity : 1.0,
                dragBoundFunc: function (pos) {
                    //pos中的坐标是在canvas上的坐标
                    //算法1：限制在矩形中
                    // var iScale = oTopo.ins.stage.scaleX();
                    // var iXMin = oExpandGroupExists.x() * iScale + oTopo.ins.stage.x();
                    // var iXMax = (oExpandGroupExists.x() + oExpandGroupExists.getChildren()[0].width()) * iScale + oTopo.ins.stage.x();
                    // var iYMin = oExpandGroupExists.y() * iScale + oTopo.ins.stage.y();
                    // var iYMax = (oExpandGroupExists.y() + oExpandGroupExists.getChildren()[0].height()) * iScale + oTopo.ins.stage.y();
                    // var iTargetX = pos.x;
                    // var iTargetY = pos.y;
                    // if (iTargetX <= iXMin) {
                    //     iTargetX = iXMin;
                    // }
                    // else if (iTargetX >= iXMax) {
                    //     iTargetX = iXMax;
                    // }
                    // if (iTargetY <= iYMin) {
                    //     iTargetY = iYMin;
                    // }
                    // else if (iTargetY >= iYMax) {
                    //     iTargetY = iYMax;
                    // }
                    // return {
                    //     x: iTargetX,
                    //     y: iTargetY
                    // };

                    //算法2：限制在圆形中
                    //圆心的坐标
                    var iScale = oTopo.ins.stage.scaleX();
                    var iX = (oExpandGroupExists.x() + oExpandGroupExists.getChildren()[0].width() / 2) * iScale + oTopo.ins.stage.x();
                    var iY = (oExpandGroupExists.y() + oExpandGroupExists.getChildren()[0].height() / 2) * iScale + oTopo.ins.stage.y();
                    var radius = (oExpandGroupExists.getChildren()[0].width() / 2) * iScale;

                    var iNodeSize = oGroup.getChildren()[0].width() * iScale;
                    var a;
                    if (iX == pos.x) {
                        a = Math.PI / 2;
                    }
                    else {
                        a = Math.atan((iY - pos.y) / (iX - pos.x));
                    }

                    var iTopX = iX - Math.cos(a) * radius;
                    var iTopY = iY - Math.sin(a) * radius;
                    var iBottomX = iX + Math.cos(a) * radius;
                    var iBottomY = iY + Math.sin(a) * radius;

                    var iXMin = Math.min(iTopX, iBottomX);
                    var iXMax = Math.max(iTopX, iBottomX);

                    var iYMin = Math.min(iTopY, iBottomY);
                    var iYMax = Math.max(iTopY, iBottomY);

                    var iTargetX = pos.x;
                    var iTargetY = pos.y;
                    if (iTargetX <= iXMin) {
                        iTargetX = iXMin;
                    }
                    else if (iTargetX >= iXMax - iNodeSize) {
                        iTargetX = iXMax - iNodeSize;
                    }
                    if (iTargetY <= iYMin) {
                        iTargetY = iYMin;
                    }
                    else if (iTargetY >= iYMax - iNodeSize) {
                        iTargetY = iYMax - iNodeSize;
                    }
                    return {
                        x: iTargetX,
                        y: iTargetY
                    };
                }
            });
            oGroup.tag = oBuObj;

            //1.oImage
            var oImage = new Konva.Image({
                x: 0,
                y: 0,
                image: oTopo.Resource.m_mapImage[oBuObj.uiImgKey],
                opacity: oGroup.opacity(),
                width: ICON_WIDTH,
                height: ICON_HEIGHT
            });
            oGroup.add(oImage);

            //2.oLabel
            var oLabel = new Konva.Text({
                x: 0,
                y: 0,
                text: oBuObj.uiLabel,
                opacity: oGroup.opacity(),
                fill: oTopo.Resource.getTheme().node.labelColor
            });
            oTopo.Sprite.NodeGroup._setLabelCenter(ICON_WIDTH, ICON_HEIGHT, oLabel);
            oGroup.add(oLabel);

            //endregion

            //region 3.parent

            oExpandGroupExists.add(oGroup);

            //endregion

            //region 4.event

            oGroup.on('mouseover', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOver(oGroup, oTopo);
            });
            oGroup.on('mouseout', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeMouseOut(oGroup, oTopo);
            });
            oGroup.on('mousedown', function (evt) {
                oTopo.Sprite.NodeGroup._onNodeGroupOrNodeClick(oGroup, evt, oTopo);
                //evt.evt.cancelBubble = true;
                //evt.evt.stopPropagation();
            });
            oGroup.on('dragmove', function (evt) {
                oTopo.Sprite.NodeGroup.onNodeOrNodeGroupMove(oGroup, oTopo);
            });

            //endregion

            return oGroup;
        };

        var _getPos = function (oBuObj) {
            return {
                x: oBuObj.x,
                y: oBuObj.y
            };
        };

        //endregion

        //region event

        //endregion

        //region style

        //endregion

        //region imsg

        this.getCenterPos = function (oGroup) {
            var width = oGroup.children[0].width();
            var height = oGroup.children[0].height();
            var x = width / 2 + oGroup.x();
            var y = height / 2 + oGroup.y();
            for (; ;) {
                var oGroup = oGroup.getParent();
                if (oGroup && oGroup.nodeType === "Group") {
                    x = x + oGroup.x();
                    y = y + oGroup.y();
                }
                else {
                    break;
                }
            }
            return {
                x: x,
                y: y,
                width: width,
                height: height
            }
        };

        this.getAbsPos = function (oGroup) {
            var x = oGroup.x();
            var y = oGroup.y();
            for (; ;) {
                var oGroup = oGroup.getParent();
                if (oGroup && oGroup.nodeType === "Group") {
                    x = x + oGroup.x();
                    y = y + oGroup.y();
                }
                else {
                    break;
                }
            }
            return {
                x: x,
                y: y
            }
        };

        //region createNode

        this.createNode = function (oBuObj, oAfterCallback, bAutoCreate, oTopo) {
            oTopo.Stage.updateModel(oTopo.Stage.MODEL_CREATE_NODE);
            //save cache
            createNodeData.buObj = oBuObj;
            createNodeData.status = STATUS_START;
            if (bAutoCreate === false) {
                createNodeData.autoCreate = false;
            }
            createNodeData.callback = oAfterCallback;
        };

        this.createNodeContinue = function (oBuObj, oAfterCallback, oTopo) {
            self.createNode(oBuObj, oAfterCallback, false, oTopo);
            //save cache
            createNodeData.continue = true;
        };

        this.stageEventMouseEnter = function (oEvent, oTopo) {
            //update buObj prop
            var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);
            createNodeData.buObj.x = oPos.x;
            createNodeData.buObj.y = oPos.y;
            //绘制网元
            self.draw(createNodeData.buObj, oTopo);
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        this.stageEventMouseMove = function (oEvent, oTopo) {
            var oNode = oTopo.Stage.findOne(createNodeData.buObj.id, oTopo);
            if (oNode) {
                var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);
                //更新网元坐标
                oNode.x(oPos.x);
                oNode.y(oPos.y);
                oTopo.Layer.reDraw(oTopo.ins.layerNode);
            }
        };

        this.stageEventMouseDown = function (oEvent, oTopo) {
            var oNode = oTopo.Stage.findOne(createNodeData.buObj.id, oTopo);
            if (oNode) {
                var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);
                //保存原始坐标
                oNode.tag.oX = oPos.x;
                oNode.tag.oY = oPos.y;
                //保存坐标，在网元移动的时候会同步更新
                oNode.tag.x = oPos.x;
                oNode.tag.y = oPos.y;
                oNode.x(oPos.x);
                oNode.y(oPos.y);
                oTopo.Layer.reDraw(oTopo.ins.layerNode);
            }
            //createNodeEnd
            _createNodeEnd(oTopo, true);
        };

        var _createNodeEnd = function (oTopo, bCreatedSuccessful) {
            if (typeof createNodeData.callback == "function") {
                createNodeData.callback(createNodeData.buObj, bCreatedSuccessful);
            }
            //非连续创建模式
            if (!createNodeData.continue || !bCreatedSuccessful) {
                oTopo.Stage.updateModel(oTopo.Stage.MODEL_EMPTY);
                if (createNodeData.autoCreate === false) {
                    _destroyNodeById(createNodeData.buObj.id, oTopo);
                }
                //clear cache
                createNodeData.buObj = undefined;
                createNodeData.status = STATUS_FREE;
                createNodeData.autoCreate = true;
                createNodeData.continue = false;
                createNodeData.callback = undefined;
            }
        };

        this.stageEventMouseLeave = function (oEvent, oTopo) {
            _destroyNodeById(createNodeData.buObj.id, oTopo);
        };

        var _destroyNodeById = function (strId, oTopo) {
            var oNode = oTopo.Stage.findOne(strId, oTopo);
            if (oNode) {
                oNode.destroy();
                oTopo.Layer.reDraw(oTopo.ins.layerNode);
            }
        };

        this.eventEscPress = function (oEvent, oTopo) {
            if (createNodeData.status == STATUS_START) {
                var oNode = oTopo.Stage.findOne(createNodeData.buObj.id, oTopo);
                if (oNode) {
                    oNode.destroy();
                    oTopo.Layer.reDraw(oTopo.ins.layerNode);
                }
                //取消创建
                _createNodeEnd(oTopo, false);
            }
        };

        //endregion

        //endregion
    }
})(jQuery);