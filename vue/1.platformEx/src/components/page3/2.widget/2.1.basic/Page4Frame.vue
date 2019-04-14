<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">栅格</div>
    <div class="describe">
      栅格
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">栅格</div>
    <div class="describe">
      栅格
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="page4Frame">
              <marvel-frame media="24,24,24,24" hasMargin="true" classCustom="classCustom1">
                <marvel-frame media="20,12,4,0" hasMargin="false" classCustom="classCustom2">1</marvel-frame>
                <marvel-frame media="4,12,20,24" hasMargin="false" classCustom="classCustom3">2</marvel-frame>
              </marvel-frame>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="html">
&lt;div class="page4Frame"&gt;
  &lt;marvel-frame media="24,24,24,24" hasMargin="true" classCustom="classCustom1"&gt;
  &lt;marvel-frame media="20,12,4,0" hasMargin="false" classCustom="classCustom2"&gt;1&lt;/marvel-frame&gt;
  &lt;marvel-frame media="4,12,20,24" hasMargin="false" classCustom="classCustom3"&gt;2&lt;/marvel-frame&gt;
  &lt;/marvel-frame&gt;
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
  import {MarvelFrame} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4Frame',
    components: {
      MarvelFrame,
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
  .classCustom1{
    height:20px;
    background-color: #e8e8e8;
    margin-bottom: 10px;
  }
  .classCustom2{
    height:50px;
    background-color: #f7b57c;
    margin-bottom: 10px;
  }
  .classCustom3{
    height:20px;
    background-color: #5eff68;
    margin-bottom: 10px;
  }
  /*custom style end*/
</style>
