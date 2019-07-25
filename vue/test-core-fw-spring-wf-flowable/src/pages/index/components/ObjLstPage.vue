<template>
  <div class="objListPageWrapper">
    <div class="topArea">
      <div class="title4objListPageWrapper">XXX列表</div>
      <marvel-button v-show="tabItems[0].isActive" ref="objLstPageCreateBtn" label="新建" classCustom="classCustom4Btn"
                     v-on:onClick="_onClickToCreate"></marvel-button>
    </div>
    <div class="bottomArea">
      <marvel-tab :tabItems="tabItems" :hideBorder="true">
        <marvel-tab-item :isActive="tabItems[0].isActive" style="padding: 10px;box-sizing: border-box;">
          <marvel-grid-ex ref="objLstGrid"
                          gridId="objLstGrid"
                          :titles="title4objLst"
                          :rows="row4objLst"
                          :dynamicPaging="true"
                          :totalNum = "totalNum"
                          :totalPage = "totalPage"
                          :canDrag="true"
                          :hasFoot="true"
                          v-on:onIconClick="_onIconClick"
                          v-on:onPageChange = "_onPageChange"></marvel-grid-ex>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems[1].isActive"  style="padding: 10px;box-sizing: border-box;">
          <marvel-grid-ex ref="objLstGridFinish"
                          gridId="objLstGridFinish"
                          :titles="title4objLst"
                          :rows="row4objLstFinished"
                          :dynamicPaging="true"
                          :totalNum = "totalNumFinished"
                          :totalPage = "totalPageFinished"
                          :canDrag="true"
                          :hasFoot="true"
                          v-on:onIconClick="_onIconClick"
                          v-on:onPageChange = "_onPageChange4Finished"></marvel-grid-ex>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <obj-lst-create-dialog ref="objLstCreateDialog" @onCreate="_onCreate"></obj-lst-create-dialog>
  </div>
</template>

