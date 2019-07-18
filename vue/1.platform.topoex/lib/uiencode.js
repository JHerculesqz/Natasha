/**
 * Created by hou on 17/12/21.
 */
(function($){
    $.CUIEncode = function(){
        var self = this;
        var WIDGET_NAME = "CUIEncode";

        //region const

        var TEMPLATE = "{0}_{1}_{2}";

        //endregion
        
        //region Fields

        //endregion

        //region encode

        this.encode = function(strId, strModuleId, strWidgetName){
            return CString.format(TEMPLATE, strId, strModuleId, strWidgetName);
        };

        //endregion
    }
})(jQuery);
var CUIEncode = new $.CUIEncode();
