<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">mini loading</div>
    <div class="describe">
      mini loading
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">mini loading</div>
    <div class="describe">
      mini loading
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="showEx">show</button>
            <button v-on:click="setProgress">setProgress</button>
            <button v-on:click="hideEx">hide</button>
            <marvel-loading-mini ref="ref0" v-on:onCancel="loadingOnCancel"></marvel-loading-mini>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-frame hasMargin="false" media="24,24,24,24" classCustom="classCustom1"&gt;
  &lt;button v-on:click="showEx"&gt;show&lt;/button&gt;
  &lt;button v-on:click="setProgress"&gt;setProgress&lt;/button&gt;
  &lt;button v-on:click="hideEx"&gt;hide&lt;/button&gt;
  &lt;marvel-loading-mini ref="ref0"&gt;&lt;/marvel-loading-mini&gt;
&lt;/marvel-frame&gt;
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
  import MarvelFrame from "@/walle/widget/frame/MarvelFrame";
  import MarvelLoadingMini from "@/walle/widget/loading/MarvelLoadingMini";

  export default {
    name: 'page4Loading2',
    components: {MarvelTabItem,
      MarvelTab,MarvelFrame, MarvelLoadingMini},
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

        //#endregion
      }
    },
    methods: {
      //#region inner
      showEx: function(){
        this.$refs.ref0.showEx("取消");
      },
      setProgress: function(){
        var self = this;
        self.$refs.ref0.setProgress(10, "step1...");
        setTimeout(function(){
          self.$refs.ref0.setProgress(30, "step2...");
          setTimeout(function(){
            self.$refs.ref0.setProgress(60, "step3...");
            setTimeout(function(){
              self.$refs.ref0.setProgress(100, "step4...");
            },1000);
          },1000);
        },1000);
      },
      hideEx: function(){
        this.$refs.ref0.hideEx();
      },
      //#endregion
      //#region callback
      loadingOnCancel:function(){
        console.log("loadingCancel");
      }
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
  .classCustom1{
    height: 100%;margin-bottom: 10px;background-color: yellow;
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
