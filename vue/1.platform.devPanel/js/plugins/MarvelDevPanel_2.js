(function ($) {
    $.MarvelDevPanel_2 = function () {
        var self = this;

        //region Const

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

            //#region slot1
            var oSlot1 = SVG.get('slot1');
            _bindClickFunction(oSlot1, "slot1", oOptions.events);
            //#endregion

            //#region slot2
            var oSlot2 = SVG.get('slot2');
            _bindClickFunction(oSlot2, "slot2", oOptions.events);
            //#endregion

            //#region slot3
            var oSlot3 = SVG.get('slot3');
            _bindClickFunction(oSlot3, "slot3", oOptions.events);
            //#endregion

            //#region slot4
            var oSlot4 = SVG.get('slot4');
            _bindClickFunction(oSlot4, "slot4", oOptions.events);
            //#endregion

            //#region slot5
            var oSlot5 = SVG.get('slot5');
            _bindClickFunction(oSlot5, "slot5", oOptions.events);
            //#endregion

            //#region slot6
            var oSlot6 = SVG.get('slot6');
            _bindClickFunction(oSlot6, "slot6", oOptions.events);
            //#endregion

            //#region slot7
            var oSlot7 = SVG.get('slot7');
            _bindClickFunction(oSlot7, "slot7", oOptions.events);
            //#endregion

            //#region slot8
            var oSlot8 = SVG.get('slot8');
            _bindClickFunction(oSlot8, "slot8", oOptions.events);
            //#endregion

            //#region slot9
            var oSlot9 = SVG.get('slot9');
            _bindClickFunction(oSlot9, "slot9", oOptions.events);
            //#endregion

            //#region slot10
            var oSlot10 = SVG.get('slot10');
            _bindClickFunction(oSlot10, "slot10", oOptions.events);
            //#endregion

            //#region slot11
            var oSlot11 = SVG.get('slot11');
            _bindClickFunction(oSlot11, "slot11", oOptions.events);
            //#endregion

            //#region slot12
            var oSlot12 = SVG.get('slot12');
            _bindClickFunction(oSlot12, "slot12", oOptions.events);
            //#endregion

            //#region slot13
            var oSlot13 = SVG.get('slot13');
            _bindClickFunction(oSlot13, "slot13", oOptions.events);
            //#endregion

            //#region slot14
            var oSlot14 = SVG.get('slot14');
            _bindClickFunction(oSlot14, "slot14", oOptions.events);
            //#endregion

            //#region slot15
            var oSlot15 = SVG.get('slot15');
            _bindClickFunction(oSlot15, "slot15", oOptions.events);
            //#endregion

            //#region slot16
            var oSlot16 = SVG.get('slot16');
            _bindClickFunction(oSlot16, "slot16", oOptions.events);
            //#endregion

            //#region slot17
            var oSlot17 = SVG.get('slot17');
            _bindClickFunction(oSlot17, "slot17", oOptions.events);
            //#endregion

            //#region slot18
            var oSlot18 = SVG.get('slot18');
            _bindClickFunction(oSlot18, "slot18", oOptions.events);
            //#endregion

            //#region slot19
            var oSlot19 = SVG.get('slot19');
            _bindClickFunction(oSlot19, "slot19", oOptions.events);
            //#endregion

            //#region slot20
            var oSlot20 = SVG.get('slot20');
            _bindClickFunction(oSlot20, "slot20", oOptions.events);
            //#endregion

            //#region slot21
            var oSlot21 = SVG.get('slot21');
            _bindClickFunction(oSlot21, "slot21", oOptions.events);
            //#endregion

            //#region slot22
            var oSlot22 = SVG.get('slot22');
            _bindClickFunction(oSlot22, "slot22", oOptions.events);
            //#endregion

            //#region slot23
            var oSlot23 = SVG.get('slot23');
            _bindClickFunction(oSlot23, "slot23", oOptions.events);
            //#endregion

            //#region slot24
            var oSlot24 = SVG.get('slot24');
            _bindClickFunction(oSlot24, "slot24", oOptions.events);
            //#endregion

            //#region slot25
            var oSlot25 = SVG.get('slot25');
            _bindClickFunction(oSlot25, "slot25", oOptions.events);
            //#endregion
        };

        var _bindClickFunction = function (oSlot, strId, oEventOptions) {
            oSlot.mousedown(function (e) {
                if (_isRightClick(e)) {
                    oEventOptions.contextMenu4BD({id: strId}, e.clientX, e.clientY, this);
                }
                else if (_isLeftClick(e)) {
                    oEventOptions.click4BD({id: strId}, this);
                }
            });
        };

        var _isRightClick = function (evt) {
            if (evt.button == 2 || evt.which == 3) {
                return true;
            }
            return false;
        };

        var _isLeftClick = function (evt) {
            if (evt.button == 0 || evt.which == 1) {
                return true;
            }
            return false;
        };

        //endregion

        //region event

        //#region insertBoard

        this.insertBoard = function (strId, strLabel) {
            var oBj = SVG.get(strId);
            var oSlot1 = SVG.adopt(oBj.node.firstElementChild.firstElementChild);
            if (oSlot1 != undefined) {
                oSlot1.fill({color: "#7169c4"})
            }
            var oSlot2 = oBj.node.lastElementChild.firstElementChild;
            if (oSlot2 != undefined) {
                oSlot2.textContent = strLabel;
            }
        };

        //#endregion

        //#region clearBoard

        this.clearBoard = function (strId) {
            var oBj = SVG.get(strId);
            var oSlot1 = SVG.adopt(oBj.node.firstElementChild.firstElementChild);
            if (oSlot1 != undefined) {
                oSlot1.fill({color: "#4838A0"});
            }
            var oSlot2 = oBj.node.lastElementChild.firstElementChild;
            if (oSlot2 != undefined) {
                oSlot2.textContent = "";
            }
        };

        //#endregion

        //endregion
    }
})(jQuery);