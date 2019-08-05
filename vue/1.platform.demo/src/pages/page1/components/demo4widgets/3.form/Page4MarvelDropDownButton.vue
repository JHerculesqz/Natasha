<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelDropDownButton</div>
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
            <button v-on:click="initDropDown">initDropDown</button>
            <button v-on:click="onClick4GetSelectItem">getSelectItem</button>
            <button v-on:click="onClick4GetSelectItemObj">getSelectItemObj</button>
            <button v-on:click="onClick4setSelectItem">setSelectItem Item1</button>
            <marvel-drop-down-button ref="ref14" width="100%" status="error" errMsg="error"
                                     maxHeight="100px" :dropDownItems="items" :showSelectIcon="false"
                                     v-on:onOptionSelect="onOptionSelect"></marvel-drop-down-button>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <button v-on:click="initDropDown">initDropDown</button>
            <button v-on:click="onClick4GetSelectItem">getSelectItem</button>
            <button v-on:click="onClick4GetSelectItemObj">getSelectItemObj</button>
            <button v-on:click="onClick4setSelectItem">setSelectItem Item1</button>
            <marvel-drop-down-button ref="ref14" width="100%" status="error" errMsg="error"
                                     maxHeight="100px" :dropDownItems="items" :showSelectIcon="false"
                                     v-on:onOptionSelect="onOptionSelect"></marvel-drop-down-button>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelDropDownButtonIFrame" id="page4MarvelDropDownButtonIFrame" src="static/jsdoc/module-MarvelDropDownButton.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelDropDownButton from "^/widget/button/MarvelDropDownButton";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelDropDownButton',
    components: {
      MarvelDropDownButton,
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
        items: [],
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
        this.$refs.page4MarvelDropDownButtonIFrame.setIframe4DemoPage();
      },

      //#endregion

      initDropDown: function () {
        this.items=[{
          label: "Item1",
          active: true
//          icon: "icon-pencil"
        }, {
          label: "Item2",
//          icon: "icon-pen"
          icon: ""
        }, {
          label: "Item3",
          icon: "icon-droplet"
        }]
      },
      onClick4GetSelectItem: function () {
        console.log(this.$refs.ref14.getSelectItem());
      },
      onClick4GetSelectItemObj: function () {
        console.log(this.$refs.ref14.getSelectItemObj());
      },
      onClick4setSelectItem: function () {
        this.$refs.ref14.setSelectItem(this.items[0].label)
      },
      onOptionSelect: function (oItem) {
        console.log(oItem);
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
