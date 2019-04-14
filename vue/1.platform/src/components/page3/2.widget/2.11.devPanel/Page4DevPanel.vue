<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">DevPanel</div>
    <div class="describe">
      自定义设备板位图
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">DevPanel</div>
    <div class="describe">
      自定义设备板位图
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 100%;height: 500px;">
              <marvel-dev-panel ref="refDevPanel" id="idDevPanel"
                                v-on:afterInitPlugin="afterInitPlugin"
                                v-on:onClickBD="onClickBD"
                                v-on:onContextMenuClickBD="onContextMenuClickBD"></marvel-dev-panel>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">

                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->


    <!--2级 start-->
    <div class="title level2">RackPanel</div>
    <div class="describe">
      机柜设计面板
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 100%;height: 500px;">
              <button @click="onClickRemoveNode">removeNode</button>
              <button @click="onClickSetActiveStyle">设置选中样式</button>
              <button @click="onClickRemoveAllActiveStyle">清除所有选中样式</button>
              <button @click="onClickExportPng">导出png</button>
              <div style="width: 400px; height: 450px">
                <marvel-dev-panel-ex ref="ref4DevPanelEx" domId="rackPanel"
                                     @callbackOnClick="callbackOnClick"
                                     @callbackOnContextmenu="callbackOnContextmenu"></marvel-dev-panel-ex>
              </div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">

                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
  </div>
</template>

<script>
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelHight from "@/walle/component/highlight";
  import MarvelDevPanel from "@/walle/widget/devPanel/MarvelDevPanel";
  import MarvelDevPanelEx from "@/walle/widget/devPanelEx/MarvelDevPanelEx";
  import MarvelTimer from "@/walle/component/timer";

  export default {
    name: 'page4DevPanel',
    components: {
      MarvelDevPanel,
      MarvelDevPanelEx,
      MarvelTabItem,
      MarvelTab
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
        tabItems2: [{
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
      //#region custom
      var self = this;

      this.$refs.refDevPanel.init();
      this.$refs.refDevPanel.initPlugin("GK_1000");

      this.devPanelTimer = MarvelTimer.startTimer(function () {
        var oPlugin = self.$refs.refDevPanel.getPlugin("GK_1000");
        if (oPlugin) {
          var i = Math.random();
          if (i < 0.3) {
            oPlugin.setLightColor("l0Status", "#008c01");
          }
          else if (i > 0.3 && i < 0.5) {
            oPlugin.setLightColor("l0Status", "#f5df28");
          }
          else {
            oPlugin.setLightColor("l0Status", "#808080");
          }
        }
      }, 1000);

      //region devPanelEx
      var options = {
        buObjId: "jigui_1",
        imgUrl: "static/devPanelEx/image/rack1.txt",
        subBuObjs: [{id: "bd0", dir: 0}, {id: "bd1", dir: 0}, {id: "bd2", dir: 0}, {id: "bd3", dir: 0}, {
          id: "bd4",
          dir: 0
        }]
      };
      this.$refs.ref4DevPanelEx.init(options);
      //endregion

      //#endregion
    },
    beforeDestroy: function () {
      //#region custom

      MarvelTimer.endTimer(this.devPanelTimer);

      //#endregion
    },
    methods: {
      //#region inner
      afterInitPlugin: function () {
        console.log("afterInitPlugin...");
      },
      onClickBD: function (oBD) {
        console.log(oBD);
      },
      onContextMenuClickBD: function (oBD, iX, iY) {
        console.log(oBD, iX, iY);
      },
      callbackOnClick: function (strBuObjId, strSubBuObjId, evt) {
        if (strSubBuObjId == "bd1") {
          this.$refs.ref4DevPanelEx.addNode(strSubBuObjId, {imgUrl: "static/devPanelEx/image/dev1.txt"}, function () {
            console.log("add successfully");
          }, {
            callbackOnClick: function (strSlotId, oBuObj, evt) {
              console.log("callbackOnClick" + strSlotId);
            },
            callbackOnContextmenu: function (strSlotId, oBuObj, evt) {
              console.log("callbackOnContextmenu" + strSlotId);
            }
          });
        }
        else if (strSubBuObjId == "bd3") {
          this.$refs.ref4DevPanelEx.addNode(strSubBuObjId, {imgUrl: "static/devPanelEx/image/dev1.txt"}, function () {
            console.log("add successfully");
          }, {
            callbackOnClick: function (strSlotId, oBuObj, evt) {
              console.log("callbackOnClick" + strSlotId);
            },
            callbackOnContextmenu: function (strSlotId, oBuObj, evt) {
              console.log("callbackOnContextmenu" + strSlotId);
            }
          });
        }
      },
      callbackOnContextmenu: function (strBuObjId, strSubBuObjId, evt) {
        console.log(strSubBuObjId);
      },
      onClickRemoveNode: function () {
        this.$refs.ref4DevPanelEx.removeNode("bd1");
      },
      onClickSetActiveStyle: function () {
        this.$refs.ref4DevPanelEx.setActiveStyle("bd1");
      },
      onClickRemoveAllActiveStyle: function () {
        this.$refs.ref4DevPanelEx.removeAllActiveStyle();
      },
      onClickExportPng: function () {
        this.$refs.ref4DevPanelEx.exportPng("nb.png");
      }
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

  .level2 {
    margin-top: 40px;
    font-size: 22px;
    line-height: 48px;
  }

  .describe {
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }

  .showArea {
    width: 100%;
  }

  .codeArea {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: auto;
  }

  .codeArea pre, .codeArea code {
    padding: 0;
    margin: 0;
    min-width: 100%;
    float: left;
  }

  .showAreaInner {
    padding-top: 36px;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
  }

  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    height: 640px;
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
