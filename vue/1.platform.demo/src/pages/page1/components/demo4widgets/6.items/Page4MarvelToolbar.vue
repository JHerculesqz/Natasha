<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelToolbar</div>
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
            <div style="height: 100%;">
              <button v-on:click="disableItem">disableItem</button>
              <button v-on:click="hideItem">hideItem</button>
              <marvel-toolbar v-bind:items="items"
                              v-on:onToolbarItemClick="onToolbarItemClick" v-on:onToolbarSubItemClick="onToolbarSubItemClick" >
                <div slot="保存">保存自定义子菜单</div>
              </marvel-toolbar>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="height: 100%;">
              <button v-on:click="disableItem">disableItem</button>
              <button v-on:click="hideItem">hideItem</button>
              <marvel-toolbar v-bind:items="items"
                              v-on:onToolbarItemClick="onToolbarItemClick" v-on:onToolbarSubItemClick="onToolbarSubItemClick" >
                <div slot="保存">保存自定义子菜单</div>
              </marvel-toolbar>
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
      <marvel-i-frame ref="page4MarvelToolbarIFrame" id="page4MarvelToolbarIFrame" src="static/jsdoc/module-MarvelToolbar.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelToolbar from '^/widget/toolbar/MarvelToolbar';
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelToolbar',
    components: {
      MarvelToolbar,
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
          id: 1,
          label: "拓扑还原",
          icon: "icon-drawer",
          visible:true,
          disable:false,
          subMenu:[{
            id:"a",
            label:"aaaaaaaaaaaaaaa",
            icon:"icon-drawer",
            visible:true,
            disable:false
          },{
            id:"b",
            label:"bbb",
            icon:"icon-drawer",
            visible:false,
            disable:true
          }]
        }, {
          id: 2,
          label: "保存",
          icon: "icon-drawer",
          visible:true,
          disable:true,
          hasCustomSubPanel:true
        }, {
          type:"bar"
        },{
          id: 3,
          label: "重置",
          visible:true,
          disable:false,
          icon: "icon-drawer"
        }, {
          id: 4,
          label: "导出",
          visible:true,
          disable:false,
          icon: "icon-drawer",
          subMenu:[{
            id:"c",
            label:"ccc",
            icon:"icon-drawer",
            visible:true,
            disable:true
          },{
            id:"d",
            label:"ddd",
            icon:"icon-drawer"
          }]
        }, {
          type:"bar"
        },{
          id: 5,
          label: "布局对齐",
          visible:true,
          disable:false,
          icon: "icon-drawer"
        }, {
          id: 6,
          label: "显示设置",
          visible:true,
          disable:false,
          icon: "icon-drawer"
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
        this.$refs.page4MarvelToolbarIFrame.setIframe4DemoPage();
      },

      //#endregion

      onToolbarItemClick: function (oItem) {
        console.log(oItem);
      },
      onToolbarSubItemClick:function(oItem, oParent){
        console.log(oItem);
      },
      disableItem:function(){
        this.items[2].disable = true;
      },
      hideItem:function(){
        this.items[2].visible = false;
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
