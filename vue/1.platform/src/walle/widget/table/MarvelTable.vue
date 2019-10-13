<!--
功能说明：
1.props说明
titles：表格的表头
rows：表格列
limit：每页显示的行数
gridId: 表格控件实例的唯一标识
editCellFinished: 可编辑单元格编辑完成后的回调
sortRowsFunc: 自定义排序的回调，不传的话，按照默认的规则排序
canDrag: 是否可以拖拽列
hasFoot: 是否有foot
dynamicPaging: 是否动态分页
totalNum: 当dynamicPaging为true时，必填
totalPage: 当dynamicPaging为true时，必填
pageLimit：分页时，分页显示的数量
columnConfig：列过滤
2.支持的列的类型
text: 纯文本
input: 可编辑文本
icon: 可点击的图表，一个单元格中可以有多个
textIcon：带文字的可点击图表，一个单元格中只能有一个
dropdown：下拉选项
checkBox：多选框，不能和radioBox同时存在
radioBox: 单选框，不能和checkBox同时存在
multiDropdown：下拉框多选，支持度不好，待优化
3.支持列的排序
在表头列中增加"orderBy: true"表示这一列支持排序
4.支持列的拖拽功能
规则：canDrag=true的情况下，列的宽度必须是"200px"的形式不能是百分比的形式
-->

<!--
功能说明：
相对marvelGridEx，固定列表格功能有以下删减
1 不支持表头拖拽更改列宽
2 当存在固定列时，不支持子表（展开）项

新增prop参数
1 bIsAdaptToContH: 用于高度计算。由于表格添加固定列功能后，高度无法自适应内容，需要使用者显式告知是否适应于内容的高度。默认false（适应于父容器高度）。
2 maxHeight: 控件最大高度限制，仅在bIsAdaptToContH == true时生效。
-->
<template>
  <div class="GridExWithFreezeColumnWrapper" :id="gridId">
    <div class="titleArea"></div>
    <div class="freezeTables" :style="contentStyle" :class="contentClass">
      <div class="freezeTable freezeLeftTable"
           v-if="bHasLeftTable"
           :style="leftTableStyle">
        <marvel-table-item :ref="leftTableId"
                           :gridId="leftTableId"
                           :parentTitles="leftParentTitles"
                           :titles="leftTitles"
                           :rows="leftRows"
                           :limit="limit4TableItem"
                           :editCellFinished="editCellFinished"
                           :sortRowsFunc="sortRowsFuncTriggerByLeftGrid"
                           :searchComponent="searchComponent"
                           v-on:onRowHover="leftTableOnRowHover"
                           v-on:onRowHoverEnd="leftTableOnRowHoverEnd"
                           v-on:onTbodyScroll="leftTableOnScroll"
                           :hasFoot="false"
                           v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck"
                           v-on:onClickRow="onClickRow"
                           v-on:onDblclickRow="onDblclickRow"
                           v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck"
                           v-on:onRowRadioCheck="onRowRadioCheck"
                           v-on:onClickTextCell="onClickTextCell"
                           v-on:onIconClick="onIconClick"
                           v-on:onOptionChange="onOptionChange"
                           v-on:onClickTextIcon="onClickTextIcon"
                           v-on:onClickMultiDropdownItem="onClickMultiDropdownItem"
                           v-on:onClickSwitch="onClickSwitch"
                           v-on:onClickImg="onClickImg"
                           v-on:onPageChange="onPageChange"></marvel-table-item>
      </div>
      <div class="freezeTable centerTable"
           v-if="bHasCenterTable"
           :style="centerTableStyle">
        <marvel-table-item :ref="centerTableId"
                           :gridId="centerTableId"
                           :parentTitles="centerParentTitles"
                           :titles="centerTitles"
                           :rows="centerRows"
                           :limit="limit4TableItem"
                           :editCellFinished="editCellFinished"
                           :sortRowsFunc="sortRowsFuncTriggerByCenterGrid"
                           :canDrag="canDrag"
                           :searchComponent="searchComponent"
                           :detailRowComponent="detailRowComponent"
                           v-on:onClickFoldOrUnFold="onClickFoldOrUnFold"
                           v-on:onRowHover="centerTableOnRowHover"
                           v-on:onRowHoverEnd="centerTableOnRowHoverEnd"
                           v-on:onTbodyScroll="centerTableOnScroll"
                           :hasFoot="false"
                           v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck"
                           v-on:onClickRow="onClickRow"
                           v-on:onDblclickRow="onDblclickRow"
                           v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck"
                           v-on:onRowRadioCheck="onRowRadioCheck"
                           v-on:onClickTextCell="onClickTextCell"
                           v-on:onIconClick="onIconClick"
                           v-on:onOptionChange="onOptionChange"
                           v-on:onClickTextIcon="onClickTextIcon"
                           v-on:onClickMultiDropdownItem="onClickMultiDropdownItem"
                           v-on:onClickSwitch="onClickSwitch"
                           v-on:onClickImg="onClickImg"
                           v-on:onPageChange="onPageChange"></marvel-table-item>
      </div>
      <div class="freezeTable freezeRightTable"
           v-if="bHasRightTable"
           :style="rightTableStyle">
        <marvel-table-item :ref="rightTableId"
                           :gridId="rightTableId"
                           :parentTitles="rightParentTitles"
                           :titles="rightTitles"
                           :rows="rightRows"
                           :limit="limit4TableItem"
                           :editCellFinished="editCellFinished"
                           :sortRowsFunc="sortRowsFuncTriggerByRightGrid"
                           :searchComponent="searchComponent"
                           v-on:onRowHover="rightTableOnRowHover"
                           v-on:onRowHoverEnd="rightTableOnRowHoverEnd"
                           v-on:onTbodyScroll="rightTableOnScroll"
                           :hasFoot="false"
                           v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck"
                           v-on:onClickRow="onClickRow"
                           v-on:onDblclickRow="onDblclickRow"
                           v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck"
                           v-on:onRowRadioCheck="onRowRadioCheck"
                           v-on:onClickTextCell="onClickTextCell"
                           v-on:onIconClick="onIconClick"
                           v-on:onOptionChange="onOptionChange"
                           v-on:onClickTextIcon="onClickTextIcon"
                           v-on:onClickMultiDropdownItem="onClickMultiDropdownItem"
                           v-on:onClickSwitch="onClickSwitch"
                           v-on:onClickImg="onClickImg"
                           v-on:onPageChange="onPageChange"></marvel-table-item>
      </div>
      <div class="emptyTip"></div>
    </div>
    <div v-if="hasFoot" class="footArea">
      <div class="foot">
        <marvel-paging :ref="footId"
                       :totalNum="totalCount"
                       :pages="totalPageCount"
                       :perPageNum="limit"
                       :showPageNum="showPageNum"
                       :limit="pageLimit"
                       :showChangeLimit="showChangeLimit"
                       :limitRange="limitRange"
                       :showNumSelected="showNumSelected"
                       :showPageSwitch="showPageSwitch"
                       @onPerPageNumChange="_onPerPageNumChange"
                       @onPageChange="_onPageChange"></marvel-paging>
      </div>
    </div>
    <div v-if="columnConfig" class="columnConfig icon-cog" :title="$t('columnConfig')"
         @click="_showColumnConfigPanel"></div>
    <marvel-table-column-config ref="ref4ColumnConfig"
                                @handleTblDataToShow="_handleGridDataToShow"></marvel-table-column-config>
  </div>
