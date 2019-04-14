/**
 * Created by destina on 2017/9/22.
 */
(function ($) {
    $.MarvelTopoApi = function () {

        //#region Fields

        var self = this;

        //#enregion

        //#region imsg

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
                    oWidth, oHeight, oTopo);
                oTopo.ins.layerLink = oTopo.Layer.init(oTopo);
                oTopo.ins.layerNode = oTopo.Layer.init(oTopo);
                //oTopo.ins.layerLink = oTopo.Layer.init(oTopo);
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
        this.draw = function(oTopo, oTopoData){
            //0.保存原始坐标
            _saveOriginalPosition(oTopoData);

            //1.绘制
            _drawTopo(oTopo, oTopoData);
        };

        var _saveOriginalPosition = function(oTopoData){
            oTopoData.nodeGroups.forEach(function(oNodeGroup, index){
                _savePos(oNodeGroup);
                oNodeGroup.children.forEach(function(oChildNode, index){
                    _savePos(oChildNode);
                });
            });
            oTopoData.nodes.forEach(function(oNode, index){
                _savePos(oNode);
            });
        };
        var _savePos = function(oNode){
            if(!oNode.oX){
                oNode.oX = oNode.x;
            }
            if(!oNode.oY){
                oNode.oY = oNode.y;
            }
        };

        var _drawTopo = function(oTopo, oTopoData){
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

        this.selectNodesById = function(oTopo, arrNodeId){
            oTopo.Sprite.NodeGroup.selectNodesById(arrNodeId, oTopo);
        };

        this.selectLinksById = function(oTopo, arrLinkId){
            oTopo.Sprite.LinkGroup.selectLinksById(arrLinkId, oTopo);
        };

        this.unSelectAll = function(oTopo){
            oTopo.Sprite.NodeGroup.unSelectNodeGroupAndNodes(oTopo);
            oTopo.Sprite.LinkGroup.unSelectLinks(oTopo);
        };

        this.getTopoData = function(oTopo){
            //nodeGroups/nodes
            var arrGroups4Node = oTopo.Stage.findGroupByTagAttr("uiNode", true, oTopo);
            var arrNodeGroups = [], arrNodes = [];
            arrGroups4Node.forEach(function(oNodeGroup, index){
                var oBuObj = oNodeGroup.tag;
                //nodeGroup
                if(oBuObj.children){
                    arrNodeGroups.push(oBuObj);
                }
                else if(oBuObj.uiChild !== true){
                    arrNodes.push(oBuObj);
                }
            });
            //link
            var arrGroups4Link = oTopo.Stage.findGroupByTagAttr("uiLink", true, oTopo);
            var arrLinks = [];
            arrGroups4Link.forEach(function(oLinkGroup, index){
                var oBuObj = oLinkGroup.tag;
                //如果是合并链路
                if(oBuObj.children && oBuObj.children.length){
                    arrLinks = arrLinks.concat(oBuObj.children);
                }
                //如果是单根链路
                else{
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
        this.updateTopo = function(oTopo, oTopoData){
            //0.绘制Topo
            self.draw(oTopo, oTopoData);
        };

        //#endregion

    };
})(jQuery);
