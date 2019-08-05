<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelGridTree</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 100%; height: 350px">
              <marvel-grid-tree :hasFoot="false"
                                ref="ref4MarvelGridTree"
                                :titles="titles"
                                :treeNodes="treeNodes"
                                :dynamicPaging="false"
                                :isTree="false"
                                @onIconClick="_onIconClick"></marvel-grid-tree>
            </div>

            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="width: 100%; height: 350px">
              <marvel-grid-tree :hasFoot="false"
                                ref="ref4MarvelGridTree"
                                :titles="titles"
                                :treeNodes="treeNodes"
                                :dynamicPaging="false"
                                :isTree="false"
                                @onIconClick="_onIconClick"></marvel-grid-tree>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelGridTreeIFrame" id="page4MarvelGridTreeIFrame" src="static/jsdoc/module-MarvelGridTree.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelGridTree from "~~/widget/grid/MarvelGridTree";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelGridTree',
    components: {
      MarvelGridTree,
      MarvelIFrame,
      MarvelAceEditor,
      MarvelTab,
      MarvelTabItem,
    },
    data: function () {
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
        //#region custom data
        titles: [{
          key:"name",
          label:"名字",
          width:"300px",
          type:"text",
          visible:true,
          isTreeNodeCell:true,
        },{
          key:"sex",
          label:"性别",
          width:"300px",
          type:"text",
          visible:true,
        },{
          key:"age",
          label:"年龄",
          width:"300px",
          type:"text",
          visible:true,
        },{
          key:"operate",
          label:"操作",
          width:"300px",
          type:"icon",
          visible:true,
        }],
        treeNodes: [],
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
        this.$refs.page4MarvelGridTreeIFrame.setIframe4DemoPage();

        this.treeNodes=[];
        for(var i = 0; i<2; i++){
          var oNode = {
            id:"L0_"+i,
            name:"L0_"+i,
            age:22,
            sex:"M",
            operate:[{
              title:"title1",
              value:"icon-pencil"
            },{
              title:"title2",
              value:"icon-bin"
            }],
            children:[],
            nodeLevel:1,
            hasCheckbox: false,
            hasRadiobox: false,
            isInitCheck:false,
            isInitExpand:true,
            idLeafNode:false
          };
          for(var j = 0; j<2; j++){
            var oNodeChild = {
              id:oNode.name + "_" +j,
              name:oNode.name + "_" +j,
              age:22,
              sex:"W",
              operate:[{
                title:"title1",
                value:"icon-pencil"
              },{
                title:"title2",
                value:"icon-bin"
              }],
              children:[],
              nodeLevel:2,
              hasCheckbox: false,
              hasRadiobox: false,
              isInitCheck:false,
              isInitExpand:true,
              idLeafNode:false
            };
            oNode.children.push(oNodeChild);
            for(var k = 0; k<2; k++){
              var oNodeChildrenEx = {
                id:oNodeChild.name + "_" +k,
                name:oNodeChild.name + "_" +k,
                age:22,
                sex:"M",
                operate:[{
                  title:"title1",
                  value:"icon-pencil"
                },{
                  title:"title2",
                  value:"icon-bin"
                }],
                children:[],
                nodeLevel:3,
                hasCheckbox: false,
                hasRadiobox: false,
                isInitCheck:false,
                isInitExpand:true,
                idLeafNode:true
              };
              oNodeChild.children.push(oNodeChildrenEx);
            }
          }
          this.treeNodes.push(oNode)
        }
      },

      //#endregion

      _onIconClick: function (oRow, oCell) {
        console.log(oRow);
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

  .showAreaInner {
    box-sizing: border-box;
  }

  .docArea{
    width: 100%;
  }

  .docArea iframe{
    width: 100%;
    height: 100%;
    border: none;
  }

  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
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
