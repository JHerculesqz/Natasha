<template>
  <div class="gridWrapper marvelGridWrapper">
    <div class="headWrapper" v-if="hasHead">
      <table class="gridCont" cellspacing="0" cellpadding="0" border="0" v-bind:style="{left:offSetX + 'px'}">
        <thead>
        <tr>
          <td v-for="(title, index) in titles" v-bind:style="{width: title.width}" v-show="title.visible">
            <div>
              {{title.label}}
            </div>
          </td>
        </tr>
        </thead>
      </table>
    </div>
    <div class="bodyWrapper" id="bodyWrapper" v-bind:style="_genBodyHeightstyle()">
      <table class="gridCont" cellspacing="0" cellpadding="0" border="0">
        <tbody>
        <tr v-for="oNode in rowsInPage">
          <td>
            <marvel-grid-tree-node :key="oNode.nodeLevel + oNode.name"
                                   :nodeItem="oNode"
                                   :titles="titles"
                                   @onCheckOrNotRecussionTreeNode="onCheckOrNotRecussionTreeNode"
                                   @onExpandOrNotTreeNode="onExpandOrNotTreeNode"
                                   @onIconClick="onIconClick">
            </marvel-grid-tree-node>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="hasFoot" class="footWrapper">
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
  import MarvelGridTreeNode from "./MarvelGridTreeNode";
  import MarvelPaging from "../paging/MarvelPaging";

  /**
   *  MarvelGridTree widget description
   *  @vuedoc
   *  @exports MarvelGridTree
   */
  export default {
    name: 'MarvelGridTree',
    components: {
      MarvelGridTreeNode,
      MarvelPaging
    },
    props: {
      titles: {
        type: Array,
        default: function () {
          return [{
            key: "name",
            label: "名字",
            width: "300px",
            type: "text",
            visible: true,
            isTreeNodeCell: true
          }];
        },
        required: true,
      },
      treeNodes: {
        type: Array,
        default: undefined,
        required: true,
      },
      isTree: {
        type: Boolean,
        default: true,
        required: false,
      },
      hasFoot: {
        type: Boolean,
        default: true,
        required: false,
      },
      dynamicPaging: {
        type: Boolean,
        default: true,
        required: false,
      },
      totalNum: {
        type: Number,
        default: 0,
        required: false,
      },
      totalPage: {
        type: Number,
        default: 0,
        required: false,
      },
      limit: {
        type: Number,
        default: 50,
        required: false,
      },
      limitRange: {
        type: Array,
        default: function () {
          return [10, 20, 50]
        },
        required: false,
      },
      showPageSwitch: {
        type: Boolean,
        default: true,
        required: false,
      },
      onlyOneCheck: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: function () {
      return {
        treeNodesInner: {},
        mapNode: {},
        limitInner: this.limit,
        rowsInPage: [],
        curPageIndex: 1,
        arrSelectNodes: [],
        hasHead: this.isTree ? false : true,
        pageLimit: this.isTree ? 3 : 7,
        showPageNum: this.isTree ? false : true,
        showChangeLimit: this.isTree ? false : true,
        offSetX:0
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    beforeDestroy: function () {
      //#region destroy

      this._destroy();

      //#endregion
    },
    watch: {
      treeNodes: {
        handler: function () {
          this._handlerTreeNodes();
        },
        deep: true
      },
      curPageIndex(iNewVal, iOldVal) {
        this._calcRows4Show();
      }
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
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this._handlerTreeNodes();

        let oTbody = this.$el.querySelector("#bodyWrapper");
        oTbody.addEventListener("scroll", (oEvent) => {
          this.offSetX = -oEvent.target.scrollLeft;
        });
      },
      _destroy: function () {
      },

      //#endregion

      _handlerTreeNodes: function () {
        //1.deep copy
        this.treeNodesInner = JSON.parse(JSON.stringify(this.treeNodes));

        //2.generate id/pcRelation
        this._setNodeId(this.treeNodesInner, "-1");

        //3.set pageIndex
        this._resetCurPage();

        //4.set treeNode select
        this._setTreeNodeSelect(this.treeNodesInner);

        //5.计算当前需要展示的记录数
        this._calcRows4Show();
      },
      _setTreeNodeSelect: function (arrTreeNodes) {
        for (var i = 0; i < arrTreeNodes.length; i++) {
          var oNode = arrTreeNodes[i];
          this._isNodeSelect(oNode);
          if (oNode.children && oNode.children.length > 0) {
            this._setTreeNodeSelect(oNode.children);
          }
        }
      },
      _isNodeSelect: function (oTreeNode) {
        if (oTreeNode.isLeafNode) {
          for (var i = 0; i < this.arrSelectNodes.length; i++) {
            var oSelectNode = this.arrSelectNodes[i];
            if (oSelectNode.id == oTreeNode.id) {
              oTreeNode.isInitCheck = true;
              this.onCheckOrNotRecussionTreeNode(true, oTreeNode, true);
            }
          }
        }
      },
      _setNodeId: function (arrNodes, strParentId) {
        for (var i = 0; i < arrNodes.length; i++) {
          var oNode = arrNodes[i];
          oNode.parentId = strParentId;
          if (oNode.isShow == false) {
            this.$set(oNode, "isShow", false);
          } else {
            this.$set(oNode, "isShow", true);
          }
          this.mapNode[oNode.id] = oNode;
          if (oNode.children && oNode.children.length > 0) {
            this._setNodeId(oNode.children, oNode.id);
          }
        }
      },
      _genBodyHeightstyle: function () {
        if (this.hasFoot && this.hasHead) {
          return {
            height: "calc(100% - 64px)"
          }
        } else if (this.hasHead && !this.hasFoot) {
          return {
            height: "calc(100% - 32px)"
          }
        } else if (!this.hasHead && this.hasFoot) {
          return {
            height: "calc(100% - 32px)"
          }
        } else {
          return {
            height: "100%"
          }
        }
      },
      onCheckOrNotRecussionTreeNode: function (isCheck, oCurrTreeNode, bIsNotExpand) {
        // 如果是选中
        if (isCheck) {
          //保证翻页的时候只有一个节点是选中的
          if (this.onlyOneCheck && !bIsNotExpand) {
            this.arrSelectNodes = [];
          }

          //级联的选中子元素
          this._checkChildrenNodeRecussion(oCurrTreeNode, bIsNotExpand);

          if (oCurrTreeNode.hasCheckbox) {
            //如果是复选框，同时级联的查看父元素是否选中
            this._checkParentNodeRecussion(oCurrTreeNode, bIsNotExpand);
          } else if (oCurrTreeNode.hasRadiobox) {
            //如果设置整棵树只能有一个节点选中
            if (this.onlyOneCheck) {
              for (let i = 0; i < this.rowsInPage.length; i++) {
                var oTreeNode = this.mapNode[this.rowsInPage[i].id];
                this._unCheckOthersNodeRecussion(oTreeNode, oCurrTreeNode.id, oCurrTreeNode.nodeLevel, bIsNotExpand);
              }
            } else {
              //如果是单选框，同时查看兄弟元素是否选中
              this._checkBrothersNodeRecussion(oCurrTreeNode, bIsNotExpand);
            }
          }
        }
        //去选中
        else {
          //级联的去选中子元素
          this._unCheckChildrenNodeRecussion(oCurrTreeNode, bIsNotExpand);

          //同时级联的查看父元素是否选中
          this._unCheckParentNodeRecussion(oCurrTreeNode, bIsNotExpand);
        }

        if (!bIsNotExpand) {
          this.callback4OnCheckOrUnCheck(isCheck, oCurrTreeNode);
        }
      },
      _unCheckOthersNodeRecussion: function (oNode, strDestNodeId, strDestNodeLevel, bIsNotExpand) {
        if (oNode.nodeLevel > strDestNodeLevel) {
          return;
        }
        if (oNode.id != strDestNodeId && oNode.hasRadiobox) {
          this._unCheckChildrenNodeRecussion(oNode, bIsNotExpand);
        }
        if (oNode.children && oNode.children.length > 0) {
          for (var i = 0; i < oNode.children.length; i++) {
            var oNodeChild = oNode.children[i];
            if (oNodeChild.id != strDestNodeId && oNodeChild.hasRadiobox) {
              this._unCheckChildrenNodeRecussion(oNodeChild, bIsNotExpand);
            }

            //级联的选中
            this._unCheckOthersNodeRecussion(oNodeChild, strDestNodeId);
          }
        }
      },
      _checkChildrenNodeRecussion: function (oTreeNodeOuter, bIsNotExpand) {
        var oTreeNode = this.mapNode[oTreeNodeOuter.id];
        oTreeNode.isInitCheck = true;
        if (!bIsNotExpand) {
          this._upsertarrSelectNodes(oTreeNode);
        }
        if (oTreeNode.children && oTreeNode.children.length > 0) {
          //如果是选中状态，需要选中所有子节点
          for (var i = 0; i < oTreeNode.children.length; i++) {
            var oNodeChild = oTreeNode.children[i];
            oNodeChild.isInitCheck = true;
            if (!bIsNotExpand) {
              this._upsertarrSelectNodes(oNodeChild);
            }

            //级联的选中
            this._checkChildrenNodeRecussion(oNodeChild, bIsNotExpand);
          }
        }
      },
      _unCheckChildrenNodeRecussion: function (oTreeNodeOuter, bIsNotExpand) {
        var oTreeNode = this.mapNode[oTreeNodeOuter.id];
        oTreeNode.isInitCheck = false;
        if (!bIsNotExpand) {
          this._removearrSelectNodes(oTreeNode);
        }
        if (oTreeNode.children && oTreeNode.children.length > 0) {
          //如果是选中状态，需要选中所有子节点
          for (var i = 0; i < oTreeNode.children.length; i++) {
            var oNodeChild = oTreeNode.children[i];
            oNodeChild.isInitCheck = false;
            if (!bIsNotExpand) {
              this._removearrSelectNodes(oNodeChild);
            }

            //级联的选中
            this._unCheckChildrenNodeRecussion(oNodeChild, bIsNotExpand);
          }
        }
      },
      _checkParentNodeRecussion: function (oTreeNode, bIsNotExpand) {
        if (oTreeNode.parentId == -1) {
          return;
        }
        var oParentNode = this.mapNode[oTreeNode.parentId];
        if (oParentNode.hasCheckbox) {
          //如果父元素是复选框，需要判断父元素的所有子元素是否是选中
          var bIsNotCheckExists = false;
          for (var i = 0; i < oParentNode.children.length; i++) {
            var oChildNode = oParentNode.children[i];
            if (oChildNode.isInitCheck == false) {
              bIsNotCheckExists = true;
              break;
            }
          }
          if (bIsNotCheckExists) {
            oParentNode.isInitCheck = false;
            if (!bIsNotExpand) {
              this._upsertarrSelectNodes(oParentNode);
            }
          } else {
            oParentNode.isInitCheck = true;
            if (!bIsNotExpand) {
              this._upsertarrSelectNodes(oParentNode);
            }
          }
          //级联的判断父元素
          if (oParentNode.isInitCheck) {
            this._checkParentNodeRecussion(oParentNode, bIsNotExpand);
          }
        } else if (oParentNode.hasRadiobox) {
          //如果父元素是单选框，有一个子元素被选中则父元素被选中
          var bIsCheckExists = false;
          for (var i = 0; i < oParentNode.children.length; i++) {
            var oChildNode = oParentNode.children[i];
            if (oChildNode.isInitCheck == true) {
              bIsCheckExists = true;
              break;
            }
          }
          if (bIsCheckExists) {
            oParentNode.isInitCheck = true;
            if (!bIsNotExpand) {
              this._upsertarrSelectNodes(oParentNode);
            }
          } else {
            oParentNode.isInitCheck = false;
            if (!bIsNotExpand) {
              this._removearrSelectNodes(oParentNode);
            }
          }
          //级联的判断兄弟元素
          if (oParentNode.isInitCheck) {
            this._checkBrothersNodeRecussion(oParentNode, bIsNotExpand);
          }
        }
      },
      _unCheckParentNodeRecussion: function (oTreeNode, bIsNotExpand) {
        if (oTreeNode.parentId == -1) {
          return;
        }
        //如果是去选中，需要判断父元素的所有子元素是否是选中
        var oParentNode = this.mapNode[oTreeNode.parentId];
        if (oParentNode.hasCheckbox) {
          //父元素是复选框，直接去选中
          var bIsOldCheck = oParentNode.isInitCheck;
          if (oParentNode.isInitCheck == false) {
            return;
          } else {
            oParentNode.isInitCheck = false;
            if (!bIsNotExpand) {
              this._removearrSelectNodes(oParentNode);
            }
          }
          //级联的判断父元素
          if (bIsOldCheck) {
            this._unCheckParentNodeRecussion(oParentNode, bIsNotExpand);
          }
        } else if (oParentNode.hasRadiobox) {
          //父元素是单选框，子元素全部去选中时父元素才去选中
          var bIsCheckExists = false;
          for (var i = 0; i < oParentNode.children.length; i++) {
            var oChildNode = oParentNode.children[i];
            if (oChildNode.isInitCheck == true) {
              bIsCheckExists = true;
              break;
            }
          }
          if (bIsCheckExists) {
            oParentNode.isInitCheck = true;
            if (!bIsNotExpand) {
              this._upsertarrSelectNodes(oParentNode);
            }
          } else {
            oParentNode.isInitCheck = false;
            if (!bIsNotExpand) {
              this._removearrSelectNodes(oParentNode);
            }
          }
        }
      },
      _checkBrothersNodeRecussion: function (oTreeNodeOuter, bIsNotExpand) {
        if (oTreeNodeOuter.parentId == -1) {
          return;
        }
        var oParentNode = this.mapNode[oTreeNodeOuter.parentId];
        for (var i = 0; i < oParentNode.children.length; i++) {
          var oChildNode = oParentNode.children[i];
          if (oChildNode.id != oTreeNodeOuter.id) {
            oChildNode.isInitCheck = false;
            if (!bIsNotExpand) {
              this._removearrSelectNodes(oChildNode);
            }
            this._unCheckChildrenNodeRecussion(oChildNode, bIsNotExpand);
          }
        }
      },
      onExpandOrNotTreeNode: function (bIsExpand, oTreeNodeEx) {
        var oTreeNode = this.mapNode[oTreeNodeEx.id];
        oTreeNode.isInitExpand = bIsExpand;
      },
      onExpandOrNotAllTreeNode: function (bIsExpand) {
        for (var id in this.mapNode) {
          var oTreeNode = this.mapNode[id];
          oTreeNode.isInitExpand = bIsExpand;
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
            this._calcRows4Show()
          } else {
            this.curPageIndex = 1;
          }
        }
      },
      //重置当前分页的index
      _resetCurPage() {
        if (this.hasFoot && !this.dynamicPaging) {
          this.$refs.ref4Paging.resetCurPageIndex();
        }
      },
      _calcRows4Show() {
        if (this.dynamicPaging) {
          this.rowsInPage = this.treeNodesInner.slice(0);
        } else {
          //1.calc this.skip
          this.skip = (this.curPageIndex - 1) * this.limitInner;

          //2.calc this.rowsInPage
          var iTmpRowCount = this.curPageIndex * this.limitInner;
          if (iTmpRowCount <= this.treeNodesInner.length) {
            this.rowsInPage = this.treeNodesInner.slice(this.skip, this.skip + this.limitInner);
          } else {
            this.rowsInPage = this.treeNodesInner.slice(this.skip, this.treeNodesInner.length);
          }
        }
      },
      onIconClick: function (nodeItemInner, oIcon) {
        this.callback4OnIconClick(nodeItemInner, oIcon);
      },
      _removearrSelectNodes: function (oTreeNode) {
        if (oTreeNode.isLeafNode) {
          for (var i = 0; i < this.arrSelectNodes.length; i++) {
            var iSelectcNodeId = this.arrSelectNodes[i].id;
            if (oTreeNode.id == iSelectcNodeId) {
              this.arrSelectNodes.splice(i, 1);
              break;
            }
          }
        }
      },
      _upsertarrSelectNodes: function (oTreeNode) {
        if (oTreeNode.isLeafNode) {
          var bIsExists = false;
          for (var i = 0; i < this.arrSelectNodes.length; i++) {
            var iSelectcNodeId = this.arrSelectNodes[i].id;
            if (oTreeNode.id == iSelectcNodeId) {
              bIsExists = true;
              break;
            }
          }

          if (!bIsExists) {
            this.arrSelectNodes.push(oTreeNode);
          }
        }
      },

      //#endregion
      //#region callback

      callback4OnIconClick: function (nodeItemInner, oIcon) {
        this.$emit("onIconClick", nodeItemInner, oIcon);
      },
      callback4OnPerPageNumChange: function (perPageNum) {
        this.$emit("onPerPageNumChange", perPageNum);
      },
      callback4OnPageChange: function (iPage, perPageNum) {
        this.$emit("onPageChange", iPage, perPageNum);
      },
      callback4OnCheckOrUnCheck: function (isCheck, oCurrTreeNode) {
        this.$emit("onCheckOrUnCheck", isCheck, oCurrTreeNode);
      },

      //#endregion
      //#region 3rd
      setNodeCheckedByIds: function (arrNodeIds) {
        for (var i = 0; i < arrNodeIds.length; i++) {
          var id = arrNodeIds[i];
          var oTreeNode = this.mapNode[id];
          oTreeNode.isInitCheck = true;
          this._upsertarrSelectNodes(oTreeNode);
        }
      },
      //重置当前分页的index
      resetCurPage() {
        if (this.hasFoot) {
          this.$refs.ref4Paging.resetCurPageIndex();
        }
      },
      getSelectNodes: function () {
        return this.arrSelectNodes;
      },
      clearSelectNodes: function () {
        this.arrSelectNodes = [];
      },
      hideNodeByIds: function (arrNodeIds) {
        this.setNodeDisplayByIds(arrNodeIds, false);
      },
      showNodeByIds: function (arrNodeIds) {
        this.setNodeDisplayByIds(arrNodeIds, true);
      },
      setNodeDisplayByIds: function (arrNodeIds, isShow) {
        if (arrNodeIds == undefined || arrNodeIds == null) {
          return;
        }
        for (var i = 0; i < arrNodeIds.length; i++) {
          var strNodeId = arrNodeIds[i];
          var oTreeNode = this.mapNode[strNodeId];
          if (oTreeNode) {
            oTreeNode.isShow = isShow;
          }
        }
      },

      //#endregion
    },
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .marvelGridWrapper {
    border: 1px solid #f0f0f0;
  }

  .gridWrapper {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .gridWrapper table thead {
    height: 100%;
    border-bottom: 3px solid #cccccc;
  }

  .gridCont {
    width: 100%;
    height: 100%;
    display: block;
    box-sizing: border-box;
    position: relative;
  }

  .headWrapper {
    height: 32px;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .bodyWrapper {
    height: calc(100% - 32px);
    width: 100%;
    position: relative;
    overflow: auto;
  }

  .footWrapper {
    height: 32px;
    padding: 4px;
    box-sizing: border-box;
    text-align: center;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .footWrapper .foot {
    display: inline-block;
    overflow: hidden;
    height: 100%;
  }

  .footWrapper .foot .pageSwitch {
    float: left;
  }

  .footWrapper .foot .pageSwitch .item {
    height: 100%;
    float: left;
    line-height: 26px;
    color: #666;
    padding: 0 4px;
    font-size: 12px;
    cursor: pointer;
  }

  .footWrapper .foot .pageSwitch .item:hover {
    color: #fff;
    background-color: #60b0ff;
  }

  .footWrapper .foot .pageSwitch .current {
    color: #fff;
    background-color: #3399ff !important;
  }

  table {
    position: relative;
  }

  table thead{
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  tbody {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

</style>
