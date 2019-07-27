<template>
  <div class="marvelLogViewWrapper">
    <marvel-dashboard title="">
      <div slot="customArea" style="height: 100%;overflow:hidden;position: relative;top: 12px;">
        <div class="customAreaSession btnSession">
          <marvel-icon-txt-button size="mini"
                                  classCustom="classCustom4MopLogExportBtn"
                                  label="Export Output" :isPrimary=false
                                  icon="icon-download2" v-on:onClick="_onExport"></marvel-icon-txt-button>
        </div>
        <div class="customAreaSession checkSession">
          <marvel-check-box ref="checkOption4Error"
                            id="checkOption4Error"
                            label="错误"
                            buObj=""
                            :showLabel=true
                            v-on:onChange="_callback4OnChange4Error"></marvel-check-box>
        </div>
        <div class="customAreaSession checkSession">
          <marvel-check-box ref="checkOption4Warning"
                            id="checkOption4Warning"
                            label="警告"
                            buObj=""
                            :showLabel=true
                            v-on:onChange="_callback4OnChange4Warning"></marvel-check-box>
        </div>
        <div class="customAreaSession checkSession">
          <marvel-check-box ref="checkOption4Notice"
                            id="checkOption4Notice"
                            label="通知"
                            buObj=""
                            :showLabel=true
                            v-on:onChange="_callback4OnChange4Notice"></marvel-check-box>
        </div>
      </div>
      <div slot="contArea" class="mopRightCont">
        <marvel-tab ref="tab4LogView" :tabItems="tabItemsInner" :hide-border="true">
          <marvel-tab-item v-for="tabItem in tabItemsInner" :key="tabItem.id" :isActive="tabItem.isActive">
            <div class="logArea" v-html="tabItem.logInfo"></div>
          </marvel-tab-item>
        </marvel-tab>
      </div>
    </marvel-dashboard>
  </div>
</template>

<script>
  import MarvelDashboard from "../dashboard/MarvelDashboard";
  import MarvelCheckBox from "../select/MarvelCheckBox";
  import MarvelIconTxtButton from "../button/MarvelIconTxtButton";
  import MarvelTab from "../tab/MarvelTab";
  import MarvelTabItem from "../tab/MarvelTabItem";
  import StrUtils from "../../component/str";

  /**
   *  MarvelLogView widget description
   *  @vuedoc
   *  @exports MarvelLogView
   */
  export default {
    name: 'MarvelLogView',
    components: {
      MarvelTab,
      MarvelTabItem,
      MarvelIconTxtButton,
      MarvelCheckBox,
      MarvelDashboard
    },
    props: {
      arrLogs: {
        type: Array,
        default: undefined,
        required: true,
      }
    },
    data: function () {
      return {
        tabItemsInner: []
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
        this._genTabOptions();
      },

      //#endregion

      _genTabOptions: function () {
        this.tabItemsInner = [];
        for (var i = 0; i < this.arrLogs.length; i++) {
          var oLog = this.arrLogs[i];
          var oTabOption = {
            id: StrUtils.uuid(),
            label: oLog.name,
            isActive: i == 0,
            logInfo: oLog.logInfo
          };
          this.tabItemsInner.push(oTabOption);
        }
      },

      _onExport: function () {
        var oParams = {
          isCheck4Notice: this.$refs.checkOption4Notice.getCheckItem(),
          isCheck4Warning: this.$refs.checkOption4Warning.getCheckItem(),
          isCheck4Error: this.$refs.checkOption4Error.getCheckItem(),
        };
        this._callback4OnExport(oParams);
      },

      //#endregion
      //#region callback

      _callback4OnChange4Notice: function (strOldVal, strNewVal, oBuObj) {
        this.$emit("onChange4Notice", strNewVal)
      },
      _callback4OnChange4Warning: function (strOldVal, strNewVal, oBuObj) {
        this.$emit("onChange4Warning", strNewVal)
      },
      _callback4OnChange4Error: function (strOldVal, strNewVal, oBuObj) {
        this.$emit("onChange4Error", strNewVal)
      },
      _callback4OnExport: function (oParams) {
        this.$emit("onExport", oParams)
      },

      //#endregion
      //#region 3rd

      //#endregion
    },
    watch: {
      ArrLogs: {
        handler: function () {
          this._genTitles4Grid();
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

  .marvelLogViewWrapper {
    width: 100%;
    height: 100%;
  }

  .customAreaSession {
    float: right;
    margin-left: 16px;
  }

  .checkSession {
    position: relative;
    top: 4px;
  }

  .mopRightCont {
    width: calc(100% + 20px);
    height: calc(100% + 52px);
    position: relative;
    top: -42px;
    left: -10px;
  }

  .logArea {
    height: 100%;
    background-color: #f0f0f0;
    overflow: auto;
  }
</style>
