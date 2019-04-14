(function ($) {
    $.MarvelDevPanel_5 = function () {
        var self = this;

        //region Const

        var ITEMS = [{
            id: "0",
            name: "整机"
        }, {
            id: "1",
            name: "光学模块"
        }, {
            id: "2",
            name: "光学模块"
        }, {
            id: "33",
            name: "电学模块"
        }, {
            id: "34",
            name: "电学模块"
        }, {
            id: "5",
            name: "主控制板"
        }, {
            id: "6",
            name: "合束模块"
        }, {
            id: "7",
            name: "强电模块"
        }];

        //endregion

        //#region Fields

        //#endregion

        //region init

        this.init = function (oOptions) {
            //#region setUp

            $("#" + oOptions.id).bind("contextmenu", function () {
                return false;
            });

            //#endregion

            //#region items

            ITEMS.forEach(function (oItem) {
                _bindEvent(oItem.id, function () {
                    oOptions.events.click4BD(oItem, this);
                }, function (iX, iY) {
                    oOptions.events.contextMenu4BD(oItem, iX, iY);
                });
            });

            //#endregion
        };

        var _bindEvent = function (strId, oCallbackClick, oCallbackRClick) {
            var oBD0 = SVG.get(strId);
            oBD0.mousedown(function (evt) {
                if (evt.button == 0 || evt.which == 1) {
                    oCallbackClick(this);
                }
                else if (evt.button == 2 || evt.which == 3) {
                    oCallbackRClick(evt.clientX, evt.clientY, this);
                }
            });
        };

        //endregion

        //region event

        //endregion

        //region imsg

        this.setLightColor = function (strId, strColor) {
            var oLightG = SVG.get(strId);
            if (oLightG == undefined) {
                return;
            }
            if (oLightG.node == undefined) {
                return;
            }
            var oLight = SVG.adopt(oLightG.node.lastElementChild);
            if (oLight == undefined) {
                return;
            }

            oLight.fill({color: strColor});
        };

        //endregion
    }
})(jQuery);