/**
 * Created by destina on 2017/9/22.
 */
(function ($) {
    $.MarvelTopoApi = function (oParent) {
        //region Fields

        var self = this;
        var m_oParent = oParent;

        //endregion

        //region init

        /**
         * 1.initCanvas
         * 2.reg event
         * 3.reg image
         * @param oOptions
         */
        this.init = function(oOptions, oAfterInitCallback){
            m_oParent.m_oOptions = oOptions;

            //1.callback init
            m_oParent.Callback.init(oOptions.eventMap);

            //2.draw init
            m_oParent.Engine.init(oOptions);

            //3.reg img
            m_oParent.Resource.init(oOptions.imgMap, oAfterInitCallback);
        };

        //endregion

        //region setData

        /**
         * setData
         * @param oTopoSet{capID:oTopo}, oMergeData:{mergeCapID: oTopo}
         */
        this.setData = function(oTopoSet, oMergeData){

        };

        //endregion

        //region draw

        /**
         * draw
         */
        this.draw = function(){

        };

        //endregion
    };
})(jQuery);