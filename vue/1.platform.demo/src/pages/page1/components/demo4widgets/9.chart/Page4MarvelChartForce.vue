<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelChartForce</div>
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
            <div style="width: 500px; height: 350px">
              <marvel-chart-force ref="ref9" id="id9" @onItemClick="onGraphForceItemClick"></marvel-chart-force>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='

            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelChartForce.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelChartForce from "^/widget/echart/MarvelChartForce";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelChartForce',
    components: {
      MarvelChartForce,
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
        graphForceData:{
          nodes:[{
            id:"n0",
            symbolSize:10,
            name:"this is n0",
            category:0,
            label:{
              show:true,
            },
            draggable:true
          },{
            id:"n1",
            symbolSize:5,
            name:"this is n1",
            category:1,
            label:{
              show:false,
            },
            draggable:true
          },{
            id:"n2",
            symbolSize:5,
            name:"this is n2",
            category:2,
            label:{
              show:true,
            },
            draggable:true
          }],
          links:[{
            id:"L1",
            source:"n0",
            target:"n1"
          },{
            id:"L2",
            source:"n0",
            target:"n2"
          }]
        },
        graphForceCategories:[{
          name:"类目1",
          itemStyle:{
            normal:{
              color:"#ff0000"
            }
          }
        },{
          name:"类目2",
          itemStyle:{
            normal:{
              color:"#00ff00"
            }
          }
        },{
          name:"类目3",
          itemStyle:{
            normal:{
              color:"#0000ff"
            }
          }
        }],
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
        this.$refs.IFrame.setIframe4DemoPage();

        this.$refs.ref9.setData(this.graphForceData, this.graphForceCategories, true);
      },

      //#endregion

      onGraphForceItemClick: function (params) {
        console.log(params);
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
