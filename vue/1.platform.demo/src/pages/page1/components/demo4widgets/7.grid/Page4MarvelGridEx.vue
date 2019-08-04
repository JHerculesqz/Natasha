<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelGridEx</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->
    <div class="describe">
      基本功能展示
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button @click="setRowColorEx">setRowColor</button>
            <button @click="removeRowColorEx">removeRowColor</button>
            <button @click="getSelectRows4CheckboxEx">getSelectRows4Checkbox</button>
            <button @click="removeRowEx">removeRow</button>
            <button @click="getRowsEx">getRows</button>
            <button @click="getActiveRowsEx">getActiveRows</button>
            <button @click="resetRowEx">resetRow</button>
            <button @click="disableRowEx">disableRow</button>
            <button @click="enableRowEx">enableRow</button>
            <button @click="enableAllRowsEx">enableAllRows</button>
            <button @click="checkRow">checkRow</button>
            <button @click="disabledDropDownCell">disabledDropDownCell</button>
<!--            <button @click="getUnFoldRowIds">getUnFoldRowIds</button>-->
            <div style="width:800px;height:300px;">
              <marvel-grid-ex ref="gridEx"
                              :parentTitles="titlesExParent"
                              :showParentTitles="true"
                              :titles="titlesEx"
                              :rows="rowsEx"
                              :limit="15"
                              gridId="demoEx"
                              v-on:editCellFinished="editCellFinishedEx"
                              :canDrag="true"
                              :hasFoot="true"
                              :showPageNum="true"
                              :supportCustomerDropDown="true"
                              searchComponent="CustomerSearchComponent"
                              :showChangeLimit="true"
                              :limitRange="[15,30,50,100]"
                              :unFoldRowIds="unFoldRowIds"
                              v-on:onClickRow="onClickRowEx"
                              v-on:onDblclickRow="onDblclickRowEx"
                              v-on:onIconClick="onIconClickEx"
                              v-on:onClickTextIcon="onClickTextIconEx"
                              v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheckEx"
                              v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheckEx"
                              v-on:onRowRadioCheck="onRowRadioCheckEx"
                              v-on:onOptionChange="onOptionChangeEx"
                              v-on:onClickMultiDropdownItem="onClickMultiDropdownItemEx"
                              v-on:onClickTextCell="onClickTextCell"
                              v-on:onClickFoldOrUnFold="onClickFoldOrUnFold"
                              v-on:onClickSwitch="onClickSwitch"
                              v-on:onClickImg="onClickImg"></marvel-grid-ex>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <button @click="setRowColorEx">setRowColor</button>
            <button @click="removeRowColorEx">removeRowColor</button>
            <button @click="getSelectRows4CheckboxEx">getSelectRows4Checkbox</button>
            <button @click="removeRowEx">removeRow</button>
            <button @click="getRowsEx">getRows</button>
            <button @click="getActiveRowsEx">getActiveRows</button>
            <button @click="resetRowEx">resetRow</button>
            <button @click="disableRowEx">disableRow</button>
            <button @click="enableRowEx">enableRow</button>
            <button @click="enableAllRowsEx">enableAllRows</button>
            <button @click="checkRow">checkRow</button>
            <button @click="disabledDropDownCell">disabledDropDownCell</button>
