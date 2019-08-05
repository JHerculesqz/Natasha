<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelConfirmEx</div>
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
            <button v-on:click="onClickConfirmShowEx">show</button>
            <marvel-confirm-ex :showConfirm="showConfirmEx"
                               :showOkBtn="showOkBtn4ConfirmEx"
                               :showCancelBtn="showCancelBtn4ConfirmEx"
                               :confirmTitle="confirmTitle4ConfirmEx"
                               :confirmIcon="confirmIcon4ConfirmEx"
                               :confirmIconColor="confirmIconColor4ConfirmEx"
                               :confirmSubTitle="confirmSubTitle4ConfirmEx"
                               :confirmCont="confirmExContent4ConfirmEx"
                               :canDrag="true"
                               v-on:onClickOK="onClickConfirmExOK"
                               v-on:onClickCancel="onClickConfirmExCancel"></marvel-confirm-ex>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <button v-on:click="onClickConfirmShowEx">show</button>
            <marvel-confirm-ex :showConfirm="showConfirmEx"
                               :showOkBtn="showOkBtn4ConfirmEx"
                               :showCancelBtn="showCancelBtn4ConfirmEx"
                               :confirmTitle="confirmTitle4ConfirmEx"
                               :confirmIcon="confirmIcon4ConfirmEx"
                               :confirmIconColor="confirmIconColor4ConfirmEx"
                               :confirmSubTitle="confirmSubTitle4ConfirmEx"
                               :confirmCont="confirmExContent4ConfirmEx"
                               :canDrag="true"
                               v-on:onClickOK="onClickConfirmExOK"
                               v-on:onClickCancel="onClickConfirmExCancel"></marvel-confirm-ex>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelConfirmExIFrame" id="page4MarvelConfirmExIFrame" src="static/jsdoc/module-MarvelConfirmEx.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelConfirmEx from "^/widget/dialog/MarvelConfirmEx";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelConfirmEx',
    components: {
      MarvelConfirmEx,
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
        showConfirmEx:false,
        showOkBtn4ConfirmEx:true,
        showCancelBtn4ConfirmEx:true,
        confirmTitle4ConfirmEx:"ConfirmEx",
        confirmIcon4ConfirmEx:"icon-cancel-circle",
        confirmIconColor4ConfirmEx:"#ff4040",
        confirmSubTitle4ConfirmEx:"Operation Failed",
        confirmExContent4ConfirmEx:[{
          key:"Description:",
          value:"Failed to create services."
        },{
          key:"Reason:",
          value:"Failed to create services."
        },{
          key:"Detail:",
          value:"Failed to create services."
        },{
          key:"Repair advice:",
          value:"Please contact technical support."
        },]
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
        this.$refs.page4MarvelConfirmExIFrame.setIframe4DemoPage();
      },

      //#endregion

      onClickConfirmShowEx: function () {
        this.showConfirmEx = true;
      },
      onClickConfirmExOK: function(){
        this.showConfirmEx = false;
      },
      onClickConfirmExCancel: function(){
        this.showConfirmEx = false;
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
