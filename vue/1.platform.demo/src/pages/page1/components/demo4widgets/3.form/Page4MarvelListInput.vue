<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelListInput</div>
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
            <div style="width:360px;">
              <button v-on:click="setLisInputData">设置值</button>
              <button v-on:click="getLisInputData">获取值</button>
              <button v-on:click="setLisInputError">设置报错状态</button>
              <button v-on:click="clearLisInputError">清除报错状态</button>
              <marvel-list-input ref="ref2" @onValueChange="onListInputValueChange"></marvel-list-input>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="width:360px;">
              <button v-on:click="setLisInputData">设置值</button>
              <button v-on:click="getLisInputData">获取值</button>
              <button v-on:click="setLisInputError">设置报错状态</button>
              <button v-on:click="clearLisInputError">清除报错状态</button>
              <marvel-list-input ref="ref2" @onValueChange="onListInputValueChange"></marvel-list-input>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelListInputIFrame" id="page4MarvelListInputIFrame" src="static/jsdoc/module-MarvelListInput.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelListInput from "^/widget/input/MarvelListInput";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelListInput',
    components: {
      MarvelListInput,
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
        this.$refs.page4MarvelListInputIFrame.setIframe4DemoPage();
      },

      //#endregion

      setLisInputData: function () {
        this.$refs.ref2.setListInputMsg([{
          value:"nameD"
        },{
          value:"nameE"
        },]);
      },

      getLisInputData: function () {
        var oData = this.$refs.ref2.getListInputMsg();
        console.log(oData);
      },

      setLisInputError: function () {
        this.$refs.ref2.setErrStatus([1,3], "error tip");
      },

      clearLisInputError: function () {
        this.$refs.ref2.clearErrorStatus();
      },

      onListInputValueChange: function () {
        this.getLisInputData();
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
