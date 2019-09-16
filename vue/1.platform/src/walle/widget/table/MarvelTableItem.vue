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
<template>
  <div class="gridWrapper">
    <div class="grid" :class="contentClass" :style="contentStyle">
      <table class="gridCont" cellspacing="0" cellpadding="0" border="0">
        <thead :style="{left: offSetX + 'px'}">
        <tr>
          <th class="gridTitle" v-if="useDetailRow()" style="width: 35px"></th>
          <template v-for="(title,index) in titles">
            <template v-if="title.visible">
              <th class="gridTitle" :style="{ width: title.width }" :title="title.label">
                <div v-if="title.type == 'checkBox'" class="checkBoxWrapper">
                  <div class="checkBox">
                    <input type="checkbox" :id="gridId"
                           @change.stop="onTitleCheckboxChange(title, $event)"
                           :checked="titleCheckboxChecked">
                    <label :for="gridId"></label>
                  </div>
                  <label :for="gridId" class="checkBoxLabel">{{title.label}}</label>
                </div>
                <div v-else-if="title.type == 'radioBox'">
                </div>
                <div v-else :class="{canClick: title.orderBy === true}"
                     @click.stop="onClickTitle(title)">
                  <span>{{title.label}}</span>
                  <span v-if="showOrderBy(title)" :class="orderByClass(title)"></span>
                </div>
                <div v-if="canDrag" class="title-resize"
                     @mousedown="onResizeMouseDown(title, $event)"></div>
              </th>
            </template>
          </template>
        </tr>
        </thead>
        <tbody>
        <template v-for="(row,index) in rowsInPage">
          <tr :class="[getTrStyle(row, index),row[0].value == hoverRowId ? 'rowHover':'']" @click.stop="onClickRow(row)"
              @mouseenter="onRowHover(row)" @mouseleave="onRowHoverEnd">
            <td v-if="useDetailRow()" style="width: 35px" :class="foldOrUnFold(row)"
                @click.stop="onClickFoldOrUnFold(row)"></td>
            <template v-for="title in titles" v-if="title.visible">
              <td v-if="title.type == 'checkBox'" :style="getTdStyle(title, row)">
                <div class="checkBoxWrapper">
                  <div class="checkBox" @click.stop>
                    <input type="checkbox" :id="_generateIdentityId(row, 'check')"
                           :disabled="formBoxDisabled(row)"
                           :checked="rowCheckboxChecked(row)"
                           @change="onRowCheckboxChange(row, $event)">
                    <label :for="_generateIdentityId(row, 'check')"></label>
                  </div>
                  <label :for="_generateIdentityId(row, 'check')">{{getCellValueByKey(title.key, row)}}</label>
                </div>
              </td>
              <td v-if="title.type == 'radioBox'" :style="getTdStyle(title, row)">
                <div class="radioWrapper" @click.stop>
                  <div class="radio">
                    <input type="radio" :id="_generateIdentityId(row, 'radio')"
                           :value="getCellValueByKey('id', row)"
                           :disabled="formBoxDisabled(row)"
                           v-model="radioSelect"
                           @change.stop="onRowRadioboxChange(row, $event)"/>
                    <label :for="_generateIdentityId(row, 'radio')"></label>
                  </div>
                </div>
              </td>
              <td v-if="title.type == 'text'" :style="getTdStyle(title, row)">
                <div class="textCell" :title="getCellValueByKey(title.key, row)"
                     :style="getLabelStyle(title, row)"
                     @click="onClickTextCell(title.key, row)">
                  {{getCellValueByKey(title.key, row)}}
                </div>
              </td>
              <td v-if="title.type == 'input'" :style="getTdStyle(title, row)">
                <div class="inputWrapper">
                  <div class="radio">
                    <input type="text" class="inputDefault"
                           :value="getCellValueByKey(title.key, row)"
                           @click.stop
                           @blur="editRowFinished(title.key, row, $event)"
                           @keyup.enter="editRowFinished(title.key, row, $event)">
                  </div>
                </div>
              </td>
              <td v-if="title.type == 'icon'" :style="getTdStyle(title, row)">
                 <span class="iconOnly"
                       v-for="icon in getCellValueByKey(title.key, row)"
                       :class="[icon.value]"
                       :style="{ color: icon.color }"
                       :title="icon.label"
                       @click.stop="onIconClick(title.key, row, icon)">
                 </span>
              </td>
              <td v-if="title.type == 'textIcon'" :style="getTdStyle(title, row)">
                <div class="textIcon" @click.stop="onClickTextIcon(title.key, row)">
                  <span class="icon"
                        :class="[getCellValueByKey(title.key, row)]"
                        :style="{ color: _getCell(title.key, row).color }"></span>
                  <span :title="_getCell(title.key, row).label" :style="getLabelStyle(title, row)">{{_getCell(title.key, row).label}}</span>
                </div>
              </td>
              <td v-if="title.type == 'dropdown'" :style="getTdStyle(title, row)">
                <select class="customerSelect"
                        :disabled="dropDownCellDisabled(title.key, row)"
                        @click.stop
                        @change.stop="onOptionChange(title.key, row, $event)">
                  <option class="customerSelectOption"
                          v-for="item in getCellValueByKey(title.key, row)"
                          :selected="item.selected == true"
                          :value="item.value">{{item.value}}
                  </option>
                </select>
              </td>
              <td v-if="title.type == 'multiDropdown'" class="multiDropdown" :style="getTdStyle(title, row)">
                <div class="label icon-marvelIcon-24"
                     :title="multiDropdownText(title.key, row)"
                     v-text="multiDropdownText(title.key, row)"
                     @click.stop="onClickMultiDropdown(title.key, row)"></div>
                <div class="options" v-show="_getCell(title.key, row).showDropdown"
                     @blur="multiDropdownPanelBlur(title.key, row)">
                  <div class="optionItem"
                       v-for="item in getCellValueByKey(title.key, row)"
                       :class="{mouseDown: item.selected == true}"
                       @click.stop="onClickMultiDropdownItem(title.key, row, item)">{{item.value}}
                  </div>
                </div>
              </td>
              <td v-if="title.type == 'customer'" :style="getTdStyle(title, row)">
                <template v-if="getCellType(title, row) == 'text'">
                  <div class="textCell" :title="getCellValueByKey(title.key, row)"
                       @click.stop="onClickTextCell(title.key, row)">
                    {{getCellValueByKey(title.key, row)}}
                  </div>
                </template>
                <template v-else-if=" getCellType(title, row)=='dropdown'">
                  <select class="customerSelect"
                          @click.stop
                          @change.stop="onOptionChange(title.key, row, $event)">
                    <option class="customerSelectOption"
                            v-for="item in getCellValueByKey(title.key, row)"
                            :selected="item.selected == true"
                            :value="item.value">{{item.value}}
                    </option>
                  </select>
                </template>
              </td>
              <td v-if="title.type == 'progress'" :style="getTdStyle(title, row)">
                <div class="progressBarWrapper" :title="getCellValueByKey(title.key, row)">
                  <div class="progress"
                       :style="{width:getCellValueByKey(title.key, row),'background-color':getProgressColorByKey(title.key, row)}"></div>
                </div>
                <div class="progressLabel" :title="getCellValueByKey(title.key, row)">{{getCellValueByKey(title.key,
                  row)}}
                </div>
              </td>
            </template>
          </tr>
          <template v-if="useDetailRow(row)">
            <transition name="detail-row-transition">
              <tr v-if="isDeatilRowVisible(row)">
                <component :is="detailRowComponent" :row="row"></component>
              </tr>
            </transition>
          </template>
        </template>
        </tbody>
      </table>
    </div>
    <div v-if="hasFoot" class="footArea">
      <div class="foot">
        <marvel-paging ref="ref4Paging" :totalNum="totalCount" :pages="totalPageCount"
                       @onPageChange="onPageChange"></marvel-paging>
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
  import _ from "lodash"
  import MarvelTableColumnConfig from "./MarvelTableColumnConfig";

  /**
   *  MarvelTableItem widget description
   *  @vuedoc
   *  @exports MarvelTableItem
   */
  export default {
    components: {
      MarvelTableColumnConfig,
      MarvelPaging
    },
    name: 'MarvelTableItem',
    props: {
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
        required: true,
      },
      editCellFinished: {
        type: Function,
        default: undefined,
        required: false,
      },
      sortRowsFunc: {
        type: Function,
        default: undefined,
        required: false,
      },
      canDrag: {
        type: Boolean,
        default: false,
        required: false,
      },
      detailRowComponent: {
        type: String,
        default: "",
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
      pageLimit: {
        type: Number,
        default: 7,
        required: false,
      },
      columnConfig: {
        type: Boolean,
        default: false,
        required: false,
      }
    },
    data: function () {
      return {
        //region 横向滚动条
        offSetX: 0,
        //endregion
        //region 分页
        curPageIndex: 1,
        skip: 0,
        //endregion
        //region rows
        rowsInPage: [],
        selectRowIds: [],
        radioSelect: "",
        hoverRowId: undefined,
        activeIds: [],
        disabledIds: [],
        //endregion
        //region 排序
        orderBy: {
          key: "",
          order: 1 //1表示升序排列，-1表示降序排列
        },
        innerChange: false,
        //endregion
        //region resize
        bMousedown: false,
        resizeTitle: undefined,
        iClientX: 0,
        //endregion
        //region useDetailRow
        unFoldRowIds: []
        //endregion
      }
    },
    created() {
      //#region created

      this._createdEx();

      //#endregion
    },
    activated() {
      this.offSetX = 0;
    },
    mounted() {
      //#region init

      this._initEx();

      //#endregion
    },
    beforeDestroy() {
      //#region beforeDestroy

      this._beforeDestroy();

      //#endregion
    },
    computed: {
      totalCount() {
        if (this.dynamicPaging) {
          return this.totalNum;
        } else {
          return this.rows.length;
        }
      },
      totalPageCount() {
        if (this.dynamicPaging) {
          return this.totalPage;
        } else {
          return Math.ceil(this.rows.length / this.limit);
        }
      },
      titleCheckboxChecked() {
        return this.selectRowIds.length > 0;
      },
      contentClass() {
        let oClass = [];
        if (this.rows.length === 0) {
          oClass.push("empty");
        }
        return oClass;
      },
      contentStyle() {
        if (!this.hasFoot) {
          return {height: "100%"};
        }
      }
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _createdEx: function () {
        //预处理数据
        this._preHandleRowData();
        //关闭multipleDropdown的面板
        document.body.addEventListener("click", this._closeMultipleDropDownPanel);
        //绑定拖动事件
        if (this.canDrag) {
          let oWrapperFun = _.throttle(this.onResizeMouseMove, 100);
          document.body.addEventListener("mousemove", oWrapperFun);
          document.body.addEventListener("mouseup", this.onResizeMouseUp);
        }
      },
      _initEx: function () {
        let oTbody = this.$el.querySelector("tbody");
        oTbody.addEventListener("scroll", (oEvent) => {
          this.offSetX = -oEvent.target.scrollLeft;
          this.callback4OnTbodyScroll(oEvent);
        });
      },
      _beforeDestroy: function () {
        //移除事件
        document.body.removeEventListener("click", this._closeMultipleDropDownPanel);
        if (this.canDrag) {
          document.body.removeEventListener("mousemove", this.onResizeMouseMove);
          document.body.removeEventListener("mouseup", this.onResizeMouseUp);
        }
      },

      //#endregion

      //region 数据处理
      _preHandleTitleData() {

      },
      _preHandleRowData() {
        //清空缓存
        this._handleCache();

        //设置checkbox/radio的勾选
        this.titles.forEach((oTitle) => {
          if (oTitle.type == "checkBox") {
            this.rows.forEach((oRow) => {
              let oCheckBoxCell = this._getCell(oTitle.key, oRow);
              if (oCheckBoxCell.checked) {
                let strId = this.getCellValueByKey("id", oRow);
                this.selectRowIds.push(strId);
              }
              if (oCheckBoxCell.disabled === true) {
                let strId = this.getCellValueByKey("id", oRow);
                this.disabledIds.push(strId);
              }
            });
          }
          if (oTitle.type == "radioBox") {
            this.rows.forEach((oRow) => {
              let oRadioBoxCell = this._getCell(oTitle.key, oRow);
              if (oRadioBoxCell.checked) {
                let strId = this.getCellValueByKey("id", oRow);
                this.radioSelect = strId;
              }
              if (oRadioBoxCell.disabled === true) {
                let strId = this.getCellValueByKey("id", oRow);
                this.disabledIds.push(strId);
              }
            });
          }
          if (oTitle.type == "dropdown") {
            this.rows.forEach((oRow) => {
              let oCell = this._getCell(oTitle.key, oRow);
              if (!oCell.hasOwnProperty("disabled")) {
                this.$set(oCell, "disabled", false);
              }
            });
          }
        });
        //初始化multipleDropdown面板关闭
        this._closeMultipleDropDownPanel();

        //计算需要显示的rows
        this._calcRows4Show();
      },
      _closeMultipleDropDownPanel() {
        this.titles.forEach((oTitle) => {
          if (oTitle.type == "multiDropdown") {
            this.rows.forEach((oRow) => {
              let oMultiDropdownCell = this._getCell(oTitle.key, oRow);
              this.$set(oMultiDropdownCell, "showDropdown", false);
            });
          }
        });
      },
      _handleCache() {
        if (this.innerChange) {
          this.innerChange = false;
        } else {
          this.selectRowIds.splice(0);
          this.radioSelect = "";
          this.activeIds.splice(0);
          this.unFoldRowIds.splice(0);
        }
      },
      _calcRows4Show() {
        if (this.dynamicPaging) {
          this.rowsInPage = this.rows.slice(0);
        } else {
          //1.calc this.skip
          this.skip = (this.curPageIndex - 1) * this.limit;

          //2.calc this.rowsInPage
          var iTmpRowCount = this.curPageIndex * this.limit;
          if (iTmpRowCount <= this.rows.length) {
            this.rowsInPage = this.rows.slice(this.skip, this.skip + this.limit);
          } else {
            this.rowsInPage = this.rows.slice(this.skip, this.rows.length);
          }
        }
      },
      _generateIdentityId(oRow, strKey) {
        let strId = this.gridId + "-" + this.getCellValueByKey('id', oRow) + "-" + strKey;
        return strId;
      },
      //endregion
      //region title
      showOrderBy(oTitle) {
        return this.orderBy.key === oTitle.key;
      },
      orderByClass(oTitle) {
        if (this.orderBy.order === 1) {
          return "icon-marvelIcon-01";
        } else {
          return "icon-marvelIcon-03";
        }
      },
      onClickTitle(oTitle) {
        if (oTitle.orderBy !== true) {
          return;
        }
        //update
        if (this.orderBy.key === oTitle.key) {
          this.orderBy.order = -this.orderBy.order;
        } else {
          this.orderBy.key = oTitle.key;
          this.orderBy.order = 1;
        }
        //sort
        this.sortRows(oTitle.key);
      },
      onTitleCheckboxChange(oTitle, oEvent) {
        let isChecked = oEvent.target.checked;
        if (isChecked) {
          this.rows.forEach((oRow) => {
            let strId = this.getCellValueByKey("id", oRow);
            let index = this.selectRowIds.indexOf(strId);
            let indexEx = this.disabledIds.indexOf(strId);
            if (index == -1 && indexEx == -1) {
              this.selectRowIds.push(strId);
            }
          });
        } else {
          this.rows.forEach((oRow) => {
            let strId = this.getCellValueByKey("id", oRow);
            let index = this.selectRowIds.indexOf(strId);
            let indexEx = this.disabledIds.indexOf(strId);
            if (index > -1 && indexEx == -1) {
              this.selectRowIds.splice(index, 1);
            }
          });
        }
        //update selected prop
        this.rows.forEach((oRow) => {
          let oCell = this._getCell("checkBox", oRow);
          let strId = this.getCellValueByKey("id", oRow);
          let indexEx = this.disabledIds.indexOf(strId);
          if (indexEx == -1) {
            oCell.checked = isChecked;
          }
        });
        //event
        this.callback4OnTitleCheckOrUncheck(isChecked);
      },
      onResizeMouseDown(oTitle, oEvent) {
        if (oTitle.width.indexOf("px") > 0) {
          this.bMousedown = true;
          this.resizeTitle = oTitle;
          this.iClientX = oEvent.clientX;
        } else {
          console.log("Need to resize column, the title.width can not be percentages");
        }
      },
      onResizeMouseMove(oEvent) {
        if (this.bMousedown && this.resizeTitle) {
          let iDstClientX = oEvent.clientX;
          let iWidth = Number.parseFloat(this.resizeTitle.width);
          let iTargetWidth = iWidth + (iDstClientX - this.iClientX);
          iTargetWidth = Math.max(25, iTargetWidth);//限定最小值为25
          this.resizeTitle.width = iTargetWidth + "px";
          this.iClientX = iDstClientX;
        }
      },
      onResizeMouseUp(oEvent) {
        this.bMousedown = false;
        this.resizeTitle = undefined;
      },
      //endregion
      //#region column config
      _showColumnConfigPanel: function () {
        var oData = [];
        for (var i = 0; i < this.titles.length; i++) {
          if (this.titles[i].bCanColumnConfig != false) {
            if (this.titles[i].visible == true) {
              oData.push({
                label: this.titles[i].label,
                belongTo: "right"
              });
            } else {
              oData.push({
                label: this.titles[i].label,
                belongTo: "left"
              });
            }
          }
        }
        this.$refs.ref4ColumnConfig.init(oData);
      },
      _handleGridDataToShow: function (oData) {
        for (var i = 0; i < oData.length; i++) {
          for (var j = 0; j < this.titles.length; j++) {
            if (oData[i].label == this.titles[j].key) {
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
      //region row
      //region common
      getCellValueByKey(strKeyValue, oRow) {
        let oCell = this._getCell(strKeyValue, oRow);
        if (oCell) {
          return oCell.value;
        }
      },
      getProgressColorByKey(strKeyValue, oRow) {
        let oCell = this._getCell(strKeyValue, oRow);
        if (oCell) {
          return oCell.barColor;
        }
      },
      _getCell(strKeyValue, oRow) {
        for (let i = 0, len = oRow.length; i < len; i++) {
          let oCell = oRow[i];
          if (oCell.key == strKeyValue) {
            return oCell;
          }
        }
      },
      sortRows() {
        if (this.sortRowsFunc) {
          this.sortRowsFunc(this.orderBy.key, this.orderBy.order, this.rows);
        } else {
          this.rows.sort((oRow1, oRow2) => {
            let strVal1 = this.getCellValueByKey(this.orderBy.key, oRow1);
            let strVal2 = this.getCellValueByKey(this.orderBy.key, oRow2);
            if (strVal1 < strVal2) {
              return -1 * this.orderBy.order;
            } else if (strVal1 == strVal2) {
              return 0;
            } else {
              return 1 * this.orderBy.order;
            }
          });
        }
        this.innerChange = true;
      },
      clearSortStatus() {
        this.orderBy.key = "";
        this.orderBy.order = 1;
      },
      onClickRow(oRow) {
        this.callback4OnClickRow(oRow);
      },
      getTrStyle(oRow, index) {
        let oStyle = "";
        let strId = this.getCellValueByKey("id", oRow);
        if (this.activeIds.indexOf(strId) > -1) {
          oStyle = "activeRow";
        }
        if (this.disabledIds.indexOf(strId) > -1) {
          oStyle = "disabledRow";
        }
        if (index % 2 != 0) {
          oStyle += " evenRow"
        }
        return oStyle;
      },
      getLabelStyle(oTitle, oRow) {
        let oCell = this._getCell(oTitle.key, oRow);
        let oStyle = {
          color: oCell && oCell.labelColor ? oCell.labelColor : ""
        };
        return oStyle
      },
      getTdStyle(oTitle, oRow) {
        let oStyle = {
          width: oTitle.width
        };
        return oStyle;
      },
      getCellType(oTitle, oRow) {
        let oCell = this._getCell(oTitle.key, oRow);
        return oCell.type;
      },
      onRowHover(oRow) {
        this.callback4OnRowHover(oRow);
      },
      onRowHoverEnd() {
        this.callback4OnRowHoverEnd();
      },
      //endregion
      //region useDeatilRow
      useDetailRow(oRow) {
        return this.detailRowComponent !== "";
      },
      foldOrUnFold(oRow) {
        let id = this.getCellValueByKey("id", oRow);
        let index = this.unFoldRowIds.indexOf(id);
        return index > -1 ? "icon-marvelIcon_2-10" : "icon-marvelIcon_2-09"
      },
      onClickFoldOrUnFold(oRow) {
        let id = this.getCellValueByKey("id", oRow);
        let index = this.unFoldRowIds.indexOf(id);
        if (index > -1) {
          this.unFoldRowIds.splice(index, 1);
        } else {
          this.unFoldRowIds.push(id);
        }
      },
      isDeatilRowVisible(oRow) {
        let id = this.getCellValueByKey("id", oRow);
        let index = this.unFoldRowIds.indexOf(id);
        return index > -1;
      },
      //endregion
      //region checkbox
      onRowCheckboxChange(oRow, oEvent) {
        let isChecked = oEvent.target.checked;
        let strId = this.getCellValueByKey("id", oRow);
        let index = this.selectRowIds.indexOf(strId);
        if (isChecked) {
          if (index == -1) {
            this.selectRowIds.push(strId);
          }
        } else {
          if (index > -1) {
            this.selectRowIds.splice(index, 1);
          }
        }
        //update selected prop
        let oCell = this._getCell("checkBox", oRow);
        oCell.checked = isChecked;
        //event
        this.callback4OnRowCheckOrUnCheck(oRow, isChecked);
      },
      rowCheckboxChecked(oRow) {
        let strId = this.getCellValueByKey("id", oRow);
        return this.selectRowIds.indexOf(strId) > -1;
      },
      formBoxDisabled(oRow) {
        let strId = this.getCellValueByKey("id", oRow);
        let index = this.disabledIds.indexOf(strId);
        return index > -1 ? true : false;
      },
      getRowById(strRowId) {
        let arrRes = this.rows.filter((oRow) => {
          let strId = this.getCellValueByKey("id", oRow);
          return strRowId == strId;
        });
        if (arrRes.length) {
          return arrRes[0];
        }
      },
      //endregion
      //region radioBox
      onRowRadioboxChange(oRow, oEvent) { //该函数在改行的radio被勾选的时候触发
        let strId = this.getCellValueByKey("id", oRow);

        //update selected prop
        this.rows.forEach((oRowEx) => {
          let strIdEx = this.getCellValueByKey("id", oRowEx);
          let oCell = this._getCell("radioBox", oRowEx);
          if (strIdEx === strId) {
            oCell.checked = true;
          } else {
            oCell.checked = false;
          }
        });
        //event
        this.callback4OnRowRadioCheck(oRow);
      },
      //endregion
      //region text
      onClickTextCell(strKey, oRow) {
        let oCell = this._getCell(strKey, oRow);
        this.callback4OnClickTextCell(oRow, oCell);
      },
      //endregion
      //region icon
      onIconClick(strKeyValue, oRow, oIcon) {
        let oCell = this._getCell(strKeyValue, oRow);
        this.callback4OnIconClick(oRow, oCell, oIcon);
      },
      //endregion
      //region input
      editRowFinished(strKeyVal, oRow, oEvent) {
        let oCell = this._getCell(strKeyVal, oRow);
        let oOldVal = oCell.value;
        let oNewVal = oEvent.target.value;
        if (this.editCellFinished) {
          this.editCellFinished(oRow, oCell, oOldVal, oNewVal, () => {
            oCell.value = oNewVal; //外界对值进行校验，校验通过调用该回调
          });
        }
      },
      //endregion
      //region dropdown
      dropDownCellDisabled(strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        return oCell.disabled;
      },
      onOptionChange(strKeyVal, oRow, oEvent) {
        let oCell = this._getCell(strKeyVal, oRow);
        let oValue = oCell.value;
        let strNewValue = oEvent.target.value;
        let strOldOption = oValue.filter((oOption) => {
          return oOption.selected === true;
        });
        oValue.forEach((oOption) => {
          if (oOption.value == strNewValue) {
            this.$set(oOption, "selected", true);
          } else {
            this.$set(oOption, "selected", false);
          }
        });
        this.callback4OnOptionChange(oRow, oCell, strOldOption[0].value, strNewValue);
      },
      //endregion
      //region textIcon
      onClickTextIcon(strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        this.callback4OnClickTextIcon(oRow, oCell);
      },
      //endregion
      //region multiDropdown
      multiDropdownText(strKeyVal, oRow) {
        let oCellValue = this.getCellValueByKey(strKeyVal, oRow);
        let arrRes = [];
        oCellValue.forEach((oValue) => {
          if (oValue.selected) {
            arrRes.push(oValue.value);
          }
        });
        return arrRes.join(",");
      },
      onClickMultiDropdown(strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        let bShow = oCell.showDropdown;
        this.$set(oCell, "showDropdown", !bShow);
      },
      onClickMultiDropdownItem(strKeyVal, oRow, oItem) {
        let oCell = this._getCell(strKeyVal, oRow);
        if (!oItem.hasOwnProperty("selected")) {
          this.$set(oItem, "selected", true);
        } else {
          let bSelected = oItem.selected;
          this.$set(oItem, "selected", !bSelected);
        }
        this.callback4OnClickMultiDropdownItem(oRow, oCell, oItem);
      },
      multiDropdownPanelBlur(strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        this.$set(oCell, "showDropdown", false);
      },
      //endregion
      //endregion
      //region page
      _resetCurPage() {
        if (this.hasFoot && !this.dynamicPaging) {
          this.$refs.ref4Paging.resetCurPageIndex();
        }
      },
      onPageChange(iPage) {
        if (this.dynamicPaging) {
          this.callback4OnPageChange(iPage);
        } else {
          this.curPageIndex = iPage;
        }
      },
      //endregion

      //#endregion
      //#region callback

      callback4OnTbodyScroll: function (oEvent) {
        this.$emit("onTbodyScroll", oEvent);
      },
      callback4OnTitleCheckOrUncheck: function (isChecked) {
        this.$emit("onTitleCheckOrUncheck", isChecked);
      },
      callback4OnClickRow: function (oRow) {
        this.$emit("onClickRow", oRow);
      },
      callback4OnRowHover: function (oRow) {
        this.$emit("onRowHover", oRow);
      },
      callback4OnRowHoverEnd: function () {
        this.$emit("onRowHoverEnd");
      },
      callback4OnRowCheckOrUnCheck: function (oRow, isChecked) {
        this.$emit("onRowCheckOrUnCheck", oRow, isChecked);
      },
      callback4OnRowRadioCheck: function (oRow) {
        this.$emit("onRowRadioCheck", oRow);
      },
      callback4OnClickTextCell: function (oRow, oCell) {
        this.$emit("onClickTextCell", oRow, oCell);
      },
      callback4OnIconClick: function (oRow, oCell, oIcon) {
        this.$emit("onIconClick", oRow, oCell, oIcon);
      },
      callback4OnOptionChange: function (oRow, oCell, strOldValue, strNewValue) {
        this.$emit("onOptionChange", oRow, oCell, strOldValue, strNewValue);
      },
      callback4OnClickTextIcon: function (oRow, oCell) {
        this.$emit("onClickTextIcon", oRow, oCell);
      },
      callback4OnClickMultiDropdownItem: function (oRow, oCell, oItem) {
        this.$emit("onClickMultiDropdownItem", oRow, oCell, oItem);
      },
      callback4OnPageChange: function (iPage) {
        this.$emit("onPageChange", iPage);
      },

      //#endregion
      //#region 3rd

      setRowColor(strRowId, bCancleOtherRowActive = true) {
        if (bCancleOtherRowActive) {
          this.activeIds.splice(0);
        }
        let index = this.activeIds.indexOf(strRowId);
        if (index == -1) {
          this.activeIds.push(strRowId);
        }
      },
      removeRowColor(strRowId) {
        let index = this.activeIds.indexOf(strRowId);
        if (index > -1) {
          this.activeIds.splice(index, 1);
        }
      },
      getSelectRows4Checkbox() {
        let arrSelectRows = this.rows.filter((oRow) => {
          let oCell = this._getCell("checkBox", oRow);
          return oCell.checked === true;
        });
        return arrSelectRows;
      },
      getSelectRow4Radiobox() {
        let arrSelectRows = this.rows.filter((oRow) => {
          let oCell = this._getCell("radioBox", oRow);
          return oCell.checked === true;
        });
        if (arrSelectRows.length) {
          return arrSelectRows[0];
        }
      },
      getRows() {
        return this.rows;
      },
      removeRow(strRowId) {
        let index = -1;
        for (let i = 0, len = this.rows.length; i < len; i++) {
          let strId = this.getCellValueByKey("id", this.rows[i]);
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
        let arrRow = this.rows.filter((oRow) => {
          let strId = this.getCellValueByKey("id", oRow);
          let index = this.activeIds.indexOf(strId);
          return index > -1;
        });
        return arrRow;
      },
      disableRow(strRowId) {
        //cache
        let index = this.disabledIds.indexOf(strRowId);
        if (index == -1) {
          this.disabledIds.push(strRowId);
        }
        //update prop
        let oRow = this.getRowById(strRowId);
        if (oRow) {
          let oCell = this._getCell("checkBox", oRow);
          if (!oCell) {
            oCell = this._getCell("radioBox", oRow);
          }
          if (oCell) {
            oCell.disabled = true;
          }
        }
      },
      enableRow(strRowId) {
        //cache
        let index = this.disabledIds.indexOf(strRowId);
        if (index > -1) {
          this.disabledIds.splice(index, 1);
        }
        //update prop
        let oRow = this.getRowById(strRowId);
        if (oRow) {
          let oCell = this._getCell("checkBox", oRow);
          if (!oCell) {
            oCell = this._getCell("radioBox", oRow);
          }
          if (oCell) {
            oCell.disabled = false;
          }
        }
      },
      enableAllRows() {
        //cache
        this.disabledIds.splice(0);
        //update prop
        this.rows.forEach((oRow) => {
          if (oRow) {
            let oCell = this._getCell("checkBox", oRow);
            if (!oCell) {
              oCell = this._getCell("radioBox", oRow);
            }
            if (oCell) {
              oCell.disabled = false;
            }
          }
        });
      },
      checkOrUnCheckRow4CheckBox(strRowId, bCheck) {
        let index = this.selectRowIds.indexOf(strRowId);
        //缓存
        if (bCheck) {
          if (index == -1) {
            this.selectRowIds.push(strRowId);
          }
        } else {
          if (index > -1) {
            this.selectRowIds.splice(index, 1);
          }
        }
        //updateProp
        let oRow = this.getRowById(strRowId);
        let oCell = this._getCell("checkBox", oRow);
        oCell.checked = bCheck;
      },
      checkorUnCheckRow4RadioBox(strRowId, bCheck) {
        //cache
        if (bCheck) {
          if (this.radioSelect != strRowId) {
            this.radioSelect = strRowId;
          }
        } else {
          if (this.radioSelect == strRowId) {
            this.radioSelect = "";
          }
        }
        //updateProp
        this.rows.forEach((oRowEx) => {
          let strIdEx = this.getCellValueByKey("id", oRowEx);
          let oCell = this._getCell("radioBox", oRowEx);
          if (strIdEx === strRowId) {
            oCell.checked = bCheck;
          } else {
            oCell.checked = !bCheck;
          }
        });
      },
      disabledDropDownCell(strRowId, strKey, bDisabled) {
        let oRow = this.getRowById(strRowId);
        let oCell = this._getCell(strKey, oRow);
        if (oCell != undefined) {
          this.$set(oCell, "disabled", bDisabled);
        }
      },
      setTableContentScrollTop: function (iScrollTop) {
        let oTbody = this.$el.querySelector("tbody");
        oTbody.scrollTop = iScrollTop;
      },
      setRowHover: function (strRowId) {
        this.hoverRowId = strRowId;
      },
      resetFoot: function () {
        this.$refs.ref4Paging.resetPage();
      }

      //#endregion
    },
    watch: {
      rows: {
        handler(oNewRows, oOldRows) {
          this._preHandleRowData();
          this._resetCurPage();
        },
        deep: false
      },
      curPageIndex(iNewVal, iOldVal) {
        this._calcRows4Show();
      }
    }
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

  .gridWrapper {
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
  }

  .gridWrapper .grid {
    height: calc(100% - 32px);
    width: 100%;
  }

  .gridWrapper .empty {
    /*background: url("../../../../static/images/common/emptyTip2.png") no-repeat center;*/
    background-size: 14%;
  }

  .gridWrapper .columnConfig {
    width: 40px;
    height: 28px;
    position: absolute;
    top: 1px;
    right: 8px;
    line-height: 28px;
    text-align: center;
    background-color: #e1e4e5;
    color: #777777;
    cursor: pointer;
  }

  .gridWrapper .columnConfig:hover {
    color: #3399ff;
  }

  .gridWrapper .grid .gridCont {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
    border: 1px solid #ffffff;
    box-sizing: border-box;
  }

  table thead, tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  table thead {
    height: 30px;
    background-color: #eee;
  }

  table thead .gridTitle {
    line-height: 30px;
  }

  table thead .canClick:hover {
    cursor: pointer;
    color: #3399ff;
  }

  .gridWrapper .grid .gridCont thead {
    padding-right: 8px;
    position: relative;
    box-sizing: border-box;
  }

  .gridWrapper .grid .gridCont thead tr th {
    height: 30px;
    background-color: #e1e4e5;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #212121;
    padding: 0 8px;
    position: relative;
    border-bottom: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
    font-size: 14px;
    font-weight: 100;
    text-align: left;
  }

  .gridWrapper .grid .gridCont thead tr th:last-child:after {
    content: "";
    height: 30px;
    background-color: #eee;
    width: 8px;
    display: inline-block;
    position: absolute;
    top: 0;
    right: -8px;
  }

  .gridWrapper .grid .gridCont thead tr .titleIcon {
    float: right;
  }

  .gridWrapper .grid .gridCont thead tr .title-resize {
    position: absolute;
    top: 0px;
    right: -10px;
    width: 20px;
    height: 100%;
  }

  .gridWrapper .grid .gridCont thead tr .title-resize:hover {
    cursor: ew-resize;
  }

  .gridWrapper .grid .gridCont tbody {
    width: 100%;
    height: calc(100% - 32px);
    display: block;
    overflow-x: auto;
    overflow-y: scroll;
  }

  .gridWrapper .grid .gridCont tbody tr td {
    color: #333;
    height: 40px;
    padding: 0 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
    font-size: 15px;
  }

  .gridWrapper .grid .gridCont tbody tr td select:disabled {
    background-color: #f0f0f0;
    color: #999999;
  }

  .gridWrapper .grid .gridCont tbody .activeRow {
    background-color: #60b0ff !important;
  }

  .gridWrapper .grid .gridCont tbody .disabledRow {
    background-color: #dcdcdc !important;
    pointer-events: none;
  }

  .gridWrapper .grid .gridCont tbody tr td div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .gridWrapper .grid .gridCont tbody tr .icon {
    margin-right: 8px;
  }

  .gridWrapper .grid .gridCont tbody tr .iconOnly {
    float: left;
    cursor: pointer;
    margin-right: 10px;
  }

  .gridWrapper .grid .gridCont tbody tr .disableIcon {
    pointer-events: none;
    color: #999 !important;
  }

  .gridWrapper .grid .gridCont tbody tr .iconOnly:hover {
    color: #3399ff !important;
  }

  .gridWrapper .grid .gridCont tbody tr .textIcon:hover {
    cursor: pointer;
    color: #3399ff !important;
  }

  .gridWrapper .grid .gridCont tbody .evenRow {
    background-color: #f7f7f7;
  }

  .gridWrapper .grid .gridCont tbody tr:hover {
    background-color: #eaf6f9;
  }

  .gridWrapper .grid .gridCont tbody .rowHover {
    background-color: #eaf6f9;
  }

  .gridWrapper .grid tr td .textCell {
    width: 100%;
    height: 100%;
    line-height: 39px;
  }

  .gridWrapper .grid tr td .customerSelect {
    width: 100%;
    border-radius: 2px;
    border: 1px solid #cccccc;
    color: #666;
    background-color: transparent;
  }

  .gridWrapper .grid tr td .customerSelect:hover {
    cursor: pointer;
    border: 1px solid #3399ff;
  }

  .gridWrapper .grid tr td .customerSelectOption {
    color: #666;
    background-color: #ffffff;
  }

  .gridWrapper .grid tr .multiDropdown {
    position: relative;
    overflow-x: visible !important;
    overflow-y: visible !important;
  }

  .gridWrapper .grid tr .multiDropdown:hover {
    cursor: pointer;
  }

  .gridWrapper .grid tr .progressBarWrapper {
    float: left;
    width: calc(100% - 40px);
    height: 6px;
    margin-top: 8px;
    background-color: #d6d7e6;
  }

  .gridWrapper .grid tr .progress {
    height: 100%;
    background-color: #3dcca6;
  }

  .gridWrapper .grid tr .progressLabel {
    float: right;
  }

  .options {
    border-top: 1px solid #ccc;
    background-color: #ffffff;
    overflow-y: auto;
    overflow-x: hidden;
    position: absolute;
    top: 40px;
    left: 0px;
    width: 100%;
    z-index: 3;
    max-height: 400px;
  }

  .label {
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-right: 15px;
    height: 16px;
    box-sizing: border-box;
  }

  .label:before {
    position: absolute;
    font-size: 12px;
    top: 0px;
    right: 0px;
  }

  .options .optionItem {
    height: 32px;
    white-space: nowrap;
    cursor: pointer;
    padding: 0 25px 0 15px;
    background-color: #fff;
    white-space: nowrap;
    color: #333;
    font-size: 14px;
    line-height: 32px;
  }

  .options .optionItem:hover {
    background-color: #f5f6f7;
    color: #3399ff;
  }

  .options .mouseDown {
    background-color: #3399ff !important;
    color: #fff !important;
  }

  /*.gridWrapper .grid tr td .customerSelectOption:hover {*/
  /*color: #3399ff;*/
  /*background-color: #f5f6f7;*/
  /*}*/

  .gridWrapper .grid tr td .multiSelected {
    background-color: #66b3ff;
  }

  .gridWrapper .footArea {
    height: 32px;
    padding: 4px;
    box-sizing: border-box;
    text-align: center;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .gridWrapper .footArea .foot {
    display: inline-block;
    overflow: hidden;
    height: 100%;
  }

  .gridWrapper .footArea .foot .pageSwitch {
    float: left;
  }

  .gridWrapper .footArea .foot .pageSwitch .item {
    height: 100%;
    float: left;
    line-height: 26px;
    color: #666;
    padding: 0 4px;
    maring: 0 4px;
    font-size: 12px;
    cursor: pointer;
  }

  .gridWrapper .footArea .foot .pageSwitch .item:hover {
    color: #fff;
    background-color: #60b0ff;
  }

  .gridWrapper .footArea .foot .pageSwitch .current {
    color: #fff;
    background-color: #3399ff !important;
  }

  .gridWrapper .footArea .foot .pageDrop {
    float: left;
    padding: 0 10px;
    height: 22px;
    width: 40px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    line-height: 22px;
    font-size: 14px;
    color: #333;
    outline: none;
  }

  .gridWrapper .footArea .foot .text {
    height: 100%;
    float: left;
    line-height: 26px;
    color: #666;
    margin: 0 4px;
    padding: 0 4px;
    font-size: 12px;
  }

  .icon-marvelIcon_2-09 {
    color: #999999 !important;
  }

  .icon-marvelIcon_2-10 {
    color: #0093ff !important;
  }

  .detail-row-transition-enter-active, .detail-row-transition-leave-active {
    transition: opacity .3s;
  }

  .detail-row-transition-enter, .detail-row-transition-leave-to {
    opacity: 0;
  }

  .detail-row-transition-enter-to, .detail-row-transition-leave {
    opacity: 1;
  }

  /*region dark theme*/
  .dark .gridWrapper {
    background-color: #161C36;
  }

  .dark .grid {
  }

  .dark .empty {
  }

  .dark .columnConfig {
    background-color: #2a3255;
    color: #ffffff;
  }

  .dark .columnConfig:hover {
    color: #3dcca6;
  }

  .dark .grid .gridCont {
    border: 1px solid rgb(128, 128, 128);
  }

  .dark .grid .gridCont thead {
    background-color: #2a3255;
  }

  .dark .grid .gridCont thead tr th {
    background-color: #2a3255;
    color: #ffffff;
    border-bottom: 1px solid rgb(128, 128, 128);
    border-right: 1px solid rgb(128, 128, 128);
  }

  .dark .grid .gridCont thead tr th:last-child:after {
    background-color: #2a3255;
  }

  .dark .grid .gridCont thead tr .titleIcon {
  }

  .dark .grid .gridCont tbody {
  }

  .dark .grid .gridCont thead .canClick:hover {
    color: #3dcca6;
  }

  .dark .grid .gridCont tbody tr td {
    color: #ffffff;
    border-bottom: 1px solid rgb(128, 128, 128);
    border-right: 1px solid rgb(128, 128, 128);
  }

  .dark .gridWrapper .grid .gridCont tbody tr td select:disabled {
    background-color: #070a48;
    color: #999999;
  }

  .dark .gridWrapper .grid .gridCont tbody .activeRow {
    background-color: #395297 !important;
  }

  .dark .gridWrapper .grid .gridCont tbody .disabledRow {
    background-color: #3f414a !important;
    pointer-events: none;
  }

  .dark .grid .gridCont tbody tr td:last-child {
    border-right: none;
  }

  .dark .grid .gridCont tbody tr td:last-child {
    color: #ffffff;
    border-right: none;
  }

  .dark .grid .gridCont tbody tr .icon {
  }

  .dark .grid .gridCont tbody tr .iconOnly {
  }

  .dark .grid .gridCont tbody tr .disableIcon {
    color: #777 !important;
  }

  .dark .grid .gridCont tbody tr .iconOnly:hover {
    color: #3399ff;
  }

  .dark .grid .gridCont tbody .evenRow {
    background-color: #161C36;
  }

  .dark .grid .gridCont tbody tr:nth-child(even) {
    background-color: #263257;
  }

  .dark .grid .gridCont tbody tr:hover {
    background-color: #1d3b60;
  }

  .dark .grid .gridCont tbody .rowHover {
    background-color: #1d3b60;
  }

  .dark .options {
    border: 1px solid #3399FF;
    box-shadow: 0px 3px 6px rgba(255, 255, 255, 0.25);
    background-color: #1e1f36;
  }

  .dark .options .optionItem {
    background-color: #1e1f36;
    color: #ffffff;
  }

  .dark .options .optionItem:hover {
    background-color: #66b3ff;
    color: #fff;
  }

  .dark .options .mouseDown {
    background-color: #3399ff !important;
    color: #fff !important;
  }

  .dark .grid tr td .customerSelect {
    border: 1px solid #8b90b3;
    color: #ffffff;
    background-color: transparent;
  }

  .dark .grid tr td .customerSelect:hover {
    border: 1px solid #3399ff;
  }

  .dark .grid tr td .customerSelectOption {
    color: #ffffff;
    background-color: #1e1f36;
  }

  /*.dark .grid tr td .customerSelectOption:hover {*/
  /*color: #ffffff;*/
  /*background-color: #66b3ff;*/
  /*}*/

  .dark .grid tr td .multiSelected {
    background-color: #66b3ff;
  }

  .dark .footArea {
    border-top: none;
    border-bottom: 1px solid rgb(128, 128, 128);
  }

  .dark .footArea .foot {
  }

  .dark .footArea .foot .pageSwitch {
  }

  .dark .footArea .foot .pageSwitch .item {
    color: #ffffff;
  }

  .dark .footArea .foot .pageSwitch .item:hover {
    color: #fff;
    background-color: #60b0ff;
  }

  .dark .footArea .foot .pageSwitch .current {
    color: #fff;
    background-color: #3399ff !important;
  }

  .dark .footArea .foot .pageDrop {
    border: 1px solid #ccc;
    color: #333;
  }

  .dark .footArea .foot .text {
    color: #ffffff;
  }

  .dark .icon-marvelIcon_2-09 {
    color: #ffffff !important;
  }

  .dark .icon-marvelIcon_2-10 {
    color: #0093ff !important;
  }

  /*endregion*/

  /*sl start*/
  /*check start*/
  * {
    box-sizing: border-box
  }

  .checkBoxWrapper {
    display: inline-block;
  }

  .dpn {
    display: none;
  }

  .checkBoxWrapper .checkBox {
    width: 16px;
    height: 16px;
    position: relative;
    float: left;
  }

  .checkBoxWrapper .checkBox input[type=checkbox] {
    /*pos*/
    margin: 0;
    padding: 0;
    /*style*/
    visibility: hidden;
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:checked + label:after {
    /*pos*/
    /*style*/
    opacity: 1;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:checked + label {
    /*pos*/
    /*style*/
    background: #3399ff;
    border: 1px solid rgba(0, 0, 0, 0);
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:disabled + label:after {
    /*pos*/
    /*style*/
    border: 2px solid #999999;
    border-top: none;
    border-right: none;
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:disabled + label {
    /*pos*/
    /*style*/
    border: 1px solid #999999;
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .checkBoxWrapper .checkBox label {
    /*pos*/
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    /*style*/
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 2px;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  .checkBoxWrapper .checkBox label:hover {
    border: 1px solid #60b0ff;
  }

  .checkBoxWrapper .checkBox label:after {
    /*pos*/
    position: absolute;
    width: 7px;
    height: 4px;
    top: 3px;
    left: 2px;
    /*style*/
    opacity: 0;
    content: '';
    background: transparent;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .checkBoxWrapper .checkBoxLabel {
    margin: 0 0 0 5px;
    padding: 0;
    float: left;
    font-size: 14px;
    line-height: 16px;
  }

  /*check end*/
  /*radio start*/
  .radioWrapper {
    display: inline-block;
  }

  .dpn {
    display: none;
  }

  .radioWrapper .radio {
    width: 16px;
    height: 16px;
    position: relative;
    float: left;
  }

  .radioWrapper .radio input[type=radio] {
    /*pos*/
    margin: 0;
    padding: 0;
    /*style*/
    visibility: hidden;
  }

  .radioWrapper .radio input[type=radio]:checked + label:after {
    /*pos*/
    /*style*/
    opacity: 1;
    border-top: none;
    border-right: none;
  }

  .radioWrapper .radio input[type=radio]:checked + label {
    /*pos*/
    /*style*/
    background-color: #3399ff;
  }

  .radioWrapper .radio input[type=radio]:disabled + label:after {
    /*pos*/
    /*style*/
    background-color: #aaa;
  }

  .radioWrapper .radio input[type=radio]:disabled + label {
    /*pos*/
    /*style*/
    border: 1px solid #999999;
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .radioWrapper .radio label {
    /*pos*/
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    /*style*/
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 100%;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  .radioWrapper .radio label:hover {
    border: 1px solid #60b0ff;
  }

  .radioWrapper .radio label:after {
    /*pos*/
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    top: 4px;
    left: 4px;
    /*style*/
    opacity: 0;
    content: '';
    background-color: #fff;
  }

  /*radio end*/
  /*input start*/
  .inputWrapper {
    width: 100%;
  }

  .inputWrapper .inputDefault {
    padding: 0 10px;
    height: 30px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    outline: none;
  }

  .inputWrapper .inputDefault:hover, .inputWrapper .inputDefault:focus {
    border: 1px solid #3399ff;
  }

  .inputWrapper .errorTip {
    color: #ff4c4c;
    line-height: 36px;
    font-size: 14px;
    display: none;
  }

  .inputWrapper .errorTip:before {
    margin-right: 10px;
  }

  .error .inputDefault {
    border: 1px solid #ff4c4c !important;
  }

  .error .errorTip {
    display: block;
  }

  .disable .inputDefault {
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .dark {
    background-color: transparent;
  }

  .dark .inputDefault {
    border: 1px solid #8b90b3;
    font-size: 14px;
    color: #ffffff;
    background-color: transparent;
  }

  .mini .inputDefault {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
  }

  /*input end*/
  /*sl end*/
</style>
