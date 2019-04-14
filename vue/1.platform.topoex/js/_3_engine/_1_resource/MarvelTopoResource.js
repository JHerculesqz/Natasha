(function ($) {
    $.MarvelTopoResource = function () {
        var self = this;

        //region Fields

        this.m_mapImage = {

        };

        //endregion

        //region init

        /**
         * 潜规则：
         * arrImgMap = [{
         *  uiImgKey: "default",
         *  uiImgW: 32,
         *  uiImgH: 32,
         *  uiImgPath: "image/default.svg"
         * }]
         * @param arrImgMap arrImgMap
         * @param oAfterInitCallback oAfterInitCallback
         */
        this.init = function (arrImgMap, oAfterInitCallback) {
            var iCount = arrImgMap.length;
            $.each(arrImgMap, function (iIndex, oItem) {
                _initItem(oItem.uiImgKey,
                    oItem.uiImgW, oItem.uiImgH, oItem.uiImgPath,
                    function () {
                    if (iIndex === iCount - 1) {
                        oAfterInitCallback();
                    }
                });
            });
        };

        var _initItem = function (strKey,
                                  iUiImgW, iUiImgH, strImageUrl,
                                  oCallbackFinish4Item) {
            var oImage = new Image();
            oImage.onload = function () {
                self.m_mapImage[strKey] = {
                    img: oImage,
                    imgW: iUiImgW,
                    imgH: iUiImgH,
                    imgUrl: strImageUrl,
                };
                oCallbackFinish4Item();
            };
            oImage.src = strImageUrl;
        };

        //endregion
    }
})(jQuery);