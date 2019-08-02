<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelTopoArbor</div>
    <div class="describe">
      界面框架
    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 800px; height: 400px;">
              <marvel-topo-arbor ref="ref4TopoArbor"
                                 id="ref4TopoArbor"
                                 theme="dark">
              </marvel-topo-arbor>
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
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelTopoArbor.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTopoArbor from "^/widget/topo/MarvelTopoArbor";
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelTopoArbor',
    components: {
      MarvelTopoArbor,
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

        this.initTopoArbor();
      },

      //#endregion

      initTopoArbor: function () {
        //init
        this.$refs.ref4TopoArbor.init(function (e) {
          console.log(e);
        });

        //setData
        var N = 100;
        var TYPES = ["container", "list", "key", "description", "leaf", "type", "leaf-list"];
        var arrNodes = [];
        for (var i = 0; i < N; i++) {
          arrNodes.push({
            id: 'n' + i,
            label: 'Node ' + i,
            x: Math.random(),
            y: Math.random(),
            size: 0 == i ? 3 : 1.2,
            type: TYPES[(Math.random() * 6 | 0)]
          });
        }
        var arrLinks = [];
        for (var i = 0; i < N; i++) {
          arrLinks.push({
            id: 'e' + i,
            source: 'n' + (Math.random() * N | 0),
            target: 'n' + (Math.random() * N | 0)
          });
        }
        this.$refs.ref4TopoArbor.setData(arrNodes, arrLinks);

        //updateData
        this.$refs.ref4TopoArbor.updateData(function (oNode) {
          if (oNode.type == "container") {
            oNode.color = "#243f6a";
          }
          else if (oNode.type == "list") {
            oNode.color = "#487ed4";
          }
          else if (oNode.type == "key") {
            oNode.color = "#6cbe3f";
          }
          else if (oNode.type == "description") {
            oNode.color = "#90fda9";
          }
          else if (oNode.type == "leaf") {
            oNode.color = "#b53d13";
          }
          else if (oNode.type == "type") {
            oNode.color = "#d97c7e";
          }
          else if (oNode.type == "leaf-list") {
            oNode.color = "#fdbbe8";
          }
        });
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
