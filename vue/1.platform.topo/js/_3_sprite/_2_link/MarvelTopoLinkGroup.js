(function ($) {
    $.MarvelTopoLinkGroup = function () {
        //region Const

        var OFFSET = 15;

        var POINTERWIDTH = 8;
        var POINTERHEIGHT = 8;

        //endregion

        //region fields
        var self = this;

        const CREATE_MOCK_LINKID = "createMockLinkId";
        const STATUS_PENDING = "pendging";
        const STATUS_START = "start";
        const STATUS_END = "end";
        const STATUS_FREE = "";
        var createLinkData = {
            status: STATUS_FREE,
            startObj: undefined,
            endObj: undefined,
            continue: false,
            callback: undefined
        };

        //endregion

        //region draw

        this.draw = function (arrLinks, oTopo) {
            //对链路按照源宿网元进行分组
            var groupByNodes = {};
            arrLinks.forEach(function (oLink, index) {
                var groupNodeId = _getGroupNodeId(oLink, oTopo);
                var arrLinks = groupByNodes[groupNodeId];
                if (!arrLinks) {
                    arrLinks = groupByNodes[groupNodeId] = [];
                }
                arrLinks.push(oLink);
            });
            //对两个网元之间的链路进行分组，用于找出可以捆绑的链路
            for (var k in groupByNodes) {
                var arrLinks4Draw = [];
                var groupByGroupLinkId = {};
                groupByNodes[k].forEach(function (oLink, index) {
                    //如果设置了uiLinkGroupId
                    if (oLink.uiLinkGroupId) {
                        var groupLinks = groupByGroupLinkId[oLink.uiLinkGroupId];
                        if (!groupLinks) {
                            groupLinks = groupByGroupLinkId[oLink.uiLinkGroupId] = [];
                        }
                        groupLinks.push(oLink);
                    }
                    //没有设置uiLinkGroupId的，认为是单根链路
                    else {
                        arrLinks4Draw.push(oLink);
                    }
                });
                for (var key in groupByGroupLinkId) {
                    var groupLinks = groupByGroupLinkId[key];
                    //如果groupLinks的长度为1，认为是单根链路
                    if (groupLinks.length === 1) {
                        arrLinks4Draw.push(groupLinks[0]);
                    }
                    else {
                        var groupLink = _generateGroupLink(groupLinks);
                        arrLinks4Draw.push(groupLink);
                    }
                }
                //绘制两个网元之间的链路
                _draw4LinksBetween2Nodes(arrLinks4Draw, oTopo);

                //linkLayer绘制
                oTopo.Layer.reDraw(oTopo.ins.layerLink);
            }
        };

        var _getGroupNodeId = function (oLink, oTopo) {
            //找到绘制的节点(节点自己或者节点的父亲)
            var srcNodeRel = oTopo.Sprite.NodeGroup.getDrawnNodeById(oLink.srcNodeId, oTopo);
            var dstNodeRel = oTopo.Sprite.NodeGroup.getDrawnNodeById(oLink.dstNodeId, oTopo);
            if (srcNodeRel.id < dstNodeRel.id) {
                return srcNodeRel.id + "-" + dstNodeRel.id;
            }
            else {
                return dstNodeRel.id + "-" + srcNodeRel.id;
            }
        };

        var _generateGroupLink = function (groupLinks) {
            var oChildLink = groupLinks[0];
            var groupLink = {
                id: oChildLink.uiLinkGroupId,
                srcNodeId: oChildLink.srcNodeId,
                dstNodeId: oChildLink.dstNodeId,
                uiLink: true,
                uiLinkExpand: oChildLink.uiLinkExpand,
                children: groupLinks
            };
            return groupLink;
        };

        var _isGroupLink = function (oBuObj) {
            return oBuObj.children && oBuObj.children.length > 1;
        };

        var _draw4LinksBetween2Nodes = function (arrLinks, oTopo) {
            //需要绘制的链路
            var arrLinks4Draw = [];
            arrLinks.forEach(function (oLink, index) {
                //如果是捆绑链路
                if (_isGroupLink(oLink)) {
                    //如果是展开的
                    if (oLink.uiLinkExpand === true) {
                        oLink.children.forEach(function (oChildLink, index) {
                            oChildLink.parent = oLink;
                            arrLinks4Draw.push(oChildLink);
                        });
                    }
                    //如果是折叠的
                    else {
                        arrLinks4Draw.push(oLink);
                    }
                }
                //如果是单根链路
                else {
                    arrLinks4Draw.push(oLink);
                }

                //生成链路的属性
                oTopo.Stage.eventOptions.callbackGenerateLinkProp(oLink);
            });

            //对arrLinks4Draw分组
            var arrLinks4Show = [];
            var arrLinks4Hide = [];
            for (var i = 0, len = arrLinks4Draw.length; i < len; i++) {
                var oLink = arrLinks4Draw[i];
                if (oLink.uiHide == true) {
                    arrLinks4Hide.push(oLink);
                    continue;
                }
                var oNodeSrc = oTopo.Sprite.NodeGroup.getDrawnGroupById(oLink.srcNodeId, oTopo);
                if (!oNodeSrc.isVisible()) {
                    arrLinks4Hide.push(oLink);
                    continue;
                }
                var oNodeDst = oTopo.Sprite.NodeGroup.getDrawnGroupById(oLink.dstNodeId, oTopo);
                if (!oNodeDst.isVisible()) {
                    arrLinks4Hide.push(oLink);
                    continue;
                }
                //如果是同一个站点中两个设备之间的链路，当站点折叠的时候，链路的源宿点都是同一个站点
                if (oNodeSrc.id() == oNodeDst.id()) {
                    arrLinks4Hide.push(oLink);
                    continue;
                }
                arrLinks4Show.push(oLink);
            }

            //绘制隐藏链路
            _drawLink4Hide(arrLinks4Hide, oTopo);

            //绘制显示链路
            arrLinks4Show.forEach(function (oLink, index) {
                _drawLinkEx(arrLinks, oLink, index, arrLinks4Show.length, oTopo);
            });
        };

        //可删除，用_drawLinkEx替换
        var _drawLink = function (arrSrcLinks, oBuObj, iOffsetIndex, oTopo) {
            //remove
            var oLinkExists = oTopo.Stage.findOne(oBuObj.id, oTopo);
            if (oLinkExists) {
                oLinkExists.destroy();
            }

            var position = _getPosition(oBuObj, iOffsetIndex, oTopo);

            //group
            var oGroup = new Konva.Group({
                x: 0,
                y: 0,
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo)
            });
            oGroup.tag = oBuObj;

            //line
            var oLine = new Konva.Line({
                points: [position.start.x, position.start.y, position.middle.x, position.middle.y, position.end.x, position.end.y],
                stroke: _getLinkColor(oBuObj, oTopo),
                strokeWidth: _getLinkWidth(oBuObj, oTopo),
                dash: _getLinkDash(oBuObj, oTopo),
                tension: 1
            });
            oGroup.add(oLine);

            //label
            var oCenterLabel = new Konva.Text({
                x: 0,
                y: 0,
                text: _genLinkCenterLabel(oBuObj, oTopo),
                fontSize: 12,
                fill: _getCenterLabelColor(oBuObj, oTopo)
            });
            _setCenterLabelPosition(oCenterLabel, position.middle);
            oGroup.add(oCenterLabel);

            oTopo.ins.layerLink.add(oGroup);

            //event
            oLine.on("click", function (evt) {
                console.log("link click");
                _onLinkClick(oGroup, evt, oTopo);
            });
            oLine.on("mouseover", function (evt) {
                _setMouseHoverStyle(this, oTopo)
            });
            oLine.on("mouseout", function (evt) {
                _setMouseHoverOutStyle(this, oTopo);
            });
            oLine.on("dblclick", function (evt) {
                console.log("link dblclick");
                _dblClickLink(arrSrcLinks, oGroup, oTopo);
            });

            return oLine;
        };

        var _drawLinkEx = function (arrSrcLinks, oBuObj, iOffsetIndex, linkCount, oTopo) {
            //remove
            var oLinkExists = oTopo.Stage.findOne(oBuObj.id, oTopo);
            if (oLinkExists) {
                oLinkExists.destroy();
            }

            //坐标
            var position = _getPositionEx(oBuObj, iOffsetIndex, linkCount, oTopo);

            //group
            var oGroup = new Konva.Group({
                x: 0,
                y: 0,
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo)
            });
            oGroup.tag = oBuObj;

            //line
            var oLine = new Konva.Line({
                points: [position.start1.x, position.start1.y, position.start2.x, position.start2.y, position.start3.x, position.start3.y,
                    position.middle.x, position.middle.y,
                    position.end3.x, position.end3.y, position.end2.x, position.end2.y, position.end1.x, position.end1.y],
                stroke: _getLinkColor(oBuObj, oTopo),
                strokeWidth: _getLinkWidth(oBuObj, oTopo),
                dash: _getLinkDash(oBuObj, oTopo)
            });
            oGroup.add(oLine);
            //单向箭头
            if (oBuObj.uiDirection == 1) {
                var oArrow = _drawArrow({
                    sX: position.end3.x,
                    sY: position.end3.y,
                    eX: position.end2.x,
                    eY: position.end2.y
                }, oBuObj, oTopo);
                oGroup.add(oArrow);
            }
            //双向箭头
            else if (oBuObj.uiDirection == 2) {
                var oArrow = _drawArrow({
                    sX: position.end3.x,
                    sY: position.end3.y,
                    eX: position.end2.x,
                    eY: position.end2.y
                }, oBuObj, oTopo);
                oGroup.add(oArrow);
                var oArrow = _drawArrow({
                    sX: position.start3.x,
                    sY: position.start3.y,
                    eX: position.start2.x,
                    eY: position.start2.y
                }, oBuObj, oTopo);
                oGroup.add(oArrow);
            }

            //label
            var oCenterLabel = new Konva.Text({
                x: 0,
                y: 0,
                text: _genLinkCenterLabel(oBuObj, oTopo),
                fontSize: 12,
                fill: _getCenterLabelColor(oBuObj, oTopo)
            });
            _setCenterLabelPosition(oCenterLabel, position.middle);
            oGroup.add(oCenterLabel);

            //uiSelectLink
            if (oBuObj.uiSelectLink === true) {
                _setSelectLinkStyle(oGroup, oTopo);
            }

            oTopo.ins.layerLink.add(oGroup);

            //event
            oGroup.on("click", function (evt) {
                console.log("link click");
                _onLinkClick(oGroup, evt, oTopo);
            });
            oGroup.on("mouseover", function (evt) {
                _setMouseHoverStyle(oGroup, oTopo)
            });
            oGroup.on("mouseout", function (evt) {
                _setMouseHoverOutStyle(oGroup, oTopo);
            });
            oGroup.on("dblclick", function (evt) {
                console.log("link dblclick");
                _dblClickLink(arrSrcLinks, oGroup, oTopo);
            });

            return oLine;
        };

        var _drawArrow = function (oPos, oBuObj, oTopo) {
            var oArrow = new Konva.Arrow({
                points: [oPos.sX, oPos.sY, oPos.eX, oPos.eY],
                pointerWidth: POINTERWIDTH,
                pointerHeight: POINTERHEIGHT,
                fill: _getLinkColor(oBuObj, oTopo),
                stroke: _getLinkColor(oBuObj, oTopo),
                strokeWidth: _getLinkWidth(oBuObj, oTopo),
                lineJoin: "round",
                lineCap: "round"
            });
            return oArrow;
        };

        var _drawLink4Hide = function (arrLinks, oTopo) {
            arrLinks.forEach(function (oBuObj) {
                //remove
                var oLinkExists = oTopo.Stage.findOne(oBuObj.id, oTopo);
                if (oLinkExists) {
                    oLinkExists.destroy();
                }

                //group
                var oGroup = new Konva.Group({
                    x: 0,
                    y: 0,
                    visible: false,
                    id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo)
                });
                oGroup.tag = oBuObj;

                oTopo.ins.layerLink.add(oGroup);
            });
        };
        //endregion

        //region event

        var _onLinkClick = function (oGroup, evt, oTopo) {
            //1.ctrl press
            if (keyboardJS.isCtrlPress) {
                if (oGroup.tag.uiSelectLink == undefined || false == oGroup.tag.uiSelectLink) {
                    //1.1.select current oGroup
                    _handle4SelectLink(oGroup, evt, oTopo);

                    oTopo.Layer.reDraw(oTopo.ins.layerLink);
                }
                else {
                    //1.2.unSelect current oGroup
                    _handle4UnSelectLink(oGroup, evt, oTopo);

                    oTopo.Layer.reDraw(oTopo.ins.layerLink);
                }
            }
            //2.ctrl not press
            else {
                //2.1.unSelectAll
                self.unSelectLinks(oTopo);
                oTopo.Sprite.NodeGroup.unSelectNodeGroupAndNodes(oTopo);

                //2.2.select current oGroup
                _handle4SelectLink(oGroup, evt, oTopo);

                oTopo.Layer.reDraw(oTopo.ins.layerLink);
            }
            //3.external event
            if (oGroup.tag.children) {
                oTopo.Stage.eventOptions.callbackOnLinkGroupClick(oGroup.tag, evt);
            }
            else {
                oTopo.Stage.eventOptions.callbackOnLinkClick(oGroup.tag, evt);
            }
        };

        var _handle4SelectLink = function (oGroup, evt, oTopo) {
            //1.样式
            oGroup.tag.uiSelectLink = true;
            _setSelectLinkStyle(oGroup, oTopo);
            //2.tooltip
            _addToolTip(oGroup, evt, oTopo);
        };

        var _addToolTip = function (oGroup, evt, oTopo) {
            //生成Tip
            oTopo.Stage.eventOptions.callbackGenerateLinkTip(oGroup.tag);

            var strTitle = _genLinkTitle(oGroup.tag, oTopo);
            var strContent = _genLinkTitleContent(oGroup.tag, oTopo);
            if (strTitle == "" && strContent == "") {
                return;
            }

            var iScale = 1;
            var oTooltipContent = new Konva.Label({
                id: oTopo.Stage.getIdentityValue(oGroup.tag.id + "_linkLabelTitle", oTopo),
                x: 0,
                y: 0
            });
            oTopo.ins.layerTooltip.add(oTooltipContent);

            var oTagContent = new Konva.Tag({
                fill: "rgba(0,0,0,0.8)",
                pointerDirection: "down",
                pointerWidth: 10 / iScale,
                pointerHeight: 5 / iScale,
                lineJoin: "round"
            });
            oTooltipContent.add(oTagContent);

            var oTextContent = new Konva.Text({
                text: strContent,
                padding: 8 / iScale,
                fontSize: 12 / iScale,
                lineHeight: 1.5,
                fill: "#ffffff"
            });
            oTooltipContent.add(oTextContent);

            var oTooltipTitle = new Konva.Label({
                id: oTopo.Stage.getIdentityValue(oGroup.tag.id + "_linkLabelContent", oTopo),
                x: oTooltipContent.x(),
                y: -oTooltipContent.height()
            });
            oTopo.ins.layerTooltip.add(oTooltipTitle);

            var oTagTitle = new Konva.Tag({
                fill: "rgba(0,0,0,0.8)",
                pointerDirection: "down",
                pointerWidth: 0,
                pointerHeight: 0,
                lineJoin: "round"
            });
            oTooltipTitle.add(oTagTitle);

            var oTextTitle = new Konva.Text({
                text: strTitle,
                padding: 8 / iScale,
                fontSize: 14 / iScale,
                fontStyle: "bold",
                fill: "#3dcca6"
            });
            oTooltipTitle.add(oTextTitle);

            //1.更新宽度
            var iTooltipHeight = oTooltipContent.height() + oTextTitle.height();
            var iTooltipWidth = Math.max(oTooltipContent.getText().width(), oTooltipTitle.getText().width());
            oTooltipContent.getText().width((iTooltipWidth) * iScale);
            oTooltipTitle.getText().width((iTooltipWidth) * iScale);

            //1.确定显示的方向和坐标
            var iMiddleX = oGroup.children[0].points()[6];
            var iMiddleY = oGroup.children[0].points()[7];

            var strDirection = 'down';
            //根据坐标值优化strDirection
            if (strDirection == 'down') {
                oTooltipContent.x(iMiddleX);
                oTooltipContent.y(iMiddleY);
                oTooltipContent.getTag().pointerDirection(strDirection);

                oTooltipTitle.x(oTooltipContent.x());
                oTooltipTitle.y(oTooltipContent.y() - (oTooltipContent.height() + 5));
                oTooltipTitle.getTag().pointerDirection(strDirection);
            }

            //绘制
            oTopo.ins.layerTooltip.batchDraw();
        };

        var _handle4UnSelectLink = function (oGroup, evt, oTopo) {
            //1.样式
            oGroup.tag.uiSelectLink = false;
            _setUnSelectLinkStyle(oGroup, oTopo);
            //2.tooltip
            _delLinkTip(oGroup.tag.id, oTopo);
        };

        var _delLinkTip = function (strLinkId, oTopo) {
            var oLabelTitle = oTopo.Stage.findOne(strLinkId + "_linkLabelTitle", oTopo);
            var oLabelContent = oTopo.Stage.findOne(strLinkId + "_linkLabelContent", oTopo);
            if (oLabelTitle) {
                oLabelTitle.destroy();
            }
            if (oLabelContent) {
                oLabelContent.destroy();
            }
            //绘制
            oTopo.ins.layerTooltip.batchDraw();
        };

        var _setSelectLinkStyle = function (oLinkGroup, oTopo) {
            oLinkGroup.children.forEach(function (oChild, index) {
                if (oChild.className !== "Label") {
                    oChild.shadowEnabled(true);
                    oChild.shadowColor(oTopo.Resource.getTheme().link.selectColor);
                    oChild.shadowBlur(5);
                    oChild.shadowOffset({
                        x: 0,
                        y: 0
                    });
                    oChild.shadowOpacity(1);
                }
            });
        };

        var _setUnSelectLinkStyle = function (oLinkGroup, oTopo) {
            oLinkGroup.children.forEach(function (oChild, index) {
                if (oChild.className !== "Label") {
                    oChild.shadowEnabled(false);
                }
            });
        };

        var _setMouseHoverStyle = function (oGroup, oTopo) {
            document.body.style.cursor = 'pointer';

            oGroup.children.forEach(function (oChild) {
                oChild.shadowEnabled(true);
                oChild.shadowColor("rgba(255,255,255,0.75)");
                oChild.shadowBlur(5);
            });

            oTopo.Layer.reDraw(oTopo.ins.layerLink);
        };

        var _setMouseHoverOutStyle = function (oGroup, oTopo) {
            document.body.style.cursor = 'default';

            oGroup.children.forEach(function (oChild) {
                oChild.shadowEnabled(false);
            });
            oTopo.Layer.reDraw(oTopo.ins.layerLink);
        };

        var _dblClickLink = function (arrSrcLinks, oGroup, oTopo) {
            //如果是捆绑链路
            var oBuObj = oGroup.tag;
            if (_isGroupLink(oBuObj)) {
                //1.0 删除Group
                oGroup.destroy();
                //1.1 删除Tip
                _delLinkTip(oBuObj.id, oTopo);
                oBuObj.uiLinkExpand = true;
                oBuObj.children.forEach(function (oChildLink, index) {
                    oChildLink.uiLinkExpand = true;
                });
                _draw4LinksBetween2Nodes(arrSrcLinks, oTopo);
                oTopo.Layer.reDraw(oTopo.ins.layerLink);
            }
            //如果是单根的有parent的链路
            else if (oBuObj.parent) {
                //干掉所有的子链路
                oBuObj.parent.children.forEach(function (oChildLink) {
                    oChildLink.uiLinkExpand = false;
                    var oChildLine = oTopo.Stage.findOne(oChildLink.id, oTopo);
                    if (oChildLine) {
                        //1.0删除Group
                        oChildLine.destroy();
                        //1.1 删除Tip
                        _delLinkTip(oChildLink.id, oTopo);
                    }
                });
                oBuObj.parent.uiLinkExpand = false;
                _draw4LinksBetween2Nodes(arrSrcLinks, oTopo);
                oTopo.Layer.reDraw(oTopo.ins.layerLink);
            }
            //如果是单根的没有parent的链路
            else {
                //do nothing
            }
        };

        //endregion

        //region style

        //可删除
        var _getBezierPoint = function (oPointStart, oPointEnd, iHeight) {
            //1.oPointMid
            var oPointMid = {
                x: (oPointEnd.x - oPointStart.x) / 2 + oPointStart.x,
                y: (oPointEnd.y - oPointStart.y) / 2 + oPointStart.y
            };

            //2.iSin/iCos
            var iDistance = Math.sqrt(
                Math.pow(oPointEnd.x - oPointStart.x, 2) +
                Math.pow(oPointEnd.y - oPointStart.y, 2), 2);
            var iSin = (oPointEnd.y - oPointStart.y) / iDistance;
            var iCos = (oPointEnd.x - oPointStart.x) / iDistance;

            //3.iOffsetX/iOffsetY
            var iOffsetX = iHeight * iSin;
            var iOffsetY = iHeight * iCos;

            //4.oBezierPoint
            return {
                x: oPointMid.x + iOffsetX,
                y: oPointMid.y + iOffsetY
            };
        };

        //可删除，这个函数中算中间节点的代码可以参考_getBezierPoint中计算方式优化
        var _getPosition = function (oBuObj, iOffsetIndex, oTopo) {
            //oNodeSrc/oNodeDst
            var oNodeSrc = oTopo.Sprite.NodeGroup.getDrawnGroupById(oBuObj.srcNodeId, oTopo);
            var oNodeDst = oTopo.Sprite.NodeGroup.getDrawnGroupById(oBuObj.dstNodeId, oTopo);

            var oNodeSrcPos = oTopo.Sprite.Node.getCenterPos(oNodeSrc);
            var oNodeDstPos = oTopo.Sprite.Node.getCenterPos(oNodeDst);

            //确保源节点在宿节点的左侧
            if (oNodeDstPos.x < oNodeSrcPos.x) {
                var temp = oNodeSrcPos;
                oNodeSrcPos = oNodeDstPos;
                oNodeDstPos = temp;
            }

            var sX = oNodeSrcPos.x;
            var sY = oNodeSrcPos.y;
            var eX = oNodeDstPos.x;
            var eY = oNodeDstPos.y;

            var mX, mY, step;
            //如果是奇数
            if (iOffsetIndex % 2 === 1) {
                step = (iOffsetIndex + 1) / 2 * OFFSET;
            }
            //如果是偶数
            else {
                step = iOffsetIndex / 2 * OFFSET;
            }

            var length = Math.sqrt(Math.pow(sX - eX, 2) + Math.pow(sY - eY, 2));
            var a1 = Math.atan(step / (length / 2));
            var a2 = Math.atan(Math.abs(sY - eY) / Math.abs(sX - eX));
            var radius = Math.sqrt(Math.pow(step, 2) + Math.pow(length / 2, 2));

            //1.区分两种场景
            //1.1如果源节点的y坐标大于宿节点的y坐标
            if (sY > eY) {
                //如果为奇数
                if (iOffsetIndex % 2 === 1) {
                    mX = sX + radius * Math.cos(a2 + a1);
                    mY = sY - radius * Math.sin(a2 + a1);
                }
                //如果为偶数
                else {
                    mX = sX + radius * Math.cos(a2 - a1);
                    mY = sY - radius * Math.sin(a2 - a1);
                }
            }
            //1.2如果源节点的y坐标小于宿节点的y坐标
            else {
                //如果为奇数
                if (iOffsetIndex % 2 === 1) {
                    mX = sX + radius * Math.cos(a2 - a1);
                    mY = sY + radius * Math.sin(a2 - a1);
                }
                //如果为偶数
                else {
                    mX = sX + radius * Math.cos(a2 + a1);
                    mY = sY + radius * Math.sin(a2 + a1);
                }
            }

            return {
                start: {
                    x: sX,
                    y: sY
                },
                middle: {
                    x: mX,
                    y: mY
                },
                end: {
                    x: eX,
                    y: eY
                }
            }

        };

        var _getPositionEx = function (oBuObj, iOffsetIndex, linkCount, oTopo) {
            //oNodeSrc/oNodeDst
            var oNodeSrc = oTopo.Sprite.NodeGroup.getDrawnGroupById(oBuObj.srcNodeId, oTopo);
            var oNodeDst = oTopo.Sprite.NodeGroup.getDrawnGroupById(oBuObj.dstNodeId, oTopo);

            var oNodeSrcPos = oTopo.Sprite.Node.getCenterPos(oNodeSrc);
            var oNodeDstPos = oTopo.Sprite.Node.getCenterPos(oNodeDst);

            //确保源节点在宿节点的左侧
            var reverse = false;
            if (oNodeDstPos.x < oNodeSrcPos.x) {
                var temp = oNodeSrcPos;
                oNodeSrcPos = oNodeDstPos;
                oNodeDstPos = temp;
                reverse = true;
            }

            var s1X = oNodeSrcPos.x;
            var s1Y = oNodeSrcPos.y;
            var s2X, s2Y, s3X, s3Y, mX, mY, e3X, e3Y, e2X, e2Y, e1X, e1Y;
            var e1X = oNodeDstPos.x;
            var e1Y = oNodeDstPos.y;

            var oIndex, step;
            //如果为奇数
            if (iOffsetIndex % 2 == 1) {
                oIndex = (iOffsetIndex + 1) / 2;
            }
            //如果为偶数
            else {
                oIndex = iOffsetIndex / 2;
            }
            step = oIndex * OFFSET;

            var length = Math.sqrt(Math.pow(s1X - e1X, 2) + Math.pow(s1Y - e1Y, 2));
            var a1 = Math.atan(step / (length / 2));
            var a2 = Math.atan(Math.abs(s1Y - e1Y) / Math.abs(s1X - e1X));
            var radius = Math.sqrt(Math.pow(step, 2) + Math.pow(length / 2, 2));
            var centerLength = length - oNodeSrcPos.width / 2 - oNodeDstPos.width / 2;
            var a3, a4;
            //1条链路
            if (linkCount == 1) {
                a3 = a4 = 0;
            }
            //奇数条链路
            else if (linkCount % 2 == 1) {
                a3 = a4 = 0.5 * Math.PI / ((linkCount - 1) / 2) * oIndex;
            }
            //偶数条链路
            else {
                a3 = a4 = 0.5 * Math.PI / ((linkCount) / 2) * oIndex;
            }
            //在iOffsetIndex=0时，s3的坐标=s2的坐标，这里预留2*pointerWidth是为了避免s3=s2
            if (iOffsetIndex == 0) {
                centerLength = centerLength - 2 * POINTERHEIGHT;
            }
            //1.区分两种场景
            //1.1如果源节点的y坐标大于宿节点的y坐标
            if (s1Y > e1Y) {
                //如果为奇数
                if (iOffsetIndex % 2 === 1) {
                    mX = s1X + radius * Math.cos(a2 + a1);
                    mY = s1Y - radius * Math.sin(a2 + a1);
                    s2X = s1X + (oNodeSrcPos.width / 2) * Math.cos(a3 + a2);
                    s2Y = s1Y - (oNodeSrcPos.width / 2) * Math.sin(a3 + a2);
                    s3X = mX - (centerLength / 2) * Math.cos(a2);
                    s3Y = mY + (centerLength / 2) * Math.sin(a2);
                    e3X = mX + (centerLength / 2) * Math.cos(a2);
                    e3Y = mY - (centerLength / 2) * Math.sin(a2);
                    e2X = e1X - (oNodeDstPos.width / 2) * Math.cos(a4 - a2);
                    e2Y = e1Y - (oNodeDstPos.width / 2) * Math.sin(a4 - a2);
                }
                //如果为偶数
                else {
                    mX = s1X + radius * Math.cos(a2 - a1);
                    mY = s1Y - radius * Math.sin(a2 - a1);
                    s2X = s1X + (oNodeSrcPos.width / 2) * Math.cos(a3 - a2);
                    s2Y = s1Y + (oNodeSrcPos.width / 2) * Math.sin(a3 - a2);
                    s3X = mX - (centerLength / 2) * Math.cos(a2);
                    s3Y = mY + (centerLength / 2) * Math.sin(a2);
                    e3X = mX + (centerLength / 2) * Math.cos(a2);
                    e3Y = mY - (centerLength / 2) * Math.sin(a2);
                    e2X = e1X - (oNodeDstPos.width / 2) * Math.cos(a4 + a2);
                    e2Y = e1Y + (oNodeDstPos.width / 2) * Math.sin(a4 + a2);
                }
            }
            //1.2如果源节点的y坐标小于宿节点的y坐标
            else {
                //如果为奇数
                if (iOffsetIndex % 2 === 1) {
                    mX = s1X + radius * Math.cos(a2 + a1);
                    mY = s1Y + radius * Math.sin(a2 + a1);
                    s2X = s1X + (oNodeSrcPos.width / 2) * Math.cos(a3 + a2);
                    s2Y = s1Y + (oNodeSrcPos.width / 2) * Math.sin(a3 + a2);
                    s3X = mX - (centerLength / 2) * Math.cos(a2);
                    s3Y = mY - (centerLength / 2) * Math.sin(a2);
                    e3X = mX + (centerLength / 2) * Math.cos(a2);
                    e3Y = mY + (centerLength / 2) * Math.sin(a2);
                    e2X = e1X - (oNodeDstPos.width / 2) * Math.cos(a4 - a2);
                    e2Y = e1Y + (oNodeDstPos.width / 2) * Math.sin(a4 - a2);
                }
                //如果为偶数
                else {
                    mX = s1X + radius * Math.cos(a2 - a1);
                    mY = s1Y + radius * Math.sin(a2 - a1);
                    s2X = s1X + (oNodeSrcPos.width / 2) * Math.cos(a3 - a2);
                    s2Y = s1Y - (oNodeSrcPos.width / 2) * Math.sin(a3 - a2);
                    s3X = mX - (centerLength / 2) * Math.cos(a2);
                    s3Y = mY - (centerLength / 2) * Math.sin(a2);
                    e3X = mX + (centerLength / 2) * Math.cos(a2);
                    e3Y = mY + (centerLength / 2) * Math.sin(a2);
                    e2X = e1X - (oNodeDstPos.width / 2) * Math.cos(a4 + a2);
                    e2Y = e1Y - (oNodeDstPos.width / 2) * Math.sin(a4 + a2);
                }
            }

            if (reverse) {
                return {
                    start1: {
                        x: e1X,
                        y: e1Y
                    },
                    start2: {
                        x: e2X,
                        y: e2Y
                    },
                    start3: {
                        x: e3X,
                        y: e3Y
                    },
                    middle: {
                        x: mX,
                        y: mY
                    },
                    end3: {
                        x: s3X,
                        y: s3Y
                    },
                    end2: {
                        x: s2X,
                        y: s2Y
                    },
                    end1: {
                        x: s1X,
                        y: s1Y
                    }
                }
            }
            else {
                return {
                    start1: {
                        x: s1X,
                        y: s1Y
                    },
                    start2: {
                        x: s2X,
                        y: s2Y
                    },
                    start3: {
                        x: s3X,
                        y: s3Y
                    },
                    middle: {
                        x: mX,
                        y: mY
                    },
                    end3: {
                        x: e3X,
                        y: e3Y
                    },
                    end2: {
                        x: e2X,
                        y: e2Y
                    },
                    end1: {
                        x: e1X,
                        y: e1Y
                    }
                }
            }
        };

        var _setCenterLabelPosition = function (oLabel, oPosition) {
            oLabel.setOffset({
                x: -oPosition.x + oLabel.getWidth() / 2,
                y: -oPosition.y
            });
        };

        var _getLinkColor = function (oBuObj, oTopo) {
            return oTopo.Resource.getTheme().link.linkColor[oBuObj.uiLinkColorKey];
        };

        var _getLinkWidth = function (oBuObj, oTopo) {
            return oBuObj.uiLinkWidth != undefined ? oBuObj.uiLinkWidth : 2.5;
        };

        var _getLinkDash = function (oBuObj, oTopo) {
            return oBuObj.uiDash ? oBuObj.uiDash : [];
        };

        var _genLinkCenterLabel = function (oBuObj, oTopo) {
            return oBuObj.uiLabelM;
        };

        var _getCenterLabelColor = function (oBuObj, oTopo) {
            return oTopo.Resource.getTheme().link.labelColor;
        };

        var _genLinkTitle = function (oBuObj, oTopo) {
            return oBuObj.uiTitle;
        };

        var _genLinkTitleContent = function (oBuObj, oTopo) {
            return oBuObj.uiTip;
        };

        //endregion

        //region imsg

        this.response2NodeEvent4ReDraw = function (oNode, oTopo) {
            var oId2Link = {};
            var arrLinks = [];
            var oGroups = oTopo.Stage.findGroupByTagAttr("uiLink", true, oTopo);
            oGroups.forEach(function (oGroup, index) {
                var oBuObj = oGroup.tag;
                //直接和这个Node相连的链路
                if (oNode.id === oBuObj.srcNodeId || oNode.id === oBuObj.dstNodeId) {
                    if (_isGroupLink(oBuObj)) {
                        oBuObj.children.forEach(function (oChildBuObj) {
                            oId2Link[oChildBuObj.id] = oChildBuObj;
                        });
                    }
                    else {
                        oId2Link[oBuObj.id] = oBuObj;
                    }
                }
                //和这个Node的childNode相连的链路
                if (oNode.children && oNode.children.length > 0) {
                    oNode.children.forEach(function (oChildNode, index) {
                        if (oChildNode.id === oBuObj.srcNodeId || oChildNode.id === oBuObj.dstNodeId) {
                            if (_isGroupLink(oBuObj)) {
                                oBuObj.children.forEach(function (oChildBuObj) {
                                    oId2Link[oChildBuObj.id] = oChildBuObj;
                                });
                            }
                            else {
                                oId2Link[oBuObj.id] = oBuObj;
                            }
                        }
                    });
                }
            });

            for (var key in oId2Link) {
                var value = oId2Link[key];
                arrLinks.push(value);
            }

            //绘制
            this.draw(arrLinks, oTopo);
        };

        this.expandAllLinkGroup = function (oTopo) {
            //获取所有的折叠链路
            var arrCollapseGroups = oTopo.Stage.findGroupByTagAttr("uiLinkExpand", false, oTopo);
            if (arrCollapseGroups.length === 0) {
                return;
            }
            var arrLinks4ReDraw = [];
            var oId2Links = {};
            arrCollapseGroups.forEach(function (oCollapseGroup, index) {
                var oBuObj = oCollapseGroup.tag;
                oBuObj.uiLinkExpand = true;
                oBuObj.children.forEach(function (oChildLink, index) {
                    oChildLink.uiLinkExpand = true;
                });
                var oLinks = _getLinksBySrcAndDstNodeId(oBuObj.srcNodeId, oBuObj.dstNodeId, oTopo);
                Object.assign(oId2Links, oLinks);

                //干掉绘制的链路
                oCollapseGroup.destroy();
            });
            arrLinks4ReDraw = oTopo.Utils.getVaules4JsonObj(oId2Links);
            self.draw(arrLinks4ReDraw, oTopo);
        };

        var _getLinksBySrcAndDstNodeId = function (srcNodeId, dstNodeId, oTopo) {
            var arrLinkGroups = oTopo.Stage.findGroupByTagAttr("uiLink", true, oTopo);
            var oId2Links = {};
            arrLinkGroups.forEach(function (oLinkGroup, index) {
                var oBuObj = oLinkGroup.tag;
                var bSame = false;
                if (oBuObj.srcNodeId === srcNodeId && oBuObj.dstNodeId === dstNodeId) {
                    bSame = true;
                }
                else if (oBuObj.srcNodeId === dstNodeId && oBuObj.dstNodeId === srcNodeId) {
                    bSame = true;
                }
                if (bSame) {
                    if (_isGroupLink(oBuObj)) {
                        oBuObj.children.forEach(function (oChildLink, index) {
                            oId2Links[oChildLink.id] = oChildLink;
                        });
                    }
                    else {
                        oId2Links[oBuObj.id] = oBuObj;
                    }
                }
            });

            return oId2Links;
        };

        this.collapseAllLinkGroup = function (oTopo) {
            //获取所有的展开链路
            var arrExpandGroups = oTopo.Stage.findGroupByTagAttr("uiLinkExpand", true, oTopo);
            if (arrExpandGroups.length === 0) {
                return;
            }
            var arrLinks4ReDraw = [];
            var oId2Links = {};
            arrExpandGroups.forEach(function (oExpandGroup, index) {
                var oBuObj = oExpandGroup.tag;
                oBuObj.uiLinkExpand = false;
                var oLinks = _getLinksBySrcAndDstNodeId(oBuObj.srcNodeId, oBuObj.dstNodeId, oTopo);
                Object.assign(oId2Links, oLinks);
                //干掉绘制的链路
                oExpandGroup.destroy();
            });

            arrLinks4ReDraw = oTopo.Utils.getVaules4JsonObj(oId2Links);
            self.draw(arrLinks4ReDraw, oTopo);
        };

        this.unSelectLinks = function (oTopo) {
            //1.get arrSelectNode
            var arrSelectLinkGroup = self.getSelectLinkSprites(oTopo);

            //2.遍历，unSelect
            for (var i = 0; i < arrSelectLinkGroup.length; i++) {
                var oSelectLinkGroup = arrSelectLinkGroup[i];
                _handle4UnSelectLink(oSelectLinkGroup, null, oTopo);
            }

            oTopo.Layer.reDraw(oTopo.ins.layerLink);
        };

        this.getSelectLinkSprites = function (oTopo) {
            //1.findAll
            var arrSelectGroupExists =
                oTopo.Stage.findGroupByTagAttr("uiSelectLink", true, oTopo);

            return arrSelectGroupExists;
        };

        //功能：选中链路，如果链路是捆绑链路的子链路，捆绑链路会自动展开，并选中子链路
        this.selectLinksById = function (arrLinkId, oTopo) {
            var oId2Links = {};
            var arrGroupId4Destroy = [];
            arrLinkId.forEach(function (iLinkId, index) {
                var oLinkGroup = oTopo.Stage.findOne(iLinkId, oTopo);
                if (oLinkGroup) {
                    oLinkGroup.tag.uiSelectLink = true;
                    _setSelectLinkStyle(oLinkGroup, oTopo);
                }
                //如果没有找到，需要在捆绑链路中找
                else {
                    var oLink = _getLinkById(iLinkId, oTopo);
                    if (oLink) {
                        oLink.uiSelectLink = true;
                        arrGroupId4Destroy.push(oLink.uiLinkGroupId);

                        //找到源宿网元之间的所有链路
                        var oLinks = _getLinksBySrcAndDstNodeId(oLink.srcNodeId, oLink.dstNodeId, oTopo);
                        $.each(oLinks, function (index, oLinkEx) {
                            //捆绑链路要展开,设置捆绑的子链路的uiLinkExpand
                            if (oLink.uiLinkGroupId === oLinkEx.uiLinkGroupId) {
                                oLinkEx.uiLinkExpand = true;
                            }
                        });
                        Object.assign(oId2Links, oLinks);
                    }
                }
            });

            //删掉捆绑链路
            if (arrGroupId4Destroy.length) {
                arrGroupId4Destroy.forEach(function (strGroupId, index) {
                    var oGroup = oTopo.Stage.findOne(strGroupId, oTopo);
                    if (oGroup) {
                        oGroup.destroy();
                    }
                });
            }

            var arrLink4Redraw = oTopo.Utils.getVaules4JsonObj(oId2Links);
            if (arrLink4Redraw.length) {
                self.draw(arrLink4Redraw, oTopo);
            }

            oTopo.Layer.reDraw(oTopo.ins.layerLink);
        };

        //通过链路id找到链路对象
        var _getLinkById = function (strId, oTopo) {
            var oLink;
            var arrLinkGroups = oTopo.Stage.findGroupByTagAttr("uiLink", true, oTopo);
            $.each(arrLinkGroups, function (index, oLinkGroup) {
                var oBuObj = oLinkGroup.tag;
                if (oBuObj.id == strId) {
                    oLink = oBuObj;
                    return false;
                }
                if (_isGroupLink(oBuObj)) {
                    for (var i = 0, len = oBuObj.children.length; i < len; i++) {
                        if (oBuObj.children[i].id == strId) {
                            oLink = oBuObj.children[i];
                            return false;
                        }
                    }
                }
            });

            return oLink;
        };

        //功能：选中链路，如果链路是捆绑链路的子链路，捆绑链路不会自动展开
        this.selectLinksByIdEx = function (arrLinkId, oTopo) {
            arrLinkId.forEach(function (iLinkId, index) {
                var oLinkGroup = oTopo.Stage.findOne(iLinkId, oTopo);
                if (oLinkGroup) {
                    oLinkGroup.tag.uiSelectLink = true;
                    _setSelectLinkStyle(oLinkGroup, oTopo);
                }
            });

            oTopo.Layer.reDraw(oTopo.ins.layerLink);
        };

        //region createLink

        this.createLink = function (oAfterCallback, oTopo) {
            oTopo.Stage.updateModel(oTopo.Stage.MODEL_CREATE_LINK);
            //cache
            createLinkData.status = STATUS_PENDING;
            createLinkData.callback = oAfterCallback;
        };

        this.createLinkContinue = function (oAfterCallback, oTopo) {
            self.createLink(oAfterCallback, oTopo);
            //cache
            createLinkData.continue = true;
        };

        this.stageEventMouseDown = function (evt, oTopo) {
            var oBuObj = oTopo.Stage.getBuObjByEventTarget(evt.target);
            if (_isNodeBuObj(oBuObj)) {
                if (createLinkData.status == STATUS_PENDING) {
                    createLinkData.status = STATUS_START;
                    createLinkData.startObj = oBuObj;
                }
                else if (createLinkData.status == STATUS_START) {
                    if (createLinkData.startObj.id != oBuObj.id) { //确保源宿节点不同
                        createLinkData.endObj = oBuObj;
                        _createLinkEnd(true, oTopo);
                    }
                }
            }
        };

        var _createLinkEnd = function (bSuccessful, oTopo) {
            //callback
            if (typeof createLinkData.callback == "function") {
                createLinkData.callback(bSuccessful, createLinkData.startObj, createLinkData.endObj);
            }
            //clear mockLink
            var oLinkGroup = oTopo.Stage.findOne(CREATE_MOCK_LINKID, oTopo);
            if (oLinkGroup) {
                //刪除
                oLinkGroup.destroy();
                oTopo.Layer.reDraw(oTopo.ins.layerLink);
            }
            //连续创建
            if (createLinkData.continue) {
                createLinkData.status = STATUS_PENDING;
            }
            if (!createLinkData.continue || !bSuccessful) {
                oTopo.Stage.updateModel(oTopo.Stage.MODEL_EMPTY);

                //cache
                createLinkData.status = STATUS_FREE;
                createLinkData.callback = undefined;
                createLinkData.startObj = undefined;
                createLinkData.endObj = undefined;
                createLinkData.continue = false;
            }
        };

        this.stageEventMouseMove = function (evt, oTopo) {
            if (createLinkData.status == STATUS_START) {
                var oLinkGroup = oTopo.Stage.findOne(CREATE_MOCK_LINKID, oTopo);
                if (oLinkGroup) {
                    //刪除
                    oLinkGroup.destroy();
                }
                //绘制
                _drawAMockLike(evt, oTopo);
            }
        };

        var _drawAMockLike = function (evt, oTopo) {
            //mockBuObj
            var oBuObj = {
                id: CREATE_MOCK_LINKID,
                uiLinkColorKey: "mockLinkKey",
                uiLinkWidth: 2.5,
                uiDash: [10, 10]
            };

            //pos
            var oNodeSrc = oTopo.Sprite.NodeGroup.getDrawnGroupById(createLinkData.startObj.id, oTopo);
            var oNodeSrcPos = oTopo.Sprite.Node.getCenterPos(oNodeSrc);
            var oPos = oTopo.Stage.getPointerPos4DrawInStage(oTopo);

            var position = {
                start1: {
                    x: oNodeSrcPos.x,
                    y: oNodeSrcPos.y,
                },
                end1: {
                    x: oPos.x,
                    y: oPos.y,
                }
            };

            //group
            var oGroup = new Konva.Group({
                x: 0,
                y: 0,
                id: oTopo.Stage.getIdentityValue(oBuObj.id, oTopo)
            });
            oGroup.tag = oBuObj;

            //箭头
            var oArrow = _drawArrow({
                sX: position.start1.x,
                sY: position.start1.y,
                eX: position.end1.x,
                eY: position.end1.y
            }, oBuObj, oTopo);
            oArrow.dash([10, 10]);
            oGroup.add(oArrow);

            //绘制
            oTopo.ins.layerLink.add(oGroup);
            oTopo.Layer.reDraw(oTopo.ins.layerLink);
        };

        var _isNodeBuObj = function (oBuObj) {
            if (oBuObj) {
                if (oBuObj.uiNode === true) {
                    if (!oBuObj.children) {
                        return true;
                    }
                }
            }
            return false;
        };

        this.eventEscPress = function (evt, oTopo) {
            if (createLinkData.status != STATUS_FREE) {
                _createLinkEnd(false, oTopo);
            }
        };

        //endregion

        //endregion
    }
})(jQuery);