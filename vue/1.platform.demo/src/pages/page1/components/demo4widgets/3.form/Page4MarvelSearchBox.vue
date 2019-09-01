<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelSearchWithDropDown</div>
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
            <div class="panel">
              <marvel-search placeholder="请输入关键字..." @search="search"></marvel-search>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div class="panel">
              <button @click="upDateSearchOption">updateSelectOption</button>
              <MarvelSearchWithDropDown placeholder="请输入关键字..." @search="search2"
                                        :selectItems="selectItems"></MarvelSearchWithDropDown>
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
            <div class="panel">
              <button @click="upDateSearchOption">updateSelectOption</button>
              <marvel-search placeholder="请输入关键字..." @search="search2"
                                        :selectItems="selectItems"></marvel-search>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div class="panel">
              <button @click="upDateSearchOption">updateSelectOption</button>
              <MarvelSearchWithDropDown placeholder="请输入关键字..." @search="search2"
                                        :selectItems="selectItems"></MarvelSearchWithDropDown>
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
      <marvel-i-frame ref="page4MarvelSearchWithDropDownIFrame" id="page4MarvelSearchWithDropDownIFrame" src="static/jsdoc/module-MarvelSearchWithDropDown.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelSearch from '^/widget/search/MarvelSearchWithDropDown';
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelSearchBox',
    components: {
      MarvelSearch,
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
        selectItems: [
          {
            label: "ip"
          },
          {
            label: "网元名称",
            selected: true
          },
          {
            label: "组名"
          }]
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
        this.$refs.page4MarvelSearchWithDropDownIFrame.setIframe4DemoPage();
      },

      //#endregion

      search: function (strSearchKey, strSearchValue) {
        console.log(strSearchKey);
        console.log(strSearchValue);
      },

      search2: function (strSearchKey, strSearchValue) {
        console.log(strSearchKey);
        console.log(strSearchValue);
      },
      upDateSearchOption: function () {
        this.selectItems[1].selected = false;
        this.selectItems.push({
          label: "others",
          selected: true
        })
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

  .docArea {
    width: 100%;
  }

  .docArea iframe {
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
  .panel {
    padding: 10px;
    width: 400px;
    height: 50px;
  }

  /*region dark theme*/

  .dark .title {
    color: #ffffff;
  }

  .dark .describe {
    color: #8b90b3;
  }

  /*endregion*/
</style>
