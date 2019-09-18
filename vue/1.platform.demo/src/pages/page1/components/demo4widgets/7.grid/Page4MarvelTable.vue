<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelTable</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->

    <!--2级 start-->
    <div class="describe">一次性获取全量数据表 & 全量单元格内容展示</div>
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
            <div style="width:100%;height:260px;">
              <marvel-table ref="gridExWithFreezeColumn"
                            gridId="gridExWithFreezeColumn"
                            :titles="titles4allEle"
                            :rows="rows4allEle"
                            :limit="limit4allEle"
                            :canDrag="true"
                            detailRowComponent="TableDetailsComponent"
                            :hasFoot="true"
                            :columnConfig="true"
                            v-on:editCellFinished="editCellFinished"
                            v-on:sortRowsFunc="sortRowsFunc"
                            v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck"
                            v-on:onClickRow="onClickRow"
                            v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck"
                            v-on:onRowRadioCheck="onRowRadioCheck"
                            v-on:onClickTextCell="onClickTextCell"
                            v-on:onIconClick="onIconClick"
                            v-on:onOptionChange="onOptionChange"
                            v-on:onClickTextIcon="onClickTextIcon"
                            v-on:onClickMultiDropdownItem="onClickMultiDropdownItem"
                            v-on:onClickSwitch="onClickSwitch"
                            v-on:onClickImg="onClickImg"
                            v-on:onPageChange="onPageChange"></marvel-table>
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
                            :titles="titles4tableData"
                            :rows="rows4tableData"
                            :dynamicPaging="true"
                            :totalNum="totalNum4tableData"
                            :totalPage="totalPage4tableData"
                            :limit="limit4tableData"
                            :canDrag="true"
                            :hasFoot="true"
                            :bIsAdaptToContH="true"
                            :maxHeight="200"
                            :columnConfig="true"
                            v-on:editCellFinished="editCellFinished"
                            v-on:sortRowsFunc="sortRowsFunc"
                            v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck"
                            v-on:onClickRow="onClickRow"
                            v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck"
                            v-on:onRowRadioCheck="onRowRadioCheck"
                            v-on:onClickTextCell="onClickTextCell"
                            v-on:onIconClick="onIconClick"
                            v-on:onOptionChange="onOptionChange"
                            v-on:onClickTextIcon="onClickTextIcon"
                            v-on:onClickMultiDropdownItem="onClickMultiDropdownItem"
                            v-on:onPageChange="onPageChange"></marvel-table>
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
                            :titles="titles4tableData"
                            :rows="rows4tableData"
                            :dynamicPaging="true"
                            :totalNum="totalNum4tableData"
                            :totalPage="totalPage4tableData"
                            :limit="limit4tableData"
                            :canDrag="true"
                            :hasFoot="true"
                            :bIsAdaptToContH="true"
                            :maxHeight="200"
                            :columnConfig="true"
                            v-on:editCellFinished="editCellFinished"
                            v-on:sortRowsFunc="sortRowsFunc"
                            v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck"
                            v-on:onClickRow="onClickRow"
                            v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck"
                            v-on:onRowRadioCheck="onRowRadioCheck"
                            v-on:onClickTextCell="onClickTextCell"
                            v-on:onIconClick="onIconClick"
                            v-on:onOptionChange="onOptionChange"
                            v-on:onClickTextIcon="onClickTextIcon"
                            v-on:onClickMultiDropdownItem="onClickMultiDropdownItem"
                            v-on:onPageChange="onPageChange"></marvel-table>
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
              <marvel-table ref="table4tableData"
                            gridId="table4tableData"
                            :titles="titles4tableData"
                            :rows="rows4tableData"
                            :dynamicPaging="true"
                            :totalNum="totalNum4tableData"
                            :totalPage="totalPage4tableData"
                            :limit="limit4tableData"
                            :canDrag="true"
                            :hasFoot="true"
                            :bIsAdaptToContH="true"
                            :maxHeight="200"
                            :columnConfig="true"
                            v-on:editCellFinished="editCellFinished"
                            v-on:sortRowsFunc="sortRowsFunc"
                            v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck"
                            v-on:onClickRow="onClickRow"
                            v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck"
                            v-on:onRowRadioCheck="onRowRadioCheck"
                            v-on:onClickTextCell="onClickTextCell"
                            v-on:onIconClick="onIconClick"
                            v-on:onOptionChange="onOptionChange"
                            v-on:onClickTextIcon="onClickTextIcon"
                            v-on:onClickMultiDropdownItem="onClickMultiDropdownItem"
                            v-on:onPageChange="onPageChange"></marvel-table>
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
  import Vue from "vue";
  import MarvelTable from "^/widget/table/MarvelTable";
  import MarvelTab from "^/widget/tab/MarvelTab";
  import MarvelTabItem from "^/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "^/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import ConfigUtils from "./config4Table/Page4MarvelTableConfig";
  import TableDetailsComponent from "./config4Table/TableDetailsComponent";

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
        titles4allEle:[],
        rows4allEle:[],
        totalPage4allEle:1,
        totalNum4allEle:0,
        limit4allEle:20,

        titles4tableData:[],
        rows4tableData:[],
        totalPage4tableData:1,
        totalNum4tableData:0,
        limit4tableData:20,
        //#endregion
      }
    },
    created() {
      Vue.component(TableDetailsComponent.name, TableDetailsComponent);
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

        this._initGridData(1);
      },

      _initGridData: function(iPage){
        this._initGridData4AllEle(iPage);
        this._initGridData4TableData(iPage);
      },

      _initGridData4AllEle: function(iPage){
        var oData = JSON.parse(JSON.stringify(ConfigUtils.getConfigOptions('allEle', iPage)));
        this.titles4allEle = oData.titles;
        this.rows4allEle = oData.rows;
        this.totalPage4allEle = oData.totalPage;
        this.totalNum4allEle = oData.totalNum;
        this.limit4allEle = oData.limit;
      },
      _initGridData4TableData: function(iPage){
        var oData = JSON.parse(JSON.stringify(ConfigUtils.getConfigOptions('tableData', iPage)));
        this.titles4tableData = oData.titles;
        this.rows4tableData = oData.rows;
        this.totalPage4tableData = oData.totalPage;
        this.totalNum4tableData = oData.totalNum;
        this.limit4tableData = oData.limit;
      },


      //#endregion

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
      editCellFinished: function(oRow, oCell, oOldVal, oNewVal, oAfterValidateOk){
        console.log("editCellFinished");
        console.log(oRow);
        console.log(oCell);
        console.log(oOldVal);
        console.log(oNewVal);
        oAfterValidateOk();
      },
      sortRowsFunc: function(strKey, order, arrRows){
        console.log("editCellFinished");
        console.log(strKey);
        console.log(order);
        console.log(arrRows);
      },
      onTitleCheckOrUncheck:function(isChecked){
        console.log("onTitleCheckOrUncheck4Table");
        console.log(isChecked);
      },
      onClickRow:function(oRow){
        console.log("onClickRow4Table");
        console.log(oRow);
      },
      onRowCheckOrUnCheck:function(oRow, isChecked){
        console.log("onRowCheckOrUnCheck4Table");
        console.log(oRow);
        console.log(isChecked);
      },
      onRowRadioCheck:function(oRow){
        console.log("onRowRadioCheck4Table");
        console.log(oRow);
      },
      onClickTextCell:function(oRow, oCell){
        console.log("onClickTextCell4Table");
        console.log(oRow);
        console.log(oCell);
      },
      onIconClick:function(oRow, oCell, oIcon){
        console.log("onIconClick4Table");
        console.log(oRow);
        console.log(oCell);
        console.log(oIcon);
      },
      onOptionChange:function(oRow, oCell, strOldValue, strNewValue){
        console.log("onOptionChange4Table");
        console.log(oRow);
        console.log(oCell);
        console.log(strOldValue);
        console.log(strNewValue);
      },
      onClickTextIcon:function(oRow, oCell){
        console.log("onClickTextIcon4Table");
        console.log(oRow);
        console.log(oCell);
      },
      onClickMultiDropdownItem:function(oRow, oCell, oItem){
        console.log("onClickMultiDropdownItem4Table");
        console.log(oRow);
        console.log(oCell);
        console.log(oItem);
      },
      onClickSwitch: function(oRow, oCell){
        console.log("onClickSwitch");
        console.log(oRow);
        console.log(oCell);
      },
      onClickImg: function(oRow, oCell){
        console.log("onClickImg");
        console.log(oRow);
        console.log(oCell);
      },
      onPageChange: function (iPageIndex) {
        console.log("onPageChange4Table");
        console.log(iPageIndex);
        setTimeout(() => {
          this._initGridData4TableData(iPageIndex);
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
