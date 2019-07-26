<template>
  <div class="workFlowWrapper">
    <div class="topArea">
      <div class="title4objListPageWrapper">XXX列表</div>
      <slot name="btnArea"></slot>
      <marvel-button v-show="tabItems[0].isActive" ref="objLstPageCreateBtn2" label="批量创建" classCustom="classCustom4Btn"
                     v-on:onClick="callback4OnClickToBatchCreate"></marvel-button>
      <marvel-button v-show="tabItems[0].isActive" ref="objLstPageCreateBtn1" label="新建" classCustom="classCustom4Btn"
                     v-on:onClick="callback4OnClickToCreate"></marvel-button>
    </div>
    <div class="bottomArea">
      <marvel-tab :tabItems="tabItems" :hideBorder="true">
        <marvel-tab-item :isActive="tabItems[0].isActive" style="padding: 10px;box-sizing: border-box;">
          <marvel-grid-ex ref="objLstGrid"
                          gridId="objLstGrid"
                          :titles="title4objLstInner"
                          :rows="row4objLstInner"
                          :dynamicPaging="true"
                          :totalNum="totalNum"
                          :totalPage="totalPage"
                          :canDrag="true"
                          :hasFoot="true"
                          v-on:onIconClick="_onIconClick"
                          v-on:onPageChange="callback4OnPageChange"></marvel-grid-ex>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems[1].isActive" style="padding: 10px;box-sizing: border-box;">
          <marvel-grid-ex ref="objLstGridFinish"
                          gridId="objLstGridFinish"
                          :titles="title4objLstInner"
                          :rows="row4objLstFinishedInner"
                          :dynamicPaging="true"
                          :totalNum="totalNumFinished"
                          :totalPage="totalPageFinished"
                          :canDrag="true"
                          :hasFoot="true"
                          v-on:onIconClick="_onIconClickFinished"
                          v-on:onPageChange="callback4OnPageChange4Finished"></marvel-grid-ex>
        </marvel-tab-item>
      </marvel-tab>
    </div>
  </div>
</template>

