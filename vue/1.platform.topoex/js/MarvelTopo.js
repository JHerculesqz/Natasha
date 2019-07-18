(function($){
    $.MarvelTopo = function() {
        //region const

        //endregion

        //region Fields

        var self = this;

        this.m_oOptions = undefined;

        this.Api = new $.MarvelTopoApi(self);
        this.Callback = new $.MarvelTopoCallback(self);
        this.Engine = new $.MarvelTopo2dEngine(self);
        this.Resource = new $.MarvelTopoResource(self);
        this.DB = new $.MarvelTopoDB(self);

        //endregion
    }
})(jQuery);