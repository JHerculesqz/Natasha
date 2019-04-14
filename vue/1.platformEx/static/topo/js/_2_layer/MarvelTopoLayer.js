(function($){
    $.MarvelTopoLayer = function() {
        var self = this;

        //#region Fields

        //#endregion

        //#region init

        this.init = function(oTopo){
            var oLayer = new Konva.Layer();
            oTopo.ins.stage.add(oLayer);
            return oLayer;
        };

        this.reDraw = function(oLayer){
            oLayer.batchDraw();
        };

        //#endregion

        //#region imsg

        this.moveToBottom = function(oLayer){
            oLayer.moveToBottom();
        };

        //#endregion
    }
})(jQuery);