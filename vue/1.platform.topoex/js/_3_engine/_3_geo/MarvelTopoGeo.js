(function($){
    $.MarvelTopoGeo = function() {
        var self = this;

        //region getInscribeRectanglePoints

        /**
         * 根据圆心坐标算出内接矩形的四个点坐标
         * @param iCircleCenterX
         * @param iCircleCenterY
         * @param iRadius
         * @returns {{point1: {x: undefined, y: undefined}, point2: {x: undefined, y: undefined}, point3: {x: undefined, y: undefined}, point4: {x: undefined, y: undefined}}}
         */
        this.getInscribeRectanglePoints = function (iCircleCenterX,
                                                    iCircleCenterY,
                                                    iRadius) {
            var oRectanglePoints = {
                point1: {
                    x: undefined,
                    y: undefined
                },
                point2: {
                    x: undefined,
                    y: undefined
                },
                point3: {
                    x: undefined,
                    y: undefined
                },
                point4: {
                    x: undefined,
                    y: undefined
                }
            };
            var iStep = iRadius * 1.41421356 / 2;
            oRectanglePoints.point1.x = iCircleCenterX - iStep;
            oRectanglePoints.point1.y = iCircleCenterY - iStep;
            oRectanglePoints.point2.x = iCircleCenterX + iStep;
            oRectanglePoints.point2.y = iCircleCenterY - iStep;
            oRectanglePoints.point3.x = iCircleCenterX + iStep;
            oRectanglePoints.point3.y = iCircleCenterY + iStep;
            oRectanglePoints.point4.x = iCircleCenterX - iStep;
            oRectanglePoints.point4.y = iCircleCenterY + iStep;

            return oRectanglePoints;
        };

        //endregion

        //#region updateNodePosByLayer

        /**
         * 计算伪3D图层上拖动点的Offset，以保证不能拖出伪3D图层
         * @param oNode
         * @param iOffsetXInDB
         * @param iOffsetYInDB
         */
        this.updateNodePosByLayer = function (oNode,
                                              iOffsetXInDB,
                                              iOffsetYInDB) {
            var iOldX = oNode.params.x;
            var iOldY = oNode.params.y;
            //1.左边直线的斜率
            var iLinkK1 = (oNode.params.point2.y - oNode.params.point1.y) / (oNode.params.point2.x - oNode.params.point1.x);
            var iLinkB1 = oNode.params.point2.y - iLinkK1 * oNode.params.point2.x;

            //2.右边直线的斜率
            var iLinkK2 = (oNode.params.point4.y - oNode.params.point3.y) / (oNode.params.point4.x - oNode.params.point3.x);
            var iLinkB2 = oNode.params.point4.y - iLinkK1 * oNode.params.point4.x;

            //3.更新x坐标
            var iMinX = (iOldY - iLinkB1) / iLinkK1;
            var iMaxX = (iOldY - iLinkB2) / iLinkK2 - oNode.params.uiImgW * 2;
            if (oNode.params.x + iOffsetXInDB < iMinX) {
                oNode.params.x = iMinX;
            }
            else if (oNode.params.x + iOffsetXInDB > iMaxX) {
                oNode.params.x = iMaxX;
            }
            else {
                oNode.params.x = oNode.params.x + iOffsetXInDB;
            }

            //4.对于上面直线的斜率
            var iLinkK3 = (oNode.params.point4.y - oNode.params.point1.y) / (oNode.params.point4.x - oNode.params.point1.x);
            var iLinkB3 = oNode.params.point4.y - iLinkK1 * oNode.params.point4.x;

            //5.对于下面直线的斜率
            var iLinkK4 = (oNode.params.point3.y - oNode.params.point2.y) / (oNode.params.point3.x - oNode.params.point2.x);
            var iLinkB4 = oNode.params.point3.y - iLinkK1 * oNode.params.point3.x;

            //6.更新y的坐标
            var iMinY = iOldX * iLinkK3 + iLinkB3;
            var iMaxY = iOldX * iLinkK3 + iLinkB4 - oNode.params.uiImgH;
            if (oNode.params.y + iOffsetYInDB < iMinY) {
                oNode.params.y = iMinY;
            }
            else if (oNode.params.y + iOffsetYInDB > iMaxY) {
                oNode.params.y = iMaxY;
            }
            else {
                oNode.params.y = oNode.params.y + iOffsetYInDB;
            }
        };

        //endregion

        //region getIntersectionPoint

        /**
         * 求直线和圆的交点坐标
         * @param oLink
         * @param iCirclePosX
         * @param iCirclePosY
         * @param iW
         * @param iH
         * @param iNodeSrcPosX
         * @param iNodeSrcPosY
         * @param iNodeSrcW
         * @param iNodeDstPosX
         * @param iNodeDstPosY
         * @param iNodeDstW
         * @returns {{x: number, y: number}}
         */
        this.getIntersectionPoint = function (oLink, iCirclePosX, iCirclePosY,
                                              iW, iH,
                                              iNodeSrcPosX, iNodeSrcPosY, iNodeSrcW,
                                              iNodeDstPosX, iNodeDstPosY, iNodeDstW){
            if(oLink.params.src_dst_id == 1){
                iNodeSrcPosX = iNodeSrcPosX + iNodeSrcW / 2;
                iNodeSrcPosY = iNodeSrcPosY + iNodeSrcW / 2;
                iNodeDstPosX = iNodeDstPosX + iNodeSrcW / 2;
                iNodeDstPosY = iNodeDstPosY + iNodeSrcW / 2;
            }
            else if(oLink.params.src_dst_id % 2 == 0){
                iNodeSrcPosX = iNodeSrcPosX + iNodeSrcW / 2;
                iNodeDstPosX = iNodeDstPosX + iNodeSrcW / 2;
            }
            else{
                iNodeSrcPosX = iNodeSrcPosX + iNodeSrcW / 2;
                iNodeSrcPosY = iNodeSrcPosY + iNodeSrcW;
                iNodeDstPosX = iNodeDstPosX + iNodeSrcW / 2;
                iNodeDstPosY = iNodeDstPosY + iNodeSrcW;
            }
            if(iNodeSrcPosX == iNodeDstPosX){
                iNodeDstPosX = iNodeDstPosX + 1;
            }

            //2.根据nodesrc和nodedst算出k,b
            var k = (iNodeDstPosY - iNodeSrcPosY)/(iNodeDstPosX - iNodeSrcPosX);
            var b = iNodeDstPosY - k * iNodeDstPosX;

            //3.算出交点(x1,y1)(x2,y2)
            var m = iCirclePosX + iW /2;
            var n = iCirclePosY + iW /2;
            var r = iW /2;
            var b2 = (2 * (b - n) * k - 2 * m) * (2 * (b - n) * k - 2 * m);
            var i4ac = 4 * (k * k + 1) * (m * m + (b - n)*(b - n) - r * r);
            var iStep = (b2 - i4ac);
            var x1 = (2 * m - 2 * (b - n) * k + Math.sqrt(iStep))/(2 * (k * k + 1));
            var y1 = k * x1 + b;
            var x2 = (2 * m - 2 * (b - n) * k - Math.sqrt(iStep))/(2 * (k * k + 1));
            var y2 = k * x2 + b;

            //4.取舍(下x2, y2)
            var ySta1 = (iNodeDstPosY + iNodeDstW / 2 - y1) * (iNodeDstPosY + iNodeDstW / 2 - y1) + (iNodeDstPosX + iNodeDstW / 2 - x1) * (iNodeDstPosX + iNodeDstW / 2 - x1);
            var ySta2 = (iNodeSrcPosY + iNodeSrcW / 2 - y1) * (iNodeSrcPosY + iNodeSrcW / 2 - y1) + (iNodeSrcPosX + iNodeSrcW / 2 - x1) * (iNodeSrcPosX + iNodeSrcW / 2 - x1);
            var xNex = (iNodeDstPosY + iNodeDstW / 2 - (iNodeSrcPosY + iNodeSrcW / 2)) * (iNodeDstPosY + iNodeDstW / 2 - (iNodeSrcPosY + iNodeSrcW / 2)) +
            (iNodeDstPosX + iNodeDstW / 2 - (iNodeSrcPosX + iNodeSrcW / 2)) * (iNodeDstPosX + iNodeDstW / 2 - (iNodeSrcPosX + iNodeSrcW / 2));
            if(ySta1 <= xNex && ySta2 >= xNex){
                return {
                    x: x1,
                    y: y1
                }
            }
            else{
                return {
                    x: x2,
                    y: y2
                }
            }
        };

        //endregion
    };
})(jQuery);
