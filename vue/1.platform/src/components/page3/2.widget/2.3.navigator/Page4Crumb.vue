<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">面包屑</div>
    <div class="describe">
      面包屑控件
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">面包屑</div>
    <div class="describe">
      面包屑
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div>
              <marvel-crumb :items="items" v-on:onCrumbItemClick="onItemClick" customSeparateSymbol="/"></marvel-crumb>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <marvel-high-light ref="crumbCode"></marvel-high-light>
              <!--<pre>-->
                <!--<code class="html">-->
<!--&lt;marvel-crumb :items="items" v-on:onCrumbItemClick="onItemClick"&gt;&lt;/marvel-crumb&gt;-->
                <!--</code>-->
              <!--</pre>-->
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
  </div>
</template>

<script>
  import MarvelCrumb from "@/walle/widget/crumb/MarvelCrumb"
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelHighLight from "../../../../walle/widget/highlight/MarvelHighLight";

  export default {
    name: 'page4Crumb',
    components: {
      MarvelHighLight,
      MarvelCrumb,
      MarvelTab,
      MarvelTabItem
    },
    data: function() {
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
          label: "system"
        }, {
          label: "notify"
        }, {
          label: "settings"
        }]
        //#endregion
      }
    },
    mounted:function(){
      //#region init
      this._initEx();
      //#endregion
    },
    methods:{
      //#region inner

      //#region lifeCycle

      _initEx: function(){
        var strLangType = "js";
        var strCode = '<marvel-crumb :items=\"items\" v-on:onCrumbItemClick=\"onItemClick\"></marvel-crumb>';
        this.$refs.crumbCode.setData(strLangType, strCode);
      },

      //#endregoin


      onItemClick: function(strItemLabel, iItemIndex){
        console.log(strItemLabel);
        console.log(iItemIndex);
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
