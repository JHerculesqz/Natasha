<!--
功能说明：
1.props说明
titles：表格的表头
parentTitles: 表格的表头标题列合并
showParentTitles：是否有父标题
mergeHeaders：表格的表头标题行合并
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
expandRowIds：支持表格嵌套，当表格有嵌套时，默认需要展开的表格行
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
  <div class="gridWrapper" :id="curId" ref="lmm">
    <div class="grid" :class="contentClass" :style="contentStyle">
      <!--mergeHeaders:用于行合并-->
      <template v-for="item in mergeHeaders">
        <div class="mergeHeaders" v-bind:style="{left: item.left + offSetX + 'px', width: item.width}">
          {{item.label}}
        </div>
      </template>
      <table class="gridCont" cellspacing="0" cellpadding="0" border="0">
        <!--showParentTitles:用于列合并-->
        <thead v-if="showParentTitles" :style="{left: offSetX + 'px'}"
               :class="[!hasMergedRowOrColumn ? 'mergeStyle' : 'thead4Merge']">
        <tr>
          <template v-for="(title,index) in parentTitles">
            <template v-if="title.visible">
              <td class="gridTitle" :style="{ width: title.width }" :title="title.label">
                <div v-if="title.type == 'checkBox'" class="checkBoxWrapper"
                     :class="{isIndeterminate:titleCheckboxIndeterminate}">
                  <div class="checkBox">
                    <input type="checkbox" :id="gridId" @change.stop="onTitleCheckboxChange(title, $event)"
                           :checked="titleCheckboxChecked">
                    <label :for="gridId"></label>
                  </div>
                  <label :for="gridId" class="checkBoxLabel">{{title.label}}</label>
                </div>
                <div v-else-if="title.type == 'radioBox'">
                </div>
                <div v-else class="titleLable parentTitles">
                    <span :class="{canClick: title.orderBy === true}" @click.stop="onClickTitle(title)">
                      <span :title="title.label">{{title.label}}</span>
                      <span v-if="showOrderBy(title)" :class="orderByClass(title)"></span>
                    </span>
                  <span v-if="showSearch(title)" class="icon-search column-search"
                        @click.stop="onClickSearch(title, $event)"></span>
                </div>
                <div v-if="canDrag" class="title-resize" @mousedown="onResizeMouseDown(title, $event)"></div>
              </td>
            </template>
          </template>
        </tr>
        </thead>
        <!--标题-->
        <thead v-if="showTitles" :style="tableStyle"
               :class="[!hasMergedRowOrColumn ? 'mergeStyle' : 'thead4Merge']">
        <tr>
          <td class="gridTitle" v-if="useDetailRow()" style="width: 35px; background-color: #eaeeef"></td>
          <template v-for="(title,index) in titles">
            <template v-if="title.visible">
              <td class="gridTitle" :style="{ width: title.width }" :title="title.label">
                <div v-if="title.type == 'checkBox'" class="checkBoxWrapper"
                     :class="{isIndeterminate:titleCheckboxIndeterminate}">
                  <template v-if="title.label != undefined && title.label!= ''">
                    <label :for="gridId" class="checkBoxLabel">{{title.label}}</label>
                  </template>
                  <template v-else>
                    <div class="checkBox">
                      <input type="checkbox" :id="gridId" @change.stop="onTitleCheckboxChange(title, $event)"
                             :checked="titleCheckboxChecked">
                      <label :for="gridId"></label>
                    </div>
                  </template>
                </div>
                <div v-else-if="title.type == 'radioBox'">
                  <template v-if="title.label != undefined && title.label!= ''">
                    <label :for="gridId" class="checkBoxLabel">{{title.label}}</label>
                  </template>
                </div>
                <div v-else class="titleLable" :style="getDivWidth(title)">
                    <span :class="{canClick: title.orderBy === true}" @click.stop="onClickTitle(title)">
                      <span :title="title.label">{{title.label}}</span>
                      <span v-if="showOrderBy(title)" :class="orderByClass(title)"></span>
                    </span>
                  <span v-if="showSearch(title)" class="icon-search column-search"
                        @click.stop="onClickSearch(title, $event)"></span>
                </div>
                <div v-if="canDrag" class="title-resize" @mousedown="onResizeMouseDown(title, $event)"></div>
              </td>
            </template>
          </template>
          <div v-show="searchOption.show" class="search-dialog"
               :style="{left:searchOption.left, top:searchOption.top}">
            <component :is="searchComponent" :gridTitle="searchOption.gridTitle"></component>
          </div>
        </tr>
        </thead>
        <tbody v-bind:style="{height:_calcTbodyHeight()}">
        <div class="gridContWrapper">
          <!--mock tr 用于在没有数据的情况下出现横向滚动条-->
          <tr v-if="rows.length === 0" style="visibility: hidden">
            <td v-if="useDetailRow()" style="width: 35px"></td>
            <template v-for="title in titles" v-if="title.visible">
              <td :style="{width: title.width}"></td>
            </template>
          </tr>
          <template v-for="(row,index) in rowsInPage">
            <tr :class="getTrStyle(row)"
                @click.stop="callback4OnClickRow(row)"
                @dblclick.stop="callback4OnDblclickRow(row)">
              <td v-if="useDetailRow()" style="width: 35px" :class="foldOrUnFold(row)"
                  @click.stop="onClickFoldOrUnFold(row)"></td>
              <template v-for="title in titles" v-if="title.visible">
                <!--列支持checkBox类型-->
                <td v-if="title.type == 'checkBox'" :style="getTdStyle(title, row)">
                  <div class="checkBoxWrapper" style="overflow: visible">
                    <div class="checkBox" @click.stop v-show="_getCell(title.key,row).visible == false ? false : true">
                      <input type="checkbox" :id="_generateIdentityId(row, title)"
                             :disabled="formBoxDisabled(row) || formBoxItemDisabled(row, title)"
                             :checked="rowCheckboxChecked(row, title)"
                             @change="onRowCheckboxChange(row, $event, title)">
                      <label :for="_generateIdentityId(row, title)"></label>
                    </div>
                    <label :for="_generateIdentityId(row, title)">{{getCellValueByKey(title.key, row)}}</label>
                  </div>
                </td>
                <!--列支持radioBox类型-->
                <td v-if="title.type == 'radioBox'" :style="getTdStyle(title, row)">
                  <div class="radioWrapper" @click.stop>
                    <div class="radio">
                      <template v-if="supportMultiRowCheckOrRadioBox">
                        <input type="radio" :id="_generateIdentityId(row, title)"
                               :value="getCellValueByKey('id', row)"
                               :disabled="formBoxDisabled(row) || formBoxItemDisabled(row, title)"
                               :checked="rowRadioboxChecked(row, title)"
                               @change.stop="onRowRadioboxChange(row, $event, title.key)"/>
                        <label :for="_generateIdentityId(row, title)"></label>
                      </template>
                      <template v-else>
                        <input type="radio" :id="_generateIdentityId(row, title)"
                               :value="getCellValueByKey('id', row)"
                               :disabled="formBoxDisabled(row) || formBoxItemDisabled(row, title)"
                               v-model="radioSelect"
                               @change.stop="onRowRadioboxChange(row, $event, title.key)"/>
                        <label :for="_generateIdentityId(row, title)"></label>
                      </template>
                    </div>
                  </div>
                </td>
                <!--列支持文本类型-->
                <td v-if="title.type == 'text' && getTdColspan(title.key, row) && getTdRowspan(title.key, row)"
                    :style="getTdStyle(title, row)"
                    :colspan="getTdColspan(title.key, row)"
                    :rowspan="getTdRowspan(title.key, row)">
                  <div class="textCell" :title="getCellTips(title.key, row)"
                       @click="onClickTextCell(title.key, row)"
                       :style="getDivWidth(title)">
                    <span class="textCellItem" v-if="'text' == getCellValueStyleByKey(title.key, row)"
                          v-text="getCellValueByKey(title.key, row)"></span>
                    <span class="textCellItem" v-else v-html="getCellValueByKey(title.key, row)"></span>
                  </div>
                </td>
                <!--列支持多输入框类型-->
                <td v-if="title.type == 'multiText'" :style="getTdStyle(title, row)">
                  <div class="textCell">
                    <span class="textCellItem"
                          v-for="(item, index) in getCellValueByKey(title.key, row)"
                          :key="index"
                          :title="item" v-html="item"></span>
                  </div>
                </td>
                <!--列支持输入框类型-->
                <td v-if="title.type == 'input' && getTdColspan(title.key, row) && getTdRowspan(title.key, row)"
                    :style="getTdStyle(title, row)"
                    :colspan="getTdColspan(title.key, row)"
                    :rowspan="getTdRowspan(title.key, row)">
                  <div class="inputWrapper">
                    <div class="radio" :style="getDivWidth(title)">
                      <input type="text" class="inputDefault"
                             :value="getCellValueByKey(title.key, row)"
                             :title="getCellValueByKey(title.key, row)"
                             @click.stop
                             @keyup.enter="editRowFinished(title.key, row, $event)"
                             @blur="editRowFinished(title.key, row, $event)">
                    </div>
                  </div>
                </td>
                <!--列支持图标类型-->
                <td v-if="title.type == 'icon'" :style="getTdStyle(title, row)">
                 <span class="iconOnly"
                       v-for="icon in getCellValueByKey(title.key, row)"
                       :class="[icon.value]"
                       :style="{ color: icon.color }"
                       :title="icon.title"
                       @click.stop="onIconClick(title.key, row, icon)">
                 </span>
                </td>
                <!--列支持文本图标类型-->
                <td v-if="title.type == 'textIcon'" :style="getTdStyle(title, row)">
                  <div class="textIcon" @click.stop="onClickTextIcon(title.key, row)">
                  <span class="icon"
                        :class="[getCellValueByKey(title.key, row)]"
                        :style="{ color: _getCell(title.key, row).color }"></span>
                    <span class="icon-label"
                          :title="_getCell(title.key, row).label">{{_getCell(title.key, row).label}}</span>
                  </div>
                </td>
                <!--列支持下拉框类型-->
                <td v-if="title.type == 'dropdown'" :style="getTdStyle(title, row)" style="overflow:visible">
                  <template v-if="supportCustomerDropDown">
                    <marvel-drop-down-button maxHeight="200px" :width="getDropDownwidth(title, row)"
                                             :disable="dropDownCellDisabled(title.key, row)"
                                             :dropDownItems="getCellValueByKeyEx(title.key, row)"
                                             :showSelectIcon="false"
                                             style="overflow: visible"
                                             @onOptionSelect="onOptionChangeEx(arguments, title.key, row)"></marvel-drop-down-button>
                  </template>
                  <template v-else>
                    <select class="customerSelect"
                            :disabled="dropDownCellDisabled(title.key, row)"
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
                </td>
                <!--列支持多下拉框类型-->
                <td v-if="title.type == 'multiDropdown'" class="multiDropdown"
                    :style="getTdStyle(title, row)">
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
                <!--列支持文本和下拉框的切换-->
                <td v-if="title.type == 'customer'" :style="getTdStyle(title, row)" style="overflow: visible">
                  <template v-if="getCellType(title, row) == 'text'">
                    <div class="textCell" :title="getCellValueByKey(title.key, row)"
                         @click.stop="onClickTextCell(title.key, row)">
                      {{getCellValueByKey(title.key, row)}}
                    </div>
                  </template>
                  <template v-else-if=" getCellType(title, row)=='dropdown'">
                    <template v-if="supportCustomerDropDown">
                      <marvel-drop-down-button maxHeight="200px" :width="getDropDownwidth(title, row)"
                                               :disable="dropDownCellDisabled(title.key, row)"
                                               :dropDownItems="getCellValueByKeyEx(title.key, row)"
                                               :showSelectIcon="false"
                                               style="overflow: visible"
                                               @onOptionSelect="onOptionChangeEx(arguments, title.key, row)"></marvel-drop-down-button>
                    </template>
                    <template v-else>
                      <select class="customerSelect"
                              :disabled="dropDownCellDisabled(title.key, row)"
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
                  </template>
                  <template v-else-if="getCellType(title, row)=='input'">
                    <div class="inputWrapper">
                      <div class="radio" :style="getDivWidth(title)">
                        <input type="text" class="inputDefault"
                               :value="getCellValueByKey(title.key, row)"
                               :title="getCellValueByKey(title.key, row)"
                               @click.stop
                               @keyup.enter="editRowFinished(title.key, row, $event)"
                               @blur="editRowFinished(title.key, row, $event)">
                      </div>
                    </div>
                  </template>
                </td>
                <!--列支持开关类型-->
                <td v-if="title.type == 'switch'" :style="getTdStyle(title, row)">
                  <div class="switchWrapper">
                    <div class="switch"
                         :class="!getCellValueByKey(title.key, row) ? 'switchNoSelect' : ''"
                         @click.stop="onClickSwitch(title.key, row)">
                    </div>
                  </div>
                </td>
                <!--列支持图片类型-->
                <td v-if="title.type == 'img'" :style="getTdStyle(title, row)">
                  <div class="imgWrapper">
                    <img class="img" :src="getCellValueByKey(title.key, row)"
                         :title="_getCell(title.key, row).label"
                         @click.stop="onClickImg(title.key, row)"/>
                  </div>
                </td>
                <!--列支持自定义组件-->
                <td v-if="title.type == 'customerMore'" :style="getTdStyle(title, row)">
                  <div class="customerMoreWrapper">
                    <component :is="getCellValueByKey(title.key, row)"
                               :row="row"></component>
                  </div>
                </td>
              </template>
            </tr>
            <!--行支持自定义组件-->
            <template v-if="useDetailRow(row)">
              <transition name="detail-row-transition">
                <tr v-if="isDeatilRowVisible(row)">
                  <component :is="detailRowComponent" :ref="getDetailRowRef(row)"
                             :row="row"></component>
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
                       :showPageSwitch="showPageSwitch"
                       @onPageChange="onPageChange"
                       @onPerPageNumChange="onPerPageNumChange"></marvel-paging>
      </div>
    </div>
  </div>
