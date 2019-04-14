(function ($) {
    $.MarvelTopoNodeGroup = function () {
        //region Const

        var ICON_WIDTH = 32;
        var ICON_HEIGHT = 32;

        const DRAG_STATUS_EMPTY = "";
        const DRAG_STATUS_START = "start";
        const DRAG_STATUS_PROGRESS = "progress";

        //endregion

        //region Fields
        var self = this;

        var oCacheData4NodeDrag = {
            status: DRAG_STATUS_EMPTY,
            lastPointerPos: {
                x: undefined,
                y: undefined
            }
        };

        //endregion

        //region draw

        this.draw = function (oBuObj, oTopo) {
            if (!oBuObj.uiExpandNode) {
                return _drawCollapse(oBuObj, undefined, oTopo);
            }
            else {
                return _drawExpand(oBuObj, undefined, oTopo);
            }
        };

        var _drawCollapse = function (oBuObj, oExpandGroupExists, oTopo) {
            //#region 1.remove

            if (oExpandGroupExists) {
                _removeGroupExists(oExpandGroupExists, oTopo);
            }

            //#endregion

            //#region 2.oGroupExistsPos

            var oGroupExistsPos = _getGroupExistsPos(oBuObj, oExpandGroupExists);

            //#endregion

            //#region 3.collapse Group

            //0.0.生成属性
            oBuObj.uiExpandNode = false;
            self.generateProp(oBuObj, oTopo);

            //0.oGroup
            var oGroup = new Konva.Group({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                x: oGroupExistsPos.x,
                y: oGroupExistsPos.y,
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
            self._setLabelCenter(ICON_WIDTH, ICON_HEIGHT, oLabel);
            oGroup.add(oLabel);

            //#endregion

            //#region 4.parent

            oTopo.ins.layerNode.add(oGroup);

            //#endregion

            //#region 5.event

            oGroup.on('mouseover', function (evt) {
                self._onNodeGroupOrNodeMouseOver(oGroup, oTopo);
            });
            oGroup.on('mouseout', function (evt) {
                self._onNodeGroupOrNodeMouseOut(oGroup, oTopo);
            });
            oGroup.on('dblclick', function (evt) {
                _onCollpaseGroupDBClick(oBuObj, oGroup, oTopo);
                //联动链路
                oTopo.Sprite.LinkGroup.response2NodeEvent4ReDraw(oGroup.tag, oTopo);
            });
            oGroup.on("mousedown", function (evt) {
                //evt.evt.stopPropagation();
                self._onNodeGroupOrNodeClick(oGroup, evt, oTopo);
            });
            oGroup.on('dragmove', function (evt) {
                self.onNodeOrNodeGroupMove(oGroup, oTopo);
            });

            //#endregion

            return oGroup;
        };
        var _drawExpand = function (oBuObj, oCollapseGroupExists, oTopo) {
            //#region 1.remove

            if (oCollapseGroupExists) {
                _removeGroupExists(oCollapseGroupExists, oTopo);
            }

            //#endregion

            //#region 2.oGroupExistsPos

            var oGroupExistsPos = _getGroupExistsPos(oBuObj, oCollapseGroupExists);

            //#endregion

            //#region 3.expand Group

            //0.0.生成属性
            oBuObj.uiExpandNode = true;
            self.generateProp(oBuObj, oTopo);

            //0.oGroup
            var oGroup = new Konva.Group({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                x: oGroupExistsPos.x,
                y: oGroupExistsPos.y,
                visible: oBuObj.uiHide == true ? false : true,
                opacity: oBuObj.uiOpacity != undefined ? oBuObj.uiOpacity : 1.0,
                draggable: true
            });
            oGroup.tag = oBuObj;

            //1.oImage
            // var oImage = new Konva.Image({
            //     x: 0,
            //     y: 0,
            //     image: oTopo.Resource.m_mapImage[oBuObj.uiImgKey4Expand],
            //     opacity: oGroup.opacity(),
            //     width: oBuObj.uiExpandNodeWidth,
            //     height: oBuObj.uiExpandNodeHeight
            // });
            // oGroup.add(oImage);

            var oCircle = new Konva.Circle({
                x: oBuObj.uiExpandNodeWidth / 2,
                y: oBuObj.uiExpandNodeWidth / 2,
                radius: oBuObj.uiExpandNodeWidth / 2,
                opacity: oGroup.opacity(),
                fillEnabled: false,
                stroke: "#ffffff",
                strokeWidth: 5,
                dash: [10, 10],
            });
            oGroup.add(oCircle);

            //2.oLabel
            var oLabel = new Konva.Text({
                x: 0,
                y: 0,
                text: oBuObj.uiLabel,
                opacity: oGroup.opacity(),
                fill: oTopo.Resource.getTheme().node.labelColor
            });
            self._setLabelCenter(oBuObj.uiExpandNodeWidth, oBuObj.uiExpandNodeHeight, oLabel);
            oGroup.add(oLabel);

            //#endregion

            //#region 4.parent

            oTopo.ins.layerNode.add(oGroup);

            //#endregion

            //#region 5.nodes in Group

            for (var i = 0; i < oBuObj.children.length; i++) {
                var oBuObjItem = oBuObj.children[i];
                oTopo.Sprite.Node.drawInGroup(oBuObjItem, oGroup, oTopo);
            }

            //#endregion

            //#region 6.event

            oGroup.on('mouseover', function (evt) {
                self._onNodeGroupOrNodeMouseOver(oGroup, oTopo);
            });
            oGroup.on('mouseout', function (evt) {
                self._onNodeGroupOrNodeMouseOut(oGroup, oTopo);
            });
            oGroup.on('dblclick', function (evt) {
                _onExpandGroupDBClick(oBuObj, oGroup, oTopo);
                //联动链路
                oTopo.Sprite.LinkGroup.response2NodeEvent4ReDraw(oGroup.tag, oTopo);
            });
            oGroup.on("mousedown", function (evt) {
                //evt.evt.stopPropagation();
                self._onNodeGroupOrNodeClick(oGroup, evt, oTopo);
            });
            oGroup.on('dragmove', function (evt) {
                self.onNodeOrNodeGroupMove(oGroup, oTopo);
            });

            //#endregion

            return oGroup;
        };
        var _removeGroupExists = function (oExpandOrCollapseGroupExists, oTopo) {
            oExpandOrCollapseGroupExists.destroy();
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };
        var _getGroupExistsPos = function (oBuObj, oExpandOrCollapseGroupExists) {
            var iX = oExpandOrCollapseGroupExists == undefined ?
                oBuObj.x : oExpandOrCollapseGroupExists.getPosition().x;
            var iY = oExpandOrCollapseGroupExists == undefined ?
                oBuObj.y : oExpandOrCollapseGroupExists.getPosition().y;

            return {
                x: iX,
                y: iY
            };
        };

        //endregion

        //region event

        this._onNodeGroupOrNodeMouseOver = function (oGroup, oTopo) {
            _setMouseHoverStyle(oGroup.children[0], oTopo);
        };
        this._onNodeGroupOrNodeMouseOut = function (oGroup, oTopo) {
            _setMouseHoverOutStyle(oGroup.children[0], oTopo);
        };
        var _onCollpaseGroupDBClick = function (oBuObj, oGroup, oTopo) {
            _drawExpand(oBuObj, oGroup, oTopo);
        };
        var _onExpandGroupDBClick = function (oBuObj, oGroup, oTopo) {
            _drawCollapse(oBuObj, oGroup, oTopo);
        };
        this._onNodeGroupOrNodeClick = function (oGroup, evt, oTopo) {
            //0.判断是否是冒泡
            if (oTopo.Stage.getBuObjByEventTarget(evt.target).id !== oGroup.tag.id) {
                return;
            }
            //1.ctrl press
            if (keyboardJS.isCtrlPress) {
                if (oGroup.tag.uiSelectNode == undefined || false == oGroup.tag.uiSelectNode) {
                    //1.1.select current oGroup
                    _handle4SelectNode(oGroup, evt, oTopo);
                    oTopo.Layer.reDraw(oTopo.ins.layerNode);
                }
                else {
                    //1.2.unSelect current oGroup
                    _handle4UnSelectNode(oGroup, evt, oTopo);
                    oTopo.Layer.reDraw(oTopo.ins.layerNode);
                }
            }
            //2.ctrl not press
            else {
                //2.0
                if (oGroup.tag.uiSelectNode === true) {
                    return;
                }

                //2.1.unSelectAll
                self.unSelectNodeGroupAndNodes(oTopo);
                oTopo.Sprite.LinkGroup.unSelectLinks(oTopo);

                //2.2.select current oGroup
                _handle4SelectNode(oGroup, evt, oTopo);
                oTopo.Layer.reDraw(oTopo.ins.layerNode);
            }
            //3.external event
            if (oGroup.tag.children) {
                oTopo.Stage.eventOptions.callbackOnNodeGroupClick(oGroup.tag, evt);
            }
            else {
                oTopo.Stage.eventOptions.callbackOnNodeClick(oGroup.tag, evt);
            }
        };

        this.onNodeOrNodeGroupMove = function (oGroup, oTopo) {
            //1.联动关联的链路
            oTopo.Sprite.LinkGroup.response2NodeEvent4ReDraw(oGroup.tag, oTopo);
            //2.更新node的坐标
            _updatePosition(oGroup.tag, oGroup, oTopo);
        };
        var _updatePosition = function (oBuObj, oGroup, oTopo) {
            oBuObj.x = oGroup.x();
            oBuObj.y = oGroup.y();
            //eventCallback
            oTopo.Stage.eventOptions.callbackOnPositionUpdate(true);
        };
        //endregion

        //region style

        this._setLabelCenter = function (iIconWidth, iIconHeight, oLabel) {
            oLabel.setOffset({
                x: -iIconWidth / 2 + oLabel.getWidth() / 2,
                y: -iIconHeight
            });
        };

        var _handle4SelectNode = function (oGroup, evt, oTopo) {
            //1.选中样式
            oGroup.tag.uiSelectNode = true;
            _setSelectNodeStyle(oGroup, oTopo);

            //2.tooltips
            _addToolTips(oGroup, evt, oTopo);
        };

        var _addToolTips = function (oGroup, evt, oTopo) {
            //-1.生成属性
            self.generateTip(oGroup.tag, oTopo);

            if (oGroup.tag.uiTitle == "" && oGroup.tag.uiTip == "") {
                return;
            }

            //0.tooltip
            //var iScale = oTopo.ins.stage.scaleX();
            var iScale = 1;
            var oTooltipContent = new Konva.Label({
                x: 0,
                y: 0
            });
            oGroup.add(oTooltipContent);

            var oTagContent = new Konva.Tag({
                fill: "rgba(0,0,0,0.8)",
                pointerDirection: "down",
                pointerWidth: 10 / iScale,
                pointerHeight: 5 / iScale,
                lineJoin: "round"
            });
            oTooltipContent.add(oTagContent);

            var oTextContent = new Konva.Text({
                text: oGroup.tag.uiTip,
                padding: 8 / iScale,
                fontSize: 12 / iScale,
                lineHeight: 1.5,
                fill: "#ffffff"
            });
            oTooltipContent.add(oTextContent);

            var oTooltipTitle = new Konva.Label({
                x: oTooltipContent.x(),
                y: -oTooltipContent.height()
            });
            oGroup.add(oTooltipTitle);

            var oTagTitle = new Konva.Tag({
                fill: "rgba(0,0,0,0.8)",
                pointerDirection: "down",
                pointerWidth: 0,
                pointerHeight: 0,
                lineJoin: "round"
            });
            oTooltipTitle.add(oTagTitle);

            var oTextTitle = new Konva.Text({
                text: oGroup.tag.uiTitle,
                padding: 8 / iScale,
                fontSize: 14 / iScale,
                fontStyle: "bold",
                fill: "#3dcca6"
            });
            oTooltipTitle.add(oTextTitle);

            //移动到顶层，避免遮挡
            oGroup.moveToTop();

            //1.更新宽度

            var iTooltipHeight = oTooltipContent.height() + oTextTitle.height();
            var iTooltipWidth = Math.max(oTooltipContent.getText().width(), oTooltipTitle.getText().width());
            oTooltipContent.getText().width((iTooltipWidth) * iScale);
            oTooltipTitle.getText().width((iTooltipWidth) * iScale);

            //1.确定显示的方向和坐标
            var oPos = oTopo.Stage.getPosInCanvas(oGroup, oTopo);
            var iGWidth = oGroup.children[0].width();
            var iGHeight = oGroup.children[0].height();
            var iSWidth = oTopo.ins.stage.width();
            var iSHeight = oTopo.ins.stage.height();
            var strDirection = 'down';
            //根据坐标值优化strDirection
            if (strDirection == 'down') {
                oTooltipContent.x(iGWidth / 2);
                oTooltipContent.y(0);
                oTooltipContent.getTag().pointerDirection(strDirection);

                oTooltipTitle.x(oTooltipContent.x());
                oTooltipTitle.y(-(oTooltipContent.height() + 5));
                oTooltipTitle.getTag().pointerDirection(strDirection);
            }
        };

        var _handle4UnSelectNode = function (oGroup, evt, oTopo) {
            //1.去选中样式
            oGroup.tag.uiSelectNode = false;
            _setUnSelectNodeStyle(oGroup, oTopo);
            //2.tooltips
            var arrLabel = [];
            arrLabel = oGroup.children.filter(function (oChild, index) {
                if (oChild.nodeType == "Group" && oChild.className == "Label") {
                    return true;
                }
                return false;
            });
            arrLabel.forEach(function (oLabel, index) {
                oLabel.destroy();
            });
        };

        var _setSelectNodeStyle = function (oGroup, oTopo) {
            var oImageOrShape = oGroup.children[0];
            if (oImageOrShape.className == "Circle") {
                var arrRes = oGroup.children.filter(function (oChild) {
                    if (oChild.className == "Rect") {
                        return true;
                    }
                    return false;
                });
                if (arrRes.length) {
                    arrRes[0].visible(true);
                }
                else {
                    var oRect = new Konva.Rect({
                        width: oImageOrShape.width(),
                        height: oImageOrShape.height(),
                        fillEnabled: false,
                        stroke: oTopo.Resource.getTheme().node.selectColor,
                        strokeWidth: 4,
                        opacity: 0.75,
                        shadowColor: oTopo.Resource.getTheme().node.selectColor,
                        shadowBlur: 20
                    });
                    oGroup.add(oRect);

                    oTopo.Layer.reDraw(oTopo.ins.layerNode);
                }
            }
            else if (oImageOrShape.className == "Image") {
                //oImageOrShape.fillEnabled(true);
                //oImageOrShape.fill(oTopo.Resource.getTheme().node.selectColor);
                oImageOrShape.strokeEnabled(true);
                oImageOrShape.stroke(oTopo.Resource.getTheme().node.selectColor);
                oImageOrShape.strokeWidth(4);
                oImageOrShape.lineJoin("round");
                oImageOrShape.lineCap("round");
            }
        };

        var _setUnSelectNodeStyle = function (oGroup) {
            var oImageOrShape = oGroup.children[0];
            if (oImageOrShape.className == "Circle") {
                var arrRes = oGroup.children.filter(function (oChild) {
                    if (oChild.className == "Rect") {
                        return true;
                    }
                    return false;
                });
                if (arrRes.length) {
                    arrRes[0].visible(false);
                }
            }
            else if (oImageOrShape.className == "Image") {
                oImageOrShape.strokeEnabled(false);
            }
        };

        var _setMouseHoverStyle = function (oImageOrShape, oTopo) {
            document.body.style.cursor = 'pointer';

            oImageOrShape.shadowEnabled(true);
            oImageOrShape.shadowColor("rgba(255,255,255,0.75)");
            oImageOrShape.shadowBlur(5);
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        var _setMouseHoverOutStyle = function (oImageOrShape, oTopo) {
            document.body.style.cursor = 'default';

            oImageOrShape.shadowEnabled(false);
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        //endregion

        //region imsg

        this.expandAllNodeGroup = function (oTopo) {
            //1.findAll
            var arrCollapseGroupExists =
                oTopo.Stage.findGroupByTagAttr("uiExpandNode", false, oTopo);

            //2.expand
            for (var i = 0; i < arrCollapseGroupExists.length; i++) {
                var oCollapseGroupExists = arrCollapseGroupExists[i];
                _expandOneNodeGroup(oCollapseGroupExists);
            }
        };

        var _expandOneNodeGroup = function (oCollapseGroupExists, oTopo) {
            _drawExpand(oCollapseGroupExists.tag, oCollapseGroupExists, oTopo);
            //联动链路
            oTopo.Sprite.LinkGroup.response2NodeEvent4ReDraw(oCollapseGroupExists.tag, oTopo);
        };

        this.collapseAllNodeGroup = function (oTopo) {
            //1.findAll
            var arrExpandGroupExists =
                oTopo.Stage.findGroupByTagAttr("uiExpandNode", true, oTopo);

            //2.expand
            for (var i = 0; i < arrExpandGroupExists.length; i++) {
                var oExpandGroupExists = arrExpandGroupExists[i];
                _drawCollapse(oExpandGroupExists.tag, oExpandGroupExists, oTopo);
                //联动链路
                oTopo.Sprite.LinkGroup.response2NodeEvent4ReDraw(oExpandGroupExists.tag, oTopo);
            }
        };

        this.unSelectNodeGroupAndNodes = function (oTopo) {
            //1.get arrSelectNode
            var arrSelectSprites = self.getSelectNodeSprites(oTopo);

            //2.遍历，unSelect
            for (var i = 0; i < arrSelectSprites.length; i++) {
                var oSelectSprite = arrSelectSprites[i];
                _handle4UnSelectNode(oSelectSprite, null, oTopo);
            }

            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        this.zoomInSelectNodeGroupAndNodes = function (oTopo) {
            //1.get arrSelectNode
            var arrSelectNode = self.getSelectNodeSprites(oTopo);

            //2.遍历，放大
            for (var i = 0; i < arrSelectNode.length; i++) {
                var oSelectNode = arrSelectNode[i];
                var oScaleOld = oSelectNode.scale();
                oSelectNode.scale({
                    x: oScaleOld.x + 0.2 <= 5 ? oScaleOld.x + 0.2 : 5,
                    y: oScaleOld.y + 0.2 <= 5 ? oScaleOld.y + 0.2 : 5
                });
            }
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        this.zoomOutSelectNodeGroupAndNodes = function (oTopo) {
            //1.get arrSelectNode
            var arrSelectNode = self.getSelectNodeSprites(oTopo);

            //2.遍历，放大
            for (var i = 0; i < arrSelectNode.length; i++) {
                var oSelectNode = arrSelectNode[i];
                var oScaleOld = oSelectNode.scale();
                oSelectNode.scale({
                    x: oScaleOld.x - 0.2 >= 0.2 ? oScaleOld.x - 0.2 : 0.2,
                    y: oScaleOld.y - 0.2 >= 0.2 ? oScaleOld.y - 0.2 : 0.2
                });
            }
            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        this.getSelectNodeSprites = function (oTopo) {
            //1.findAll
            var arrSelectGroupExists =
                oTopo.Stage.findGroupByTagAttr("uiSelectNode", true, oTopo);

            return arrSelectGroupExists;
        };

        //获取绘制的节点，如果该节点绘制过，直接返回该节点；如果没有绘制过，返回它的父节点
        this.getDrawnNodeById = function (strId, oTopo) {
            var oGroup = this.getDrawnGroupById(strId, oTopo);
            if (oGroup) {
                return oGroup.tag;
            }
        };

        this.getDrawnGroupById = function (strId, oTopo) {
            var oGroup = oTopo.Stage.findOne(strId, oTopo);
            //如果绘制过，直接返回
            if (oGroup) {
                return oGroup;
            }
            //如果没有绘制过，返回父节点
            else {
                var oCollapseGroups = oTopo.Stage.findGroupByTagAttr("uiExpandNode", false, oTopo);
                for (var i = 0, len = oCollapseGroups.length; i < len; i++) {
                    var oCollapseGroup = oCollapseGroups[i];
                    var b = oCollapseGroup.tag.children.some(function (oChild, index) {
                        return oChild.id === strId;
                    });
                    if (b) {
                        return oCollapseGroup;
                    }
                }
            }
            return undefined;
        };

        this.selectNodesById = function (arrNodeIds, oTopo) {
            //1.
            var notFoundId = [];
            arrNodeIds.forEach(function (nodeId, index) {
                var oNodeGroup = oTopo.Stage.findOne(nodeId, oTopo);
                if (oNodeGroup) {
                    oNodeGroup.tag.uiSelectNode = true;
                    _setSelectNodeStyle(oNodeGroup, oTopo);
                }
                else {
                    notFoundId.push(nodeId);
                }
            });
            //2.
            notFoundId.forEach(function (strNodeId) {
                //2.1.展开站点
                var arrCollapseGroupExists =
                    oTopo.Stage.findGroupByTagAttr("uiExpandNode", false, oTopo);
                for (var i = 0, len = arrCollapseGroupExists.length; i < len; i++) {
                    var oBuOBj = arrCollapseGroupExists[i].tag;
                    var bChild = oBuOBj.children.some(function (oChild) {
                        return oChild.id == strNodeId;
                    });
                    if (bChild) {
                        _expandOneNodeGroup(arrCollapseGroupExists[i], oTopo);
                    }
                }
                //2.2.选中节点
                var oNodeGroup = oTopo.Stage.findOne(strNodeId, oTopo);
                if (oNodeGroup) {
                    oNodeGroup.tag.uiSelectNode = true;
                    _setSelectNodeStyle(oNodeGroup, oTopo);
                }
            });

            oTopo.Layer.reDraw(oTopo.ins.layerNode);
        };

        this.stageEventDragstart = function (oEvent, oTopo) {
            //pointerPos
            var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);
            _updatePointerPos(oPos.x, oPos.y);

            //update status
            _updateStatus4Drag(DRAG_STATUS_START);
        };

        var _updatePointerPos = function (iX, iY) {
            oCacheData4NodeDrag.lastPointerPos.x = iX;
            oCacheData4NodeDrag.lastPointerPos.y = iY;
        };

        var _updateStatus4Drag = function (strStatus) {
            oCacheData4NodeDrag.status = strStatus;
        };

        this.stageEventDragmove = function (oEvent, oTopo) {
            if (oCacheData4NodeDrag.status !== DRAG_STATUS_START && oCacheData4NodeDrag.status !== DRAG_STATUS_PROGRESS) {
                return;
            }

            //pointerPos
            var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);
            var iOffSetX = oPos.x - oCacheData4NodeDrag.lastPointerPos.x;
            var iOffSetY = oPos.y - oCacheData4NodeDrag.lastPointerPos.y;
            _updatePointerPos(oPos.x, oPos.y);

            //update select node pos
            var oSelectSprites = self.getSelectNodeSprites(oTopo);
            if (oSelectSprites.length > 1) {
                oSelectSprites.forEach(function (oSprite, index) {
                    if (oSprite.tag.id !== oEvent.target.tag.id) {
                        oSprite.x(oSprite.x() + iOffSetX);
                        oSprite.y(oSprite.y() + iOffSetY);
                        oSprite.fire("dragmove");
                    }
                });

                //redraw
                oTopo.Layer.reDraw(oTopo.ins.layerNode);
            }

            //update status
            _updateStatus4Drag(DRAG_STATUS_PROGRESS);
        };

        this.stageEventDragend = function (oEvent, oTopo) {
            //update cache
            _updateStatus4Drag(DRAG_STATUS_EMPTY);
        };

        this.generateProp = function (oNodeOrNodeGroup, oTopo) {
            oTopo.Stage.eventOptions.callbackGenerateNodeProp(oNodeOrNodeGroup);
        };

        this.generateTip = function (oNodeOrNodeGroup, oTopo) {
            oTopo.Stage.eventOptions.callbackGenerateNodeTip(oNodeOrNodeGroup);
        };

        //endregion
    }
})(jQuery);