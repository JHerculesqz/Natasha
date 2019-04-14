(function ($) {
    /**
     * Marker/Icon/DivIcon/Circle
     */
    $.MarvelGisNode = function () {
        //region Const

        const STATUS_EMPTY = "";
        const STATUS_START = "start";

        //endregion

        //region fields
        var self = this;

        var createMarkData = {
            status: STATUS_EMPTY,
            buObj: undefined,
            callback: undefined,
            autoCreate: true,
        };
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

        var _onMarkClick = function (oMarker, oGis) {
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

        var _onPolygonMouseover = function (oPolygon, oGis) {
            oPolygon.on("mouseover", function () {
                oPolygon.setStyle({
                    color: "#ffa600",
                    weight: 5
                });
            });
        };

        var _onPolygonMouseout = function (oPolygon, oGis) {
            oPolygon.on("mouseout", function () {
                oPolygon.setStyle({
                    color: oPolygon.buObj.uiColor,
                    weight: 2
                });
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
                // className: "leaflet-customer-icon",
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
            //popup
            var oPopup = L.popup({
                maxWidth: 99999999,
            }).setContent(oBuObj.uiTips);
            oMarker.bindPopup(oPopup);

            //label
            if (oGis.Stage.config.showLabel && oBuObj.uiLabel !== "") {
                var toolTip = L.tooltip({
                    direction: "bottom",
                    permanent: true,
                    sticky: false,
                    className: "leaflet-customer-label",
                    offset: [0, iImgWidth / 2],
                }).setContent(oBuObj.uiLabel);
                oMarker.bindTooltip(toolTip);
            }

            //addToMap
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
                if (oMarker.attachIcon) {
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

        this.hideLabel = function (oMarker) {
            if (oMarker) {
                oMarker.closeTooltip();
            }
        };

        this.showLabel = function (oMarker) {
            if (oMarker) {
                oMarker.openTooltip();
            }
        };

        this.showLabelByIds = function (arrIds, oGis) {
            arrIds.forEach(function (strId) {
                var oMarker = oGis.Layer.findById(strId, oGis);
                self.showLabel(oMarker);
            });
        };

        this.hideLabelByIds = function (arrIds, oGis) {
            arrIds.forEach(function (strId) {
                var oMarker = oGis.Layer.findById(strId, oGis);
                self.hideLabel(oMarker);
            });
        };

        //endregion

        //#region attachMarker

        this.addAttachedIcon4Marker = function (strId, strImgUrl, oGis) {
            //找到Marker
            var oMarker = oGis.Layer.findById(strId, oGis);
            if (oMarker) {
                var oConfig = {};
                if (strImgUrl !== "") {
                    var oIcon = L.icon({
                        iconUrl: strImgUrl,
                        iconSize: [18, 36],
                        iconAnchor: [9, 36]
                    });
                    oConfig.icon = oIcon;
                }
                var oAttachedIcon = L.marker([oMarker._latlng.lat, oMarker._latlng.lng], oConfig);

                oMarker.attachIcon = oAttachedIcon;
                oAttachedIcon.addTo(oGis.Stage.mapObj);
            }
        };

        this.delAttachedIcon4Marker = function (strId, oGis) {
            //找到Marker
            var oMarker = oGis.Layer.findById(strId, oGis);
            if (oMarker) {
                if (oMarker.attachIcon) {
                    oMarker.attachIcon.remove();
                }
            }
        };

        //#endregion

        //region createMarker

        this.createMarker = function (oBuObj, oAfterCallback, bAutoCreate, oGis) {
            //updateModel
            oGis.Stage.updateModel(oGis.Stage.MODEL_CREATE_MARK);
            //updateCache
            createMarkData.status = STATUS_START;
            createMarkData.buObj = oBuObj;
            createMarkData.callback = oAfterCallback;
            createMarkData.autoCreate = bAutoCreate;
        };

        this.stageEventMouseOver = function (oEvent, oGis) {
            if (createMarkData.status == STATUS_START) {
                //updateBuObj x/y
                createMarkData.buObj.x = oEvent.latlng.lat;
                createMarkData.buObj.y = oEvent.latlng.lng;
                //drawMark
                var oBuObj = createMarkData.buObj;
                self.addMarker(oBuObj.id, oBuObj.x, oBuObj.y,
                    oBuObj.uiImgUrl, oBuObj.uiImgWidth,
                    oBuObj, oGis);
            }
        };

        this.stageEventMouseDown = function (oEvent, oGis) {
            if (createMarkData.status == STATUS_START) {
                //updatePos
                _updateMarkerPos(oEvent, oGis);
                //createMarkerEnd
                _createMarkerEnd(true, oGis);
            }
        };

        var _createMarkerEnd = function (bSuccessful, oGis) {
            //updateModel
            oGis.Stage.updateModel(oGis.Stage.MODEL_EMPTY);
            //autoCreate
            if (createMarkData.autoCreate === false) {
                self.delMarker(createMarkData.buObj.id, oGis);
            }
            //callback
            if (typeof createMarkData.callback == "function") {
                createMarkData.callback(bSuccessful, createMarkData.buObj);
            }
            //updateCache
            createMarkData.status = STATUS_EMPTY;
            createMarkData.buObj = undefined;
            createMarkData.callback = undefined;
            createMarkData.autoCreate = true;
        };

        this.stageEventMouseOut = function (oEvent, oGis) {
            if (createMarkData.status == STATUS_START) {
                self.delMarker(createMarkData.buObj.id, oGis);
            }
        };

        this.stageEventMouseMove = function (oEvent, oGis) {
            if (createMarkData.status == STATUS_START) {
                _updateMarkerPos(oEvent, oGis);
            }
        };

        var _updateMarkerPos = function (oEvent, oGis) {
            var iX = oEvent.latlng.lat;
            var iY = oEvent.latlng.lng;
            createMarkData.buObj.x = iX;
            createMarkData.buObj.y = iY;
            self.setPos4Marker(createMarkData.buObj.id, iX, iY, oGis);
        };

        this.eventEscPress = function (oEvent, oGis) {
            if (createMarkData.status == STATUS_START) {
                //删除
                self.delMarker(createMarkData.buObj.id, oGis);
                //createMarkerEnd
                _createMarkerEnd(false, oGis);
            }
        };

        //endregion

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

        this.setOpacity4Circle = function (strId, iOpacity, oGis) {
            var oCircle = oGis.Layer.findById(strId, oGis);
            if (oCircle) {
                oCircle.setStyle({
                    opacity: iOpacity
                });
            }
        };

        //endregion

        //region Polygon

        this.addPolygon = function (strId, arrPoints, oBuObj, oGis) {
            //region init
            var oPolygon = L.polygon(arrPoints, {
                color: oBuObj.uiColor,
                weight: 2,
                //opacity: 0.8,
                fillOpacity: 0.5,
                dashArray: "5,5",
                fillColor: oBuObj.uiFillColor
            });
            oPolygon.id = strId;
            oPolygon.buObj = oBuObj;
            oPolygon.bindPopup(oBuObj.uiTips);
            oPolygon.addTo(oGis.Stage.mapObj);
            //endregion

            //region event
            _onPolygonMouseover(oPolygon, oGis);
            _onPolygonMouseout(oPolygon, oGis);
            //endregion
        };

        this.delPolygon = function (strId, oGis) {
            var oPolygon = oGis.Layer.findById(strId, oGis);
            if (oPolygon) {
                oPolygon.remove();
            }
        };

        //endregion

        //endregion
    }
})(jQuery);
