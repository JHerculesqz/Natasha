(function ($) {
    $.MarvelGisLinkGroup = function () {
        var self = this;

        //region Const

        var LINK_TYPE="link";

        //endregion

        //region Fields

        //endregion

        //region event

        var _clickPolyline = function(oBuObj, e, oGis){
            oGis.Stage.eventHandler.callbackOnLinkClick(e);
        };

        var _rightClickPolyline = function(oBuObj, e, oGis){

        };

        //endregion

        //region imsg

        this.drawLines = function(arrLinks, oGis){
            //对链路按照源宿网元进行分组
            var groupByNodes = _groupLinkBySrcAndDstNodeId(arrLinks, oGis);

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
                _draw4Group(arrLinks4Draw, oGis);
            }
        };

        var _groupLinkBySrcAndDstNodeId = function(arrLinks, oGis){
            var groupByNodes = {};
            arrLinks.forEach(function (oLink, index) {
                var groupNodeId = _getGroupNodeId(oLink, oGis);
                var arrLinks = groupByNodes[groupNodeId];
                if (!arrLinks) {
                    arrLinks = groupByNodes[groupNodeId] = [];
                }
                arrLinks.push(oLink);
            });
            return groupByNodes;
        };

        var _getGroupNodeId = function(oLink, oGis){
            //找到绘制的节点(节点自己或者节点的父亲)
            var srcNodeRel = oGis.Sprite.NodeGroup.getDrawnNodeById(oLink.srcNodeId, oGis);
            var dstNodeRel = oGis.Sprite.NodeGroup.getDrawnNodeById(oLink.dstNodeId, oGis);
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

        var _draw4Group = function(arrLinks, oGis){
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
            });

            arrLinks4Draw.forEach(function (oLink, index) {
                _drawLink(arrLinks, oLink, index, oGis);
            });
        };

        var _isGroupLink = function (oBuObj) {
            return oBuObj.children && oBuObj.children.length > 1;
        };

        var _drawLink = function (arrSrcLinks, oBuObj, iOffsetIndex, oGis) {
            //remove
            var oLinkExists = oGis.Layer.findById(oBuObj.id, oGis);
            if (oLinkExists) {
                self.delPolyline(oBuObj.id, oGis);
            }

            var pos = _getPosition(oBuObj, iOffsetIndex, oGis);

            //绘制
            self.addPolyline(oBuObj.id, [
                [pos.sX, pos.sY],
                [pos.eX, pos.eY]
            ], oBuObj, oGis);
        };

        var _getPosition = function(oBuObj, iOffsetIndex, oGis){
            var oNodeSrc = oGis.Sprite.NodeGroup.getDrawnNodeById(oBuObj.srcNodeId, oGis);
            var oNodeDst = oGis.Sprite.NodeGroup.getDrawnNodeById(oBuObj.dstNodeId, oGis);
            return {
                sX: oNodeSrc.x,
                sY: oNodeSrc.y,
                eX: oNodeDst.x,
                eY: oNodeDst.y
            }
        };

        this.addPolyline = function (strId, arrPoints, oBuObj, oGis) {
            //region init

            var oPolyline = L.polyline(arrPoints, {
                color: oBuObj.uiColor,
                weight: oBuObj.uiWeight,
                opacity: oBuObj.uiOpacity,
                dashArray: oBuObj.uiDashArray
            });
            oPolyline.id = strId;
            oPolyline.buObj = oBuObj;
            oPolyline.children = [];
            //popup
            var oPopup = L.popup({
                maxWidth: 99999999,
            }).setContent(oBuObj.uiTips);
            oPolyline.bindPopup(oPopup);
            oPolyline.addTo(oGis.Stage.mapObj);

            //单向
            if(oBuObj.uiDirection == 1){
                var oArrHead = L.polylineDecorator(oPolyline, {
                    patterns: [{
                        offset: "95%",
                        repeat: 0,
                        symbol: L.Symbol.arrowHead({
                            pixelSize: 15,
                            polygon: false,
                            pathOptions: {
                                stroke: true,
                                color: oBuObj.uiColor
                            }
                        })
                    }]
                });
                oArrHead.addTo(oGis.Stage.mapObj);
                oPolyline.children.push(oArrHead);
            }
            //双向
            else if(oBuObj.uiDirection == 2){
                var oArrHead = L.polylineDecorator(oPolyline, {
                    patterns: [{
                        offset: "95%",
                        repeat: 0,
                        symbol: L.Symbol.arrowHead({
                            pixelSize: 15,
                            polygon: false,
                            pathOptions: {
                                stroke: true,
                                color: oBuObj.uiColor
                            }
                        })
                    },{
                        offset: "5%",
                        repeat: 0,
                        symbol: L.Symbol.arrowHead({
                            pixelSize: 15,
                            headAngle: 300,
                            polygon: false,
                            pathOptions: {
                                stroke: true,
                                color: oBuObj.uiColor
                            }
                        })
                    }]
                });
                oArrHead.addTo(oGis.Stage.mapObj);
                oPolyline.children.push(oArrHead);
            }

            //endregion

            //region event

            oPolyline.on("click", function (e) {
                _clickPolyline(oBuObj, e, oGis);
            });
            oPolyline.on("contextmenu", function (e) {
                _rightClickPolyline(oBuObj, e, oGis);
            });

            //endregion
        };

        this.delPolyline = function(strId, oGis){
            var oPolyLine = oGis.Layer.findById(strId, oGis);
            if(oPolyLine){
                oPolyLine.remove();
                oPolyLine.children.forEach(function(oChild, index){
                    oChild.remove();
                });
            }
        };

        this.response2NodeEvent4ReDraw = function(oBuObj, oGis){
            var arrLinks = _getLinksByNodeOrNodeGroup(oBuObj, oGis);
            self.drawLines(arrLinks, oGis);
        };

        var _getLinksByNodeOrNodeGroup = function(oBuObj, oGis){
            var arrLinks = [];
            oGis.Stage.mapObj.eachLayer(function(oLayer, index){
                var oBuObjEx = oLayer.buObj;
                if(oBuObjEx && oBuObjEx.uiType==LINK_TYPE){
                    arrLinks.push(oBuObjEx);
                }
            });
            var arrTargetLinks = [];
            arrLinks.forEach(function(oLink, index){
                if(oLink.srcNodeId == oBuObj.id || oLink.dstNodeId == oBuObj.id){
                    arrTargetLinks.push(oLink);
                }
                else if(oBuObj.children && oBuObj.children.length){
                    oBuObj.children.forEach(function(oChild, index){
                        if(oLink.srcNodeId == oChild.id || oLink.dstNodeId == oChild.id){
                            arrTargetLinks.push(oLink);
                        }
                    });
                }
            });
            return arrTargetLinks;
        };

        this.setOpacity4Link = function(strId, iOpacity, oGis){
            var oPolyLine = oGis.Layer.findById(strId, oGis);
            if(oPolyLine){
                oPolyLine.setStyle({
                    opacity: iOpacity
                });
                //更新箭头
                if(oPolyLine.children.length){
                    oPolyLine.children.forEach(function(oChild, index){
                        oChild.options.patterns.forEach(function(oPattern, index){
                            oPattern.symbol.options.pathOptions.opacity = iOpacity;
                        });
                        oChild.redraw();
                    });
                }
            }
        };

        this.setColor4Link = function(strId, oColor, oGis){
            var oPolyLine = oGis.Layer.findById(strId, oGis);
            if(oPolyLine){
                oPolyLine.setStyle({
                    color: oColor
                });
                //更新箭头
                if(oPolyLine.children.length){
                    oPolyLine.children.forEach(function(oChild, index){
                        oChild.options.patterns.forEach(function(oPattern, index){
                            oPattern.symbol.options.pathOptions.color = oColor;
                        });
                        oChild.redraw();
                    });
                }
            }
        };

        //endregion
    }
})(jQuery);