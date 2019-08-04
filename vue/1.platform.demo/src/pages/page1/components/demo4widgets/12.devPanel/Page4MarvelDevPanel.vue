<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelDevPanel</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 100%;height: 500px;">
              <marvel-dev-panel ref="refDevPanel" id="idDevPanel" resourceUrl="static"
                                v-on:afterInitPlugin="afterInitPlugin"
                                v-on:onClickBD="onClickBD"
                                v-on:onContextMenuClickBD="onContextMenuClickBD"></marvel-dev-panel>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="width: 100%;height: 500px;">
              <marvel-dev-panel ref="refDevPanel" id="idDevPanel" resourceUrl="static"
                                v-on:afterInitPlugin="afterInitPlugin"
                                v-on:onClickBD="onClickBD"
                                v-on:onContextMenuClickBD="onContextMenuClickBD"></marvel-dev-panel>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelDevPanel.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTimer from "^/component/timer";
  import MarvelDevPanel from "^/widget/devPanel/MarvelDevPanel";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelDevPanel',
    components: {
      MarvelDevPanel,
      MarvelIFrame,
      MarvelAceEditor,
      MarvelTab,
      MarvelTabItem,
    },
    data: function () {
      return {
        //#region document data
        tabItems1: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        devPanelTimer: undefined
        //#endregion
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    beforeDestroy: function () {
      //#region custom

      MarvelTimer.endTimer(this.devPanelTimer);

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.$refs.IFrame.setIframe4DemoPage();

        var self = this;
        var selfConfig = {
          "Raycus_6000": {
            url: require("../../../../../../static/image/devPanel/dev3.svg"),
          },
          "Raycus_6000_1": {
            url: require("../../../../../../static/image/devPanel/dev3_1.svg"),
          },
          "Raycus_12000": {
            url: require("../../../../../../static/image/devPanel/dev4.svg"),
          },
          "Raycus_2000": {
            url: require("../../../../../../static/image/devPanel/dev5.svg"),
          },
          "manhole": {
            url: require("../../../../../../static/image/devPanel/manhole.svg"),
          },
          "env": {
            url: require("../../../../../../static/image/devPanel/env.svg"),
          },
          "car": {
            url: require("../../../../../../static/image/devPanel/car.svg"),
          },
          "GK_1000": {
            url: require("../../../../../../static/image/devPanel/gk.svg"),
          },
        };
        this.$refs.refDevPanel.init(selfConfig);
        this.$refs.refDevPanel.initPlugin("car");

        this.devPanelTimer = MarvelTimer.startTimer(function () {
          var oPlugin = self.$refs.refDevPanel.getPlugin("car");
          if (oPlugin) {
            var i = Math.random();
            // if (i < 0.3) {
            //   oPlugin.setLightColor("l0Status", "#008c01");
            // }
            // else if (i > 0.3 && i < 0.5) {
            //   oPlugin.setLightColor("l0Status", "#f5df28");
            // }
            // else {
            //   oPlugin.setLightColor("l0Status", "#808080");
            // }
            oPlugin.setLightColor("l0Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
            oPlugin.setLightColor("l0Status", Math.random() > 0.5 ? "#008c01" : "#f5df28");
            oPlugin.setLightColor("l2Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
            oPlugin.setLightColor("l3Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
            oPlugin.setLightColor("l4Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
            oPlugin.setLightColor("l5Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
            oPlugin.setLightColor("l6Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
            oPlugin.setLightColor("l7Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
            oPlugin.setLightColor("l8Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
            oPlugin.setLightColor("l9Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
            oPlugin.setLightColor("l10Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
            oPlugin.setLightColor("l11Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
            oPlugin.setLightColor("l12Warn", Math.random() > 0.5 ? "#ff4c4c" : "#008c01");
          }
        }, 1000);
      },

      //#endregion

      afterInitPlugin: function () {
        console.log("afterInitPlugin...");
      },
      onClickBD: function (oBD) {
        console.log(oBD);
      },
      onContextMenuClickBD: function (oBD, iX, iY) {
        console.log(oBD, iX, iY);
      },

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd
      //#endregion
    }
  }
</script>

<style scoped>
  /*document fix style start*/
  .widgetShowSession {
    padding: 20px 100px;
    width: 100%;
    box-sizing: border-box;
  }

  .title {
    color: #4d4d4d;
  }

  .level1 {
    font-size: 32px;
    line-height: 54px;
  }

  .describe {
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }

  .codeArea {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: auto;
  }

  .showAreaInner {
    box-sizing: border-box;
  }

  .docArea{
    width: 100%;
  }

  .docArea iframe{
    width: 100%;
    height: 100%;
    border: none;
  }

  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    height: 400px;
  }

  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/

  /*region dark theme*/

  .dark .title {
    color: #ffffff;
  }

  .dark .describe {
    color: #8b90b3;
  }

  /*endregion*/
</style>
