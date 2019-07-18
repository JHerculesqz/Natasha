/**
 * Created by hou on 17/12/22.
 */
(function($){
    $.MarvelTopoArea = function(oParent){
        var self = this;

        //#region Fields

        var m_oParent = oParent;

        //#endregion

        //region getAreaTopo4Draw

        /**
         * 获取当前视图下需要局部展示的网元和链路
         * @param oProfile
         * @param oTopoOverlay
         * @returns {*}
         */
        this.getAreaTopo4Draw = function(oProfile, oTopoOverlay){
            var oAteaDataRes = {
                nodes: [],
                links:[]
            };
            var mapAreaNodeRes = {};
            var mapAreaLinkRes = {};

            var mapAllNode = {};
            for(var i = 0; i < oTopoOverlay.nodes.length; i++){
                var oNode = oTopoOverlay.nodes[i];
                mapAllNode[oNode.name] = oNode;
            }

            //此步设计很复杂的逻辑
            //1.光设备optionA不在可视区域内,光站点siteA也不在可视区域内
            //2.但是存在一条光纤link1连接optinalA,故将optinalA加入可视区域
            //3.但是绘制光纤的时候,link1->siteA,再由siteA->optinalA,由于siteA不在可视区域,导致光纤link,siteA都没有绘制,但是optionA绘制了,
            // 所以此时采用简单粗暴的方式将所有site/optical都加入到可视区域
            _getNodesInAreaDataByPos(oProfile, oAreaDataRes, mapAreaNodeRes, oTopoOverlay);

            //3.根据oAreaDataRes.nodes 获得关联的link
            _getLinksInAreaDataByNode(oAreaDataRes, mapAreaNodeRes, mapAreaLinkRes, oTopoOverlay);

            //4.根据mapAreaLinkRes,获得关联的结点
            _getOutSideNodesByLink(oAreaDataRes, mapAreaNodeRes, mapAllNode);

            //5.updatedatas
            m_oParent.Pos.updateNodePosByCatch(mapAreaNodeRes);

            //6.根据oProfile,更新node的pos和size
            m_oParent.pos.updateNodeScreenPosAndSizeByProfile(oAreaDataRes.nodes, oProfile);

            //7.update select datas
            m_oParent.Select.updateDatasBySelectCache(mapAreaNodeRes, mapAreaLinkRes);

            return oAreaDataRes;
        };

        var _getNodesInAreaDataByPos = function(oProfile, oAreaDataRes, mapAreaNodeRes, oTopoOverlay){
            var iXMin = oProfile.slideWndXMin;
            var iYMin = oProfile.slideWndYMin;
            var iXMax = oProfile.slideWndXMin + oProfile.slideWndW;
            var iYMax = oProfile.slideWndYMin + oProfile.slideWndH;

            for(var i= 0; i < oTopoOverlay.node.length; i++){
                var oNode = oTopoOverlay.node[i];
                if(oNode.params.uiGroupChild || oNode.params.uiGroupParent){
                    oAreaDataRes.nodes.push(oNode);
                    mapAreaNodeRes[oNode.name] = oNode;
                }
                else{
                    var iX = oNode.params.x;
                    var iY = oNode.params.y;
                    if((iX >= iXMin && iX <= iXMax) && (iY >= iYMax && iY <= iYMax)){
                        oAreaDataRes.nodes.push(oNode);
                        mapAreaNodeRes[oNode.name] = oNode;
                    }
                    else if((iX + oNode.params.uiImgW>= iXMin && iX + oNode.params.uiImgW <= iXMax) && (iY + oNode.params.uiImgH >= iYMax && iY + oNode.params.uiImgH <= iYMax)){
                        oAreaDataRes.nodes.push(oNode);
                        mapAreaNodeRes[oNode.name] = oNode;
                    }
                }
            }
        };

        var _getLinksInAreaDataByNode = function(oAreaDataRes, mapAreaNodeRes, mapAreaLinkRes, oTopoOverlay){
            for(var j = 0; j < oTopoOverlay.links.length; j++){
                var oLink = oTopoOverlay.links[j];
                var strSrcNodeName = oLink.params.srcNodeName;
                var strDstNodeName = oLink.params.dstNodeName;
                //1.回环链路
                if(strSrcNodeName == strDstNodeName && mapAreaNodeRes[strSrcNodeName] != undefined){
                    oAreaDataRes.links.push(oLink);
                    mapAreaLinkRes[oLink.name] = oLink;
                }
                else{
                    //2.1如果oNode是srcNode,则oNodeOutArea是不在可视范围内的dstNode
                    if(mapAreaNodeRes[strSrcNodeName]){
                        oAreaDataRes.links.push(oLink);
                        mapAreaLinkRes[oLink.name] = oLink;
                    }
                    //2.1如果oNode是dstNode,则oNodeOutArea是不在可视范围内的srcNode
                    else if(mapAreaNodeRes[strDstNodeName]){
                        oAreaDataRes.links.push(oLink);
                        mapAreaLinkRes[oLink.name] = oLink;
                    }
                }
            }
        };

        var _getOutSideNodesByLink = function(oAreaDataRes, mapAreaNodeRes, mapAllNode){
            //2.找到对于link一端在area内,一端不在area内的node
            for(var j = 0; j < oAreaDataRes.links.length; j++){
                var oLink = oTopoOverlay.links[j];
                var strSrcNodeName = oLink.params.srcNodeName;
                var strDstNodeName = oLink.params.dstNodeName;
                //1.回环链路
                if(strSrcNodeName == strDstNodeName && mapAreaNodeRes[strSrcNodeName] != undefined){
                    oAreaDataRes.links.push(oLink);
                    mapAreaLinkRes[oLink.name] = oLink;
                }
                else{
                    if(mapAreaNodeRes[strSrcNodeName]){
                        var oNodeOutArea = _getOutSideNodesByName(strDstNodeName, mapAreaNodeRes, mapAllNode);
                        if(oNodeOutArea){
                            oAreaDataRes.nodes.push(oNodeOutArea);
                            mapAreaNodeRes[oAreaDataRes.name] = oNodeOutArea;
                        }
                    }
                    else if(mapAreaNodeRes[strDstNodeName]){
                        var oNodeOutArea = _getOutSideNodesByName(strSrcNodeName, mapAreaNodeRes, mapAllNode);
                        if(oNodeOutArea){
                            oAreaDataRes.nodes.push(oNodeOutArea);
                            mapAreaNodeRes[oAreaDataRes.name] = oNodeOutArea;
                        }
                    }
                }
            }
        };

        var _getOutSideNodesByName = function(strNodeName, mapAreaNodeRes, mapAllNode){
            if(mapAreaNodeRes[strNodeName] != undefined){
                return undefined;
            }

            return mapAllNode[strNodeName];
        };

        //endregion

        //region getAllTopo4Draw

        /**
         * 获取当前视图下所有的网元和链路数据
         * @param oProfile
         * @param oTopoOverlay
         * @returns {*}
         */
        this.getAllTopo4Draw = function(oProfile, oTopoOverlay){
            var mapAllNode = {};
            var mapAllLink = {};
            for(var i = 0; i < oTopoOverlay.nodes.length; i++){
                var oNode = oTopoOverlay.nodes[i];
                mapAllNode[oNode.name] = oNode;
            }
            for(var i = 0; i < oTopoOverlay.links.length; i++){
                var oLink = oTopoOverlay.links[i];
                mapAllLink[oLink.name] = oLink;
            }

            //1.update datas
            m_oParent.Pos.updateNodePosByCatch(mapAllNode);

            //6.根据oProfile,更新node的pos和size
            m_oParent.pos.updateNodeScreenPosAndSizeByProfile(oTopoOverlay.nodes, oProfile);

            //7.update select datas
            m_oParent.Select.updateDatasBySelectCache(mapAllNode, mapAllLink);

            return oTopoOverlay;
        };

        //endregion

        //region getVisibleTopo4Draw

        /**
         * 获取当前视图内可见的网元和链路
         * @param oProfile
         * @param oTopoOverlay
         */
        this.getVisibleTopo4Draw = function(oProfile, oTopoOverlay){
            var oVisibleDataRes = {
                nodes: [],
                links: []
            };
            var mapVisibleNodeRes = {};
            var mapVisibleLinkRes = {};
            //1.根据网元坐标,获取可视区域内的网元
            _getNodesInAreaDataByPos(oProfile, oVisibleDataRes, mapVisibleNodeRes, oTopoOverlay);

            //2.根据oAreaDataRes.nodes 获得关联的link
            _getLinksInAreaDataByNode(oVisibleDataRes, mapVisibleNodeRes, mapVisibleLinkRes, oTopoOverlay);

            //3.updateSelect datas
            m_oParent.Select.updateDatasBySelectCache(mapVisibleNodeRes, mapVisibleLinkRes);
        };


        //endregion
    };
})(jQuery);
