<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">Fold Panel Group</div>
    <div class="describe">
      Fold Panel Group
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">Fold Panel Group</div>
    <div class="describe">
      Fold Panel Group
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <marvel-fold-panel
                   :item="foldPanel[0]" class="customClass" v-on:onTitleClick="onTitleClick">
              <slot>aa</slot>
            </marvel-fold-panel>
            <marvel-fold-panel
                   :item="foldPanel[1]" class="customClass" v-on:onTitleClick="onTitleClick">
              <slot>bb</slot>
            </marvel-fold-panel>
            <marvel-fold-panel
                   :item="foldPanel[2]" class="customClass" v-on:onTitleClick="onTitleClick">
              <slot>cc</slot>
            </marvel-fold-panel>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
                  &lt;button v-on:click="onClickDialogShow"&gt;show&lt;/button&gt;
                  &lt;marvel-dialog :showDialog="showDialog"
                  title="上传" width="500" height="300"
                  v-on:onClickDialogClose="onClickDialogClose"&gt;
                  &lt;div slot="dialogCont"&gt;111111&lt;/div&gt;
                  &lt;div slot="dialogFoot"&gt;

                  &lt;/div&gt;
                  &lt;/marvel-dialog&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
  </div>
</template>

<script>
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelHight from "@/walle/component/highlight";
  import MarvelFoldPanel from "@/walle/widget/foldPanel/MarvelFoldPanel";

  export default {
    name: 'page4FoldPanel',
    components: {
      MarvelTab,
      MarvelTabItem,
      MarvelHight,
      MarvelFoldPanel
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
        foldPanel:[{
          name:"aaa",
          height:"calc(100% - 84px)",
          bIsExpand:true
        },{
          name:"bbb",
          height:"300px",
          bIsExpand:false
        },{
          name:"ccc",
          height:"100%",
          bIsExpand:false
        }]
        //#endregion
      }
    },
    mounted: function () {
      //#region custom

      //#endregion
    },
    methods: {
      //#region inner
      onTitleClick:function(oItem, bIsExpand){
        console.log(oItem);
        console.log(bIsExpand);
        for(var i=0;i<this.foldPanel.length;i++){
          if(this.foldPanel[i].name != oItem.name){
            this.foldPanel[i].bIsExpand = false;
          }
        }
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
    height: 100%;
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
  .customClass{
    margin-bottom: 10px;
  }
  .customClass:last-child{
    margin-bottom: 0;
  }
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