<!--            <button @click="getUnFoldRowIds">getUnFoldRowIds</button>-->
            <div style="width:800px;height:300px;">
              <marvel-grid-ex ref="gridEx"
                              :parentTitles="titlesExParent"
                              :showParentTitles="true"
                              :titles="titlesEx"
                              :rows="rowsEx"
                              :limit="15"
                              gridId="demoEx"
                              v-on:editCellFinished="editCellFinishedEx"
                              :canDrag="true"
                              :hasFoot="true"
                              :showPageNum="true"
                              :supportCustomerDropDown="true"
                              searchComponent="CustomerSearchComponent"
                              :showChangeLimit="true"
                              :limitRange="[15,30,50,100]"
                              :unFoldRowIds="unFoldRowIds"
                              v-on:onClickRow="onClickRowEx"
                              v-on:onDblclickRow="onDblclickRowEx"
                              v-on:onIconClick="onIconClickEx"
                              v-on:onClickTextIcon="onClickTextIconEx"
                              v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheckEx"
                              v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheckEx"
                              v-on:onRowRadioCheck="onRowRadioCheckEx"
                              v-on:onOptionChange="onOptionChangeEx"
                              v-on:onClickMultiDropdownItem="onClickMultiDropdownItemEx"
                              v-on:onClickTextCell="onClickTextCell"
                              v-on:onClickFoldOrUnFold="onClickFoldOrUnFold"
                              v-on:onClickSwitch="onClickSwitch"
                              v-on:onClickImg="onClickImg"></marvel-grid-ex>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <div class="describe">
      单元格合并
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 800px; height: 100%;">
              <marvel-grid-ex ref="gridEx2_21111"
                              gridId="demoEx2_21111"
                              :titles="titles99"
                              :rows="rows99"
                              :hasMergedRowOrColumn="true"
                              :dynamicPaging="true"
                              :totalNum="totalNum"
                              :totalPage="totalPage"
                              :canDrag="true"
                              :hasFoot="true"
                              :limit="15"
                              :showChangeLimit="true"
                              :limitRange="[15,30,50,100]"
                              v-on:onPageChange="onPageChange"
                              v-on:onPerPageNumChange="onPerPageNumChange"></marvel-grid-ex>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="width: 800px; height: 100%;">
              <marvel-grid-ex ref="gridEx2_21111"
                              gridId="demoEx2_21111"
                              :titles="titles99"
                              :rows="rows99"
                              :hasMergedRowOrColumn="true"
                              :dynamicPaging="true"
                              :totalNum="totalNum"
                              :totalPage="totalPage"
                              :canDrag="true"
                              :hasFoot="true"
                              :limit="15"
                              :showChangeLimit="true"
                              :limitRange="[15,30,50,100]"
                              v-on:onPageChange="onPageChange"
                              v-on:onPerPageNumChange="onPerPageNumChange"></marvel-grid-ex>
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
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelGridEx.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import Vue from "vue";
  import Bus from "^/core/bus";
  import MarvelGridEx from "^/widget/grid/MarvelGridEx";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import CustomerSearchComponent from "./CustomerSearchComponent"
  import CustomerButtonComponent from "./CustomerButtonComponent"
  import CustomerGridComponent1 from "./CustomerGridComponent1"
  import CommonTitle from "./common_title"

  export default {
    name: 'page4MarvelGridEx',
    components: {
      MarvelGridEx,
      MarvelIFrame,
      MarvelAceEditor,
      MarvelTab,
      MarvelTabItem,
    },
    created() {
      Vue.component(CustomerSearchComponent.name, CustomerSearchComponent);
      Vue.component(CustomerButtonComponent.name, CustomerButtonComponent);
      Vue.component(CustomerGridComponent1.name, CustomerGridComponent1);
      Bus.$on("searchMutation", this.updateRowEx);
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
        titlesExParent: [{
          label: "name",
          key: "name",
          type: "txt",
          visible: true,
          width: "740px"
        }, {
          label: "description1",
          key: "description",
          type: "txt",
          visible: true,
          width: "400px"
        }, {
          label: "description2",
          key: "description",
          type: "txt",
          visible: true,
          width: "800px"
        }, {
          label: "description3",
          key: "description",
          type: "txt",
          visible: true,
          width: "600px"
        }],
        titlesEx: [{
          label: "",
          key: "checkBox",
          type: "checkBox", //或者为 "checkBox"
          visible: true,
          width: "40px",
        }, {
          label: "name",
          key: "name",
          type: "text",
          visible: true,
          orderBy: true,
          search: true,
          width: "100px",
        }, {
          label: "描述信息",
          key: "description",
          type: "input",
          visible: true,
          orderBy: true,
          width: "200px"
        }, {
          label: "操作",
          key: "operation",
          type: "icon",
          visible: true,
          width: "200px"
        }, {
          label: "链接",
          key: "link",
          type: "textIcon",
          visible: true,
          width: "200px"
        }, {
          label: "配置项",
          key: "config",
          type: "dropdown",
          visible: true,
          width: "200px",
        }, {
          label: "node",
          key: "node",
          type: "multiDropdown",
          visible: true,
          width: "200px"
        }, {
          label: "自定义",
          key: "customer",
          type: "customer",
          visible: true,
          width: "200px"
        }, {
          label: "是/否",
          key: "switch",
          type: "switch",
          visible: true,
          width: "200px"
        }, {
          label: "多行文本",
          key: "multiText",
          type: "multiText",
          visible: true,
          width: "200px"
        }, {
          label: "图片",
          key: "nodeImg",
          type: "img",
          visible: true,
          width: "200px"
        }],
        rowsEx: [],
        unFoldRowIds: [],
        //#endregion
        //#region merge
        titles99: [{
          label: "name",
          key: "name",
          width: "300px",
          type: "text",
          visible: true,
        }, {
          label: "age",
          key: "age",
          width: "300px",
          type: "text",
          visible: true,
        }, {
          label: "hobby",
          key: "hobby",
          width: "300px",
          type: "text",
          visible: true,
        }, {
          label: "hahaha",
          key: "hahaha",
          width: "300px",
          type: "input",
          visible: true,
        }],
        rows99: [[{
          key: "name",
          value: "张三",
        }, {
          key: "age",
          value: "22",
          bgColor: "red",
        }, {
          key: "hobby",
          value: "篮球",
          rowspan: 3,
        }, {
          key: "hahaha",
          value: "hahahahahaha",
          rowspan: 3,
        }], [{
          key: "name",
          value: "李四",
        }, {
          key: "age",
          value: "27",
        }, {
          key: "hobby",
          value: "篮球",
          rowspan: 0,
        }, {
          key: "hahaha",
          value: "hahahahahaha",
          rowspan: 0,
        }], [{
          key: "name",
          value: "王五",
        }, {
          key: "age",
          value: "28",
        }, {
          key: "hobby",
          value: "篮球",
          rowspan: 0,
        }, {
          key: "hahaha",
          value: "hahahahahaha",
          rowspan: 0,
        }]],
        totalNum:1000,
        totalPage:10,
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
        this.$refs.IFrame.setIframe4DemoPage();

        this._initGridEx()
      },

      //#endregion

      _initGridEx: function () {
        this.rowsEx = [];
        var arrRows = [];
        for (var i = 0; i < 100; i++) {
          let oRow = [];
          //key:id用于标识这一列的唯一性，在界面上不会绘制出来
          oRow.push({
            key: "id",
            value: i
          });
          oRow.push({
            key: "checkBox",
            value: "",
            checked: i == 0 ? true : false,
            disabled: i % 4 == 0 ? true : false,
          });
          oRow.push({
            key: "name",
            value: "name_" + i,
            config: {
              color: "red"
            },
            title: "自定义title" + i
          });
          oRow.push({
            key: "description",
            value: "input_cell" + i
          });
          oRow.push({
            key: "operation",
            value: [{
              value: "icon-location2",
              color: "red",
              label: "aaa"
            }, {
              value: "icon-location2",
              label: "aaa"
            }, {
              value: "icon-location2 disableIcon",
              label: "aaa"
            }]
          });
          oRow.push({
            key: "link",
            value: "",
            color: "#28aad3",
            label: "link",
          });
          oRow.push({
            key: "config",
            value: [{
              value: "AAAAAAAAAAAAA",
            }, {
              value: "B",
              selected: true
            }, {
              value: "C"
            }],
          });
          oRow.push({
            key: "node",
            value: [{
              value: "Node1",
              selected: true,
            }, {
              value: "Node2",
              selected: true
            }, {
              value: "Node3"
            }, {
              value: "Node4"
            }],
          });
          if (i == 1) {
            oRow.push({
              key: "customer",
              type: "text",
              value: "自定义"
            });
          } else {
            oRow.push({
              key: "customer",
              type: "inpur",
              value: "自定义"
            });
          }
          oRow.push({
            key: "switch",
            value: true
          });
          oRow.push({
            key: "multiText",
            value: ["aaaaaa", "bbbbbbb", "cccccc"]
          });
          oRow.push({
            key: "nodeImg",
            value: "static/image/others/node1.svg",
            label: "aaaaaa"
          });
          arrRows.push(oRow);
        }
        this.rowsEx = JSON.parse(JSON.stringify(arrRows));
        this.unFoldRowIds = [this.rowsEx[0][0].value, this.rowsEx[1][0].value]
      },
      setRowColorEx: function () {
        this.$refs.gridEx.setRowColor(1);
      },
      removeRowColorEx: function () {
        this.$refs.gridEx.removeRowColor(1);
      },
      getSelectRows4CheckboxEx: function () {
        let arrRows = this.$refs.gridEx.getSelectRows4Checkbox();
        console.log(arrRows);
      },
      removeRowEx: function () {
        this.$refs.gridEx.removeRow(0);
      },
      getRowsEx: function () {
        let arrRows = this.$refs.gridEx.getRows();
        console.log(arrRows);
      },
      getActiveRowsEx: function () {
        let arrRow = this.$refs.gridEx.getActiveRows();
        console.log(arrRow);
      },
      resetRowEx: function () {
        let arrRows = this.$refs.gridEx.getRows();
        arrRows.splice(arrRows.length -1);
        this.rowsEx = arrRows;
      },
      disableRowEx: function () {
        this.$refs.gridEx.disableRow(1);
      },
      enableRowEx: function () {
        this.$refs.gridEx.enableRow(1);
      },
      enableAllRowsEx: function () {
        this.$refs.gridEx.enableAllRows();
      },
      checkRow: function () {
        this.$refs.gridEx.checkOrUnCheckRow4CheckBox(3, true);
      },
      disabledDropDownCell: function () {
        this.$refs.gridEx.disabledDropDownCell(4, "config", true);
      },
      getUnFoldRowIds: function () {
        console.log(this.$refs.gridEx.getUnFoldRowIds());
      },
      editCellFinishedEx: function (oRow, oCell, oOldVal, oNewVal, oAfterCallback, oAfrerFailCallback) {
        console.log("editCellFinished");
        console.log(oRow);
        console.log(oCell);
        console.log(oOldVal);
        console.log(oNewVal);

        let bValidate = Math.random()>0.5 ? true: false;
        if(bValidate){
          oAfterCallback();
        }else{
          oAfrerFailCallback();
        }
      },
      onClickRowEx: function (oRow) {
        console.log("onClickRowEx");
        console.log(oRow);
      },
      onDblclickRowEx: function (oRow) {
        console.log("onDblclickRowEx");
        console.log(oRow);
      },
      onIconClickEx: function (oRow, oCell, oIcon) {
        console.log("onIconClickEx");
        console.log(oRow);
        console.log(oCell);
        console.log(oIcon);
      },
      onClickTextIconEx: function (oRow, oCell) {
        console.log("onClickTextIconEx");
        console.log(oRow);
        console.log(oCell);
      },
      onTitleCheckOrUncheckEx: function (isChecked) {
        console.log("onTitleCheckOrUncheckEx");
        console.log(isChecked);
      },
      onRowCheckOrUnCheckEx: function (oRow, isChecked) {
        console.log("onRowCheckOrUnCheckEx");
        console.log(oRow);
        console.log(isChecked);
        let strId = this.$refs.gridEx.getCellValueByKey("id", oRow);
        this.$refs.gridEx.setRowColor(strId, true);
      },
      onRowRadioCheckEx: function (oRow) {
        console.log("onRowRadioCheckEx");
        console.log(oRow);
      },
      onOptionChangeEx: function (oRow, oCell, strOldValue, strNewValue) {
        console.log("onOptionChangeEx");
        console.log(oRow);
        console.log(oCell);
        console.log(strOldValue);
        console.log(strNewValue);
      },
      onClickMultiDropdownItemEx: function (oRow, oCell, oItem) {
        console.log("onClickMultiDropdownItemEx");
        console.log(oRow);
        console.log(oCell);
        console.log(oItem);
      },
      onClickTextCell: function (oRow, oCell) {
        console.log("onClickTextCell");
        console.log(oRow);
        console.log(oCell);
        if(oCell.key == "customer"){
          oCell.type = 'dropdown';
          oCell.value = [{
            value:"A"
          },{
            value:"B",
            selected: true
          },{
            value:"C"
          }]
        }
      },
      onClickFoldOrUnFold: function (oRow, bUnFold) {
        console.log(bUnFold);
      },
      updateRowEx: function(arrRows){
        this.rowsEx = arrRows;
      },
      onClickSwitch: function (oRow, oCell) {
        console.log("onClickSwitch");
        console.log(oRow);
        console.log(oCell);
      },
      onClickImg: function (oRow, oCell) {
        console.log("onClickImg");
        console.log(oRow);
        console.log(oCell);
      },
      
      
      //merge grid
      onPageChange: function (iPageIndex, perPageNum) {
        console.log(iPageIndex);
        console.log(perPageNum);
      },
      onPerPageNumChange: function (perPageNum) {
        console.log(perPageNum);
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

  /*region dark theme*/

  .dark .title {
    color: #ffffff;
  }

  .dark .describe {
    color: #8b90b3;
  }

  /*endregion*/
</style>
