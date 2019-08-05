<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelInputDropDown</div>
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
            <button v-on:click="onClick4GetInputDropDownSelectItem">getSelectItem</button>
            <button v-on:click="onClick4GetInputDropDownSelectItemObj">getSelectItemObj</button>
            <button v-on:click="onClick4setInputDropDownSelectItem">setSelectItem Item6</button>
            <marvel-input-drop-down ref="ref15" status="error" errMsg="error" :dropDownItems="inputItems"
                                    maxHeight="120px"></marvel-input-drop-down>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <button v-on:click="onClick4GetInputDropDownSelectItem">getSelectItem</button>
            <button v-on:click="onClick4GetInputDropDownSelectItemObj">getSelectItemObj</button>
            <button v-on:click="onClick4setInputDropDownSelectItem">setSelectItem Item6</button>
            <marvel-input-drop-down ref="ref15" status="error" errMsg="error" :dropDownItems="inputItems"
                                    maxHeight="120px"></marvel-input-drop-down>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelInputDropDownIFrame" id="page4MarvelInputDropDownIFrame" src="static/jsdoc/module-MarvelInputDropDown.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelInputDropDown from "^/widget/button/MarvelInputDropDown";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelInputDropDown',
    components: {
      MarvelInputDropDown,
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
        inputItems:[{
          label: "Item1Name",
          active: true,
        }, {
          label: "Item2Name"
        }, {
          label: "Item3Name"
        },{
          label: "aaaaaaaaaaa"
        }, {
          label: "bbbbbbbbbbb"
        }, {
          label: "ccccccccccc"
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
        this.$refs.page4MarvelInputDropDownIFrame.setIframe4DemoPage();
      },

      //#endregion

      onClick4GetInputDropDownSelectItem:function(){
        console.log(this.$refs.ref15.getSelectItem());
      },
      onClick4GetInputDropDownSelectItemObj:function(){
        console.log(this.$refs.ref15.getSelectItemObj());
      },
      onClick4setInputDropDownSelectItem:function(){
        this.$refs.ref15.setSelectItem(this.inputItems[5].label);
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
