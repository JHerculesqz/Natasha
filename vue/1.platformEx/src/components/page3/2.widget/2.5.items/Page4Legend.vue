<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">图例</div>
    <div class="describe">
      图例
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">图例</div>
    <div class="describe">
      图例
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width:500px;height: 150px; background-color: #f0f0f0;">
              <marvel-legend :legendItems="items"
                             v-on:onLegendItemClick="onLegendItemClick"></marvel-legend>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;div style="width:500px;height: 150px; background-color: #f0f0f0;"&gt;
  &lt;marvel-legend :legendItems="items"
                 v-on:onLegendItemClick="onLegendItemClick"&gt;&lt;/marvel-legend&gt;
&lt;/div&gt;
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
  //#region fui
  import {MarvelTab, MarvelTabItem} from "marvel-fui2";
  import MarvelHight from "marvel-fui2/src/walle/component/highlight";
  import {MarvelLegend} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4Legend',
    components: {
      MarvelTabItem,
      MarvelTab,
      MarvelLegend},
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
          label: "在线",
          level: "level5",
          isHide:false
        }, {
          label: "待机",
          level: "level3",
          isHide:false
        }, {
          label: "离线",
          level: "level6",
          isHide:false
        }]
        //#endregion
      }
    },
    methods: {
      //#region inner
      onLegendItemClick: function(){
        console.log(this.items);
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
  .widgetShowSession{
    padding: 20px 100px;
    width:100%;
    box-sizing: border-box;
  }
  .title{
    color: #4d4d4d;
  }
  .level1{
    font-size: 32px;
    line-height: 54px;
  }
  .level2{
    margin-top: 40px;
    font-size: 22px;
    line-height: 48px;
  }
  .describe{
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }
  .showArea{
    width:100%;
  }
  .codeArea{
    width: 100%;
    height:100%;
    background-color: #f0f0f0;
    overflow: auto;
  }
  .codeArea pre,.codeArea code{
    padding: 0;
    margin: 0;
    min-width: 100%;
    float: left;
  }
  .showAreaInner{
    padding-top: 36px;
    box-sizing: border-box;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: rgba(0,0,0,0.4);
  }
  /*document fix  style end*/
  /*document custom style start*/
  .showArea{
    height:250px;
  }
  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/
</style>
