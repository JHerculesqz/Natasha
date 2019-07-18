(function($){
    $.MarvelTopoSelect = function(oParent){
        var self = this;

        //region Const

        this.LEFT_SELECT = "left";
        this.RIGHT_SELECT = "right";
        this.AREA_SELECT = "area";

        //endregion

        //region Fields

        var m_oParent = oParent;

        this.m_arrSelect = {
            nodeNames: [],
            linkNames: []
        };

        //endregion

        //region getSelectTopo4Draw

        /**
         * 获取当前视图下所有选中的网元和链路
         * @param oProfile
         * @param oTopoOverlay
         * @returns {{nodes: Array, links: Array}}
         */
        this.getSelectTopo4Draw = function(oProfile, oTopoOverlay){
            var oSelectTopo4DrawRes = {
                nodes:[],
                links:[]
            };
            //1.获取选中的网元
            for(var i = 0; i < self.m_arrSelect.nodeNames.length; i++){
                for(var j = 0; j < oTopoOverlay.nodes.length; j++){
                    var oNode = oTopoOverlay.nodes[j];
                    if(oNode.name == self.m_arrSelect.nodeNames[i]){
                        oSelectTopo4DrawRes.nodes.push(oNode);
                        break;
                    }
                }
            }

            //2.获取选中的链路
            for(var k = 0; k < self.m_arrSelect.linkNames.length; k++){
                for(var m = 0; m < oTopoOverlay.links.length; m++){
                    var oLink = oTopoOverlay.links[m];
                    if(oLink.name == self.m_arrSelect.linkNames[k]){
                        oSelectTopo4DrawRes.links.push(oLink);
                        break;
                    }
                }
            }

            //3.update datas
            m_oParent.Pos.updateNodePosByCatch(oTopoOverlay);

            //4.根据oProfile,更新node 的pos
            m_oParent.Pos.updateNodeScreenPosAndSizeByProfile(oSelectTopo4DrawRes.nodes, oProfile);

            return oSelectTopo4DrawRes;
        };

        //endregion

        //region getSelectNodes

        /**
         * 获取选中的网元
         * @param oTopoOverlay
         * @param oAfterGetSelectNodes
         */
        this.getSelectNodes = function(oTopoOverlay, oAfterGetSelectNodes){
            var arrSelectNodes = [];
            //1.filter
            for(var i = 0; i < oTopoOverlay.nodes.length; i++){
                var oDstNode = oTopoOverlay.nodes[i];
                if(oDstNode.params.isSelect){
                    arrSelectNodes.push(oDstNode);
                }
            }

            //2.callback
            if(oAfterGetSelectNodes){
                oAfterGetSelectNodes(arrSelectNodes);
            }
        };

        //endregion

        //region getSelectLinks

        /**
         * 获取选中的链路
         * @param oTopoOverlay
         * @param oAfterGetSelectLinks
         */
        this.getSelectLinks = function(oTopoOverlay, oAfterGetSelectLinks){
            var arrSelectLnks = [];
            //1.filter
            for(var i = 0; i < oTopoOverlay.links.length; i++){
                var oDstLink = oTopoOverlay.links[i];
                if(oDstLink.params.isSelect){
                    arrSelectLnks.push(oDstLink);
                }
            }

            //2.callback
            if(oAfterGetSelectLinks){
                oAfterGetSelectLinks(arrSelectLnks);
            }
        };

        //endregion

        //region selectNodes4MouseLClick

        /**
         * 拓扑控件网元单击选中
         * @param oNode
         * @param bIsAppend
         * @param arrCapIDs
         * @param oTopoOverlay
         * @param oGenerateNodeTip
         * @param oAfterSelectNode
         */
        this.selectNodes4MouseLClick = function(oNode, bIsAppend, arrCapIDs, oTopoOverlay, oGenerateNodeTip, oAfterSelectNode){
            //1.判断oNode是否已经是选中状态
            var bISAlreadySelect = oNode.params.isSelect;

            //2.如果oNode已经选中
            if(bISAlreadySelect){
                //2.1.如果是按住了Ctrl,
                if(bIsAppend){
                    for(var i= 0; i < oTopoOverlay.nodes.length; i++){
                        if(oTopoOverlay.nodes[i].name == oNode.name){
                            oTopoOverlay.nodes[i].params.isSelect = false;
                            self.upsertSelectarr4Node(oTopoOverlay.nodes[i].name, false);
                            break;
                        }
                    }
                }
                else{
                    // do nothing
                }
            }
            //3.如果oNode没有选中
            else{
                //3.1.如果是按住了Ctrl,
                if(bIsAppend){
                    for(var m= 0; m < oTopoOverlay.nodes.length; m++){
                        if(oTopoOverlay.nodes[m].name == oNode.name){
                            oTopoOverlay.nodes[m].params.isSelect = true;
                            oGenerateNodeTip(oTopoOverlay.nodes[m]);
                            self.upsertSelectarr4Node(oTopoOverlay.nodes[m].name, true);
                            oTopoOverlay.nodes[m].params.selectEventType = self.LEFT_SELECT;
                            m_oParent.Merge.merge4NodeTip(arrCapIDs, oTopoOverlay.nodes[m]);
                            break;
                        }
                    }
                }
                //3.2.需要取消其他对象的选中状态
                else{
                    for(var j= 0; j < oTopoOverlay.nodes.length; j++){
                        if(oTopoOverlay.nodes[j].name == oNode.name){
                            oTopoOverlay.nodes[j].params.isSelect = true;
                            oGenerateNodeTip(oTopoOverlay.nodes[j]);
                            self.upsertSelectarr4Node(oTopoOverlay.nodes[j].name, true);
                            oTopoOverlay.nodes[j].params.selectEventType = self.LEFT_SELECT;
                            m_oParent.Merge.merge4NodeTip(arrCapIDs, oTopoOverlay.nodes[j]);
                            break;
                        }
                        else{
                            oTopoOverlay.nodes[j].params.isSelect = false;
                            self.upsertSelectarr4Node(oTopoOverlay.nodes[j].name, false);
                        }
                    }
                    for(var m = 0; m < oTopoOverlay.links.length; m++){
                        oTopoOverlay.links[m].params.isSelect = false;
                        self.upsertSelectarr4Node(oTopoOverlay.links[m].name, false);
                    }
                }
            }

            if(oAfterSelectNode){
                oAfterSelectNode();
            }
        };

        //endregion

        //region selectNodes4MouseRClick

        /**
         * 鼠标右键选中
         * @param oNode
         * @param arrCapIDs
         * @param oTopoOverlay
         * @param oGenerateNodeTip
         * @param oAfterSelectNode
         */
        this.selectNodes4MouseRClick = function(oNode, arrCapIDs, oTopoOverlay, oGenerateNodeTip, oAfterSelectNode){
            //1.select node
            for(var i = 0; i < oTopoOverlay.nodes.length; i++){
                var oDstNode = oTopoOverlay.nodes[i];
                if(oDstNode.name == oNode.name){
                    oDstNode.params.isSelect = true;
                    oGenerateNodeTip(oDstNode);
                    self.upsertSelectarr4Node(oDstNode.name, true);
                    oDstNode.params.selectEventType = self.RIGHT_SELECT;
                    break;
                }
            }

            //2.callback
            if(oAfterSelectNode){
                oAfterSelectNode();
            }
        };

        //endregion

        //region selectLinks4MouseLClick

        /**
         * 鼠标单击选中链路
         * @param oLink
         * @param bIsAppend
         * @param arrCapIDs
         * @param oTopoOverlay
         * @param oGenerateLinkTip
         * @param oAfterSelectLink
         */
        this.selectLinks4MouseLClick = function(oLink, bIsAppend, arrCapIDs, oTopoOverlay, oGenerateLinkTip, oAfterSelectLink){
            //1.判断oLink是否已经是选中状态
            var bISAlreadySelect = oLink.params.isSelect;

            //2.如果oNode已经选中
            if(bISAlreadySelect){
                //2.1.如果是按住了Ctrl,
                if(bIsAppend){
                    for(var i= 0; i < oTopoOverlay.links.length; i++){
                        if(oTopoOverlay.links[i].name == oLink.name){
                            oTopoOverlay.links[i].params.isSelect = false;
                            self.upsertSelectarr4Link(oTopoOverlay.links[i].name, false);
                            break;
                        }
                    }
                }
                else{
                    // do nothing
                }
            }
            //3.如果oNode没有选中
            else{
                //3.1.如果是按住了Ctrl,
                if(bIsAppend){
                    for(var m= 0; m < oTopoOverlay.links.length; m++){
                        if(oTopoOverlay.links[m].name == oLink.name){
                            oTopoOverlay.links[m].params.isSelect = true;
                            oGenerateLinkTip(oTopoOverlay.Links[m]);
                            self.upsertSelectarr4Link(oTopoOverlay.links[m].name, true);
                            oTopoOverlay.links[m].params.selectEventType = self.LEFT_SELECT;
                            m_oParent.Merge.merge4LinkTip(arrCapIDs, oTopoOverlay.Links[m]);
                            break;
                        }
                    }
                }
                //3.2.需要取消其他对象的选中状态
                else{
                    for(var j= 0; j < oTopoOverlay.links.length; j++){
                        if(oTopoOverlay.links[j].name == oLink.name){
                            oTopoOverlay.links[j].params.isSelect = true;
                            oGenerateLinkTip(oTopoOverlay.name[j]);
                            self.upsertSelectarr4Link(oTopoOverlay.links[j].name, true);
                            oTopoOverlay.links[j].params.selectEventType = self.LEFT_SELECT;
                            m_oParent.Merge.merge4LinkTip(arrCapIDs, oTopoOverlay.links[j]);
                            break;
                        }
                        else{
                            oTopoOverlay.links[j].params.isSelect = false;
                            self.upsertSelectarr4Link(oTopoOverlay.links[j].name, false);
                        }
                    }
                    for(var m = 0; m < oTopoOverlay.links.length; m++){
                        oTopoOverlay.links[m].params.isSelect = false;
                        self.upsertSelectarr4Link(oTopoOverlay.links[m].name, false);
                    }
                }
            }

            if(oAfterSelectLink){
                oAfterSelectLink();
            }
        };

        //endregion

        //region selectLinks4MouseRClick

        /**
         * 鼠标右键选中
         * @param oLink
         * @param arrCapIDs
         * @param oTopoOverlay
         * @param oGenerateLinkTip
         * @param oAfterSelectLink
         */
        this.selectLinks4MouseRClick = function(oLink, arrCapIDs, oTopoOverlay, oGenerateLinkTip, oAfterSelectLink){
            //1.select link
            for(var i = 0; i < oTopoOverlay.links.length; i++){
                var oDstLink = oTopoOverlay.links[i];
                if(oDstLink.name == oLink.name){
                    oDstLink.params.isSelect = true;
                    oGenerateLinkTip(oDstLink);
                    self.upsertSelectarr4Link(oDstLink.name, true);
                    oDstLink.params.selectEventType = self.RIGHT_SELECT;
                    break;
                }
            }

            //2.callback
            if(oAfterSelectLink){
                oAfterSelectLink();
            }
        };

        //endregion

        //region unSelectAll4BGRClick

        /**
         *
         * @param oTopoOverlay
         * @param oAfterSelectAll
         */
        this.unSelectAll4BGRClick = function(oTopoOverlay, oAfterSelectAll){
            if(oAfterSelectAll){
                oAfterSelectAll();
            }
        };

        //endregion

        //region unSelectAll4BGLClick

        /**
         *
         * @param oTopoOverlay
         * @param oAfterSelectAll
         */
        this.unSelectAll4BGLClick = function(oTopoOverlay, oAfterSelectAll){
            //1.unselect all nodes
            for(var i = 0; i < oTopoOverlay.nodes.length; i++){
                var oNode = oTopoOverlay.nodes[i];
                oNode.params.isSelect = false;
            }

            //2.unselect all links
            for(var i = 0; i < oTopoOverlay.links.length; i++){
                var oLink = oTopoOverlay.links[i];
                oLink.params.isSelect = false;
            }

            //3.clearSelectCatch
            self.clearSelectCatch();

            if(oAfterSelectAll){
                oAfterSelectAll();
            }
        };

        //endregion

        //region getSelectNodeNamesAndLinkNames4RegionDrag

        /**
         * 获取框选的网元和链路
         * @param oRegionDragStartPointOnScreen
         * @param oRegionDragEndPointOnScreen
         * @param oProfile
         * @param oTopoOverlay
         * @param oAfterGetSelectNodeNamesAndLinkNames4RegionDrag
         */
        this.getSelectNodeNamesAndLinkNames4RegionDrag = function(oRegionDragStartPointOnScreen, oRegionDragEndPointOnScreen, oProfile, oTopoOverlay, oAfterGetSelectNodeNamesAndLinkNames4RegionDrag){
            //1.change ui2DB
            var oRegionDragStartPointInDB = m_oParent.Pos.calcNodeScreenPos2DBPos(oRegionDragStartPointOnScreen, oProfile);
            var oRegionDragEndPointInDB = m_oParent.Pos.calcNodeScreenPos2DBPos(oRegionDragEndPointOnScreen, oProfile);

            //2.getAreaSelectData
            var oGetSelectNodeNamesAndLinkNames4RegionDragRes = {
                nodeNames: [],
                linkNames: []
            };
            for(var i = 0; i < oTopoOverlay.nodes.length; i++){
                var oNode = oTopoOverlay.nodes[i];
                if(_isNodeInRegionDrag(oRegionDragStartPointInDB, oRegionDragEndPointInDB, oNode)){
                    oGetSelectNodeNamesAndLinkNames4RegionDragRes.nodeNames.push(oNode.name);
                }
            }
            for(var j = 0; j < oTopoOverlay.links.length; j++){
                var oLink = oTopoOverlay.links[j];
                if(_isLinkInRegionDrag(oGetSelectNodeNamesAndLinkNames4RegionDragRes, oLink)){
                    oGetSelectNodeNamesAndLinkNames4RegionDragRes.linkNames.push(oLink.name);
                }
            }

            oAfterGetSelectNodeNamesAndLinkNames4RegionDrag(oGetSelectNodeNamesAndLinkNames4RegionDragRes.nodeNames, oGetSelectNodeNamesAndLinkNames4RegionDragRes.linkNames);
        };

        var _isNodeInRegionDrag = function(oRegionDragStartPointInDB, oRegionDragEndPointInDB, oNode){
            if(oNode.params.uiHide){
               return false;
            }
            //1.get iMinX/iMaxX/iMinY/iMaxY
            var iMinX;
            var iMaxX;
            var iMinY;
            var iMaxY;
            if(oRegionDragStartPointInDB.x <= oRegionDragEndPointInDB.x){
                iMinX = oRegionDragStartPointInDB.x;
                iMaxX = oRegionDragEndPointInDB.x;
            }
            else{
                iMinX = oRegionDragEndPointInDB.x;
                iMaxX = oRegionDragStartPointInDB.x;
            }
            if(oRegionDragStartPointInDB.y <= oRegionDragEndPointInDB.y){
                iMinY = oRegionDragStartPointInDB.y;
                iMaxY = oRegionDragEndPointInDB.y;
            }
            else{
                iMinY = oRegionDragEndPointInDB.y;
                iMaxY = oRegionDragStartPointInDB.y;
            }

            //2.isNodeInArea
            if(oNode.params.x >= iMinX && oNode.params.x <= iMaxX &&
                oNode.params.y >= iMinY && oNode.params.y <= iMaxY){
                return true;
            }
            else{
                return false;
            }
        };


        var _isLinkInRegionDrag = function(oGetSelectNodeNamesAndLinkNames4RegionDragRes, oLink){
            if(oLink.params.uiHide){
                return false;
            }
            if(CArray.contains(oGetSelectNodeNamesAndLinkNames4RegionDragRes.linkNames, oLink.name)){
                return false;
            }
            else{
                var strSrcNodeName = oLink.params.srcNodeName;
                var strDstNodeName = oLink.params.dstNodeName;
                if(CArray.contains(oGetSelectNodeNamesAndLinkNames4RegionDragRes.nodeNames, strSrcNodeName) ||
                    CArray.contains(oGetSelectNodeNamesAndLinkNames4RegionDragRes.nodeNames, strDstNodeName)){
                    return true;
                }
                else{
                    return false;
                }
            }
        };
        //endregion

        //region selectTopo4RegionDrag

        this.selectTopo4RegionDrag = function(arrNodeNameInRegionDrag, arrLinkNameInRegionDrag, arrCapIDs, oTopoOverlay, oGenerateNodeTip, oGenerateLinkTip, oAfterSelectTopo4RegionDrag){
            //1.mapNodeNameInRegionDrag
            var mapNodeNameInRegionDrag = {};
            for(var i = 0; i < arrNodeNameInRegionDrag.length; i++){
                var strSelectNodeName = arrNodeNameInRegionDrag[i];
                mapNodeNameInRegionDrag[strSelectNodeName] = strSelectNodeName;
            }
            var mapLinkNameInRegionDrag = {};
            for(var i = 0; i < arrLinkNameInRegionDrag.length; i++){
                var strSelectLinkName = arrLinkNameInRegionDrag[i];
                mapLinkNameInRegionDrag[strSelectLinkName] = strSelectLinkName;
            }

            //2._selectNodes4RegionDrag/_selectLinks4RegionDrag
            _selectNodes4RegionDrag(arrCapIDs, oTopoOverlay.nodes, mapNodeNameInRegionDrag, oGenerateNodeTip);
            _selectLinks4RegionDrag(arrCapIDs, oTopoOverlay.links, mapLinkNameInRegionDrag, oGenerateLinkTip);

            oAfterSelectTopo4RegionDrag();
        };

        var _selectNodes4RegionDrag = function(arrCapIDs, arrNodesInTopoOverlay, mapNodeNameInRegionDrag, oGenerateNodeTip){
            for(var i = 0; i < arrNodesInTopoOverlay.length; i++){
                var oNode = arrNodesInTopoOverlay[i];
                if(mapNodeNameInRegionDrag[oNode.name]){
                    oNode.params.isSelect = true;
                    oGenerateNodeTip(oNode);
                    slef.upsertSelectArr4Node(oNode.name, true);
                    oNode.params.selectEventType=  self.AREA_SELECT;
                }
            }
        };
        var _selectLinks4RegionDrag = function(arrCapIDs, arrLinksInTopoOverlay, mapLinkNameInRegionDrag, oGenerateLinkTip){
            for(var i = 0; i < arrLinksInTopoOverlay.length; i++){
                var oLink = arrLinksInTopoOverlay[i];
                if(mapLinkNameInRegionDrag[oLink.name]){
                    oLink.params.isSelect = true;
                    oGenerateLinkTip(oLink);
                    slef.upsertSelectArr4Link(oLink.name, true);
                    oLink.params.selectEventType=  self.AREA_SELECT;
                }
            }
        };

        //endregion

        //region selectNodesBy3rd

        /**
         * 第三方触发网元选中,需要以第一个网元居中
         * @param arrNodeNames
         * @param bIsSelect
         * @param oTopoOverlay
         * @param oGenerateNodeTip
         * @param oAfterSelectNodesBy3rd
         */
        this.selectNodesBy3rd = function(arrNodeNames, bIsSelect, oTopoOverlay, oGenerateNodeTip, oAfterSelectNodesBy3rd){
            var oFirstNode;

            //1.select node
            for(var i = 0; i < arrNodeNames.length; i++){
                var strNodeName4Update = arrNodeNames[i];
                for(var j = 0; j < oTopoOverlay.nodes.length; j++){
                    var oDstNode = oTopoOverlay.nodes[j];
                    if(oDstNode.name == strNodeName4Update){
                        if(oFirstNode == undefined){
                            oFirstNode = oDstNode;
                        }
                        oDstNode.params.isSelect = true;
                        oGenerateNodeTip(oDstNode);
                        self.upsertSelectArr4Node(oDstNode.name, bIsSelect);
                        break;
                    }
                }
            }

            //2.calllback
            oAfterSelectNodesBy3rd(oFirstNode);
        };

        //endregion

        //region selectLinksBy3rd

        /**
         * 第三方触发选中链路
         * @param arrLinkNames
         * @param bIsSelect
         * @param oTopoOverlay
         * @param oGenerateLinkTip
         * @param oAfterSelectLinksBy3rd
         */
        this.selectLinksBy3rd = function(arrLinkNames, bIsSelect, oTopoOverlay, oGenerateLinkTip, oAfterSelectLinksBy3rd){
            var oFirstNode;

            //1.select
            for(var i = 0; i < arrLinkNames.length; i++){
                var strLinkName4Update = arrLinkNames[i];
                for(var j = 0; j < oTopoOverlay.links.length; j++){
                    var oDstLink = oTopoOverlay.links[j];
                    if(oDstLink.name == strLinkName4Update){
                        if(oFirstNode == undefined){
                            var oNodeRes = _getNodeByName(oTopoOverlay.nodes, oDstLink.params,srcNodeName);
                            if(oNodeRes){
                                oFirstNode = oNodeRes;
                            }
                        }

                        oDstLink.params.isSelect = true;
                        oGenerateLinkTip(oDstLink);
                        self.upsertSelectArr4Link(oDstLink.name, bIsSelect);
                        break;
                    }
                }
            }

            oAfterSelectLinksBy3rd(oFirstNode);
        };

        var _getNodeByName = function(arrNodes, strName){
          var oNodeRes;

            for(var i = 0; i < arrNodes.length; i++){
                if( strName == arrNodes[i].name){
                    oNodeRes = arrNodes[i];
                    break;
                }
            }

            return oNodeRes;
        };

        //endregion

        //region clearUpdateNodesBySaveTopoSuccess

        /**
         *
         * @param oTopoOverlay
         */
        this.clearUpdateNodesBySaveTopoSuccess = function(oTopoOverlay){
            for(var i = 0; i < oTopoOverlay.nodes.length; i++){
                var oNode = oTopoOverlay.nodes[i];
                oNode.params.isPosUpdate = false;
            }
        };

        //endregion

        //region unSelectAllBy3rd

        this.unSelectAllBy3rd = function(oTopoOverlay, oAfterUnSelectAll){
            for(var i = 0; i < oTopoOverlay.nodes.length; i++){
                var oNode= oTopoOverlay.nodes[i];
                oNode.params.isSelect = false;
            }
            for(var j = 0; j < oTopoOverlay.links.length; j++){
                var links= oTopoOverlay.links[j];
                links.params.isSelect = false;
            }

            self.clearSelectCatch();

            oAfterUnSelectAll();
        };

        //endregion

        //region clearSelectCatch

        this.clearSelectCatch = function(){
          self.m_arrSelect = {
              nodeNames: [],
              linkNames: []
          }
        };

        //endregion

        //region updateDatasBySelectCache

        /**
         * 根据缓存,更新node/link 的选中状态
         * @param mapAreaNodeRes
         * @param mapAreaLinkRes
         */
        this.updateDatasBySelectCache = function(mapAreaNodeRes, mapAreaLinkRes){
            for(var i = 0; i < self.m_arrSelect.nodeNames.length; i++){
                var oNode = mapAreaNodeRes[self.m_arrSelect.nodeNames[i]];
                if(oNode){
                    oNode.params.isSelect = true;
                }
            }
            for(var j = 0; j < self.m_arrSelect.linkNames.length; j++){
                var oLink = mapAreaLinkRes[self.m_arrSelect.linkNames[i]];
                if(oLink){
                    oLink.params.isSelect = true;
                }
            }
        };

        //endregion

        //region upsertSelectArr4Node


        this.upsertSelectArr4Node = function(strNodeName, bIsSelect){
            var bIsExists = false;
            var iIndex;

            for(var i = 0; i < self.m_arrSelect.nodeNames.length; i++){
                if(strNodeName == self.m_arrSelect.nodeNames[i]){
                    bIsExists = true;
                    iIndex = i;
                    break;
                }
            }

            if(bIsSelect){
                if(!bIsExists){
                    self.m_arrSelect.nodeNames.push(strNodeName);
                }
            }
            else{
                if(bIsExists){
                    self.m_arrSelect.nodeNames.splice(iIndex, 1);
                }
            }
        };


        //endregion

        //region upsertSelectArr4Link

        /**
         *
         * @param strLinkName
         * @param bIsSelect
         */
        this.upsertSelectArr4Link = function(strLinkName, bIsSelect){
            var bIsExists = false;
            var iIndex;

            for(var i = 0; i < self.m_arrSelect.linkNames.length; i++){
                if(strLinkName == self.m_arrSelect.linkNames[i]){
                    bIsExists = true;
                    iIndex = i;
                    break;
                }
            }

            if(bIsSelect){
                if(!bIsExists){
                    self.m_arrSelect.linkNames.push(strLinkName);
                }
            }
            else{
                if(bIsExists){
                    self.m_arrSelect.linkNames.splice(iIndex, 1);
                }
            }
        };

        //endregion
    };
})(jQuery);
