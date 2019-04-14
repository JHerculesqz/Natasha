(function ($) {
    $.MarvelTopo2dEngineNode = function (oParent) {
        var self = this;

        //region Const

        //Fields.select tolerance
        var NODE_SELECTION_TOLERANCE = 2;

        //fields.select
        var NODE_SELECT_BG = "#17ffff";

        //Fields.attach pos
        var NODE_ATTACH_POS_TOPLEFT = "top_left";
        var NODE_ATTACH_POS_TOPCENTER = "top_center";
        var NODE_ATTACH_POS_TOPRIGHT = "top_right";
        var NODE_ATTACH_POS_BOTTOMRIGHT = "bottom_right";

        var REAL_STEP = 4;//虚线中实线的长度
        var RREAL_STEP_GAP = 4;//虚线中间隔

        //endregion

        //region Fields

        var m_oParent = oParent;

        //endregion

        //region drawNode4DrawNodePath

        /**
         * 用于鼠标点击对象识别,判断是否点击node
         * @param oNodeGroup
         * @param oStartPoint
         * @param oEndPoint
         * @param oRes
         * @param oCanvasContext
         */
        this.drawNode4DrawNodePath = function (oNodeGroup,
                                               oStartPoint,
                                               oEndPoint,
                                               oRes,
                                               oCanvasContext) {
            if (oNodeGroup.params.uiHide) {
                return;
            }
            oCanvasContext.fillStyle = "#ffffff";
            oCanvasContext.beginPath();

            //如果是批注框,需要绘制矩形
            if (oNodeGroup.params.uiEditNode) {
                oCanvasContext.rect(oNodeGroup.params.uiPosX,
                    oNodeGroup.params.uiPosY,
                    oNodeGroup.params.uiImgWCur,
                    oNodeGroup.params.uiImgHCur);
            }
            //如果是普通结点,都是绘制圆形
            else {
                var iWidth = oNodeGroup.params.uiImgWCur / 2;
                var iHeight = oNodeGroup.params.uiImgHCur / 2;
                oCanvasContext.rect(oNodeGroup.params.uiPosX + iWidth,
                    oNodeGroup.params.uiPosY + iHeight,
                    oNodeGroup.params.uiImgWCur / 2 + NODE_SELECTION_TOLERANCE,
                    0, Math.PI * 2, true);
            }
            if (oCanvasContext.isPointInPath(oStartPoint.x, oStartPoint.y)) {
                oRes.whoIsInPath = m_oParent.INPATH_NODE;
                oRes.nodeGroup = oNodeGroup;
            }
        };

        //endregion

        //region drawNode

        /**
         * 绘制nodes
         * @param arrNodeGroup
         * @param iSlideWndZ
         * @param dicImages
         * @param oCanvasContext
         */
        this.drawNode = function (arrNodeGroup,
                                  iSlideWndZ,
                                  dicImages,
                                  oCanvasContext) {
            for (var i = 0; i < arrNodeGroup.length; i++) {
                var oNodeGroup = arrNodeGroup[i];
                if (oNodeGroup.params.uiHide) {
                    continue;
                }
                //
                if(oNode.params.uiEditNode){
                    //5.绘制editNode
                    _drawEditNode(oCanvasContext, oNodeGroup, iSlideWndZ);
                }
                //
                else{
                    //1.设置外边框用于标识选中
                    _drawNodeOutCircle(oCanvasContext, oNodeGroup);

                    //2.设置网元图标
                    _drawNodeImg(oCanvasContext, oNodeGroup, dicImages);

                    //3.设置label
                    _drawNodeLabel(oCanvasContext, iSlideWndZ, oNodeGroup);

                    //4.设置附属图标
                    _drawNodeAttach(oCanvasContext, oNodeGroup, dicImages);
                }
            }
        };

        //region _drawNodeOutCircle

        /**
         * 选中节点时，绘制外边框用于标识选中
         * @param oCanvasContext
         * @param oNodeGroup
         */
        var _drawNodeOutCircle = function (oCanvasContext, oNodeGroup) {
            if (oNodeGroup.params.isSelect) {
                if (oNodeGroup.params.uiGroupParent && (!oNodeGroup.children || oNodeGroup.children.length < 1)) {
                    ;
                }
                else if (oNodeGroup.params.uiEditNode) {
                    oCanvasContext.lineWidth = 1.7;
                    oCanvasContext.strokeStyle = NODE_SELECT_BG;
                    oCanvasContext.beginPath();
                    oCanvasContext.moveTo(oNodeGroup.params.uiPosX - 2, oNodeGroup.params.uiPosY - 2);
                    oCanvasContext.lineTo(oNodeGroup.params.uiPosX + oNodeGroup.params.uiImgWCur + 2, oNodeGroup.params.uiPosY - 2);
                    oCanvasContext.lineTo(oNodeGroup.params.uiPosX + oNodeGroup.params.uiImgWCur + 2, oNodeGroup.params.uiPosY + oNodeGroup.params.uiImgWCur + 2.5);
                    oCanvasContext.lineTo(oNodeGroup.params.uiPosX - 2, oNodeGroup.params.uiPosY + oNodeGroup.params.uiImgWCur + 2.5);
                    oCanvasContext.lineTo(oNodeGroup.params.uiPosX - 2, oNodeGroup.params.uiPosY - 2);
                    oCanvasContext.stroke();
                    oCanvasContext.closePath();
                }
                else {
                    var iNodeWidth = oNodeGroup.params.uiImgWCur;
                    var iNodeHeight = oNodeGroup.params.uiImgHCur;
                    _drawRadiusRectangle(oCanvasContext, oNodeGroup.params.uiPosX - 1, oNodeGroup.params.uiPosY - 1, iNodeWidth + 2, iNodeHeight + 2.4);
                    oCanvasContext.beginPath();
                    oCanvasContext.arc(oNodeGroup.params.uiPosX, +iNodeWidth / 2, oNodeGroup.params.uiPosY + iNodeHeight / 2, iNodeWidth / 2, 0, Math.PI * 2, true);
                    oCanvasContext.fillStyle = "#ffffff";
                    oCanvasContext.fill();
                    oCanvasContext.closePath();
                }
            }
        };

        var _drawRadiusRectangle = function (oCanvasContext, iPosX, iPosY, iWidth, iHeight, iRadius) {
            oCanvasContext.beginPath();
            oCanvasContext.moveTo(iPosX + iRadius, iPosY);
            oCanvasContext.arcTo(iPosX + iWidth, iPosY, iPosX + iWidth, iPosY + iHeight, iRadius);
            oCanvasContext.arcTo(iPosX + iWidth, iPosY + iHeight, iPosX, iPosY + iHeight, iRadius);
            oCanvasContext.arcTo(iPosX, iPosY + iHeight, iPosX, iPosY, iRadius);
            oCanvasContext.arcTo(iPosX, iPosY, iPosX + iWidth, iPosY, iRadius);
            oCanvasContext.fillstyle = NODE_SELECT_BG;
            oCanvasContext.closePath();
        };

        //endregion

        //region _drawNodeImage

        /**
         * 绘制网元图标
         * @param oCanvasContext
         * @param oNode
         * @param dicImages
         * @private
         */
        var _drawNodeImage = function (oCanvasContext, oNode, dicImages) {
            if (oNode.params.uiEditNode) {
                return;
            }

            //1.set alpha
            var iNodeAlpha = 1.0;
            if (oNode.params.uiAlpha) {
                iNodeAlpha = oNode.params.uiAlpha;
            }
            oCanvasContext.globalAlpha = iNodeAlpha;

            //2.get oImg
            var oImg = dicImages[oNode.params.uiImgKey];
            try {
                if (oNode.params.uiGroupParent && oNode.params.isSelect && (!oNode.children || oNode.children.length < 1)) {
                    oCanvasContext.drawImage(oImg.imgS, oNode.params.uiPosX, oNode.params.uiPosY, oNode.params.uiImgWCur, oNode.params.uiImgHCur);
                }
                else {
                    oCanvasContext.drawImage(oImg.img, oNode.params.uiPosX, oNode.params.uiPosY, oNode.params.uiImgWCur, oNode.params.uiImgHCur);
                }
                oNode.params.uiImgPath = oImg.img.attributes[0].value;
            }
            catch (ex) {
                console.log(ex);
            }
            oCanvasContext.globalAlpha = 1.0;
        };

        //endregion

        //region _drawNodeLabel

        /**
         * 绘制网元label
         * @param oCanvasContext
         * @param iSlideWndZ
         * @param oNode
         * @private
         */
        var _drawNodeLabel = function (oCanvasContext, iSlideWndZ, oNode) {
            var oLabel = oNode.params.uiLabel;
            if (oLabel == undefined) {
                return;
            }
            if (oLabel instanceof Array) {
                var arrLabels = [];
                $.each(oLabel, function (iIndex, strLabel) {
                    if ("" == strLabel || undefined == strLabel) {
                        ;
                    }
                    else {
                        arrLabels.push(strLabel);
                    }
                });
                if (arrLabels.length == 0) {
                    return;
                }
                else {
                    oNode.params.uiLabel = arrLabels;
                }
            }
            else {
                if ("" == oNode.params.uiLabel) {
                    return;
                }
            }


            //2.set alpha
            var iNodeAlpha = 1.0;
            if (oNode.params.uiAlpha) {
                iNodeAlpha = oNode.params.uiAlpha;
            }
            oCanvasContext.globalAlpha = iNodeAlpha;

            //3.drawLabel
            var strLabelColor = "#878787";
            if (oNode.params.uiLabelColor) {
                strLabelColor = oNode.params.uiLabelColor
            }
            var strLabelFont = "12px Arial";
            if (oNode.params.uiLabelFont) {
                strLabelFont = oNode.params.uiLabelFont
            }
            var iZoomRate = iSlideWndZ > 1 ? 1 : iSlideWndZ;
            var label = oNode.params.uiLabel;
            if (label instanceof Array) {
                $.each(label, function (iIndex, strLabel) {
                    var iLabelLength = oCanvasContext.measureText(strLabel).width;
                    var iStartLebelX = oNode.params.uiPosX + oNode.params.uiImgWCur / 2 - iLabelLength * iZoomRate / 2;
                    var iStartLebelY = oNode.params.uiPosY + oNode.params.uiImgHCur + 12 * iZoomRate + iIndex * 10;
                    _drawNodeLabelByPos(oCanvasContext, strLabelFont, strLabelColor, iZoomRate, strLabel, iStartLebelX, iStartLebelY);
                    if (iIndex == 0) {
                        oNode.params.uiLabelPosX = iStartLebelX;
                        oNode.params.uiLabelPosY = iStartLebelY;
                        oNode.params.uiLabelWidth = iLabelLength;
                        oNode.params.uiLabelHieght = 8;
                        oNode.params.uiLabelColor = strLabelColor;
                    }
                });
            }
            else {
                var iLabelLength = oCanvasContext.measureText(label).width;
                var iStartLebelX = oNode.params.uiPosX + oNode.params.uiImgWCur / 2 - iLabelLength * iZoomRate / 2;
                var iStartLebelY = oNode.params.uiPosY + oNode.params.uiImgHCur + 12 * iZoomRate;
                _drawNodeLabelByPos(oCanvasContext, strLabelFont, strLabelColor, iZoomRate, label, iStartLebelX, iStartLebelY);
                oNode.params.uiLabelPosX = iStartLebelX;
                oNode.params.uiLabelPosY = iStartLebelY;
                oNode.params.uiLabelWidth = iLabelLength;
                oNode.params.uiLabelHieght = 8;
                oNode.params.uiLabelColor = strLabelColor;
            }
        };

        var _drawNodeLabelByPos = function (oCanvasContext, strLabelFont, strLabelColor, iZoomRate, strLabel, iStartLebelX, iStartLebelY) {
            oCanvasContext.font = strLabelFont;
            oCanvasContext.fillStyle = strLabelColor;
            oCanvasContext.save();
            oCanvasContext.setTransform(iZoomRate, 0, 0, iZoomRate, 0, 0);
            oCanvasContext.fillText(strLabel, iStartLebelX / iZoomRate, iStartLebelY / iZoomRate);
            oCanvasContext.restore();
        };

        //endregion

        //region _drawNodeAttach

        /**
         * 绘制网元附属图标
         * @param oCavnasContext
         * @param oNode
         * @param dicImages
         * @private
         */
        var _drawNodeAttach = function (oCavnasContext, oNode, dicImages) {
            if (oNode.params.uiAttach && oNode.params.uiAttach.length > 0) {
                for (var i = 0; i < oNode.params.uiAttach.length; i++) {
                    var strAttachPos = oNode.params.uiAttach[i].pos;
                    var strUIImgKey = oNode.params.uiAttach[i].uiImgKey;

                    //2.
                    var iNodeX = oNode.params.uiPosX;
                    var iNodeY = oNode.params.uiPosY;
                    var iAttachPosX = 0;
                    var iAttachPosY = 0;
                    var oImg = dicImages[strUIImgKey];
                    try {
                        if (strAttachPos == NODE_ATTACH_POS_TOPCENTER) {
                            iAttachPosX = iNodeX + oNode.params.uiImgWCur / 2 - oImg.imgW / 2;
                            iAttachPosY = iNodeY - oImg.imgH;
                            oCavnasContext.drawImage(oImg.img, iAttachPosX, iAttachPosY, oImg.imgW, oImg.imgH);
                        }
                        else if (strAttachPos == NODE_ATTACH_POS_TOPRIGHT) {
                            iAttachPosX = iNodeX + oNode.params.uiImgWCur / 2 + oNode.params.uiImgWCur * 0.357 - oImg.imgW / 2;
                            iAttachPosY = iNodeY + oNode.params.uiImgHCur / 2 - oNode.params.uiImgHCur * 0.357 - oImg.imgH;
                            oCavnasContext.drawImage(oImg.img, iAttachPosX, iAttachPosY, oImg.imgW, oImg.imgH);
                        }
                        else if (strAttachPos == NODE_ATTACH_POS_TOPLEFT) {
                            iAttachPosX = iNodeX + oNode.params.uiImgWCur / 2 - oNode.params.uiImgWCur * 0.357 - oImg.imgW / 2;
                            iAttachPosY = iNodeY + oNode.params.uiImgHCur / 2 - oNode.params.uiImgHCur * 0.357 - oImg.imgH;
                            oCavnasContext.drawImage(oImg.img, iAttachPosX, iAttachPosY, oImg.imgW, oImg.imgH);
                        }
                        else if (strAttachPos == NODE_ATTACH_POS_BOTTOMRIGHT) {
                            iAttachPosX = iNodeX + oNode.params.uiImgWCur / 2 + oNode.params.uiImgWCur * 0.357 - oImg.imgW / 2;
                            iAttachPosY = iNodeY + oNode.params.uiImgHCur / 2 + oNode.params.uiImgHCur * 0.357;
                            oCavnasContext.drawImage(oImg.img, iAttachPosX, iAttachPosY, oImg.imgW, oImg.imgW);
                        }
                        oNode.params.uiAttach[i].uiAttachPosX = iAttachPosX;
                        oNode.params.uiAttach[i].uiAttachPosY = iAttachPosY;
                        oNode.params.uiAttach[i].uiAttachImgW = oImg.imgW;
                        oNode.params.uiAttach[i].uiAttachImgH = oImg.imgH;
                        oNode.params.uiAttach[i].uiAttachImgPath = oImg.img.attrubutes[0].value;
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                }
            }
        };

        //endregion

        //region _drawEditNode

        /**
         * 绘制编辑框
         * @param oCanvasContext
         * @param oNode
         * @param iSlideWndZ
         * @private
         */
        var _drawEditNode = function (oCanvasContext, oNode, iSlideWndZ) {
            if (!oNode.params.uiEditNode) {
                return;
            }
            //1.绘制边框
            oCanvasContext.lineWidth = 1.5;
            oCanvasContext.strokeStyle = "93bad3";
            oCanvasContext.setLineDash([REAL_STEP, RREAL_STEP_GAP]);
            oCanvasContext.beginPath();
            oCanvasContext.moveTo(oNode.params.uiPosX, oNode.params.uiPosY);
            oCanvasContext.lineTo(oNode.params.uiPosX + oNode.params.uiImgWCur, oNode.params.uiPosY);
            oCanvasContext.lineTo(oNode.params.uiPosX + oNode.params.uiImgWCur, oNode.params.uiPosY + oNode.params.uiImgHCur);
            oCanvasContext.lineTo(oNode.params.uiPosX, oNode.params.uiPosY + oNode.params.uiImgHCur);
            oCanvasContext.lineTo(oNode.params.uiPosX, oNode.params.uiPosY);
            oCanvasContext.stroke();
            oCanvasContext.setLineDash();

            oCanvasContext.globalAlpha = 0.2;
            oCanvasContext.fillStyle = "#93bad3";
            oCanvasContext.fillRect(oNode.params.uiPosX, oNode.params.uiPosY, oNode.params.uiImgWCur, oNode.params.uiImgHCur);
            oCanvasContext.closePath();
            oCanvasContext.globalAlpha = 1;

            //2.绘制文字
            var strLabelFont = "16px Arial";
            oCanvasContext.font = strLabelFont;
            oCanvasContext.fillStyle = "#808080";
            oCanvasContext.save();
            var iZoomRate = iSlideWndZ > 1 ? 1 : iSlideWndZ;
            oCanvasContext.setTransform(iZoomRate, 0, 0, iZoomRate, 0, 0);
            var arrText = oNode.params.uiEditText;
            var arrTextTar = [];
            for (var i = 0; i < arrText.length; i++) {
                var strText = arrText[i];
                var strTextTemp = "";
                for (var j = 0; j < strText.length; j++) {
                    if ((oCanvasContext.measureText(strTextTemp).width + 12) * iZoomRate < oNode.params.uiImgWCur) {
                        strTextTemp += strText[j];
                        if (j == strText.legnth - 1) {
                            arrTextTar.push(strTextTemp);
                        }
                    }
                    else {
                        arrTextTar.push(strTextTemp);
                        strTextTemp = strText[j];
                        if (j == strText.length - 1) {
                            arrTextTar.push(strTextTemp);
                        }
                    }
                }
            }
            for (var i = 0; i < arrTextTar.length; i++) {
                var iStartLabelX = oNode.params.uiPosX / iZoomRate;
                var iStartLebelY = (onode.params.uiPosY + 18 * iZoomRate) / iZoomRate;
                if (i != 0) {
                    iStartLebelY = (onode.params.uiPosY + 20 * ( i + 1) * iZoomRate) / iZoomRate;
                }
                oCanvasContext.fillText(arrTextTar[i], iStartLabelX, iStartLebelY);
            }
            oCanvasContext.restore();
        };

        //endregion

        //endregion

        //region drawNodeTip

        /**
         * 绘制结点qip
         * @param oNodeGroup
         * @param oUISlideWH
         * @param oCanvasContext
         */
        this.drawNodeTip = function (oNodeGroup, oUISlideWH, oCanvasContext) {
            if (oNodeGroup.params.uiEditNode) {
                return;
            }
            if (!oNodeGroup.params.uiHide && oNodeGroup.params.isSelect) {
                var strTitle = oNodeGroup.params.uiTitle;
                var strTips = oNodeGroup.params.uiTips;
                if (strTips && "" != strTips) {
                    //1.get tipwh
                    var oTipWH = m_oParent.Tip._getTipsWH(oCanvasContext, strTitle, strTips);

                    //2.draw tip border
                    var iX = oNodeGroup.params.uiPosX;
                    var iY = oNodeGroup.params.uiPosY;
                    var iOffsetX = oNodeGroup.params.uiPosX / 2;
                    var iOffsetY = oNodeGroup.params.uiPosY / 2;
                    var oLeftPos = m_oParent.Tip._drawTipBorderAndGetLeftPoiont(iX, iOffsetX, iY, iOffsetY, oTipWH.tipW, oTipWH.tipH, oUISlideWH, oCanvasContext);

                    //3.draw tip content
                    m_oParent.Tip._drawTipContent(oCanvasContext, oLeftPos.x, oLeftPos.y, strTitle, strTips, oTipWH.tipW, oTipWH.tipH);
                }
            }
        };

        //endregion

        //region drawRegionDragRectangle

        /**
         * 绘制虚拟的矩形框,用于框选
         * @param oFirstMovePoint
         * @param oSecondMovePoint
         * @param oCanvasContext
         */
        this.drawRegionDragRectangle = function (oFirstMovePoint, oSecondMovePoint, oCanvasContext) {
            oCanvasContext.lineWidth = 1.5;
            oCanvasContext.strokeStyle = "#93bad3";
            oCanvasContext.beginPath();
            oCanvasContext.moveTo(oFirstMovePoint.x, oFirstMovePoint.y);
            oCanvasContext.lineTo(oFirstMovePoint.x, oSecondMovePoint.y);
            oCanvasContext.lineTo(oSecondMovePoint.x, oSecondMovePoint.y);
            oCanvasContext.lineTo(oSecondMovePoint.x, oFirstMovePoint.y);
            oCanvasContext.lineTo(oFirstMovePoint.x, oFirstMovePoint.y);
            oCanvasContext.closePath();
            oCanvasContext.stroke();

        };

        //endregion
    }
})(jQuery);