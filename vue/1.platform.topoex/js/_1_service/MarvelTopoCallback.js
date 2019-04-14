(function ($) {
    $.MarvelTopoCallback = function (oParent) {
        //region const

        //endregion

        //region Fields

        var self = this;
        var m_oParent = oParent;

        this.options = {
            onBgClick: function(){

            },
            onBgDbClick: function(){

            },
            onBgMouseMove: function(){

            },
            onNodesDrag: function(){

            },
            onNodeClick: function(){

            },
            onNodeDbClick: function(){

            },
            onNodeSizeOrPosUpdate: function () {

            },
            onLinkClick: function(){

            },
            onEditorCreateEnd: function(){

            },
            onEditorDbClick: function(){

            },
            onGenerateTip4Node: function () {

            },
            onGenerateTip4Link: function () {

            }
        };


        //endregion

        //region init

        this.init = function (oOptions) {
            $.extend(this.options, oOptions);
        };

        //endregion
    }
})(jQuery);