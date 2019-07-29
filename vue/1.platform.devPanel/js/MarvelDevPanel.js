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
      "SXL": {
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
      "155C": {
        plugin: new $.MarvelDevPanel_2()
      },
      "UNKNOWN": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "XDM300_XDM300": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "XDM500_XDM500": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "XDM1000_XDM1000": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "AXD620_AXD620": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "AXD2500_AXD2500": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "1664SM_1664SM": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "1651SM_1651SM": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "1660SM_1660SM": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "1641SM_1641SM": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN50_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN50_metro002": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN500_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN550_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1500_type_a": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1500_type_b": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800I_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800II_153": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800II_153_PACKET": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800I_Enhanced": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1832X4_Enhanced": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800II_Enhanced": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1832X8_Enhanced": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800V_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800V_metro001_V100R008C00": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1800V_metro001_V100R008C00_Z": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1832X8_158": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1832X16_154": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN1832X16_154_V100R008C00": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN3500_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN3500II_osn3500ii": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN3500II_V100R010C00": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN7500_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN7500II_metro001": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN8800T16_wdmstd": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN8800T32_wdmstd": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN8800T64_wdmstd": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN9600U16_162": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN9600U32_117": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN9600U64_118": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN9600_M24": {
        plugin: new $.MarvelDevPanel_2(),
      },
      "OSN9800_M24": {
        plugin: new $.MarvelDevPanel_2(),
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
