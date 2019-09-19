<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelTable</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->

    <!--2级 start-->
    <div class="describe">一次性获取全量数据表 & 全量单元格内容展示 & 适应内容高度并设置高度最大值200</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button @click="setRowColor4FreezeGrid">setRowColor</button>
            <button @click="getActiveRows4FreezeGrid">getActiveRows</button>
            <button @click="removeRowColor4FreezeGrid">removeRowColor</button>
            <button @click="getSelectRows4Checkbox4FreezeGrid">getSelectRows4Checkbox</button>
            <button @click="getSelectRow4Radiobox4FreezeGrid">getSelectRow4Radiobox</button>
            <button @click="removeRow4FreezeGrid">removeRow</button>
            <button @click="getRows4FreezeGrid">getRows</button>
            <button @click="disableRow4FreezeGrid">disableRow</button>
            <button @click="enableRow4FreezeGrid">enableRow</button>
            <button @click="enableAllRows4FreezeGrid">enableAllRows</button>
            <button @click="checkRow4FreezeGrid">checkRow</button>
            <button @click="checkRadioRow4FreezeGrid">checkRadioRow</button>
            <button @click="disabledDropDownCell4FreezeGrid">disabledDropDownCell</button>
            <div style="width:100%;height:260px;">
              <marvel-table ref="table4allEle"
                            gridId="table4allEle"
                            :titles="titles4allEle"
                            :rows="rows4allEle"
                            :limit="limit4allEle"
                            :canDrag="true"
                            detailRowComponent="TableDetailsComponent"
                            searchComponent="TableSearchComponent"
                            :hasFoot="true"
                            :columnConfig="true"
                            :showChangeLimit="true"
                            :limitRange="[20,30,50,100]"
                            v-on:editCellFinished="editCellFinished"
                            v-on:sortRowsFunc="sortRowsFunc"
                            v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck"
                            v-on:onClickRow="onClickRow"
                            v-on:onClickFoldOrUnFold="onClickFoldOrUnFold"
                            v-on:onDblclickRow="onDblclickRow"
                            v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck"
                            v-on:onRowRadioCheck="onRowRadioCheck"
                            v-on:onClickTextCell="onClickTextCell"
                            v-on:onIconClick="onIconClick"
                            v-on:onOptionChange="onOptionChange"
                            v-on:onClickTextIcon="onClickTextIcon"
                            v-on:onClickMultiDropdownItem="onClickMultiDropdownItem"
                            v-on:onClickSwitch="onClickSwitch"
                            v-on:onClickImg="onClickImg"></marvel-table>
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
    <br>
    <div class="describe">分页获取数据表 & 适应父容器高度 & 左右设置固定列</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width:100%;height:340px;">
              <marvel-table ref="tablePaging"
                            gridId="tablePaging"
                            :titles="titles4tablePaging"
                            :rows="rows4tablePaging"
                            :dynamicPaging="true"
                            :totalNum="totalNum4tablePaging"
                            :totalPage="totalPage4tablePaging"
                            :limit="limit4tablePaging"
                            :canDrag="true"
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
                            v-on:onPageChange="onPageChange4tablePaging"></marvel-table>
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
    <br>
    <div class="describe">单元格合并</div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems3[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width:100%;height:340px;">
              <marvel-table ref="tableCombine"
                            gridId="tableCombine"
                            :parentTitles="parentTitles4tableCombineCell"
                            :titles="titles4tableCombineCell"
                            :rows="rows4tableCombineCell"
                            :dynamicPaging="true"
                            :totalNum="totalNum4tableCombineCell"
                            :totalPage="totalPage4tableCombineCell"
                            :limit="limit4tableCombineCell"
                            :canDrag="true"
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
                            v-on:onPageChange="onPageChange4tableCombine"></marvel-table>
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

    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelTableIFrame" id="page4MarvelTableIFrame" src="static/jsdoc/module-MarvelTable.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import Bus from "^/core/bus";
  import Vue from "vue";
  import MarvelTable from "^/widget/table/MarvelTable";
  import MarvelTab from "^/widget/tab/MarvelTab";
  import MarvelTabItem from "^/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "^/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import ConfigUtils from "./config4Table/Page4MarvelTableConfig";
  import TableDetailsComponent from "./config4Table/TableDetailsComponent";
  import TableSearchComponent from "./config4Table/TableSearchComponent"

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
        //#endregion
        //#region custom data
        titles4allEle:[],
        rows4allEle:[],
        totalPage4allEle:1,
        totalNum4allEle:0,
        limit4allEle:20,

        titles4tablePaging:[],
        rows4tablePaging:[],
        totalPage4tablePaging:1,
        totalNum4tablePaging:0,
        limit4tablePaging:20,

        parentTitles4tableCombineCell:[],
        titles4tableCombineCell:[],
        rows4tableCombineCell:[],
        totalPage4tableCombineCell:1,
        totalNum4tableCombineCell:0,
        limit4tableCombineCell:20,
        //#endregion
      }
    },
    created() {
      Vue.component(TableDetailsComponent.name, TableDetailsComponent);
      Vue.component(TableSearchComponent.name, TableSearchComponent);
      Bus.$on("searchCustomer4Table", this._updateRowEx);
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
        this._initGridData4TablePaging(iPage);
        this._initGridData4TableCombineCell(iPage);
      },

      _initGridData4AllEle: function(iPage){
        var oData = JSON.parse(JSON.stringify(ConfigUtils.getConfigOptions('allEle', iPage)));
        this.titles4allEle = oData.titles;
        this.totalPage4allEle = oData.totalPage;
        this.totalNum4allEle = oData.totalNum;
        this.limit4allEle = oData.limit;

        this._initGridRowData4AllEle(iPage)
      },
      _initGridData4TablePaging: function(iPage){
        var oData = JSON.parse(JSON.stringify(ConfigUtils.getConfigOptions('tablePaging', iPage)));
        this.titles4tablePaging = oData.titles;
        this.totalPage4tablePaging = oData.totalPage;
        this.totalNum4tablePaging = oData.totalNum;
        this.limit4tablePaging = oData.limit;

        this._initGridRowData4TablePaging(iPage);
      },
      _initGridData4TableCombineCell: function(iPage){
        var oData = JSON.parse(JSON.stringify(ConfigUtils.getConfigOptions('tableCombineCell', iPage)));
        this.parentTitles4tableCombineCell = oData.parentTitles;
        this.titles4tableCombineCell = oData.titles;
        this.totalPage4tableCombineCell = oData.totalPage;
        this.totalNum4tableCombineCell = oData.totalNum;
        this.limit4tableCombineCell = oData.limit;

        this._initGridRowData4TableCombineCell(iPage);
      },

      _initGridRowData4AllEle: function(iPage){
        var oData = JSON.parse(JSON.stringify(ConfigUtils.getConfigOptions('allEle', iPage)));
        this.rows4allEle = oData.rows;
      },
      _initGridRowData4TablePaging: function(iPage){
        var oData = JSON.parse(JSON.stringify(ConfigUtils.getConfigOptions('tablePaging', iPage)));
        this.rows4tablePaging = oData.rows;
      },
      _initGridRowData4TableCombineCell: function(iPage){
        var oData = JSON.parse(JSON.stringify(ConfigUtils.getConfigOptions('tableCombineCell', iPage)));
        this.rows4tableCombineCell = oData.rows;
      },

      _updateRowEx: function(){
        this._initGridData(1);
      },


      //#endregion

      setRowColor4FreezeGrid: function () {
        this.$refs.table4allEle.setRowColor(0);
      },
      removeRowColor4FreezeGrid: function(){
        this.$refs.table4allEle.removeRowColor(0);
      },
      getSelectRows4Checkbox4FreezeGrid: function(){
        let arrRows = this.$refs.table4allEle.getSelectRows4Checkbox();
        console.log(arrRows);
      },
      getSelectRow4Radiobox4FreezeGrid: function(){
        let arrRows = this.$refs.table4allEle.getSelectRow4Radiobox();
        console.log(arrRows);
      },
      removeRow4FreezeGrid: function(){
        this.$refs.table4allEle.removeRow(0);
      },
      getRows4FreezeGrid: function(){
        let arrRows = this.$refs.table4allEle.getRows();
        console.log(arrRows);
      },
      getActiveRows4FreezeGrid: function(){
        let arrRow = this.$refs.table4allEle.getActiveRows();
        console.log(arrRow);
      },
      disableRow4FreezeGrid: function(){
        this.$refs.table4allEle.disableRow(1);
        this.$refs.table4allEle.disableRow(4);
      },
      enableRow4FreezeGrid: function(){
        this.$refs.table4allEle.enableRow(1);
      },
      enableAllRows4FreezeGrid: function(){
        this.$refs.table4allEle.enableAllRows();
      },
      checkRow4FreezeGrid: function(){
        this.$refs.table4allEle.checkOrUnCheckRow4CheckBox(3, true);
      },
      checkRadioRow4FreezeGrid: function(){
        this.$refs.table4allEle.checkorUnCheckRow4RadioBox(3, true);
      },
      disabledDropDownCell4FreezeGrid: function(){
        this.$refs.table4allEle.disabledDropDownCell(4, "config", true);
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
        console.log("sortRowsFunc");
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
      onClickFoldOrUnFold:function(oRow, bIsFold){
        console.log("onClickFoldOrUnFold");
        console.log(oRow);
        console.log(bIsFold);
      },
      onDblclickRow:function(oRow){
        console.log("onDblclickRow");
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

      onPageChange4tablePaging: function (iPageIndex) {
        console.log("onPageChange4tablePaging");
        console.log(iPageIndex);
        setTimeout(() => {
          this._initGridRowData4TablePaging(iPageIndex);
        }, 100);
      },
      onPageChange4tableCombine: function (iPageIndex) {
        console.log("onPageChange4tableCombine");
        console.log(iPageIndex);
        setTimeout(() => {
          this._initGridRowData4TableCombineCell(iPageIndex);
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
