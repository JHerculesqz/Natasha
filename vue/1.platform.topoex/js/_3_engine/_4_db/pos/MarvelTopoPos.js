/**
 * Created by hou on 17/12/22.
 */
(function($){
    $.MarvelTopoPos = function(oParent){
        var self = this;

        //region Fields

        var m_oParent = oParent;

        this.m_oTopoUpdatePos = {
            posUpdate: []
        };

        //endregion

        //region updateNodeDBPos4Drag

        this.updateNodeDBPos4Drag = function(iOffsetXOnScreen, iOffsetYOnScreen, oProfile, oTopoOverlay){
            //1.update uiPos2DBPos
            var iOffsetXInDB = _calcOffsetToDBOffset(iOffsetXOnScreen, oProfile);
            var iOffsetYInDB = _calcOffsetToDBOffset(iOffsetYOnScreen, oProfile);

            //2.获取得到所有需要更新坐标的arrNodeUiGroupIds
            var arrNodeUiGroupIds = [];
            for(var i = 0; i < oTopoOverlay.nodes.length; i++){
                 var oNode = oTopoOverlay.nodes[i];
                if(oNode.params.isSelect && oNode.params.uiGroupParent){
                    arrNodeUiGroupIds.push(oNode.params.uiGroupId);
                }
            }

            //3.更新singleNode/不在arrNodeUiGroupIds里面的node
            for(var j = 0; j < oTopoOverlay.nodes.length; j++){
                var oNodeTemp = oTopoOverlay.nodes[j];
                if(oNodeTemp.params.isSelect && !oNodeTemp.params.uiGroupChild && !oNodeTemp.params.uiGroupParent){
                    //1.update xy
                    _updateNodeXYBySlideWndXMinYMin(oProfile, oNodeTemp, iOffsetXInDB, iOffsetYInDB);


                    //2.set nodPos update
                    oNodeTemp.params.isPosUpdate = true;
                    _upsertNodePosCatchByNode(oNodeTemp);
                }
                else if(oNodeTemp.params.isSelect && oNodeTemp.params.uiGroupChild){
                    if(CArray.contains(arrNodeUiGroupIds, oNodeTemp.parmas.uiGroupId)){
                        //do nothing
                    }
                    else{
                        var oNodeGroup = _getNodeGroupByChildNode(oNodeTemp, oTopoOverlay.nodes);
                        if(undefined !== oNodeGroup){
                            //1.更新nodeChild坐标,保证只在圆的内接矩形内移动
                            _updateNodeXYBySlideWndXMinYMin4NodeChild(oProfile, oNodeTemp, oNodeGroup, iOffsetXInDB, iOffsetYInDB, oNodeGroup.params.uiImgWOri, oNodeGroup.params.uiImgHOri);

                            //2.set nodPos update
                            oNodeTemp.params.isPosUpdate = true;
                            _upsertNodePosCatchByNode(oNodeTemp);
                        }
                    }
                }

                //4.更新所有在arrNodeUiGroupIds里面的node
                if(CArray.contains(arrNodeUiGroupIds, oNodeTemp.params.uiGroupId)){
                    //1.update xy
                    _updateNodeXYBySlideWndXMinYMin(oProfile, oNodeTemp, iOffsetXInDB, iOffsetYInDB);

                    //2.set nodPos update
                    oNodeTemp.params.isPosUpdate = true;
                    _upsertNodePosCatchByNode(oNodeTemp);

                    //3.如果对应的网元是隐藏的,其中children的坐标需要修改
                    if(oNodeTemp.children && oNodeTemp.children.length > 0){
                        for(var k = 0; k < oNodeTemp.children.length; k++){
                            //1.更新nodeChild坐标,保证只在圆的内接矩形内移动
                            _updateNodeXYBySlideWndXMinYMin4NodeChild(oProfile, oNodeTemp.children[k], oNodeTemp, iOffsetXInDB, iOffsetYInDB, oNodeTemp.params.uiImgWOri, oNodeTemp.params.uiImgHOri);

                            //2.set nodPos update
                            oNodeTemp.params.isPosUpdate = true;
                            _upsertNodePosCatchByNode(oNodeTemp);
                        }
                    }
                }
            }
        };

        var _getNodeGroupByChildNode = function(oNode, arrNodes){
            for(var i = 0; i < arrNodes.length; i++){
                var oNodeDst = arrNodes[i];
                if(oNodeDst.params.uiGroupId == oNode.params.uiGroupId && oNodeDst.params.uiGroupParent){
                    return oNodeDst;
                }
            }
        };

        var _calcOffsetToDBOffset = function(iOffsetXOnScreen, oProfile){
            var iZoomRate = oProfile.slideWndZ;
            return iOffsetXOnScreen/ iZoomRate;
        };

        var _updateNodeXYBySlideWndXMinYMin = function(oProfile, oNode, iOffsetXInDB, iOffsetYInDB){
            if(oNode.params.uiLayer && "" != oNode.params.uiLayer){
                m_oParent.Geo.updateNodePosByLayer(oProfile, oNode, iOffsetXInDB, iOffsetYInDB);
            }
            else{
                oNode.params.x = oNode.params.x + iOffsetXInDB;
                oNode.params.y = oNode.params.y + iOffsetYInDB;
            }
        };

        var _updateNodeXYBySlideWndXMinYMin4NodeChild = function(oProfile, oNodeChild, oNodeParent, iOffsetXInDB, iOffsetYInDB, iNodeParentWOri, iNodeParentHOri){
            //1.根据oNodeParent算出内接矩形坐标
            var oRectanglePoints = m_oParent.Geo.getInscribeRectanglePoints(
                oNodeParent.params.x * oProfile.slideWndZ + iNodeParentWOri / 2 * oProfile.slideWndZ,
                oNodeParent.params.y * oProfile.slideWndZ + iNodeParentHOri / 2 * oProfile.slideWndZ,
                iNodeParentWOri / 2 * oProfile.slideWndZ
            );

            //2.oNodeChild的x,y坐标(需要根据缩放后的坐标去比较,基数不一样,缩放后坐标差距比较大,否则计算不准确)
            var iChildLeftX = oNodeChild.params.x * oProfile.slideWndZ;
            var iChildLeftY = oNodeChild.params.y * oProfile.slideWndZ;

            //3.缩放比大于1时
            if(oProfile.slideWndZ >= 1){
                //3.1.x坐标小于nodeParent的xMin坐标
                if(iChildLeftX + iOffsetXInDB * oProfile.slideWndZ <= oRectanglePoints.point1.x){
                    oNodeChild.params.x = oRectanglePoints.point1.x / oProfile.slideWndZ;
                }
                //3.2.x坐标大于nodeParent的xMax坐标
                else if(iChildLeftX + iOffsetXInDB * oProfile.slideWndZ + oNodeChild.params.uiImgW >= oRectanglePoints.point2.x){
                    oNodeChild.params.x = (oRectanglePoints.point2.x - oNodeChild.params.uiImgW) / oProfile.slideWndZ;
                }
                //3.3.
                else{
                    oNodeChild.params.x = oNodeChild.params.x + iOffsetXInDB;
                }

                //3.1.y坐标小于nodeParent的yMin坐标
                if(iChildLeftY + iOffsetYInDB * oProfile.slideWndZ <= oRectanglePoints.point1.y){
                    oNodeChild.params.y = oRectanglePoints.point1.y / oProfile.slideWndZ;
                }
                //3.2.y坐标大于nodeParent的yMax坐标
                else if(iChildLeftY + iOffsetYInDB * oProfile.slideWndZ + oNodeChild.params.uiImgH >= oRectanglePoints.point2.y){
                    oNodeChild.params.y = (oRectanglePoints.point2.y - oNodeChild.params.uiImgH) / oProfile.slideWndZ;
                }
                //3.3.
                else{
                    oNodeChild.params.y = oNodeChild.params.y + iOffsetXInDB;
                }
            }
            else{
                //4.1.x坐标小于nodeParent的xMin坐标
                if(iChildLeftX + iOffsetXInDB * oProfile.slideWndZ <= oRectanglePoints.point1.x){
                    oNodeChild.params.x = oRectanglePoints.point1.x / oProfile.slideWndZ;
                }
                //3.2.x坐标大于nodeParent的xMax坐标
                else if(iChildLeftX + iOffsetXInDB * oProfile.slideWndZ + oNodeChild.params.uiImgW * oProfile.slideWndZ >= oRectanglePoints.point2.x){
                    oNodeChild.params.x = (oRectanglePoints.point2.x - oNodeChild.params.uiImgW * oProfile.slideWndZ) / oProfile.slideWndZ;
                }
                //3.3.
                else{
                    oNodeChild.params.x = oNodeChild.params.x + iOffsetXInDB;
                }

                //3.1.y坐标小于nodeParent的yMin坐标
                if(iChildLeftY + iOffsetYInDB * oProfile.slideWndZ <= oRectanglePoints.point1.y){
                    oNodeChild.params.y = oRectanglePoints.point1.y / oProfile.slideWndZ;
                }
                //3.2.y坐标大于nodeParent的yMax坐标
                else if(iChildLeftY + iOffsetYInDB * oProfile.slideWndZ + oNodeChild.params.uiImgH * oProfile.slideWndZ >= oRectanglePoints.point2.y){
                    oNodeChild.params.y = (oRectanglePoints.point2.y - oNodeChild.params.uiImgH * oProfile.slideWndZ) / oProfile.slideWndZ;
                }
                //3.3.
                else{
                    oNodeChild.params.y = oNodeChild.params.y + iOffsetXInDB;
                }
            }
        };

        var _upsertNodePosCatchByNode = function(oNodeTemp){
            var bIsExists = false;
            for(var i = 0; i < self.m_oTopoUpdatePos.posUpdate.length; i++){
                if(oNodeTemp.name == self.m_oTopoUpdatePos.posUpdate[i].name){
                    self.m_oTopoUpdatePos.posUpdate[i].params.x = oNodeTemp.params.x;
                    self.m_oTopoUpdatePos.posUpdate[i].params.y = oNodeTemp.params.y;
                    bIsExists = true;
                }
            }
            if(!bIsExists){
                self.m_oTopoUpdatePos.posUpdate.push(oNodeTemp);
            }
        };
        //endregion

        //region updateNodeDBPos4DragAndConnectNodes


        this.updateNodeDBPos4DragAndConnectNodes = function(iOffsetXOnScreen, iOffsetYOnScreen, arrConnectNodeNames, oProfile, oTopoOverLay){
            //1.update uiPos2DBPos
            var iOffsetXInDB = _calcOffsetToDBOffset(iOffsetXOnScreen, oProfile);
            var iOffsetYInDB = _calcOffsetToDBOffset(iOffsetYOnScreen, oProfile);

            //2.更新没有选中,同时又在arrConnectNodeNames的node
            var mapNodes = {};
            for(var i = 0; i < oTopoOverLay.nodes.length; i++){
                var oNode = oTopoOverLay.nodes[i];
                mapNodes[oNode.name] = oNode;
            }
            for(var j = 0; j < arrConnectNodeNames.length; j++){
                var oNodeTemp = map[arrConnectNodeNames[i]];
                if(oNodeTemp !== undefined && !oNodeTemp.parmas.isSelect){
                    //1.update xy
                    _updateNodeXYBySlideWndXMinYMin(oProfile, oNodeTemp, iOffsetXInDB, iOffsetYInDB);


                    //2.set nodPos update
                    oNodeTemp.params.isPosUpdate = true;
                    _upsertNodePosCatchByNode(oNodeTemp);
                }
            }

        };

        //endregion

        //region updateNodeScreenPosAndSizeByProfile

        /**
         * 更新网元尺寸和大小
         * @param arrNodes
         * @param oProfile
         */
        this.updateNodeScreenPosAndSizeByProfile = function(arrNodes, oProfile){
            for(var i = 0; i < arrNodes.length; i++){
                var oNode = arrNodes[i];
                _updateNodeDBPos2ScreenPos(oNode, oProfile);
                _updateNodeDBSize2SreenSize(oNode, oProfile.slideWndZ);
            }
        };

        var _updateNodeDBPos2ScreenPos = function(oNode, oProfile){
            var iXMin = oProfile.slideWndXMin;
            var iYMin = oProfile.slideWndYMin;
            var iZoomRate = oProfile.slideWndZ;
            oNode.params.uiPosX = parseInt((oNode.params.x - iXMin) * iZoomRate);
            oNode.params.uiPosY = parseInt((oNode.params.y - iXMin) * iZoomRate);
        };

        var _updateNodeDBSize2SreenSize = function(oNode, iSlideWndZ){
            if(oNode.params.uiGroupParent){
                oNode.params.uiImgWCur = oNode.params.uiImgW * iSlideWndZ;
                oNode.params.uiImgHCur = oNode.params.uiImgH * iSlideWndZ;
            }
            else{
                if(iSlideWndZ <= 1.0){
                    oNode.params.uiImgWCur = oNode.params.uiImgW * iSlideWndZ;
                    oNode.params.uiImgHCur = oNode.params.uiImgH * iSlideWndZ;
                }
                else{
                    if(oNode.params.uiEditNode){
                        oNode.params.uiImgWCur = oNode.params.uiImgW * iSlideWndZ;
                        oNode.params.uiImgHCur = oNode.params.uiImgH * iSlideWndZ;
                    }
                    else{
                        oNode.params.uiImgWCur = oNode.params.uiImgW;
                        oNode.params.uiImgHCur = oNode.params.uiImgH;
                    }
                }
            }
        };

        //endregion

        //region calcNodeScreenPos2DBPos

        /**
         * 将屏幕坐标转换为后台数据库坐标
         * @param oNodePoint
         * @param oProfile
         */
        this.calcNodeScreenPos2DBPos = function(oNodePoint, oProfile){
            var oNodePoint2DB = {
                x: undefined,
                y: undefined
            };
            var iXMin = oProfile.slideWndXMin;
            var iYMin = oProfile.slideWndYMin;
            var iZoomRate = oProfile.slideWndZ;
            oNodePoint2DB.x = oNodePoint.x / iZoomRate + iXMin;
            oNodePoint2DB.y = oNodePoint.y / iZoomRate + iYMin;
        };

        //endregion

        //region updateNodePosBy3rd

        /**
         * 更新网元坐标
         * @param arrLayoutData
         * @param oTopoOverlay
         * @param oAfteUpdateNodePos
         */
        this.updateNodePosBy3rd = function(arrLayoutData, oTopoOverlay, oAfteUpdateNodePos){
            //1.构造mapLayoutData
            var mapLayoutData = {};
            for(var i = 0; i < arrLayoutData.length; i++){
                var oLayoutNode = arrLayoutData[i];
                mapLayoutData[oLayoutNode.name] = oLayoutNode;
            }

            //2.update x/y
            for(var j = 0;j < oTopoOverlay.nodes.length; j++){
                var oNode = oTopoOverlay.nodes[j];
                if(oNode.params.uiGroupParent && oNode.children && oNode.children.length > 0){
                    var arrChildNodes = oNode.children;
                    for(var k =0; k < arrChildNodes.length; k++){
                        var oChildNode = arrChildNodes[k];
                        var oTargetNode4Child = mapLayoutData[oChildNode.name];
                        if(oTargetNode4Child){
                            oChildNode.params.x = oTargetNode4Child.params.x;
                            oChildNode.params.y = oTargetNode4Child.params.y;
                            oChildNode.params.isPosUpdate = true;
                            _upsertNodePosCatchByNode(oChildNode);
                        }
                    }
                }
                var oTargetNode = mapLayoutData[oNode.name];
                if(oTargetNode){
                    oNode.params.x = oTargetNode.params.x;
                    oNode.params.y = oTargetNode.params.y;
                    oNode.params.isPosUpdate = true;
                    _upsertNodePosCatchByNode(oNode);
                }
            }

            //3.callback
            oAfteUpdateNodePos();
        };

        //endrgion

        //reigon getTopoUpdateNodesBy3rd

        /**
         * 获取当前视图下,坐标改变的数组
         * @returns {{posUpdate: Array}|*}
         */
        this.getTopoUpdateNodesBy3rd = function(){
            return self.m_oTopoUpdatePos;
        };

        //endregion

        //region clearUpdateNodesCatch

        this.clearUpdateNodesCatch = function(){
            self.m_oTopoUpdatePos = {
                posUpdate: []
            }
        };

        //endregion

        //region updateNodePosByCatch

        /**
         * 更新缓存更新pos
         * @param mapAreaNodeRes
         */
        this.updateNodePosByCatch = function(mapAreaNodeRes){
            for(var i = 0; i < self.m_oTopoUpdatePos.posUpdate.length; i++){
                var oNodeUpdate = self.m_oTopoUpdatePos.posUpdate[i];
                var oNode = mapAreaNodeRes[oNodeUpdate.name];
                if(oNode){
                    oNode.params.x = oNodeUpdate.params.x;
                    oNode.params.y = oNodeUpdate.params.y;
                }
            }
        };

        //endregion

        //region getTopoUpdatePos

        this.getTopoUpdatePos = function(){
            return self.m_oTopoUpdatePos.posUpdate;
        };

        //endregion

        //region updateTopoUpdatePos

        this.updateTopoUpdatePos = function(arrNodes){
            self.m_oTopoUpdatePos.posUpdate = arrNodes;
        };

        //endregion
    };
})(jQuery);
