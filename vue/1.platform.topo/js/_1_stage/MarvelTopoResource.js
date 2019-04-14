(function ($) {
    $.MarvelTopoResource = function () {
        //region const

        //endregion

        //region Fields
        var self = this;
        this.themeKey;
        this.m_mapImage;
        this.theme = {
            dark: {
                stage: {},
                node: {},
                link: {
                    linkColor: {
                        mockLinkKey: "#ff8833"
                    }
                }
            },
            default: {
                stage: {},
                node: {},
                link: {
                    linkColor: {
                        mockLinkKey: "#ff8833"
                    }
                }
            }
        };

        //endregion

        //region init

        this.init = function (strThemeKey, mapImage, oCustomTheme, oCallbackFinish) {
            //region 1.init

            this.themeKey = strThemeKey;
            this.m_mapImage = {};

            //endregion

            //region 2.images

            //2.1.iCount
            var iCount = Object.keys(mapImage).length;

            //2.2.遍历
            $.each(mapImage, function (strKey, strImageUrl) {
                _initItem(strKey, strImageUrl, function () {
                    iCount--;
                    if (0 == iCount) {
                        console.log("[MarvelTopoResource.init]finish...");
                        oCallbackFinish();
                    }
                });
            });

            //endregion

            //region 3.customeTheme

            this.theme = $.extend(true, this.theme, oCustomTheme);

            //endregion
        };

        var _initItem = function (strKey, strImageUrl, oCallbackFinish4Item) {
            var oImage = new Image();
            oImage.onload = function () {
                self.m_mapImage[strKey] = oImage;
                console.log("[MarvelTopoResource._initItem]" + strKey + " finish...");
                oCallbackFinish4Item();
            };
            oImage.src = strImageUrl;
        };

        //endregion

        //region getTheme

        this.getTheme = function () {
            return this.theme[this.themeKey];
        };

        //endregion
    }
})(jQuery);