<script>
  import MarvelButton from '~~/widget/button/MarvelButton';
  import MarvelTab from '~~/widget/tab/MarvelTab';
  import MarvelTabItem from '~~/widget/tab/MarvelTabItem';
  import MarvelGridEx from '~~/widget/grid/MarvelGridEx';
  import HttpUtils from "./0.common/httpUtil/httpUtils";
  import MockUtils from "./0.common/mock";
  import ObjLstCreateDialog from "./ObjLstCreateDialog";

  /**
   * ObjLstPage component description
   * @vuedoc
   * @exports ObjLstPage
   */
  export default {
    name: 'ObjLstPage',
    components: {
      ObjLstCreateDialog,
      MarvelButton,
      MarvelGridEx,
      MarvelTab,
      MarvelTabItem
    },
    data() {
      return {
        //#region const
        debug: true,
        //#endregion
        //#region tab
        tabItems:[{
          label:"执行中",
          isActive:true
        },{
          label:"执行完毕",
          isActive:false
        }],
        //#endregion
        //#region grid
        title4objLst:[{
          label:"序号",
          key:"id",
          type:"text",
          visible:true,
          width:"8%"
        },{
          label:"Lst1",
          key:"nodeName",
          type:"text",
          visible:true,
          width:"20%"
        },{
          label:"Lst2",
          key:"LSRIDBefore",
          type:"text",
          visible:true,
          width:"20%"
        },{
          label:"Lst3",
          key:"tergetLSRID",
          type:"text",
          visible:true,
          width:"20%"
        },{
          label:"Lst4",
          key:"nodeType",
          type:"text",
          visible:true,
          width:"20%"
        },{
          label:"创建时间",
          key:"createTime",
          type:"text",
          visible:true,
          width:"20%"
        },{
          label:"执行时间",
          key:"executionTime",
          type:"text",
          visible:true,
          width:"20%"
        },{
          label:"执行状态",
          key:"executionStatus",
          type:"text",
          visible:true,
          width:"20%"
        },{
          label:"创建人",
          key:"userName",
          type:"text",
          visible:true,
          width:"20%"
        },{
          label:"操作",
          key:"operation",
          type:"icon",
          visible:true,
          width:"10%"
        }],
        row4objLst:[],
        totalNum:0,
        totalPage:1,
        limit:26,
        currentPage:1,

        row4objLstFinished:[],
        totalNumFinished:0,
        totalPageFinished:1,
        limitFinished:26,
        currentPageFinished:1
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

        //get wf
        this._getWfModel(function (oRes) {
          self._setWfModel(oRes);
        });

        this._getWfModelFinished(function (oRes) {
          self._setWfModelFinished(oRes);
        });
      },

      //#endregion

      //#region grid

      _getWfModel: function (oAfterCallback) {
        var oRes = undefined;
        var oParams = {
          skip: (this.currentPage - 1) * this.limit,
          rowsNum: this.limit,
        };
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          oRes = MockUtils.mock4GetObjLst(this.currentPage, this.limit).resultObj;
        } else {
          HttpUtils.post("getNodeLst", reqBody).then(res => {
            oRes = res.data.resultObj;
          });
        }

        oAfterCallback(oRes);
      },
      _setWfModel: function (oRes) {
        this.row4objLst = oRes.arrRows;
        this.totalNum = oRes.totalNum;
        this.totalPage = oRes.totalPage
      },

      _getWfModelFinished: function (oAfterCallback) {
        var oRes = undefined;
        var oParams = {
          skip: (this.currentPageFinished - 1) * this.limitFinished,
          rowsNum: this.limitFinished,
        };
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          oRes = MockUtils.mock4GetObjLst(this.currentPageFinished, this.limitFinished).resultObj;
        } else {
          HttpUtils.post("getNodeLstFinished", reqBody).then(res => {
            oRes = res.data.resultObj;
          });
        }

        oAfterCallback(oRes);
      },
      _setWfModelFinished: function (oRes) {
        this.row4objLstFinished = oRes.arrRows;
        this.totalNumFinished = oRes.totalNum;
        this.totalPageFinished = oRes.totalPage
      },

      //#endregion

      //#region create

      _onClickToCreate: function () {
        this.$refs.objLstCreateDialog.toShowDialog();
      },
      _onCreate: function (oOption) {
        var oParams = oOption;
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          console.log(oOption)
        } else {
          HttpUtils.post("addNode", reqBody).then(res => {
            oRes = res.data.resultObj;
          });
        }
      },
      _onPageChange: function (iPageIndex, perPageNum) {
        var self = this;
        this.currentPage = iPageIndex;
        //get wf
        this._getWfModel(function (oRes) {
          self._setWfModel(oRes);
        });
      },
      _onPageChange4Finished: function (iPageIndex, perPageNum) {
        var self = this;
        this.currentPageFinished = iPageIndex;
        //get wf
        this._getWfModelFinished(function (oRes) {
          self._setWfModelFinished(oRes);
        });
      },
      _onIconClick: function (oRow) {
        var oCell = this._getRowCellByKey(oRow, "nodeName");
        var oParams = {
          nodeName:oCell.value
        };
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          console.log(oCell.value);
          window.location.href="http://localhost:8080/page1.html#/";
        } else {
          HttpUtils.post("checkDetails4Node", reqBody).then(res => {

          });
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
      }


      //#endregion

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd
      //#endregion
    }
  }
</script>

<style scoped>

  .objListPageWrapper{
    width: 100%;
    height: 100%;
  }

  .topArea{
    height: 50px;
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
  }

  .title4objListPageWrapper{
    line-height: 32px;
    font-size: 18px;
    color: #4d4d4d;
    font-weight: bolder;
    float: left;
  }

  .classCustom4Btn{
    float: right;
  }

  .bottomArea{
    height: calc(100% - 50px);
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }

</style>
