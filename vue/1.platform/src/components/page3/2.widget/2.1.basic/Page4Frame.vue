<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">栅格</div>
    <div class="describe">
      栅格
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">栅格</div>
    <div class="describe">
      栅格
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div ref="parent" class="page4Frame hasMargin">
              <marvel-primary-button size="small" label="setItemNum(20)"
                                     v-on:onClick="setItemNum(20)"></marvel-primary-button>
              <marvel-primary-button size="small" label="setItemNum(8)"
                                     v-on:onClick="setItemNum(8)"></marvel-primary-button>
              <marvel-primary-button size="small" label="setItemNum(3)"
                                     v-on:onClick="setItemNum(3)" style="clear:both;"></marvel-primary-button>
              <marvel-frame ref="pageframe"></marvel-frame>
              <div v-for="(oBlock, index) in blockItems"
                   :class="itemStyle"
                   style="background-color: #d5d5d5; height: 32px;margin-bottom: 10px;" >{{index}}</div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="html">
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
  import MarvelFrame from '@/walle/widget/frame/MarvelFrame';
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelPrimaryButton from "../../../../walle/widget/button/MarvelPrimaryButton";

  export default {
    name: 'page4Frame',
    components: {
      MarvelPrimaryButton,
      MarvelFrame,
      MarvelTab,
      MarvelTabItem
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
        //#region frame
        blockItems:[],
        itemStyle:"",
        //#endregion
      }
    },
    methods:{

      //#region inner

      setItemNum: function (iNum) {
        this.blockItems = [];
        this.$nextTick(function () {
          for(var i = 0; i< iNum; i++){
            this.blockItems.push({
              item: i
            });
          }
        });

        var strParentW = parseInt(this.$refs.parent.offsetWidth);
        this.itemStyle = this.$refs.pageframe.getItemWAdaptToFixParent(iNum, 200, strParentW);
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
  .classCustom1{
    height:20px;
    background-color: #e8e8e8;
    margin-bottom: 10px;
  }
  .classCustom2{
    height:50px;
    background-color: #f7b57c;
    margin-bottom: 10px;
  }
  .classCustom3{
    height:20px;
    background-color: #5eff68;
    margin-bottom: 10px;
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
