<template>
  <div class="componentWrapper">
    <div class="componentDashBoardWrapper" v-for="dashboard in dashboards">
      <marvel-dashboard :title="dashboard.title">
        <div slot="customArea"></div>
        <div slot="contArea" class="componentDashBoardCont">
          <div class="sessionArea" v-for="item in dashboard.contItems">
            <div v-if="item.type == 'input'" class="sessionCont">
              <div class="labelArea" :title="item.name">{{item.name}}：</div>
              <div class="formItemArea">
                <marvel-input :ref="item.key"></marvel-input>
              </div>
            </div>
            <div v-else-if="item.type == 'dropdown'" class="sessionCont">
              <div class="labelArea" :title="item.name">{{item.name}}：</div>
              <div class="formItemArea">
                <marvel-drop-down-button :ref="item.key" :dropDownItems="item.dropItems" width="100%"></marvel-drop-down-button>
              </div>
            </div>
          </div>
        </div>
      </marvel-dashboard>
    </div>
  </div>
</template>

<script>
  import MarvelDashboard from '~~/widget/dashboard/MarvelDashboard';
  import MarvelDropDownButton from '~~/widget/button/MarvelDropDownButton';
  import MarvelInput from '~~/widget/input/MarvelInput';
  import HttpUtils from "./../0.common/httpUtil/httpUtils";
  import MockUtils from "./../0.common/mock";

  /**
   * RenovationNEInfo component description
   * @vuedoc
   * @exports RenovationNEInfo
   */
  export default {
    name: 'RenovationNEInfo',
    components: {
      MarvelDashboard,
      MarvelDropDownButton,
      MarvelInput
    },
    props:{

    },
    data() {
      return {
        //#region const
        debug: true,
        //#endregion
        //#region
        dashboards:[],
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
          componentName: "RenovationNEInfo",
        };
        var reqBody = JSON.stringify(oParams);
        if (this.debug) {
          oRes = MockUtils.mock4GetComponentInfo(oParams.componentName).resultObj;
        } else {
          HttpUtils.post("getComponentInfo", reqBody).then(res => {
            oRes = res.data.resultObj;
          });
        }

        oAfterCallback(oRes);
      },
      _setStepCont: function (oRes) {
        this.dashboards = oRes;
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

  .componentWrapper{
    width: 100%;
    height: 100%;
  }

  .componentDashBoardWrapper{
    width: 100%;
    height: 35%;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .componentDashBoardWrapper:last-child{
    margin-bottom: 0;
  }

  .componentDashBoardCont{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }

  .sessionArea{
    width: calc(50% - 20px);
    height: 50px;
    float: left;
  }

  .sessionArea:nth-child(odd){
    margin-right: 40px;
  }

  .sessionCont{
    width: 100%;
    height: 100%;
  }

  .labelArea{
    width: 120px;
    float: left;
    height: 100%;
    font-size: 14px;
    color: #4d4d4d;
  }

  .formItemArea{
    width: calc(100% - 120px);
    float: left;
  }

</style>
