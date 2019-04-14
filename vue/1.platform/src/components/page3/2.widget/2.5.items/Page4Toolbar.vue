<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">Toolbar</div>
    <div class="describe">
      Toolbar
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">Toolbar</div>
    <div class="describe">
      Toolbar
    </div>
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
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-toolbar v-bind:items="items"&gt;&lt;/marvel-toolbar&gt;
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
  import MarvelToolbar from '@/walle/widget/toolbar/MarvelToolbar';

  export default {
    components: {
      MarvelToolbar,
      MarvelTab,
      MarvelTabItem
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
      };
    },
    methods: {
      //#region inner
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
    width: 100%;
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
