<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelButton</div>
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

            <!--region button-->
            <marvel-button size="large" classCustom="classCustom1"
                           label="Large" :isWarn=true
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button classCustom="classCustom1" label="normal"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button size="small" classCustom="classCustom1" label="small"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button size="mini" classCustom="classCustom1" label="mini"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button ref="disabledButton" classCustom="classCustom1" label="disable" icon="icon-home3"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button ref="activeButton" classCustom="classCustom1" label="active" icon="icon-home3"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon right" iconPos="right"
                           v-on:onClick="onClick"></marvel-button>
            <!--endregion-->

            <!--region plainBtn-->
            <br>
            <br>
            <marvel-button size="large" classCustom="classCustom1"
                           label="Large" :isWarn=true
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <marvel-button classCustom="classCustom1" label="normal"
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <marvel-button size="small" classCustom="classCustom1" label="small"
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <marvel-button size="mini" classCustom="classCustom1" label="mini"
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <marvel-button ref="disabledPlainBtn" classCustom="classCustom1" label="disable" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="plainBtn" ></marvel-button>
            <marvel-button ref="activePlainBtn" classCustom="classCustom1" label="active" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="plainBtn" ></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon"
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon right" iconPos="right"
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <!--endregion-->

            <!--region dottedLineBtn-->
            <br>
            <br>
            <marvel-button size="large" classCustom="classCustom1"
                           label="Large" :isWarn=true
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <marvel-button classCustom="classCustom1" label="normal"
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <marvel-button size="small" classCustom="classCustom1" label="small"
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <marvel-button size="mini" classCustom="classCustom1" label="mini"
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <marvel-button ref="disabledDottedLineBtn" classCustom="classCustom1" label="disable" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="dottedLineBtn" ></marvel-button>
            <marvel-button ref="activeDottedLineBtn" classCustom="classCustom1" label="active" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="dottedLineBtn" ></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon"
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon right" iconPos="right"
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <!--endregion-->

            <!--region noBorderBtn-->
            <br>
            <br>
            <marvel-button size="large" classCustom="classCustom1"
                           label="Large" :isWarn=true
                           v-on:onClick="onClick" buttonType="noBorderBtn"></marvel-button>
            <marvel-button classCustom="classCustom1" label="normal"
                           v-on:onClick="onClick" buttonType="noBorderBtn"></marvel-button>
            <marvel-button size="small" classCustom="classCustom1" label="small"
                           v-on:onClick="onClick" buttonType="noBorderBtn"></marvel-button>
            <marvel-button size="mini" classCustom="classCustom1" label="mini"
                           v-on:onClick="onClick" buttonType="noBorderBtn"></marvel-button>
            <marvel-button ref="disabledNoBorderBtn" classCustom="classCustom1" label="disable" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="noBorderBtn" ></marvel-button>
            <marvel-button ref="activeNoBorderBtn" classCustom="classCustom1" label="active" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="noBorderBtn" ></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" :isWarn=true
                           v-on:onClick="onClick" buttonType="noBorderBtn"></marvel-button>
            <!--endregion-->

            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <!--region button-->
            <marvel-button size="large" classCustom="classCustom1"
                           label="Large" :isWarn=true
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button classCustom="classCustom1" label="normal"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button size="small" classCustom="classCustom1" label="small"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button size="mini" classCustom="classCustom1" label="mini"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button ref="disabledButton" classCustom="classCustom1" label="disable" icon="icon-home3"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button ref="activeButton" classCustom="classCustom1" label="active" icon="icon-home3"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon"
                           v-on:onClick="onClick"></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon right" iconPos="right"
                           v-on:onClick="onClick"></marvel-button>
            <!--endregion-->

            <!--region plainBtn-->
            <br>
            <br>
            <marvel-button size="large" classCustom="classCustom1"
                           label="Large" :isWarn=true
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <marvel-button classCustom="classCustom1" label="normal"
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <marvel-button size="small" classCustom="classCustom1" label="small"
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <marvel-button size="mini" classCustom="classCustom1" label="mini"
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <marvel-button ref="disabledPlainBtn" classCustom="classCustom1" label="disable" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="plainBtn" ></marvel-button>
            <marvel-button ref="activePlainBtn" classCustom="classCustom1" label="active" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="plainBtn" ></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon"
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon right" iconPos="right"
                           v-on:onClick="onClick" buttonType="plainBtn"></marvel-button>
            <!--endregion-->

            <!--region dottedLineBtn-->
            <br>
            <br>
            <marvel-button size="large" classCustom="classCustom1"
                           label="Large" :isWarn=true
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <marvel-button classCustom="classCustom1" label="normal"
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <marvel-button size="small" classCustom="classCustom1" label="small"
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <marvel-button size="mini" classCustom="classCustom1" label="mini"
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <marvel-button ref="disabledDottedLineBtn" classCustom="classCustom1" label="disable" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="dottedLineBtn" ></marvel-button>
            <marvel-button ref="activeDottedLineBtn" classCustom="classCustom1" label="active" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="dottedLineBtn" ></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon"
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" label="icon right" iconPos="right"
                           v-on:onClick="onClick" buttonType="dottedLineBtn"></marvel-button>
            <!--endregion-->

            <!--region noBorderBtn-->
            <br>
            <br>
            <marvel-button size="large" classCustom="classCustom1"
                           label="Large" :isWarn=true
                           v-on:onClick="onClick" buttonType="noBorderBtn"></marvel-button>
            <marvel-button classCustom="classCustom1" label="normal"
                           v-on:onClick="onClick" buttonType="noBorderBtn"></marvel-button>
            <marvel-button size="small" classCustom="classCustom1" label="small"
                           v-on:onClick="onClick" buttonType="noBorderBtn"></marvel-button>
            <marvel-button size="mini" classCustom="classCustom1" label="mini"
                           v-on:onClick="onClick" buttonType="noBorderBtn"></marvel-button>
            <marvel-button ref="disabledNoBorderBtn" classCustom="classCustom1" label="disable" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="noBorderBtn" ></marvel-button>
            <marvel-button ref="activeNoBorderBtn" classCustom="classCustom1" label="active" icon="icon-home3"
                           v-on:onClick="onClick" buttonType="noBorderBtn" ></marvel-button>
            <marvel-button classCustom="classCustom1" icon="icon-home3" :isWarn=true
                           v-on:onClick="onClick" buttonType="noBorderBtn"></marvel-button>
            <!--endregion-->
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelButtonIFrame" id="page4MarvelButtonIFrame" src="static/jsdoc/module-MarvelButtonEx.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelButton from "^/widget/btn/MarvelButton";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelButtonC',
    components: {
      MarvelButton,
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
        this.$refs.page4MarvelButtonIFrame.setIframe4DemoPage();

        this.$refs.disabledButton.setBtnDisable(true);
        this.$refs.disabledPlainBtn.setBtnDisable(true);
        this.$refs.disabledDottedLineBtn.setBtnDisable(true);
        this.$refs.disabledNoBorderBtn.setBtnDisable(true);

        this.$refs.activeButton.setActive(true);
        this.$refs.activePlainBtn.setActive(true);
        this.$refs.activeDottedLineBtn.setActive(true);
        this.$refs.activeNoBorderBtn.setActive(true);
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

  .classCustom1{
    margin-right: 20px;
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
