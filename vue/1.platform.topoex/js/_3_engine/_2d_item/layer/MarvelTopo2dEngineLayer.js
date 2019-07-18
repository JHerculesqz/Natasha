(function ($) {
    $.MarvelTopo2dEngineLayer = function (oParent) {
        var self = this;

        //region Const

        this.WIDGET_NAME = "MarvelTopo2dEngineLayer";

        var DEFAULT_LAYER_KEY = "NO_LAYER";
        var DEFAULT_LAYER_BG_COLOR = [
            "#71cec4", "#71ce89", "#b771ce", "#ceaa71", "#ce7171", "#c0ce71", "#717ece"
        ];
        var DEFAULT_LAYER_BG_ALL_COLOR = "#b3c2df";
        var DEFAULT_ALPHA_LAYER = 0.5;
        var DEFAULT_ALPHA_BG = 0.2;
        var DEFAULT_OFFSET_X = 50;

        var DEFAULT_OFFSET_Y_TOP = 30;
        var DEFAULT_OFFSET_Y_BOTTOM = 30;

        //endregion

        //region Fields

        var m_oParent = oParent;

        this.m_oLayerConf = undefined;
        this.m_oLayerCache = {};

        //endregion

        //#region drawLayer

        /**
         * 根据间接的原始数据，判断有几个伪3D图层，最终绘制伪3D的图层
         * @param oCanvasContext
         * @param oProfile
         * @param arrNodes
         * @param iCanvasWidth
         */
        this.drawLayer = function (oCanvasContext, oProfile, arrNodes,
                                   iCanvasWidth) {
            var oNode;
            if (self.m_oLayerConf) {
                for (var i = 0; i < arrNodes.length(); i++) {
                    oNode = arrNodes[i];
                    var oBgLayer = self.m_oLayerConf[oNode.params.uiLayer];
                    oNode.params.point1 = {
                        x: oBgLayer.point1.x,
                        y: oBgLayer.point1.y
                    };
                    oNode.params.point2 = {
                        x: oBgLayer.point2.x,
                        y: oBgLayer.point2.y
                    };
                    oNode.params.point3 = {
                        x: oBgLayer.point3.x,
                        y: oBgLayer.point3.y
                    };
                    oNode.params.point4 = {
                        x: oBgLayer.point4.x,
                        y: oBgLayer.point4.y
                    };
                }
                for (var bgLayerKey in self.m_oLayerConf) {
                    var oLayerConf = self.m_oLayerConf[bgLayerKey];
                    oCanvasContext.globalAlpha = DEFAULT_ALPHA_BG;
                    oCanvasContext.lineWidth = 1.5;
                    oCanvasContext.fillStyle = oLayerConf._layerColor;
                    oCanvasContext.beginPath();
                    oCanvasContext.moveTo(oLayerConf.point1.x, oLayerConf.point1.y);
                    oCanvasContext.lineTo(oLayerConf.point2.x, oLayerConf.point2.y);
                    oCanvasContext.lineTo(oLayerConf.point3.x, oLayerConf.point3.y);
                    oCanvasContext.lineTo(oLayerConf.point4.x, oLayerConf.point4.y);
                    oCanvasContext.lineTo(oLayerConf.point1.x, oLayerConf.point1.y);
                    oCanvasContext.fill();
                    oCanvasContext.closePath();
                    oCanvasContext.globalAlpha = 1.0;

                    oCanvasContext.font = "14px arial";
                    oCanvasContext.fillStyle = "#4d4d4d";

                    oLayerConf.layerText = CString.htmlDecode(oLayerConf.layerText + "");
                    oCanvasContext.fillText(oLayerConf.layerText,
                        oLayerConf.layerX + 30, oLayerConf.layerY + oLayerConf.layerH - 20);
                    oCanvasContext.globalAlpha = 1.0;
                }
                return;
            }

            var mapLayerNodes = [];
            //1.分组
            for (var j = 0; j < arrNodes.length; j++) {
                oNode = arrNodes[j];
                var strLayerKey = oNode.params.uiLayer;
                if (strLayerKey === undefined || strLayerKey === null) {
                    strLayerKey = DEFAULT_LAYER_KEY;
                }
                if (mapLayerNodes[strLayerKey] === undefined || mapLayerNodes[strLayerKey] === null) {
                    mapLayerNodes[strLayerKey] = {
                        nodes: [],
                        minX: 0,
                        minY: 0,
                        maxX: 0,
                        maxY: 0,
                        name: strLayerKey,
                        layerText: oNode.params.uiLayerText,
                        bgColor: oNode.params.uiLayerColor
                    };
                    if (oNode.params.uiLayerBgOffset) {
                        mapLayerNodes[strLayerKey].bgOffset = oNode.params.uiLayerBgOffset;
                    }
                    else {
                        mapLayerNodes[strLayerKey].bgOffset = 0;
                    }
                    mapLayerNodes[strLayerKey].nodes.push(oNode);
                }
                else {
                    mapLayerNodes[strLayerKey].nodes.push(oNode);
                }
            }

            var arrLayerKey4Del = [];
            for (var strLayerKeyCache in self.m_oLayerConf) {
                if (undefined === mapLayerNodes[strLayerKeyCache] ||
                    null === mapLayerNodes[strLayerKeyCache]) {
                    arrLayerKey4Del.push(strLayerKeyCache);
                }
            }
            for (var k = 0; k < arrLayerKey4Del.length; k++) {
                delete self.m_oLayerCache[arrLayerKey4Del[k]];
            }

            //2.判断layer的层数，如果小于等于1层，则不需要画分层展示的伪3D背景
            if (Object.keys(mapLayerNodes).length < 1) {
                return;
            }
            if (Object.keys(mapLayerNodes).length == 1) {
                var strKey = Object.keys(mapLayerNodes)[0];
                if (strKey == DEFAULT_LAYER_KEY) {
                    return;
                }
            }

            for (var strLayerKeyEx in mapLayerNodes) {
                if (undefined === self.m_oLayerCache[strLayerKeyEx] ||
                    null === self.m_oLayerCache[strLayerKeyEx]) {
                    self.m_oLayerCache[strLayerKeyEx] = {};
                }
            }

            //3.如果大于1层，则需要画分层展示的伪3D背景，算出每一层iMinX, iMinY, iMaxX, iMaxY
            var iIndex = 0;
            var iBgOffset = 0;
            for (var strLayerKeyMap in mapLayerNodes) {
                var oLayerItem = mapLayerNodes[strLayerKeyMap];
                oLayerItem.layerKey = strLayerKeyMap;
                iBgOffset = oLayerItem.bgOffset;
                _genLayerMinMaxPoint(oLayerItem.nodes, oProfile, oLayerItem, iCanvasWidth);

                //绘制伪3DLayer
                _drawLayer(oCanvasContext, oLayerItem, oProfile.slideWndZ);
                iIndex++;
            }

            //3.绘制伪3D背景图层
            _drawLayerBg(oCanvasContext, mapLayerNodes, iCanvasWidth, iBgOffset);
        };

        var _genLayerMinMaxPoint = function (arrNodes, oProfile, oLayerItem, iCanvasWidth) {
            var iMinPosY = arrNodes[0].params.uiPosY;
            var iMinY = arrNodes[0].params.y;
            var iMaxPosY = arrNodes[0].params.uiPosY;
            var iMaxY = arrNodes[0].params.y;

            if (arrNodes.length > 1) {
                for (var i = 1; i < arrNodes.length; i++) {
                    var oNode = arrNodes[i];
                    var uiPosY = oNode.params.uiPosY;
                    if (iMinPosY > uiPosY) {
                        iMinPosY = uiPosY;
                        iMinY = oNode.params.y;
                    }
                    if (iMaxPosY < uiPosY) {
                        iMaxPosY = uiPosY;
                        iMaxY = oNode.params.y;
                    }
                }
            }

            if (self.m_oLayerCache[oLayerItem.name].minMaxY === undefined ||
                self.m_oLayerCache[oLayerItem.name].minMaxY === null) {
                self.m_oLayerCache[oLayerItem.name].minMaxY = {
                    minY: iMinY - DEFAULT_OFFSET_Y_TOP,
                    maxY: iMinY - DEFAULT_OFFSET_Y_BOTTOM,
                };
            }
            else {
                if (iMinY < self.m_oLayerCache[oLayerItem.name].minMaxY.minY) {
                    self.m_oLayerCache[oLayerItem.name].minMaxY.minY = iMinY - DEFAULT_OFFSET_Y_TOP;
                }
                if (iMaxY < self.m_oLayerCache[oLayerItem.name].minMaxY.minY) {
                    self.m_oLayerCache[oLayerItem.name].minMaxY.maxY = iMaxY + DEFAULT_OFFSET_Y_BOTTOM;
                }
                var oMinMaxRes = _updateNodeDbPos2ScreenPos(self.m_oLayerCache[oLayerItem.name].minMaxY, oProfile);
                var oMinMaxRes4X = _updateNodeDbPos2ScreenPos4X({
                    minX: DEFAULT_OFFSET_X,
                    maxX: iCanvasWidth - DEFAULT_OFFSET_X
                }, oProfile);
                var oMinMax4XOnDb = _updateNodeScreenPos2DbPos4X(oMinMaxRes4X, oProfile);
                oLayerItem.minX = oMinMaxRes4X.minX + oLayerItem.bgOffset;
                oLayerItem.minY = oMinMaxRes.minY;
                oLayerItem.maxX = oMinMaxRes.maxX;
                oLayerItem.maxY = oMinMaxRes.maxY + (arrNodes[0].params.uiImgH + 15) * oProfile.slideWndZ;

                for (var j = 0; j < arrNodes.length; j++) {
                    var oNodeEx = arrNodes[j];
                    oNodeEx.params.point1 = {
                        x: oMinMax4XOnDb.minX + oLayerItem.bgOffset,
                        y: self.m_oLayerCache[oLayerItem.name].minMaxY.minY
                    };
                    oNodeEx.params.point2 = {
                        x: oMinMax4XOnDb.minX + oLayerItem.bgOffset - DEFAULT_OFFSET_X,
                        y: self.m_oLayerCache[oLayerItem.name].minMaxY.maxY + oNodeEx.params.uiImgH
                    };
                    oNodeEx.params.point3 = {
                        x: oMinMax4XOnDb.maxX,
                        y: self.m_oLayerCache[oLayerItem.name].minMaxY.maxY + oNodeEx.params.uiImgH
                    };
                    oNodeEx.params.point4 = {
                        x: oMinMax4XOnDb.maxX + DEFAULT_OFFSET_X,
                        y: self.m_oLayerCache[oLayerItem.name].minMaxY.minY
                    };
                }
            }
        };
        var _updateNodeDbPos2ScreenPos = function (oPoint, oProfile) {
            var oMinMaxRes = {
                minX: 0,
                maxX: 0
            };
            var iYMin = oProfile.slideWndXMin;
            var iZoomRate = oProfile.slideWndZ;
            oMinMaxRes.minY = parseInt((oPoint.minY - iYMin) * iZoomRate);
            oMinMaxRes.maxY = parseInt((oPoint.maxY - iYMin) * iZoomRate);
            return oMinMaxRes;
        };
        var _updateNodeDbPos2ScreenPos4X = function (oPoint, oProfile) {
            var oMinMaxRes = {
                minX: 0,
                maxX: 0
            };

            var iXMin = oProfile.slideWndXMin;
            var iZoomRate = oProfile.slideWndZ;
            oMinMaxRes.minX = (oPoint.minX - iXMin) * iZoomRate;
            oMinMaxRes.maxX = (oPoint.maxX - iXMin) * iZoomRate;
            if (oMinMaxRes.minX > oPoint.minX) {
                oMinMaxRes.minX = oPoint.minX;
            }
            if (oMinMaxRes.maxX < oPoint.maxX) {
                oMinMaxRes.maxX = oPoint.maxX;
            }
            return oMinMaxRes;
        };
        var _updateNodeScreenPos2DbPos4X = function (oPoint, oProfile) {
            var oMinMaxRes = {
                minX: 0,
                maxX: 0
            };
            var iXMin = oProfile.slideWndXMin;
            var iZoomRate = oProfile.slideWndZ;
            oMinMaxRes.minX = parseInt((oPoint.minX / iZoomRate + iXMin));
            oMinMaxRes.maxX = parseInt((oPoint.maxX / iZoomRate + iXMin));
            return oMinMaxRes;
        };
        var _drawLayer = function (oCanvasContext, oLayerItem, iSlideWndZ) {
            oCanvasContext.globalAlpha = DEFAULT_ALPHA_LAYER;
            oCanvasContext.lineWidth = 1.5;
            oCanvasContext.fillStyle = oLayerItem.bgColor;
            oCanvasContext.beginPath();
            oCanvasContext.moveTo(oLayerItem.minX, oLayerItem.minY);
            oCanvasContext.lineTo(oLayerItem.minX - DEFAULT_OFFSET_X, oLayerItem.maxY);
            oCanvasContext.lineTo(oLayerItem.maxX, oLayerItem.maxY);
            oCanvasContext.lineTo(oLayerItem.maxX + DEFAULT_OFFSET_X, oLayerItem.minY);
            oCanvasContext.lineTo(oLayerItem.minX, oLayerItem.minY);
            oCanvasContext.fill();
            oCanvasContext.closePath();
            oCanvasContext.globalAlpha = 1.0;
            oCanvasContext.font = "14px arial";
            oCanvasContext.fillStyle = "#fff";

            oCanvasContext.save();
            var iZoomRate = iSlideWndZ > 1 ? 1: iSlideWndZ;
            var iStartLabelX = oLayerItem.minX - DEFAULT_OFFSET_X + 40;
            var iStartLabelY = oLayerItem.maxY - 10;
            oCanvasContext.setTransform(iZoomRate, 0, 0, iZoomRate, 0, 0);
            oLayerItem.layerText = CString.htmlDecode(oLayerItem.layerText + "");
            oCanvasContext.fillText(oLayerItem.layerText, iStartLabelX / iZoomRate,
                iStartLabelY / iZoomRate);
            oCanvasContext.restore();
            oCanvasContext.globalAlpha = 1.0;
        };
        var _drawLayerBg = function (oCanvasContext, mapLayerNodes, iCanvasWidth, iBgOffset) {
            var iMaxMinY = 0;
            var iMinMaxY = 10000;

            //1.算出最大的iMaxMinY
            for(var strLayerKey in mapLayerNodes){
                var oLayerItem = mapLayerNodes[strLayerKey];
                if(iMaxMinY < oLayerItem.minY){
                    iMaxMinY = oLayerItem.minY;
                }
                if(iMinMaxY < oLayerItem.minY){
                    iMinMaxY = oLayerItem.minY;
                }
            }

            //2.绘制Bg
            oCanvasContext.globalAlpha = DEFAULT_ALPHA_BG;
            oCanvasContext.lineWidth = 1.5;
            oCanvasContext.fillStyle = DEFAULT_LAYER_BG_ALL_COLOR;
            oCanvasContext.beginPath();
            oCanvasContext.moveTo(DEFAULT_OFFSET_X + iBgOffset, iMinMaxY);
            oCanvasContext.lineTo(DEFAULT_OFFSET_X + iBgOffset, iMaxMinY);
            oCanvasContext.lineTo(iCanvasWidth, iMaxMinY);
            oCanvasContext.lineTo(iCanvasWidth, iMinMaxY);
            oCanvasContext.lineTo(DEFAULT_OFFSET_X + iBgOffset, iMinMaxY);
            oCanvasContext.fill();
            oCanvasContext.closePath();
            oCanvasContext.globalAlpha = 1.0;
        };

        //#endregion

        //region drawTopoLayer

        /**
         * 根据直接的原始数据(已明确有几个伪3D图层)，最终绘制伪3D的图层
         * @param arrLayerConf
         * @param oCanvasContext
         */
        this.drawTopoLayer = function (arrLayerConf, oCanvasContext) {
            this.m_oLayerConf = {};
            for (var i = 0; i < arrLayerConf.length; i++) {
                var oLayerConf = arrLayerConf[i];
                self.m_oLayerConf[oLayerConf.layerKey] = {};
                $.extend(self.m_oLayerConf[oLayerConf.layerKey], oLayerConf);
                self.m_oLayerConf[oLayerConf.layerKey].point1 = {
                    x: oLayerConf.layerX + DEFAULT_OFFSET_X,
                    y: oLayerConf.layerY
                };
                self.m_oLayerConf[oLayerConf.layerKey].point2 = {
                    x: oLayerConf.layerX,
                    y: oLayerConf.layerY + oLayerConf.layerH
                };
                self.m_oLayerConf[oLayerConf.layerKey].point3 = {
                    x: oLayerConf.layerX + oLayerConf.layerW,
                    y: oLayerConf.layerY + oLayerConf.layerH
                };
                self.m_oLayerConf[oLayerConf.layerKey].point4 = {
                    x: oLayerConf.layerX + DEFAULT_OFFSET_X + oLayerConf.layerW,
                    y: oLayerConf.layerY
                };
            }

            for (var bgLayerKey in self.m_oLayerConf) {
                var oLayerConfEx = self.m_oLayerConf[bgLayerKey];
                oCanvasContext.globalAlpha = DEFAULT_ALPHA_BG;
                oCanvasContext.lineWidth = 1.5;
                oCanvasContext.fillStyle = oLayerConfEx.layerColor;
                oCanvasContext.beginPath();
                oCanvasContext.moveTo(oLayerConfEx.point1.x, oLayerConfEx.point1.y);
                oCanvasContext.lineTo(oLayerConfEx.point2.x, oLayerConfEx.point2.y);
                oCanvasContext.lineTo(oLayerConfEx.point3.x, oLayerConfEx.point3.y);
                oCanvasContext.lineTo(oLayerConfEx.point4.x, oLayerConfEx.point4.y);
                oCanvasContext.lineTo(oLayerConfEx.point1.x, oLayerConfEx.point1.y);
                oCanvasContext.fill();
                oCanvasContext.closePath();
                oCanvasContext.globalAlpha = 1.0;

                oCanvasContext.font = "14px arial";
                oCanvasContext.fillStyle = "#4d4d4d";

                oLayerConfEx.layerText = CString.htmlDecode(oLayerConfEx.layerText + "");
                oCanvasContext.fillText(oLayerConfEx.layerText,
                    oLayerConfEx.layerX + 30, oLayerConfEx.LayerY + oLayerConfEx.layerH - 20);
                oCanvasContext.globalAlpha = 1.0;
            }
        };

        //endregion

        //region clearTopoLayer4SwitchTopo

        /**
         * 清除间接原始数据用到的伪3D图层的缓存
         */
        this.clearTopoLayer4SwitchLayer = function () {
            self.m_oLayerCache = {};
        };

        /**
         * 清除直接原始数据用到的伪3D图层的缓存
         */
        this.clearTopoLayer4SwitchTopo = function () {
            self.m_oLayerConf = undefined;
        };

        //endregion
    }
})(jQuery);