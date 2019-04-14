<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">Dialog</div>
    <div class="describe">
      Dialog
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">Dialog</div>
    <div class="describe">
      Dialog
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="onClickDialogShow">show</button>
            <marvel-dialog theme="dark" :showDialog="showDialog"
                           title="上传" width="500" height="300"
                           v-on:onClickDialogClose="onClickDialogClose">
              <div slot="dialogCont">111111</div>
              <div slot="dialogFoot">

              </div>
            </marvel-dialog>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;button v-on:click="onClickDialogShow"&gt;show&lt;/button&gt;
&lt;marvel-dialog theme="dark" :showDialog="showDialog"
               title="上传" width="500" height="300"
               v-on:onClickDialogClose="onClickDialogClose"&gt;
  &lt;div slot="dialogCont"&gt;111111&lt;/div&gt;
  &lt;div slot="dialogFoot"&gt;

  &lt;/div&gt;
&lt;/marvel-dialog&gt;
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
  import {MarvelDialog, MarvelButton} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4Dialog',
    components: {
      MarvelButton,
      MarvelDialog,
      MarvelTabItem,
      MarvelTab,
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
        showDialog: false
        //#endregion
      }
    },
    mounted: function () {
      //#region custom

      //#endregion
    },
    methods: {
      //#region inner
      onClickDialogShow: function () {
        this.showDialog = true;
      },
      onClickDialogClose: function(){
        this.showDialog = false;
      },
      onClickCancel: function(){
        this.showDialog = false;
        alert("Cancel");
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
</style>
