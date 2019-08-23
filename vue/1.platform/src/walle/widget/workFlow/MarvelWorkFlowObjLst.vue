<template>
  <div class="workFlowWrapper">
    <div class="topArea">
      <div class="title4objListPageWrapper">{{title}}</div>
      <div class="btnAreaWrapper">
        <slot name="btnArea"></slot>
        <marvel-button :ref="'objLstPageCreateBtn3' + componentId" label="批量删除" classCustom="classCustom4Btn"
                       v-on:onClick="callback4OnClickToBatchDelete"></marvel-button>
        <marvel-button :ref="'objLstPageCreateBtn2' + componentId" label="批量创建" classCustom="classCustom4Btn"
                       v-on:onClick="callback4OnClickToBatchCreate"></marvel-button>
        <marvel-button :ref="'objLstPageCreateBtn1' + componentId" label="创建" classCustom="classCustom4Btn"
                       v-on:onClick="callback4OnClickToCreate"></marvel-button>
      </div>
      <div class="searchArea4objList">
        <marvel-search-with-drop-down @search="callback4OnSearch" width="120px"
                                      :selectItems="searchSelectItems"></marvel-search-with-drop-down>
      </div>
    </div>
    <div class="bottomArea">
      <marvel-grid-ex :ref="'objLstGrid' + componentId"
                      :gridId="'objLstGrid' + componentId"
                      :titles="title4objLstInner"
                      :rows="row4objLstInner"
                      :limit="limit"
                      :dynamicPaging="true"
                      :totalNum="totalNum"
                      :totalPage="totalPage"
                      :canDrag="true"
                      :hasFoot="true"
                      :sortRowsFunc="_sortRowsFunc"
                      v-on:onTitleCheckOrUncheck="_onTitleCheckOrUncheck"
                      v-on:onRowCheckOrUnCheck="_onRowCheckOrUnCheck"
                      v-on:onIconClick="_onIconClick"
                      v-on:onPageChange="callback4OnPageChange"></marvel-grid-ex>
    </div>
  </div>
</template>

