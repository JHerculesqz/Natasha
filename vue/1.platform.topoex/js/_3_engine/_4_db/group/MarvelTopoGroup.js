/**
 * Created by hou on 17/12/22.
 */
(function($){
    $.MarvelTopoGroup = function(oParent){
        var self = this;
        var m_oParent = oParent;

        //region Fields

        this.m_arrExpandLinkNames = [];
        this.m_arrExpandNodeNames = [];

        //endregion

        //region group

        /**
         * 分组
         * @param arrCapId
         * @param oBuTopo
         * @returns {*}
         */
        this.group = function(arrCapId, oBuTopo){
            _groupLink(arrCapId, oBuTopo);
            _groupNode(arrCapId, oBuTopo);
            return oBuTopo;
        };

        //endregion

        //region _groupLink

        var _groupLink = function(arrCapId, oBuTopo){
            var arrLinksRes = [];
            //2.根据groupId分组
            var mapGroupLink = {};
            for(var i = 0; i < oBuTopo.links.length; i++){
                var oLinkGroup = oBuTopo.links[i];
                var strGroupId = oLinkGroup.params.uiGroupId;
                if(!strGroupId){
                    strGroupId = oLinkGroup.name;
                }
                if(mapGroupLink[strGroupId]){
                    mapGroupLink[strGroupId].push(oLinkGroup);
                }
                else{
                    mapGroupLink[strGroupId] = [];
                    mapGroupLink[strGroupId].push(oLinkGroup);
                }
            }

            //3.构造linkGroup
            for(var strGroupId in mapGroupLink){
                //3.1.构造有childrende linkGroup
                if(mapGroupLink[strGroupId].length > 1 || mapGroupLink[strGroupId][0].params.isNeedFold){
                    //如果在该场景下是展开的不合并
                    if(CArray.contains(self.m_arrExpandLinkNames, strGroupId)){
                        var arrChildrenLinks = mapGroupLink[strGroupId];
                        for(var i = 0; i < arrChildrenLinks,length; i++){
                            arrLinksRes.push(arrChildrenLinks[i]);
                        }
                    }
                    //如果在该场景下是不展开的合并
                    else{
                        var arrChildrenLinks = mapGroupLink[strGroupId];
                        //生成父链路的属性
                        var oLinkGroup = _generateParentLink(strGroupId, arrChildrenLinks);
                        arrLinksRes.push(oLinkGroup);
                    }
                }
                //3.1.构造没有childrende linkGroup
                else{
                    if(mapGroupLink[strGroupId][0].children && mapGroupLink[strGroupId][0].childrenlength > 1){
                        arrLinksRes.push(mapGroupLink[strGroupId][0]);
                    }
                    else{
                        mapGroupLink[strGroupId][0].params.uiIsSingle = true;
                        arrLinksRes.push(mapGroupLink[strGroupId][0]);
                    }
                }
            }

            oBuTopo.links = arrLinksRes;

            return oBuTopo;
        };

        var _generateParentLink = function(strGroupId, arrChildrenLinks){
            var oLinkRes = {
                name: strGroupId,
                params: {},
                children: []
            };
            var oChildLink = arrChildrenLinks[0];
            var oLinkCur = undefined;
            for(var i = 0; i < arrChildrenLinks.length; i++){
                if(arrChildrenLinks[i].params.uiDirectionCurr){
                    oLinkCur = arrChildrenLinks[i];
                    break;
                }
            }
            if(!oLinkCur){
                oLinkCur = arrChildrenLinks[0];
            }
            if(oChildLink.params.uiGroupLinkChild){
                if(arrChildrenLinks.length > 1){
                    oLinkRes.params.srcNodeName = oLinkCur.params.srcGroupName;
                    oLinkRes.params.dstNodeName = oLinkCur.params.dstGroupName;
                    oLinkRes.params.srcGroupName = oLinkCur.params.srcGroupName;
                    oLinkRes.params.dstGroupName = oLinkCur.params.dstGroupName;
                    oLinkRes.params.uiGroupLinkParent = true;
                    oLinkRes.children = arrChildrenLinks;
                    oLinkRes.params.lstSrcNodeName = _generateLstSrcNodeName(oLinkRes.params.srcGroupName, arrChildrenLinks);
                    oLinkRes.params.lstDStNodeName = _generateLstDstNodeName(oLinkRes.params.dstGroupName, arrChildrenLinks);
                }
                else{
                    oLinkRes.params.srcNodeName = oLinkCur.params.srcGroupName;
                    oLinkRes.params.dstNodeName = oLinkCur.params.dstGroupName;
                    oLinkRes.params.srcGroupName = oLinkCur.params.srcGroupName;
                    oLinkRes.params.dstGroupName = oLinkCur.params.dstGroupName;
                    oLinkRes.children = arrChildrenLinks;
                }
            }
            else{
                oLinkRes.params.srcNodeName = oLinkCur.params.srcNodeName;
                oLinkRes.params.dstNodeName = oLinkCur.params.dstNodeName;
                oLinkRes.children = arrChildrenLinks;
            }

            if(arrChildrenLinks[0].params.uiShiftSrcMark){
                oLinkRes.params.srcNodeNameCur = oLinkCur.params.srcNodeNameCur;
                oLinkRes.params.srcNodeName = oLinkCur.params.srcNodeName;
                oLinkRes.params.uiShiftSrcMark = oLinkCur.params.uiShiftSrcMark;
            }
            else{
                oLinkRes.params.srcNodeNameCur = undefined;
                oLinkRes.params.uiShiftSrcMark = false;
            }
            if(arrChildrenLinks[0].params.uiShiftDstMark){
                oLinkRes.params.dstNodeNameCur = oLinkCur.params.dstNodeNameCur;
                oLinkRes.params.dstNodeName = oLinkCur.params.dstNodeName;
                oLinkRes.params.uiShiftDstMark = oLinkCur.params.uiShiftDstMark;
            }
            else{
                oLinkRes.params.dstNodeNameCur = undefined;
                oLinkRes.params.uiShiftDstMark = false;
            }
            $.each(arrChildrenLinks, function(iIndex, oItem){
                if(oItem.params.isSelect){
                    oLinkRes.params.isSelect = true;
                    m_oParent.Select.upsertSelectArr4Link(oLinkRes.name, true);
                    return false;
                }
            });
            m_oParent.Merge.m_oTopoDBMergePlugin[m_oParent.Merge.transformCapIdsTostrCapId(m_oParent.m_arrCapIds)].uiProp4Link(oLinkRes);
            m_oParent.Merge.m_oTopoDBMergePlugin[m_oParent.Merge.transformCapIdsTostrCapId(m_oParent.m_arrCapIds)].uiTip4Link(oLinkRes);
            return oLinkRes;
        };
        var _generateLstSrcNodeName = function(srcGroupName, arrChildrenLinks){
          var arrLstScrNodeName = [];
            for(var i = 0; i < arrChildrenLinks.length; i++){
                var oLinkChild = arrChildrenLinks[i];
                if(oLinkChild.params.uiBothSideInGroup && !oLinkChild.params.uiHide){
                    var oSrcNodeItem = {
                        name: "",
                        uiColor: "",
                        uiLstColor: undefined,
                        uiFlowLink: false,
                        uiRealLink: true,
                        uiDirection: undeinfed,
                        uiAlpha: 1.0
                    };
                    oSrcNodeItem.uiColor = oLink.params.uiColor;
                    oSrcNodeItem.uiLstColor = oLink.params.uiLstColor;
                    oSrcNodeItem.uiFlowLink = oLink.params.uiFlowLink;
                    oSrcNodeItem.uiRealLink = oLink.params.uiRealLink;
                    oSrcNodeItem.uiDirection = oLink.params.uiDirection;
                    oSrcNodeItem.uiAlpha = oLink.params.uiAlpha;
                    if(srcGroupName == oLinkChild.parmas.srcGroupName){
                        if(oLinkChild.params.srcNodeNameCur){
                            oSrcNodeItem.name = oLinkChild.params.srcNodeNameCur;
                        }
                        else{
                            oSrcNodeItem.name = oLinkChild.params.srcNodeName;
                        }
                    }
                    else{
                        if(oLinkChild.params.dstNodeNameCur){
                            oSrcNodeItem.name = oLinkChild.params.dstNodeNameCur;
                        }
                        else{
                            oSrcNodeItem.name = oLinkChild.params.dstNodeName;
                        }
                    }
                    arrLstScrNodeName.push(oSrcNodeItem);
                }
            }
            return arrLstScrNodeName;
        };
        var _generateLstDstNodeName = function(dstGroupName, arrChildrenLinks){
            var arrLstDstNodeName = [];
            for(var i = 0; i < arrChildrenLinks.length; i++){
                var oLinkChild = arrChildrenLinks[i];
                if(oLinkChild.params.uiBothSideInGroup && !oLinkChild.params.uiHide){
                    var oDstNodeItem = {
                        name: "",
                        uiColor: "",
                        uiLstColor: undefined,
                        uiFlowLink: false,
                        uiRealLink: true,
                        uiDirection: undeinfed,
                        uiAlpha: 1.0
                    };
                    oDstNodeItem.uiColor = oLink.params.uiColor;
                    oDstNodeItem.uiLstColor = oLink.params.uiLstColor;
                    oDstNodeItem.uiFlowLink = oLink.params.uiFlowLink;
                    oDstNodeItem.uiRealLink = oLink.params.uiRealLink;
                    oDstNodeItem.uiDirection = oLink.params.uiDirection;
                    oDstNodeItem.uiAlpha = oLink.params.uiAlpha;
                    if(dstGroupName == oLinkChild.params.srcGroupName){
                        if(oLinkChild.params.srcNodeNameCur){
                            oDstNodeItem.name = oLinkChild.params.srcNodeNameCur;
                        }
                        else{
                            oDstNodeItem.name = oLinkChild.params.srcNodeName;
                        }
                    }
                    else{
                        if(oLinkChild.params.dstNodeNameCur){
                            oDstNodeItem.name = oLinkChild.params.dstNodeNameCur;
                        }
                        else{
                            oDstNodeItem.name = oLinkChild.params.dstNodeName;
                        }
                    }
                    arrLstDstNodeName.push(oDstNodeItem);
                }
            }
            return arrLstDstNodeName;
        };

        //endregion

        //region getAllExpandOrFolderLinkNamesBy3rd

        /**
         * 获取所有捆绑链路links name
         * @param bIsExpand
         * @param oTopoOverlay
         * @returns {Array}
         */
        this.getAllExpandOrFolderLinkNamesBy3rd = function(bIsExpand, oTopoOverlay){
            var arrLinkGroupNames = [];

            for(var i = 0; i < oTopoOverlay.links.length; i++){
                var oTemLink = oTopoOverlay.links[i];
                //如果是单根链路则continue
                if(oTemLink.params.uiIsSingle){
                    continue;
                }

                //如果是多根链路
                if(oTemLink.children && oTemLink.children.length > 0){
                    if(!CArray.contains(arrLinkGroupNames, oTemLink.name)){
                        arrLinkGroupNames.push(oTemLink.name);
                    }
                }
                else{
                    if(!CArray.contains(arrLinkGroupNames, oTemLink.params.uiGroupId)){
                        arrLinkGroupNames.push(oTemLink.params.uiGroupId);
                    }
                }
            }
            return arrLinkGroupNames;
        };

        //endregion

        //region expandOrFolderLinkByDBLClick


        this.expandOrFolderLinkByDBLClick = function(oDstLink, oTopo){
            if(true == oDstLink.params.uiIsSingle){
                return;
            }

            //1.expand oLink
            if(oDstLink.children){
                //1.1.update expandLinks
                _addExpandLinkGroupName(oDstLink);

                //1.2.expand linkgroup
                _expandLinkGroup(oTopo.links, oDstLink, oDstLink.nodes);
            }
            //2.fold link
            else{
                //2.1.update expandLinks
                _removeExpandfLinkGroupName(oDstLink);

                //2.2.fold linkgroup
                _folderLinkGroup(oTopo.links, oDstLink);
            }
        };

        var _addExpandLinkGroupName = function(oDstLink){
            self.m_arrExpandLinkNames.push(oDstLink.name);
        };
        var _removeExpandfLinkGroupName = function(oDstLink){
            $.each(self.m_arrExpandLinkNames, function(iIndex, oItem){
                if(oItem == oDstLink.params.uiGroupId){
                    self.m_arrExpandLinkNames.splice(iIndex, 1);
                    return false;
                }
            });
        };
        var _expandLinkGroup = function(arrLinks, oDstLink, arrNodes){
            var bIsSelect = oDstLink.params.isSelect;
            var arrChilds = oDstLink.children;
            for(var i = 0; i < arrChilds.length; i++){
                var oChild = arrChilds[i];
                var oNewLink = {
                    name: oChild.name,
                    params: oChild.params
                };
                oNewLink.params.uiIsFold = false;
                oNewLink.params.isSelect = bIsSelect;
                m_oParent.Select.upsertSelectArr4Link(oNewLink.name, bIsSelect);
                arrLinks.push(oNewLink);
            }
            //删除父链路
            for(var i = 0; i < arrLinks.length; i++){
                var oTargetLink = arrLinks[i];
                if(oTargetLink.name == oDstLink.name){
                    arrLinks.splice(i, 1);
                    break;
                }
            }
        };
        var _folderLinkGroup = function(arrLinks, oDstLink){
            var strGroupId = oDstLink.params.uiGroupId;
            var arrChildrenLinks = [];
            for(var i = 0; i < arrLinks.length; i++){
                var oTargetLink = arrLinks[i];
                if(oTargetLink.params.uiGroupId == strGroupId){
                    arrChildrenLinks.push(oTargetLink);
                }
            }

            //新增父link
            var oParentLink = _generateParentLink(strGroupId, arrChildrenLinks);
            arrLinks.push(oParentLink);

            //删除子link
            for(var i = 0; i < arrChildrenLinks.length; i++){
                var oChildrenLink = arrChildrenLinks[i];
                for(var j = 0; j < arrLinks.length; j++){
                    var oTargetLink = arrLinks[i];
                    if(oChildrenLink.name == oTargetLink.name){
                        arrLinks.splice(j, 1);
                        break;
                    }
                }
            }
        };

        //endregion

        //region expandOrFolderLinkBy3rd

        /**
         *
         * @param arrLinkNames
         * @param bIsExpand
         * @param oTopoOverlay
         * @param oAfterExpandOrFolderLinksBy3rd
         */
        this.expandOrFolderLinkBy3rd = function(arrLinkNames, bIsExpand, oTopoOverlay, oAfterExpandOrFolderLinksBy3rd){
            for(var i = 0; i < arrLinkNames.length; i++){
                var oDstLink = _getLinkByName(arrLinkNames[i], bIsExpand, oTopoOverlay.links);
                if(oDstLink == undefined){
                    continue;
                }

                //1.2.expand
                if(bIsExpand){
                    //1.1.update expandLinks
                    _addExpandLinkGroupName(oDstLink);

                    //1.2.expand linkgroup
                    _expandLinkGroup(oTopo.links, oDstLink, oDstLink.nodes);
                }
                else{
                    //2.1.update expandLinks
                    _removeExpandfLinkGroupName(oDstLink);

                    //2.2.fold linkgroup
                    _folderLinkGroup(oTopo.links, oDstLink);
                }
            }

            oAfterExpandOrFolderLinksBy3rd();
        };

        var _getLinkByName = function(strLinkName, bIsExpand, arrLinks){
            var oLinkRes = undefined;

            for(var i =0; i < arrLinks.length; i++){
                var oTargetLink = arrLinks[i];
                if(bIsExpand){
                    if(oTargetLink.name == strLinkName){
                        oLinkRes = oTargetLink;
                        break;
                    }
                }
                else{
                    if(oTargetLink.name.uiGroupId == strLinkName){
                        oLinkRes = oTargetLink;
                        break;
                    }
                }
            }

            return oLinkRes;
        };

        //endregion

        //region groupNode

        var _groupNode = function(arrCapId, oBuTopo){
            var arrNodeRes = [];

            //1.分组
            var mapGroupNode = {};
            for(var i = 0; i < oBuTopo.nodes.length; i++){
                var oNode = oBuTopo.nodes[i];
                var strGroupId = oNode.params.uiGroupId;
                if(!strGroupId){
                    strGroupId = oNode.name;
                }
                if(mapGroupNode[strGroupId]){
                    if(oNode.params.uiGroupParent){
                        mapGroupNode[strGroupId].groupNode = oNode;
                    }
                    else if(oNode.params.uiGroupChild){
                        mapGroupNode[strGroupId].arrNodes.push(oNode);
                    }
                    else{
                        mapGroupNode[strGroupId].arrNodes.push(oNode);
                    }
                }
                else{
                    mapGroupNode[strGroupId] = {
                        groupNode: undefined,
                        arrNodes: []
                    };
                    if(oNode.params.uiGroupParent){
                        mapGroupNode[strGroupId].groupNode = oNode;
                    }
                    else if(oNode.params.uiGroupChild){
                        mapGroupNode[strGroupId].arrNodes.push(oNode);
                    }
                    else{
                        mapGroupNode[strGroupId].arrNodes.push(oNode);
                    }
                }
            }

            //2.
            for(var strGroupId in mapGroupNode){
                if(mapGroupNode[strGroupId].groupNode){
                    //如果在该场景下是展开的不合并
                    if(CArray.contains(self.m_arrExpandNodeNames, strGroupId)){
                        //为了后面结点移动只能在网元内部移动,要不然不设置这个值,光设备就移出去了(展开后,设置中心,显示设备名称,不会进入——generatePArentNode分支)
                        if(mapGroupNode[strGroupId].groupNode.params.uiParentW){
                            mapGroupNode[strGroupId].groupNode.params.uiImgWOri = mapGroupNode[strGroupId].groupNode.params.uiParentW;
                            mapGroupNode[strGroupId].groupNode.params.uiImgHOri = mapGroupNode[strGroupId].groupNode.params.uiParentH;
                        }
                        else{
                            mapGroupNode[strGroupId].groupNode.params.uiImgWOri = mapGroupNode[strGroupId].groupNode.params.uiImgW;
                            mapGroupNode[strGroupId].groupNode.params.uiImgHOri = mapGroupNode[strGroupId].groupNode.params.uiImgH;
                        }
                        arrNodeRes.push(mapGroupNode[strGroupId].groupNode);
                        for(var i = 0; i < mapGroupNode[strGroupId].arrNodes.length; i++){
                            arrNodeRes.push(mapGroupNode[strGroupId].arrNodes[i]);
                        }
                    }

                    //如果在该场景是展开的合并
                    else{
                        var arrChildrenNodes = mapGroupNode[strGroupId].arrNodes;
                        //1.生成groupNode的属性
                        var oNodeGroup = _generateParentNode(strGroupId, mapGroupNode[strGroupId].groupNode, arrChildrenNodes, oBuTopo.links);
                        arrNodeRes.push(oNodeGroup);

                        //2.更新关联的链路属性
                        var arrChildNodeNames = [];
                        for(var i = 0; i < arrChildrenNodes.length; i++){
                            arrChildNodeNames.push(arrChildrenNodes[i]);
                        }
                        for(var i = 0; i < oBuTopo.links.length; i++){
                            var oLink = oBuTopo.links[i];
                            if(oLink.children && oLink.children.length >= 0){
                                for(var j = 0; j < oLink.children.length; j++){
                                    _folerNodeItem(oLink.children[j], arrChildNodeNames, oNodeGroup);
                                }
                            }
                            _folerNodeItem(oLink, arrChildNodeNames, oNodeGroup);
                        }
                    }
                }
                else{
                    arrNodeRes.push(mapGroupNode[strGroupId].arrNodes[0]);
                }
            }

            oBuTopo.nodes = arrNodeRes;
        };

        var _generateParentNode = function(strGroupId, oGroupNode, arrChildrenNodes){
            var oGroupNodeRes = {
                name: oGroupNode.name,
                params: {

                },
                children: arrChildrenNodes
            };
            oGroupNodeRes.params = oGroupNode.params;
            if(oGroupNode.parmas.uiParentW){
                oGroupNodeRes.params.uiImgWOri = oGroupNode.params.uiParentW;
                oGroupNodeRes.params.uiImgHOri = oGroupNode.params.uiParentH;
            }
            else{
                oGroupNodeRes.params.uiImgWOri = oGroupNode.params.uiImgW;
                oGroupNodeRes.params.uiImgHOri = oGroupNode.params.uiImgH;
            }

            m_oParent.Merge.Plugin[m_oParent.Merge.transformArrCapIdsToStrCapIDs(m_oParent.m_arrCapIds)].uiProp4Node(oGroupNodeRes);
            oGroupNodeRes.params.x = oGroupNode.params.x;
            oGroupNodeRes.params.y = oGroupNode.params.y;
            oGroupNodeRes.params.uiGroupId = strGroupId;
            oGroupNodeRes.params.uiGroupParent = true;
            oGroupNodeRes.params.uiGroupFolder = true;
            return oGroupNodeRes;
        };

        //endregion

        //region getAllExpandOrFolderNodeGroupIds

        /**
         *
         * @param bIsExpand
         * @param oTopoOverlay
         * @returns {Array}
         */
        this.getAllExpandOrFolderNodeGroupIds = function(bIsExpand, oTopoOverlay){
            var arrOpticalSiteGroupIds = [];
            for(var i = 0; i < oTopoOverlay.nodes.length; i++){
                var oTemNode = oTopoOverlay.nodes[i];
                if(!oTemNode.params.uiGroupParent){
                    continue;
                }
                else{
                    if(bIsExpand){
                        if(oTemNode.params.uiGroupFolder){
                            arrOpticalSiteGroupIds.push(oTemNode.params.uiGroupId);
                        }
                    }
                    else{
                        if(!oTemNode.params.uiGroupFolder){
                            arrOpticalSiteGroupIds.push(oTemNode.params.uiGroupFolder);
                        }
                    }
                }
            }
            return arrOpticalSiteGroupIds;
        };

        //endregion

        //region expandOrFoldNodeGroupsBy3rd

        /**
         * 展开或者折叠node
         * @param arrNodeGroupId
         * @param bIsExpand
         * @param oTopoOverlay
         * @param oAfterFolderNodeGroup
         */
        this.expandOrFoldNodeGroupsBy3rd = function(arrNodeGroupId, bIsExpand, oTopoOverlay, oAfterFolderNodeGroup){
            for(var k = 0; k < arrNodeGroupId.length; k++){
                //1.根据strGroupId找出oGroupNode,arrChildNodes
                var strNodeGroupId = arrNodeGroupId[k];
                var oGroupNode;
                var arrChildNodes = [];
                var bIsNeedContinue;
                //2. 如果bIsExpand为ture
                if(bIsExpand){
                    _expandNode(oTopoOverlay.nodes, oTopoOverlay.links, strNodeGroupId);
                }
                else{
                    _folderNode(oTopoOverlay.nodes, oTopoOverlay.links, strNodeGroupId);
                }
            }

            oAfterFolderNodeGroup();
        };

        //endregion

        var _addExpandNodeGroupName = function(oDstNode){
            self.m_arrExpandNodeNames.push(oDstNode.params.uiGroupId);
        };
        var _removeExpandNodeGroupName = function(oDstNode){
            $.each(self.m_arrExpandNodeNames, function(iIndex, oItem){
                if(oItem == oDstNode.params.uiGroupId){
                    self.m_arrExpandNodeNames.splice(iIndex, 1);
                    return false;
                }
            });
        };
        var _removeNodeChild = function(arrNodes, oNode){
            for(var j = 0; j < arrNodes.length; j++){
                if(arrNodes[j].name == oNode.name){
                    arrNodes.splice(i, 1);
                    break;
                }
            }
        };

        //region expandOrFoldNodeGroupsByDBLClick

        /**
         *
         * @param oNode
         * @param oTopo
         */
        this.expandOrFoldNodeGroupsByDBLClick = function(oNode, oTopo){
            if(oNode.params.uiGroupParent){
                return;
            }
            if(oNode.params.uiGroupFolder){
                _expandNode(oTopo.nodes, oTopo.links, oNode.params.uiGroupId);
            }
            else{
                _folderNode(oTopo.nodes, oTopo.links, oNode.params.uiGroupId);
            }
        };

        var _expandNode = function(arrNodes, arrLinks, strNodeGroupId){
            var oGroupNode;
            var arrChildNodes;
            for(var i = 0;i < arrNodes.length; i++){
                var oNode = arrNodes[i];
                if(oNode.params.uiGroupId == strNodeGroupId && oNode.params.uiGroupParent){
                    oGroupNode = oNode;
                    arrChildNodes = oNode.children;
                    if(!arrChildNodes){
                        arrChildNodes = [];
                    }
                    break;
                }
            }

            //1.生产groupNode的属性
            oGroupNode.children = [];
            m_oParent.Merge.Plugin[m_oParent.Merge.transformArrCapIdsToStrCapIDs(m_oParent.m_arrCapIds)].uiProp4Node(oGroupNode);
            oGroupNode.params.uiGroupFolder = false;
            //2.生产childNode的属性
            for(var i = 0; i < arrChildNodes.length; i++){
                m_oParent.Merge.Plugin[m_oParent.Merge.transformArrCapIdsToStrCapIDs(m_oParent.m_arrCapIds)].uiProp4Node(arrChildNodes[i]);
                arrNodes.push(arrChildNodes[i]);
            }
            //3.修改关联的链路的属性
            var arrChildNodeNames = [];
            for(var i = 0; i  < arrChildNodes.length; i++){
                arrChildNodeNames.push(arrChildNodes[i].name);
            }
            for(i = 0; i < arrLinks.length; i++){
                var oLink = arrLinks[i];
                _expandNodeItem(oLink, oGroupNode, arrChildNodeNames);
                if(oLink.children && oLink.children.length >= 0){
                    for(var j = 0; j < oLink.children.length; j++){
                        _expandNodeItem(oLink.children[j], oGroupNode, arrChildNodeNames);
                    }
                }
            }
            _addExpandNodeGroupName(oGroupNode);
        };
        var _expandNodeItem = function(oLink, oGroupNode, arrChildNodeNames){
            var strSrcNodeName = oLink.params.srcNodeNameCur ? oLink.params.srcNodeNameCur : oLink.params.srcNodeName;
            var strDstNodeName = oLink.params.dstNodeNameCur ? oLink.params.dstNodeNameCur : oLink.params.dstNodeName;
            if(CArray.contains(arrChildNodeNames, strDstNodeName) && CArray.contains(arrChildNodeNames, strSrcNodeName)){
                oLink.params.uiHide = false;
            }
            if(oLink.params.uiOneSideInGroup){
                strSrcNodeName = oLink.params.srcNodeName;
                strDstNodeName = oLink.params.dstNodeName;
                if(strSrcNodeName == oGroupNode.name){
                    oLink.params.uiOneSideFolder = false;
                    oLink.params.srcNodeName = oLink.params.srcNodeNameCur;
                    oLink.params.srcNodeNameCur = undefined;
                }
                if(strDstNodeName == oGroupNode.name){
                    oLink.params.uiOneSideFolder = false;
                    oLink.params.dstNodeName = oLink.params.dstNodeNameCur;
                    oLink.params.dstNodeNameCur = undefined;
                }
            }
            else if(oLink.params.uiBothSideInGroup){
                strSrcNodeName = oLink.params.srcNodeName;
                strDstNodeName = oLink.params.dstNodeName;
                if(strSrcNodeName == oGroupNode.name){
                    oLink.params.uiBothSideInGroupSrcFolder = false;
                    oLink.params.srcNodeName = oLink.params.srcNodeNameCur;
                    oLink.params.srcNodeNameCur = undefined;
                }
                if(strDstNodeName == oGroupNode.name){
                    oLink.params.uiBothSideInGroupDstFolder = false;
                    oLink.params.dstNodeName = oLink.params.dstNodeNameCur;
                    oLink.params.dstNodeNameCur = undefined;
                }
            }
            else if(oLink.params.uiShiftSrcMark || oLink.params.uiShiftDstMark){
                strSrcNodeName = oLink.params.srcNodeName;
                strDstNodeName = oLink.params.dstNodeName;
                if(strSrcNodeName == oGroupNode.name){
                    oLink.params.uiShiftSrcMark = false;
                    oLink.params.srcNodeName = oLink.params.srcNodeNameCur;
                    oLink.params.srcNodeNameCur = undefined;
                }
                if(strDstNodeName == oGroupNode.name){
                    oLink.params.uiShiftDstMark = false;
                    oLink.params.dstNodeName = oLink.params.dstNodeNameCur;
                    oLink.params.dstNodeNameCur = undefined;
                }
            }
        };

        var _folderNode = function(arrNodes, arrLinks, strNodeGroupId){
            var oGroupNode;
            var arrChildNodes = [];
            var iGroupNodeIndex;
            for(var i = 0;i < arrNodes.length; i++){
                var oNode = arrNodes[i];
                if(oNode.params.uiGroupId == strNodeGroupId){
                    if(oNode.params.uiGroupParent){
                        iGroupNodeIndex = i;
                        oGroupNode = oNode;
                        if(oGroupNode.children && oGroupNode.children.length > 0){
                            return;
                        }
                    }
                    else if(oNode.params.uiGroupChild){
                        arrChildNodes.push(oNode);
                    }
                }
            }

            //1.生成groupNode的属性
            var oNodeGroup = _generateParentNode(strNodeGroupId, oGroupNode, arrChildNodes);

            //2.加入groupNode
            arrNodes.splice(iGroupNodeIndex, 1);
            arrNodes.push(oNodeGroup);

            //3.删除childNode
            for(var i = 0; i < arrChildNodes.length; i++){
                _removeNodeChild(arrNodes, arrChildNodes[i]);
            }

            //4.修改关联的链路的属性
            var arrChildNodeNames = [];
            for(var i = 0; i  < arrChildNodes.length; i++){
                arrChildNodeNames.push(arrChildNodes[i].name);
            }
            for(i = 0; i < arrLinks.length; i++){
                var oLink = arrLinks[i];
                _folderNodeItem(oLink, oGroupNode, arrChildNodeNames);
                if(oLink.children && oLink.children.length >= 0){
                    for(var j = 0; j < oLink.children.length; j++){
                        _folderNodeItem(oLink.children[j], oGroupNode, arrChildNodeNames);
                    }
                }
            }

            _removeExpandNodeGroupName(oGroupNode);
        };

        var _folderNodeItem = function(oLink, oGroupNode, arrChildNodeNames){
            if(oLink.params.uiOneSideInGroup){
                var strSrcNodeName = oLink.params.srcNodeName;
                var strDstNodeName = oLink.params.dstNodeName;
                if(CArray.contains(arrChildNodeNames, strSrcNodeName)){
                    oLink.params.uiOneSideFolder = true;
                    oLink.params.srcNodeNameCur = oLink.params.srcNodeName;
                    oLink.params.srcNodeName = oGroupNode.name;
                }
                if(CArray.contains(arrChildNodeNames, strDstNodeName)){
                    oLink.params.uiOneSideFolder = true;
                    oLink.params.dstNodeNameCur = oLink.params.dstNodeName;
                    oLink.params.dstNodeName = oGroupNode.name;
                }
            }
            else if(oLink.params.uiBothSideInGroup){
                strSrcNodeName = oLink.params.srcNodeName;
                strDstNodeName = oLink.params.dstNodeName;
                if(CArray.contains(arrChildNodeNames, strSrcNodeName)){
                    oLink.params.uiBothSideInGroupSrcFolder = true;
                    oLink.params.srcNodeNameCur = oLink.params.srcNodeName;
                    oLink.params.srcNodeName = oGroupNode.name;Dst
                }
                if(CArray.contains(arrChildNodeNames, strDstNodeName)){
                    oLink.params.uiBothSideInGroupFolder = true;
                    oLink.params.dstNodeNameCur = oLink.params.dstNodeName;
                    oLink.params.dstNodeName = oGroupNode.name;
                }
            }
            else{
                strSrcNodeName = oLink.params.srcNodeName;
                strDstNodeName = oLink.params.dstNodeName;
                if(CArray.contains(arrChildNodeNames, strSrcNodeName) && CArray.contains(arrChildNodeNames, strDstNodeName)){
                    oLink.params.uiHide = true;
                }
                if(strSrcNodeName == oGroupNode.name){
                    oLink.params.uiShiftSrcMark = true;
                    oLink.params.srcNodeNameCur = oLink.params.srcNodeName;
                    oLink.params.srcNodeName = oGroupNode.name;
                }
                if(strDstNodeName == oGroupNode.name){
                    oLink.params.uiShiftDstMark = true;
                    oLink.params.dstNodeNameCur = oLink.params.dstNodeName;
                    oLink.params.dstNodeName = oGroupNode.name;
                }
            }
        };

        //endregion

        //region clearExpandLinkAndNodeCatch

        /**
         * 清空展开的link/node缓存
         */
        this.clearExpandLinkAndNodeCatch = function(){
            self.m_arrExpandLinkNames = [];
            self.m_arrExpandNodeNames = [];
        };

        //endregion
    };
})(jQuery);
