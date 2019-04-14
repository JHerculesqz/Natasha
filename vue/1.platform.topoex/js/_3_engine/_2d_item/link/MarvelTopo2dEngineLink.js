(function ($) {
    $.MarvelTopo2dEngineLink = function (oParent) {
        var self = this;

        //region Const

        //Const.path
        var LINK_SELECTION_TOLERANCE = 3;
        var LINK_PATH_FILE_STYLE = "#FFFFFF";

        //Const.linkline
        var REAL_STEP = 4;//虚线中实线的长度
        var REAL_STEP_GAP = 4;//虚线中实线与实线的间隔
        var LINK_GAP = 15;//多条线之间间隔
        var LINK_LOOP_BACK_RADIUS = 10;//自环线的半径
        var LINK_PATH_REAL_STEP = 8;

        //Const.linkDirection
        var LINK_DIRECTION_LENGTH = 10;//标识箭头的顶点与两端顶点之间的距离
        var LINK_DIRECTION_CROSS_LENGTH = 6;//标识箭头顶点与凹进去的顶点之间的距离
        var LINK_DIRECTION_OFFSET_LENGTH = 4;//标识箭头的两端顶点和链路的垂直距离
        var LINK_DIRECTION_UNSPECIFIED = "UNSPECIFIED";//无方向
        var LINK_DIRECTION_BIDIRECTIONAL = "BIDIRECTIONAL";//双向
        var LINK_DIRECTION_UNIDIRECTIONAL = "UNIDIRECTIONAL";//单向

        //Const.link label
        var LINK_LABEL_TOP = "top";
        var LINK_LABEL_CENTER = "center";
        var LINK_LABEL_BOTTOM = "bottom";
        var LINK_LABEL_POS_LEFT= "left";
        var LINK_LABEL_POS_RIGHT = "right";
        var LINK_LABEL_POS_CENTER = "center";

        //Const.shawdow
        var LINK_SHOADOW_COLOR = "#666";

        //Const.attach
        var LINK_ATTACH_POS_CENTER = "center";

        //Const.flowLink
        var m_arrInterval4FlowLink = [];
        var FLOW_LINK_DEFAULT_BG_COLOR = "#F0F0F0";

        //endregion

        //region Fields

        var m_oParent = oParent;

        //endregion

        //region drawLink4DrawPath

        /**
         * 用于鼠标点击对象识别,判断是否点击link
         * @param oLinkGroup
         * @param oStartPoint
         * @param oEndPoint
         * @param oRes
         * @param oCanvasContext
         */
        this.drawLink4DrawPath = function(oLinkGroup, oStartPoint, oEndPoint, oRes, oCanvasContext){
            for(var i = 0; i < m_arrInterval4FlowLink.length; i++){
                clearInterval(m_arrInterval4FlowLink[i]);
            }
            m_arrInterval4FlowLink = [];

            if(oLinkGroup.params.uiHide){
                return ;
            }

            oCanvasContext.beginPath();
            oCanvasContext.fillStyle = LINK_PATH_FILE_STYLE;
            if((oLinkGroup.params.uiSrcPoint2X >= oLinkGroup.params.uiDstPoint2X && oLinkGroup.params.uiSrcPoint2Y >= oLinkGroup.params.uiDstPoint2Y)
                || (oLinkGroup.params.uiSrcPoint2X <= oLinkGroup.params.uiDstPoint2X && oLinkGroup.params.uiSrcPoint2Y <= oLinkGroup.params.uiDstPoint2Y)){
                oCanvasContext.moveTo(oLinkGroup.params.uiSrcPoint1X - LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiSrcPoint1Y + LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiSrcPoint2X - LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiSrcPoint2Y + LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiDstPoint2X - LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiDstPoint2Y + LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiDstPoint1X - LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiDstPoint1Y + LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiDstPoint1X + LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiDstPoint1Y - LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiDstPoint2X + LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiDstPoint2Y - LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiSrcPoint2X + LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiSrcPoint2Y - LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiSrcPoint1X + LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiSrcPoint1Y - LINK_SELECTION_TOLERANCE);
                oCanvasContext.fill();
            }
            else{
                oCanvasContext.moveTo(oLinkGroup.params.uiSrcPoint1X - LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiSrcPoint1Y - LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiSrcPoint2X - LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiSrcPoint2Y - LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiDstPoint2X - LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiDstPoint2Y - LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiDstPoint1X - LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiDstPoint1Y - LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiDstPoint1X + LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiDstPoint1Y + LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiDstPoint2X + LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiDstPoint2Y + LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiSrcPoint2X + LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiSrcPoint2Y + LINK_SELECTION_TOLERANCE);
                oCanvasContext.lineTo(oLinkGroup.params.uiSrcPoint1X + LINK_SELECTION_TOLERANCE, oLinkGroup.params.uiSrcPoint1Y + LINK_SELECTION_TOLERANCE);
                oCanvasContext.fill();
            }

            if(oCanvasContext.isPointInPath(oStartPoint.x, oStartPoint.y)){
                oRes.whoISInPath = m_oParent.INPATH_LINK;
                oRes.linkGroup = oLinkGroup
            }
        };

        //endregion

        //region drawLinks

        /**
         * 绘制links
         * @param arrLinkGroup
         * @param arrNodeGroup
         * @param iSlideWndZ
         * @param dicImages
         * @param oCanvasContext
         */
        this.drawLinks = function(arrLinkGroup, arrNodeGroup, iSlideWndZ, dicImages, oCanvasContext){
            for(var i = 0; i < m_arrInterval4FlowLink.length; i++){
                clearInterval(m_arrInterval4FlowLink[i]);
            }
            m_arrInterval4FlowLink = [];

            //2.link 编号
            _generateLinkNumber(arrLinkGroup);

            //3.generateMapNodes
            var mapNodes = {};
            for(var j = 0; j < arrNodeGroup.length; j++){
                var oNode = arrLinkGroup[j];
                mapNodes[oNode.name] = oNode;
            }

            //4.drawLink
            for(var k = 0; k < arrLinkGroup.length; k++){
                var oLinkGroup = arrLinkGroup[k];
                _drawLink(oLinkGroup, mapNodes, iSlideWndZ, dicImages, oCanvasContext);
            }
        };

        //region _generateLinkNumber

        /**
         * 用于绘制多条链路编号
         * @param arrLinks
         * @private
         */
        var _generateLinkNumber = function(arrLinks){
            //1.
            var dicLinks = {};
            for(var i = 0; i < arrLinks.length; i++){
                var oLink = arrLinks[i];
                var strSrcNodeName = oLink.name;
                var strDstNodeName = oLink.name;
                var strKey;
                if(strSrcNodeName <= strDstNodeName){
                    strKey = strSrcNodeName + "_" + strDstNodeName;
                }
                else{
                    strKey = strDstNodeName + "_" + strSrcNodeName;
                }
                if(dicLinks[strKey] == undefined){
                    dicLinks[strKey] = 1;
                    oLink.params.src_dst_id = 1;
                }
                else{
                    dicLinks[strKey] = dicLinks[strKey] + 1;
                    oLink.params.src_dst_id = dicLinks[strKey];
                }
            }

        };

        //endregion

        //region _drawLink

        var _drawLink = function(oLink, oNodeMap, iSlideWndZ, dicImages, oCanvasContext){
            if(oLink.params.uiHide){
                return ;
            }
            var strSrcNodeName = oLink.params.srcNodeName;
            var strDstNodeName = oLink.params.dstNodeName;
            var oSrcNode = oNodeMap[strSrcNodeName];
            var oDstNode = oNodeMap[strDstNodeName];
            //只有链路两端结点都存在并且不隐藏采取绘制
            if(oSrcNode && oDstNode && !oSrcNode.params.uiHide && !oDstNode.params.uiHide){
                //1.针对尾纤(一端在站点里面,一端在站点外面,一条链路事实上对应两条)
                if(oLink.params.uiOneSideInGroup){
                    _getLinkPos(oLink, oSrcNode, oDstNode);
                    _drawLinkDetail(oCanvasContext, iSlideWndZ, oLink, dicImages);
                }
                //2.针对光纤(两端端在站点里面,一条链路事实上对应三条)
                else if(oLink.params.uiOneSideInGroup){
                    var oSrcGroupNode = oNodeMap[oLink.params.srcGroupName];
                    var oDstGroupNode = oNodeMap[oLink.params.dstGroupName];
                    if(undefined === oSrcGroupNode || undefined === oDstGroupNode){
                        return;
                    }
                    _getLinkPos(oLink, oSrcNode, oDstNode);
                    _drawLinkDetail(oCanvasContext, iSlideWndZ, oLink, dicImages);
                }
                //3.针对光缆(一条链路事实上对应N条)
                else if(oLink.params.uiOneSideInGroup){
                    var arrVirtualLinks = [];
                    var strSrcDstId = oLink.params.src_dst_id;
                    oLink.params.src_dst_id = 1;
                    var oSrcGroupNodeEx = oNodeMap[oLink.params.srcGroupName];
                    var oDstGroupNodeEx = oNodeMap[oLink.params.dstGroupName];
                    if(undefined === oSrcGroupNodeEx || undefined === oDstGroupNodeEx){
                        return
                    }
                    //3.1.构造虚拟的oSrcNodeVirtual/oDstNodeVirtual
                    var oLinkVirtual = {
                        params: {
                            src_dst_id: strSrcDstId
                        }
                    };
                    _getLinkPos(oLinkVirtual, oSrcGroupNodeEx, oDstGroupNodeEx);
                    var oSrcNodeVirtual = {
                        name: "srcNodeVirtual",
                        params: {
                            uiImgWCur: 1,
                            uiImgHCur: 1,
                            uiPosX: oLinkVirtual.params.uiSrcPoint1X,
                            uiPosY: oLinkVirtual.params.uiSrcPoint1Y
                        }
                    };
                    var oDstNodeVirtual = {
                        name: "dstNodeVirtual",
                        params: {
                            uiImgWCur: 1,
                            uiImgHCur: 1,
                            uiPosX: oLinkVirtual.params.uiDstPoint1X,
                            uiPosY: oLinkVirtual.params.uiDstPoint1Y
                        }
                    };
                    var strLabel = oLink.params.uiLabel;
                    var uiAttach = oLink.params.uiAttach;
                    var strDirection = oLink.params.uiDirection;
                    var strColor = oLink.params.uiColor;
                    var arrColor = oLink.params.uiLstColor;
                    oLink.params.uiLabel = "";
                    oLink.params.uiAttach = undefined;
                    oLink.params.uiDirection = LINK_DIRECTION_UNSPECIFIED;

                    //3.2.绘制虚拟的oSrcNode/oSrcNodeVirtual
                    for(var j = 0; j < oLink.params.lstSrcNodeName.length; j++){
                        var oSrcNodeItem = oLink.params.lstSrcNodeName[j];
                        oSrcNode = oNodeMap[oSrcNodeItem.name];
                        if(oSrcNode && oSrcNode.name != oSrcGroupNodeEx.name && oSrcNode.name != oDstGroupNodeEx.name && oNodeMap[oSrcNode.name]){
                            oLinkVirtual = _deepClone4Link(oLink);
                            _getLinkPos(oLinkVirtual, oSrcNode, oSrcNodeVirtual);
                            oLinkVirtual.name = CString.uuid();
                            oLinkVirtual.params.uiLstColor = oSrcNodeItem.uiLstColor;
                            oLinkVirtual.params.uiColor = oSrcNodeItem.uiColor;
                            oLinkVirtual.params.uiFlowLink = oSrcNodeItem.uiFlowLink;
                            oLinkVirtual.params.uiRealLine = oSrcNodeItem.uiRealLine;
                            oLinkVirtual.params.uiAlpha = oSrcNodeItem.uiAlpha;
                            _drawLinkDetail(oCanvasContext, iSlideWndZ, oLinkVirtual, dicImages);
                            arrVirtualLinks.push(oLinkVirtual);
                        }
                    }

                    //3.3.绘制虚拟的oDstNode/oDstNodeVirtual
                    var bIsDstNodeExpand = false;
                    oLink.params.uiDirection = strDirection;
                    for(var i = 0; i < oLink.params.lstDstNodeName.length; i++){
                        var oDstNodeItem = oLink.params.lstDstNodeName[i];
                        oDstNode = oNodeMap[oDstNodeItem.name];
                        if(oDstNode && oDstNode.name != oSrcGroupNodeEx.name && oDstNode.name != oDstGroupNodeEx.name && oNodeMap[oDstNode.name]){
                            bIsDstNodeExpand = true;
                            oLinkVirtual = _deepClone4Link(oLink);
                            _getLinkPos(oLinkVirtual, oDstNodeVirtual, oDstNode);
                            oLinkVirtual.name = CString.uuid();
                            oLinkVirtual.params.uiLstColor = oDstNodeItem.uiLstColor;
                            oLinkVirtual.params.uiColor = oDstNodeItem.uiColor;
                            oLinkVirtual.params.uiFlowLink = oDstNodeItem.uiFlowLink;
                            oLinkVirtual.params.uiRealLine = oDstNodeItem.uiRealLine;
                            oLinkVirtual.params.uiAlpha = oDstNodeItem.uiAlpha;
                            _drawLinkDetail(oCanvasContext, iSlideWndZ, oLinkVirtual, dicImages);
                            arrVirtualLinks.push(oLinkVirtual);
                        }
                    }

                    //3.4
                    oLink.params.uiLabel = strLabel;
                    oLink.params.uiAttach = uiAttach;
                    if(bIsDstNodeExpand){
                        oLink.params.uiDirection = LINK_DIRECTION_UNSPECIFIED;
                    }
                    else{
                        oLink.params.uiDirection = strDirection;
                    }
                    _getLinkPos(oLink, oSrcNodeVirtual, oDstNodeVirtual);
                    oLink.params.uiLstColor = arrColor;
                    oLink.params.uiColor = strColor;
                    _drawLinkDetail(oCanvasContext, iSlideWndZ, oLink, dicImages);
                    oLink.params.uiDirection = strDirection;
                    oLinkVirtual = _deepClone4Link(oLink);
                    arrVirtualLinks.push(oLinkVirtual);
                    oLink.params.virtualLinks = arrVirtualLinks;

                }
                //4.other
                else{
                    _getLinkPos(oLink, oSrcNode, oDstNode);
                    _drawLinkDetail(oCanvasContext, iSlideWndZ, oLink, dicImages);
                }
            }
            //容错性判断
            else{
                oLink.params.uiHide = true;
            }
        };
        var _deepClone4Link = function(oLink){
            var oCopy = {
                name: undefined,
                params:{}
            };
            oCopy.name = oLink.name;
            for(var strKey in oLink.params){
                if(strKey != "virtualLinks"){
                    oCopy.params[strKey] = oLink.params[strKey];
                }
            }

            return oCopy;
        };

        var _drawLinkDetail = function(oCanvasContext, iSlideWndZ, oLink, dicImages){
            //1.设置链路选中阴影
            _drawLinkShadom(oCanvasContext, oLink);

            //2.设置链路方向(获取箭头的坐标,所以步骤提前)
            _drawLinkDirection(oCanvasContext, oLink);

            //3.设置link(颜色,粗细,虚实,流动)
            _drawLinkColorWithReal(oCanvasContext, oLink, iSlideWndZ);

            //4.设置链路label
            _drawLinkLabel(oCanvasContext, iSlideWndZ, oLink);

            //5.设置附属图标
            _drawLinkAttach(oCanvasContext, oLink, dicImages);
        };

        //endregion

        //region _getLinkPos

        var _getLinkPos = function(oLink, oSrcNode, oDstNode){
            //1.自环线
            if(oSrcNode.name == oDstNode.name){
                //_getLoopBackLinkPos(oLink, oSrcNode, oDstNode);
            }
            else{
                //2.1.编号为1的link坐标
                if(1 == oLink.params.src_dst_id){
                    _getNormalLinkPos(oLink, oSrcNode, oDstNode);
                }
                //2.1.编号为奇数的link坐标
                else if(1 == oLink.params.src_dst_id % 2){
                    _getOddLinkPos(oLink, oSrcNode, oDstNode);
                }
                //2.1.编号为偶数的link坐标
                else if(0 == oLink.params.src_dst_id % 2){
                    _getEvenLinkPos(oLink, oSrcNode, oDstNode);
                }
            }
        };

        var _getLoopBackLinkPos = function(oLink, oSrcNode, oDstNode){
            var iSrcCirclePointX = oSrcNode.params.uiPosX;
            var iSrcCirclePointY = oSrcNode.params.uiPosY;
            var iRadius = oLink.params.src_dst_id * LINK_LOOP_BACK_RADIUS;
            var iStartAngle = Math.PI / 2;
            var iEndAngle = Math.PI * 2;
            oLink.params.uiCirclePointX = iSrcCirclePointX;
            oLink.params.uiCirclePointY = iSrcCirclePointY;
            oLink.params.redius = iRadius;
            oLink.params.loopBack = true;
            oLink.params.startAngle = iStartAngle;
            oLink.params.endAngle = iEndAngle;

        };

        var _getNormalLinkPos = function(oLink, oSrcNode, oDstNode){
            //1.得到源节点和宿结点的圆心坐标,半径
            var iSrcCircleRadiusW = oSrcNode.params.uiImgWCur / 2;
            var iSrcCircleRadiusH = oSrcNode.params.uiImgHCur / 2;
            var iSrcCircleCenterPointX = oSrcNode.params.uiPosX + iSrcCircleRadiusW;
            var iSrcCircleCenterPointY = oSrcNode.params.uiPosY + iSrcCircleRadiusH;
            var iDstCircleRadiusW = oDstNode.params.uiImgWCur / 2;
            var iDstCircleRadiusH = oDstNode.params.uiImgHCur / 2;
            var iDstCircleCenterPointX = oDstNode.params.uiPosX + iDstCircleRadiusW;
            var iDstCircleCenterPointY = oDstNode.params.uiPosY + iDstCircleRadiusH;

            //2.求出余弦值
            var dx = iDstCircleCenterPointX - iSrcCircleCenterPointX;
            var dy = iDstCircleCenterPointY - iSrcCircleCenterPointY;
            var iLength = Math.sqrt(dx * dx + dy * dy);
            if(0 === iLength){
                iLength = 1;
            }
            var cos_x = (iDstCircleCenterPointX - iSrcCircleCenterPointX) / iLength;
            var sin_x = (iDstCircleCenterPointY -iSrcCircleCenterPointY) / iLength;

            //3.算出正常线的坐标
            oLink.params.uiSrcPoint1X = iSrcCircleCenterPointX + iSrcCircleRadiusW * cos_x;
            oLink.params.uiSrcPoint1Y = iSrcCircleCenterPointY + iSrcCircleRadiusH * sin_x;
            oLink.params.uiDstPoint1X = iDstCircleCenterPointX + iDstCircleRadiusW * cos_x;
            oLink.params.uiDstPoint1Y = iDstCircleCenterPointY + iDstCircleRadiusH * sin_x;
            oLink.params.uiSrcPoint2X = oLink.params.uiSrcPoint1X;
            oLink.params.uiSrcPoint2Y = oLink.params.uiSrcPoint1Y;
            oLink.params.uiDstPoint2X = oLink.params.uiDstPoint1X;
            oLink.params.uiDstPoint2Y = oLink.params.uiDstPoint1Y;

        };

        var _getOddLinkPos = function(oLink, oSrcNode, oDstNode){
            LINK_GAP = oDstNode.params.uiImgWCur / 2;

            //1.得到源节点和宿结点的圆心坐标,半径
            var iSrcCircleRadiusW = oSrcNode.params.uiImgWCur / 2;
            var iSrcCircleRadiusH = oSrcNode.params.uiImgHCur / 2;
            var iSrcCircleCenterPointX = oSrcNode.params.uiPosX + iSrcCircleRadiusW;
            var iSrcCircleCenterPointY = oSrcNode.params.uiPosY + iSrcCircleRadiusH;
            var iDstCircleRadiusW = oDstNode.params.uiImgWCur / 2;
            var iDstCircleRadiusH = oDstNode.params.uiImgHCur / 2;
            var iDstCircleCenterPointX = oDstNode.params.uiPosX + iDstCircleRadiusW;
            var iDstCircleCenterPointY = oDstNode.params.uiPosY + iDstCircleRadiusH;

            //2.求出余弦值
            var dx = iDstCircleCenterPointX - iSrcCircleCenterPointX;
            var dy = iDstCircleCenterPointY - iSrcCircleCenterPointY;
            var iLength = Math.sqrt(dx * dx + dy * dy);
            if(0 === iLength){
                iLength = 1;
            }
            var cos_x = (iDstCircleCenterPointX - iSrcCircleCenterPointX) / iLength;
            var sin_x = (iDstCircleCenterPointY -iSrcCircleCenterPointY) / iLength;


            //3. 得到iSrcNodePointX/iSrcNormalPointY/iDstNormalPointX/iDstNormalPointY
            var iSrcNormalPointX = iSrcCircleCenterPointX + iSrcCircleRadiusW * cos_x;
            var iSrcNormalPointY = iSrcCircleCenterPointY + iSrcCircleRadiusH * sin_x;
            var iDstNormalPointX = iDstCircleCenterPointX - iDstCircleRadiusW * cos_x;
            var iDstNormalPointY = iDstCircleCenterPointY - iDstCircleRadiusH * sin_x;

            //4. 根据不同斜率,求出link的坐标
            //4.1.水平
            if(iSrcCircleCenterPointY == iDstCircleCenterPointY){
                oLink.params.uiSrcPoint1X = iSrcCircleCenterPointX;
                oLink.params.uiSrcPoint1Y = iSrcCircleCenterPointY + iSrcCircleRadiusH;
                oLink.params.uiDstPoint1X = iSrcNormalPointX;
                oLink.params.uiDstPoint1Y = iSrcNormalPointY + parseInt(oLink.params.src_dst_id / 2) * LINK_GAP;
                oLink.params.uiSrcPoint2X = iDstCircleCenterPointX;
                oLink.params.uiSrcPoint2Y = iDstCircleCenterPointY + iDstCircleRadiusH;
                oLink.params.uiDstPoint2X = iDstNormalPointX;
                oLink.params.uiDstPoint2Y = iDstNormalPointY + parseInt(oLink.params.src_dst_id / 2) * LINK_GAP;
            }
            //4.2.垂直
            else if(iSrcCircleCenterPointX == iDstCircleCenterPointX){
                oLink.params.uiSrcPoint1X = iSrcCircleCenterPointX - iSrcCircleRadiusW;
                oLink.params.uiSrcPoint1Y = iSrcCircleCenterPointY;
                oLink.params.uiDstPoint1X = iSrcNormalPointX - parseInt(oLink.params.src_dst_id / 2) * LINK_GAP;
                oLink.params.uiDstPoint1Y = iSrcNormalPointY;
                oLink.params.uiSrcPoint2X = iDstCircleCenterPointX - iDstCircleRadiusW;
                oLink.params.uiSrcPoint2Y = iDstCircleCenterPointY;
                oLink.params.uiDstPoint2X = iDstNormalPointX - parseInt(oLink.params.src_dst_id / 2) * LINK_GAP;
                oLink.params.uiDstPoint2Y = iDstNormalPointY;
            }
            //4.3.右下
            else if((iDstCircleCenterPointY - iSrcCircleCenterPointY)/(iDstCircleCenterPointX - iSrcCircleCenterPointX) > 0){
                sin_x = Math.abs(sin_x);
                cos_x = Math.abs(cos_x);
                oLink.params.uiSrcPoint1X = iSrcCircleCenterPointX - iSrcCircleRadiusW * sin_x;
                oLink.params.uiSrcPoint1Y = iSrcCircleCenterPointY + iSrcCircleRadiusH * cos_x;
                oLink.params.uiDstPoint1X = iSrcNormalPointX - LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * sin_x;
                oLink.params.uiDstPoint1Y = iSrcNormalPointY + LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * cos_x;
                oLink.params.uiSrcPoint2X = iDstCircleCenterPointX - iDstCircleRadiusW * sin_x;
                oLink.params.uiSrcPoint2Y = iDstCircleCenterPointY + iDstCircleRadiusH * cos_x;
                oLink.params.uiDstPoint2X = iDstNormalPointX - LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * sin_x;
                oLink.params.uiDstPoint2Y = iDstNormalPointY + LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * cos_x;
            }
            //4.4.左上
            else{
                sin_x = Math.abs(sin_x);
                cos_x = Math.abs(cos_x);
                oLink.params.uiSrcPoint1X = iSrcCircleCenterPointX + iSrcCircleRadiusW * sin_x;
                oLink.params.uiSrcPoint1Y = iSrcCircleCenterPointY + iSrcCircleRadiusH * cos_x;
                oLink.params.uiDstPoint1X = iSrcNormalPointX + LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * sin_x;
                oLink.params.uiDstPoint1Y = iSrcNormalPointY + LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * cos_x;
                oLink.params.uiSrcPoint2X = iDstCircleCenterPointX + iDstCircleRadiusW * sin_x;
                oLink.params.uiSrcPoint2Y = iDstCircleCenterPointY + iDstCircleRadiusH * cos_x;
                oLink.params.uiDstPoint2X = iDstNormalPointX + LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * sin_x;
                oLink.params.uiDstPoint2Y = iDstNormalPointY + LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * cos_x;
            }

        };
        var _getEvenLinkPos = function(oLink, oSrcNode, oDstNode){
            LINK_GAP = oDstNode.params.uiImgWCur / 2;

            //1.得到源节点和宿结点的圆心坐标,半径
            var iSrcCircleRadiusW = oSrcNode.params.uiImgWCur / 2;
            var iSrcCircleRadiusH = oSrcNode.params.uiImgHCur / 2;
            var iSrcCircleCenterPointX = oSrcNode.params.uiPosX + iSrcCircleRadiusW;
            var iSrcCircleCenterPointY = oSrcNode.params.uiPosY + iSrcCircleRadiusH;
            var iDstCircleRadiusW = oDstNode.params.uiImgWCur / 2;
            var iDstCircleRadiusH = oDstNode.params.uiImgHCur / 2;
            var iDstCircleCenterPointX = oDstNode.params.uiPosX + iDstCircleRadiusW;
            var iDstCircleCenterPointY = oDstNode.params.uiPosY + iDstCircleRadiusH;

            //2.求出余弦值
            var dx = iDstCircleCenterPointX - iSrcCircleCenterPointX;
            var dy = iDstCircleCenterPointY - iSrcCircleCenterPointY;
            var iLength = Math.sqrt(dx * dx + dy * dy);
            if(0 === iLength){
                iLength = 1;
            }
            var cos_x = (iDstCircleCenterPointX - iSrcCircleCenterPointX) / iLength;
            var sin_x = (iDstCircleCenterPointY -iSrcCircleCenterPointY) / iLength;


            //3. 得到iSrcNodePointX/iSrcNormalPointY/iDstNormalPointX/iDstNormalPointY
            var iSrcNormalPointX = iSrcCircleCenterPointX + iSrcCircleRadiusW * cos_x;
            var iSrcNormalPointY = iSrcCircleCenterPointY + iSrcCircleRadiusH * sin_x;
            var iDstNormalPointX = iDstCircleCenterPointX - iDstCircleRadiusW * cos_x;
            var iDstNormalPointY = iDstCircleCenterPointY - iDstCircleRadiusH * sin_x;

            //4. 根据不同斜率,求出link的坐标
            //4.1.水平
            if(iSrcCircleCenterPointY == iDstCircleCenterPointY){
                oLink.params.uiSrcPoint1X = iSrcCircleCenterPointX;
                oLink.params.uiSrcPoint1Y = iSrcCircleCenterPointY - iSrcCircleRadiusH;
                oLink.params.uiDstPoint1X = iSrcNormalPointX;
                oLink.params.uiDstPoint1Y = iSrcNormalPointY - parseInt(oLink.params.src_dst_id / 2) * LINK_GAP;
                oLink.params.uiSrcPoint2X = iDstCircleCenterPointX;
                oLink.params.uiSrcPoint2Y = iDstCircleCenterPointY - iDstCircleRadiusH;
                oLink.params.uiDstPoint2X = iDstNormalPointX;
                oLink.params.uiDstPoint2Y = iDstNormalPointY - parseInt(oLink.params.src_dst_id / 2) * LINK_GAP;
            }
            //4.2.垂直
            else if(iSrcCircleCenterPointX == iDstCircleCenterPointX){
                oLink.params.uiSrcPoint1X = iSrcCircleCenterPointX + iSrcCircleRadiusW;
                oLink.params.uiSrcPoint1Y = iSrcCircleCenterPointY;
                oLink.params.uiDstPoint1X = iSrcNormalPointX + parseInt(oLink.params.src_dst_id / 2) * LINK_GAP;
                oLink.params.uiDstPoint1Y = iSrcNormalPointY;
                oLink.params.uiSrcPoint2X = iDstCircleCenterPointX + iDstCircleRadiusW;
                oLink.params.uiSrcPoint2Y = iDstCircleCenterPointY;
                oLink.params.uiDstPoint2X = iDstNormalPointX + parseInt(oLink.params.src_dst_id / 2) * LINK_GAP;
                oLink.params.uiDstPoint2Y = iDstNormalPointY;
            }
            //4.3.右下
            else if((iDstCircleCenterPointY - iSrcCircleCenterPointY)/(iDstCircleCenterPointX - iSrcCircleCenterPointX) > 0){
                sin_x = Math.abs(sin_x);
                cos_x = Math.abs(cos_x);
                oLink.params.uiSrcPoint1X = iSrcCircleCenterPointX + iSrcCircleRadiusW * sin_x;
                oLink.params.uiSrcPoint1Y = iSrcCircleCenterPointY - iSrcCircleRadiusH * cos_x;
                oLink.params.uiDstPoint1X = iSrcNormalPointX + LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * sin_x;
                oLink.params.uiDstPoint1Y = iSrcNormalPointY - LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * cos_x;
                oLink.params.uiSrcPoint2X = iDstCircleCenterPointX + iDstCircleRadiusW * sin_x;
                oLink.params.uiSrcPoint2Y = iDstCircleCenterPointY - iDstCircleRadiusH * cos_x;
                oLink.params.uiDstPoint2X = iDstNormalPointX + LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * sin_x;
                oLink.params.uiDstPoint2Y = iDstNormalPointY - LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * cos_x;
            }
            //4.4.左上
            else{
                sin_x = Math.abs(sin_x);
                cos_x = Math.abs(cos_x);
                oLink.params.uiSrcPoint1X = iSrcCircleCenterPointX - iSrcCircleRadiusW * sin_x;
                oLink.params.uiSrcPoint1Y = iSrcCircleCenterPointY - iSrcCircleRadiusH * cos_x;
                oLink.params.uiDstPoint1X = iSrcNormalPointX - LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * sin_x;
                oLink.params.uiDstPoint1Y = iSrcNormalPointY - LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * cos_x;
                oLink.params.uiSrcPoint2X = iDstCircleCenterPointX - iDstCircleRadiusW * sin_x;
                oLink.params.uiSrcPoint2Y = iDstCircleCenterPointY - iDstCircleRadiusH * cos_x;
                oLink.params.uiDstPoint2X = iDstNormalPointX - LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * sin_x;
                oLink.params.uiDstPoint2Y = iDstNormalPointY - LINK_GAP * parseInt(oLink.params.src_dst_id / 2) * cos_x;
            }

        };

        //endregion

        //region _drawLinkShadow

        /**
         * 绘制link选中时的阴影
         * @param oCanvasContext
         * @param oLink
         * @private
         */
        var _drawLinkShadom = function(oCanvasContext, oLink){
            if(oLink.params.isSelect){
                var iLinkFromX = oLink.params.uiSrcPoint1X;
                var iLinkFromY = oLink.params.uiSrcPoint1Y;
                var iInflectionFromX = oLink.params.uiSrcPoint2X;
                var iInflectionFromY = oLink.params.uiSrcPoint2Y;
                var iInflectionToX = oLink.params.uiDstPoint2X;
                var iInflectionToY = oLink.params.uiDstPoint2Y;
                var iLinkToX = oLink.params.uiDstPoint1X;
                var iLinkToY = oLink.params.uiDstPoint1Y;
                var iLinkWidth = 1.5;
                if(oLink.params.uiWidth){
                    iLinkWidth = oLink.parmas.uiWidth;
                }
                oLink.params.uiWidth = iLinkWidth;
                oLink.params.uiWidth = parseFloat(oLink.params.uiWidth) + 2;
                oLink.params.uiWidthSrc = parseFloat(oLink.params.uiWidthSrc) + 2;
                oCanvasContext.beginPath();
                _penWidth(oLink, oCanvasContext);
                oCanvasContext.closePath();
                oCanvasContext.strokeStyle = LINK_SHOADOW_COLOR;
                oCanvasContext.moveTo(iLinkFromX, iLinkFromY);
                oCanvasContext.lineTo(iInflectionFromX, iInflectionFromY);
                oCanvasContext.lineTo(iInflectionToX, iInflectionToY);
                oCanvasContext.lineTo(iLinkToX, iLinkToY);
                oCanvasContext.stroke();
                oLink.params.uiWidth = oLink.params.uiWidth - 2;
                oLink.params.uiWidthSrc = oLink.params.uiWidthSrc - 2;
            }
        };

        //endregion

        //region _drawLinkColorWithReal

        var _drawLinkColorWithReal = function(oCanvasContext, oLink, iSlideWndZ){
            var iLinkFromX = oLink.params.uiSrcPoint1X;
            var iLinkFromY = oLink.params.uiSrcPoint1Y;
            var iInflectionFromX = oLink.params.uiSrcPoint2X;
            var iInflectionFromY = oLink.params.uiSrcPoint2Y;
            var iInflectionToX = oLink.params.uiDstPoint2X;
            var iInflectionToY = oLink.params.uiDstPoint2Y;
            var iLinkToX = oLink.params.uiDstPoint1X;
            var iLinkToY = oLink.params.uiDstPoint1Y;

            var iMiddleX = (iInflectionFromX + iInflectionToX) /2;
            var iMiddleY = (iInflectionFromY + iInflectionToY) / 2;

            var dx = iLinkToX - iLinkFromX;
            var dy = iLinkToY - iLinkFromY;
            var iLength = Math.sqrt(dx * dx + dy * dy);
            if(0 == iLength){
                iLength = 1;
            }
            var sin_x = (iLinkToY - iLinkFromY) / iLength;
            var cos_x = (iLinkToX - iLinkFromX) / iLength;

            _penWidth(oLink, oCanvasContext);

            _penAlpha(oLink, oCanvasContext);
            if(undefined === oLink.params.uiColor && undefined === oLink.params.uiFromColor && undefined === oLink.params.uiToColor){
                oLink.params.uiColor = "#878787";
            }
            var iStep_Length_X;
            var iStep_Length_Y;
            var SUM_STEP;
            var i;
            var j;
            var iMoveToX;
            var iMoveToY;
            var iMoveToNextX;
            var iMoveToNextY;
            var arrPointsToDraw;
            var arrPointsToGap;
            var oPointToDraw;
            var oPointToGap;

            //4.多色展示
            if(oLink.params.uiLstColor){
                //4.1.从起点画到折点
                _drawRealLineByColorandPos(oCanvasContext, oLink.params.uiLstColor[0], iLinkFromX, iLinkFromY, iInflectionFromX, iInflectionFromY);

                //4.2.从折点画到折点
                dx = iInflectionToX - iInflectionFromX;
                dy = iInflectionToY - iInflectionFromY;
                iLength = Math.sqrt(dx * dx + dy * dy);
                iStep_Length_X = REAL_STEP * con_x;
                iStep_Length_Y = REAL_STEP * sin_x;
                var iStep_Length_X4First = LINK_PATH_REAL_STEP * cos_x;
                var iStep_Length_Y4First = LINK_PATH_REAL_STEP * sin_x;
                var iColorLength = oLink.params.uiLstColor.length;
                var iLineItemLength = LINK_PATH_REAL_STEP * 1 + (iColorLength - 1) * REAL_STEP;
                SUM_STEP = parseInt(iLength / iLineItemLength);
                var mapArrPointsToDraw = {};
                for( i = 0; i < oLink.params.uiLstColor.length; i++){
                    var strColor = oLink.params.uiLstColor[i];
                    arrPointsToDraw = [];
                    for( j = 0; j < SUM_STEP; j++){
                        if(i <= 1){
                            iMoveToX = iInflectionFromX + (iLineItemLength * j + i * LINK_PATH_REAL_STEP) * cos_x;
                            iMoveToY = iInflectionFromY + (iLineItemLength * j + i * LINK_PATH_REAL_STEP) * sin_x;
                            if(i == 0 && iLineItemLength * j + i * LINK_PATH_REAL_STEP >= iLength - LINK_PATH_REAL_STEP){
                                iMoveToX = iInflectionFromX + (iLength - LINK_PATH_REAL_STEP) * cos_x;
                                iMoveToY = iInflectionFromY + (iLength - LINK_PATH_REAL_STEP) * sin_x;
                            }
                            else if(i == 1 && iLineItemLength * j + i * LINK_PATH_REAL_STEP >= iLength - REAL_STEP){
                                iMoveToX = iInflectionFromX + (iLength - REAL_STEP) * cos_x;
                                iMoveToY = iInflectionFromY + (iLength - REAL_STEP) * sin_x;
                            }
                        }
                        else{
                            iMoveToX = iInflectionFromX + (iLineItemLength * j + LINK_PATH_REAL_STEP + (i - 1) * REAL_STEP) * cos_x;
                            iMoveToY = iInflectionFromY + (iLineItemLength * j + LINK_PATH_REAL_STEP + (i - 1) * REAL_STEP) * sin_x;
                            if(iLineItemLength * j + LINK_PATH_REAL_STEP + (i - 1) * REAL_STEP >= iLength - REAL_STEP){
                                iMoveToX = iInflectionFromX + (iLength - REAL_STEP) * cos_x;
                                iMoveToY = iInflectionFromY + (iLength - REAL_STEP) * sin_x;
                            }
                        }

                        oPointToDraw = {
                            srcPointX: iMoveToX,
                            srcPointY: iMoveToY
                        };
                        if(i === 0){
                            oPointToDraw.dstPointX = iMoveToX + iStep_Length_X4First;
                            oPointToDraw.dstPointY = iMoveToY + iStep_Length_Y4First;
                        }
                        else{
                            oPointToDraw.dstPointX = iMoveToX + iStep_Length_X;
                            oPointToDraw.dstPointY = iMoveToY + iStep_Length_Y;
                        }
                        arrPointsToDraw.push(oPointToDraw);

                        for(var k = 0; k < arrPointsToDraw.length; k++){
                            var oPointsToDraw = arrPointsToDraw[k];
                            _drawRealLineByColorandPos(oCanvasContext, strColor, oPointsToDraw.srcPointX, oPointsToDraw.srcPointY, oPointsToDraw.dstPointX, oPointsToDraw.dstPointY);
                        }

                        if(oLink.params.uiFlowLink){
                            mapArrPointsToDraw[i] = arrPointsToDraw;
                            var oInterval4FlowLink = _drawLinkColorWithRealSetInterval(oCanvasContext, oLink, mapArrPointsToDraw);
                            m_arrInterval4FlowLink.push(oInterval4FlowLink);
                        }
                    }
                }

                //4.1.从折点画到终点
                _drawRealLineByColorandPos(oCanvasContext, oLink.params.uiLstColor[0], iInflectionToX, iInflectionToY, iLinkToX, iLinkToY);
            }

            //5.虚线
            else if(false === oLink.params.uiRealLine){
                dx = iInflectionToX - iInflectionFromX;
                dy = iInflectionToY - iInflectionFromY;
                iLength = Math.sqrt(dx * dx + dy * dy);
                iStep_Length_X = REAL_STEP * cos_x;
                iStep_Length_Y = REAL_STEP * sin_x;
                //5.1.双色展示
                if(oLink.params.uiFromColor && oLink.params.uiToColor){
                    //5.1.从起点画到折点
                    _drawDashLineByColorAndPos(oCanvasContext, oLink.params.uiFromColor, iLinkFromX, iLinkFromY, iInflectionFromX, iInflectionFromY);

                    //5.2.从折点画到中间点
                    _drawDashLineByColorAndPos(oCanvasContext, oLink.params.uiFromColor, iInflectionFromX, iInflectionFromY, iMiddleX, iMiddleY);

                    //5.3.从中间点画到折点
                    _drawDashLineByColorAndPos(oCanvasContext, oLink.params.uiToColor, iMiddleX, iMiddleY, iInflectionToX, iInflectionToY);

                    //5.4.从折点画到终点
                    _drawDashLineByColorAndPos(oCanvasContext, oLink.params.uiToColor, iInflectionToX, iInflectionToY, iLinkToX, iLinkToY);
                }
                //5.2.单色展示
                else{
                    //5.1.从起点画到折点
                    _drawDashLineByColorAndPos(oCanvasContext, oLink.params.uiColor, iLinkFromX, iLinkFromY, iInflectionFromX, iInflectionFromY);

                    //5.2.从折点画到折点
                    _drawDashLineByColorAndPos(oCanvasContext, oLink.params.uiColor, iInflectionFromX, iInflectionFromY, iInflectionToX, iInflectionToY);

                    //TODO:绘制流动线
                    if(oLink.params.uiFlowLink){
                        dx = iInflectionToX - iInflectionFromX;
                        dy = iInflectionToY - iInflectionFromY;
                        iLength = Math.sqrt(dx *dx + dy * dy);
                        iStep_Length_X = REAL_STEP * cos_x;
                        iStep_Length_Y = REAL_STEP * sin_x;
                        arrPointsToDraw = [];
                        arrPointsToGap = [];
                        SUM_STEP = parseInt(iLength / (REAL_STEP + REAL_STEP_GAP));
                        for(i = 0; i < SUM_STEP; i++){
                            iMoveToX = iInflectionFromX + (REAL_STEP + REAL_STEP_GAP) * i * cos_x;
                            iMoveToY = iInflectionFromY + (REAL_STEP + REAL_STEP_GAP) * i * sin_x;
                            iMoveToNextX = 0;
                            iMoveToNextY = 0;
                            if(i == SUM_STEP - 1){
                                iMoveToNextX = iInflectionFromX + iLength * cos_x;
                                iMoveToNextY = iInflectionFromY + iLength * sin_x;
                            }
                            else{
                                iMoveToNextX = iInflectionFromX + (REAL_STEP + REAL_STEP_GAP) * ( i + 1) * cos_x;
                                iMoveToNextY = iInflectionFromY + (REAL_STEP + REAL_STEP_GAP) * ( i + 1) * sin_x;
                            }
                            oPointToDraw = {
                                srcPointX: iMoveToX,
                                srcPointY: iMoveToY,
                                dstPointX: iMoveToX + iStep_Length_X,
                                dstPointY: iMoveToY + iStep_Length_Y
                            };
                            oPointToGap = {
                                srcPointX: iMoveToX + iStep_Length_X,
                                srcPointY: iMoveToY + iStep_Length_Y,
                                dstPointX: iMoveToNextX,
                                dstPointY: iMoveToNextY
                            };
                            arrPointsToDraw.push(oPointToDraw);
                            arrPointsToGap.push(oPointToGap);
                        }

                        //绘制流动线
                        oLink.params.uiPointsToDraw = arrPointsToDraw;
                        oLink.params.uiPointsToGap = arrPointsToGap;
                        _drawFlowLink4OnlyColor(oLink, oCanvasContext);
                    }

                    //5.4.从折点画到终点
                    _drawDashLineByColorAndPos(oCanvasContext, oLink.params.uiColor, iInflectionToX, iInflectionToY, iLinkToX, iLinkToY);
                }
            }

            //6.波浪线
            else if(true === oLink.params.uiWaveLine){
                //6.1.从起点画到折点
                _drawRealLineByColorAndPos(oCanvasContext, oLink.params.uiColor, iLinkFromX, iLinkFromY, iInflectionFromX, iInflectionFromY);

                //6.2.从折点绘制到折点
                dx = iInflectionToX - iInflectionFromX;
                dy = iInflectionToY - iInflectionFromY;
                iLength = Math.sqrt(dx *dx + dy * dy);
                iStep_Length_X = REAL_STEP * cos_x;
                iStep_Length_Y = REAL_STEP * sin_x;
                var DEFAULT_WIDTH_LENGTH_GAP = 4;
                var DEFAULT_WAVE_LENGTH_GAP = 2;
                SUM_STEP = parseInt(iLength / DEFAULT_WIDTH_LENGTH_GAP);
                for(i = 0; i < SUM_STEP; i++){
                    iMoveToX = iInflectionFromX + (DEFAULT_WIDTH_LENGTH_GAP * j) * cos_x;
                    iMoveToY = iInflectionFromY + (DEFAULT_WIDTH_LENGTH_GAP * j) * sin_x;
                    iMoveToNextX = iInflectionFromX + (DEFAULT_WIDTH_LENGTH_GAP * (j + 1)) * cos_x;
                    iMoveToNextY = iInflectionFromY + (DEFAULT_WIDTH_LENGTH_GAP * (j + 1)) * sin_x;
                    var iMiddleWaveX = (iMoveToX + iMoveToNextX) / 2;
                    var iMiddleWaveY = (iMoveToY + iMoveToNextY) / 2;
                    var iControllerX;
                    var iControllerY;
                    if(j % 2 === 0){
                        iControllerX = iMiddleWaveX + DEFAULT_WAVE_LENGTH_GAP;
                        iControllerY = iMiddleWaveY - DEFAULT_WAVE_LENGTH_GAP;
                    }
                    else{
                        iControllerX = iMiddleWaveX + DEFAULT_WAVE_LENGTH_GAP;
                        iControllerY = iMiddleWaveY + DEFAULT_WAVE_LENGTH_GAP;
                    }
                    oPointToDraw = {
                        srcPointX: iMoveToX,
                        srcPointY: iMoveToY,
                        dstPointX: iMoveToX + iStep_Length_X,
                        dstPointY: iMoveToY + iStep_Length_Y,
                        controllerX: iControllerX,
                        controllerY: iControllerY
                    };
                    if(j == 1){
                        oPointToDraw.dstPointX = iInflectionToX;
                        oPointsToDraw.dstPointY = iInflectionToY;
                    }
                    _drawWaveLine(oLink, oPointsToDraw, oCanvasContext);
                }


                //6.3.从折点画到终点
                _drawRealLineByColorAndPos(oCanvasContext, oLink.params.uiColor, iLinkFromX, iLinkFromY, iInflectionFromX, iInflectionFromY);
            }

            //7.实线
            else{
                if(oLink.params.uiFromColor && oLink.params.uiToColor){
                    //7.1.从起点画到折点
                    _drawRealLineByColorAndPos(oCanvasContext, oLink.params.uiFromColor, iLinkFromX, iLinkFromY, iInflectionFromX, iInflectionFromY);

                    //5.2.从折点画到中间点
                    _drawRealLineByColorAndPos(oCanvasContext, oLink.params.uiFromColor, iInflectionFromX, iInflectionFromY, iMiddleX, iMiddleY);

                    //5.3.从中间点画到折点
                    _drawRealLineByColorAndPos(oCanvasContext, oLink.params.uiToColor, iMiddleX, iMiddleY, iInflectionToX, iInflectionToY);

                    //5.4.从折点画到终点
                    _drawRealLineByColorAndPos(oCanvasContext, oLink.params.uiToColor, iInflectionToX, iInflectionToY, iLinkToX, iLinkToY);
                }
                else{
                    //5.1.从起点画到折点
                    _drawRealLineByColorAndPos(oCanvasContext, oLink.params.uiColor, iLinkFromX, iLinkFromY, iInflectionFromX, iInflectionFromY);

                    //5.2.从折点画到折点点
                    _drawRealLineByColorAndPos(oCanvasContext, oLink.params.uiColor, iInflectionFromX, iInflectionFromY, iInflectionToX, iInflectionToY);

                    if(oLink.params.uiFlowLink){
                        dx = iInflectionToX - iInflectionFromX;
                        dy = iInflectionToY - iInflectionFromY;
                        iLength = Math.sqrt(dx *dx + dy * dy);
                        iStep_Length_X = REAL_STEP * cos_x;
                        iStep_Length_Y = REAL_STEP * sin_x;
                        arrPointsToDraw = [];
                        arrPointsToGap = [];
                        SUM_STEP = parseInt(iLength / (REAL_STEP + REAL_STEP_GAP));
                        for(i = 0; i < SUM_STEP; i++){
                            iMoveToX = iInflectionFromX + (REAL_STEP + REAL_STEP_GAP) * i * cos_x;
                            iMoveToY = iInflectionFromY + (REAL_STEP + REAL_STEP_GAP) * i * sin_x;
                            iMoveToNextX = 0;
                            iMoveToNextY = 0;
                            if(i == SUM_STEP - 1){
                                iMoveToNextX = iInflectionFromX + iLength * cos_x;
                                iMoveToNextY = iInflectionFromY + iLength * sin_x;
                            }
                            else{
                                iMoveToNextX = iInflectionFromX + (REAL_STEP + REAL_STEP_GAP) * ( i + 1) * cos_x;
                                iMoveToNextY = iInflectionFromY + (REAL_STEP + REAL_STEP_GAP) * ( i + 1) * sin_x;
                            }
                            oPointToDraw = {
                                srcPointX: iMoveToX,
                                srcPointY: iMoveToY,
                                dstPointX: iMoveToX + iStep_Length_X,
                                dstPointY: iMoveToY + iStep_Length_Y
                            };
                            oPointToGap = {
                                srcPointX: iMoveToX + iStep_Length_X,
                                srcPointY: iMoveToY + iStep_Length_Y,
                                dstPointX: iMoveToNextX,
                                dstPointY: iMoveToNextY
                            };
                            arrPointsToDraw.push(oPointToDraw);
                            arrPointsToGap.push(oPointToGap);
                        }

                        //绘制流动线
                        oLink.params.uiPointsToDraw = arrPointsToDraw;
                        oLink.params.uiPointsToGap = arrPointsToGap;
                        _drawFlowLink4OnlyColor(oLink, oCanvasContext);
                    }

                    //5.4.从折点画到终点
                    _drawRealLineByColorAndPos(oCanvasContext, oLink.params.uiColor, iInflectionToX, iInflectionToY, iLinkToX, iLinkToY);
                }

            }

            //8.恢复透明度
            oCanvasContext.globalAlpha = 1.0;
        };

        var _drawFlowLink4OnlyColor = function(oLink, oCanvasContext){
            var iInflectionToX = oLink.params.uiDstPoint2X;
            var iInFlectionToY = oLink.params.uiDstPoint2Y;
            var iLinkToX = oLink.params.uiDstPoint1X;
            var iLinkToY = oLink.params.uiDstPoint1Y;
            var bFlowLinkFlag = true;
            var oInterval4FlowLink = setInterval(function(){
                oCanvasContext.beginPath();
                oCanvasContext.strokeStyle = FLOW_LINK_DEFAULT_BG_COLOR;
                _penWidth(oLink, oCanvasContext);
                oCanvasContext.moveTo(oLink.params.uiLinkDirectionSrcCrossX, oLink.params.uiLinkDirectionSrcCrossY);
                oCanvasContext.lineTo(oLink.params.uiLinkDirectionDstCrossX, oLink.params.uiLinkDirectionDstCrossY);
                oCanvasContext.closePath();
                oCanvasContext.stroke();
                if(bFlowLinkFlag){
                    oCanvasContext.beginPath();
                    oCanvasContext.strokeStyle = oLink.params.uiColor;
                    for(var i = 0; i < oLink.params.uiPointsToDraw.length; i++){
                        var oPointToDraw = oLink.params.uiPointsToDraw[i];
                        oCanvasContext.moveTo(oPointToDraw.srcPointX, oPointToDraw.srcPointY);
                        oCanvasContext.lineTo(oPointToDraw.dstPointX, oPointToDraw.dstPointY);
                    }
                    oCanvasContext.closePath();
                    oCanvasContext.stroke();
                    _drawRealLineByColorAndPos(oCanvasContext, oLink.params.uiColor, iInflectionToX, iInFlectionToY, iLinkToX, iLinkToY);
                    bFlowLinkFlag = false;
                }
                else{
                    oCanvasContext.beginPath();
                    oCanvasContext.strokeStyle = oLink.params.uiColor;
                    for(var j = 0; j < oLink.params.uiPointsToGap.length; j++){
                        var oPointToGap = oLink.params.uiPointsToGap[i];
                        oCanvasContext.moveTo(oPointToGap.srcPointX, oPointToGap.srcPointY);
                        oCanvasContext.lineTo(oPointToGap.dstPointX, oPointToGap.dstPointY);
                    }
                    oCanvasContext.closePath();
                    oCanvasContext.stroke();
                    _drawRealLineByColorAndPos(oCanvasContext, oLink.params.uiColor, iInflectionToX, iInFlectionToY, iLinkToX, iLinkToY);
                    bFlowLinkFlag = true;
                }
            }, 200);
            m_arrInterval4FlowLink.push(oInterval4FlowLink);
        };

        var _drawRealLineByColorAndPos = function(oCanvasContext, strColor, iSrcX, iSrcY, iDstX, iDstY){
            oCanvasContext.beginPath();

            oCanvasContext.strokeStyle = strColor;
            oCanvasContext.moveTo(iSrcX, iSrcY);
            oCanvasContext.lineTo(iDstX, iDstY);
            oCanvasContext.closePath();
            oCanvasContext.stroke();
        };

        var _drawDashLineByColorAndPos = function(oCanvasContext, strColor, iSrcX, iSrcY, iDstX, iDstY){
            oCanvasContext.setLineDash([REAL_STEP, REAL_STEP_GAP]);
            oCanvasContext.beginPath();

            oCanvasContext.strokeStyle = strColor;
            oCanvasContext.moveTo(iSrcX, iSrcY);
            oCanvasContext.lineTo(iDstX, iDstY);
            oCanvasContext.closePath();
            oCanvasContext.stroke();
            oCanvasContext.setLineDash([]);
        };

        var _penWidth = function(oLink, oCanvasContext, iSlideeWndZ){
            var iLinkWidth = 1.5;
            if(oLink.params.uiWidthSrc){
                iLinkWidth = parseFloat(oLink.params.uiWidthSrc);
            }
            else if(oLink.params.uiWidth){
                oLink.params.uiWidthSrc = oLink.params.uiWidth;
                iLinkWidth = parseFloat(oLink.params.uiWidthSrc);
            }
            else{
                oLink.params.uiWidthSrc = iLinkWidth;
            }

            if(iSlideeWndZ){
                if(iSlideeWndZ <= 1){
                    iLinkWidth = iSlideeWndZ * oLink.params.uiWidthSrc;
                }
                else{
                    iLinkWidth = 1;
                }
            }

            oCanvasContext.lineWidth = iLinkWidth;
            oLink.params.uiWidth = oLink.params.uiWidthSrc;
        };
        var _penalpha = function(oLink, oCanvasContext){
            var iAlpha = 1.0;
            if(oLink.params.uiAlpha){
                iAlpha = oLink.params.uiAlpha;
            }
            oCanvasContext.globalAlpha = iAlpha;
        };
        var _drawWaveLine = function(oLink, oPointToDraw, oCanvasContext){
            oCanvasContext.beginPath();
            oCanvasContext.moveTo(oPointToDraw.srcPointX, oPointToDraw.srcPointY);
            oCanvasContext.quadraticCurveTo(oPointToDraw.controllerX, oPointToDraw.controllerY, oPointToDraw.dstPointX, oPointToDraw.dstPointY);
            oCanvasContext.strokeStyle = oLink.params.uiColor;
            oCanvasContext.stroke();
        };

        var _drawLinkColorWidthRealSetInterval = function(oCanvasContext, oLink, mapArrPointsToDraw){
            var iIndex = 0;
            var oInterval4flowLink = setInterval(function(){
                oCanvasContext.beginPath();
                oCanvasContext.strokeStyle = FLOW_LINK_DEFAULT_BG_COLOR;
                _penWidth(oLink, oCanvasContext);
                oCanvasContext.moveTo(oLink.params.uiLinkDirectionSrcCrossX, oLink.params.uiLinkDirectionSrcCrossY);
                oCanvasContext.lineTo(oLink.params.uiLinkDirectionDstCrossX, oLink.params.uiLinkDirectionDstCrossY);
                oCanvasContext.closePath();
                oCanvasContext.stroke();
                for(var key in mapArrPointsToDraw){
                    var iColorIndex = (parseInt(key) + iIndex) % oLink.params.uiLstColor.length;
                    var strColor = oLink.params.uiLstColor[iColorIndex];
                    var arrPointsToDraw = mapArrPointsToDraw[key];
                    for(var k = 0; k < arrPointsToDraw.length; k++){
                        var oPointsToDraw = arrPointsToDraw[k];
                        _drawRealLineByColorAndPos(oCanvasContext, strColor, oPointsToDraw.srcPointX, oPointsToDraw.srcPointY, oPointsToDraw.dstPointX, oPointsToDraw.dstPointY);
                    }
                }
                iIndex++;
                if(iIndex > oLink.params.uiLstColor.length){
                    iIndex = 0;
                }

            }, 250);
            return oInterval4flowLink;
        };
        //endregion

        //region _drawLinkLabel

        /**
         * 绘制链路label
         * @param oCanvasContext
         * @param iSlideWndZ
         * @param oLink
         * @private
         */
        var _drawLinkLabel = function(oCanvasContext, iSlideWndZ, oLink){
            var iLinkFromX = oLink.params.uiSrcPoint2X;
            var iLinkFromY = oLink.params.uiSrcPoint2Y;
            var iLinkToX = oLink.params.uiDstPoint2X;
            var iLinkToY = oLink.params.uiDstPoint2Y;
            var iMiddleX = (iLinkFromX + iLinkToX) / 2;
            var iMiddleY = (iLinkFromY + iLinkToY) / 2;

            //设置link颜色,字体,透明度,位置
            var strLabelFont = "12px Arial";
            if(oLink.params.uiLabelFont){
                strLabelFont = oLink.params.uiLabelFont;
            }
            var strLabelColor = "#878787";
            if(oLink.params.uiLabelColor){
                strLabelColor = oLink.params.uiLabelColor;
            }
            var strUiLeftLabelColor = "#878787";
            if(oLink.params.uiLeftLabelColor){
                strUiLeftLabelColor = oLink.params.uiLeftLabelColor;
            }
            var strUiRightLabelColor = "#878787";
            if(oLink.params.uiRightLabelColor){
                strUiRightLabelColor = oLink.params.uiRightLabelColor;
            }

            var strLabelPos = "center";
            if(oLink.params.uiLabelPos){
                strLabelPos = oLink.params.uiLabelPos;
            }
            var iLabelAlpha = 1.0;
            if(oLink.params.uiLabelAlpha){
                iLabelAlpha = oLink.params.uiLabelAlpha;
            }
            var oLabelStyle = {
                FONT: strLabelFont,
                POS: strLabelPos,
                ALPHA: iLabelAlpha
            };

            _penWidth(oLink, oCanvasContext);

            var iLabelX;
            var iLabelY;
            var strLeftLabel = oLink.params.uiLeftLabel;
            if(strLeftLabel && "" != strLeftLabel){
                iLabelX = (iLinkFromX + iMiddleX) / 2;
                iLabelY = (iLinkFromY + iMiddleY) / 2;
                _drawLinkLabelByPos(oCanvasContext, strLeftLabel, iLabelX, iLabelY, oLabelStyle, oLink, LINK_LABEL_POS_LEFT, strUiLeftLabelColor, iSlideWndZ);
            }
            var strRightLabel = oLink.params.uiRightLabel;
            if(strRightLabel && "" != strRightLabel){
                iLabelX = (iLinkToX + iMiddleX) / 2;
                iLabelY = (iLinkToY + iMiddleY) / 2;
                _drawLinkLabelByPos(oCanvasContext, strLeftLabel, iLabelX, iLabelY, oLabelStyle, oLink, LINK_LABEL_POS_RIGHT, strUiRightLabelColor, iSlideWndZ);
            }
            var strLabel = oLink.params.uiLabel;
            if(strLabel && "" != strLabel){
                _drawLinkLabelByPos(oCanvasContext, strLeftLabel, iMiddleX, iMiddleY, oLabelStyle, oLink, LINK_LABEL_POS_CENTER, strLabelColor, iSlideWndZ);
            }
        };

        var _drawLinkLabelByPos = function(oCanvasContext, strLabel, iLabelX, iLabelY, oLabelStyle, oLink, strLabelPos, strLabelColor, iSlideWndZ){
            //1.set labelAlpha
            var iLabelAlpha = 1.0;
            if(oLabelStyle.ALPHA){
                iLabelAlpha = oLabelStyle.ALPHA;
            }
            oCanvasContext.globalAlpha = iLabelAlpha;
            oCanvasContext.font = oLabelStyle.FONT;
            oCanvasContext.fillStyle = strLabelColor;

            //2.
            var LINK_LABEL_GAP = 5;
            var LABEL_TEXT_OFFSET = 8;
            var iLabelLength = oCanvasContext.measureText(strLabel).width;
            var iStartX = 0;
            var iStartY = 0;
            if(LINK_LABEL_TOP == oLabelStyle.POS){
                iStartX = iLabelX - iLabelLength / 2;
                iStartY = iLabelY - LINK_LABEL_GAP;
            }
            else if(LINK_LABEL_CENTER == oLabelStyle.POS){
                iStartX = iLabelX - iLabelLength / 2;
                iStartY = iLabelY + LABEL_TEXT_OFFSET / 2;
            }
            else if(LINK_LABEL_BOTTOM == oLabelStyle.POS){
                iStartX = iLabelX - iLabelLength / 2;
                iStartY = iLabelY + LINK_LABEL_GAP + LABEL_TEXT_OFFSET;
            }
            oCanvasContext.save();
            var iZoomRate = iSlideWndZ > 1? 1: iSlideWndZ;
            oCanvasContext.setTransform(iZoomRate, 0, 0, iZoomRate, 0, 0);
            oCanvasContext.fillText(strLabel, iStartX / iZoomRate, iStartY / iZoomRate);


            //3.save
            if(strLabelPos == LINK_LABEL_POS_LEFT){
                oLink.params.uiLeftLabelPosX = iStartX;
                oLink.params.uiLeftLabelPosY = iStartY - 8;
                oLink.params.uiLeftLabelWidth = iLabelLength;
                oLink.params.uiLeftLabelHeight = 8;
                oLink.params.uiLeftLabelColor = strLabelColor;
            }
            else if(strLabelPos == LINK_LABEL_POS_RIGHT){
                oLink.params.uiLeftLabelPosX = iStartX;
                oLink.params.uiLeftLabelPosY = iStartY - 8;
                oLink.params.uiLeftLabelWidth = iLabelLength;
                oLink.params.uiLeftLabelHeight = 8;
                oLink.params.uiLeftLabelColor = strLabelColor;
            }
            else{
                oLink.params.uiLeftLabelPosX = iStartX;
                oLink.params.uiLeftLabelPosY = iStartY - 8;
                oLink.params.uiLeftLabelWidth = iLabelLength;
                oLink.params.uiLeftLabelHeight = 8;
                oLink.params.uiLeftLabelColor = strLabelColor;
            }

            //4.reset
            oCanvasContext.globalAlpha = 1.0;
        };

        //endregion

        //region _drawDirection

        /**
         * 绘制方向
         * @param oCanvasContext
         * @param oLink
         * @private
         */
        var _drawLinkDirection = function(oCanvasContext, oLink){
            if(!oLink.params.uiDirection || LINK_DIRECTION_UNIDIRECTIONAL == oLink.params.uiDirection){
                oLink.params.uiLinkDirectionSrcCrossX = oLink.params.uiSrcPoint2X;
                oLink.params.uiLinkDirectionSrcCrossY = oLink.params.uiSrcPoint2Y;
                oLink.params.uiLinkDirectionDstCrossX = oLink.params.uiDstPoint2X;
                oLink.params.uiLinkDirectionDstCrossY = oLink.params.uiDstPoint2Y;
                return;
            }

            //1.get Params
            var iSrcPoint1X = oLink.params.uiSrcPoint1X;
            var iSrcPoint1Y = oLink.params.uiSrcPoint1Y;
            var iSrcPoint2X = oLink.params.uiSrcPoint2X;
            var iSrcPoint2Y = oLink.params.uiSrcPoint2Y;
            var iDstPoint1X = oLink.params.uiDstPoint1X;
            var iDstPoint1Y = oLink.params.uiDstPoint1Y;
            var iDstPoint2X = oLink.params.uiDstPoint2X;
            var iDstPoint2Y = oLink.params.uiDstPoint2Y;
            var iSrcSinX;
            var iSrcCosX;
            var iDstSinX;
            var iDstCosX;
            var iSrcDx;
            var iSrcDy;
            var iDstDx;
            var iDstDy;
            var iSrcLength;
            var iDstLength;
            if(1 == oLink.params.src_dst_id){
                iSrcDx = iDstPoint1X - iSrcPoint1X;
                iSrcDy = iDstPoint1Y - iSrcPoint1Y;
                iDstDx = iSrcPoint1X - iDstPoint1X;
                iDstDy = iSrcPoint1Y - iDstPoint1Y;
                iSrcLength = Math.sqrt(iSrcDx * iSrcDx + iSrcDy * iSrcDy);
                iDstLength = Math.sqrt(iDstDx * iDstDx + iDstDy * iDstDy);
                iSrcSinX = (iDstPoint1Y - iSrcPoint1Y) / iSrcLength;
                iSrcCosX = (iDstPoint1X - iSrcPoint1X) / iSrcLength;
                iDstSinX = (iSrcPoint1Y - iDstPoint1Y) / iSrcLength;
                iDstCosX = (iSrcPoint1X - iDstPoint1X) / iSrcLength;
            }
            else{
                iSrcDx = iSrcPoint2X - iSrcPoint1X;
                iSrcDy = iSrcPoint2Y - iSrcPoint1Y;
                iDstDx = iDstPoint2X - iDstPoint1X;
                iDstDy = iDstPoint2Y - iDstPoint1Y;
                iSrcLength = Math.sqrt(iSrcDx * iSrcDx + iSrcDy * iSrcDy);
                iDstLength = Math.sqrt(iDstDx * iDstDx + iDstDy * iDstDy);
                iSrcSinX = (iDstPoint2Y - iSrcPoint1Y) / iSrcLength;
                iSrcCosX = (iDstPoint2X - iSrcPoint1X) / iSrcLength;
                iDstSinX = (iSrcPoint2Y - iDstPoint1Y) / iSrcLength;
                iDstCosX = (iSrcPoint2X - iDstPoint1X) / iSrcLength;
            }

            //2.箭头与link的交点坐标
            var iLinkDirectionSrcX = iSrcPoint1X + LINK_DIRECTION_LENGTH * iSrcCosX;
            var iLinkDirectionSrcY = iSrcPoint1Y + LINK_DIRECTION_LENGTH * iSrcSinX;
            var iLinkDirectionDstX = iDstPoint1X + LINK_DIRECTION_LENGTH * iDstCosX;
            var iLinkDirectionDstY = iDstPoint1X + LINK_DIRECTION_LENGTH * iDstSinX;
            var iLinkDirectionSrcCrossX = iSrcPoint1X + LINK_DIRECTION_CROSS_LENGTH * iSrcCosX;
            var iLinkDirectionSrcCrossY = iSrcPoint1Y + LINK_DIRECTION_CROSS_LENGTH * iSrcSinX;
            var iLinkDirectionDstCrossX = iDstPoint1X + LINK_DIRECTION_CROSS_LENGTH * iDstCosX;
            var iLinkDirectionDstCrossY = iDstPoint1Y + LINK_DIRECTION_CROSS_LENGTH * iDstSinX;

            //3.计算箭头与顶点坐标
            var iLinkLeftDirectionSrcX;
            var iLinkLeftDirectionSrcY;
            var iLinkRightDirectionSrcX;
            var iLinkRightDirectionSrcY;
            var iLinkLeftDirectionDstX;
            var iLinkLeftDirectionDstY;
            var iLinkRightDirectionDstX;
            var iLinkRightDirectionDstY;
            if(iSrcPoint1X == iDstPoint1X){
                //3.1.计算得到箭头起点和终点坐标作为
                iLinkLeftDirectionSrcX = iLinkDirectionSrcX - LINK_DIRECTION_OFFSET_LENGTH;
                iLinkLeftDirectionSrcY = iLinkDirectionSrcY;
                iLinkRightDirectionSrcX = iLinkDirectionSrcX + LINK_DIRECTION_OFFSET_LENGTH;
                iLinkRightDirectionSrcY = iLinkDirectionSrcY;

                iLinkLeftDirectionDstX = iLinkDirectionDstX - LINK_DIRECTION_OFFSET_LENGTH;
                iLinkLeftDirectionDstY = iLinkDirectionDstY;
                iLinkRightDirectionDstX = iLinkDirectionDstX + LINK_DIRECTION_OFFSET_LENGTH;
                iLinkRightDirectionDstY = iLinkDirectionDstY;
            }
            else if(iSrcPoint1Y == iDstPoint1Y){
                iLinkLeftDirectionSrcX = iLinkDirectionSrcX;
                iLinkLeftDirectionSrcY = iLinkDirectionSrcY + LINK_DIRECTION_OFFSET_LENGTH;
                iLinkRightDirectionSrcX = iLinkDirectionSrcX;
                iLinkRightDirectionSrcY = iLinkDirectionSrcY - LINK_DIRECTION_OFFSET_LENGTH;

                iLinkLeftDirectionDstX = iLinkDirectionDstX;
                iLinkLeftDirectionDstY = iLinkDirectionDstY + LINK_DIRECTION_OFFSET_LENGTH;
                iLinkRightDirectionDstX = iLinkDirectionDstX;
                iLinkRightDirectionDstY = iLinkDirectionDstY - LINK_DIRECTION_OFFSET_LENGTH;
            }
            else{
                iLinkLeftDirectionSrcX = iLinkDirectionSrcX - LINK_DIRECTION_OFFSET_LENGTH * iSrcSinX;
                iLinkLeftDirectionSrcY = iLinkDirectionSrcY + LINK_DIRECTION_OFFSET_LENGTH * iSrcCosX;
                iLinkRightDirectionSrcX = iLinkDirectionSrcX + LINK_DIRECTION_OFFSET_LENGTH * iSrcSinX;
                iLinkRightDirectionSrcY = iLinkDirectionSrcY - LINK_DIRECTION_OFFSET_LENGTH * iSrcCosX;

                iLinkLeftDirectionDstX = iLinkDirectionDstX - LINK_DIRECTION_OFFSET_LENGTH * iDstSinX;
                iLinkLeftDirectionDstY = iLinkDirectionDstY + LINK_DIRECTION_OFFSET_LENGTH * iDstCosX;
                iLinkRightDirectionDstX = iLinkDirectionDstX + LINK_DIRECTION_OFFSET_LENGTH * iDstSinX;
                iLinkRightDirectionDstY = iLinkDirectionDstY - LINK_DIRECTION_OFFSET_LENGTH * iDstCosX;
            }

            //4.设置透明度
            _penWidth(oLink, oCanvasContext);

            //5.设置线宽
            _penAlpha(oLink, oCanvasContext);

            //6.draw direction
            //6.1.双向箭头
            if(LINK_DIRECTION_BIDIRECTIONAL == oLink.params.uiDirection){
                //5.1.1.画源节点箭头
                var strFromColor = "#878787";
                if(oLink.params.uiColor){
                    strFromColor = oLink.params.uiColor;
                }
                if(oLink.params.uiFromColor){
                    strFromColor = oLink.params.uiFromColor
                }
                _drawLinkDirectionDetail(oCanvasContext, strFromColor, iLinkLeftDirectionSrcX, iLinkLeftDirectionSrcY, iSrcPoint1X, iSrcPoint1Y,
                    iLinkRightDirectionSrcX, iLinkRightDirectionSrcY, iLinkDirectionSrcCrossX, iLinkDirectionSrcCrossY);

                //5.1.1.画宿节点箭头
                var strToColor = "#878787";
                if(oLink.params.uiColor){
                    strToColor = oLink.params.uiColor;
                }
                if(oLink.params.uiToColor){
                    strToColor = oLink.params.uiToColor
                }
                _drawLinkDirectionDetail(oCanvasContext, strToColor, iLinkLeftDirectionDstX, iLinkLeftDirectionDstY, iDstPoint1X, iDstPoint1Y,
                    iLinkRightDirectionDstX, iLinkRightDirectionDstY, iLinkDirectionDstCrossX, iLinkDirectionDstCrossY);

                oLink.params.uiLinkDirectionSrcCrossX = iLinkDirectionSrcCrossX;
                oLink.params.uiLinkDirectionSrcCrossY = iLinkDirectionSrcCrossY;
                oLink.params.uiLinkDirectionDstCrossX = iLinkDirectionDstCrossX;
                oLink.params.uiLinkDirectionDstCrossY = iLinkDirectionDstCrossY;
            }
            //6.2.单向箭头
            if(LINK_DIRECTION_UNIDIRECTIONAL== oLink.params.uiDirection){
                //5.1.1.画宿节点箭头
                var strToColorEx = "#878787";
                if(oLink.params.uiColor){
                    strToColorEx = oLink.params.uiColor;
                }
                if(oLink.params.uiToColor){
                    strToColorEx = oLink.params.uiToColor
                }
                _drawLinkDirectionDetail(oCanvasContext, strToColorEx, iLinkLeftDirectionDstX, iLinkLeftDirectionDstY, iDstPoint1X, iDstPoint1Y,
                    iLinkRightDirectionDstX, iLinkRightDirectionDstY, iLinkDirectionDstCrossX, iLinkDirectionDstCrossY);

                oLink.params.uiLinkDirectionSrcCrossX = iLinkDirectionSrcCrossX;
                oLink.params.uiLinkDirectionSrcCrossY = iLinkDirectionSrcCrossY;
                oLink.params.uiLinkDirectionDstCrossX = iLinkDirectionDstCrossX;
                oLink.params.uiLinkDirectionDstCrossY = iLinkDirectionDstCrossY;
            }
            else{
                oLink.params.uiLinkDirectionSrcCrossX = oLink.params.uiSrcPoint2X;
                oLink.params.uiLinkDirectionSrcCrossY = oLink.params.uiSrcPoint2Y;
                oLink.params.uiLinkDirectionDstCrossX = oLink.params.uiDstPoint2X;
                oLink.params.uiLinkDirectionDstCrossY = oLink.params.uiDstPoint2Y;
            }

            if(oLink.params.src_dst_id > 3){
                oLink.params.uiLinkDirectionSrcCrossX = oLink.params.uiSrcPoint2X;
                oLink.params.uiLinkDirectionSrcCrossY = oLink.params.uiSrcPoint2Y;
                oLink.params.uiLinkDirectionDstCrossX = oLink.params.uiDstPoint2X;
                oLink.params.uiLinkDirectionDstCrossY = oLink.params.uiDstPoint2Y;
            }

            //6.reset alpha
            oCanvasContext.globalAlpha = 1.0;
        };

        var _drawLinkDirectionDetail = function(oCanvasContext, strColor, iPoint1X, iPoint1Y, iPoint2X, iPoint2Y, iPoint3X, iPoint3Y, iPoint4X, iPoint4Y){
            oCanvasContext.strokeStyle = strColor;
            oCanvasContext.fillStyle = strColor;
            oCanvasContext.beginPath();
            oCanvasContext.moveTo(iPoint1X, iPoint1Y);
            oCanvasContext.lineTo(iPoint2X, iPoint2Y);
            oCanvasContext.lineTo(iPoint3X, iPoint3Y);
            oCanvasContext.lineTo(iPoint4X, iPoint4Y);
            oCanvasContext.lineTo(iPoint1X, iPoint1Y);
            oCanvasContext.lineTo(iPoint2X, iPoint2Y);
            oCanvasContext.fill();
            oCanvasContext.closePath();
            oCanvasContext.stroke();
        };

        //endregion

        //region _drawLinkAttach

        var _drawLinkAttach = function(oCanvasContext, oLink, dicImages){
            if(oLink.params.uiAttach && oLink.params.uiAttach.length > 0){
                var iSrcPoint2X = oLink.params.uiSrcPoint2X;
                var iSrcPoint2Y = oLink.params.uiSrcPoint2Y;
                var iDstPoint2X = oLink.params.uiDstPoint2X;
                var iDstPoint2Y = oLink.params.uiDstPoint2Y;
                for(var i = 0; i < oLink.parmas.uiAttach.length; i++){
                    var strPos = oLink.parmas.uiAttach[i].pos;
                    var strUIImgKey = oLink.parmas.uiAttach[i].uiImgKey;
                    var oImg = dicImages[strUIImgKey];
                    if(oImg){
                        if(strPos == LINK_ATTACH_POS_CENTER){
                            var iPosX = (iSrcPoint2X + iDstPoint2X) / 2;
                            var iPosY = (iSrcPoint2Y + iDstPoint2Y) / 2;
                            oCanvasContext.drawImage(oImg.img, iPosX, iPosY, oImg.imgW, oImg.imgH);

                            oLink.params.uiAttachPosX = iPosX;
                            oLink.params.uiAttachPosY = iPosY;
                            oLink.params.uiAttachImgW = oImg.imgW;
                            oLink.params.uiAttachImgH = oImg.imgH;
                            oLink.params.uiAttachImgPath = oImg.img.attributes[0].value;
                        }
                    }
                    else{
                        console.log(strUIImgKey + "is not exists");
                    }
                }
            }
        };

        //endregion

        //endregion

        //region drawLinkTip

        /**
         * 绘制链路气泡
         * @param oLink
         * @param oUISlideWH
         * @param oCanvasContext
         */
        this.drawLinkTip = function(oLink, oUISlideWH, oCanvasContext){
            if(!oLink.params.uiHide && oLink.params.isSelect){
                //1.getTipTitle/tipContent
                var strTitle = oLink.params.uiTitle;
                var strTips = oLink.params.uiTips;
                if(strTips && "" !== strTips){
                    //2.get tipWH
                    var oTipWH = m_oParent.Tips._getTipsWH(oCanvasContext, strTitle, strTips);

                    //3.draw tip border
                    var iLinkFromX = oLink.params.uiSrcPoint2X;
                    var iLinkFromY = oLink.params.uiSrcPoint2Y;
                    var iLinkToX = oLink.params.uiDstPoint2X;
                    var iLinkToY = oLink.params.uiDstPoint2Y;
                    var iX = (iLinkFromX + iLinkToX) / 2;
                    var iY = (iLinkFromY + iLinkToY) / 2;
                    var oLeftPos = m_oParent.Tips._drawTipBorderAndGetLeftPoint(iX, 0, iY, 0, oTipWH.tipW, oTipWH.tipH, oUISlideWH, oCanvasContext);

                    //4._drawTipContent
                    m_oParent.Tips._drawTipContent(oCanvasContext, oLeftPos.x, oLeftPos.y, strTitle, strTips, oTipWH.tipW, oTipWH.tipH);
                }
            }
        };

        //endregion

        //region drawVirtualLink

        /**
         * 绘制虚拟链路, 用于创建链路
         * @param oVMCavansContext
         * @param oSrcNode
         * @param oDstPoint
         * @param bIsRealLine
         * @param strColor
         */
        this.drawVirtualLink = function(oVMCavansContext, oSrcNode, oDstPoint, bIsRealLine, strColor){
            var oDstNode = {
                name: "virtualAndLinkDstNode",
                params: {
                    uiImgWCur: oSrcNode.params.uiImgWCur,
                    uiImgHCur: oSrcNode.parmas.uiImgHCur,
                    uiPosX: oDstPoint.x - oSrcNode.params.uiImgWCur / 2,
                    uiPosY: oDstPoint.y - oSrcNode.params.uiImgHCur / 2
                }
            };
            if(!strColor){
                strColor = "red";
            }
            var oLink = {
                name : "Virtual",
                params: {
                    src_dst_id: 1,
                    srcNodeName: oSrcNode.name,
                    dstNodeName: oDstNode.name,
                    uiRealLine: bIsRealLine,
                    uiColor: strColor,
                    uiDirection: LINK_DIRECTION_UNINIRECTIONAL
                }
            };

            //1.根据oSrcNode和oDstNode计算链路的四个点坐标
            _getLinkRes(oLink, oSrcNode, oDstNode);

            //2.设置link
            _drawLinkColorWithReal(oVMCavansContext, oLink);

            //3.设置链路方向
            _drawLinkDirection(oVMCavansContext, oLink);
        };

        //endregion

        //region drawVirtualLink4AdjustPath

        this.drawVirtualLink4AdjustPath = function(oVMCanvasContext, arrSrcNode, oDstPoint, bIsRealLine, strColor, bNotDrawNodeToPointLine){
            if(arrSrcNode.length === 0){

            }
            else if(arrSrcNode.length == 1){
                self.drawVirtualLink(oVMCanvasContext, arrSrcNode[0], oDstPoint, bIsRealLine, strColor);
            }
            else{
                //1.绘制网元和网元之间的虚拟链路
                for(var i= 0; i < arrSrcNode.length - 1; i++){
                    var oNode = arrSrcNode[i + 1];
                    self.drawVirtualLink(oVMCanvasContext, arrSrcNode[i], {
                        x: oNode.params.uiPosX + oNode.params.uiImgWCur / 2,
                        y: oNode.params.uiPosY + oNode.params.uiImgHCur / 2
                    }, bIsRealLine, strColor);
                }

                //2.绘制最后一个网元和鼠标当前的链路
                if(!bNotDrawNodeToPointLine){
                    self.drawVirtualLink(oVMCanvasContext, arrSrcNode[arrSrcNode.length - 1], oDstPoint, bIsRealLine, strColor);
                }
            }
        };

        //endregion

        //region dispose

        this.dispose = function(){
            for(var i = 0; i < m_arrIntervel4FlowLink.length; i++){
                clearInterval(m_arrIntervel4FlowLink[i]);
            }
            m_arrIntervel4FlowLink = [];
        };

        //endregion
    }
})(jQuery);