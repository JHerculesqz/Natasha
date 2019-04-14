<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">Wizard</div>
    <div class="describe">
      Wizard控件是一个向导控件，用于描述一个流程，能够清晰看到流程进行到哪一个步。
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">Wizard1</div>
    <div class="describe">
      Wizard1
    </div>
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
            <!--2级CodeView start-->
            <pre>
                <code class="html">
                  &lt;marvel-wizard ref="ref0" :items="items"&gt;&lt;/marvel-wizard&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">Wizard2</div>
    <div class="describe">
      Wizard2
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div>
              <button v-on:click="setWarn">setWarn</button>
              <button v-on:click="setNotWarn">setNotWarn</button>
              <button v-on:click="setItemActive">setItemActive</button>
              <marvel-wizard-tab ref="ref4WizardTabs"
                                 :wizardTabs="wizardTabs" v-on:onClick="onClickWizardTab"></marvel-wizard-tab>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
                  &lt;marvel-wizard-tab
                                     :wizardTabs="wizardTabs" v-on:onClick="onClickWizardTab"&gt;&lt;/marvel-wizard-tab&gt;
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
  import MarvelWizard from "@/walle/widget/wizard/MarvelWizard";
  import MarvelWizardTab from "@/walle/widget/wizard/MarvelWizardTab";
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";

  export default {
    name: 'page4Wizard',
    components: {
      MarvelWizard,
      MarvelWizardTab,
      MarvelTab,
      MarvelTabItem
    },
    data: function () {
      return {
        //#region document data
        tabItems1: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        tabItems2: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        //#endregion
        //#region custom data
        //#region wizard
        items: [{
          label: "Basic Information",
          index: 1
        }, {
          label: "Condition",
          index: 2
        }, {
          label: "Action",
          index: 3
        }],
        //#endregion
        //#region wizardTab
        wizardTabs: [{
          index: 1,
          label: "拓扑还原",
          isActive: true,
          isWarn: false
        }, {
          index: 2,
          label: "业务还原",
          isActive: false,
          isWarn: true
        },{
          index: 3,
          label: "业务还原",
          isActive: false,
          isWarn: false
        }]
        //#endregion
        //#endregion
      }
    },
    methods: {
      //#region inner
      //#region wizard
      setProgress: function () {
        this.$refs.ref0.setProgress(1);
        this.$refs.ref0.setProgress(2);
      },
      //#endregion
      //#region wizardTab
      onClickWizardTab: function (oItem) {
        alert(oItem.index);
      },
      setWarn: function () {
        this.$refs.ref4WizardTabs.setItemWarnOrNot([1], true);
      },
      setNotWarn: function () {
        this.$refs.ref4WizardTabs.setItemWarnOrNot([1], false);
      },
      setItemActive: function(){
        this.$refs.ref4WizardTabs.setItemActive([3]);
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

  /*document fix style end*/
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
