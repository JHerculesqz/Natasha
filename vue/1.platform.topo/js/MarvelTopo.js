(function($){
    $.MarvelTopo = function() {
        //region const

        //endregion

        //region Fields

        var self = this;

        this.Resource = new $.MarvelTopoResource();
        this.Stage = new $.MarvelTopoStage();
        this.Layer = new $.MarvelTopoLayer();
        this.Sprite = new $.MarvelTopoSprite();
        this.Api = new $.MarvelTopoApi();
        this.Utils = new $.MarvelTopoUtils();

        this.ins = {
            stage: undefined,
            layerNode: undefined,
            layerLink: undefined,
            layerBg: undefined,
            layerTemp: undefined,
            layerTooltip: undefined
        };

        //endregion
    }
})(jQuery);