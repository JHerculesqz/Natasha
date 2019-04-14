/**
 * Created by destina on 2017/10/19.
 */
(function($){
    $.MarvelTopoUtils = function(){

        this.getVaules4JsonObj = function(oJson){
            var arrRes = [];
            if (Object.values) {
                arrRes = Object.values(oJson);
            }
            else {
                for (var k in oJson) {
                    arrRes.push(oJson[k]);
                }
            }
            return arrRes;
        };

        this.isRightClick = function(evt){
            if(evt.button == 2 || evt.which == 3){
                return true;
            }
            return false;
        };

        this.isLeftClick = function(evt){
            if(evt.button == 0 || evt.which == 1){
                return true;
            }
            return false;
        };

    };
})(jQuery);