<script>
  import MarvelButton from '../../widget/button/MarvelButton';
  import MarvelGridEx from '../../widget/grid/MarvelGridEx';
  import MarvelSearchWithDropDown from "../search/MarvelSearchWithDropDown";
  import StrUtils from "../../component/str";

  /**
   *  MarvelWorkFlow widget description
   *  @vuedoc
   *  @exports MarvelWorkFlow
   */
  export default {
    name: 'MarvelWorkFlowObjLst',
    components: {
      MarvelSearchWithDropDown,
      MarvelButton,
      MarvelGridEx
    },
    props: {
      title: {
        type: String,
        default: "TITLE",
        required: false,
      },
      title4objLst: {
        type: Array,
        default: undefined,
        required: true,
      },
      row4objLst: {
        type: Array,
        default: undefined,
        required: true,
      },
      rowOriginData: {
        type: Array,
        default: undefined,
        required: true,
      },
      totalNum: {
        type: Number,
        default: 0,
        required: false,
      },
      totalPage: {
        type: Number,
        default: 1,
        required: false,
      },
      limit: {
        type: Number,
        default: 26,
        required: false,
      }
    },
    data: function () {
      return {
        //#region grid
        searchSelectItems: [],
        title4objLstInner: [],
        row4objLstInner: [],
        arrSelectRows:[],
        isSelectAll:false,
        componentId:'',
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
        var self = this;
        this.componentId = StrUtils.uuid();
        this.$nextTick(function () {
          self._genTitles4Grid(function () {
            self._genSearchData();
          });
          self._genRows4Grid();
        });
      },

      //#endregion

      _genSearchData: function () {
        var arrSearchItem = [];
        for (var i = 0; i < this.title4objLst.length; i++) {
          var oTitle = this.title4objLst[i];
          if (oTitle.canSearch) {
            arrSearchItem.push({
              label: oTitle.label,
              key:oTitle.key
            })
          }
        }
        arrSearchItem[0].selected = true;
        this.searchSelectItems = JSON.parse(JSON.stringify(arrSearchItem));
      },
      _genTitles4Grid: function (oAfterCallback) {
        var arrTitles = JSON.parse(JSON.stringify(this.title4objLst));
        this.title4objLstInner = this._genTitles(arrTitles);
        oAfterCallback();
      },
      _genTitles: function (arrTitles) {
        var oCheckTitle = [{
          label: "",
          key: "checkBox",
          type: "checkBox",
          visible: true,
          width: "36px"
        }, {
          label: "",
          key: "id",
          type: "text",
          visible: false,
          width: "36px"
        }, {
          label: "",
          key: "idRef",
          type: "text",
          visible: false,
          width: "36px"
        }, {
          label: "curTaskId4UIWf",
          key: "curTaskId",
          type: "text",
          visible: false,
          width: "36px"
        }];
        var oOptionTitle = [{
          label: "开始时间",
          key: "startTime",
          type: "text",
          visible: true,
          width: "160px"
        }, {
          label: "结束时间",
          key: "endTime",
          type: "text",
          visible: true,
          width: "160px"
        }, {
          label: "创建人",
          key: "userId",
          type: "text",
          visible: true,
          width: "80px"
        }, {
          label: "操作",
          key: "operation",
          type: "icon",
          visible: true,
          width: "120px"
        }];
        var arrNewTitleV1 = oCheckTitle.concat(arrTitles);
        var arrNewTitleV2 = arrNewTitleV1.concat(oOptionTitle);

        return arrNewTitleV2;
      },
      _genRows4Grid: function () {
        this.arrSelectRows = [];
        this.isSelectAll = false;
        var arrRows = JSON.parse(JSON.stringify(this.row4objLst));
        this.row4objLstInner = this._genRows(arrRows);
        this._updateBtnStatus();
      },
      _genRows: function (arrRows) {
        var oRes = this.rowOriginData;
        var bHasOperationAlready = false;
        for (var i = 0; i < arrRows.length; i++) {
          arrRows[i].push({
            key: "checkBox",
            value: "",
            checked: false,
            disabled: false,
          });
          arrRows[i].push({
            key: "id",
            value: StrUtils.uuid(),
          });
          arrRows[i].push({
            key: "idRef",
            value: oRes[i].id
          });
          arrRows[i].push({
            key: "curTaskId",
            value: oRes[i].curTaskId
          });
          arrRows[i].push({
            key: "startTime",
            value: oRes[i].startTime
          });
          arrRows[i].push({
            key: "endTime",
            value: oRes[i].endTime
          });
          arrRows[i].push({
            key: "userId",
            value: oRes[i].userId
          });

          //add custom operation icon
          for (var j = 0; j < arrRows[i].length; j++) {
            var oCell = arrRows[i][j];
            if (oCell.key == 'operation') {
              bHasOperationAlready = true;
              oCell.value.unshift({
                value: "icon-bin",
                color: "#3399ff",
                title: "删除"
              });
              oCell.value.unshift({
                value: "icon-enter",
                color: "#3399ff",
                title: "查看"
              });
            }
          }
          if (!bHasOperationAlready) {
            arrRows[i].push({
              key: "operation",
              value: [{
                value: "icon-enter",
                color: "#3399ff",
                title: "查看"
              }, {
                value: "icon-bin",
                color: "#3399ff",
                title: "删除"
              }],
            });
          }
        }
        return arrRows;
      },
      _onIconClick: function (oRow, oCell, oIcon) {
        if (oIcon.value == "icon-enter") {
          this.callback4OnIconClick4View(oRow);
        } else if (oIcon.value == "icon-bin") {
          this.callback4OnIconClick4Delete(oRow);
        } else {
          this.callback4OnCustomIconClick(oRow, oIcon.value);
        }
      },
      _getRowCellByKey: function (oRow, strKey) {
        var targetCell = undefined;
        for (var i = 0; i < oRow.length; i++) {
          var oCell = oRow[i];
          if (strKey == oCell.key) {
            targetCell = oCell;
            break;
          } else {
            continue;
          }
        }
        return targetCell;
      },
      _onRowCheckOrUnCheck: function (oRow, isCheck) {
        this.arrSelectRows = this.$refs['objLstGrid' + this.componentId].getSelectRows4Checkbox();
        this._updateBtnStatus();
        this.callback4OnRowCheckOrUnCheck(this.arrSelectRows, oRow, isCheck);
      },
      _onTitleCheckOrUncheck: function (isCheck) {
        this.isSelectAll = isCheck;
        this.arrSelectRows = this.$refs['objLstGrid' + this.componentId].getSelectRows4Checkbox();
        this._updateBtnStatus();
        this.callback4OnTitleCheckOrUncheck(this.arrSelectRows, isCheck);
      },
      _updateBtnStatus:function(){
        if(this.arrSelectRows.length>0 || this.isSelectAll){
          this.$refs['objLstPageCreateBtn3' + this.componentId].setBtnDisable(false);
        }else{
          this.$refs['objLstPageCreateBtn3' + this.componentId].setBtnDisable(true);
        }
      },
      _sortRowsFunc: function(strKey, order, rows){
        this.callback4OnSortRows(strKey, order, rows)
      },

      //#endregion
      //#region callback

      callback4OnClickToCreate: function () {
        this.$emit("onClickToCreate");
      },
      callback4OnClickToBatchCreate: function () {
        this.$emit("onClickToBatchCreate");
      },
      callback4OnClickToBatchDelete: function () {
        this.$emit("onClickToBatchDelete");
      },
      callback4OnSearch: function (strKey, strValue, oKeyObj) {
        this.$emit("onSearch", strKey, strValue, oKeyObj);
      },
      callback4OnPageChange: function (iPageIndex, perPageNum) {
        this.$emit("onPageChange", iPageIndex, perPageNum);
      },
      callback4OnIconClick4Delete: function (oRow) {
        this.$emit("onIconClick4Delete", oRow);
      },
      callback4OnCustomIconClick: function (oRow, oIcon) {
        this.$emit("onCustomIconClick", oRow, oIcon);
      },
      callback4OnIconClick4View: function (oRow) {
        this.$emit("onIconClick4View", oRow);
      },
      callback4OnRowCheckOrUnCheck: function (arrRows, oRow, isCheck) {
        this.$emit("onRowCheckOrUnCheck", arrRows, oRow, isCheck);
      },
      callback4OnTitleCheckOrUncheck: function (arrRows, isCheck) {
        this.$emit("onTitleCheckOrUncheck", arrRows, isCheck);
      },
      callback4OnSortRows: function (strKey, order, rows) {
        this.$emit("onSortRows", strKey, order, rows);
      },

      //#endregion
      //#region 3rd
      //#endregion
    },
    watch: {
      title4objLst: {
        handler: function () {
          this._genTitles4Grid(function () {

          });
        },
        deep: true
      },
      row4objLst: {
        handler: function () {
          this._genRows4Grid();
        },
        deep: true
      }
    },
  }
</script>

<style scoped>
  /*region basic*/

  * {
    font-family: "Microsoft YaHei", "arial", sans-serif;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .workFlowWrapper {
    width: 100%;
    height: 100%;
  }

  .topArea {
    height: 46px;
    padding: 7px 10px 0 10px;
    box-sizing: border-box;
  }

  .title4objListPageWrapper {
    line-height: 32px;
    font-size: 26px;
    color: #4d4d4d;
    font-weight: bolder;
    float: left;
  }

  .btnAreaWrapper {
    position: relative;
    top: 0px;
    float: left;
  }

  .searchArea4objList{
    width: 320px;
    float: right;
    margin-left: 20px;
  }

  .classCustom4Btn {
    float: right;
    margin-right: 20px;
  }

  .bottomArea {
    height: calc(100% - 46px);
    width: 100%;
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
  }
</style>
