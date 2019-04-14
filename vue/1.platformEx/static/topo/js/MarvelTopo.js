(function($){
    $.MarvelTopo = function() {
        var self = this;

        //#region Fields

        this.Resource = new $.MarvelTopoResource();
        this.Stage = new $.MarvelTopoStage();
        this.Layer = new $.MarvelTopoLayer();
        this.Sprite = new $.MarvelTopoSprite();
        this.Api = new $.MarvelTopoApi();

        this.ins = {
            stage: undefined,
            layerNode: undefined,
            layerLink: undefined
        };

        //#endregion
    }
})(jQuery);