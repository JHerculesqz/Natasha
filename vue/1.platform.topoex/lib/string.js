/**
 * Created by hou on 17/12/21.
 */
(function($){
    $.CString = function(){
        var self = this;
        var WIDGET_NAME = "CString";

        //region Const

        //endregion

        //region Fileds

        //endregion

        /**
         *
         * @param strMsg
         * @returns {*}
         */
        this.format = function(strMsg){
            if(arguments.length === 0){
                return undefined;
            }

            var str = arguments[0];
            for(var i = 1; i < arguments.length; i++){
                var re = new RegExp('\\{' + (i - 1) + '\\}', "gm");
                str = str.replace(re, arguments[i]);
            }
            return str;
        };

        //endregion
    };
})(jQuery);
var CString = new $.CString();
