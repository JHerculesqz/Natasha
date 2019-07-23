<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">工作流向导MOP</div>
    <div class="describe">
      工作流向导MOP
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">工作流向导MOP</div>
    <div class="describe">
      工作流向导MOP
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner" style="height: 100%;">
            <!--2级DemoView start-->
            <div style="width:100%; height: 100%;">
              <marvel-grid-tree :hasFoot="false"
                                ref="ref4MarvelGridTree"
                                :titles="titles4GridTree"
                                :treeNodes="treeNodes"
                                :dynamicPaging="false"
                                :isTree="false"
                                @onIconClick="onIconClick"></marvel-grid-tree>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->

            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelGridTree from "~~/widget/grid/MarvelGridTree";

  export default {
    name: 'page4WorkFlowMop',
    components: {
      MarvelGridTree,
      MarvelTab,
      MarvelTabItem,
    },
    data: function() {
      return {
        //#region document data
        tabItems1: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
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
          width:"150px",
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
          width:"150px",
          type:"text",
          visible: true,
        },{
          key:"state",
          label:"State",
          width:"150px",
          type:"text",
          visible: true,
        },{
          key:"skip",
          label:"Skip",
          width:"150px",
          type:"icon",
          visible: true,
        },{
          key:"pause",
          label:"Pause",
          width:"150px",
          type:"icon",
          visible: true,
        },{
          key:"viewdetails",
          label:"View Details",
          width:"150px",
          type:"icon",
          visible: true,
        }],
        treeNodes:[],
        //#endregion
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods:{
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.treeNodes = [];
        for(var i = 0; i< 2;i++){
          var oNode={
            id:i,
            no:i,
            operation:"operation" + i,
            operationobj:"operationObj" + i,
            progress:i + "%",
            state:"ing...",
            skip:[{
              title:"跳过",
              value:"icon-forward2"
            }],
            pause:[{
              title:"暂停",
              value:"icon-pause"
            }],
            viewdetails:[{
              title:"查看详情",
              value:"icon-file-text2"
            }],
            children:[],
            nodeLevel:1,
            hasCheckbox: false,
            hasRadiobox: false,
            isInitCheck: false,
            isInitExpand: true,
            isLeafNode: false
          };
          for(var j = 0; j<2;j++){
            var oNodeChild = {
              id:oNode.id + "_" + j,
              no:oNode.id + "_" + j,
              operation:"operation" + oNode.id + "_" + j,
              operationobj:"operationObj" + oNode.id + "_" + j,
              progress:j + "%",
              state:"ing...",
              skip:[{
                title:"跳过",
                value:"icon-forward2"
              }],
              pause:[{
                title:"暂停",
                value:"icon-pause"
              }],
              viewdetails:[{
                title:"查看详情",
                value:"icon-file-text2"
              }],
              children:[],
              nodeLevel:1,
              hasCheckbox: false,
              hasRadiobox: false,
              isInitCheck: false,
              isInitExpand: true,
              isLeafNode: false
            };
            oNode.children.push(oNodeChild);
            for(var k = 0; k<2;k++){
              var oNodeChildEx = {
                id:oNodeChild.id + "_" + k,
                no:oNodeChild.id + "_" + k,
                operation:"operation" + oNodeChild.id + "_" + k,
                operationobj:"operationObj" + oNodeChild.id + "_" + k,
                progress:k + "%",
                state:"ing...",
                skip:[{
                  title:"跳过",
                  value:"icon-forward2"
                }],
                pause:[{
                  title:"暂停",
                  value:"icon-pause"
                }],
                viewdetails:[{
                  title:"查看详情",
                  value:"icon-file-text2"
                }],
                children:[],
                nodeLevel:1,
                hasCheckbox: false,
                hasRadiobox: false,
                isInitCheck: false,
                isInitExpand: true,
                isLeafNode: false
              };
              oNodeChild.children.push(oNodeChildEx);
            }
          }
          this.treeNodes.push(oNode);
        }
      },

      //#endregion
      onIconClick:function (oRow, oCell) {
        console.log(oRow);
        console.log(oCell);
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
  /*document fix style start*/
  .widgetShowSession {
    padding: 20px 100px;
    width: 100%;
    box-sizing: border-box;
  }
  .title {
    color: #4d4d4d;
  }
  .level1 {
    font-size: 32px;
    line-height: 54px;
  }
  .describe {
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }
  .codeArea {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: auto;
  }
  .codeArea pre, .codeArea code {
    padding: 0;
    margin: 0;
    min-width: 100%;
    float: left;
  }
  .showAreaInner {
    padding-top: 36px;
    box-sizing: border-box;
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
    background-color: rgba(0, 0, 0, 0.4);
  }
  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    width: 100%;
    height: 400px;
  }
  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/

  /*region dark theme*/

  .dark .title {
    color: #ffffff;
  }
  .dark .describe {
    color: #8b90b3;
  }

  /*endregion*/
</style>