</template>

<i18n>
  {
  "en": {
  "columnConfig": "Column Config "
  },
  "zh": {
  "columnConfig": "列配置 "
  }
  }
</i18n>

<script>
  import MarvelPaging from "../paging/MarvelPaging"
  import MarvelTableItem from "./MarvelTableItem";
  import StringUtilsEx from "../../component/str"
  import MarvelTableColumnConfig from "./MarvelTableColumnConfig";

  /**
   *  MarvelTable widget description
   *  @vuedoc
   *  @exports MarvelTable
   */
  export default {
    components: {
      MarvelTableColumnConfig,
      MarvelTableItem,
      MarvelPaging
    },
    name: 'MarvelTable',
    props: {
      parentTitles: {
        type: Array,
        default: function () {
          return [];
        },
        required: false,
      },
      titles: {
        type: Array,
        default: undefined,
        required: true,
      },
      rows: {
        type: Array,
        default: undefined,
        required: true,
      },
      limit: {
        type: Number,
        default: 5,
        required: false,
      },
      gridId: {
        type: [String, Number],
        default: "",
        required: true
      },
      canDrag: {
        type: Boolean,
        default: false,
        required: false,
      },
      hasFoot: {
        type: Boolean,
        default: true,
        required: false,
      },
      dynamicPaging: {
        type: Boolean,
        default: false,
        required: false,
      },
      totalNum: {
        type: Number,
        default: undefined,
        required: false,
      },
      totalPage: {
        type: Number,
        default: undefined,
        required: false,
      },
      showPageNum: {
        type: Boolean,
        default: true,
        required: false,
      },
      pageLimit: {
        type: Number,
        default: 7,
        required: false,
      },
      showChangeLimit: {
        type: Boolean,
        default: false,
        required: false,
      },
      limitRange: {
        type: Array,
        default: function () {
          return []
        },
        required: false,
      },
      showNumSelected: {
        type: Boolean,
        default: false,
        required: false,
      },
      showPageSwitch: {
        type: Boolean,
        default: true,
        required: false,
      },
      bIsAdaptToContH: {
        type: Boolean,
        default: false,
        required: false,
      },
      maxHeight: {
        type: Number,
        default: null,
        required: false,
      },
      columnConfig: {
        type: Boolean,
        default: false,
        required: false,
      },
      detailRowComponent: {
        type: String,
        default: "",
        required: false,
      },
      searchComponent: {
        type: String,
        default: "",
        required: false,
      },
      sortRowsFunc: {
        type: Function,
        default: undefined,
        required: false,
      },
    },
    data: function () {
      return {
        //#region common
        lastTime4Throttle: 0,
        whereIsCheckColumn: undefined,
        whereIsRadioColumn: undefined,
        orderBy: {
          key: "",
          order: 1 //1表示升序排列，-1表示降序排列
        },
        limit4TableItem: 10,
        //#endregion
        //#region leftTable
        bHasLeftTable:false,
        hasAnyColumnShowInLeft: true,
        leftTableId: "",
        leftTableStyle: undefined,
        //#endregion
        //#region centerTable
        bHasCenterTable:false,
        hasAnyColumnShowInCenter: true,
        centerTableId: '',
        centerTableStyle: undefined,
        //#endregion
        //#region rightTable
        bHasRightTable:false,
        hasAnyColumnShowInRight: true,
        rightTableId: "",
        rightTableStyle: undefined,
        //#endregion
        //#region foot
        skip: 0,
        rowsInPage: [],
        curPageIndex: 1,
        footId: "",
        //#endregion
      }
    },
    computed: {
      //#region common
      totalCount: function () {
        if (this.dynamicPaging) {
          return this.totalNum;
        } else {
          return this.rows.length;
        }
      },
      totalPageCount: function () {
        if (this.dynamicPaging) {
          return this.totalPage;
        } else {
          var iTotalPage = 1;
          if (this.rows.length > 0) {
            iTotalPage = Math.ceil(this.rows.length / this.limit)
          }
          return iTotalPage;
        }
      },
      contentStyle() {
        var iTitleH = 34;
        var iRowH = 40.2;
        var iRowsNumInCurrentPage = 0;
        if (this.dynamicPaging) {
          iRowsNumInCurrentPage = this.rows.length;
        } else {
          if (this.curPageIndex * this.limit4TableItem < this.rows.length) {
            iRowsNumInCurrentPage = this.limit4TableItem;
          } else {
            iRowsNumInCurrentPage = this.rows.length - (this.curPageIndex - 1) * this.limit4TableItem;
          }
        }
        var iContH = iTitleH + iRowsNumInCurrentPage * iRowH + this._getScrollWByBrowser();
        var iFootH = 32;
        var oStyle = {};

        if (!this.bIsAdaptToContH) {
          //适应父容器高度
          if (!this.hasFoot) {
            oStyle.height = "100%";
          } else {
            oStyle.height = "calc(100% - 32px)";
          }
        } else {
          //适应内容高度
          if (this.maxHeight && iContH + iFootH > this.maxHeight) {
            oStyle.height = this.maxHeight + "px";
          } else {
            oStyle.height = iContH + "px";
          }
        }

        return oStyle;
      },
      contentClass() {
        let oClass = [];
        if (this.rows.length === 0 && !this.bIsAdaptToContH) {
          oClass.push("empty");
        }
        return oClass;
      },
      //#endregion
      //#endregion
      //#region leftTable
      leftParentTitles: function () {
        var arrLeftParentTitles = [];

        //将title 分入对应的区域
        for (const title of this.parentTitles) {
          if (title.key == "id") {
            //使用同一id列
            arrLeftParentTitles.push(JSON.parse(JSON.stringify(title)));
          } else if (title.freeze && title.freeze == "left") {
            arrLeftParentTitles.push(JSON.parse(JSON.stringify(title)));
          }
        }

        return arrLeftParentTitles;
      },
      leftTitles: function () {
        var arrLeftTitles = [];

        //将title 分入对应的区域
        for (const title of this.titles) {
          if (title.key == "id") {
            //使用同一id列
            arrLeftTitles.push(JSON.parse(JSON.stringify(title)));
          } else if (title.freeze && title.freeze == "left") {
            if (title.type == "checkBox") {
              this.whereIsCheckColumn = "left";
            }
            if (title.type == "radioBox") {
              this.whereIsRadioColumn = "left";
            }
            arrLeftTitles.push(JSON.parse(JSON.stringify(title)));
          }
        }

        return arrLeftTitles;
      },
      leftRows: function () {
        var leftRows = [];
        if (this.dynamicPaging == false) {
          this._sortRows();
        }

        for (const row of this.rows) {
          var leftRow = [];
          for (const cell of row) {
            //使用同一id列
            if (cell.key == "id") {
              leftRow.push(JSON.parse(JSON.stringify(cell)));
            } else {
              //匹配左表
              for (const oLeftTitle of this.leftTitles) {
                if (cell.key == oLeftTitle.key) {
                  leftRow.push(JSON.parse(JSON.stringify(cell)));
                  break;
                }
              }
            }
          }
          leftRows.push(JSON.parse(JSON.stringify(leftRow)));
        }

        return leftRows;
      },
      //#endregion
      //#region centerTable
      centerParentTitles: function () {
        var arrCenterParentTitles = [];

        //将title 分入对应的区域
        for (const title of this.parentTitles) {
          if (title.key == "id") {
            //使用同一id列
            arrCenterParentTitles.push(JSON.parse(JSON.stringify(title)));
          } else if (title.freeze == undefined || title.freeze == '') {
            arrCenterParentTitles.push(JSON.parse(JSON.stringify(title)));
          }
        }

        return arrCenterParentTitles;
      },
      centerTitles: function () {
        var arrCenterTitles = [];

        //将title 分入对应的区域
        for (const title of this.titles) {
          if (title.key == "id") {
            //使用同一id列
            arrCenterTitles.push(JSON.parse(JSON.stringify(title)));
          } else if (title.freeze == undefined || title.freeze == '') {
            if (title.type == "checkBox") {
              this.whereIsCheckColumn = "center";
            }
            if (title.type == "radioBox") {
              this.whereIsRadioColumn = "center";
            }
            arrCenterTitles.push(JSON.parse(JSON.stringify(title)));
          }
        }

        return arrCenterTitles;
      },
      centerRows: function () {
        var centerRows = [];

        for (const row of this.rows) {
          var centerRow = [];

          for (const cell of row) {
            //使用同一id列
            if (cell.key == "id") {
              centerRow.push(JSON.parse(JSON.stringify(cell)));
            } else {
              //匹配中间表
              for (const oCenterTitle of this.centerTitles) {
                if (cell.key == oCenterTitle.key) {
                  centerRow.push(JSON.parse(JSON.stringify(cell)));
                  break;
                }
              }
            }
          }
          centerRows.push(JSON.parse(JSON.stringify(centerRow)));
        }

        return centerRows;
      },
      //#endregion
      //#region rightTable
      rightParentTitles: function () {
        var arrRightParentTitles = [];

        //将title 分入对应的区域
        for (const title of this.parentTitles) {
          if (title.key == "id") {
            //使用同一id列
            arrRightParentTitles.push(JSON.parse(JSON.stringify(title)));
          } else if (title.freeze && title.freeze == "right") {
            arrRightParentTitles.push(JSON.parse(JSON.stringify(title)));
          }
        }

        return arrRightParentTitles;
      },
      rightTitles: function () {
        var arrRightTitles = [];

        //将title 分入对应的区域
        for (const title of this.titles) {
          if (title.key == "id") {
            //使用同一id列
            arrRightTitles.push(JSON.parse(JSON.stringify(title)));
          } else if (title.freeze && title.freeze == "right") {
            if (title.type == "checkBox") {
              this.whereIsCheckColumn = "right";
            }
            if (title.type == "radioBox") {
              this.whereIsRadioColumn = "right";
            }
            arrRightTitles.push(JSON.parse(JSON.stringify(title)));
          }
        }

        return arrRightTitles;
      },
      rightRows: function () {
        var rightRows = [];

        for (const row of this.rows) {
          var rightRow = [];

          for (const cell of row) {
            //使用同一id列
            if (cell.key == "id") {
              rightRow.push(JSON.parse(JSON.stringify(cell)));
            } else {
              //匹配右表
              for (const oRightTitle of this.rightTitles) {
                if (cell.key == oRightTitle.key) {
                  rightRow.push(JSON.parse(JSON.stringify(cell)));
                  break;
                }
              }
            }
          }
          rightRows.push(JSON.parse(JSON.stringify(rightRow)));
        }

        return rightRows;
      },
      //#endregion
    },
    mounted: function () {
      //#region initEx

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.limit4TableItem = this.limit;
        this.leftTableId = this.gridId + "_left";
        this.centerTableId = this.gridId + "_center";
        this.rightTableId = this.gridId + "_right";
        this.footId = this.gridId + "_foot";

        this.bHasLeftTable = this.leftTitles.length > 0;
        this.bHasCenterTable = this.centerTitles.length > 0;
        this.bHasRightTable = this.rightTitles.length > 0;

        //setStyle
        this._setStyle4Tables();
      },

      //#endregion

      //#region column config

      _showColumnConfigPanel: function () {
        var oData = [];
        for (var i = 0; i < this.titles.length; i++) {
          if (this.titles[i].bCanColumnConfig != false) {
            if (this.titles[i].visible == true) {
              oData.push({
                label: this.titles[i].label,
                belongTo: "right",
                key: this.titles[i].key,
              });
            } else {
              oData.push({
                label: this.titles[i].label,
                belongTo: "left",
                key: this.titles[i].key,
              });
            }
          }
        }
        this.$refs.ref4ColumnConfig.init(oData);
      },
      _handleGridDataToShow: function (oData) {
        for (var i = 0; i < oData.length; i++) {
          for (var j = 0; j < this.titles.length; j++) {
            if (oData[i].key == this.titles[j].key) {
              if (oData[i].belongTo == "right") {
                this.titles[j].visible = true;
              } else {
                this.titles[j].visible = false;
              }
            }
          }
        }
      },

      //#endregion

      //#region 一致性 设置

      //#region leftTable

      leftTableOnRowHover: function (oRow) {
        var rowId = this._getRowId(oRow);
        this.setCenterTableRowHoverById(rowId);
        this.setRightTableRowHoverById(rowId);
      },
      leftTableOnRowHoverEnd: function () {
        this.setCenterTableRowHoverById();
        this.setRightTableRowHoverById();
      },
      setLeftTableRowHoverById: function (rowId) {
        if (this.bHasLeftTable) {
          this.$refs[this.leftTableId].setRowHover(rowId);
        }
      },
      leftTableOnScroll: function (oEvent) {
        var self = this;
        this._throttle(function () {
          self.centerTableToScrollTop(oEvent.target.scrollTop);
          self.rightTableToScrollTop(oEvent.target.scrollTop);
        });
      },
      leftTableToScrollTop: function (iScrollTop) {
        if (this.bHasLeftTable) {
          this.$refs[this.leftTableId].setTableContentScrollTop(iScrollTop);
        }
      },

      //#endregion

      //#region centerTable

      centerTableOnRowHover: function (oRow) {
        var rowId = this._getRowId(oRow);
        this.setLeftTableRowHoverById(rowId);
        this.setRightTableRowHoverById(rowId);
      },
      centerTableOnRowHoverEnd: function () {
        this.setLeftTableRowHoverById();
        this.setRightTableRowHoverById();
      },
      setCenterTableRowHoverById: function (rowId) {
        if (this.bHasCenterTable) {
          this.$refs[this.centerTableId].setRowHover(rowId);
        }
      },
      centerTableOnScroll: function (oEvent) {
        var self = this;
        this._throttle(function () {
          self.leftTableToScrollTop(oEvent.target.scrollTop);
          self.rightTableToScrollTop(oEvent.target.scrollTop);
        });
      },
      centerTableToScrollTop: function (iScrollTop) {
        if (this.bHasCenterTable) {
          this.$refs[this.centerTableId].setTableContentScrollTop(iScrollTop);
        }
      },

      //#endregion

      //#region rightTable

      rightTableOnRowHover: function (oRow) {
        var rowId = this._getRowId(oRow);
        this.setLeftTableRowHoverById(rowId);
        this.setCenterTableRowHoverById(rowId);
      },
      rightTableOnRowHoverEnd: function () {
        this.setLeftTableRowHoverById();
        this.setCenterTableRowHoverById();
      },
      setRightTableRowHoverById: function (rowId) {
        if (this.bHasRightTable) {
          this.$refs[this.rightTableId].setRowHover(rowId);
        }
      },
      rightTableOnScroll: function (oEvent) {
        var self = this;
        this._throttle(function () {
          self.leftTableToScrollTop(oEvent.target.scrollTop);
          self.centerTableToScrollTop(oEvent.target.scrollTop);
        });
      },
      rightTableToScrollTop: function (iScrollTop) {
        if (this.bHasRightTable) {
          this.$refs[this.rightTableId].setTableContentScrollTop(iScrollTop);
        }
      },

      //#endregion

      //#endregion

      //#region foot

      _onPageChange: function (iPage) {
        this.curPageIndex = iPage;
        if (this.dynamicPaging) {
          this.onPageChange(iPage);
        } else {
          if (this.bHasLeftTable) {
            this.$refs[this.leftTableId].onPageChange(iPage);
          }
          if (this.bHasCenterTable) {
            this.$refs[this.centerTableId].onPageChange(iPage);
          }
          if (this.bHasRightTable) {
            this.$refs[this.rightTableId].onPageChange(iPage);
          }
        }
      },
      _onPerPageNumChange: function(perPageNum){
        this.limit4TableItem = perPageNum;
        if (this.dynamicPaging) {
          this.onPerPageNumChange(perPageNum);
        } else {
          this.curPageIndex = 1;
        }
      },

      //#endregion

      //#region common

      _setStyle4Tables: function () {
        var oTitleVisibleStatus4Tables = this._hasAnyItemToShowInTables();
        var iScrollW = this._getScrollWByBrowser();
        this.leftTableStyle = this._getLeftTableStyle(iScrollW, oTitleVisibleStatus4Tables);
        this.centerTableStyle = this._getCenterTableStyle(iScrollW, oTitleVisibleStatus4Tables);
        this.rightTableStyle = this._getRightTableStyle(iScrollW, oTitleVisibleStatus4Tables);
        this.$nextTick(function () {
          if (this._bIsCenterTableOverflowInX()) {
            this.leftTableStyle.height = 'calc(100% - ' + iScrollW + 'px)';
            this.rightTableStyle.height = 'calc(100% - ' + iScrollW + 'px)';
          } else {
            this.leftTableStyle.height = '100%';
            this.rightTableStyle.height = '100%';
          }
        });
      },
      _hasAnyItemToShowInTables: function () {
        var oHasAnyItemToShowInTables = {
          left: false,
          center: false,
          right: false,
        };

        for (const title of this.titles) {
          if (title.visible) {
            if (title.freeze == 'left') {
              oHasAnyItemToShowInTables.left = true;
            } else if (title.freeze == 'right') {
              oHasAnyItemToShowInTables.right = true;
            } else {
              oHasAnyItemToShowInTables.center = true;
            }
          }
        }

        return oHasAnyItemToShowInTables;
      },
      _bIsCenterTableOverflowInX: function () {
        var iCenterTableW = $("#" + this.gridId + " .freezeTables .centerTable").width();

        var iScrollW = 20;
        //根据浏览器信息，设置滚动条宽度
        var userAgent = window.navigator.userAgent.toLocaleLowerCase();
        if (userAgent.match(/chrome/) != null) {
          iScrollW = 10;
        }
        var iTitleW = iScrollW;
        for (const centerTitle of this.centerTitles) {
          if (centerTitle.visible == true) {
            iTitleW += parseInt(centerTitle.width);
          }
        }

        if (iTitleW > iCenterTableW) {
          return true;
        } else {
          return false;
        }
      },
      _getScrollWByBrowser: function () {
        var iScrollW = 20;//浏览器默认滚动条样式宽度
        //根据浏览器信息，设置滚动条宽度
        var userAgent = window.navigator.userAgent.toLocaleLowerCase();
        if (userAgent.match(/chrome/) != null) {
          iScrollW = 10;//chrome 下设置的滚动条样式宽度
        }

        return iScrollW;
      },
      _getLeftTableStyle: function (iScrollW, oTitleVisibleStatus4Tables) {
        var oStyle = {
          height: '100%'
        };
        var iLeftW = iScrollW;

        for (const leftTitle of this.leftTitles) {
          iLeftW += parseInt(leftTitle.width);
        }

        if (oTitleVisibleStatus4Tables.left) {
          if (!oTitleVisibleStatus4Tables.center && !oTitleVisibleStatus4Tables.right) {
            //center表 && right表 不可见
            oStyle.width = "100%";
            oStyle.left = 0 + 'px';
          } else {
            //按照自身宽度正常显示
            oStyle.width = iLeftW + 'px';
            oStyle.left = 0 + 'px';
          }
        } else {
          //left表中所有表头不可见
          oStyle.width = 0 + 'px';
          oStyle.left = 0 + 'px';
        }

        return oStyle;
      },
      _getCenterTableStyle: function (iScrollW, oTitleVisibleStatus4Tables) {
        var oStyle = {
          height: '100%'
        };

        if (oTitleVisibleStatus4Tables.center) {
          //center可见
          if (oTitleVisibleStatus4Tables.left && oTitleVisibleStatus4Tables.right) {
            //left表 && right表 可见
            var iLeftW = iScrollW;
            for (const leftTitle of this.leftTitles) {
              iLeftW += parseInt(leftTitle.width);
            }
            var iRightW = iScrollW;
            for (const rightTitle of this.rightTitles) {
              iRightW += parseInt(rightTitle.width);
            }

            oStyle.width = 'calc(100% - ' + (iLeftW + iRightW - iScrollW * 2) + 'px)';
            oStyle.left = iLeftW - iScrollW + 'px';

          } else if (!oTitleVisibleStatus4Tables.left && oTitleVisibleStatus4Tables.right) {
            //left表不可见 && right表可见
            var iRightW = iScrollW;
            for (const rightTitle of this.rightTitles) {
              iRightW += parseInt(rightTitle.width);
            }

            oStyle.width = 'calc(100% - ' + (iRightW - iScrollW) + 'px)';
            oStyle.left = 0 + 'px';
          } else if (oTitleVisibleStatus4Tables.left && !oTitleVisibleStatus4Tables.right) {
            //left表可见 && right不表可见
            var iLeftW = iScrollW;
            for (const leftTitle of this.leftTitles) {
              iLeftW += parseInt(leftTitle.width);
            }

            oStyle.width = 'calc(100% - ' + (iLeftW - iScrollW) + 'px)';
            oStyle.left = iLeftW - iScrollW + 'px';
          } else {
            //left表 && right表 均不可见
            oStyle.width = '100%';
            oStyle.left = 0 + 'px';
          }
        } else {
          oStyle.width = 0 + 'px';
          oStyle.left = 0 + 'px';
        }

        return oStyle;
      },
      _getRightTableStyle: function (iScrollW, oTitleVisibleStatus4Tables) {
        var oStyle = {
          height: '100%'
        };

        var iRightW = iScrollW;
        for (const rightTitle of this.rightTitles) {
          iRightW += parseInt(rightTitle.width);
        }

        if (oTitleVisibleStatus4Tables.right) {
          //right 表头可见
          if (!oTitleVisibleStatus4Tables.center && !oTitleVisibleStatus4Tables.left) {
            //left表 && center表不可见
            oStyle.width = "100%";
            oStyle.right = 0 + 'px';
          } else if (!oTitleVisibleStatus4Tables.center && oTitleVisibleStatus4Tables.left) {
            //left表可见 && center表不可见
            var iLeftW = iScrollW;
            for (const leftTitle of this.leftTitles) {
              iLeftW += parseInt(leftTitle.width);
            }

            oStyle.width = 'calc(100% - ' + (iLeftW - iScrollW) + 'px)';
            oStyle.right = 0 + 'px';
          } else {
            //left表 可见或不可见 && center表可见
            oStyle.width = iRightW + 'px';
            oStyle.right = 0 + 'px';
          }
        } else {
          //right表中所有表头不可见
          oStyle.width = 0 + 'px';
          oStyle.right = 0 + 'px';
        }

        return oStyle;
      },
      _throttle: function (action) {
        var delay = 20;
        let curr = +new Date();
        if (curr - this.lastTime4Throttle > delay) {
          this.lastTime4Throttle = curr;
          action();
        }
      },
      _combineRows: function (arrLeftRows, arrCenterRows, arrRightRows) {
        var arrTargetRows = [];
        var iLength = Math.max(arrLeftRows.length, arrCenterRows.length, arrRightRows.length);
        for (var i = 0; i < iLength; i++) {
          var leftRow = JSON.parse(JSON.stringify(arrLeftRows[i]?arrLeftRows[i]:[]));
          var centerRow = JSON.parse(JSON.stringify(arrCenterRows[i]?arrCenterRows[i]:[]));
          var centerRowLength = centerRow.length;
          var rightRow = JSON.parse(JSON.stringify(arrRightRows[i]?arrRightRows[i]:[]));
          var rightRowLength = rightRow.length;
          var oRow = leftRow.concat(centerRow.slice(1, centerRowLength), rightRow.slice(1, rightRowLength));
          arrTargetRows.push(oRow);
        }
        return arrTargetRows;
      },
      _getRowId: function (oRow) {
        var oRowId = undefined;
        for (const cell of oRow) {
          if (cell.key == "id") {
            oRowId = cell.value;
            break;
          }
        }

        return oRowId
      },
      _getRowIdsByRows: function (arrRows) {
        var arrRowIds = [];
        for (const row of arrRows) {
          for (const cell of row) {
            if (cell.key == "id") {
              arrRowIds.push(cell.value);
              break;
            }
          }
        }
        return arrRowIds;
      },
      _getRowsByRowIds: function (arrRowIds, arrRows) {
        var arrTargetRows = [];
        for (const rowId of arrRowIds) {
          for (const row of arrRows) {
            var strRowId = this._getRowId(row);
            if (strRowId == rowId) {
              arrTargetRows.push(row);
              break;
            }
          }
        }
        return arrTargetRows
      },
      _getRowByPartRow: function (oPartRow) {
        var strTargetRowId = this._getRowId(oPartRow);
        var arrRows = this.getRows();
        var arrTargetRows = this._getRowsByRowIds([strTargetRowId], arrRows);

        return arrTargetRows[0];
      },
      _getCellValueByKey: function (strKeyValue, oRow) {
        let oTargetCell = undefined;
        for (let i = 0, len = oRow.length; i < len; i++) {
          let oCell = oRow[i];
          if (oCell.key == strKeyValue) {
            oTargetCell = oCell;
          }
        }
        if (oTargetCell) {
          return oTargetCell.value;
        }
      },
      _sortRows: function () {
        this.rows.sort((oRow1, oRow2) => {
          let strVal1 = this._getCellValueByKey(this.orderBy.key, oRow1);
          let strVal2 = this._getCellValueByKey(this.orderBy.key, oRow2);
          if (strVal1 < strVal2) {
            return -1 * this.orderBy.order;
          } else if (strVal1 == strVal2) {
            return 0;
          } else {
            return 1 * this.orderBy.order;
          }
        });
      },

      //#endregion

      //#endregion
      //#region callback

      editCellFinished: function (oRow, oCell, oOldVal, oNewVal, oAfterValidateOk) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("editCellFinished", oTargetRow, oCell, oOldVal, oNewVal, oAfterValidateOk);
      },
      sortRowsFuncTriggerByLeftGrid: function (strKey, order, oRows) {
        this.orderBy.key = strKey;
        this.orderBy.order = order;
        if (this.dynamicPaging == true && this.sortRowsFunc) {
          this.sortRowsFunc(this.orderBy.key, this.orderBy.order, this.rows);
        } else {
          this._sortRows();
        }

        //清除其他表格排序状态
        if(this.bHasCenterTable){
          this.$refs[this.centerTableId].clearSortStatus();
        }
        if(this.bHasRightTable){
          this.$refs[this.rightTableId].clearSortStatus();
        }
      },
      sortRowsFuncTriggerByCenterGrid: function (strKey, order, oRows) {
        this.orderBy.key = strKey;
        this.orderBy.order = order;
        if (this.dynamicPaging == true && this.sortRowsFunc) {
          this.sortRowsFunc(this.orderBy.key, this.orderBy.order, this.rows);
        } else {
          this._sortRows();
        }

        //清除其他表格排序状态
        if (this.bHasLeftTable) {
          this.$refs[this.leftTableId].clearSortStatus();
        }
        if (this.bHasRightTable) {
          this.$refs[this.rightTableId].clearSortStatus();
        }
      },
      sortRowsFuncTriggerByRightGrid: function (strKey, order, oRows) {
        this.orderBy.key = strKey;
        this.orderBy.order = order;
        if (this.dynamicPaging == true && this.sortRowsFunc) {
          this.sortRowsFunc(this.orderBy.key, this.orderBy.order, this.rows);
        } else {
          this._sortRows();
        }

        //清除其他表格排序状态
        if(this.bHasLeftTable){
          this.$refs[this.leftTableId].clearSortStatus();
        }
        if(this.bHasCenterTable){
          this.$refs[this.centerTableId].clearSortStatus();
        }
      },
      onTitleCheckOrUncheck: function (isChecked) {
        this.$emit("onTitleCheckOrUncheck", isChecked);
      },
      onClickRow: function (oRow) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("onClickRow", oTargetRow);
      },
      onDblclickRow: function (oRow) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("onDblclickRow", oTargetRow);
      },
      onRowCheckOrUnCheck: function (oRow, isChecked) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("onRowCheckOrUnCheck", oTargetRow, isChecked);
      },
      onRowRadioCheck: function (oRow) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("onRowRadioCheck", oTargetRow);
      },
      onClickTextCell: function (oRow, oCell) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("onClickTextCell", oTargetRow, oCell);
      },
      onIconClick: function (oRow, oCell, oIcon) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("onIconClick", oTargetRow, oCell, oIcon);
      },
      onOptionChange: function (oRow, oCell, strOldValue, strNewValue) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("onOptionChange", oTargetRow, oCell, strOldValue, strNewValue);
      },
      onClickTextIcon: function (oRow, oCell) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("onClickTextIcon", oTargetRow, oCell);
      },
      onClickMultiDropdownItem: function (oRow, oCell, oItem) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("onClickMultiDropdownItem", oTargetRow, oCell, oItem);
      },
      onPageChange: function (iPage) {
        this.$emit("onPageChange", iPage);
      },
      onPerPageNumChange: function (perPageNum) {
        this.$emit("onPerPageNumChange", perPageNum);
      },
      onClickSwitch(oRow, oCell) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("onClickSwitch", oTargetRow, oCell);
      },
      onClickImg(oRow, oCell) {
        var oTargetRow = this._getRowByPartRow(oRow);
        this.$emit("onClickImg", oTargetRow, oCell);
      },
      onClickFoldOrUnFold: function (oRow, bIsFold) {
        this.$emit("onClickFoldOrUnFold", oRow, bIsFold);
      },

      //#endregion
      //#region 3rd

      setRowColor(strRowId, bCancleOtherRowActive) {
        if(this.bHasLeftTable){
          this.$refs[this.leftTableId].setRowColor(strRowId, bCancleOtherRowActive);
        }
        if(this.bHasCenterTable){
          this.$refs[this.centerTableId].setRowColor(strRowId, bCancleOtherRowActive);
        }
        if(this.bHasRightTable){
          this.$refs[this.rightTableId].setRowColor(strRowId, bCancleOtherRowActive);
        }
      },
      removeRowColor(strRowId) {
        if(this.bHasLeftTable){
          this.$refs[this.leftTableId].removeRowColor(strRowId);
        }
        if(this.bHasCenterTable){
          this.$refs[this.centerTableId].removeRowColor(strRowId);
        }
        if(this.bHasRightTable){
          this.$refs[this.rightTableId].removeRowColor(strRowId);
        }
      },
      getSelectRows4Checkbox() {
        var arrRows = JSON.parse(JSON.stringify(this.getRows()));
        var arrTargetRowIds = [];
        var arrTargetRows = [];
        if (this.whereIsCheckColumn == "left") {
          //checkbox 在左侧固定列中
          var arrLeftTableSelectRows = this.$refs[this.leftTableId].getSelectRows4Checkbox();
          arrTargetRowIds = this._getRowIdsByRows(arrLeftTableSelectRows)
        } else if (this.whereIsCheckColumn == "center") {
          //checkbox 在左侧固定列中
          var arrCenterTableSelectRows = this.$refs[this.centerTableId].getSelectRows4Checkbox();
          arrTargetRowIds = this._getRowIdsByRows(arrCenterTableSelectRows)
        } else if (this.whereIsCheckColumn == "right") {
          //checkbox 在左侧固定列中
          var arrRightTableSelectRows = this.$refs[this.rightTableId].getSelectRows4Checkbox();
          arrTargetRowIds = this._getRowIdsByRows(arrRightTableSelectRows)
        }

        arrTargetRows = this._getRowsByRowIds(arrTargetRowIds, arrRows);
        return arrTargetRows;
      },
      delSelectRows4Checkbox() {
        var arrSelectRows = this.getSelectRows4Checkbox();
        for (var i = 0, len = arrSelectRows.length; i < len; i++) {
          var oRow = arrSelectRows[i];
          this.removeRow(this._getCellValueByKey("id", oRow));
        }
      },
      getSelectRow4Radiobox() {
        var arrRows = JSON.parse(JSON.stringify(this.getRows()));
        var strTargetRowId = undefined;
        var arrTargetRows = [];
        if (this.whereIsRadioColumn == "left") {
          //checkbox 在左侧固定列中
          var oLeftTableSelectRows = this.$refs[this.leftTableId].getSelectRow4Radiobox();
          if(oLeftTableSelectRows){
            strTargetRowId = this._getRowId(oLeftTableSelectRows)
          }
        } else if (this.whereIsRadioColumn == "center") {
          //checkbox 在左侧固定列中
          var oCenterTableSelectRows = this.$refs[this.centerTableId].getSelectRow4Radiobox();
          if(oCenterTableSelectRows){
            strTargetRowId = this._getRowId(oCenterTableSelectRows)
          }
        } else if (this.whereIsRadioColumn == "right") {
          //checkbox 在左侧固定列中
          var oRightTableSelectRows = this.$refs[this.rightTableId].getSelectRow4Radiobox();
          if(oRightTableSelectRows){
            strTargetRowId = this._getRowId(oRightTableSelectRows)
          }
        }

        if(strTargetRowId){
          arrTargetRows = this._getRowsByRowIds([strTargetRowId], arrRows);
          return arrTargetRows[0];
        }
      },
      getRows() {
        var arrLeftTableRows = [];
        var arrCenterTableRows = [];
        var arrRightTableRows = [];
        if(this.bHasLeftTable){
          arrLeftTableRows = this.$refs[this.leftTableId].getRows();
        }
        if(this.bHasCenterTable){
          arrCenterTableRows = this.$refs[this.centerTableId].getRows();
        }
        if(this.bHasRightTable){
          arrRightTableRows = this.$refs[this.rightTableId].getRows();
        }

        var arrRows = this._combineRows(arrLeftTableRows, arrCenterTableRows, arrRightTableRows);
        return arrRows;
      },
      removeRow(strRowId) {
        let index = -1;
        for (let i = 0, len = this.rows.length; i < len; i++) {
          let strId = this._getRowId(this.rows[i]);
          if (strRowId === strId) {
            index = i;
            break;
          }
        }
        if (index > -1) {
          this.rows.splice(index, 1);
        }
      },
      getActiveRows() {
        var arrLeftTableActiveRows = [];
        var arrCenterTableActiveRows = [];
        var arrRightTableActiveRows = [];
        if(this.bHasLeftTable){
          arrLeftTableActiveRows = this.$refs[this.leftTableId].getActiveRows();
        }
        if(this.bHasCenterTable){
          arrCenterTableActiveRows = this.$refs[this.centerTableId].getActiveRows();
        }
        if(this.bHasRightTable){
          arrRightTableActiveRows = this.$refs[this.rightTableId].getActiveRows();
        }

        var arrRows = this._combineRows(arrLeftTableActiveRows, arrCenterTableActiveRows, arrRightTableActiveRows);
        return arrRows;
      },
      disableRow(strRowId) {
        if(this.bHasLeftTable){
          this.$refs[this.leftTableId].disableRow(strRowId);
        }
        if(this.bHasCenterTable){
          this.$refs[this.centerTableId].disableRow(strRowId);
        }
        if(this.bHasRightTable){
          this.$refs[this.rightTableId].disableRow(strRowId);
        }
      },
      enableRow(strRowId) {
        if(this.bHasLeftTable){
          this.$refs[this.leftTableId].enableRow(strRowId);
        }
        if(this.bHasCenterTable){
          this.$refs[this.centerTableId].enableRow(strRowId);
        }
        if(this.bHasRightTable){
          this.$refs[this.rightTableId].enableRow(strRowId);
        }
      },
      enableAllRows() {
        if(this.bHasLeftTable){
          this.$refs[this.leftTableId].enableAllRows();
        }
        if(this.bHasCenterTable){
          this.$refs[this.centerTableId].enableAllRows();
        }
        if(this.bHasRightTable){
          this.$refs[this.rightTableId].enableAllRows();
        }
      },
      checkOrUnCheckRow4CheckBox(strRowId, bCheck) {
        if (this.whereIsCheckColumn == "left") {
          this.$refs[this.leftTableId].checkOrUnCheckRow4CheckBox(strRowId, bCheck);
        } else if (this.whereIsCheckColumn == "center") {
          this.$refs[this.centerTableId].checkOrUnCheckRow4CheckBox(strRowId, bCheck);
        } else if (this.whereIsCheckColumn == "right") {
          this.$refs[this.rightTableId].checkOrUnCheckRow4CheckBox(strRowId, bCheck);
        }
      },
      checkorUnCheckRow4RadioBox(strRowId, bCheck) {
        if (this.whereIsRadioColumn == "left") {
          this.$refs[this.leftTableId].checkorUnCheckRow4RadioBox(strRowId, bCheck);
        } else if (this.whereIsRadioColumn == "center") {
          this.$refs[this.centerTableId].checkorUnCheckRow4RadioBox(strRowId, bCheck);
        } else if (this.whereIsRadioColumn == "right") {
          this.$refs[this.rightTableId].checkorUnCheckRow4RadioBox(strRowId, bCheck);
        }
      },
      disabledDropDownCell(strRowId, strKey, bDisabled) {
        if (this.whereIsCheckColumn == "left") {
          this.$refs[this.leftTableId].disabledDropDownCell(strRowId, strKey, bDisabled);
        } else if (this.whereIsCheckColumn == "center") {
          this.$refs[this.centerTableId].disabledDropDownCell(strRowId, strKey, bDisabled);
        } else if (this.whereIsCheckColumn == "right") {
          this.$refs[this.rightTableId].disabledDropDownCell(strRowId, strKey, bDisabled);
        }
      },
      getUnFoldRowIds() {
        return this.$refs[this.centerTableId].unFoldRowIds;
      },
      foldRows(arrRowIds) {
        return this.$refs[this.centerTableId].foldRows(arrRowIds);
      },
      unFoldRows(arrRowIds) {
        return this.$refs[this.centerTableId].unFoldRows(arrRowIds);
      },
      setCurPage(iPage) {
        this.$refs[this.footId].setCurPage(iPage);
        this._onPageChange(iPage);
      },
      getCurPage() {
        return this.$refs[this.footId].getCurPageIndex();
      },
      getCurPageData() {
        var arrLeftTableRows = [];
        var arrCenterTableRows = [];
        var arrRightTableRows = [];
        if(this.bHasLeftTable){
          arrLeftTableRows = this.$refs[this.leftTableId].rowsInPage;
        }
        if(this.bHasCenterTable){
          arrCenterTableRows = this.$refs[this.centerTableId].rowsInPage;
        }
        if(this.bHasRightTable){
          arrRightTableRows = this.$refs[this.rightTableId].rowsInPage;
        }

        var arrRows = this._combineRows(arrLeftTableRows, arrCenterTableRows, arrRightTableRows);
        return arrRows;
      },
      resetFoot: function () {
        this.$refs[this.footId].resetCurPageIndex();
      }

      //#endregion
    },
    watch: {
      titles: {
        handler() {
          this._initEx();
        },
        deep: true
      },
    },
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .GridExWithFreezeColumnWrapper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .GridExWithFreezeColumnWrapper .titleArea {
    width: 100%;
    height: 30px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #eee;
  }

  .GridExWithFreezeColumnWrapper .columnConfig {
    width: 30px;
    height: 28px;
    position: absolute;
    top: 1px;
    right: 8px;
    line-height: 28px;
    text-align: center;
    background-color: #eee;
    color: #777777;
    cursor: pointer;
  }

  .GridExWithFreezeColumnWrapper .columnConfig:hover {
    color: #3399ff;
  }

  .GridExWithFreezeColumnWrapper .freezeTables {
    width: 100%;
    position: relative;
  }

  .GridExWithFreezeColumnWrapper .freezeTables .freezeTable {
    position: absolute;
  }

  .GridExWithFreezeColumnWrapper .freezeTables .emptyTip {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../../../../static/images/common/emptyTip2.png") no-repeat center;
    background-size: 14%;
    display: none;
  }

  .GridExWithFreezeColumnWrapper .empty .emptyTip {
    display: block;
  }

  .GridExWithFreezeColumnWrapper .footArea {
    height: 32px;
    padding: 4px;
    box-sizing: border-box;
    text-align: center;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .GridExWithFreezeColumnWrapper .footArea .foot {
    display: inline-block;
    overflow: hidden;
    height: 100%;
  }

  /*region dark*/

  .dark .titleArea {
    background-color: #2a3255;
    border-top: #808080;
  }

  .dark .columnConfig {
    background-color: #2a3255;
    color: #ffffff;
  }

  .dark .columnConfig:hover {
    color: #3dcca6;
  }

  /*endregion*/

  /*region blackBg*/

  .blackBg .titleArea {
    background-color: #322b2b;
    border-top: #444444;
  }

  .blackBg .columnConfig {
    background-color: #322b2b;
    color: #ffffff;
  }

  .blackBg .columnConfig:hover {
    color: #3399ff;
  }

  /*endregion*/

</style>
