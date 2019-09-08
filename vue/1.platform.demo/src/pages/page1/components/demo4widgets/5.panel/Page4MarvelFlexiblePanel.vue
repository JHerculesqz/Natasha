<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelFlexiblePanel</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

    <div class="describe">
      底部弹性面板
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="background-color: #f0f0f0;position: relative;height: 100%;">
              <button v-on:click="expandBottom">expand</button>
              <button v-on:click="foldBottom">fold</button>
              <marvel-flexible-panel ref="refBottom"
                                     pos="bottom"
                                     :canDrag="true"
                                     :fullScreenController="true"
                                     :height=200
                                     :maxHeight=300
                                     expandBtnBgColor="#3399ff"></marvel-flexible-panel>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->

    <div class="describe">
      左侧弹性面板
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="background-color: #f0f0f0;position: relative;height: 100%;">
              <button style="float: right;" v-on:click="foldLeft">fold</button>
              <button style="float: right;" v-on:click="expandLeft">expand</button>
              <marvel-flexible-panel ref="refLeft"
                                     pos="left"
                                     :canDrag="true"
                                     :fullScreenController="true"
                                     :width=200
                                     :maxWidth=300
                                     expandBtnBgColor="#3399ff"></marvel-flexible-panel>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='

            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->

    <div class="describe">
      右侧弹性面板
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems3">
        <marvel-tab-item :isActive="tabItems3[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="background-color: #f0f0f0;position: relative;height: 100%;">
              <button v-on:click="expandRight">expand</button>
              <button v-on:click="foldRight">fold</button>
              <marvel-flexible-panel ref="refRight"
                                     pos="right"
                                     :canDrag="true"
                                     :fullScreenController="true"
                                     :width=200
                                     :maxWidth=300
                                     expandBtnBgColor="#3399ff"></marvel-flexible-panel>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems3[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='

            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->

    <div class="describe">
      顶部弹性面板
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems4">
        <marvel-tab-item :isActive="tabItems4[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="background-color: #f0f0f0;position: relative;height: 100%;">
              <button style="bottom: 0;position: absolute;" v-on:click="expandTop">expand</button>
              <button style="bottom: 0;position: absolute;left: 60px;" v-on:click="foldTop">fold</button>
              <marvel-flexible-panel ref="refTop"
                                     pos="top"
                                     :canDrag="true"
                                     :fullScreenController="true"
                                     :height=200
                                     :maxHeight=300
                                     expandBtnBgColor="#3399ff"></marvel-flexible-panel>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems4[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='

            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelFlexiblePanelIFrame" id="page4MarvelFlexiblePanelIFrame" src="static/jsdoc/module-MarvelFlexiblePanel.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelFlexiblePanel from "^/widget/flexiblePanel/MarvelFlexiblePanel";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelFlexiblePanel',
    components: {
      MarvelFlexiblePanel,
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
        tabItems2: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems3: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems4: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data

        //#endregion
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.$refs.page4MarvelFlexiblePanelIFrame.setIframe4DemoPage();
      },

      //#endregion

      expandTop: function () {
        this.$refs.refTop.expand(true);
      },
      foldTop: function () {
        this.$refs.refTop.expand(false);
      },

      expandRight: function () {
        this.$refs.refRight.expand(true);
      },
      foldRight: function () {
        this.$refs.refRight.expand(false);
      },

      expandBottom: function () {
        this.$refs.refBottom.expand(true);
      },
      foldBottom: function () {
        this.$refs.refBottom.expand(false);
      },

      expandLeft: function () {
        this.$refs.refLeft.expand(true);
      },
      foldLeft: function () {
        this.$refs.refLeft.expand(false);
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
    height: 100%;
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
