(function ($) {
    $.MarvelTopoBox = function () {
        //region const

        const REACT_STATE_START = "start";
        const REACT_STATE_EMPYT = "";
        const REACT_STATE_PROGRESS = "progress";

        //endregion

        //region Fields

        var self = this;

        var oRect4AreaSelect = {
            id: "areaSelectShape",
            status: REACT_STATE_EMPYT,
            x: 0,
            y: 0
        };

        //endregion

        //region imsg

        this.stageEventMouseDown = function (oEvent, oTopo) {
            if (keyboardJS.isSpacePress) {
                return;
            }
            if (!oTopo.Stage.eventIsFiredOnBackground(oEvent, oTopo)) {
                return;
            }
            //unSelectAll
            oTopo.Sprite.NodeGroup.unSelectNodeGroupAndNodes(oTopo);
            oTopo.Sprite.LinkGroup.unSelectLinks(oTopo);

            //删除(极端情况下监听不到mouseup事件),这里保护下
            self.delReact(oRect4AreaSelect.id, oTopo);

            //cache
            var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);
            oRect4AreaSelect.x = oPos.x;
            oRect4AreaSelect.y = oPos.y;
            _updateStatus(REACT_STATE_START);

            //event
            oTopo.Stage.eventOptions.callbackOnClick(oEvent);
        };

        this.stageEventMouseMove = function (oEvent, oTopo) {
            if (oRect4AreaSelect.status !== REACT_STATE_START && oRect4AreaSelect.status !== REACT_STATE_PROGRESS) {
                return;
            }
            var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);
            var iWidth = (oPos.x - oRect4AreaSelect.x);
            var iHeight = (oPos.y - oRect4AreaSelect.y);
            if (oRect4AreaSelect.status == REACT_STATE_START) {
                self.drawReact({
                    id: oRect4AreaSelect.id,
                    x: oRect4AreaSelect.x,
                    y: oRect4AreaSelect.y,
                    width: iWidth,
                    height: iHeight,
                    stroke: "rgba(26,96,255,0.8)",
                    strokeWidth: 1.5 / oTopo.ins.stage.scaleX(),
                    fill: "rgba(26,96,255,0.2)",
                    //opacity: 1
                }, oTopo);

                _updateStatus(REACT_STATE_PROGRESS);
            }
            else if (oRect4AreaSelect.status == REACT_STATE_PROGRESS) {
                self.updateReactSize(oRect4AreaSelect.id, {
                    width: iWidth,
                    height: iHeight
                }, oTopo);
            }
        };

        this.stageEventMouseUp = function (oEvent, oTopo) {
            if (oRect4AreaSelect.status === REACT_STATE_PROGRESS) {
                //选中范围内的网元
                var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);
                var iMinX = Math.min(oRect4AreaSelect.x, oPos.x);
                var iMaxX = Math.max(oRect4AreaSelect.x, oPos.x);
                var iMinY = Math.min(oRect4AreaSelect.y, oPos.y);
                var iMaxY = Math.max(oRect4AreaSelect.y, oPos.y);

                _selectSpritesInArea({
                    iMinX: iMinX,
                    iMaxX: iMaxX,
                    iMinY: iMinY,
                    iMaxY: iMaxY
                }, oTopo);

                //删除
                self.delReact(oRect4AreaSelect.id, oTopo);

                //event
                var oSelectTopoDate = oTopo.Api.getSelectedData(oTopo);
                oTopo.Stage.eventOptions.callbackOnAreaSelect(oSelectTopoDate);
            }

            //更新status
            _updateStatus(REACT_STATE_EMPYT);
        };

        var _selectSpritesInArea = function (oArea, oTopo) {
            if (oTopo.Stage.config.areaSelect == "node") {
                _selectNodesInArea(oArea, oTopo);
            }
            else if (oTopo.Stage.config.areaSelect == "link") {
                _selectLinksInArea(oArea, oTopo);
            }
            else if (oTopo.Stage.config.areaSelect == "all") {
                _selectNodesInArea(oArea, oTopo);
                _selectLinksInArea(oArea, oTopo);
            }
        };

        var _selectNodesInArea = function (oArea, oTopo) {
            //findNodes
            var arrNodeSprites = oTopo.Stage.findGroupByTagAttr("uiNode", true, oTopo);
            var arrNodeId = [];
            arrNodeSprites.forEach(function (oSprite, index) {
                var oSpritePos = oTopo.Sprite.Node.getAbsPos(oSprite);
                var iX = oSpritePos.x;
                var iY = oSpritePos.y;
                if (iX >= oArea.iMinX && iX <= oArea.iMaxX) {
                    if (iY >= oArea.iMinY && iY <= oArea.iMaxY) {
                        arrNodeId.push(oSprite.tag.id);
                    }
                }
            });

            //select
            oTopo.Sprite.NodeGroup.selectNodesById(arrNodeId, oTopo);

            return arrNodeId;
        };

        var _selectLinksInArea = function (oArea, oTopo) {
            var arrNodeSprites = oTopo.Stage.findGroupByTagAttr("uiNode", true, oTopo);
            var arrNodeId = [];
            arrNodeSprites.forEach(function (oSprite, index) {
                var oSpritePos = oTopo.Sprite.Node.getAbsPos(oSprite);
                var iX = oSpritePos.x;
                var iY = oSpritePos.y;
                var oBuObj = oSprite.tag;
                if (iX >= oArea.iMinX && iX <= oArea.iMaxX) {
                    if (iY >= oArea.iMinY && iY <= oArea.iMaxY) {
                        arrNodeId.push(oBuObj.id);

                        if (oBuObj.children && oBuObj.children.length) {
                            //选中的折叠网元需要把子节点也当成选中节点
                            if (!oBuObj.uiExpandNode) {
                                oBuObj.children.forEach(function (oChild) {
                                    arrNodeId.push(oChild.id);
                                });
                            }
                        }
                    }
                }
            });

            //找到链路id
            var arrLinkIds = [];
            var arrSprites = oTopo.Stage.findGroupByTagAttr("uiLink", true, oTopo);
            arrSprites.forEach(function (oSprite) {
                var oBuObj = oSprite.tag;
                var index = arrNodeId.indexOf(oBuObj.srcNodeId);
                if (index > -1) {
                    arrLinkIds.push(oBuObj.id);
                }
                else {
                    index = arrNodeId.indexOf(oBuObj.dstNodeId);
                    if (index > -1) {
                        arrLinkIds.push(oBuObj.id);
                    }
                }
            });

            //select
            oTopo.Sprite.LinkGroup.selectLinksByIdEx(arrLinkIds, oTopo);

            return arrLinkIds;
        };

        var _updateStatus = function (strStatus) {
            oRect4AreaSelect.status = strStatus;
        };

        this.drawReact = function (oBuObj, oTopo) {
            var oReact = new Konva.Rect({
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo),
                x: oBuObj.x,
                y: oBuObj.y,
                width: oBuObj.width,
                height: oBuObj.height,
                stroke: oBuObj.stroke,
                strokeWidth: oBuObj.strokeWidth,
                fill: oBuObj.fill,
                opacity: oBuObj.opacity ? oBuObj.opacity : 1
            });

            oTopo.ins.layerTemp.add(oReact);
            oTopo.Layer.reDraw(oTopo.ins.layerTemp);
        };

        this.updateReactSize = function (strId, oSize, oTopo) {
            var oReact = oTopo.Stage.findOne(oRect4AreaSelect.id, oTopo);
            if (oReact) {
                oReact.width(oSize.width);
                oReact.height(oSize.height);
                oTopo.Layer.reDraw(oTopo.ins.layerTemp);
            }
        };

        this.delReact = function (strId, oTopo) {
            var oReact = oTopo.Stage.findOne(oRect4AreaSelect.id, oTopo);
            if (oReact) {
                oReact.destroy();
                oTopo.Layer.reDraw(oTopo.ins.layerTemp);
            }
        };

        //endregion
    };
})(jQuery);