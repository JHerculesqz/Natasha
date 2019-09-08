<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelInputDropDownWithTip</div>
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
            <button v-on:click="onClick4GetInputDropDownWithTipSelectItem">getSelectItem</button>
            <button v-on:click="onClick4setInputDropDownWithTipSelectItem">setSelectItem aaa</button>
            <marvel-input-drop-down-with-tip ref="ref16"
                                             maxHeight="120px"
                                             :dropDownItems="inputItemsWithTip"
                                             :status="inputDropDownStatus"
                                             :errMsg="inputDropDownErrMsg"
                                             v-on:onOptionSelect="onOptionSelectInDropDownWithTip"></marvel-input-drop-down-with-tip>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <button v-on:click="onClick4GetInputDropDownWithTipSelectItem">getSelectItem</button>
            <button v-on:click="onClick4setInputDropDownWithTipSelectItem">setSelectItem aaa</button>
            <marvel-input-drop-down-with-tip ref="ref16"
                                             maxHeight="120px"
                                             :dropDownItems="inputItemsWithTip"
                                             :status="inputDropDownStatus"
                                             :errMsg="inputDropDownErrMsg"
                                             v-on:onOptionSelect="onOptionSelectInDropDownWithTip"></marvel-input-drop-down-with-tip>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelInputDropDownCIFrame" id="page4MarvelInputDropDownCIFrame" src="static/jsdoc/module-MarvelInputDropDownWithTip.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelInputDropDownWithTip from "^/widget/button/MarvelInputDropDownWithTip";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelInputDropDownC',
    components: {
      MarvelInputDropDownWithTip,
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
        inputItemsWithTip:{
          tipItems:[{
            tip:"0~100",
          }],
          optionItems:[{
            label: "Item1Name",
            active:true
          }, {
            label: "Item2Name"
          }, {
            label: "Item3Name"
          }]
        },
        inputDropDownStatus:"",
        inputDropDownErrMsg:"",
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
        this.$refs.page4MarvelInputDropDownCIFrame.setIframe4DemoPage();
      },

      //#endregion

      onClick4GetInputDropDownWithTipSelectItem:function () {
        console.log(this.$refs.ref16.getDropDownCurrentLabel());
      },
      onClick4setInputDropDownWithTipSelectItem:function () {
        this.$refs.ref16.setSelectItem("aaa");
      },
      onOptionSelectInDropDownWithTip:function (strCurrentLabel) {
        console.log(strCurrentLabel);
        var bIsItem = strCurrentLabel == "Item1Name" || strCurrentLabel == "Item2Name" || strCurrentLabel == "Item3Name"
        if(!bIsItem || parseInt(strCurrentLabel)>100 || parseInt(strCurrentLabel)<0){
          this.inputDropDownStatus = "error";
          this.inputDropDownErrMsg = "输入错误...";
        }
        else{
          this.inputDropDownStatus = "";
          this.inputDropDownErrMsg = "";
        }
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