</template>

<script>
  import MarvelPaging from "../../../walle/widget/paging/MarvelPaging"
  import _ from "lodash"
  import StringUtils from "../../../walle/component/str/index.js"
  import MarvelDropDownButton from "../../../walle/widget/button/MarvelDropDownButton"

  /**
   *  MarvelGridEx widget description
   *  @vuedoc
   *  @exports MarvelGridEx
   */
  export default {
    components: {
      MarvelPaging,
      MarvelDropDownButton
    },
    name: 'MarvelGridEx',
    props: {
      titles: {
        type: Array,
        default: undefined,
        required: true,
      },
      parentTitles: {
        type: Array,
        default: function () {
          return []
        },
        required: false,
      },
      mergeHeaders: {
        type: Array,
        default: function () {
          return []
        },
        required: false,
      },
      showParentTitles: {
        type: Boolean,
        default: false,
        required: false,
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
        default: true,
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
      unFoldRowIds: {
        type: Array,
        default: function () {
          return [];
        },
        required: false,
      },
      hasMergedRowOrColumn: {
        type: Boolean,
        default: false,
        required: false,
      },
      supportMultiRowCheckOrRadioBox: {
        type: Boolean,
        default: false,
        required: false,
      },
      supportCustomerDropDown: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: function () {
      return {
        //region 横向滚动条
        offSetX: 0,
        //endregion
        //region 分页
        curPageIndex: 1,
        skip: 0,
        limitInner: this.limit,
        //endregion
        //region rows
        rowsInPage: [],
        selectRowIds: [],
        radioSelect: "",
        activeIds: [],
        warnIds: [],
        hideDetailRowIds: [],//对于没有子元素的行，不需要添加展开图标
        disabledIds: [],
        //endregion
        //region 排序
        orderBy: {
          key: "",
          order: 1 //1表示升序排列，-1表示降序排列
        },
        innerChange: false,
        //endregion
        //region search
        searchOption: {
          show: false,
          left: "0px",
          top: "0px",
          gridTitle: undefined,
        },
        //endregion
        //region resize
        bMousedown: false,
        resizeTitle: undefined,
        iClientX: 0,
        expandRowIds: [],
        curId: "",
        //endregion
        //region useDetailRow
        //endregion
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
    beforeDestroy() {
      //#region destroy

      this._destroy();

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
      tableStyle() {
        var oRes = {
          left: this.offSetX + 'px',
          paddingRight: '0px'
        };
        if (this.hasMergedRowOrColumn) {
          var iTitleWidth = 0;
          for (var i = 0; i < this.titles.length; i++) {
            var oTitle = this.titles[i];
            iTitleWidth += Number(oTitle.width.split("px")[0]);
          }
          oRes.width = iTitleWidth + "px";
        }
        return oRes
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
          this.oWrapperFun = _.throttle(this.onResizeMouseMove, 100);
          document.body.addEventListener("mousemove", this.oWrapperFun);
          document.body.addEventListener("mouseup", this.onResizeMouseUp);
        }
        this.curId = StringUtils.uuid();
      },
      _initEx: function () {
        let oTbody = this.$el.querySelector("tbody");
        oTbody.addEventListener("scroll", (oEvent) => {
          this.offSetX = -oEvent.target.scrollLeft;
        });
        if (this.hasMergedRowOrColumn && this.titles[0].width.indexOf("%") > -1) {
          this.reCalculateTitleWidth();
        }
      },
      _destroy: function () {
        //移除事件
        document.body.removeEventListener("click", this._closeMultipleDropDownPanel);
        if (this.canDrag) {
          document.body.removeEventListener("mousemove", this.oWrapperFun);
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
          if (!this.supportMultiRowCheckOrRadioBox) {
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
          }
        });
        //初始化multipleDropdown面板关闭
        this._closeMultipleDropDownPanel();

        //计算需要显示的rows
        this._calcRows4Show();
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
          this.disabledIds.splice(0);
        }
      },
      reCalculateTitleWidth() {
        let iTotalWidth = $(this.$refs.lmm).width();
        for (var i = 0; i < this.titles.length; i++) {
          var oTitle = this.titles[i];
          var iPercent = Number(oTitle.width.split("%")[0]);
          oTitle.width = iTotalWidth * iPercent / 100 + "px";
        }
      },
      getDivWidth: function (oTitle) {
        if (this.hasMergedRowOrColumn) {
          if (oTitle.width.indexOf("%") > -1) {
            this.$nextTick(() => {
              let iTotalWidth = $(this.$refs.lmm).width();
              var iPercent = Number(oTitle.width.split("%")[0]);
              oTitle.width = iTotalWidth * iPercent / 100 + "px";
            });
          }
          return {
            width: Number(oTitle.width.split('px')[0]) - 17 + 'px'
          }
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
      _generateIdentityId(oRow, title) {
        let strId = this.gridId + "-" + this.getCellValueByKey('id', oRow) + "-" + title.key;
        return strId;
      },
      //endregion

      //region title
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
        //event
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
      //endregion
      //#region row

      getCellValueByKey(strKeyValue, oRow) {
        let oCell = this._getCell(strKeyValue, oRow);
        if (oCell) {
          return oCell.value;
        }
      },
      getCellValueByKeyEx(strKeyValue, oRow) {
        var arrItems = [];
        let oCell = this._getCell(strKeyValue, oRow);
        if (oCell) {
          var arrValues = oCell.value;
          if (arrValues == undefined) {
            arrValues = [];
          }
          for (var i = 0; i < arrValues.length; i++) {
            var oItem = {
              label: arrValues[i].value,
              icon: arrValues[i].icon
            }
            if (arrValues[i].selected) {
              oItem.active = true;
            }
            arrItems.push(oItem);
          }
        }
        return arrItems;
      },
      getDropDownwidth: function (oTitle) {
        if (oTitle.width.indexOf("%") > -1) {
          let iTotalWidth = $(this.$refs.lmm).width();
          var iPercent = Number(oTitle.width.split("%")[0]);
          return (iTotalWidth * iPercent / 100 - 20) + "px";
        } else {
          return "calc(" + oTitle.width + "-20px)";
        }
      },
      getCellValueStyleByKey: function (strKeyValue, oRow) {
        let oCell = this._getCell(strKeyValue, oRow);
        if (oCell) {
          return oCell.style;
        }
      },
      getTdColspan(strKeyValue, oRow) {
        let oCell = this._getCell(strKeyValue, oRow);
        if (oCell && (undefined != oCell.colspan)) {
          return oCell.colspan;
        } else {
          return 1;
        }
      },
      getTdRowspan(strKeyValue, oRow) {
        let oCell = this._getCell(strKeyValue, oRow)
        if (oCell && (undefined != oCell.rowspan)) {
          return oCell.rowspan;
        } else {
          return 1;
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
      //设置表格行的样式
      getTrStyle(oRow) {
        let arrClass = [""];
        let strId = this.getCellValueByKey("id", oRow);
        if (this.activeIds.indexOf(strId) > -1) {
          arrClass.push("activeColor");
        }
        if (this.disabledIds.indexOf(strId) > -1) {
          arrClass.push("disabledColor");
        }
        if (this.warnIds.indexOf(strId) > -1) {
          arrClass.push("warnColor");
        }
        if (!this.hasMergedRowOrColumn) {
          arrClass.push("mergeStyle");
        }
        return arrClass;
      },
      //设置表格一列的样式
      getTdStyle(oTitle, oRow) {
        let oStyle = {
          width: oTitle.width
        };
        let oCell = this._getCell(oTitle.key, oRow);
        let strBgColor = "";
        oCell && (strBgColor = oCell.bgColor);
        strBgColor && (oStyle["background-color"] = strBgColor);
        if (oCell && oCell.config && oCell.config.color) {
          oStyle["color"] = oCell.config.color;
        }
        return oStyle;
      },
      //表格单元格类型
      getCellType(oTitle, oRow) {
        let oCell = this._getCell(oTitle.key, oRow);
        return oCell.type;
      },
      //设置合并行的表头偏移
      _calcMergeHeaderLeft(iStaticLeft) {
        return iStaticLeft + this.offSetX;
      },
      //设置表格body的高度样式
      _calcTbodyHeight() {
        if (this.showParentTitles) {
          return "calc(100% - 82px)";
        } else {
          return "calc(100% - 42px)";
        }
      },
      //表格是否支持嵌套
      useDetailRow(oRow) {
        return this.detailRowComponent !== "";
      },
      hideDetailRow(oRow) {
        let strRowId = this.getCellValueByKey("id", oRow);
        let index = this.hideDetailRowIds.indexOf(strRowId);
        if (index != -1) {
          return true;
        } else {
          return false;
        }
      },
      hideDetailRowByIds(arrRowIds) {
        //cache
        for (var i = 0; i < arrRowIds.length; i++) {
          let index = this.hideDetailRowIds.indexOf(arrRowIds[i]);
          if (index == -1) {
            this.hideDetailRowIds.push(arrRowIds[i]);
          }
        }
      },
      clearHideDetailRows: function () {
        this.hideDetailRowIds = [];
      },
      clearExpandRowIds: function () {
        this.expandRowIds = [];
      },
      //获取表格嵌套的组件实例
      getDetailRowRef(oRow) {
        let strRowId = this.getCellValueByKey("id", oRow);
        return "detailRow_" + strRowId;
      },
      //设置表格嵌套行的展开和折叠样式
      foldOrUnFold(oRow) {
        var isHide = this.hideDetailRow(oRow);
        if (isHide) {
          return "";
        }

        let id = this.getCellValueByKey("id", oRow);
        let index = this.expandRowIds.indexOf(id);
        return index > -1 ? "icon-marvelIcon-64" : "icon-marvelIcon-65"
      },
      //展开或折叠表格行
      onClickFoldOrUnFold(oRow) {
        var isHide = this.hideDetailRow(oRow);
        if (isHide) {
          return "";
        }

        let id = this.getCellValueByKey("id", oRow);
        let index = this.expandRowIds.indexOf(id);
        if (index > -1) {
          this.expandRowIds.splice(index, 1);
          //从展开到折叠
          this.callback4OnClickFoldOrUnFold(oRow, false);
        } else {
          this.expandRowIds.push(id);
          //从折叠到展开
          this.callback4OnClickFoldOrUnFold(oRow, true);
        }
      },
      //嵌套的表格内容是否展开
      isDeatilRowVisible(oRow) {
        let id = this.getCellValueByKey("id", oRow);
        let index = this.expandRowIds.indexOf(id);
        return index > -1;
      },
      //表格行check事件
      onRowCheckboxChange(oRow, oEvent, oTitle) {
        let isChecked = oEvent.target.checked;
        let strId = this.getCellValueByKey("id", oRow);
        let index = this.selectRowIds.indexOf(strId);
        //只有当支持一行有多个选择按钮时，才有意义
        if (!this.supportMultiRowCheckOrRadioBox) {
          if (isChecked) {
            if (index == -1) {
              this.selectRowIds.push(strId);
            }
          } else {
            if (index > -1) {
              this.selectRowIds.splice(index, 1);
            }
          }
        }
        //update selected prop
        let oCell = this._getCell(oTitle.key, oRow);
        oCell.checked = isChecked;
        //event
        this.callback4OnRowCheckOrUnCheck(oRow, isChecked);
      },
      //表格行是否选中
      rowCheckboxChecked(oRow, oTitle) {
        if (!this.supportMultiRowCheckOrRadioBox) {
          let strId = this.getCellValueByKey("id", oRow);
          return this.selectRowIds.indexOf(strId) > -1;
        } else {
          let oCell = this._getCell(oTitle.key, oRow);
          return oCell.checked;
        }
      },
      rowRadioboxChecked(oRow, oTitle) {
        let oCell = this._getCell(oTitle.key, oRow);
        return oCell.checked;
      },
      //表格行是否使用
      formBoxDisabled(oRow) {
        let strId = this.getCellValueByKey("id", oRow);
        let index = this.disabledIds.indexOf(strId);
        return index > -1 ? true : false;
      },
      formBoxItemDisabled(oRow, oTitle) {
        let oCell = this._getCell(oTitle.key, oRow);
        if (undefined != oCell.disabled) {
          return oCell.disabled;
        } else {
          return false;
        }
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
      //radiobox change事件
      onRowRadioboxChange(oRow, oEvent, strCellkey) { //该函数在改行的radio被勾选的时候触发
        let strId = this.getCellValueByKey("id", oRow);

        //update selected prop
        if (this.supportMultiRowCheckOrRadioBox) {
          let oCell = this._getCell(strCellkey, oRow);
          oCell.checked = !oCell.checked;
        } else {
          this.rows.forEach((oRowEx) => {
            let strIdEx = this.getCellValueByKey("id", oRowEx);
            let oCell = this._getCell(strCellkey, oRowEx);
            if (strIdEx === strId) {
              oCell.checked = true;
            } else {
              oCell.checked = false;
            }
          });
        }
        //event
        this.callback4OnRowRadioCheck(oRow, strCellkey);
      },
      //表格单元格点击事件
      onClickTextCell(strKey, oRow) {
        let oCell = this._getCell(strKey, oRow);
        this.callback4OnClickTextCell(oRow, oCell);
      },
      //表格单元格为icon的点击事件
      onIconClick(strKeyValue, oRow, oIcon) {
        let oCell = this._getCell(strKeyValue, oRow);
        this.callback4OnIconClick(oRow, oCell, oIcon);
      },
      //单元格编辑完成事件
      editRowFinished(strKeyVal, oRow, oEvent) {
        let oCell = this._getCell(strKeyVal, oRow);
        let oOldVal = oCell.value;
        let oNewVal = oEvent.target.value;
        if (this.editCellFinished) {
          this.editCellFinished(oRow, oCell, oOldVal, oNewVal, () => {
            oCell.value = oNewVal; //外界对值进行校验，校验通过调用该回调
          }, () => {
            if (undefined == oOldVal) {
              oOldVal = '';
            }
            oEvent.target.value = oOldVal;//校验不通过调用该回调
          });
        }
      },
      //单元格是否使能
      dropDownCellDisabled(strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        return oCell.disabled;
      },
      //单元格下拉框change事件
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
      onOptionChangeEx: function (args, strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        let oValue = oCell.value;
        let strNewValue = args[0].label;
        let strOldOption = [];
        oValue.forEach((oItem) => {
          if (oItem.selected === true) {
            strOldOption = oItem;
          }
          if (oItem.value == strNewValue) {
            this.$set(oItem, "selected", true);
          } else {
            this.$set(oItem, "selected", false);
          }
        });
        this.callback4OnOptionChange(oRow, oCell, strOldOption.value, strNewValue);
      },
      onClickTextIcon(strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        this.callback4OnClickTextIcon(oRow, oCell);
      },
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
      //switch类型的单元格点击事件
      onClickSwitch(strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        this.$set(oCell, "value", !oCell.value);
        this.callback4OnClickSwitch(oRow, oCell);
      },
      //图片类型的单元格点击事件
      onClickImg(strKeyVal, oRow) {
        let oCell = this._getCell(strKeyVal, oRow);
        this.callback4OnClickImg(oRow, oCell);
      },
      //重置当前分页的index
      _resetCurPage() {
        if (this.hasFoot && !this.dynamicPaging) {
          this.$refs.ref4Paging.resetCurPageIndex();
        }
      },
      //分页切换事件
      onPageChange(iPage, perPageNum) {
        if (this.dynamicPaging) {
          this.callback4OnPageChange(iPage, perPageNum);
        } else {
          this.curPageIndex = iPage;
        }
      },
      //每页显示多少行数据切换事件
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

      //#endregion

      //#region callback

      callback4OnClickRow: function (oRow) {
        this.$emit("onClickRow", oRow);
      },
      callback4OnDblclickRow: function (oRow) {
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
      callback4OnRowRadioCheck: function (oRow, strCellKey) {
        this.$emit("onRowRadioCheck", oRow, strCellKey);
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
      //清空行选中样式
      removeRowColor(strRowId) {
        let index = this.activeIds.indexOf(strRowId);
        if (index > -1) {
          this.activeIds.splice(index, 1);
        }
      },
      //当为checkbox时，获取所有的选中数据
      getSelectRows4Checkbox() {
        let arrSelectRows = this.rows.filter((oRow) => {
          let oCell = this._getCell("checkBox", oRow);
          return oCell.checked === true && oCell.disabled !== true;
        });
        return arrSelectRows;
      },
      //当为radiobox时， 获取选中的数据
      getSelectRow4Radiobox() {
        let arrSelectRows = this.rows.filter((oRow) => {
          let oCell = this._getCell("radioBox", oRow);
          return oCell.checked === true && oCell.disabled !== true;
        });
        if (arrSelectRows.length) {
          return arrSelectRows[0];
        }
      },
      //获取所有的数据行
      getRows() {
        return this.rows;
      },
      //删除指定的数据行
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
      //获取激活的数据行
      getActiveRows() {
        let arrRow = this.rows.filter((oRow) => {
          let strId = this.getCellValueByKey("id", oRow);
          let index = this.activeIds.indexOf(strId);
          return index > -1;
        });
        return arrRow;
      },
      //去使能指定的数据行
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
      //使能指定的数据行
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
      warnRowByIds(arrRowIds) {
        //cache
        for (var i = 0; i < arrRowIds.length; i++) {
          let index = this.warnIds.indexOf(arrRowIds[i]);
          if (index == -1) {
            this.warnIds.push(arrRowIds[i]);
          }
        }
      },
      clearAllRowIds: function () {
        this.warnIds = [];
      },
      removeRowIds: function (arrRowIds) {
        for (var i = 0; i < arrRowIds.length; i++) {
          let index = this.warnIds.indexOf(arrRowIds[i]);
          if (index != -1) {
            this.warnIds.splice(index, 1);
          }
        }
      },
      //使能所有的数据行
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
      //选中或者去选中指定的行
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
      //选中或者去选中指定的行
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
      //去使能指定的单元格
      disabledDropDownCell(strRowId, strKey, bDisabled) {
        let oRow = this.getRowById(strRowId);
        let oCell = this._getCell(strKey, oRow);
        this.$set(oCell, "disabled", bDisabled);
      },
      //获取所有展开的数据行
      getUnFoldRowIds() {
        return this.expandRowIds;
      },
      //展开指定的数据行
      foldRows(arrRowIds) {
        arrRowIds.forEach((rowId) => {
          let index = this.expandRowIds.indexOf(rowId);
          if (index > -1) {
            this.expandRowIds.splice(index, 1);
          }
        });
      },
      //折叠指定的数据行
      unFoldRows(arrRowIds) {
        arrRowIds.forEach((rowId) => {
          let index = this.expandRowIds.indexOf(rowId);
          if (index === -1) {
            this.expandRowIds.push(rowId);
          }
        })
      },
      //设置当前的页码
      setCurPage(iPage) {
        this.$refs.ref4Paging.setCurPage(iPage);
      },
      //获取当前页的数据
      getCurPageData() {
        return this.rowsInPage;
      },

      //#endregion
    },
    watch: {
      rows: {
        handler(oNewRows, oOldRows) {
          this._preHandleRowData();
        },
        deep: true
      },
      curPageIndex(iNewVal, iOldVal) {
        this._calcRows4Show();
      },
      unFoldRowIds: {
        handler() {
          for (var i = 0; i < this.unFoldRowIds.length; i++) {
            var iIndex = this.expandRowIds.indexOf(this.unFoldRowIds[i]);
            if (iIndex == -1) {
              this.expandRowIds.push(this.unFoldRowIds[i]);
            }
          }
        },
        deep: false
      },
    },
  }
</script>

<style scoped>

  .gridWrapper {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    box-sizing: border-box;
  }

  .gridWrapper .grid {
    height: calc(100% - 32px);
    width: 100%;
    position: relative;
    overflow: auto;
  }

  .gridWrapper .empty {
    background: url("../../../../../static/walle/common/emptyTip2.png") no-repeat center;
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

  table {
    position: relative;
  }

  table thead, tbody div tr {
    width: 100%;
    table-layout: fixed;
  }

  .mergeStyle {
    display: table;
  }

  .gridContWrapper {
    display: inline-block;
  }

  table thead .gridTitle {
    line-height: 35px;
  }

  table thead .gridTitle .titleLable {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  table thead .gridTitle .parentTitles {
    text-align: center;
  }

  table thead .canClick:hover {
    cursor: pointer;
    color: #3399ff;
  }

  table thead .column-search {
    float: right;
    line-height: 40px;
  }

  table thead .column-search:hover {
    cursor: pointer;
  }

  table thead tr {
    position: relative;
  }

  .search-dialog {
    position: fixed;
    z-index: 100000;
  }

  .gridWrapper .grid .mergeHeaders {
    position: absolute;
    height: 73px;
    z-index: 1;
    background: #ccc;
    text-align: center;
    line-height: 73px;
    background-color: #e1e4e5;
    border: 1px solid #fff;
  }

  .gridWrapper .grid .gridCont thead {
    padding-right: 8px;
    position: relative;
    box-sizing: border-box;
    width: calc(100% - 8px);
  }

  .thead4Merge {
    display: block;
    overflow-x: hidden;
  }

  .gridWrapper .grid .gridCont thead tr td {
    height: 35px;
    background-color: #e1e4e5;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333;
    padding: 0 8px;
    position: relative;
    border-bottom: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
    font-size: 15px;
    font-weight: normal;
    text-align: left;
  }

  .gridWrapper .grid .gridCont thead tr td:last-child:after {
    content: "";
    height: 40px;
    background-color: #e1e4e5;
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
    height: calc(100% - 42px);
    display: block;
    overflow-x: auto;
    overflow-y: scroll;
  }

  .gridWrapper .grid .gridCont tbody div tr td {
    color: #666;
    height: 30px;
    padding: 0 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-bottom: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
    font-size: 13px;
    vertical-align: middle;
  }

  .gridWrapper .grid .gridCont tbody div tr td select:disabled {
    background-color: #f0f0f0;
    color: #999999;
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
  }

  .gridWrapper .grid .gridCont tbody div tr .iconOnly:hover {
    color: #3399ff !important;
  }

  .gridWrapper .grid .gridCont tbody div tr .textIcon:hover {
    cursor: pointer;
    color: #3399ff !important;
  }

  .gridWrapper .grid .gridCont tbody div tr .textIcon .icon-label {
    text-decoration: underline;
    color: #3399ff;
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

  .gridWrapper .grid .gridCont tbody .warnColor {
    background-color: #FF0000 !important;
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
    transition: opacity .3s;
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
    font-size: 14px;
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

  ::-webkit-scrollbar-corner {
    background-color: #f0f0f0;
  }

  /*input end*/
  /*sl end*/
</style>
