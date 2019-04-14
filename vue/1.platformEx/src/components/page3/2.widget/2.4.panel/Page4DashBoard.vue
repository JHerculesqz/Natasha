<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">DashBoard</div>
    <div class="describe">
      DashBoard页面xxx
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">DashBoard</div>
    <div class="describe">
      DashBoard
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="height: 400px;width:500px;background-color: #fafafa;padding: 20px;">
              <marvel-dashboard title="Shit">
                <div slot="customArea">customArea...</div>
                <div slot="contArea">cont...</div>
              </marvel-dashboard>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="html">
  &lt;marvel-dashboard title="Shit"&gt;
  &lt;div slot="customArea"&gt;customArea...&lt;/div&gt;
  &lt;div slot="contArea"&gt;cont...&lt;/div&gt;
  &lt;/marvel-dashboard&gt;
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
  import {MarvelDashboard, MarvelWarning} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4DashBoard',
    components: {
      MarvelWarning,
      MarvelDashboard,
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
          label: "system",
          click: function(){
            console.log("system...");
          }
        }, {
          label: "notify",
          click: function(){
            console.log("notify...");
          }
        }, {
          label: "settings",
          click: function(){
            console.log("settings...");
          }
        }]
        //#endregion
      }
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
</style>
