/**
 * Created by destina on 2017/9/22.
 */
(function ($) {
    $.MarvelTopoApi = function () {
        //region Fields

        var self = this;

        //endregion

        //region imsg

        /**
         *
         * @param oTopo
         * @param oParams = {
         *  id:
         *  themeKey:
         *  imgMap:
         *  themeSetting:
         * }
         *
         * @param oAfterCallBack
         */
        this.init = function (oTopo, oParams, oAfterCallBack) {
            oTopo.Resource.init(oParams.themeKey, oParams.imgMap, oParams.themeSetting, function () {
                //Stage
                var oWidth = document.getElementById(oParams.id).clientWidth;
                var oHeight = document.getElementById(oParams.id).clientHeight;
                oTopo.ins.stage = oTopo.Stage.init(oParams.id,
                    oWidth, oHeight, oParams.eventOptions, oTopo);
                //Layer
                oTopo.Layer.init(oTopo);
                //callback
                oAfterCallBack();
            });
        };

        /**
         * 第一次绘制Topo
         * oTopoData={
         *  nodeGroups:[]
         *  nodes:[]
         *  links:[]
         * }
         * @param oTopo
         * @param oTopoData
         */
        this.draw = function (oTopo, oTopoData) {
            //0.保存原始坐标
            _saveOriginalPosition(oTopoData);

            //1.绘制
            _drawTopo(oTopo, oTopoData);
        };

        var _saveOriginalPosition = function (oTopoData) {
            oTopoData.nodeGroups.forEach(function (oNodeGroup, index) {
                _savePos(oNodeGroup);
                oNodeGroup.children.forEach(function (oChildNode, index) {
                    _savePos(oChildNode);
                });
            });
            oTopoData.nodes.forEach(function (oNode, index) {
                _savePos(oNode);
            });
        };
        var _savePos = function (oNode) {
            if (!oNode.oX) {
                oNode.oX = oNode.x;
            }
            if (!oNode.oY) {
                oNode.oY = oNode.y;
            }
        };

        var _drawTopo = function (oTopo, oTopoData) {
            //1.清空
            oTopo.Stage.clearAllGroups(oTopo);
            //2.绘制
            //2.1.nodeGroups
            for (var i = 0; i < oTopoData.nodeGroups.length; i++) {
                oTopo.Sprite.NodeGroup.draw(oTopoData.nodeGroups[i], oTopo);
            }
            //2.2.nodes
            for (var i = 0; i < oTopoData.nodes.length; i++) {
                oTopo.Sprite.Node.draw(oTopoData.nodes[i], oTopo);
            }
            oTopo.Layer.reDraw(oTopo.ins.layerNode);

            //2.3.links
            oTopo.Sprite.LinkGroup.draw(oTopoData.links, oTopo);
            oTopo.Layer.reDraw(oTopo.ins.layerLink);
        };

        this.expandAllNodeGroup = function (oTopo) {
            oTopo.Sprite.NodeGroup.expandAllNodeGroup(oTopo);
        };

        this.collapseAllNodeGroup = function (oTopo) {
            oTopo.Sprite.NodeGroup.collapseAllNodeGroup(oTopo);
        };

        this.expandAllLinkGroup = function (oTopo) {
            oTopo.Sprite.LinkGroup.expandAllLinkGroup(oTopo);
        };

        this.collapseAllLinkGroup = function (oTopo) {
            oTopo.Sprite.LinkGroup.collapseAllLinkGroup(oTopo);
        };

        this.selectNodesById = function (oTopo, arrNodeId) {
            oTopo.Sprite.NodeGroup.selectNodesById(arrNodeId, oTopo);
        };

        this.selectLinksById = function (oTopo, arrLinkId) {
            oTopo.Sprite.LinkGroup.selectLinksById(arrLinkId, oTopo);
        };

        this.unSelectAll = function (oTopo) {
            oTopo.Sprite.NodeGroup.unSelectNodeGroupAndNodes(oTopo);
            oTopo.Sprite.LinkGroup.unSelectLinks(oTopo);
        };

        this.getTopoData = function (oTopo) {
            //nodeGroups/nodes
            var arrGroups4Node = oTopo.Stage.findGroupByTagAttr("uiNode", true, oTopo);
            var arrNodeGroups = [], arrNodes = [];
            arrGroups4Node.forEach(function (oNodeGroup, index) {
                var oBuObj = oNodeGroup.tag;
                //nodeGroup
                if (oBuObj.children) {
                    arrNodeGroups.push(oBuObj);
                }
                else if (oBuObj.uiChild !== true) {
                    arrNodes.push(oBuObj);
                }
            });
            //link
            var arrGroups4Link = oTopo.Stage.findGroupByTagAttr("uiLink", true, oTopo);
            var arrLinks = [];
            arrGroups4Link.forEach(function (oLinkGroup, index) {
                var oBuObj = oLinkGroup.tag;
                //如果是合并链路
                if (oBuObj.children && oBuObj.children.length) {
                    arrLinks = arrLinks.concat(oBuObj.children);
                }
                //如果是单根链路
                else {
                    arrLinks.push(oBuObj);
                }
            });

            return {
                nodeGroups: arrNodeGroups,
                nodes: arrNodes,
                links: arrLinks
            };
        };

        /**
         * 更新绘制Topo
         * @param oTopo
         * @param oTopoData
         */
        this.updateTopo = function (oTopo, oTopoData) {
            //0.绘制Topo
            self.draw(oTopo, oTopoData);
        };

        this.createNode = function (oBuObj, oAfterCallback, bAutoCreate, oTopo) {
            oTopo.Sprite.Node.createNode(oBuObj, oAfterCallback, bAutoCreate, oTopo);
        };

        this.createNodeContinue = function (oBuObj, oAfterCallback, oTopo) {
            oTopo.Sprite.Node.createNodeContinue(oBuObj, oAfterCallback, oTopo);
        };

        this.savePosition = function (oTopo) {
            //1.savePos
            var oTopoData = self.getTopoData(oTopo);
            oTopoData.nodes.forEach(function (oNode, index) {
                _savePosEx(oNode);
            });
            oTopoData.nodeGroups.forEach(function (oNodeGroup, index) {
                _savePosEx(oNodeGroup);
                oNodeGroup.children.forEach(function (oChildNode, index) {
                    _savePosEx(oChildNode);
                });
            });
            //2.event
            oTopo.Stage.eventOptions.callbackOnPositionUpdate(false);
        };

        var _savePosEx = function (oNode) {
            oNode.oX = oNode.x;
            oNode.oY = oNode.y;
        };

        this.resetPosition = function (oTopo) {
            //1. resetPos
            var oTopoData = self.getTopoData(oTopo);
            oTopoData.nodes.forEach(function (oNode, index) {
                _resetPos(oNode);
            });
            oTopoData.nodeGroups.forEach(function (oNodeGroup, index) {
                _resetPos(oNodeGroup);
                oNodeGroup.children.forEach(function (oChildNode, index) {
                    _resetPos(oChildNode);
                });
            });
            //2.draw
            _drawTopo(oTopo, oTopoData);
            //3.event
            oTopo.Stage.eventOptions.callbackOnPositionUpdate(false);
        };

        var _resetPos = function (oNode) {
            oNode.x = oNode.oX;
            oNode.y = oNode.oY;
        };

        this.isPositionUpdate = function (oTopo) {
            var oTopoData = self.getTopoData(oTopo);
            for (var i = 0, len = oTopoData.nodes.length; i < len; i++) {
                var oNode = oTopoData.nodes[i];
                if (oNode.x != oNode.oX) {
                    return true;
                }
                if (oNode.y != oNode.oY) {
                    return true;
                }
            }
            for (var i = 0, len = oTopoData.nodeGroups.length; i < len; i++) {
                var oNodeGroup = oTopoData.nodeGroups[i];
                if (oNodeGroup.x != oNodeGroup.oX) {
                    return true;
                }
                if (oNodeGroup.y != oNodeGroup.oY) {
                    return true;
                }
                for (var j = 0, jLen = oNodeGroup.children; j < jLen; j++) {
                    var oChildNode = oNodeGroup.children[j];
                    if (oChildNode.x != oChildNode.oX) {
                        return true;
                    }
                    if (oChildNode.y != oChildNode.oY) {
                        return true;
                    }
                }
            }
            return false;
        };

        this.getPosChangeTopoCache = function (oTopo) {
            var oTopoData = self.getTopoData(oTopo);
            var oRes = [];
            oTopoData.nodes.forEach(function (oNode) {
                if (oNode.x != oNode.oX || oNode.y != oNode.oY) {
                    oRes.push(oNode);
                }
            });
            oTopoData.nodeGroups.forEach(function (oNodeGroup) {
                if (oNodeGroup.x != oNodeGroup.oX || oNodeGroup.y != oNodeGroup.oY) {
                    oRes.push(oNodeGroup);
                }
                oNodeGroup.children.forEach(function (oNode) {
                    if (oNode.x != oNode.oX || oNode.y != oNode.oY) {
                        oRes.push(oNode);
                    }
                });
            });

            return oRes;
        };

        this.setBestView = function (oTopo) {
            var iStageWidth = oTopo.ins.stage.width();
            var iStageHeight = oTopo.ins.stage.height();
            var iXMin = Number.MAX_SAFE_INTEGER;
            var iYMin = Number.MAX_SAFE_INTEGER;
            var iXMax = Number.MIN_SAFE_INTEGER;
            var iYMax = Number.MIN_SAFE_INTEGER;
            //get MinX MinY MaxX MaxY
            var oTopoSprites = _getNodeAndNodeGroupSprite(oTopo);
            oTopoSprites.nodeSprites.forEach(function (oNode, index) {
                iXMin = Math.min(iXMin, oNode.x());
                iYMin = Math.min(iYMin, oNode.y());

                iXMax = Math.max(iXMax, oNode.x() + oNode.children[0].width());
                iYMax = Math.max(iYMax, oNode.y() + oNode.children[0].height());
            });

            oTopoSprites.nodeGroupSprites.forEach(function (oNodeGroup, index) {
                iXMin = Math.min(iXMin, oNodeGroup.x());
                iYMin = Math.min(iYMin, oNodeGroup.y());

                iXMax = Math.max(iXMax, oNodeGroup.x() + oNodeGroup.children[0].width());
                iYMax = Math.max(iYMax, oNodeGroup.y() + oNodeGroup.children[0].width());
            });
            //预留余量
            iXMax += 10;
            iYMax += 10;

            //计算缩放
            var iScaleX = iStageWidth / (iXMax - iXMin);
            var iScaleY = iStageHeight / (iYMax - iYMin);
            var iScale = Math.min(iScaleX, iScaleY);
            iScale = Math.min(iScale, 1);
            oTopo.ins.stage.scale({x: iScale, y: iScale});

            //计算偏移
            var iFixCenterX = iStageWidth / 2;
            var iFixCenterY = iStageHeight / 2;
            var iCenterX = (iXMax + iXMin) / 2;
            var iCenterY = (iYMax + iYMin) / 2;

            var iOffSetX = iFixCenterX - (iCenterX * iScale + oTopo.ins.stage.x());
            var iOffSetY = iFixCenterY - (iCenterY * iScale + oTopo.ins.stage.y());

            oTopo.ins.stage.x(oTopo.ins.stage.x() + iOffSetX);
            oTopo.ins.stage.y(oTopo.ins.stage.y() + iOffSetY);

            //重置backgroundLayer
            oTopo.Layer.reSetBackgroundLayer(oTopo);

            //重绘
            oTopo.ins.stage.batchDraw();
        };

        var _getNodeAndNodeGroupSprite = function (oTopo) {
            var arrRes = {
                nodeSprites: [],
                nodeGroupSprites: []
            };
            var arrSprites = oTopo.Stage.findGroupByTagAttr("uiNode", true, oTopo);
            arrSprites.forEach(function (oSprite, index) {
                var oBuObj = oSprite.tag;
                if (oBuObj.children) {
                    arrRes.nodeGroupSprites.push(oSprite);
                }
                else if (oBuObj.uiChild !== true) {
                    arrRes.nodeSprites.push(oSprite);
                }
            });
            return arrRes;
        };

        this.getSelectedData = function (oTopo) {
            var arrNodeAndNodeGroup = oTopo.Sprite.NodeGroup.getSelectNodeSprites(oTopo);
            var arrLinks = oTopo.Sprite.LinkGroup.getSelectLinkSprites(oTopo);
            var arrNode = [];
            var arrNodeGroup = [];
            var arrLink = [];
            arrNodeAndNodeGroup.forEach(function (oSprite) {
                var oBuObj = oSprite.tag;
                if (oBuObj.children) {
                    arrNodeGroup.push(oBuObj);
                }
                else {
                    arrNode.push(oBuObj);
                }
            });
            arrLinks.forEach(function (oSprite) {
                var oBuObj = oSprite.tag;
                arrLink.push(oBuObj);
            });
            return {
                nodeGroups: arrNodeGroup,
                nodes: arrNode,
                links: arrLink
            }
        };

        this.createLink = function (oTopo, oAfterCallback) {
            oTopo.Sprite.LinkGroup.createLink(oAfterCallback, oTopo);
        };

        this.createLinkContinue = function (oTopo, oAfterCallback) {
            oTopo.Sprite.LinkGroup.createLinkContinue(oAfterCallback, oTopo);
        };

        this.setConfig = function (oTopo, oConfig) {
            oTopo.Stage.setConfig(oConfig);
        };

        //endregion
    };
})(jQuery);