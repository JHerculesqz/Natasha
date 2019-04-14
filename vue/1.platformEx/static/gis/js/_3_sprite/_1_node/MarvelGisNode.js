(function ($) {
    /**
     * Marker/Icon/DivIcon/Circle
     */
    $.MarvelGisNode = function () {
        var self = this;

        //region Const

        //endregion

        //region init

        //endregion

        //region event

        var _onMarkerDBClick = function (oMarker,
                                         oGis) {
            oMarker.on("dblclick", function (e) {
                oGis.Stage.eventHandler.callbackOnNodeDblClick(e);
            });
        };

        var _onMarkerDrag = function (oMarker, oGis) {
            oMarker.on("dragend", function (e) {
                oGis.Stage.eventHandler.callbackOnNodeDrag(e);
            });
        };

        var _onMarkClick = function(oMarker, oGis){
            oMarker.on("click", function (e) {
                oGis.Stage.eventHandler.callbackOnNodeClick(e);
            });
        };

        var _onMarkerContextMenu = function (oMarker, oGis) {
            oMarker.on("contextmenu", function (e) {
                oGis.Stage.eventHandler.callbackOnNodeContextMenu(e);
            });
        };

        var _onCircleDBClick = function (oCircle, oGis) {
            oCircle.on("dblclick", function (e) {
                oGis.Stage.eventHandler.callbackOnCircleDblclick(e);
            });
        };

        //endregion

        //region imsg

        //region Marker

        //region addMarker

        this.addMarker = function (strId, iX, iY,
                                   strImgUrl, iImgWidth,
                                   oBuObj,
                                   oGis) {
            //region init

            var oMarker = _initMarker(strId, iX, iY,
                strImgUrl, iImgWidth,
                oBuObj,
                oGis);

            //endregion

            //region event

            _onMarkerDBClick(oMarker, oGis);
            _onMarkerDrag(oMarker, oGis);
            _onMarkClick(oMarker, oGis);
            _onMarkerContextMenu(oMarker, oGis);

            //endregion
        };

        var _initMarker = function (strId, iX, iY, strImgUrl, iImgWidth,
                                    oBuObj, oGis) {
            var oIcon = L.icon({
                // html: "<div style='margin-top:" + iImgWidth + "px;'>" + oBuObj.uiLabel + "</div>",
                // className: strImgUrl,
                iconUrl: strImgUrl,
                iconSize: [iImgWidth, iImgWidth],
                iconAnchor: [iImgWidth / 2, iImgWidth / 2],
                popupAnchor: [0, -iImgWidth / 2]
            });
            var oMarker = L.marker([iX, iY], {
                icon: oIcon,
                draggable: oBuObj.uiDraggable == undefined ? false : oBuObj.uiDraggable,
                opacity: oBuObj.uiOpacity == undefined ? 1 : oBuObj.uiOpacity,
            });
            oMarker.id = strId;
            oMarker.buObj = oBuObj;
            oMarker.bindPopup(oBuObj.uiTips);
            oMarker.addTo(oGis.Stage.mapObj);

            return oMarker;
        };

        this.addMarker4Group = function (strId, iX, iY, strImgUrl, iImgWidth,
                                         oBuObj, oGis,
                                         oCallbackOnMarkerDBlClick,
                                         oCallbackOnMarkerClick) {
            //region init

            var oMarker = _initMarker(strId, iX, iY, strImgUrl, iImgWidth,
                oBuObj, oGis);

            //endregion

            //region event

            oMarker.on("dblclick", function (e) {
                oCallbackOnMarkerDBlClick(e);
            });
            oMarker.on("click", function (e) {
                oCallbackOnMarkerClick(e);
            });

            //endregion
        };

        //endregion

        //region delMarker

        this.delMarker = function (strId, oGis) {
            var oMarker = oGis.Layer.findById(strId, oGis);
            if (oMarker) {
                oMarker.remove();
                //删除附属图标
                if(oMarker.attachIcon){
                    oMarker.attachIcon.remove();
                }
            }
        };

        //endregion

        //region updateMarker

        this.setImgUrl = function (strId, strImgUrl, iImgWidth, oGis) {
            var oMarker = oGis.Layer.findById(strId, oGis);
            if (oMarker) {
                var oIcon = L.icon({
                    // html: "<div style='margin-top:" + iImgWidth + "px;'>" + oMarker.buObj.uiLabel + "</div>",
                    // className: strImgUrl,
                    iconUrl: strImgUrl,
                    iconSize: [iImgWidth, iImgWidth],
                    iconAnchor: [iImgWidth / 2, iImgWidth / 2],
                    popupAnchor: [0, -iImgWidth / 2]
                });
                oMarker.setIcon(oIcon);
            }
        };

        this.setOpacity4Marker = function (strId, iOpacity, oGis) {
            var oMarker = oGis.Layer.findById(strId, oGis);
            if (oMarker) {
                oMarker.setOpacity(iOpacity);
            }
        };

        this.setPos4Marker = function (strId, iX, iY, oGis) {
            var oMarker = oGis.Layer.findById(strId, oGis);
            if (oMarker) {
                var oPos = L.latLng(iX, iY);
                oMarker.setLatLng(oPos);
            }
        };

        this.setTips4Marker = function (strId, strTips, oGis) {
            var oMarker = oGis.Layer.findById(strId, oGis);
            if (oMarker) {
                oMarker.setPopupContent(strTips);
            }
        };

        this.setBuObj4Marker = function (strId, oBuObj, oGis) {
            var oMarker = oGis.Layer.findById(strId, oGis);
            if (oMarker) {
                oMarker.buObj = oBuObj;
            }
        };

        this.setHide4Marker = function (strId, bIsHide, oGis) {
            var oMarker = oGis.Layer.findById(strId, oGis);
            if (oMarker) {
                if (bIsHide) {
                    oMarker.setOpacity(0);
                    oMarker.closePopup();
                }
                else {
                    oMarker.setOpacity(1);
                }
            }
        };

        //endregion

        //#region attachMarker

        this.addAttachedIcon4Marker = function(strId, strImgUrl, oGis){
            //找到Marker
            var oMarker = oGis.Layer.findById(strId, oGis);
            if(oMarker){
                var oAttachedIcon = L.marker([oMarker._latlng.lat, oMarker._latlng.lng]);
                oMarker.attachIcon = oAttachedIcon;
                oAttachedIcon.addTo(oGis.Stage.mapObj);
            }
        };

        this.delAttachedIcon4Marker = function(strId, oGis){
            //找到Marker
            var oMarker = oGis.Layer.findById(strId, oGis);
            if(oMarker){
                if(oMarker.attachIcon){
                    oMarker.attachIcon.remove();
                }
            }
        };

        //#endregion

        //endregion

        //region Circle

        this.addCircle = function (strId, iX, iY, iR,
                                   oBuObj, oGis) {
            //region init

            var oCircle = _initCircle(strId, iX, iY, iR, oBuObj, oGis);

            //endregion

            //region event

            _onCircleDBClick(oCircle, oGis);

            //endregion
        };

        var _initCircle = function (strId, iX, iY, iR, oBuObj, oGis) {
            var oCircle = L.circle([iX, iY], {
                color: oBuObj.uiColor,
                fillColor: oBuObj.uiFillColor,
                fillOpacity: oBuObj.uiFillOpacity,
                radius: iR,
            });
            oCircle.id = strId;
            oCircle.buObj = oBuObj;
            oCircle.bindPopup(oBuObj.uiTips);
            oCircle.addTo(oGis.Stage.mapObj);

            return oCircle;
        };

        this.delCircle = function (strId, oGis) {
            var oCircle = oGis.Layer.findById(strId, oGis);
            if (oCircle) {
                oCircle.remove();
            }
        };

        this.addCircle4Group = function (strId, iX, iY, iR, oBuObj, oGis,
                                         oCallbackOnCircleDBClick,
                                         oCallbackOnCircleClick) {
            //region init

            var oCircle = _initCircle(strId, iX, iY, iR, oBuObj, oGis);

            //endregion

            //region event

            oCircle.on("dblclick", function (e) {
                oCallbackOnCircleDBClick();
            });
            oCircle.on("click", function (e) {
                oCallbackOnCircleClick(e);
            });

            //endregion
        };

        this.setOpacity4Circle = function(strId, iOpacity, oGis){
            var oCircle = oGis.Layer.findById(strId, oGis);
            if(oCircle){
                oCircle.setStyle({
                    opacity: iOpacity
                });
            }
        };

        //endregion

        //region Polygon

        this.addPolygon = function (strId, arrPoints, oBuObj, oGis) {
            //region init
            var oPolygon = L.polygon(arrPoints);
            oPolygon.id = strId;
            oPolygon.buObj = oBuObj;
            oPolygon.bindPopup(oBuObj.uiTips);
            oPolygon.addTo(oGis.Stage.mapObj);
            //endregion

            //region event

            //endregion
        };

        //endregion

        //endregion
    }
})(jQuery);
