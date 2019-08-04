<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelMenu</div>
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
            <marvel-menu :items="items"
                         v-on:menuItemClick="menuItemClick"
                         v-on:subMenuItemClick="subMenuItemClick"></marvel-menu>
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
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelMenu.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelMenu from "^/widget/menu/MarvelMenu"
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelMenu',
    components: {
      MarvelMenu,
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
        items: [{
          label: "menu1",
          groups:[{
            name: "group1",
            sessions: [{
              label: "拓扑",
              items: [{
                label: "拓扑管理",
                onClick: function(){
                  alert("拓扑管理");
                }
              }, {
                label: "IP拓扑管理",
                onClick: function(){
                  alert("IP拓扑管理");
                }
              }]
            }, {
              label: "性能管理",
              items: [{
                label: "模板管理",
                onClick: function(){
                  alert("模板管理");
                }
              }, {
                label: "任务管理",
                onClick: function(){
                  alert("任务管理");
                }
              }]
            }]
          }, {
            name: "group2",
            sessions: [{
              label: "监视",
              items: [{
                label : "KPI监视",
                onClick: function(){
                  alert("IP拓扑管理");
                }
              }, {
                label : "GDP监视",
                onClick: function(){
                  alert("GDP监视");
                }
              }]
            }, {
              label: "设置",
              items: [{
                label: "用户设置",
                onClick: function(){
                  alert("用户设置");
                }
              }, {
                label: "系统设置",
                onClick: function(){
                  alert("系统设置");
                }
              }]
            }]
          }]
        }, {
          label: "menu2",
          groups: [{
            name: "group1",
            sessions: [{
              label: "拓扑",
              items: [{
                label: "拓扑管理",
                onClick: function () {
                  alert("拓扑管理");
                }
              }, {
                label: "IP拓扑管理",
                onClick: function () {
                  alert("IP拓扑管理");
                }
              }]
            }, {
              label: "性能管理",
              items: [{
                label: "模板管理",
                onClick: function () {
                  alert("模板管理");
                }
              }, {
                label: "任务管理",
                onClick: function () {
                  alert("任务管理");
                }
              }]
            }]
          }, {
            name: "group2",
            sessions: [{
              label: "监视",
              items: [{
                label: "KPI监视",
                onClick: function () {
                  alert("IP拓扑管理");
                }
              }, {
                label: "GDP监视",
                onClick: function () {
                  alert("GDP监视");
                }
              }]
            }, {
              label: "设置",
              items: [{
                label: "用户设置",
                onClick: function () {
                  alert("用户设置");
                }
              }, {
                label: "系统设置2",
                onClick: function () {
                  alert("系统设置2");
                }
              }]
            }]
          }]
        }]
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
        this.$refs.IFrame.setIframe4DemoPage();
      },

      //#endregion

      menuItemClick: function (oMenuItem) {
        alert(oMenuItem.label);
      },
      subMenuItemClick: function (oMenuItem, oGroup, oSession, oSubItem) {
        alert("oMenuItem: " + oMenuItem.label + ",oGroup:" + oGroup.label +
          ",oSession:" + oSession.label + ",oSubItem:" + oSubItem.label);
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
