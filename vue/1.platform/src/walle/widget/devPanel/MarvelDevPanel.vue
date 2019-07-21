<template>
  <div :id="id" class="panel"></div>
</template>

<script>
  import "core-fw-vue-widgrt-devPanel/css/MarvelDevPanel.css";

  require('core-fw-vue-widgrt-devPanel/lib/svg.min.js');
  require('core-fw-vue-widgrt-devPanel/js/plugins/MarvelDevPanel_1.js');
  require('core-fw-vue-widgrt-devPanel/js/plugins/MarvelDevPanel_2.js');
  require('core-fw-vue-widgrt-devPanel/js/plugins/MarvelDevPanel_3.js');
  require('core-fw-vue-widgrt-devPanel/js/plugins/MarvelDevPanel_3_1.js');
  require('core-fw-vue-widgrt-devPanel/js/plugins/MarvelDevPanel_4.js');
  require('core-fw-vue-widgrt-devPanel/js/plugins/MarvelDevPanel_5.js');
  require('core-fw-vue-widgrt-devPanel/js/plugins/MarvelDevPanel_6.js');
  require('core-fw-vue-widgrt-devPanel/js/plugins/MarvelDevPanel_7.js');
  require('core-fw-vue-widgrt-devPanel/js/plugins/MarvelDevPanel_8.js');
  require('core-fw-vue-widgrt-devPanel/js/plugins/MarvelDevPanel_9.js');
  require('core-fw-vue-widgrt-devPanel/js/MarvelDevPanel.js');

  /**
   *  MarvelDevPanel widget description
   *  @vuedoc
   *  @exports MarvelDevPanel
   */
  export default {
    name: 'MarvelDevPanel',
    props: {
      id:{
        type: String,
        default:"",
        required: true,
      },
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
      _onMouseOverBD: function(oBD, iX, iY){
        this.$emit("onMouseOverBD", oBD, iX, iY);
      },
      _onMouseOutBD: function(oBD, iX, iY){
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
            mouseOver:function (oBD, iX, iY, e) {
              self._onMouseOverBD(oBD, iX, iY, e)
            },
            mouseout:function (oBD, iX, iY, e) {
              self.mouseout(oBD, iX, iY, e);
            }
          }
        };

        var newOptions = Object.assign(oOptions,oConfig);
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
  .panel {
    width: 100%;
    height: 100%;
  }
</style>
