<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelWizard</div>
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
            <div>
            <button v-on:click="setProgress">setProgress</button>
            <marvel-wizard ref="ref0" :items="items" :isClickable="true"></marvel-wizard>
          </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
             <div>
            <button v-on:click="setProgress">setProgress</button>
            <marvel-wizard ref="ref0" :items="items" :isClickable="true"></marvel-wizard>
          </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--2级 start-->

    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div>
              <button v-on:click="setProgress">setProgress</button>
              <marvel-wizard ref="ref1" :items="items2" :isClickable="true" :isVertical="true">
                <div slot="aa">aa</div>
                <div slot="bb">bb</div>
                <div slot="cc">cc</div>
              </marvel-wizard>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
             <div>
              <button v-on:click="setProgress">setProgress</button>
              <marvel-wizard ref="ref1" :items="items2" :isClickable="true" :isVertical="true">
                <div slot="aa">aa</div>
                <div slot="bb">bb</div>
                <div slot="cc">cc</div>
              </marvel-wizard>
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
      <marvel-i-frame ref="page4MarvelWizardIFrame" id="page4MarvelWizardIFrame" src="static/jsdoc/module-MarvelWizard.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelWizard from "^/widget/wizard/MarvelWizard";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelWizard',
    components: {
      MarvelWizard,
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
        items: [{
          label: "Basic Information",
          index: 1
        }, {
          label: "Condition",
          index: 2,
          disable: true
        }, {
          label: "Action",
          index: 3
        }],
        items2: [{
          label: "Basic Information",
          slotName:"aa",
          contentH:"100px",
          index: 1
        }, {
          label: "Condition",
          slotName:"bb",
          contentH:"200px",
          index: 2,
          disable: true
        }, {
          label: "Action",
          slotName:"cc",
          contentH:"300px",
          index: 3
        }],
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
        this.$refs.page4MarvelWizardIFrame.setIframe4DemoPage();
      },

      //#endregion

      setProgress: function () {
        this.$refs.ref0.setProgress(1);
        this.$refs.ref0.setProgress(2);
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
