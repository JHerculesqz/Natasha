(function ($) {
    $.MarvelDevPanel = function () {
        var self = this;

        //region Const

        //endregion

        //#region Fields

        this.m_oDraw;

        this.m_oOptions = {
            "Raycus_6000": {
                plugin: new $.MarvelDevPanel_3()
            },
            "Raycus_6000_1": {
                plugin: new $.MarvelDevPanel_3_1()
            },
            "Raycus_12000": {
                plugin: new $.MarvelDevPanel_4()
            },
            "Raycus_2000": {
                plugin: new $.MarvelDevPanel_5()
            },
            "SXL_1": {
                plugin: new $.MarvelDevPanel_2()
            },
            "manhole": {
                plugin: new $.MarvelDevPanel_6()
            },
            "env": {
                plugin: new $.MarvelDevPanel_7()
            },
            "car": {
                plugin: new $.MarvelDevPanel_8()
            },
            "GK_1000": {
                plugin: new $.MarvelDevPanel_9()
            },
        };

        //#endregion

        //region init

        this.init = function (oOptions) {
            $.extend(true, this.m_oOptions, oOptions);
            this.m_oDraw = SVG(this.m_oOptions.id);
        };

        //endregion

        //region event


        //endregion

        //region imsg

        this.initPlugin = function (strDevType) {
            var self = this;

            var oOption = this.m_oOptions[strDevType];
            if (oOption != undefined) {
                $("#" + this.m_oOptions.id).load(oOption.url, function (oData) {
                    self.m_oDraw.svg(oData);
                    oOption.plugin.init(self.m_oOptions);
                    self.m_oOptions.events.afterInitPlugin();
                });
                return true;
            }
            else {
                return false;
            }
        };

        this.getPlugin = function (strDevType) {
            var oOption = this.m_oOptions[strDevType];
            if (oOption != undefined) {
                return oOption.plugin;
            }
            else {
                return undefined;
            }
        };

        //endregion
    }
})(jQuery);