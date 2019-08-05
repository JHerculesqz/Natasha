<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelPromptGlobal</div>
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
            <button v-on:click="onClickAddError">添加一条错误提示</button>
            <button v-on:click="onClickAddWarning">添加一条警告提示</button>
            <button v-on:click="onClickAddTip">添加一条普通提示</button>
            <MarvelPromptGlobal :oPrompts="oGlobalPrompts" :disposeTimeOut="3000"></MarvelPromptGlobal>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <button v-on:click="onClickAddError">添加一条错误提示</button>
            <button v-on:click="onClickAddWarning">添加一条警告提示</button>
            <button v-on:click="onClickAddTip">添加一条普通提示</button>
            <MarvelPromptGlobal :oPrompts="oGlobalPrompts" :disposeTimeOut="3000"></MarvelPromptGlobal>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelPromptGlobalIFrame" id="page4MarvelPromptGlobalIFrame" src="static/jsdoc/module-MarvelPromptGlobal.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelPromptGlobal from "^/widget/prompt/MarvelPromptGlobal";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelPromptGlobal',
    components: {
      MarvelPromptGlobal,
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
        oGlobalPrompts:[]
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
        this.$refs.page4MarvelPromptGlobalIFrame.setIframe4DemoPage();
      },

      //#endregion

      onClickAddError:function(){
        this.oGlobalPrompts.push({
          status: '2',
          content: 'prompt1'
        });
      },
      onClickAddWarning:function(){
        this.oGlobalPrompts.push({
          status: '1',
          content: 'prompt2'
        });
      },
      onClickAddTip:function(){
        this.oGlobalPrompts.push({
          status: '0',
          content: 'prompt3'
        });
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
