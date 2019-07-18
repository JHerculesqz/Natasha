(function ($) {
    $.MarvelTopo2dEngineTip = function (oParent) {
        //region const

        var TIP_BORDER_LINEW = 1;//气泡边缘的宽度
        var TIP_BORDER = "#999";//气泡边框的颜色
        var TIP_TITLE_BG = "#00aaff";//气泡标题的背景颜色
        var TIP_TITLE_TEXT = "#ffffff";//气泡标题的颜色
        var TIP_CONTENT_BG = "#ffffff";//气泡内容的背景颜色
        var TIP_CONTENT_TEXT = "#4d4d4d";//气泡内容的颜色

        //endregion

        //region Fields

        var self = this;
        var m_oParent = oParent;

        //endregion

        //region getTipsWH

        /**
         * 获取气泡的宽度和高度
         * @param oCanvasContext
         * @param strTitle
         * @param strTips
         * @returns {{tipW: undefined, tipH: undefined}}
         */
        this.getTipsWH = function (oCanvasContext, strTitle, strTips) {
            var oTipWH = {
                tipW: undefined,
                tipH: undefined
            };
            oCanvasContext.font = "14px Arial";
            var iTitleWidth = 10 + oCanvasContext.measureText(strTitle).width + 10;
            var iTipContentWidth = 0;
            var arrTips = strTips.split("<br/>");
            var iTipRows = 0;
            oCanvasContext.font = "12px Arial";
            if (arrTips[arrTips.length - 1] == "") {
                arrTips.pop();
            }
            for (var j = 0; j < arrTips.length; j++) {
                var iTipItemWidth = 10 + oCanvasContext.measureText(arrTips[j]).width + 10;
                if (iTipItemWidth > iTipContentWidth) {
                    iTipContentWidth = iTipItemWidth;
                }
                iTipRows++;
            }
            oTipWH.tipW = iTipContentWidth > iTitleWidth ? iTipContentWidth : iTitleWidth;
            oTipWH.tipH = iTipRows * 15 + 30 + 10;
            return oTipWH;
        };

        //endregion

        //region drawTipBorderAndGetLeftPoint

        /**
         * 绘制tip的边框以及起始点坐标
         * @param iX
         * @param iOffsetX
         * @param iY
         * @param iOffsetY
         * @param iTipW
         * @param iTipH
         * @param oUiSlideWH
         * @param oCanvasContext
         * @returns {{x: undefined, y: undefined}}
         */
        this.drawTipBorderAndGetLeftPoint = function (iX, iOffsetX, iY, iOffsetY, iTipW, iTipH, oUiSlideWH, oCanvasContext) {
            var oLeftPos = {
                x: undefined,
                y: undefined
            };
            var iSlideW = oUiSlideWH.w;
            var iSlideH = oUiSlideWH.h;

            //3.分八种情况讨论,画边框,得到左上角的坐标
            //左边
            if (iX + iOffsetX < iTipW / 2) {
                //左上
                if (iY + iOffsetY < iTipH) {
                    var TIP_HANDLE_OFFSET = 5;
                    iX = iX + TIP_HANDLE_OFFSET + iOffsetX * 2;
                    var iYBak = iY;
                    iY = 0;
                    oLeftPos.x = iX;
                    oLeftPos.y = iY;
                    var TIP_HANDLE_M_W = -TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_M_H = iYBak - iY + iOffsetY;
                    var TIP_HANDLE_L_W = 0;
                    var TIP_HANDLE_L_H = TIP_HANDLE_M_H - TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_R_W = 0;
                    var TIP_HANDLE_R_H = TIP_HANDLE_M_H + TIP_HANDLE_OFFSET;
                    _drawTipBorderLeft(oCanvasContext, iX, iY, iTipW, iTipH, TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                        TIP_HANDLE_M_W, TIP_HANDLE_M_H, TIP_HANDLE_L_W, TIP_HANDLE_L_H);
                }
                //左下
                else if (iSlideH - iY - iOffsetY < iTipH / 2 + 5) {
                    var TIP_HANDLE_OFFSET = 5;
                    iX = iX + TIP_HANDLE_OFFSET + iOffsetX * 2;
                    var iYBak = iY;
                    iY = iSlideH - iTipH;
                    oLeftPos.x = iX;
                    oLeftPos.y = iY;
                    var TIP_HANDLE_M_W = -TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_M_H = iYBak - iY + iOffsetY;
                    var TIP_HANDLE_L_W = 0;
                    var TIP_HANDLE_L_H = TIP_HANDLE_M_H - TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_R_W = 0;
                    var TIP_HANDLE_R_H = TIP_HANDLE_M_H + TIP_HANDLE_OFFSET;
                    _drawTipBorderLeft(oCanvasContext, iX, iY, iTipW, iTipH, TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                        TIP_HANDLE_M_W, TIP_HANDLE_M_H, TIP_HANDLE_L_W, TIP_HANDLE_L_H);
                }
                //左中
                else {
                    var TIP_HANDLE_OFFSET = 5;
                    iX = iX + TIP_HANDLE_OFFSET + iOffsetX * 2;
                    var iYBak = iY;
                    iY = iY + iSlideH - iTipH / 2;
                    oLeftPos.x = iX;
                    oLeftPos.y = iY;
                    var TIP_HANDLE_M_W = -TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_M_H = iTipH / 2;
                    var TIP_HANDLE_L_W = 0;
                    var TIP_HANDLE_L_H = TIP_HANDLE_M_H - TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_R_W = 0;
                    var TIP_HANDLE_R_H = TIP_HANDLE_M_H + TIP_HANDLE_OFFSET;
                    _drawTipBorderLeft(oCanvasContext, iX, iY, iTipW, iTipH, TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                        TIP_HANDLE_M_W, TIP_HANDLE_M_H, TIP_HANDLE_L_W, TIP_HANDLE_L_H);
                }
            }
            //右边
            else if (iSlideW - iX - iOffsetX < iTipW / 2) {
                //右上
                if (iY + iOffsetY < iTipH) {
                    var TIP_HANDLE_OFFSET = 5;
                    iX = iX - TIP_HANDLE_OFFSET - iTipW;
                    var iYBak = iY;
                    iY = iY + iSlideH - iTipH / 2;
                    oLeftPos.x = iX;
                    oLeftPos.y = iY;
                    var TIP_HANDLE_M_W = iTipW + TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_M_H = iYBak - iY + iOffsetY;
                    var TIP_HANDLE_L_W = iTipW;
                    var TIP_HANDLE_L_H = TIP_HANDLE_M_H - TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_R_W = iTipW;
                    var TIP_HANDLE_R_H = TIP_HANDLE_M_H + TIP_HANDLE_OFFSET;
                    _drawTipBorderRight(oCanvasContext, iX, iY, iTipW, iTipH, TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                        TIP_HANDLE_M_W, TIP_HANDLE_M_H, TIP_HANDLE_L_W, TIP_HANDLE_L_H);
                }
                //右下
                else if (iSlideH - iY - iOffsetY < iTipH / 2) {
                    var TIP_HANDLE_OFFSET = 5;
                    iX = iX - TIP_HANDLE_OFFSET - iTipW;
                    var iYBak = iY;
                    iY = iSlideH - iTipH;
                    oLeftPos.x = iX;
                    oLeftPos.y = iY;
                    var TIP_HANDLE_M_W = iTipW + TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_M_H = iYBak - iY + iOffsetY;
                    var TIP_HANDLE_L_W = iTipW;
                    var TIP_HANDLE_L_H = TIP_HANDLE_M_H - TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_R_W = iTipW;
                    var TIP_HANDLE_R_H = TIP_HANDLE_M_H + TIP_HANDLE_OFFSET;
                    _drawTipBorderRight(oCanvasContext, iX, iY, iTipW, iTipH, TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                        TIP_HANDLE_M_W, TIP_HANDLE_M_H, TIP_HANDLE_L_W, TIP_HANDLE_L_H);
                }
                //右中
                else {
                    var TIP_HANDLE_OFFSET = 5;
                    iX = iX - TIP_HANDLE_OFFSET - iTipW;
                    var iYBak = iY;
                    iY = iY + iSlideH - iTipH / 2;
                    oLeftPos.x = iX;
                    oLeftPos.y = iY;
                    var TIP_HANDLE_M_W = iTipW + TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_M_H = iTipH / 2;
                    var TIP_HANDLE_L_W = iTipW;
                    var TIP_HANDLE_L_H = TIP_HANDLE_M_H - TIP_HANDLE_OFFSET;
                    var TIP_HANDLE_R_W = iTipW;
                    var TIP_HANDLE_R_H = TIP_HANDLE_M_H + TIP_HANDLE_OFFSET;
                    _drawTipBorderRight(oCanvasContext, iX, iY, iTipW, iTipH, TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                        TIP_HANDLE_M_W, TIP_HANDLE_M_H, TIP_HANDLE_L_W, TIP_HANDLE_L_H);
                }
            }
            //上中
            else if (iY < iTipH) {
                var TIP_HANDLE_OFFSET = 5;
                iX = iX + iOffsetX - iTipW / 2;
                var iYBak = iY;
                iY = iY + iOffsetY * 2 + TIP_HANDLE_OFFSET;
                oLeftPos.x = iX;
                oLeftPos.y = iY;
                var TIP_HANDLE_M_W = iTipW / 2;
                var TIP_HANDLE_M_H = -TIP_HANDLE_OFFSET;
                var TIP_HANDLE_L_W = iTipW / 2 - TIP_HANDLE_OFFSET;
                var TIP_HANDLE_L_H = 0;
                var TIP_HANDLE_R_W = iTipW / 2 + TIP_HANDLE_OFFSET;
                var TIP_HANDLE_R_H = 0;
                _drawTipBorderTop(oCanvasContext, iX, iY, iTipW, iTipH, TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                    TIP_HANDLE_M_W, TIP_HANDLE_M_H, TIP_HANDLE_L_W, TIP_HANDLE_L_H);
            }
            else {
                var TIP_HANDLE_OFFSET = 5;
                iX = iX + iOffsetX - iTipW / 2;
                var iYBak = iY;
                iY = iY - TIP_HANDLE_OFFSET - iTipH;
                oLeftPos.x = iX;
                oLeftPos.y = iY;
                var TIP_HANDLE_M_W = iTipW / 2;
                var TIP_HANDLE_M_H = iTipH + TIP_HANDLE_OFFSET;
                var TIP_HANDLE_L_W = iTipW / 2 - TIP_HANDLE_OFFSET;
                var TIP_HANDLE_L_H = iTipH;
                var TIP_HANDLE_R_W = iTipW / 2 + TIP_HANDLE_OFFSET;
                var TIP_HANDLE_R_H = iTipH;
                _drawTipBorderOther(oCanvasContext, iX, iY, iTipW, iTipH, TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                    TIP_HANDLE_M_W, TIP_HANDLE_M_H, TIP_HANDLE_L_W, TIP_HANDLE_L_H);
            }
            return oLeftPos;
        };

        var _drawTipBorderLeft = function (oCanvasContext, iX, iY, iTipW, iTipH, TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                                           TIP_HANDLE_M_W, TIP_HANDLE_M_H, TIP_HANDLE_L_W, TIP_HANDLE_L_H) {
            oCanvasContext.lineWidth = TIP_BORDER_LINEW;
            oCanvasContext.fillStyle = TIP_CONTENT_BG;
            oCanvasContext.strokeStyle = TIP_BORDER;
            oCanvasContext.beginPath();
            oCanvasContext.moveTo(iX, iY);
            oCanvasContext.lineTo(iX + iTipW, iY);
            oCanvasContext.lineTo(iX + iTipW, iY + iTipH);
            oCanvasContext.lineTo(iX, iY + iTipH);
            oCanvasContext.lineTo(iX + TIP_HANDLE_R_W, iY + TIP_HANDLE_R_H);
            oCanvasContext.lineTo(iX + TIP_HANDLE_M_W, iY + TIP_HANDLE_M_H);
            oCanvasContext.lineTo(iX + TIP_HANDLE_L_W, iY + TIP_HANDLE_L_H);
            oCanvasContext.lineTo(iX, iY);
            oCanvasContext.fill();
            oCanvasContext.stroke();
            oCanvasContext.closePath();
        };
        var _drawTipBorderRight = function (oCanvasContext, iX, iY, iTipW, iTipH,
                                            TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                                            TIP_HANDLE_M_W, TIP_HANDLE_M_H,
                                            TIP_HANDLE_L_W, TIP_HANDLE_L_H) {
            oCanvasContext.lineWidth = TIP_BORDER_LINEW;
            oCanvasContext.fillStyle = TIP_CONTENT_BG;
            oCanvasContext.strokeStyle = TIP_BORDER;
            oCanvasContext.beginPath();
            oCanvasContext.moveTo(iX, iY);
            oCanvasContext.lineTo(iX, iY + iTipH);
            oCanvasContext.lineTo(iX + iTipW, iY + iTipH);
            oCanvasContext.lineTo(iX + TIP_HANDLE_R_W, iY + TIP_HANDLE_R_H);
            oCanvasContext.lineTo(iX + TIP_HANDLE_M_W, iY + TIP_HANDLE_M_H);
            oCanvasContext.lineTo(iX + TIP_HANDLE_L_W, iY + TIP_HANDLE_L_H);
            oCanvasContext.lineTo(iX + iTipW, iY);
            oCanvasContext.lineTo(iX, iY);
            oCanvasContext.fill();
            oCanvasContext.stroke();
            oCanvasContext.closePath();
        };
        var _drawTipBorderTop = function (oCanvasContext, iX, iY, iTipW, iTipH,
                                          TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                                          TIP_HANDLE_M_W, TIP_HANDLE_M_H, TIP_HANDLE_L_W, TIP_HANDLE_L_H) {
            oCanvasContext.lineWidth = TIP_BORDER_LINEW;
            oCanvasContext.fillStyle = TIP_CONTENT_BG;
            oCanvasContext.strokeStyle = TIP_BORDER;
            oCanvasContext.beginPath();
            oCanvasContext.moveTo(iX, iY);
            oCanvasContext.lineTo(iX, iY + iTipH);
            oCanvasContext.lineTo(iX + iTipW, iY + iTipH);
            oCanvasContext.lineTo(iX + iTipW, iY);
            oCanvasContext.lineTo(iX + TIP_HANDLE_R_W, iY + TIP_HANDLE_R_H);
            oCanvasContext.lineTo(iX + TIP_HANDLE_M_W, iY + TIP_HANDLE_M_H);
            oCanvasContext.lineTo(iX + TIP_HANDLE_L_W, iY + TIP_HANDLE_L_H);
            oCanvasContext.lineTo(iX, iY);
            oCanvasContext.fill();
            oCanvasContext.stroke();
            oCanvasContext.closePath();
        };
        var _drawTipBorderOther = function (oCanvasContext, iX, iY, iTipW, iTipH, TIP_HANDLE_R_W, TIP_HANDLE_R_H,
                                            TIP_HANDLE_M_W, TIP_HANDLE_M_H, TIP_HANDLE_L_W, TIP_HANDLE_L_H) {
            oCanvasContext.lineWidth = TIP_BORDER_LINEW;
            oCanvasContext.fillStyle = TIP_CONTENT_BG;
            oCanvasContext.strokeStyle = TIP_BORDER;
            oCanvasContext.beginPath();
            oCanvasContext.moveTo(iX, iY);
            oCanvasContext.lineTo(iX + iTipW, iY);
            oCanvasContext.lineTo(iX + iTipW, iY + iTipH);
            oCanvasContext.lineTo(iX + TIP_HANDLE_R_W, iY + TIP_HANDLE_R_H);
            oCanvasContext.lineTo(iX + TIP_HANDLE_M_W, iY + TIP_HANDLE_M_H);
            oCanvasContext.lineTo(iX + TIP_HANDLE_L_W, iY + TIP_HANDLE_L_H);
            oCanvasContext.lineTo(iX, iY + iTipH);
            oCanvasContext.lineTo(iX, iY);
            oCanvasContext.fill();
            oCanvasContext.stroke();
            oCanvasContext.closePath();
        };

        //endregion

        //region drawTipContent

        /**
         * 在tips的边框内，绘制tip内容
         * @param oCanvasContext
         * @param iLeftPosX
         * @param iLeftPosY
         * @param strTitle
         * @param strTips
         * @param iTipW
         * @param iTipH
         * @private
         */
        this.drawTipContent = function (oCanvasContext, iLeftPosX, iLeftPosY,
                                         strTitle, strTips, iTipW, iTipH) {
            //1.插入title背景
            oCanvasContext.fillStyle = TIP_TITLE_BG;
            oCanvasContext.fillRect(iLeftPosX, iLeftPosY, iTipW, 30);
            //2.插入tipTitle背景
            oCanvasContext.fillStyle = TIP_TITLE_TEXT;
            oCanvasContext.font("14px Arial");
            oCanvasContext.fillText(strTitle, iLeftPosX + 10, iLeftPosY + 20);//10为title离左边的距离
            //2.插入tip内容
            var arrTips = strTips.split("<br/>");
            oCanvasContext.fillStyle = TIP_CONTENT_TEXT;
            oCanvasContext.font = "12px Arial";
            for (var i = 0; i < arrTips.length; i++) {
                var strTip = arrTips[i];
                oCanvasContext.fillText(strTip, iLeftPosX + 10, iLeftPosY + 45 + 15 * i);
            }
        };

        //endregion
    }
})(jQuery);