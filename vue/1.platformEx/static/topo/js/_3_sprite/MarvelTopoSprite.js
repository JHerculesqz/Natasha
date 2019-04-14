(function($){
    $.MarvelTopoSprite = function() {
        var self = this;

        //#region Fields

        this.NodeGroup = new $.MarvelTopoNodeGroup();
        this.Node = new $.MarvelTopoNode();
        this.LinkGroup = new $.MarvelTopoLinkGroup();
        this.Link = new $.MarvelTopoLink();
        this.BoxGroup = new $.MarvelTopoBoxGroup();
        this.Box = new $.MarvelTopoBox();

        //#endregion
    }
})(jQuery);