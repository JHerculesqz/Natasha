<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">布局2</div>
    <div class="describe">
      页面布局，分为head导航栏，内容面板，内容面板分为左、中、右三个子面板。
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">布局2</div>
    <div class="describe">
      布局2
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <marvel-layout2 hasMargin="false"
                            media1="4,4,4,0" media2="16,16,16,24" media3="4,4,4,0"
                            classCustom1="classCustom1" classCustom2="classCustom2" classCustom3="classCustom3">
              <div slot="head">head</div>
              <div slot="left">left</div>
              <div slot="content">content</div>
              <div slot="right">right</div>
            </marvel-layout2>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="js">
&lt;marvel-layout2 hasMargin="false" media1="4,4,4,0" media2="16,16,16,24" media3="4,4,4,0" classCustom1="classCustom1" classCustom2="classCustom2" classCustom3="classCustom3"&gt;
  &lt;div slot="head"&gt;head&lt;/div&gt;
  &lt;div slot="left"&gt;left&lt;/div&gt;
  &lt;div slot="content"&gt;content&lt;/div&gt;
  &lt;div slot="right"&gt;right&lt;/div&gt;
&lt;/marvel-layout2&gt;
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
  import MarvelLayout2 from "@/walle/widget/layout/MarvelLayout2";
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";

  export default {
    name: 'page4Layout2',
    components: {
      MarvelLayout2,
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
  .classCustom1{
    height: 100%;margin-bottom: 10px;background-color: yellow;
  }
  .classCustom2{
    height: 100%;margin-bottom: 10px;background-color: red;
  }
  .classCustom3{
    height: 100%;margin-bottom: 10px;background-color: blue;
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
