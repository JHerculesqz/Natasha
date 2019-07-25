<!--
功能说明：
1.props说明
titles：表格的表头
rows：表格列
limit：每页显示的行数
gridId: 表格控件实例的唯一标识
activeColor：行的激活颜色，默认值#395297
editCellFinished: 可编辑单元格编辑完成后的回调
sortRowsFunc: 自定义排序的回调，不传的话，按照默认的规则排序
canDrag: 是否可以拖拽列
detailRowComponent：二级面板中自定义组件名称
hasFoot: 是否有foot
dynamicPaging: 是否动态分页
totalNum: 当dynamicPaging为true时，必填
totalPage: 当dynamicPaging为true时，必填
pageLimit：分页时，分页显示的数量
2.支持的列的类型
text: 纯文本
input: 可编辑文本
icon: 可点击的图表，一个单元格中可以有多个
textIcon：带文字的可点击图表，一个单元格中只能有一个
dropdown：下拉选项
checkBox：多选框，不能和radioBox同时存在
radioBox: 单选框，不能和checkBox同时存在
multiDropdown：下拉框多选，支持度不好，待优化
customer：自定义单元格，支持文本单元格和dropdown单元格的切换
3.支持列的排序
在表头列中增加"orderBy: true"表示这一列支持排序
4.支持列的拖拽功能
规则：canDrag=true的情况下，列的宽度必须是"200px"的形式不能是百分比的形式
5.潜规则，二级面板中的自定义组件的引用是"detailRow_" + rowId
-->
<template>
  <div class="gridWrapper" v-bind:class="{showBorder:isChildGrid}">
    <div class="grid" :class="contentClass" :style="contentStyle">
      <table class="gridCont" cellspacing="0" cellpadding="0" border="0">
        <thead v-if="showTitles" :style="{left: offSetX + 'px'}">
        <tr style="width: 100%;">
          <td class="gridTitle" :id="'foldTag_' + [gridId]" v-if="useDetailRow()" style="width: 35px"></td>
          <template v-for="(title,index) in titles">
            <template v-if="title.visible">
              <td class="gridTitle" :style="getTdStyle2(title)" :title="title.label">
                <div v-if="title.type == 'checkBox'" class="checkBoxWrapper"
                     :class="{isIndeterminate:titleCheckboxIndeterminate}">
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
                <div v-else class="titleLable">
                    <span :class="{canClick: title.orderBy === true}" @click.stop="onClickTitle(title)">
                      <span :title="title.label">{{title.label}}</span>
                      <span v-if="showOrderBy(title)" :class="orderByClass(title)"></span>
                    </span>
                  <span v-if="showSearch(title)" class="icon-search column-search"
                        @click.stop="onClickSearch(title, $event)"></span>
                </div>
                <div v-if="canDrag" class="title-resize"
                     @mousedown="onResizeMouseDown(title, $event)"></div>
              </td>
            </template>
          </template>
          <div v-show="searchOption.show" class="search-dialog"
               :style="{left:searchOption.left, top:searchOption.top}">
            <component :is="searchComponent" :gridTitle="searchOption.gridTitle"></component>
          </div>
        </tr>
        </thead>
        <tbody :id="getTobodyId()">
        <div class="gridContWrapper" :id="getTobodyId() + 'cont'" v-click-outside="clickOutSideBody">
          <!--mock tr 用于在没有数据的情况下出现横向滚动条-->
          <tr v-if="rows.length === 0" style="visibility: hidden">
            <td v-if="useDetailRow()" style="width: 35px"></td>
            <td v-if="useDetail4RowChild()"
                style="width: 34px;background-color: #ffffff;border-right:1px solid #dbdbdb;"></td>
            <template v-for="title in titles" v-if="title.visible">
              <td :style="getTdStyle2(title)"></td>
            </template>
          </tr>
          <template v-for="(row,index) in rowsInPage">
            <tr :class="getTrStyle(row)"
                @click.stop="callback4OnClickRow(row)"
                @dblclick.stop="callback4OnDblclickRow(row)" v-bind:style="{'padding-right': isShowPadding}">
              <td v-if="useDetailRow()" style="width: 35px" :class="foldOrUnFold(row)"
                  @click.stop="onClickFoldOrUnFold(row)"></td>
              <td v-if="useDetail4RowChild()"
                  style="width: 34px;background-color: #ffffff;border-right:1px solid #dbdbdb;"></td>
              <template v-for="title in titles" v-if="title.visible">
                <td v-if="title.type == 'checkBox'" :style="getTdStyle(title, row)">
                  <div class="checkBoxWrapper">
                    <div class="checkBox" @click.stop>
                      <input type="checkbox" :id="_generateIdentityId(row)"
                             :disabled="formBoxDisabled(row)"
                             :checked="rowCheckboxChecked(row)"
                             @change="onRowCheckboxChange(row, $event)">
                      <label :for="_generateIdentityId(row)"></label>
                    </div>
                    <label :for="_generateIdentityId(row)">{{getCellValueByKey(title.key, row)}}</label>
                  </div>
                </td>
                <td v-if="title.type == 'radioBox'" :style="getTdStyle(title, row)">
                  <div class="radioWrapper" @click.stop>
                    <div class="radio">
                      <input type="radio" :id="_generateIdentityId(row)"
                             :value="getCellValueByKey('id', row)"
                             :disabled="formBoxDisabled(row)"
                             v-model="radioSelect"
                             @change.stop="onRowRadioboxChange(row, $event)"/>
                      <label :for="_generateIdentityId(row)"></label>
                    </div>
                  </div>
                </td>
                <td v-if="title.type == 'text'" :style="getTdStyle(title, row)">
                  <div class="textCell" :title="getCellTips(title.key, row)"
                       @click="onClickTextCell(title.key, row)">
                    <span class="textCellItem" v-html="getCellValueByKey(title.key, row)"
                          :style="{color:getCellColorByKey(title.key, row)}"></span>
                  </div>
                </td>
                <td v-if="title.type == 'multiText'" :style="getTdStyle(title, row)">
                  <div class="textCell">
                    <span class="textCellItem"
                          v-for="(item, index) in getCellValueByKey(title.key, row)"
                          :key="index"
                          :title="item"
                          style="white-space: pre;">{{item}}</span>
                  </div>
                </td>
                <td v-if="title.type == 'input'" :style="getTdStyle(title, row)">
                  <div class="inputWrapper">
                    <div class="radio">
                      <input type="text" class="inputDefault"
                             :value="getCellValueByKey(title.key, row)"
                             :title="getCellValueByKey(title.key, row)"
                             @click.stop
                             @keyup.enter="editRowFinished(title.key, row, $event)"
                             @blur="editRowFinished(title.key, row, $event)">
                    </div>
                  </div>
                </td>
                <td v-if="title.type == 'icon'" :style="getTdStyle(title, row)">
                  <div class="textIcon" v-bind:class="[getIconCellValueByKey(title.key, row)]"
                       style="float: left;margin-left: 5px;"
                       v-for="icon in getCellValueByKey(title.key, row)"
                       @click.stop="onIconClick(title.key, row, icon)">
                    <span class="iconOnly" v-show="icon.value != undefined"
                          :class="[icon.value,getIconCellValueByKey(title.key, row), {tip:icon.isWarn}]"
                          :title="icon.title"
                          :style="{color:icon.color}">
                      <span class="icon-label" v-show="icon.label != undefined"
                            :style="{color: icon.color}"
                            :title="icon.title">{{icon.label}}</span>
                    </span>
                  </div>
                </td>
                <td v-if="title.type == 'textIcon'" :style="getTdStyle(title, row)">
                  <div class="textIcon" @click.stop="onClickTextIcon(title.key, row)">
                  <span class="icon"
                        :class="[getCellValueByKey(title.key, row)]"
                        :style="{ color: _getCell(title.key, row).color }"></span>
                    <span class="icon-label"
                          :title="_getCell(title.key, row).label"
                          :style="{color:_getCell(title.key, row).color}">{{_getCell(title.key, row).label}}</span>
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
                            :value="item.value"
                            :title="item.value">{{item.value}}
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
                              :title="item.value"
                              :value="item.value">{{item.value}}
                      </option>
                    </select>
                  </template>
                  <template v-else-if="getCellType(title, row)=='input'">
                    <div class="inputWrapper">
                      <div class="radio">
                        <span>{{getCellFrontInputCustomerValue(title, row)}}</span>
                        <input type="text" class="inputDefaultInCustomer"
                               :value="getCellValueByKey(title.key, row)"
                               :title="getCellValueByKey(title.key, row)"
                               @click.stop
                               @keyup.enter="editRowFinished(title.key, row, $event)"
                               @blur="editRowFinished(title.key, row, $event)">
                        <span>{{getCellInputCustomerValue(title, row)}}</span>
                      </div>
                    </div>
                  </template>
                </td>
                <td v-if="title.type == 'switch'" :style="getTdStyle(title, row)">
                  <div class="switchWrapper">
                    <div class="switch" :class="!getCellValueByKey(title.key, row) ? 'switchNoSelect' : ''"
                         @click.stop="onClickSwitch(title.key, row)">
                    </div>
                  </div>
                </td>
                <td v-if="title.type == 'img'" :style="getTdStyle(title, row)">
                  <div class="imgWrapper">
                    <img class="img" :src="getCellValueByKey(title.key, row)"
                         :title="_getCell(title.key, row).label"
                         @click.stop="onClickImg(title.key, row)"/>
                  </div>
                </td>
              </template>
            </tr>
            <!--自定义二级面板-->
            <template v-if="useDetailRow(row)">
              <transition name="detail-row-transition">
                <tr v-if="isDeatilRowVisible(row)" v-bind:style="{'padding-right': isShowPadding}"
                    :id="getFoldRowTrId(row)">
                  <component :is="detailRowComponent" :ref="getDetailRowRef(row)" :row="row"></component>
                </tr>
              </transition>
            </template>
          </template>
        </div>
        </tbody>
      </table>
    </div>
    <div v-if="hasFoot" class="footArea">
      <div class="foot">
        <marvel-paging ref="ref4Paging"
                       :totalNum="totalCount"
                       :pages="totalPageCount"
                       :perPageNum="limit"
                       :showPageNum="showPageNum"
                       :limit="pageLimit"
                       :showChangeLimit="showChangeLimit"
                       :limitRange="limitRange"
                       :showNumSelected="showNumSelected"
                       :showPageSwitch="showPageSwitch"
                       @onPageChange="onPageChange"
                       @onPerPageNumChange="onPerPageNumChange"></marvel-paging>
      </div>
    </div>
    <div v-if="hasNoPageFoot" class="footArea">
      <div class="foot">
        <div class="foot-text">{{$t("total")}}{{rows.length}}{{$t("unit")}}</div>
        <div class="foot-text" v-if="showNumSelected">{{$t("select")}}{{selectedNum}}{{$t("unit")}}</div>
      </div>
    </div>
  </div>
