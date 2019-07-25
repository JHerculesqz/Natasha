<template>
  <div :id="id" class="panel"></div>
</template>

<script>
  import "natasha-devpanel/css/MarvelDevPanel.css";

  require('natasha-devpanel/lib/svg.min.js');
  require('natasha-devpanel/js/plugins/MarvelDevPanel_1.js');
  require('natasha-devpanel/js/plugins/MarvelDevPanel_2.js');
  require('natasha-devpanel/js/plugins/MarvelDevPanel_3.js');
  require('natasha-devpanel/js/plugins/MarvelDevPanel_3_1.js');
  require('natasha-devpanel/js/plugins/MarvelDevPanel_4.js');
  require('natasha-devpanel/js/plugins/MarvelDevPanel_5.js');
  require('natasha-devpanel/js/plugins/MarvelDevPanel_6.js');
  require('natasha-devpanel/js/plugins/MarvelDevPanel_7.js');
  require('natasha-devpanel/js/plugins/MarvelDevPanel_8.js');
  require('natasha-devpanel/js/plugins/MarvelDevPanel_9.js');
  require('natasha-devpanel/js/MarvelDevPanel.js');

  /**
   *  MarvelDevPanel widget description
   *  @vuedoc
   *  @exports MarvelDevPanel
   */
  export default {
    name: 'MarvelDevPanel',
    props: {
      id: {
        type: String,
        default: "",
        required: true
      }
    },
    data: function () {
      return {
        m_oMarvelDevPanel: undefined
      }
    },
    mounted: function () {

    },
    methods: {
      //#region inner
      //#endregion
      //#region callback

      _afterInitPlugin: function () {
        this.$emit("_afterInitPlugin");
      },
      _onClickBD: function (oBD) {
        this.$emit("onClickBD", oBD);
      },
      _onContextMenuClickBD: function (oBD, iX, iY) {
        this.$emit("onContextMenuClickBD", oBD, iX, iY);
      },
      _onMouseOverBD: function (oBD, iX, iY) {
        this.$emit("onMouseOverBD", oBD, iX, iY);
      },
      _onMouseOutBD: function (oBD, iX, iY) {
        this.$emit("onMouseOutBD", oBD, iX, iY);
      },

      //#endregion
      //#region 3rd

      init: function (oConfig) {
        var self = this;

        this.m_oMarvelDevPanel = new $.MarvelDevPanel();

        var oOptions = {
          id: this.id,
          events: {
            afterInitPlugin: function () {
              self._afterInitPlugin();
            },
            click4BD: function (oBD, e) {
              self._onClickBD(oBD);
            },
            contextMenu4BD: function (oBD, iX, iY, e) {
              self._onContextMenuClickBD(oBD, iX, iY);
            },
            mouseOver: function (oBD, iX, iY, e) {
              self._onMouseOverBD(oBD, iX, iY, e);
            },
            mouseOut: function (oBD, iX, iY, e) {
              self._onMouseOutBD(oBD, iX, iY, e);
            }
          }
        };

        var newOptions = Object.assign(oOptions, oConfig);
        this.m_oMarvelDevPanel.init(newOptions);
      },
      initPlugin: function (strDevType) {
        this.m_oMarvelDevPanel.initPlugin(strDevType);
      },
      getPlugin: function (strDevType) {
        var oPlugin = this.m_oMarvelDevPanel.getPlugin(strDevType);
        return oPlugin;
      },

      //#endregion
    }
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .panel {
    width: 100%;
    height: 100%;
  }
</style>
