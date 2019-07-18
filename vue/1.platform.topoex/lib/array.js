/**
 * Created by hou on 17/12/28.
 */
(function($){
    $.CArray = function(){
        var self = this;

        //region contains

        /**
         *
         * @param arrSrc
         * @param strDst
         */
        this.contains = function(arrSrc, strDst){
            var bIsContains = false;

            $.each(arrSrc, function(iIndex, strSrc){
                if(strSrc == strDst){
                    bIsContains = true;
                    return false;
                }
            });

            return bIsContains;
        };


        //endregion
    };
})(jQuery);
var CArray = new $.CArray();
