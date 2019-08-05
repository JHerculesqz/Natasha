<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelSwitch</div>
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
            <button v-on:click="getSwitch">getStatus</button>
            <br>
            <marvel-switch ref="ref4" id="id5" :check="false" v-on:onClick="onSwitchClick"></marvel-switch>
            <marvel-switch ref="ref5" id="id6"
                           buObj="buObj..."
                           v-on:onClick="onSwitchClick"
                           v-on:onChange="onChange4Switch"></marvel-switch>
            <br>
            <marvel-switch ref="ref6" id="id7" v-on:onClick="onSwitchClick"></marvel-switch>
            <marvel-switch ref="ref7" id="id8" v-on:onClick="onSwitchClick"></marvel-switch>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <button v-on:click="getSwitch">getStatus</button>
            <br>
            <marvel-switch ref="ref4" id="id5" :check="false" v-on:onClick="onSwitchClick"></marvel-switch>
            <marvel-switch ref="ref5" id="id6"
                           buObj="buObj..."
                           v-on:onClick="onSwitchClick"
                           v-on:onChange="onChange4Switch"></marvel-switch>
            <br>
            <marvel-switch ref="ref6" id="id7" v-on:onClick="onSwitchClick"></marvel-switch>
            <marvel-switch ref="ref7" id="id8" v-on:onClick="onSwitchClick"></marvel-switch>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelSwitchIFrame" id="page4MarvelSwitchIFrame" src="static/jsdoc/module-MarvelSwitch.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelSwitch from "^/widget/select/MarvelSwitch";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelSwitch',
    components: {
      MarvelSwitch,
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
        this.$refs.page4MarvelSwitchIFrame.setIframe4DemoPage();
      },

      //#endregion

      getSwitch: function () {
        console.log("[Switch]getStatus..." +
          this.$refs.ref4.getCheckItem() + "," +
          this.$refs.ref5.getCheckItem());
      },
      onChange4Switch: function(strOldVal, strNewVal, buObj){
        console.log("[Switch]change..." + strNewVal + "," + buObj);
      },
      onSwitchClick: function(bChecked){
        console.log("onSwitchClick");
        console.log(bChecked);
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
