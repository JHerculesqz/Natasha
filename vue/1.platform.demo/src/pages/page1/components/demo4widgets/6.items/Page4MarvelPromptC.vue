<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelPrompt</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->

    <!--2级 start-->
    <div class="describe">局部提示</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner" style="height: 100%;position: relative;">
            <!--2级DemoView start-->
            <button v-on:click="onClickAddError1">添加一条错误提示</button>
            <button v-on:click="onClickAddWarning1">添加一条警告提示</button>
            <button v-on:click="onClickAddTip1">添加一条普通提示</button>
            <marvel-prompt :oPrompts="oPrompts" :disposeTimeOut="3000" :isGlobal="false"></marvel-prompt>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='

            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="describe">全局提示</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="onClickAddError2">添加一条错误提示</button>
            <button v-on:click="onClickAddWarning2">添加一条警告提示</button>
            <button v-on:click="onClickAddTip2">添加一条普通提示</button>
            <marvel-prompt :oPrompts="oGlobalPrompts" :disposeTimeOut="3000"></marvel-prompt>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='

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
  import MarvelPrompt from "^/widget/prompting/MarvelPrompt";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelPromptC',
    components: {
      MarvelPrompt,
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
        tabItems2: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        oPrompts:[],
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

      onClickAddError1:function(){
        this.oPrompts.push({
          status: '2',
          content: 'prompt1'
        });
      },
      onClickAddWarning1:function(){
        this.oPrompts.push({
          status: '1',
          content: 'prompt2'
        });
      },
      onClickAddTip1:function(){
        this.oPrompts.push({
          status: '0',
          content: 'prompt3'
        });
      },

      onClickAddError2:function(){
        this.oGlobalPrompts.push({
          status: '2',
          content: 'prompt1'
        });
      },
      onClickAddWarning2:function(){
        this.oGlobalPrompts.push({
          status: '1',
          content: 'prompt2'
        });
      },
      onClickAddTip2:function(){
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
