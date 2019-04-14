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
            <marvel-dialog :showDialog="showDialog"
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
                  &lt;marvel-dialog :showDialog="showDialog"
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
    <!--2级 start-->
    <div class="title level2">Confirm Dialog</div>
    <div class="describe">
      Confirm Dialog
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="onClickConfirmShow">show</button>
            <marvel-confirm :showConfirm="showConfirm"
                            confirmCont="这是一个提示确认框"
                            tipType="tip"
                            v-on:onClickOK="onClickConfirmOK"
                            v-on:onClickCancel="onClickConfirmCancel"></marvel-confirm>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
                  &lt;button v-on:click="onClickConfirmShow"&gt;show&lt;/button&gt;
                  &lt;marvel-confirm :showConfirm="showConfirm"
                                  v-on:onClickConfirmClose="onClickConfirmClose"
                                  confirmCont="这是一个提示确认框"
                                  tipType="tip"
                  &gt;&lt;/marvel-confirm&gt;
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
  import MarvelDialog from "@/walle/widget/dialog/MarvelDialog";
  import MarvelConfirm from "@/walle/widget/dialog/MarvelConfirm";
  import MarvelButton from "@/walle/widget/button/MarvelButton";

  export default {
    name: 'page4Dialog',
    components: {
      MarvelButton,
      MarvelDialog,
      MarvelConfirm,
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
        tabItems2: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        showDialog: false,
        showConfirm: false
        //#endregion
      }
    },
    mounted: function () {
      //#region custom

      //#endregion
    },
    methods: {
      //#region inner

      //#region dialog

      onClickDialogShow: function () {
        this.showDialog = true;
      },
      onClickDialogClose: function(){
        this.showDialog = false;
      },

      //#endregion

      //#region confirm dialog

      onClickConfirmShow: function () {
        this.showConfirm = true;
      },
      onClickConfirmOK: function(){
        this.showConfirm = false;
      },
      onClickConfirmCancel: function(){
        this.showConfirm = false;
      }

      //#endregion

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
