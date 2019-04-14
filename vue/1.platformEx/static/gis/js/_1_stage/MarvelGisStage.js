(function($){
    $.MarvelGisStage = function() {
        var self = this;

        //region Const

        var URL_GIS_MAP = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={token}';

        //endregion

        //region Fields

        this.mapObj;
        this.eventHandler = {
            //region Stage
            callbackOnZoom: function(e){},
            callbackOnClick: function(e){},
            callbackOnContextmenu: function(e){},
            //endregion
            //region node
            callbackOnNodeDblClick: function(e){},
            callbackOnNodeDrag: function(e){},
            callbackOnNodeClick: function(e){},
            callbackOnCircleDblclick: function(e){},
            callbackOnNodeContextMenu: function (e) {},
            //endregion
            //region nodeGroup
            callbackOnNodeGroupClick: function(e){},
            //endregion
            //region link
            callbackOnLinkClick: function(e){},
            //endregion
        };
        //endregion

        //region init

        this.init = function(strId, iX, iY, iZoom4Init, oOptions, eventOptions){
            //region 0.init tileLayer
            var oTileLayer1 = L.tileLayer(URL_GIS_MAP, {
                attribution: "",
                id: 'mapbox.streets',
                token: "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
            });
            var oTileLayer2 = L.tileLayer(URL_GIS_MAP, {
                attribution: "",
                id: 'mapbox.satellite',
                token: "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
            });
            //endregion

            //region 1.init mapObj
            self.mapObj = L.map(strId, {
                attributionControl: false,
                zoomControl: oOptions.hasZoomCtrl == undefined ? true : oOptions.hasZoomCtrl,
                center: [iX, iY],
                zoom: iZoom4Init,
                worldCopyJump: true,
                doubleClickZoom: false,
                layers:[oTileLayer1, oTileLayer2]
            });
            self.mapObj.doubleClickZoom.disable();
            L.control.scale().addTo(this.mapObj);
            L.control.layers({
                "卫星": oTileLayer2,
                "道路": oTileLayer1,
            }).addTo(this.mapObj);
            //endregion

            //region 2.event
            $.extend(self.eventHandler, eventOptions);
            _onZoom();
            _onClick();
            _onContextMenu();
            //endregion
        };

        //endregion

        //region event

        var _onZoom = function(){
            self.mapObj.on("zoomend", function(e){
                self.eventHandler.callbackOnZoom(e);
            });
        };
        var _onClick = function(){
            self.mapObj.on('click', function(e) {
                self.eventHandler.callbackOnClick(e);
            });
        };
        var _onContextMenu = function () {
            self.mapObj.on('contextmenu', function(e){
                self.eventHandler.callbackOnContextmenu(e);
            });
        };

        //endregion

        //region imsg

        this.setCenter = function(iX, iY, iZoom4Init){
            self.mapObj.setView([iX, iY], iZoom4Init);
        };

        this.showOrHide = function(bIsShow){
            // self.isShow = bIsShow ? "block":"none";
        };

        //endregion
    }
})(jQuery);