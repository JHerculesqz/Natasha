(function ($) {
    $.MarvelTopo2dEngineSlideWnd = function (oParent) {
        var self = this;

        //region Const

        var STEP_SIZE = 0.05;
        var MIN_Z = 0.05;

        //endregion

        //region Fields

        var m_oParent = oParent;

        this.m_strContainerId = undefined;

        this.m_oSlideWndConf = {
            slideWndXMin: 0,
            slideWndYMin: 0,
            slideWndW: 0,
            slideWndH: 0,
            slideWndZ: 1
        };

        //endregion

        //region initSlideWndWH

        /**
         * 潜规则：
         * oOptions = {
         *  id: "",
         *  parentId:"",
         *  width: "",----可选
         *  height: "",----可选
         * }
         * @param oOptions
         */
        this.initSlideWndWH = function(oOptions){
            self.m_strContainerId = oOptions.parentId;

            var iWidth;
            var iHeight;
            if(oOptions.width && oOptions.height){
                iWidth = self.m_oOptions.width;
                iHeight = self.m_oOptions.height;
            }
            else{
                iWidth = $("#" + oOptions.parentId).width();
                iHeight = $("#" + oOptions.parentId).height();
            }
            self.m_oSlideWndConf.slideWndW = iWidth;
            self.m_oSlideWndConf.slideWndH = iHeight;
        };

        //endregion

        //region getSlideWHInZ1

        /**
         * 获得m_oSlideWndConf.slideWndZ=1时，滑动窗口的W和H
         */
        this.getSlideWHInZ1 = function(){
            var oUISlideWHRes = {
                w: undefined,
                h: undefined
            };
            oUISlideWHRes.w = self.m_oSlideWndConf.slideWndW * self.m_oSlideWndConf.slideWndZ;
            oUISlideWHRes.h = self.m_oSlideWndConf.slideWndH * self.m_oSlideWndConf.slideWndZ;
        };

        //endregion

        //region updateslideWndXYByMouseDrag

        /**
         * 当鼠标拖动时，根据当前缩放比，更新滑动窗口的配置
         * @param iOffsetX
         * @param iOffsetY
         * @param oAfterUpdateSlideWndXYByDrag
         */
        this.updateslideWndXYByMouseDrag = function(iOffsetX, iOffsetY,
                                                    oAfterUpdateSlideWndXYByDrag){
            //1.chang ui 2 db
            var iOffsetXInDB = _calcUIOffsetToDBOffset(iOffsetX, self.m_oSlideWndConf);
            var iOffsetYInDB = _calcUIOffsetToDBOffset(iOffsetY, self.m_oSlideWndConf);

            //2.change slideWndXMin/Ymin
            self.m_oSlideWndConf.slideWndXMin = self.m_oSlideWndConf.slideWndXMin - iOffsetXInDB;
            self.m_oSlideWndConf.slideWndYMin = self.m_oSlideWndConf.slideWndYMin - iOffsetYInDB;

            //3.calllback
            oAfterUpdateSlideWndXYByDrag();
        };

        var _calcUIOffsetToDBOffset = function(iOffsetX, oSlideWndConf){
            var iZoomrate = oSlideWndConf.slideWndZ;
            return iOffsetX / iZoomrate;
        };

        //endregion

        //region updateSlideWndXMinYMinBy3rd

        /**
         * 第三方调用者更新滑动窗口的XMin/YMin，例如选中网元、链路时需要居中
         * @param oFirstNode
         */
        this.updateSlideWndXMinYMinBy3rd = function(oFirstNode){
            self.m_oSlideWndConf.slideWndXMin = oFirstNode.params.x - (self.m_oSlideWndConf.slideWndW / 2);
            self.m_oSlideWndConf.slideWndYMin = oFirstNode.params.y - (self.m_oSlideWndConf.slideWndH / 2);
        };

        //endregion

        //region updateSlideWndWH

        /**
         * 根据当前容器的变化，来更新滑动窗口的slideWndW/slideWndH
         * @param strContainerId
         */
        this.updateSlideWndWH = function(strContainerId){
            var iOldSlideWndW = self.m_oSlideWndConf.slideWndW;
            var iOldSlideWndH = self.m_oSlideWndConf.slideWndH;
            self.m_oSlideWndConf.slideWndW = iOldSlideWndW + ($("#" + strContainerId).width() - iOldSlideWndW * self.m_oSlideWndConf.slideWndZ)/self.m_oSlideWndConf.slideWndZ;
            self.m_oSlideWndConf.slideWndH = iOldSlideWndH + ($("#" + strContainerId).height() - iOldSlideWndH * self.m_oSlideWndConf.slideWndZ)/self.m_oSlideWndConf.slideWndZ;
        };

        //endregion

        //region updateSlideWndOption4BestView

        /**
         * 点击最佳视图时，更新滑动窗口的配置
         *
         * @param oBuTopo4Merge
         * @param iOffsetLeft
         * @param iOffsetRight
         * @param iOffsetTop
         * @param iOffsetBottom
         * @param strBestViewType
         */
        this.updateSlideWndOption4BestView = function(oBuTopo4Merge,
                                               iOffsetLeft,
                                               iOffsetRight,
                                               iOffsetTop,
                                               iOffsetBottom,
                                               strBestViewType){
            //1.确定arrNodes的范围
            var arrNodes = [];
            strBestViewType = (strBestViewType == undefined) ? "all":strBestViewType;
            if(strBestViewType == "all"){
                arrNodes = oBuTopo4Merge.nodes;
            }
            else if(strBestViewType == "area"){
                $.each(arrNodes, function(iIndex, oNode){
                    if(oNode.params.isSelect){
                        arrNodes.push(oNode);
                    }
                });
            }
            if(undefined == arrNodes || arrNodes.length == 0){
                return;
            }

            //2.初始化iOffsetLeft/Top/Right/Bottom
            if(undefined == iOffsetLeft){
                iOffsetLeft = 0;
            }
            if(undefined == iOffsetRight){
                iOffsetRight = 0;
            }
            if(undefined == iOffsetTop){
                iOffsetTop = 0;
            }
            if(undefined == iOffsetBottom){
                iOffsetBottom = 0;
            }

            //3.获得父容器可视范围的宽和高
            var oCanvasSlideWH = {
                w: $("#" + self.m_strContainerId).width(),
                h: $("#" + self.m_strContainerId).height()
            };

            //4.获得选中网元中最大坐标和最小坐标
            var iMinX = arrNodes[0].params.x;
            var iMaxX = arrNodes[0].params.x;
            var iMinY = arrNodes[0].params.y;
            var iMaxY = arrNodes[0].params.y;
            for(var i = 0; i < arrNodes.length; i++){
                var oNode = arrNodes[i];
                if(oNode.params.x > iMaxX){
                    iMaxX = oNode.params.x;
                }
                if(oNode.params.x < iMinX){
                    iMinX = oNode.params.x;
                }
                if(oNode.params.y > iMaxY){
                    iMaxY = oNode.params.x;
                }
                if(oNode.params.y < iMinY){
                    iMinY = oNode.params.y;
                }
            }

            //5.重新计算，获得新的m_oSlideWndConf的.slideWndZ
            var iZoomRateW = (oCanvasSlideWH.w - iOffsetLeft - iOffsetRight)/(iMaxX - iMinX + 100);
            var iZoomRateH = (oCanvasSlideWH.w - iOffsetTop - iOffsetBottom) / (iMaxY - iMinY + 100);
            if(iZoomRateW < iZoomRateH){
                self.m_oSlideWndConf.slideWndZ = iZoomRateW;
            }
            else{
                self.m_oSlideWndConf.slideWndZ = iZoomRateH;
            }

            //6.重新计算，获得新的m_oSlideWndConf的
            // slideWndXMin/slideWndYMin/slideWndW/slideWndH
            var iCenterX = (iMinX + iMaxX) / 2;
            var iCenterY = (iMinY + iMaxY) / 2;
            self.m_oSlideWndConf.slideWndW = oCanvasSlideWH.w / self.m_oSlideWndConf.slideWndZ;
            self.m_oSlideWndConf.slideWndH = oCanvasSlideWH.h / self.m_oSlideWndConf.slideWndZ;
            var iOffsetLeftProfile = iOffsetLeft / self.m_oSlideWndConf.slideWndZ;
            var iOffsetRightProfile = iOffsetRight / self.m_oSlideWndConf.slideWndZ;
            self.m_oSlideWndConf.slideWndXMin = iCenterX - ((self.m_oSlideWndConf.slideWndW - iOffsetLeftProfile - iOffsetRightProfile) / 2) - iOffsetLeftProfile;
            self.m_oSlideWndConf.slideWndYMin = iCenterY - (self.m_oSlideWndConf.slideWndH / 2);
        };

        //endregion

        //region updateTopoViewByLastConfig

        /**
         * 根据oLastConfig，恢复上次的滑动窗口的位置
         * 潜规则：
         * oLastConfig = {
         *  slideWndXMin:
         *  slideWndYMin:
         *  slideWndZ:
         * }
         * @param oLastConfig
         */
        this.updateTopoViewByLastConfig = function(oLastConfig){
            self.m_oSlideWndConf.slideWndXMin = oLastConfig.slideWndXMin;
            self.m_oSlideWndConf.slideWndYMin = oLastConfig.slideWndYMin;
            var iWidth = $("#" + self.m_strContainerId).width();
            var iHeight = $("#" + self.m_strContainerId).height();
            self.m_oSlideWndConf.slideWndW = iWidth/ oLastConfig.slideWndZ;
            self.m_oSlideWndConf.slideWndH = iHeight/ oLastConfig.slideWndZ;
        };

        //endregion
    }
})(jQuery);