<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelDropDownMenu</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->
    <div class="describe">常规</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="chart">
              <div style="width: 500px; height: 350px;position: relative;left: 300px;">
                <marvel-drop-down-menu :menus="menus"
                                       height="50px"
                                       v-on:clickSubMenu="clickSubMenu"
                                       v-on:clickOperationIcon="clickOperationIcon"></marvel-drop-down-menu>
              </div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div class="chart">
              <div style="width: 500px; height: 350px;">
                <marvel-menu-drop-down :menus="menus"
                                       height="50px"
                                       v-on:clickSubMenu="clickSubMenu"></marvel-menu-drop-down>
              </div>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="describe">简化</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="chart">
              <div style="width: 500px; height: 350px;position: relative;left: 300px;">
                <marvel-drop-down-menu :menus="menus"
                                       height="50px"
                                       type="Simplify"
                                       v-on:clickSubMenu="clickSubMenu"
                                       v-on:clickOperationIcon="clickOperationIcon"></marvel-drop-down-menu>
              </div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div class="chart">
              <div style="width: 500px; height: 350px;">
                <marvel-menu-drop-down :menus="menus"
                                       height="50px"
                                       v-on:clickSubMenu="clickSubMenu"></marvel-menu-drop-down>
              </div>
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
      <marvel-i-frame ref="page4MarvelDropDownMenuIFrame" id="page4MarvelDropDownMenuIFrame" src="static/jsdoc/module-MarvelDropDownMenu.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelDropDownMenu from "^/widget/dropDownMenu/MarvelDropDownMenu";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelDropDownMenu',
    components: {
      MarvelDropDownMenu,
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
        //#endregion
        //#region custom data
        menus: {
          mainMenu: {
            icon: "./static/image/others/2.png",
            label: "s00290253"
          },
          subMenu: [{
            icon: "icon-user",
            label: "我的工作台",
            subMenu:[{
              label: "我的工作台",
              operationIcons:[{
                icon:"icon-java",
              },{
                icon:"icon-marvelIcon_2-03",
              }]
            }]
          }, {
            icon: "icon-user",
            label: "日志"
          }, {
            icon: "icon-user",
            label: "上次打开"
          }, {
            icon: "icon-user",
            label: "我的意见"
          }, {
            icon: "icon-user",
            label: "English"
          }, {
            icon: "icon-user",
            label: "注销"
          }]
        }
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
        this.$refs.page4MarvelDropDownMenuIFrame.setIframe4DemoPage();
      },

      //#endregion

      clickSubMenu: function (strLabel) {
        console.log(strLabel);
      },
      clickOperationIcon: function (strLabel, strIcon) {
        console.log(strLabel);
        console.log(strIcon);
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

  .chart {
    height: 100%;
    overflow-y: scroll;
  }

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
