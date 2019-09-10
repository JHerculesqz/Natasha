<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelMenuContext2</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->
    <div class="describe">图标右键菜单</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner" style="width: 100%;height: 100%">
            <!--2级DemoView start-->
            <div id="contextMenuWrapper1" style="width: 100%; height: 100%;" @contextmenu.prevent="showContextMenu1">
              <marvel-context-menu ref="refContextMenu1"
                                    :items="items1"
                                    containerId="contextMenuWrapper1"
                                    contextMenuItemId="contextMenuWrapperInner1"
                                    v-on:onMenuItemClick="onMenuItemClick1"></marvel-context-menu>
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
    <div class="describe">文本右键菜单</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner" style="width: 100%;height: 100%">
            <!--2级DemoView start-->
            <div id="contextMenuWrapper2" style="width: 100%; height: 100%;" @contextmenu.prevent="showContextMenu2">
              <marvel-context-menu ref="refContextMenu2"
                                   :items="items2"
                                   :onlyIcon="true"
                                   containerId="contextMenuWrapper2"
                                   contextMenuItemId="contextMenuWrapperInner2"
                                   v-on:onMenuItemClick="onMenuItemClick1"></marvel-context-menu>
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
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelMenuContext2IFrame" id="page4MarvelMenuContext2IFrame" src="static/jsdoc/module-MarvelMenuContext2.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import MarvelContextMenu from "~~/widget/contextMenu/MarvelContextMenu";

  export default {
    name: 'page4MarvelMenuContextC',
    components: {
      MarvelContextMenu,
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
        items1:[{
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
        }],
        items2: [{
          icon: "icon-cancel-circle",
          color: "#ff4c4c",
          label: "删除"
        }, {
          icon: "icon-pencil",
          color: "",
          label: "编辑"
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
        this.$refs.page4MarvelMenuContext2IFrame.setIframe4DemoPage();
      },

      //#endregion

      showContextMenu1: function (e) {
        console.log(e);
        var x = e.clientX;
        var y = e.clientY;
        this.$refs.refContextMenu1.showSubMenu(x,y);
      },
      showContextMenu2: function (e) {
              console.log(e);
              var x = e.clientX;
              var y = e.clientY;
              this.$refs.refContextMenu2.showSubMenu(x,y);
            },

      onMenuItemClick1: function (strMenuItemLabel) {
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
