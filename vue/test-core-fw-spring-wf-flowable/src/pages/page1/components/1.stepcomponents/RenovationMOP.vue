<template>
  <div class="componentWrapper">
    <div class="mopLeft">
      <marvel-grid-tree :hasFoot="false"
                        ref="ref4MarvelGridTree"
                        :titles="titles4GridTree"
                        :treeNodes="treeNodes"
                        :dynamicPaging="false"
                        :isTree="false"
                        @onIconClick="_onIconClick"></marvel-grid-tree>
    </div>
    <div class="mopRight">
      <marvel-dashboard title="MOP Details Info">
        <div slot="customArea"></div>
        <div slot="contArea" class="mopRightCont">
          <div v-html="detailsInfo"></div>
        </div>
      </marvel-dashboard>
    </div>
  </div>
</template>

<script>
  import MarvelDashboard from '~~/widget/dashboard/MarvelDashboard';
  import MarvelGridTree from "~~/widget/grid/MarvelGridTree";
  import HttpUtils from "./../0.common/httpUtil/httpUtils";
  import MockUtils from "./../0.common/mock";
  /**
   * RenovationMOP component description
   * @vuedoc
   * @exports RenovationMOP
   */
  export default {
    name: 'RenovationMOP',
    components: {
      MarvelDashboard,
      MarvelGridTree
    },
    data() {
      return {
        //#region const
        debug: false,
        modelKey:"MOPPTNLSRID",
        //#endregion
        //#region workFlow
        titles4GridTree:[{
          key:"id",
          label:"ID",
          width:"50px",
          type:"text",
          visible: true,
        },{
          key:"wfInsId",
          label:"wfInsId",
          width:"50px",
          type:"text",
          visible: true,
        },{
          key:"operationName",
          label:"OperationName",
          width:"200px",
          type:"text",
          visible: true,
          isTreeNodeCell: true,
        },{
          key:"startTime",
          label:"startTime",
          width:"150px",
          type:"text",
          visible: true,
        },{
          key:"endTime",
          label:"endTime",
          width:"100px",
          type:"text",
          visible: true,
        },{
          key:"skip",
          label:"Skip",
          width:"100px",
          type:"icon",
          visible: true,
        },{
          key:"pause",
          label:"Pause",
          width:"100px",
          type:"icon",
          visible: true,
        },{
          key:"viewdetails",
          label:"View Details",
          width:"100px",
          type:"icon",
          visible: true,
        }],
        treeNodes:[],
        detailsInfo:"",
        //#endregion
        //#region mop
        mopId:undefined
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

        this._creatMop(function (res) {
          self.mopId = res.body.resultObj.id;
          self._getStepCont(function (oRes) {
            self._setStepCont(oRes);
          });
        });
      },

      //#endregion

      _creatMop: function(oAfterCallback){
        var storage=window.localStorage;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            wfInsId: storage["wfInsId"],
            wfModelKey: this.modelKey,
            mapParams: {
              a:1,
              b:2
            },
          })
        };
        if (this.debug) {
          console.log(reqBody);
        } else {
          HttpUtils.post("createIns4MopWF", reqBody).then(res => {
            oAfterCallback(res);
          });
        }
      },
      _getStepCont: function (oAfterCallback) {
        var oRes = undefined;
        var storage=window.localStorage;
        var oParams = {
          wfInsId: storage["wfInsId"],
        };
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          oRes = MockUtils.mock4GetComponentInfo(oParams.componentName).resultObj;
          oAfterCallback(oRes);
        } else {
          HttpUtils.post("getTaskList4MopWF", reqBody).then(res => {
            oRes = res.body.resultObj;
            oAfterCallback(oRes);
          });
        }
      },
      _setStepCont: function (oRes) {
        var oTree=[];
        for(var i= 0; i< oRes.length; i++){
          var oData = oRes[i];
          var oTreeCell = {
            name: oData.id,
            id:  oData.id,
            wfInsId: oData.wfInsId,
            operationName: oData.name,
            startTime: oData.startTime,
            endTime: oData.endTime,
            skip: [{
              title: "跳过",
              value: "icon-forward2"
            }],
            pause: [{
              title: "暂停",
              value: "icon-pause"
            }],
            viewdetails: [{
              title: "查看详情",
              value: "icon-file-text2"
            }],
            children: [],
            nodeLevel: 0,
            hasCheckbox: false,
            hasRadiobox: false,
            isInitCheck: false,
            isInitExpand: true,
            isLeafNode: false
          };
          oTree.push(oTreeCell);
        }

        this.treeNodes = oTree;
      },

      _getLevel: function(arrNodes, oNode){
        //todo
      },
      _isLeafNode: function(arrNodes, oNode){
        var bIsLeafNode = true;
        for(var i = 0; i<arrNodes.length; i++){
          if (arrNodes[i].parentId == oNode.id) {
            bIsLeafNode = false;
            break;
          }
        }

        if (oNode.parentId != null && bIsLeafNode){
          return true;
        }else{
          return false;
        }
      },

      _onIconClick: function (oRow, oCell) {
        var self = this;
        var reqBody = {
          reqBuVoStr: JSON.stringify({
            wfInsId: this.mopId,
            mapParams: {
              a:1,
              b:2
            },
          })
        };
        if (this.debug) {
          this.detailsInfo = oRow;
        } else {
          HttpUtils.post("submitTask4MopWF", reqBody).then(res => {
            self._getStepCont(function (oRes) {
              self._setStepCont(oRes);
            });
          });
        }
      }

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd
      //#endregion
    }
  }
</script>

<style scoped>

  .componentWrapper{
    width: 100%;
    height: 100%;
  }

  .mopLeft{
    width: calc(80% - 20px);
    height: 100%;
    float: left;
  }

  .mopRight{
    float: left;
    width: 20%;
    margin-left:20px;
    background-color: #ffffff;
    height: 100%;
  }

  .mopRightCont{
    height: 100%;
    background-color: #ffffff;
    overflow: auto;
  }

</style>
