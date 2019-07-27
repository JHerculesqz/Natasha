<template>
  <div class="workFlowMopWrapper">
    <div class="mopLeft">
      <marvel-grid-tree :hasFoot="false"
                        ref="ref4MarvelGridTree"
                        :titles="title4MopLstInner"
                        :treeNodes="treeNode4MopLstInner"
                        :dynamicPaging="false"
                        :isTree="false"
                        @onIconClick="_onIconClick"></marvel-grid-tree>
    </div>
    <div class="mopRight">
      <marvel-log-view :arrLogs="arrLogs"
                       @onChange4Notice="_callback4OnChange4Notice"
                       @onChange4Warning="_callback4OnChange4Warning"
                       @onChange4Error="_callback4OnChange4Error"
                       @onExport="_callback4OnExport"></marvel-log-view>
    </div>
  </div>
</template>

<script>
  import MarvelWizard from "../wizard/MarvelWizard";
  import MarvelGridTree from "../grid/MarvelGridTree";
  import MarvelLogView from "../logView/MarvelLogView";

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
      MarvelWizard
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
      rowOriginData: {
        default: undefined,
        required: true,
      },
      arrLogs: {
        type: Array,
        default: undefined,
        required: true,
      }
    },
    data: function () {
      return {
        title4MopLstInner: [],
        row4MopLstInner: [],
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
        this._genTitles4Grid();
        this._genRows4Grid();
      },

      //#endregion

      _genTitles4Grid: function () {
        var arrTitles = JSON.parse(JSON.stringify(this.title4MopLst));
        this.title4MopLstInner = this._genTitles(arrTitles);
      },
      _genRows4Grid: function () {
        var arrRows = JSON.parse(JSON.stringify(this.row4MopLst));
        this.row4MopLstInner = this._genRows(arrRows);
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
          key: "skip",
          label: "Skip",
          width: "100px",
          type: "icon",
          visible: true,
        }, {
          key: "pause",
          label: "Pause",
          width: "100px",
          type: "icon",
          visible: true,
        }, {
          key: "viewdetails",
          label: "View Details",
          width: "100px",
          type: "icon",
          visible: true,
        }];
        var arrNewTitleV1 = oLeftBasicTitle.concat(arrTitles);
        var arrNewTitleV2 = arrNewTitleV1.concat(oRightBasicTitle);

        return arrNewTitleV2;
      },
      _genRows: function (arrRows) {
        var oRes = this.rowOriginData;
        var arrMopRows = [];
        for (var i = 0; i < arrRows.length; i++) {
          var oData = oRes[i];
          var oMopRowsCell = {
            id: oData.id,
            parentId: oData.parentId,
            name: oData.name,
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
            isLeafNode: this._isLeafNode(arrRows, oData),
          };
          Object.assign(oMopRowsCell, arrRows[i]);
          arrMopRows.push(oMopRowsCell);
        }

        this.row4MopLstInner = arrMopRows;
        this.treeNode4MopLstInner = this._genTreeNode(this.row4MopLstInner);
      },
      _isLeafNode: function (arrNodes, oNode) {
        var bIsLeafNode = true;
        for (var i = 0; i < arrNodes.length; i++) {
          if (arrNodes[i].parentId == oNode.id) {
            bIsLeafNode = false;
            break;
          }
        }

        if (oNode.parentId != null && bIsLeafNode) {
          return true;
        } else {
          return false;
        }
      },
      _genTreeNode: function (arrRows) {
        var arrRows4Tree = JSON.parse(JSON.stringify(arrRows));
        var isNotAllRoot = false;
        for(;isNotAllRoot;){
          isNotAllRoot = true;
          for(var i = 0; i< arrRows4Tree.length; i++){
            var oRow = arrRows4Tree[i];
            if (oRow.parentId != null) {
              isNotAllRoot = false;
              this._addNodeToParent(arrRows4Tree, oRow);
              arrRows4Tree.splice(i,1);
              break;
            }
          }
        }

        return arrRows4Tree;
      },
      _addNodeToParent:function(arrRows4Tree, oRow){
        for(var i = 0; i< arrRows4Tree.length; i++){
          var oCurrentRow = arrRows4Tree[i];
          if(oCurrentRow.id == oRow.parentId){
            oCurrentRow.children.push(oRow);
            break;
          }else if(oCurrentRow.children.length>0){
            this._addNodeToParent(oCurrentRow.children, oRow);
          }
        }
      },
      _onIconClick: function (oRow, oCell, oIcon) {
        //todo
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

      //#endregion
      //#region callback

      _callback4OnChange4Notice: function (bIsChecked) {
        this.$emit("onChange4Notice", bIsChecked)
      },
      _callback4OnChange4Warning: function (bIsChecked) {
        this.$emit("onChange4Warning", bIsChecked)
      },
      _callback4OnChange4Error: function (bIsChecked) {
        this.$emit("onChange4Error", bIsChecked)
      },
      _callback4OnExport: function (oParams) {
        this.$emit("onExport", oParams)
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

  .workFlowMopWrapper{
    width: 100%;
    height: 100%;
  }

  .mopLeft{
    width: 1200px;
    float: left;
    height: 100%;
  }

  .mopRight{
    width: calc(100% - 1220px);
    float: left;
    height: 100%;
    margin-left: 20px;
  }

</style>
