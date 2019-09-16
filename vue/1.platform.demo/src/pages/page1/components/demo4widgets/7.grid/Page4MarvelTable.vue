<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelTable</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->

    <!--2级 start-->
    <div class="describe">一次性获取全量数据表</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button @click="setRowColor4FreezeGrid">setRowColor</button>
            <button @click="removeRowColor4FreezeGrid">removeRowColor</button>
            <button @click="getSelectRows4Checkbox4FreezeGrid">getSelectRows4Checkbox</button>
            <button @click="getSelectRow4Radiobox4FreezeGrid">getSelectRow4Radiobox</button>
            <button @click="removeRow4FreezeGrid">removeRow</button>
            <button @click="getRows4FreezeGrid">getRows</button>
            <button @click="getActiveRows4FreezeGrid">getActiveRows</button>
            <button @click="disableRow4FreezeGrid">disableRow</button>
            <button @click="enableRow4FreezeGrid">enableRow</button>
            <button @click="enableAllRows4FreezeGrid">enableAllRows</button>
            <button @click="checkRow4FreezeGrid">checkRow</button>
            <button @click="checkRadioRow4FreezeGrid">checkRadioRow</button>
            <button @click="disabledDropDownCell4FreezeGrid">disabledDropDownCell</button>
            <div style="width:100%;height:300px;">
              <marvel-table ref="gridExWithFreezeColumn"
                                                 gridId="gridExWithFreezeColumn"
                                                 :titles="titlesExWithFreezeColumn"
                                                 :rows="rowsExWithFreezeColumn"
                                                 :dynamicPaging="true"
                                                 :totalNum="totalNumWithFreezeColumn"
                                                 :totalPage="totalPageWithFreezeColumn"
                                                 :limit="totalNumWithFreezeLimit"
                                                 :canDrag="true"
                                                 :hasFoot="true"
                                                 :bIsAdaptToContH="true"
                                                 :maxHeight="200"
                                                 :columnConfig="true"
                                                 v-on:editCellFinished="editCellFinished4GridExWithFreezeColumn"
                                                 v-on:sortRowsFunc="sortRowsFunc4GridExWithFreezeColumn"
                                                 v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck4GridExWithFreezeColumn"
                                                 v-on:onClickRow="onClickRow4GridExWithFreezeColumn"
                                                 v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck4GridExWithFreezeColumn"
                                                 v-on:onRowRadioCheck="onRowRadioCheck4GridExWithFreezeColumn"
                                                 v-on:onClickTextCell="onClickTextCell4GridExWithFreezeColumn"
                                                 v-on:onIconClick="onIconClick4GridExWithFreezeColumn"
                                                 v-on:onOptionChange="onOptionChange4GridExWithFreezeColumn"
                                                 v-on:onClickTextIcon="onClickTextIcon4GridExWithFreezeColumn"
                                                 v-on:onClickMultiDropdownItem="onClickMultiDropdownItem4GridExWithFreezeColumn"
                                                 v-on:onPageChange="onPageChange4GridExWithFreezeColumn"></marvel-table>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="describe">一次性获取全量数据表</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button @click="setRowColor4FreezeGrid">setRowColor</button>
            <button @click="removeRowColor4FreezeGrid">removeRowColor</button>
            <button @click="getSelectRows4Checkbox4FreezeGrid">getSelectRows4Checkbox</button>
            <button @click="getSelectRow4Radiobox4FreezeGrid">getSelectRow4Radiobox</button>
            <button @click="removeRow4FreezeGrid">removeRow</button>
            <button @click="getRows4FreezeGrid">getRows</button>
            <button @click="getActiveRows4FreezeGrid">getActiveRows</button>
            <button @click="disableRow4FreezeGrid">disableRow</button>
            <button @click="enableRow4FreezeGrid">enableRow</button>
            <button @click="enableAllRows4FreezeGrid">enableAllRows</button>
            <button @click="checkRow4FreezeGrid">checkRow</button>
            <button @click="checkRadioRow4FreezeGrid">checkRadioRow</button>
            <button @click="disabledDropDownCell4FreezeGrid">disabledDropDownCell</button>
            <div style="width:100%;height:300px;">
              <marvel-table ref="gridExWithFreezeColumn"
                            gridId="gridExWithFreezeColumn"
                            :titles="titlesExWithFreezeColumn"
                            :rows="rowsExWithFreezeColumn"
                            :dynamicPaging="true"
                            :totalNum="totalNumWithFreezeColumn"
                            :totalPage="totalPageWithFreezeColumn"
                            :limit="totalNumWithFreezeLimit"
                            :canDrag="true"
                            :hasFoot="true"
                            :bIsAdaptToContH="true"
                            :maxHeight="200"
                            :columnConfig="true"
                            v-on:editCellFinished="editCellFinished4GridExWithFreezeColumn"
                            v-on:sortRowsFunc="sortRowsFunc4GridExWithFreezeColumn"
                            v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck4GridExWithFreezeColumn"
                            v-on:onClickRow="onClickRow4GridExWithFreezeColumn"
                            v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck4GridExWithFreezeColumn"
                            v-on:onRowRadioCheck="onRowRadioCheck4GridExWithFreezeColumn"
                            v-on:onClickTextCell="onClickTextCell4GridExWithFreezeColumn"
                            v-on:onIconClick="onIconClick4GridExWithFreezeColumn"
                            v-on:onOptionChange="onOptionChange4GridExWithFreezeColumn"
                            v-on:onClickTextIcon="onClickTextIcon4GridExWithFreezeColumn"
                            v-on:onClickMultiDropdownItem="onClickMultiDropdownItem4GridExWithFreezeColumn"
                            v-on:onPageChange="onPageChange4GridExWithFreezeColumn"></marvel-table>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="describe">一次性获取全量数据表</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems3[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button @click="setRowColor4FreezeGrid">setRowColor</button>
            <button @click="removeRowColor4FreezeGrid">removeRowColor</button>
            <button @click="getSelectRows4Checkbox4FreezeGrid">getSelectRows4Checkbox</button>
            <button @click="getSelectRow4Radiobox4FreezeGrid">getSelectRow4Radiobox</button>
            <button @click="removeRow4FreezeGrid">removeRow</button>
            <button @click="getRows4FreezeGrid">getRows</button>
            <button @click="getActiveRows4FreezeGrid">getActiveRows</button>
            <button @click="disableRow4FreezeGrid">disableRow</button>
            <button @click="enableRow4FreezeGrid">enableRow</button>
            <button @click="enableAllRows4FreezeGrid">enableAllRows</button>
            <button @click="checkRow4FreezeGrid">checkRow</button>
            <button @click="checkRadioRow4FreezeGrid">checkRadioRow</button>
            <button @click="disabledDropDownCell4FreezeGrid">disabledDropDownCell</button>
            <div style="width:100%;height:300px;">
              <marvel-table ref="gridExWithFreezeColumn"
                            gridId="gridExWithFreezeColumn"
                            :titles="titlesExWithFreezeColumn"
                            :rows="rowsExWithFreezeColumn"
                            :dynamicPaging="true"
                            :totalNum="totalNumWithFreezeColumn"
                            :totalPage="totalPageWithFreezeColumn"
                            :limit="totalNumWithFreezeLimit"
                            :canDrag="true"
                            :hasFoot="true"
                            :bIsAdaptToContH="true"
                            :maxHeight="200"
                            :columnConfig="true"
                            v-on:editCellFinished="editCellFinished4GridExWithFreezeColumn"
                            v-on:sortRowsFunc="sortRowsFunc4GridExWithFreezeColumn"
                            v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck4GridExWithFreezeColumn"
                            v-on:onClickRow="onClickRow4GridExWithFreezeColumn"
                            v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck4GridExWithFreezeColumn"
                            v-on:onRowRadioCheck="onRowRadioCheck4GridExWithFreezeColumn"
                            v-on:onClickTextCell="onClickTextCell4GridExWithFreezeColumn"
                            v-on:onIconClick="onIconClick4GridExWithFreezeColumn"
                            v-on:onOptionChange="onOptionChange4GridExWithFreezeColumn"
                            v-on:onClickTextIcon="onClickTextIcon4GridExWithFreezeColumn"
                            v-on:onClickMultiDropdownItem="onClickMultiDropdownItem4GridExWithFreezeColumn"
                            v-on:onPageChange="onPageChange4GridExWithFreezeColumn"></marvel-table>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems3[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="describe">一次性获取全量数据表</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems4">
        <marvel-tab-item :isActive="tabItems4[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button @click="setRowColor4FreezeGrid">setRowColor</button>
            <button @click="removeRowColor4FreezeGrid">removeRowColor</button>
            <button @click="getSelectRows4Checkbox4FreezeGrid">getSelectRows4Checkbox</button>
            <button @click="getSelectRow4Radiobox4FreezeGrid">getSelectRow4Radiobox</button>
            <button @click="removeRow4FreezeGrid">removeRow</button>
            <button @click="getRows4FreezeGrid">getRows</button>
            <button @click="getActiveRows4FreezeGrid">getActiveRows</button>
            <button @click="disableRow4FreezeGrid">disableRow</button>
            <button @click="enableRow4FreezeGrid">enableRow</button>
            <button @click="enableAllRows4FreezeGrid">enableAllRows</button>
            <button @click="checkRow4FreezeGrid">checkRow</button>
            <button @click="checkRadioRow4FreezeGrid">checkRadioRow</button>
            <button @click="disabledDropDownCell4FreezeGrid">disabledDropDownCell</button>
            <div style="width:100%;height:300px;">
              <marvel-table ref="gridExWithFreezeColumn"
                            gridId="gridExWithFreezeColumn"
                            :titles="titlesExWithFreezeColumn"
                            :rows="rowsExWithFreezeColumn"
                            :dynamicPaging="true"
                            :totalNum="totalNumWithFreezeColumn"
                            :totalPage="totalPageWithFreezeColumn"
                            :limit="totalNumWithFreezeLimit"
                            :canDrag="true"
                            :hasFoot="true"
                            :bIsAdaptToContH="true"
                            :maxHeight="200"
                            :columnConfig="true"
                            v-on:editCellFinished="editCellFinished4GridExWithFreezeColumn"
                            v-on:sortRowsFunc="sortRowsFunc4GridExWithFreezeColumn"
                            v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck4GridExWithFreezeColumn"
                            v-on:onClickRow="onClickRow4GridExWithFreezeColumn"
                            v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck4GridExWithFreezeColumn"
                            v-on:onRowRadioCheck="onRowRadioCheck4GridExWithFreezeColumn"
                            v-on:onClickTextCell="onClickTextCell4GridExWithFreezeColumn"
                            v-on:onIconClick="onIconClick4GridExWithFreezeColumn"
                            v-on:onOptionChange="onOptionChange4GridExWithFreezeColumn"
                            v-on:onClickTextIcon="onClickTextIcon4GridExWithFreezeColumn"
                            v-on:onClickMultiDropdownItem="onClickMultiDropdownItem4GridExWithFreezeColumn"
                            v-on:onPageChange="onPageChange4GridExWithFreezeColumn"></marvel-table>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems4[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->


    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelTableIFrame" id="page4MarvelTableIFrame" src="static/jsdoc/module-MarvelTable.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTable from "^/widget/table/MarvelTable";
  import MarvelTab from "^/widget/tab/MarvelTab";
  import MarvelTabItem from "^/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "^/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelTable',
    components: {
      MarvelTable,
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
        tabItems3: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems4: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        titlesExWithFreezeColumn: [{
          label: "",
          key: "radioBox",
          type: "radioBox", //或者为 "checkBox"
          visible: true,
          width: "40px",
          freeze: "left",
          bCanColumnConfig:false
        },{
          label: "",
          key: "checkBox",
          type: "checkBox", //或者为 "checkBox"
          visible: true,
          width: "40px",
          freeze: "left",
        }, {
          label: "name",
          key: "name",
          type: "text",
          visible: true,
          orderBy: true,
          width: "100px",
          freeze: "left",
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
          freeze: "right",
        }, {
          label: "目标网元",
          key: "node",
          type: "multiDropdown",
          visible: true,
          width: "200px",
          freeze: "right",
        }],
        rowsExWithFreezeColumn: [],
        totalNumWithFreezeColumn: 200,
        totalPageWithFreezeColumn: 10,
        totalNumWithFreezeLimit: 20,
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
        this.$refs.page4MarvelTableIFrame.setIframe4DemoPage();

        this._initGridExWithFreezeColumn(1);
      },

      //#endregion

      _initGridExWithFreezeColumn: function(iPageIndex){
        this.rowsExWithFreezeColumn = [];
        let iStart = (iPageIndex - 1) * 20;
        let iEnd = iPageIndex * 20;
        for (let i = iStart; i < iEnd; i++) {
          let oRow = [];
          //key:id用于标识这一列的唯一性，在界面上不会绘制出来
          oRow.push({
            key: "id",
            value: i
          });
          oRow.push({
            key: "radioBox",
            value: "",
            checked: i == 0 ? true : false
          });
          oRow.push({
            key: "checkBox",
            value: "",
            checked: i == 0 ? true : false
          });
          oRow.push({
            key: "name",
            value: "name_" + i
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
              label: "lallalala"
            }, {
              value: "icon-location2",
              label: "lallalala"
            }, {
              value: "icon-location2 disableIcon",
              label: "lallalala"
            }]
          });
          oRow.push({
            key: "link",
            value: "icon-podcast",
            color: "#28aad3",
            label: "shit",
          });
          oRow.push({
            key: "config",
            value: [{
              value: "A",
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
          this.rowsExWithFreezeColumn.push(oRow);
        }
      },
      setRowColor4FreezeGrid: function () {
        this.$refs.gridExWithFreezeColumn.setRowColor(0);
      },
      removeRowColor4FreezeGrid: function(){
        this.$refs.gridExWithFreezeColumn.removeRowColor(0);
      },
      getSelectRows4Checkbox4FreezeGrid: function(){
        let arrRows = this.$refs.gridExWithFreezeColumn.getSelectRows4Checkbox();
        console.log(arrRows);
      },
      getSelectRow4Radiobox4FreezeGrid: function(){
        let arrRows = this.$refs.gridExWithFreezeColumn.getSelectRow4Radiobox();
        console.log(arrRows);
      },
      removeRow4FreezeGrid: function(){
        this.$refs.gridExWithFreezeColumn.removeRow(0);
      },
      getRows4FreezeGrid: function(){
        let arrRows = this.$refs.gridExWithFreezeColumn.getRows();
        console.log(arrRows);
      },
      getActiveRows4FreezeGrid: function(){
        let arrRow = this.$refs.gridExWithFreezeColumn.getActiveRows();
        console.log(arrRow);
      },
      disableRow4FreezeGrid: function(){
        this.$refs.gridExWithFreezeColumn.disableRow(1);
        this.$refs.gridExWithFreezeColumn.disableRow(4);
      },
      enableRow4FreezeGrid: function(){
        this.$refs.gridExWithFreezeColumn.enableRow(1);
      },
      enableAllRows4FreezeGrid: function(){
        this.$refs.gridExWithFreezeColumn.enableAllRows();
      },
      checkRow4FreezeGrid: function(){
        this.$refs.gridExWithFreezeColumn.checkOrUnCheckRow4CheckBox(3, true);
      },
      checkRadioRow4FreezeGrid: function(){
        this.$refs.gridExWithFreezeColumn.checkorUnCheckRow4RadioBox(3, true);
      },
      disabledDropDownCell4FreezeGrid: function(){
        this.$refs.gridExWithFreezeColumn.disabledDropDownCell(4, "config", true);
      },
      editCellFinished4GridExWithFreezeColumn: function(oRow, oCell, oOldVal, oNewVal, oAfterValidateOk){
        console.log("editCellFinished");
        console.log(oRow);
        console.log(oCell);
        console.log(oOldVal);
        console.log(oNewVal);
        oAfterValidateOk();
      },
      sortRowsFunc4GridExWithFreezeColumn: function(strKey, order, arrRows){
        console.log("editCellFinished");
        console.log(strKey);
        console.log(order);
        console.log(arrRows);
      },
      onTitleCheckOrUncheck4GridExWithFreezeColumn:function(isChecked){
        console.log("onTitleCheckOrUncheck4GridEx");
        console.log(isChecked);
      },
      onClickRow4GridExWithFreezeColumn:function(oRow){
        console.log("onClickRow4GridEx");
        console.log(oRow);
      },
      onRowCheckOrUnCheck4GridExWithFreezeColumn:function(oRow, isChecked){
        console.log("onRowCheckOrUnCheck4GridEx");
        console.log(oRow);
        console.log(isChecked);
      },
      onRowRadioCheck4GridExWithFreezeColumn:function(oRow){
        console.log("onRowRadioCheck4GridEx");
        console.log(oRow);
      },
      onClickTextCell4GridExWithFreezeColumn:function(oRow, oCell){
        console.log("onClickTextCell4GridEx");
        console.log(oRow);
        console.log(oCell);
      },
      onIconClick4GridExWithFreezeColumn:function(oRow, oCell, oIcon){
        console.log("onIconClick4GridEx");
        console.log(oRow);
        console.log(oCell);
        console.log(oIcon);
      },
      onOptionChange4GridExWithFreezeColumn:function(oRow, oCell, strOldValue, strNewValue){
        console.log("onOptionChange4GridEx");
        console.log(oRow);
        console.log(oCell);
        console.log(strOldValue);
        console.log(strNewValue);
      },
      onClickTextIcon4GridExWithFreezeColumn:function(oRow, oCell){
        console.log("onClickTextIcon4GridEx");
        console.log(oRow);
        console.log(oCell);
      },
      onClickMultiDropdownItem4GridExWithFreezeColumn:function(oRow, oCell, oItem){
        console.log("onClickMultiDropdownItem4GridEx");
        console.log(oRow);
        console.log(oCell);
        console.log(oItem);
      },
      onPageChange4GridExWithFreezeColumn: function (iPageIndex) {
        console.log("onPageChange4GridEx");
        console.log(iPageIndex);
        setTimeout(() => {
          this._initGridExWithFreezeColumn(iPageIndex);
        }, 100);
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