<script>
  import MarvelButton from '../../widget/button/MarvelButton';
  import MarvelTab from '../../widget/tab/MarvelTab';
  import MarvelTabItem from '../../widget/tab/MarvelTabItem';
  import MarvelGridEx from '../../widget/grid/MarvelGridEx';

  /**
   *  MarvelWorkFlow widget description
   *  @vuedoc
   *  @exports MarvelWorkFlow
   */
  export default {
    name: 'MarvelWorkFlowObjLst',
    components: {
      MarvelButton,
      MarvelGridEx,
      MarvelTab,
      MarvelTabItem
    },
    props: {
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
      },
      title4objLstFinished: {
        type: Array,
        default: undefined,
        required: true,
      },
      row4objLstFinished: {
        type: Array,
        default: undefined,
        required: true,
      },
      totalNumFinished: {
        type: Number,
        default: 0,
        required: false,
      },
      totalPageFinished: {
        type: Number,
        default: 1,
        required: false,
      },
      limitFinished: {
        type: Number,
        default: 26,
        required: false,
      },
    },
    data: function () {
      return {
        //#region tab
        tabItems: [{
          label: "执行中",
          isActive: true
        }, {
          label: "执行完毕",
          isActive: false
        }],
        //#endregion
        //#region grid
        title4objLstInner: [],
        row4objLstInner: [],
        currentPage: 1,

        title4objLstFinishedInner: [],
        row4objLstFinishedInner: [],
        currentPageFinished: 1
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
        this._genTitles4UnFinishedGrid();
        this._genRows4UnFinishedGrid();
        this._genTitles4FinishedGrid();
        this._genRows4FinishedGrid();
      },

      //#endregion

      _genTitles4UnFinishedGrid: function () {
        var arrTitles = JSON.parse(JSON.stringify(this.title4objLst));
        this.title4objLstInner = this._genTitles(arrTitles);
      },
      _genRows4UnFinishedGrid: function () {
        var arrRows = JSON.parse(JSON.stringify(this.row4objLst));
        this.row4objLstInner = this._genRows(arrRows);
      },
      _genTitles4FinishedGrid: function () {
        var arrTitles = JSON.parse(JSON.stringify(this.title4objLstFinished));
        this.title4objLstFinishedInner = this._genTitles(arrTitles);
      },
      _genRows4FinishedGrid: function () {
        var arrRows = JSON.parse(JSON.stringify(this.row4objLst));
        this.row4objLstFinishedInner = this._genRows(arrRows);
      },

      _genTitles: function (arrTitles) {
        var oCheckTitle = [{
          label: "",
          key: "checkBox",
          type: "checkBox",
          visible: true,
          width: "8%"
        }];
        var oOptionTitle = [{
          label: "操作",
          key: "operation",
          type: "icon",
          visible: true,
          width: "10%"
        }];
        var arrNewTitleV1 = oCheckTitle.concat(arrTitles);
        var arrNewTitleV2 = arrNewTitleV1.concat(oOptionTitle);

        return arrNewTitleV2;
      },
      _genRows: function (arrRows) {
        var oCheckRowCell = {
          key: "checkBox",
          value: "",
          checked: false,
          disabled: false,
        };
        var oOptionRowCell = {
          key: "operation",
          value: [{
            value: "icon-wrench",
            color: "#3399ff",
            title: "查看"
          }, {
            value: "icon-bin",
            color: "#3399ff",
            title: "删除"
          }],
        };

        for (var i = 0; i < arrRows.length; i++) {
          arrRows[i].unshift(oCheckRowCell);
          arrRows[i].push(oOptionRowCell);
        }
        return arrRows;
      },
      _onIconClick: function (oRow, oCell, oIcon) {
        if(oIcon.value == "icon-wrench"){
          this.callback4OnIconClick4View(oRow);
        }else if(oIcon.value == "icon-bin"){
          this.callback4OnIconClick4Delete(oRow);
        }
      },
      _onIconClickFinished: function (oRow, oCell, oIcon) {
        if(oIcon.value == "icon-wrench"){
          this.callback4OnIconClick4ViewFinished(oRow);
        }else if(oIcon.value == "icon-bin"){
          this.callback4OnIconClick4DeleteFinished(oRow);
        }
      },
      _getRowCellByKey: function (oRow, strKey) {
        var targetCell = undefined;
        for(var i = 0; i< oRow.length; i++){
          var oCell = oRow[i];
          if(strKey == oCell.key){
            targetCell = oCell;
            break;
          }else{
            continue;
          }
        }
        return targetCell;
      },

      //#endregion
      //#region callback

      callback4OnClickToCreate: function () {
        this.$emit("onClickToCreate");
      },
      callback4OnClickToBatchCreate: function () {
        this.$emit("onClickToBatchCreate");
      },
      callback4OnPageChange: function (iPageIndex, perPageNum) {
        this.$emit("onPageChange", iPageIndex, perPageNum);
      },
      callback4OnPageChange4Finished: function (iPageIndex, perPageNum) {
        this.$emit("onPageChange4Finished", iPageIndex, perPageNum);
      },
      callback4OnIconClick4Delete: function (oRow) {
        this.$emit("onIconClick4Delete", oRow);
      },
      callback4OnIconClick4View: function (oRow) {
        this.$emit("onIconClick4View", oRow);
      },
      callback4OnIconClick4DeleteFinished: function (oRow) {
        this.$emit("onIconClick4DeleteFinished", oRow);
      },
      callback4OnIconClick4ViewFinished: function (oRow) {
        this.$emit("onIconClick4ViewFinished", oRow);
      },

      //#endregion
      //#region 3rd

      //#endregion
    },
    watch: {
      title4objLst: {
        handler: function () {
          this._genTitles4UnFinishedGrid();
        },
        deep: true
      },
      row4objLst: {
        handler: function () {
          this._genRows4UnFinishedGrid();
        },
        deep: true
      },
      title4objLstFinished: {
        handler: function () {
          this._genTitles4FinishedGrid();
        },
        deep: true
      },
      row4objLstFinished: {
        handler: function () {
          this._genRows4FinishedGrid();
        },
        deep: true
      },

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
    height: 50px;
    padding: 10px 20px 0 20px;
    box-sizing: border-box;
  }

  .title4objListPageWrapper {
    line-height: 32px;
    font-size: 18px;
    color: #4d4d4d;
    font-weight: bolder;
    float: left;
  }

  .classCustom4Btn {
    float: right;
    margin-left: 20px;
  }

  .bottomArea {
    height: calc(100% - 50px);
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
