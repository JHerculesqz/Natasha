<template>
  <ul id="demo" class="treeWrapper">
    <div v-for="(item, index) in treeNodes" style="width: 100%;">
      <marvel-z-tree-item v-bind:model="item"
                          v-bind:key="item.key"
                          v-bind:treeItemOptions="treeItemOptions"
                          v-on:onCheckboxClick="onCheckboxClick"
                          v-on:onTreeNodeClick="onTreeNodeClick"
                          v-on:onTreeNodeDBClick="onTreeNodeDBClick"></marvel-z-tree-item>
    </div>
  </ul>
</template>

<script>
  import MarvelZTreeItem from "./MarvelZTreeItem";

  /**
   *  MarvelZTree widget description
   *  @vuedoc
   *  @exports MarvelZTree
   */
  export default {
    components: {
      MarvelZTreeItem
    },
    name: 'MarvelZTree',
    props: {
      treeData: {
        type: Array,
        default: undefined,
        required: true,
      },
      options: {
        type: Object,
        default: undefined,
        required: false,
      },
    },
    data: function () {
      return {
        //region zTreeItem
        treeNodes: [],
        treeItemOptions: {},
        //endregion
        //region inner
        treeMap: {}
        //endregion
      }
    },
    created() {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this._handleOptions();
        this._handleTreeData();
      },

      //#endregion

      _handleOptions() {
        Object.assign(this.treeItemOptions, {
          hasCheckbox: false,
          hasRadiobox: false,
          hasActiveStyle: false
        }, this.options);
      },
      _handleTreeData() {
        this.treeNodes = this.treeData.slice(0);
        this._setKey(this.treeNodes, "1");
      },
      _setKey(oTreeData, parentKey) {
        var self = this;
        oTreeData.forEach(function (oTreeNode, index) {
          //初始化必要的属性
          self._initProp(oTreeNode);

          //设置key值
          oTreeNode.key = parentKey + "-" + index;
          //save
          self.treeMap[oTreeNode.key] = oTreeNode;

          if (oTreeNode.children && oTreeNode.children.length) {
            self._setKey(oTreeNode.children, oTreeNode.key);
          }
        });
      },
      _initProp: function (oTreeNode) {
        if (oTreeNode.children && oTreeNode.children.length) {
          if (!oTreeNode.hasOwnProperty("bOpen")) {
            this.$set(oTreeNode, "bOpen", false);
          }
          this.$set(oTreeNode, "dc", oTreeNode.bOpen);
        }
        if (!oTreeNode.hasOwnProperty("bShow")) {
          this.$set(oTreeNode, "bShow", true);
        }
        if (!oTreeNode.hasOwnProperty("check")) {
          this.$set(oTreeNode, "check", false);
        }
        if (this.treeItemOptions.hasActiveStyle) {
          if (!oTreeNode.hasOwnProperty("active")) {
            this.$set(oTreeNode, "active", false);
          }
        }
        if (!oTreeNode.hasOwnProperty("iconColor")) {
          this.$set(oTreeNode, "iconColor", "");
        }
      },
      _handleParent4Arr: function (oTreeNode, arrRes) {
        var strParentKey = this._getParentKey(oTreeNode.key);
        if (strParentKey == "") {
          return [];
        }
        var oParentNode = this.treeMap[strParentKey];
        arrRes = this._handleParent4Arr(oParentNode, arrRes);
        if (oParentNode) {
          arrRes.push(oParentNode);
        }

        return arrRes;
      },
      onCheckboxClick: function (oTreeNode) {
        this._handle4TreeNodeClick(oTreeNode);
        this.callback4OnCheckboxClick(oTreeNode);
      },
      _handle4TreeNodeClick(oTreeNode) {
        //1.处理parent的check状态
        this._handleParent4Checkbox(oTreeNode);
        //2.处理children的check状态
        this._handleChild4Checkbox(oTreeNode);
      },
      _getParentKey(strChildKey) {
        var arr = strChildKey.split("-");
        arr.pop();
        if (arr.length == 1) {
          return "";
        }
        return arr.join("-");
      },
      _handleParent4Checkbox(oTreeNode) {
        var strParentKey = this._getParentKey(oTreeNode.key);
        if (strParentKey == "") {
          return;
        }
        var oParentNode = this.treeMap[strParentKey];
        if (oTreeNode.check) {
          oParentNode.check = true;
        } else {
          oParentNode.check = this._hasCheckedChild(oParentNode);
        }
        this._handleParent4Checkbox(oParentNode);
      },
      _hasCheckedChild(oParentNode) {
        if (oParentNode.children && oParentNode.children.length) {
          for (let i = 0, len = oParentNode.children.length; i < len; i++) {
            if (oParentNode.children[i].check) {
              return true;
            }
          }
        }
        return false;
      },
      _handleChild4Checkbox(oTreeNode) {
        if (oTreeNode.children && oTreeNode.children.length) {
          var self = this;
          oTreeNode.children.forEach(function (oChildNode, index) {
            oChildNode.check = oTreeNode.check;
            self._handleChild4Checkbox(oChildNode);
          });
        }
      },
      onTreeNodeClick: function (oTreeNode) {
        //1.setActiveStyle
        this._handle4ActiveStyle(oTreeNode);
        //2.emit
        this.callback4OnTreeNodeClick(oTreeNode);
      },
      onTreeNodeDBClick: function (oTreeNode) {
        this.callback4OnTreeNodeDBClick(oTreeNode);
      },
      _handle4ActiveStyle(oTreeNode) {
        if (this.treeItemOptions.hasActiveStyle) {
          for (let k in this.treeMap) {
            let val = this.treeMap[k];
            if (val.key !== oTreeNode.key) {
              val.active = false;
            } else {
              val.active = true;
            }
          }
        }
      },

      //#endregion
      //#region callback

      callback4OnCheckboxClick: function (oTreeNode) {
        this.$emit("onCheckboxClick", oTreeNode);
      },
      callback4OnTreeNodeClick: function (oTreeNode) {
        this.$emit("onTreeNodeClick", oTreeNode);
      },
      callback4OnTreeNodeDBClick: function (oTreeNode) {
        this.$emit("onTreeNodeDBClick", oTreeNode);
      },

      //#endregion
      //#region 3rd

      getCheckNodes() {
        var arrRes = [];
        for (let k in this.treeMap) {
          if (this.treeMap[k].check === true) {
            arrRes.push(this.treeMap[k]);
          }
        }
        return arrRes;
      },
      getCheckLeafNodes() {
        var arrRes = [];
        for (let k in this.treeMap) {
          if (this.treeMap[k].check === true) {
            if (!this.treeMap[k].hasOwnProperty("children")) {
              arrRes.push(this.treeMap[k]);
            }
          }
        }
        return arrRes;
      },
      getActiveNodes() {
        let activeNodes = [];
        if (this.treeItemOptions.hasActiveStyle) {
          for (let k in this.treeMap) {
            let val = this.treeMap[k];
            if (val.active === true) {
              activeNodes.push(val);
            }
          }
        }
        return activeNodes;
      },
      setActiveNode: function (arrNode) {
        if (this.treeItemOptions.hasActiveStyle) {
          var arrKey = [];
          for (var i = 0; i < arrNode.length; i++) {
            arrKey.push(arrNode[i].key);
          }
          for (let k in this.treeMap) {
            let val = this.treeMap[k];
            if (arrKey.length == 0) {
              val.active = false;
            } else {
              if (arrKey.indexOf(val.key) != -1) {
                val.active = true;
              } else {
                val.active = false;
              }
            }
          }
        }
      },
      getParentNodeArr: function (oTreeNode) {
        var arrRes = this._handleParent4Arr(oTreeNode, []);
        return arrRes;
      },
      getTreeNodes: function () {
        return this.treeNodes;
      },

      //#endregion
    },
    watch: {
      treeData: function (oNewTreeData, oOldTreeData) {
        this._handleTreeData();
      },
      options: function (oNewOptions, oOldOptions) {
        this._handleOptions();
        this._handleTreeData();
      }
    }
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
  .treeWrapper {
    width: 100%;
    height: 100%;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    margin: 0;
  }

  .dark .treeWrapper {
    border: 1px solid #8b90b3;
  }
</style>
