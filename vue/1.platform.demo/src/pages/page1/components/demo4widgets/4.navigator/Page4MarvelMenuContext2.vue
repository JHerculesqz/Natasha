<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelMenuContext2</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner" style="width: 100%;height: 100%">
            <!--2级DemoView start-->
            <div id="contextMenuWrapper" style="width: 100%; height: 100%;" @contextmenu.prevent="showContextMenu">
              <marvel-menu-context2 ref="refContextMenu"
                                    :items="items" 
                                    containerId="contextMenuWrapper"
                                    contextMenuItemId="contextMenuWrapperInner"
                                    v-on:onMenuItemClick="onMenuItemClick"></marvel-menu-context2>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div id="contextMenuWrapper" style="width: 100%; height: 100%;" @contextmenu.prevent="showContextMenu">
              <marvel-menu-context2 ref="refContextMenu"
                                    :items="items"
                                    containerId="contextMenuWrapper"
                                    contextMenuItemId="contextMenuWrapperInner"
                                    v-on:onMenuItemClick="onMenuItemClick"></marvel-menu-context2>
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
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelMenuContext2.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import MarvelMenuContext2 from "~~/widget/menu/MarvelMenuContext2";

  export default {
    name: 'page4MarvelMenuContext2',
    components: {
      MarvelMenuContext2,
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
          label:"contextMenu1",
          subMenu:[{
            label:"contextSubMenu1"
          },{
            label:"contextSubMenu2"
          },{
            label:"contextSubMenu3"
          },{
            label:"contextSubMenu4"
          }]
        },{
          label:"contextMenu2",
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

      showContextMenu: function (e) {
        console.log(e);
        var x = e.clientX;
        var y = e.clientY;
        this.$refs.refContextMenu.showSubMenu(x,y);
      },
      
      onMenuItemClick: function (strMenuItemLabel) {
        console.log(strMenuItemLabel);
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