</template>

<i18n>
  {
  "zh": {
  "total": "共",
  "unit": "条",
  "select": "选中"
  },
  "en": {
  "total": "Total:",
  "unit": "",
  "select": "selected:"
  }
  }
</i18n>

<script>
  import MarvelPaging from "../paging/MarvelPaging"
  import _ from "lodash"

  /**
   *  MarvelGridExFilter widget description
   *  @vuedoc
   *  @exports MarvelGridExFilter
   */
  export default {
    components: {
      MarvelPaging
    },
    name: 'MarvelGridExFilter',
    props: {
      titles: {
        type: Array,
        default: undefined,
        required: true,
      },
      showTitles: {
        type: Boolean,
        default: true,
        required: false,
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
      isChildGrid: {
        type: Boolean,
        default: false,
        required: false,
      },
      searchComponent: {
        type: String,
        default: "",
        required: false,
      },
      hasFoot: {
        type: Boolean,
        default: true,
        required: false,
      },
      hasNoPageFoot: {
        type: Boolean,
        default: false,
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
      showPageNum: {
        type: Boolean,
        default: true,
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
      showPageSwitch: {
        type: Boolean,
        default: true,
        required: false,
      },
      showNumSelected: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: function () {
      return {
        //#region 横向滚动条
        offSetX: 0,
        //#endregion
        //#region 分页
        curPageIndex: 1,
        skip: 0,
        limitInner: this.limit,
        //#endregion
        //#region rows
        rowsInPage: [],
        selectRowIds: [],
        radioSelect: "",
        activeIds: [],
        disabledIds: [],
        //#endregion
        //#region 排序
        orderBy: {
          key: "",
          order: 1 //1表示升序排列，-1表示降序排列
        },
        innerChange: false,
        //#endregion
        //#region search
        searchOption: {
          show: false,
          left: "0px",
          top: "0px",
          gridTitle: undefined,
        },
        //#endregion
        //#region resize
        bMousedown: false,
        resizeTitle: undefined,
        iClientX: 0,
        //#endregion
        //#region useDetailRow
        unFoldRowIds: [],
        //#endregion
        isShowPadding: "0px",
        //#region outsideBody
        arrDropDownCache: [],
        selectedNum: 0
        //#endregion
      }
    },
    created() {
      //#region created

      this._createdEx();

      //#endregion
    },
    mounted() {
      //#region init

      this._initEx();

      //#endregion
    },
    destroyed() {
      //#region destroy

      this._destroy();

      //#endregion
    },
    beforeDestroy() {
      //#region destroy

      this._beforeDestroy();

      //#endregion
    },
    activated() {
      this.offsetX = 0;
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
          return Math.ceil(this.rows.length / this.limitInner);
        }
      },
      titleCheckboxChecked() {
        //selectRowIds中存在非disable的行
        let b = this.selectRowIds.some((rowId) => {
          let index = this.disabledIds.indexOf(rowId);
          return index == -1;
        });
        return b;
      },
      titleCheckboxIndeterminate() {
        let checkAndNotDisabledIds = this.selectRowIds.filter((rowId) => {
          let index = this.disabledIds.indexOf(rowId);
          return index == -1;
        });
        return checkAndNotDisabledIds.length > 0 && checkAndNotDisabledIds.length + this.disabledIds.length < this.rows.length;
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
      },
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
          this.oWrapperFun = _.throttle(this.onResizeMouseMove, 100);
          document.body.addEventListener("mousemove", this.oWrapperFun);
          document.body.addEventListener("mouseup", this.onResizeMouseUp);
        }
      },
      _initEx: function () {
        this.scrollTarget = (oEvent) => {
          this.offSetX = -oEvent.target.scrollLeft;
        };
        let oTbody = this.$el.querySelector("tbody");
        oTbody.addEventListener("scroll", this.scrollTarget);
        this.listenerWndResize();
      },
      _beforeDestroy: function () {
        //移除事件
        document.body.removeEventListener("click", this._closeMultipleDropDownPanel);
        this._closeMultipleDropDownPanel = null;
        if (this.canDrag) {
          document.body.removeEventListener("mousemove", this.oWrapperFun);
          document.body.removeEventListener("mouseup", this.onResizeMouseUp);
          this.oWrapperFun = null;
          this.onResizeMouseUp = null;
        }
        window.removeEventListener("resize", this.setTbodyCssBy3rd);
        this.setTbodyCssBy3rd = null;

        let oTbody = this.$el.querySelector("tbody");
        oTbody.removeEventListener("scroll", this.scrollTarget);
        this.scrollTarget = null;
      },
      _destroy: function () {
        this.limitInner = null;
        this.rowsInPage = null;
        this.selectRowIds = null;
        this.activeIds = null;
        this.disabledIds = null;
        this.unFoldRowIds = null;
        this.arrDropDownCache = null;
      },

      //#endregion

      //#region 数据处理
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

        //设置样式
        this.setTbodyCssBy3rd();
      },
      _closeMultipleDropDownPanel() {
        //closeDropDownPanel
        this.titles.forEach((oTitle) => {
          if (oTitle.type == "multiDropdown") {
            this.rows.forEach((oRow) => {
              let oMultiDropdownCell = this._getCell(oTitle.key, oRow);
              this.$set(oMultiDropdownCell, "showDropdown", false);
            });
          }
        });
        //closeSearchDialog
        this.searchOption.show = false;
      },
      _handleCache() {
        if (this.innerChange) {
          this.innerChange = false;
        } else {
          this.selectRowIds.splice(0);
          this.radioSelect = "";
          this.activeIds.splice(0);
          this.unFoldRowIds.splice(0);
          this.disabledIds.splice(0);
        }
      },
      _calcRows4Show() {
        if (this.dynamicPaging) {
          this.rowsInPage = this.rows.slice(0);
        } else {
          //1.calc this.skip
          this.skip = (this.curPageIndex - 1) * this.limitInner;

          //2.calc this.rowsInPage
          var iTmpRowCount = this.curPageIndex * this.limitInner;
          if (iTmpRowCount <= this.rows.length) {
            this.rowsInPage = this.rows.slice(this.skip, this.skip + this.limitInner);
          } else {
            this.rowsInPage = this.rows.slice(this.skip, this.rows.length);
          }
        }
      },
      _generateIdentityId(oRow) {
        let strId = this.gridId + "-" + this.getCellValueByKey('id', oRow);
        return strId;
      },
      //#endregion

      //#region title
      showSearch(oTitle) {
        return oTitle.search == true;
      },
      onClickSearch(oTitle, oEvent) {
        this.searchOption.left = oEvent.clientX + "px";
        this.searchOption.top = oEvent.clientY + "px";
        this.searchOption.gridTitle = oTitle;
        this.searchOption.show = true;
      },
      showOrderBy(oTitle) {
        return oTitle.orderBy === true;
      },
      orderByClass(oTitle) {
        if (this.orderBy.key == oTitle.key) {
          if (this.orderBy.order === 1) {
            return "icon-marvelIcon-01";
          } else {
            return "icon-marvelIcon-03";
          }
        } else {
          return "icon-marvelIcon-99";
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
            //如果selectRowIds中没有，并且这一行不是disabled
            if (index == -1 && this.disabledIds.indexOf(strId) == -1) {
              this.selectRowIds.push(strId);
            }
          });
        } else {
          //保留disabledIds中的数据
          this.selectRowIds = this.selectRowIds.filter((rowId) => {
            let index = this.disabledIds.indexOf(rowId);
            return index > -1;
          });
        }
        //update selected prop
        this.rows.forEach((oRow) => {
          let oCell = this._getCell("checkBox", oRow);
          let strId = this.getCellValueByKey("id", oRow);
          //如果这一行不是disabled的
          if (this.disabledIds.indexOf(strId) == -1) {
            oCell.checked = isChecked;
          }
        });
        //#event
        this.onSelectedCheckboxChange();
        this.callback4OnTitleCheckOrUncheck(isChecked);
      },
      onResizeMouseDown(oTitle, oEvent) {
        if (oTitle.width.indexOf("px") > 0) {
          this.bMousedown = true;
          this.resizeTitle = oTitle;
          this.iClientX = oEvent.clientX;

          document.body.onselectstart = function () {
            return false;
          };
          document.body.ondragstart = function () {
            return false;
          };
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
        if (this.bMousedown && this.resizeTitle) {
          this.bMousedown = false;
          this.resizeTitle = undefined;

          document.body.onselectstart = function () {
            return true;
          };
          document.body.ondragstart = function () {
            return true;
          };
        }
      },
      //#endregion

      //#region row

      //#region common
      getIconCellValueByKey(strKeyValue, oRow) {
        let oCell = this._getCell(strKeyValue, oRow);
        if (oCell) {
          return oCell.disableCell == undefined ? "" : oCell.disableCell;
        }
      },
      getCellValueByKey(strKeyValue, oRow) {
        let oCell = this._getCell(strKeyValue, oRow);
        if (oCell) {
          return oCell.value;
        }
      },
      getCellColorByKey(strKeyValue, oRow) {
        let oCell = this._getCell(strKeyValue, oRow);
        if (oCell && oCell.hasOwnProperty("color")) {
          return oCell.color;
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
      getCellTips(strKeyValue, oRow) {
        let oCell = this._getCell(strKeyValue, oRow);
        if (oCell) {
          return oCell.title != undefined ? oCell.title : oCell.value;
        }
      },
      sortRows() {
        if (this.sortRowsFunc) {
          this.sortRowsFunc(this.orderBy.key, this.orderBy.order, this.rows);
        } else {
          this.rowsInPage.sort((oRow1, oRow2) => {
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
          this.resetIndex(this.rowsInPage);
        }
        this.innerChange = true;
      },
      sortRowsFuncInFront(key, order, rows, oCallback) {
        rows.sort((oRow1, oRow2) => {
          let strVal1 = this.getCellValueByKey(key, oRow1);
          let strVal2 = this.getCellValueByKey(key, oRow2);
          if (strVal1 < strVal2) {
            return -1 * order;
          } else if (strVal1 == strVal2) {
            return 0
          } else {
            return 1 * order;
          }
        });
        oCallback();
      },
      clearSelected: function (rows, oCallback) {
        let rowsTemp = rows;
        for (let i = 0; i < rowsTemp.length; i++) {
          let oCell = this._getCell("checkBox", rowsTemp[i]);
          if (!oCell) {
            oCallback();
            return;
          }
          let strId = this.getCellValueByKey("id", rowsTemp[i]);
          //如果这一行不是disabled的
          if (this.disabledIds.indexOf(strId) == -1) {
            oCell.checked = false;
          }
        }
        this._preHandleRowData();
        oCallback();
      },
      resetIndex: function (rows) {
        let rowsTemp = rows;
        for (let i = 0; i < rowsTemp.length; i++) {
          this._getCell("index", rowsTemp[i]).value = i + 1;
        }
        return rowsTemp;
      },
      updateOrgRows: function (rows4Filter, rows4Org, key, order) {
        let self = this;
        self.sortRowsFuncInFront(key, order, rows4Org, function () {
          rows4Filter.forEach((item, index) => {
            let oCell = self._getCell("checkBox", item);
            let strRowId = self.getCellValueByKey("id", item);
            for (let i = 0; i < rows4Org.length; i++) {
              let strOrgRowId = self.getCellValueByKey("id", rows4Org[i]);
              if (strRowId == strOrgRowId) {
                rows4Org[i] = item;
              }
            }
          });
        });
      },
      getTobodyId() {
        var strId = "Tbody_" + this.gridId;
        if (this.isChildGrid) {
          strId += "_childGrid";
        }
        return strId;
      },


      //设置表格行的样式
      getTrStyle(oRow) {
        let strId = this.getCellValueByKey("id", oRow);
        if (this.activeIds.indexOf(strId) > -1) {
          return "activeColor";
        }
        if (this.disabledIds.indexOf(strId) > -1) {
          return "disabledColor";
        }
        return "";
      },
      //设置表格一列的样式
      getTdStyle(oTitle, oRow) {
        let widthValue = parseInt(oTitle.width);
        let innerWidth = 0;

        if ((window.innerWidth < 1600) && (window.innerWidth > 1300)) {
          innerWidth = 1340;
        } else if (window.innerWidth <= 1300) {
          innerWidth = 1000;
        } else {
          innerWidth = window.innerWidth;
        }
        let oStyle = {
          "min-width": "20px",
          "width": (widthValue * innerWidth) / 1920 + "px"
        };
        return oStyle;
      },
      getTdStyle2(oTitle) {
        let widthValue = parseInt(oTitle.width);
        let innerWidth = 0;

        if ((window.innerWidth < 1600) && (window.innerWidth > 1300)) {
          innerWidth = 1340;
        } else if (window.innerWidth <= 1300) {
          innerWidth = 1000;
        } else {
          innerWidth = window.innerWidth;
        }
        let oStyle = {
          "min-width": "20px",
          "width": (widthValue * innerWidth) / 1920 + "px"
        };
        return oStyle;
      },
      getCellType(oTitle, oRow) {
        let oCell = this._getCell(oTitle.key, oRow);
        return oCell.type;
      },
      getCellFrontInputCustomerValue(oTitle, oRow) {
        let oCell = this._getCell(oTitle.key, oRow);
        return oCell.frontInputCustomerValue;
      },
      getCellInputCustomerValue(oTitle, oRow) {
        let oCell = this._getCell(oTitle.key, oRow);
        return oCell.inputCustomerValue;
      },
      listenerWndResize() {
        window.addEventListener("resize", this.setTbodyCssBy3rd);
      },
      //#endregion
      //#region useDetailRow
      useDetailRow(oRow) {
        return this.detailRowComponent !== "";
      },
      useDetail4RowChild(oRow) {
        return this.isChildGrid == true ? true : false;
      },
      getDetailRowRef(oRow) {
        let strRowId = this.getCellValueByKey("id", oRow);
        return "detailRow_" + strRowId;
      },
      foldOrUnFold(oRow) {
        let id = this.getCellValueByKey("id", oRow);
        let index = this.unFoldRowIds.indexOf(id);
        return index > -1 ? "icon-marvelIcon-64" : "icon-marvelIcon-65"
      },
      onClickFoldOrUnFold(oRow) {
        let id = this.getCellValueByKey("id", oRow);
        let index = this.unFoldRowIds.indexOf(id);
        if (index > -1) {
          this.unFoldRowIds.splice(index, 1);
          //从展开到折叠
          this.callback4OnClickFoldOrUnFold(oRow, false);
        } else {
          this.unFoldRowIds.push(id);
          //从折叠到展开
          this.callback4OnClickFoldOrUnFold(oRow, true);
        }

        var self = this;
        setTimeout(function () {
          self.setTbodyCssBy3rd();
        }, 400);
      },
      isDeatilRowVisible(oRow) {
        let id = this.getCellValueByKey("id", oRow);
        let index = this.unFoldRowIds.indexOf(id);
        return index > -1;
      },
      //#endregion
      //#region checkbox
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
        this.onSelectedCheckboxChange();
        //#event
        this.callback4OnRowCheckOrUnCheck(oRow, isChecked);
      },
      onSelectedCheckboxChange: function () {
        if (!this.showNumSelected) {
          return;
        }
        let selectedNum = 0;
        this.rows.forEach((oRow) => {
          let oCell = this._getCell("checkBox", oRow);
          if (oCell && oCell.checked) {
            selectedNum++;
          }
        });
        if (this.hasFoot) {
          this.$refs.ref4Paging.setSelectedNum(selectedNum);
        } else if (this.hasNoPageFoot) {
          this.selectedNum = selectedNum;
        }
      },
      rowCheckboxChecked(oRow) {
        let strId = this.getCellValueByKey("id", oRow);
        return this.selectRowIds.indexOf(strId) > -1;
      },
      //表格行是否使用
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
      //#endregion
      //#region radioBox
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
        //#event
        this.callback4OnRowRadioCheck(oRow);
      },
      //#endregion
      //#region text
      onClickTextCell(strKey, oRow) {
        let oCell = this._getCell(strKey, oRow);
        this.callback4OnClickTextCell(oRow, oCell, this.arrDropDownCache);
      },
      //#endregion
      //#region icon
      onIconClick(strKeyValue, oRow, oIcon) {
        let oCell = this._getCell(strKeyValue, oRow);
        this.callback4OnIconClick(oRow, oCell, oIcon);
      },
      //#endregion
      //#region input
      editRowFinished(strKeyVal, oRow, oEvent) {
        let oCell = this._getCell(strKeyVal, oRow);
        let oOldVal = oCell.value;
        let oNewVal = oEvent.target.value;
        if (this.editCellFinished) {
          this.editCellFinished(oRow, oCell, oOldVal, oNewVal, () => {
            oCell.value = oNewVal; //外界对值进行校验，校验通过调用该回调
          }, () => {
            oEvent.target.value = oOldVal;//校验不通过调用该回调
          });
        }
      },
      //#endregion
      //#region dropdown
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
        if (strOldOption.length > 0) {
          this.callback4OnOptionChange(oRow, oCell, strOldOption[0].value, strNewValue);
        } else {
          let strOldValue = oCell.oldValue == undefined ? "" : oCell.oldValue;
          this.callback4OnOptionChange(oRow, oCell, strOldValue, strNewValue);
        }
      },
      //#endregion
      //#region textIcon
      onClickTextIcon(strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        this.callback4OnClickTextIcon(oRow, oCell);
      },
      //#endregion
      //#region multiDropdown
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
      //#endregion
      //#region switch
      onClickSwitch(strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        this.$set(oCell, "value", !oCell.value);
        this.callback4OnClickSwitch(oRow, oCell);
      },
      //#endregion
      //#region img
      onClickImg(strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        this.callback4OnClickImg(oRow, oCell);
      },
      //#endregion

      //#endregion

      //#region page
      _resetCurPage() {
        if (this.hasFoot && !this.dynamicPaging) {
          this.$refs.ref4Paging.resetCurPageIndex();
        }
      },
      onPageChange(iPage, perPageNum) {
        if (this.dynamicPaging) {
          this.callback4OnPageChange(iPage, perPageNum);
        } else {
          this.curPageIndex = iPage;
        }
      },
      onPerPageNumChange(perPageNum) {
        this.limitInner = perPageNum;
        if (this.dynamicPaging) {
          this.callback4OnPerPageNumChange(perPageNum);
        } else {
          if (this.curPageIndex == 1) {
            this._calcRows4Show();
          } else {
            this.curPageIndex = 1;
          }
        }
      },
      //#endregion

      //#region outside sl

      clickOutSideBody: function () {
        if (this.arrDropDownCache.length > 0) {
          this.callback4HandleDropDown(this.arrDropDownCache);
        }
      },

      //#endregion

      //#endregion

      //#region callback

      callback4OnClickRow(oRow) {
        this.$emit("onClickRow", oRow);
      },
      callback4OnDblclickRow(oRow) {
        this.$emit("onDblclickRow", oRow);
      },
      callback4OnTitleCheckOrUncheck: function (isChecked) {
        this.$emit("onTitleCheckOrUncheck", isChecked);
      },
      callback4OnClickFoldOrUnFold: function (oRow, bIsFold) {
        this.$emit("onClickFoldOrUnFold", oRow, bIsFold);
      },
      callback4OnRowCheckOrUnCheck: function (oRow, isChecked) {
        this.$emit("onRowCheckOrUnCheck", oRow, isChecked);
      },
      callback4OnRowRadioCheck: function (oRow) {
        this.$emit("onRowRadioCheck", oRow);
      },
      callback4OnClickTextCell: function (oRow, oCell, ArrDropItems) {
        this.$emit("onClickTextCell", oRow, oCell, ArrDropItems);
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
      callback4OnClickSwitch: function (oRow, oCell) {
        this.$emit("onClickSwitch", oRow, oCell);
      },
      callback4OnClickImg: function (oRow, oCell) {
        this.$emit("onClickImg", oRow, oCell);
      },
      callback4OnPageChange: function (iPage, perPageNum) {
        this.$emit("onPageChange", iPage, perPageNum);
      },
      callback4OnPerPageNumChange: function (perPageNum) {
        this.$emit("onPerPageNumChange", perPageNum);
      },
      callback4HandleDropDown: function (ArrDropItems) {
        this.$emit("handleDropDown", ArrDropItems);
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
          return oCell.checked === true && oCell.disabled !== true;
        });
        return arrSelectRows;
      },
      delSelectRows4Checkbox() {
        var arrSelectRows = this.getSelectRows4Checkbox();
        for (var i = 0, len = arrSelectRows.length; i < len; i++) {
          var oRow = arrSelectRows[i];
          this.removeRow(this.getCellValueByKey("id", oRow));
        }
      },
      getSelectRow4Radiobox() {
        let arrSelectRows = this.rows.filter((oRow) => {
          let oCell = this._getCell("radioBox", oRow);
          return oCell.checked === true && oCell.disabled !== true;
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
        this.$set(oCell, "disabled", bDisabled);
      },
      getUnFoldRowIds() {
        return this.unFoldRowIds;
      },
      foldRows(arrRowIds) {
        arrRowIds.forEach((rowId) => {
          let index = this.unFoldRowIds.indexOf(rowId);
          if (index > -1) {
            this.unFoldRowIds.splice(index, 1);
          }
        });

        var self = this;
        setTimeout(function () {
          self.setTbodyCssBy3rd();
        }, 400);
      },
      unFoldRows(arrRowIds) {
        arrRowIds.forEach((rowId) => {
          let index = this.unFoldRowIds.indexOf(rowId);
          if (index === -1) {
            this.unFoldRowIds.push(rowId);
          }
        });
        var self = this;
        setTimeout(function () {
          self.setTbodyCssBy3rd();
        }, 400);
      },
      setCurPage(iPage) {
        this.$refs.ref4Paging.setCurPage(iPage);
      },
      getCurPage() {
        return this.$refs.ref4Paging.getCurPageIndex();
      },
      getCurPageData() {
        return this.rowsInPage;
      },
      setTbodyCssBy3rd: function () {
        //设置样式
        var strId = this.getTobodyId();
        if (this.$el != undefined) {
          let oTbody = this.$el.querySelector("#" + strId);
          if (oTbody != undefined && !this.isChildGrid) {
            var iBodyHeight = oTbody.clientHeight;
            var iCurBodyHeight = this.rowsInPage.length * 30;
            if (this.detailRowComponent != "" && this.detailRowComponent != undefined) {
              var arrUnfouldId = this.getUnFoldRowIds();
              if (arrUnfouldId != undefined && arrUnfouldId.length > 0) {
                for (var i = 0; i < arrUnfouldId.length; i++) {
                  var strTrChildId = "childTr_" + arrUnfouldId[i];
                  var OChildTr = document.getElementById(strTrChildId);
                  if (OChildTr != undefined || OChildTr != null) {
                    var iChildH = OChildTr.clientHeight;
                    iCurBodyHeight += iChildH;
                  }
                }
              }
            }
            if (iBodyHeight >= iCurBodyHeight) {
              this.isShowPadding = "17px";
            } else {
              this.isShowPadding = "0px";
            }
          }
        }
      },
      getFoldRowTrId(oRow) {
        var strRowTrId = "childTr_" + this.getCellValueByKey('id', oRow);
        return strRowTrId;
      },
      //#region outsideBody

      setDropDownCaches: function (oRow, oCell) {
        var oCache = {
          row: oRow,
          cell: oCell
        };
        this.arrDropDownCache.push(oCache);
      },
      delDropDownCaches: function (oRow, oCell, strOldValue, strNewValue) {
        let index = -1;
        for (let i = 0, len = this.arrDropDownCache.length; i < len; i++) {
          let strId = this.getCellValueByKey("id", this.arrDropDownCache[i].row);
          let strRowId = this.getCellValueByKey("id", oRow);
          if (strRowId === strId && oCell.key == this.arrDropDownCache[i].cell.key) {
            index = i;
            break;
          }
        }
        if (index > -1) {
          this.arrDropDownCache.splice(index, 1);
        }
      }

      //#endregion

      //#endregion
    },
    watch: {
      rows: {
        handler(oNewRows, oOldRows) {
          this._preHandleRowData();
          this._resetCurPage();
          this.onSelectedCheckboxChange();
        },
        deep: false
      },
      curPageIndex(iNewVal, iOldVal) {
        this._calcRows4Show();
      },
    },
    directives: {
      'click-outside': {
        bind: function (el, binding, vnode) {
          el.event = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
              vnode.context[binding.expression](event);
            }
          };
          document.body.addEventListener('click', el.event);
        },
        unbind: function (el) {
          document.body.removeEventListener('click', el.event);
        }
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
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
  }

  .showBorder {
    border-left: none;
  }

  .dark .gridWrapper {
    border: 1px solid #333;
  }

  .gridWrapper .grid {
    height: calc(100% - 32px);
    width: 100%;
  }

  .gridWrapper .empty {
    background-size: 14%;
  }

  .gridWrapper .grid .gridCont {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: block;
    border: 1px solid #ffffff;
    box-sizing: border-box;
  }

  table thead, tbody div tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .gridContWrapper {
    width: 100%;
    display: inline-block;
  }

  table thead .gridTitle {
    line-height: 30px;
  }

  table thead .gridTitle .titleLable {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  table thead .canClick:hover {
    cursor: pointer;
    color: #3399ff;
  }

  table thead .column-search {
    float: right;
    line-height: 30px;
  }

  table thead .column-search:hover {
    cursor: pointer;
  }

  table thead tr {
    position: relative;
  }

  .activePad {
    padding-right: 17px;
  }

  .search-dialog {
    position: fixed;
    z-index: 100000;
  }

  .gridWrapper .grid .gridCont thead {
    padding-right: 17px;
    position: relative;
    box-sizing: border-box;
    background-color: #e1e4e5;
  }

  .gridWrapper .grid .gridCont thead tr td {
    height: 30px;
    background-color: #e1e4e5;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgb(0, 0, 0);
    padding: 0 8px;
    position: relative;
    border-bottom: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
    font-size: 12px;
    font-weight: normal;
    text-align: left;
  }

  .gridWrapper .grid .gridCont thead tr td:last-child:after {
    content: "";
    height: 30px;
    background-color: #e1e4e5;
    width: 17px;
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
    height: calc(100% - 31px);
    display: block;
    overflow-x: auto;
    overflow-y: auto;
  }

  .gridWrapper .grid .gridCont tbody div tr td {
    color: rgb(0, 0, 0);
    height: 30px;
    padding: 0 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
    font-size: 12px;
    vertical-align: middle;
  }

  .gridWrapper .grid .gridCont tbody div tr td select:disabled {
    background-color: #f0f0f0;
    color: #999999;
  }

  .gridWrapper .grid .gridCont tbody div tr td .disableCell {
    color: #aaa !important;
    pointer-events: none !important;
  }

  .gridWrapper .grid .gridCont tbody div tr td div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .gridWrapper .grid .gridCont tbody div tr .icon {
    margin-right: 8px;
  }

  .gridWrapper .grid .gridCont tbody div tr .iconOnly {
    float: left;
    cursor: pointer;
    margin-right: 10px;
    height: 30px;
    line-height: 30px;
  }

  .gridWrapper .grid .gridCont tbody div tr .iconOnly:hover {
    color: #3399ff !important;
  }

  .gridWrapper .grid .gridCont tbody div tr .textIcon:hover {
    cursor: pointer;
    color: #3399ff !important;
  }

  .gridWrapper .grid .gridCont tbody div tr .textIcon .icon-label {
    text-decoration: none;
    border-bottom: 1px solid;
    padding-bottom: 1px;
    height: 30px;
    line-height: 30px;
  }

  .gridWrapper .grid .gridCont tbody div tr:nth-child(odd) {
    background-color: #f7f7f7;
  }

  .gridWrapper .grid .gridCont tbody .activeColor {
    background-color: #c6e3ff !important;
  }

  .gridWrapper .grid .gridCont tbody div tr:hover {
    background-color: #eaf6f9;
  }

  .gridWrapper .grid .gridCont tbody .disabledColor {
    background-color: #d5d5d5 !important;
  }

  .gridWrapper .grid tr td .textCell {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: left;
    align-items: center;
    flex-wrap: wrap;
  }

  .textCellItem {
    flex: 1 0 100%;
    text-overflow: ellipsis;
    overflow: hidden;
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

  .detail-row-transition-enter-active, .detail-row-transition-leave-active {
    transition: opacity .0s;
  }

  .detail-row-transition-enter, .detail-row-transition-leave-to {
    opacity: 0;
  }

  .detail-row-transition-enter-to, .detail-row-transition-leave {
    opacity: 1;
  }

  /*switch start*/
  .switchWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .switchWrapper .switch {
    position: relative;
    box-sizing: border-box;
    background-color: #3dcca6;
    background-clip: content-box;
    border-radius: 20px;
    flex: 0 1 38px;
    height: 20px;
    padding: 2px;
    transition: all .5s ease 0s;
  }

  .switchWrapper .switchNoSelect {
    background-color: #999;
  }

  .switchWrapper .switch::after {
    position: absolute;
    left: 18px;
    top: 0;
    box-sizing: border-box;
    content: "";
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 100%;
    border: 1px solid #3dcca6;
    cursor: pointer;
    transition: all .5s ease 0s;
  }

  .switchWrapper .switchNoSelect::after {
    left: 0;
  }

  /*switch end*/

  /*img start*/

  .imgWrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .imgWrapper > .img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    max-width: 38px;
    max-height: 38px;
  }

  /*img end*/

  /*region dark theme*/
  .dark .gridWrapper {
    background-color: #161C36;
  }

  .dark .grid {
  }

  .dark .empty {
  }

  .dark .grid .gridCont {
    border: 1px solid #46528c;
  }

  .dark .grid .gridCont thead {
  }

  .dark .grid .gridCont thead tr td {
    background-color: #222945;
    color: #ffffff;
    border-bottom: 1px solid #46528c;
    border-right: 1px solid #293053;
  }

  .dark .grid .gridCont thead tr td:last-child:after {
    background-color: #222945;
  }

  .dark .grid .gridCont thead tr .titleIcon {
  }

  .dark .grid .gridCont tbody {
  }

  .dark .grid .gridCont thead .canClick:hover {
    color: #3dcca6;
  }

  .dark .grid .gridCont tbody div tr td {
    color: rgba(255, 255, 255, 0.8);
    border-bottom: 1px solid #293053;
    border-right: 1px solid #293053;
  }

  .dark .gridWrapper .grid .gridCont tbody div tr td select:disabled {
    background-color: #070a48;
    color: #999999;
  }

  .dark .grid .gridCont tbody div tr td:last-child {
    border-right: none;
  }

  .dark .grid .gridCont tbody div tr td:last-child {
    color: rgba(255, 255, 255, 0.8);
    border-right: none;
  }

  .dark .grid .gridCont tbody div tr .icon {
  }

  .dark .grid .gridCont tbody div tr .iconOnly {
  }

  .dark .grid .gridCont tbody div tr .iconOnly:hover {
    color: #3399ff;
  }

  .dark .grid .gridCont tbody div tr:nth-child(odd) {
    background-color: #161C36;
  }

  .dark .grid .gridCont tbody div tr:nth-child(even) {
    background-color: #222945;
  }

  .dark .gridWrapper .grid .gridCont tbody .activeColor {
    background-color: #395297 !important;
  }

  .dark .grid .gridCont tbody div tr:hover {
    background-color: #1d3b60;
  }

  .dark .gridWrapper .grid .gridCont tbody .disabledColor {
    background-color: #606b9a !important;
  }

  .dark .options {
    border: 1px solid #3399FF;
    box-shadow: 0px 3px 6px rgba(255, 255, 255, 0.25);
    background-color: #1e1f36;
  }

  .dark .options .optionItem {
    background-color: #1e1f36;
    color: rgba(255, 255, 255, 0.8);
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
    color: rgba(255, 255, 255, 0.8);
    background-color: transparent;
  }

  .dark .grid tr td .customerSelect:hover {
    border: 1px solid #3399ff;
  }

  .dark .grid tr td .customerSelectOption {
    color: rgba(255, 255, 255, 0.8);
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
    border-bottom: 1px solid #46528c;
  }

  .dark .footArea .foot {
  }

  .dark .footArea .foot .pageSwitch {
  }

  .dark .footArea .foot .pageSwitch .item {
    color: rgba(255, 255, 255, 0.8);
  }

  .dark .footArea .foot .pageSwitch .item:hover {
    color: #fff;
    background-color: #60b0ff;
  }

  .dark .footArea .foot .pageSwitch .current {
    color: #fff;
    background-color: #3399ff !important;
  }

  .dark .footArea .foot .text {
    color: rgba(255, 255, 255, 0.8);
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
    border-color: #999999;
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
    font-size: 12px;
    line-height: 16px;
  }

  .isIndeterminate .checkBox label {
    background-color: #3399ff;
    border: 1px solid transparent !important;
  }

  .isIndeterminate .checkBox label:after {
    top: 3px;
    left: 3px;
    width: 4px;
    height: 4px;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    box-sizing: border-box;
    opacity: 1;
    border: 4px solid #fff !important;
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
    height: 26px;
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
    color: rgba(255, 255, 255, 0.8);
    background-color: transparent;
  }

  .mini .inputDefault {
    height: 22px;
    line-height: 22px;
    font-size: 12px;
  }

  .foot-text {
    height: 100%;
    float: left;
    line-height: 22px;
    color: #666;
    margin: 0 4px;
    padding: 0 4px;
    font-size: 12px;
  }

  /*input end*/

  .classPad {
    padding-right: 12px;
  }

  .inputDefaultInCustomer {
    width: 50%;
  }

  .tip:after {
    content: "";
    position: absolute;
    margin-top: 6px;
    margin-left: 3px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #ff4400;
  }

</style>
