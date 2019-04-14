/**
 * Created by hou on 17/12/22.
 */
(function($){
    $.MarvelTopoDB = function(oParent){
        var self = this;
        var m_oParent = oParent;

        //region Fields

        this.m_oTopoDB = {};
        this.m_oTopoOverlay = {};
        this.m_arrCapIDs = [];
        this.Area = new $.MarvelTopoArea(self);
        this.Group = new $.MarvelTopoGroup(self);
        this.Merge = new $.MarvelTopoMerge(self);
        this.Pos = new $.MarvelTopoPos(self);
        this.Select = new $.MarvelTopoSelect(self);

        //endregion

        //reigon initTopoDB

        /**
         * initTopoDB
         * @param mapCapIDBuTopo
         * @param bNotClearPosAndSizeCache
         */
        this.initTopoDB = function(mapCapIDBuTopo, bNotClearPosAndSizeCache){
            //0.
            if(bNotClearPosAndSizeCache){
               self.Select.clearSelectCatch();
               self.Pos.clearUpdateNodesCatch();
               self.Group.clearExpandLinkAndNodeCatch();
            }

            //1.清空topoDB
            self.m_oTopoDB = undefined;

            //2.初始化topoDB
            self.m_oTopoDB = mapCapIDBuTopo;
        };

        //endregion

        //region appendTopoDB

        /**
         *
         * @param strCapID
         * @param oBuTopo
         */
        this.appendTopoDB = function(strCapID, oBuTopo){
            self.m_oTopoDB[strCapID] = undefined;
            self.m_oTopoDB[strCapID] = oBuTopo;
        };

        //endregion

        //region applyDeltaTopoDB

        /**
         *
         * @param oDelta
         */
        this.applyDeltaTopoDB = function(oDelta){
            oDelta.execute(self.m_oTopoDB);
        };

        //endregion

        //region loadByTopoDB

        this.loadByTopoDB = function(arrCapID){
            self.m_arrCapIDs = arrCapID;
            var oTopoOverlay;
            if(undefined == arrCapID || arrCapID.length < 1){
                return oTopoOverlay;
            }

            //2.get BuTopo
            var oTopoOverlayDraft;
            if(1 == arrCapID.length){
                oTopoOverlayDraft = _deepCopy4Topo(self.m_oTopoDB[arrCapID[0]]);
            }
            else{
                oTopoOverlayDraft = _deepCopy4Topo(self.m_arrCapIDs[arrCapID[0]]);
                for(j = 1; j < arrCapID.length; j++){
                    var oBuTopoLCur = self.m_arrCapIDs[arrCapID[j]];
                    if(undefined != oBuTopoLCur){
                        oTopoOverlayDraft = _mergeTopo(oTopoOverlayDraft, oBuTopoLCur);
                    }
                }
            }

            //3.update pos/select
            var mapNodes = {};
            for(var i = 0; i < oTopoOverlayDraft.nodes.length; i++){
                var oNode = oTopoOverlayDraft.nodes[i];
                mapNodes[oNode.name] = oNode;
            }
            var mapLinks = {};
            for(var i = 0; i < oTopoOverlayDraft.links.length; i++){
                var oLink = oTopoOverlayDraft.links[i];
                mapLinks[oLink.name] = oLink;
            }
            self.Select.updateDatasBySelectCatch(mapNodes, mapLinks);
            self.Pos.updateNodePosByCatch(mapNodes);

            //4.generateProp
            self.Merge.merge(arrCapID, oTopoOverlayDraft);

            //5.group
            oTopoOverlay = self.Group.group(arrCapID, oTopoOverlayDraft);

            self.m_oTopoOverlay = oTopoOverlay;
        };

        var _mergeTopo = function(oTopoMergedSide, oTopoMergingSide){
            var oMergeTopoRes = {
                nodes: undefined,
                links: undefined
            };
            oMergeTopoRes.nodes = _mergeNode(oTopoMergedSide.nodes, oTopoMergingSide.nodes);
            oMergeTopoRes.links = _mergeLink(oTopoMergedSide.links, oTopoMergingSide.links);
            return oMergeTopoRes;
        };
        var _mergeNode = function(arrMergedSideNodes, arrMergingSideNodes){
          var arrMergedNodesRes = [];
          var mapMergedNodeRes = {};
          //1.deepClone
          for(var i = 0; i < arrMergedSideNodes.length; i++){
              var oNodeMergedSide = arrMergedSideNodes[i];
              var oNode = _deepCopy4Node(oNodeMergedSide);
              arrMergedNodesRes.push(oNode);
              mapMergedNodeRes[oNode.name] = oNode;
          }

            //2.merge params
            for(var i = 0; i < arrMergingSideNodes.length; i++){
                var oNodeMergingSide = arrMergingSideNodes[i];
                var oNodeMergedSideEx = mapMergedNodeRes[oNodeMergingSide.name];
                if(oNodeMergedSideEx){
                    for(var key in oNodeMergingSide.params){
                        oNodeMergedSideEx.params[key] = oNodeMergingSide.params[key];
                    }
                }
                else{
                    arrMergedNodesRes.push(_deepCopy4Node(oNodeMergingSide));
                }
            }
            return arrMergedNodesRes;
        };
        var _mergeLink = function(arrLinksMergedSide, arrLinksMergingSide){
            var arrMergedLinkRes = [];
            var mapMergedLinkRes = {};
            var arrMultiNameListMergeLinkRes = [];
            //1.deep copy
            for(var i = 0; i < arrLinksMergedSide.length; i++){
                var oLinkMergedSide = arrLinksMergedSide[i];
                var oLink = _deepCopy4Link(oLinkMergedSide);
                if(undefined == oLink.params.nameList){
                    oLink.params.nameList = [];
                    oLink.params.nameList.push(oLink.name);
                }
                arrMergedLinkRes.push(oLink);
                if(oLink.params.nameList.length == 1){
                    mapMergedLinkRes[oLink.params.nameList[0]] = oLink;
                }
                else{
                   arrMultiNameListMergeLinkRes.push(oLink);
                }
            }

            //2.merge params
            for(var i = 0; i < arrLinksMergingSide.length; i++){
                var oLinkMergingSide = arrLinksMergingSide[i];
                var oLinkMergedLink;
                if(undefined == oLinkMergingSide.params.nameList){
                    oLinkMergingSide.params.nameList = [oLinkMergingSide.name]
                }
                if(oLinkMergingSide.params.nameList.length == 1){
                    oLinkMergedLink = mapMergedLinkRes[oLinkMergingSide.params.nameList[0]];
                }

                if(!oLinkMergedLink){
                    oLinkMergedLink = _getNameListContainsLink(arrMultiNameListMergeLinkRes, oLinkMergingSide);
                }

                if(oLinkMergedLink){
                    for(var strKey in oLinkMergedSide.params){
                        if(strKey != "nameList"){
                            oLinkMergedLink.params[strKey] = oLinkMergingSide.params[strKey];
                        }
                    }
                }
                else{
                    arrMergedLinkRes.push(_deepCopyLink(oLinkMergingSide));
                }
            }

            return arrMergedLinkRes;
        };

        var _deepCopy4Topo = function (oTopoSrc) {
            var oTopoRes = {
                nodes: [],
                links: []
            };
            for(var i = 0; i < oTopoSrc.nodes.length; i++){
                oTopoRes.nodes.push(_deepCopy4Node(oTopoSrc.nodes[i]));
            }
            for(var i = 0; i < oTopoSrc.links.length; i++){
                oTopoRes.links.push(_deepCopy4Link(oTopoSrc.links[i]));
            }
            return oTopoRes;
        };

        var _deepCopy4Node = function(oNode){
            var oCopy = {
                name: undefined,
                params: {}
            };
            oCopy.name = oNode.name;
            for(var strKey in oNode.params){
                oCopy.params[strKey] = oNode.params[strKey];
            }
            return oCopy;
        };
        var _deepCopy4Link = function(oLink){
            var oCopy = {
                name: undefined,
                params: {}
            };
            oCopy.name = oLink.name;
            for(var strKey in oLink.params){
                oCopy.params[strKey] = oLink.params[strKey];
            }
            return oCopy;
        };

        var _getNameListContainsLink = function(arrMultiNameListMergeLinkRes, oLinkMergingSide){
            for(var i = 0; i < arrMultiNameListMergeLinkRes.length; i++){
                var oLinkRes = arrMultiNameListMergeLinkRes[i];
                if(CArray.contains(oLinkRes.params.nameList, oLinkMergingSide.params.nameList)){
                    return oLinkRes;
                }
            }
        };

        //endregion

        //region getTopoDBByCapId

        /**
         * 根据capId获取buTopo
         * @param strCapId
         * @returns {*}
         */
        this.getTopoDBByCapId = function(strCapId){
            return self.m_oTopoDB[strCapId];
        };

        //endregion
    };
})(jQuery);
