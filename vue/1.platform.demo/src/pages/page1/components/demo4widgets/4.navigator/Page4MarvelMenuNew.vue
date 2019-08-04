<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelMenuNew</div>
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
            <marvel-menu-new ref="ref4SubMenu"
                             :items="items"
                             v-on:menuItemClick="menuItemClick"
                             v-on:subMenuItemClick="subMenuItemClick"></marvel-menu-new>
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
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelMenuNew.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import MarvelMenuNew from "~~/widget/menu/MarvelMenuNew";

  export default {
    name: 'page4MarvelMenuNew',
    components: {
      MarvelMenuNew,
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
        items:[{
          label:"所有结果",
          groups:[{
            name:"groupSummary",
            sessions:[{
              label:"汇总",
              iconVal:"icon-marvelIcon-2",
              items:[{
                label:"aaa",
                onClick: function () {

                }
              },{
                label:"bbb",
                onClick: function () {

                }
              }]
            }]
          },{
            name:"groupDevice",
            sessions:[{
              label:"ccc",
              iconVal:"icon-marvelIcon-83",
              items:[{
                label:"cc1",
                onClick: function () {

                }
              },{
                label:"cc2",
                onClick: function () {

                }
              },{
                label:"cc3",
                onClick: function () {

                }
              },{
                label:"cc4",
                onClick: function () {

                }
              }]
            }]
          }]
        }],
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
        console.log(oMenuItem);
      },
      subMenuItemClick: function (oMenuItem, oGroup, oSession, oSubItem) {
        console.log(oMenuItem);
        console.log(oGroup);
        console.log(oSession);
        console.log(oSubItem);
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
