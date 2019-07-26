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
        debug: true,
        //#endregion
        //#region workFlow
        titles4GridTree:[{
          key:"no",
          label:"No.",
          width:"50px",
          type:"text",
          visible: true,
        },{
          key:"operation",
          label:"Operation",
          width:"200px",
          type:"text",
          visible: true,
          isTreeNodeCell: true,
        },{
          key:"operationobj",
          label:"Operation Object",
          width:"150px",
          type:"text",
          visible: true,
        },{
          key:"progress",
          label:"Progress",
          width:"100px",
          type:"text",
          visible: true,
        },{
          key:"state",
          label:"State",
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
        detailsInfo:""
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

        this._getStepCont(function (oRes) {
          self._setStepCont(oRes);
        });
      },

      //#endregion

      _getStepCont: function (oAfterCallback) {
        var oRes = undefined;
        var oParams = {
          componentName: "RenovationMOP",
        };
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          oRes = MockUtils.mock4GetComponentInfo(oParams.componentName).resultObj;
        } else {
          // HttpUtils.post("getComponentInfo", reqBody).then(res => {
          //   oRes = res.data.resultObj;
          // });
        }

        oAfterCallback(oRes);
      },
      _setStepCont: function (oRes) {
        this.treeNodes = oRes;
        console.log(oRes);
      },

      _onIconClick: function (oRow, oCell) {
        this.detailsInfo = oRow
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
    width: 1000px;
    height: 100%;
    float: left;
  }

  .mopRight{
    float: left;
    width: calc(100% - 1020px);
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
