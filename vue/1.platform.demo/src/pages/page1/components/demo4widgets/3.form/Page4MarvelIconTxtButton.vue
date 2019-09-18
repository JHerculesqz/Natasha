<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelIconTxtButton</div>
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
            <marvel-icon-txt-button size="large" classCustom="classCustom1" label="Large"
                                    icon="icon-home3" :isWarn=true
                                    v-on:onClick="onClick"></marvel-icon-txt-button>
            <marvel-icon-txt-button classCustom="classCustom1" label="normal"
                                    icon="icon-home3"
                                    v-on:onClick="onClick"></marvel-icon-txt-button>
            <marvel-icon-txt-button size="small" classCustom="classCustom1" label="small"
                                    icon="icon-home3"
                                    v-on:onClick="onClick"></marvel-icon-txt-button>
            <marvel-icon-txt-button size="mini" classCustom="classCustom1" label="mini"
                                    icon="icon-home3"
                                    v-on:onClick="onClick"></marvel-icon-txt-button>
            <marvel-icon-txt-button classCustom="classCustom1" label="overflow overflow overflow overflow"
                                    :butStyle="butStyle"
                                    :maxWidth=100
                                    icon="icon-home3"
                                    v-on:onClick="onClick"></marvel-icon-txt-button>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <marvel-icon-txt-button size="large" classCustom="classCustom1" label="Large"
                                    icon="icon-home3" :isWarn=true
                                    v-on:onClick="onClick"></marvel-icon-txt-button>
            <marvel-icon-txt-button classCustom="classCustom1" label="normal"
                                    icon="icon-home3"
                                    v-on:onClick="onClick"></marvel-icon-txt-button>
            <marvel-icon-txt-button size="small" classCustom="classCustom1" label="small"
                                    icon="icon-home3"
                                    v-on:onClick="onClick"></marvel-icon-txt-button>
            <marvel-icon-txt-button size="mini" classCustom="classCustom1" label="mini"
                                    icon="icon-home3"
                                    v-on:onClick="onClick"></marvel-icon-txt-button>
            <marvel-icon-txt-button classCustom="classCustom1" label="overflow overflow overflow overflow"
                                    :butStyle="butStyle"
                                    :maxWidth=100
                                    icon="icon-home3"
                                    v-on:onClick="onClick"></marvel-icon-txt-button>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelIconTxtButtonIFrame" id="page4MarvelIconTxtButtonIFrame" src="static/jsdoc/module-MarvelIconTxtButton.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIconTxtButton from "^/widget/button/MarvelIconTxtButton";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelIconTxtButton',
    components: {
      MarvelIconTxtButton,
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
        butStyle:{
          color:'#ff4040'
        }
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
        this.$refs.page4MarvelIconTxtButtonIFrame.setIframe4DemoPage();
      },

      //#endregion

      onClick: function () {
        console.log(1);
      },

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
