<template>
  <div class="workFlowMopWrapper">
    <div class="mopLeft">
      <marvel-grid-tree :hasFoot="false"
                        :titles="title4MopLstInner"
                        :treeNodes="treeNode4MopLstInner"
                        :dynamicPaging="false"
                        :isTree="false"
                        @onIconClick="_onIconClick"></marvel-grid-tree>
    </div>
    <div class="mopRight">
      <marvel-tab :tabItems="tabItemsInner" :hide-border="true">
        <marvel-tab-item v-for="tabItem in tabItemsInner" :key="tabItem.id" :isActive="tabItem.isActive">
          <div v-if="tabItem.key == 'logDetails'" class="tabCont logTabCont">
            <marvel-log-view :ref="logRef"
                             :logItems="logs"
                             :filterOptions="logFilterOptions"
                             @onBtnClick="_callback4OnFilterBtnClick"
                             @onCheckBoxChange="_callback4OnFilterCheckBoxChange"></marvel-log-view>
          </div>
          <div v-else class="tabCont">
            <slot :name="tabItem.slotId"></slot>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
  </div>
</template>

<script>
  import MarvelGridTree from "../grid/MarvelGridTree";
  import MarvelLogView from "../log/MarvelLogView";
  import MarvelTab from "../tab/MarvelTab";
  import MarvelTabItem from "../tab/MarvelTabItem";
  import StrUtils from "../../component/str";

  /**
   *  MarvelWorkFlowMop widget description
   *  @vuedoc
   *  @exports MarvelWorkFlowMop
   */
  export default {
    name: 'MarvelWorkFlowMop',
    components: {
      MarvelLogView,
      MarvelGridTree,
      MarvelTab,
      MarvelTabItem,
      StrUtils,
    },
    props: {
      title4MopLst: {
        type: Array,
        default: undefined,
        required: true,
      },
      row4MopLst: {
        type: Array,
        default: undefined,
        required: true,
      },
      customMopOptionIcons: {
        type: Array,
        default: undefined,
        required: false,
      },
      logs: {
        type: Array,
        default: undefined,
        required: true,
      },
      logFilterOptions: {
        type: Array,
        default: undefined,
        required: true,
      },
      customTabs:{
        type: Array,
        default: function () {
          return [];
        },
        required: false,
      }
    },
    data: function () {
      return {
        logRef: undefined,
        tabItemsInner: [{
          id: StrUtils.uuid(),
          label: "步骤详情",
          key: "stepDetails",
          slotId: "stepDetailsTab",
          isActive: true
        },{
          id: StrUtils.uuid(),
          label: "日志详情",
          key: "logDetails",
          isActive: false
        }],
        title4MopLstInner: [],
        treeNode4MopLstInner: [],
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
        this.logRef = StrUtils.uuid();
        this.$nextTick(function () {
          self._genTabs();
          self._genTitles4Grid();
          self._genRows4Grid();
        });
      },

      //#endregion

      //#region gen data

      _genTabs: function(){
        for(var i = 0; i< this.customTabs.length; i++){
          var oCustomTab = this.customTabs[i];
          this.tabItemsInner.push({
            id: StrUtils.uuid(),
            label: oCustomTab.label,
            slotId: oCustomTab.slotId,
            isActive: false
          });
        }
      },
      _genTitles4Grid: function () {
        var arrTitles = JSON.parse(JSON.stringify(this.title4MopLst));
        this.title4MopLstInner = this._genTitles(arrTitles);
      },
      _genTitles: function (arrTitles) {
        var oLeftBasicTitle = [{
          key: "id",
          label: "ID",
          width: "50px",
          type: "text",
          visible: false,
        }, {
          key: "name",
          label: "名称",
          width: "200px",
          type: "text",
          visible: true,
          isTreeNodeCell: true,
        }];
        var oRightBasicTitle = [{
          key: "startTime",
          label: "开始时间",
          width: "150px",
          type: "text",
          visible: true,
        }, {
          key: "endTime",
          label: "结束时间",
          width: "100px",
          type: "text",
          visible: true,
        }, {
          key: "operation",
          label: "操作",
          width: "100px",
          type: "icon",
          visible: true,
        }];
        var arrNewTitleV1 = oLeftBasicTitle.concat(arrTitles);
        var arrNewTitleV2 = arrNewTitleV1.concat(oRightBasicTitle);

        return arrNewTitleV2;
      },
      _genRows4Grid: function () {
        var arrRows = JSON.parse(JSON.stringify(this.row4MopLst));
        this._genRows(arrRows, 1);
        this.treeNode4MopLstInner = JSON.parse(JSON.stringify(arrRows));
      },
      _genRows: function (arrRows, iNodeLevel) {
        for (var i = 0; i < arrRows.length; i++) {
          //基础操作按钮
          var oOperations = [{
            title: "查看步骤",
            value: "icon-marvelIcon-34",
            color: "#3399ff"
          },{
            title: "查看日志",
            value: "icon-file-text2",
            color: "#3399ff"
          }];
          //添加自定义按钮
          if(this.customMopOptionIcons!=undefined && this.customMopOptionIcons.length>0){
            for(var j = 0; j<this.customMopOptionIcons.length; j++){
              oOperations.push(this.customMopOptionIcons[j])
            }
          }
          //数据组装
          if(arrRows[i].operation != undefined){
            for(var k = oOperations.length - 1; k>=0; k--){
              arrRows[i].operation.unshift(oOperations[k]);
            }
          }else{
            arrRows[i].operation = JSON.parse(JSON.stringify(oOperations));
          }

          arrRows[i].nodeLevel = iNodeLevel;
          arrRows[i].hasCheckbox = false;
          arrRows[i].hasRadiobox = false;
          arrRows[i].isInitCheck = false;
          arrRows[i].isInitExpand = true;
          arrRows[i].isLeafNode = arrRows[i].children.length==0 && iNodeLevel!=1;
          if(arrRows[i].children.length > 0){
            this._genRows(arrRows[i].children, iNodeLevel + 1);
          }
        }
      },

      //#endregion

      //#region mop action

      _onIconClick: function (oRow, oCell) {
        if (oCell.value == "icon-forward2") {
          //skip
          this._callback4OnIconClick4Skip(oRow, oCell);
        } else if (oCell.value == "icon-marvelIcon-34") {
          //pause
          this.tabItemsInner[0].isActive = true;
          this.tabItemsInner[1].isActive = false;
          this._callback4OnIconClick4Pause(oRow, oCell);
        } else if (oCell.value == "icon-file-text2") {
          //anchorLogTo
          //mop一行的id 与 log的taskId相对应
          this.tabItemsInner[0].isActive = false;
          this.tabItemsInner[1].isActive = true;
          var logId = oRow.id;
          this.$refs[this.logRef][0].anchorTo(logId);
        }else{
          this._callback4OnIconClick4Custom(oRow, oCell);
        }
      },

      //#endregion

      //#endregion
      //#region callback

      _callback4OnFilterBtnClick: function (oCheckParams, oItem) {
        this.$emit("onFilterBtnClick", oCheckParams, oItem)
      },
      _callback4OnFilterCheckBoxChange: function (oCheckParams) {
        this.$emit("onFilterCheckBoxChange", oCheckParams)
      },
      _callback4OnIconClick4Skip: function (oRow, oCell) {
        this.$emit("onIconClickInMop4Skip", oRow, oCell)
      },
      _callback4OnIconClick4Pause: function (oRow, oCell) {
        this.$emit("onIconClickInMop4Pause", oRow, oCell)
      },
      _callback4OnIconClick4Custom: function (oRow, oCell) {
        this.$emit("onIconClickInMop4Custom", oRow, oCell)
      },

      //#endregion
      //#region 3rd
      //#endregion
    },
    watch: {
      title4MopLst: {
        handler: function () {
          this._genTitles4Grid();
        },
        deep: true
      },
      row4MopLst: {
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

  .workFlowMopWrapper {
    width: 100%;
    height: 100%;
  }

  .mopLeft {
    width: calc(100% - 620px);
    float: left;
    height: 100%;
  }

  .mopRight {
    width: 600px;
    float: left;
    height: 100%;
    margin-left: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  }

  .tabCont {
    width: 100%;
    height: 100%;
  }

  .logTabCont {
    background-color: #f0f0f0;
  }

</style>
