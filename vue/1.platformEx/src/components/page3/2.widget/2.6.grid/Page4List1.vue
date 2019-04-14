<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">List</div>
    <div class="describe">
      List
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">List</div>
    <div class="describe">
      List
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <marvel-list1 :items="listItems" :bargeCount="listBargeCount"
                          v-on:onListItemClick="onListItemClick"></marvel-list1>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-list1 :items="listItems" :bargeCount="listBargeCount"
              v-on:onListItemClick="onListItemClick"&gt;&lt;/marvel-list1&gt;
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
  //#region fui
  import {MarvelTab, MarvelTabItem} from "marvel-fui2";
  import MarvelHight from "marvel-fui2/src/walle/component/highlight";
  import {MarvelList1} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4List1',
    components: {
      MarvelTabItem,
      MarvelTab,MarvelList1 },
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
        //#region custom data
        listItems: [{
          icon: "/static/walle/deviceIcon-04.png",
          devId: "110",
          devName: "11111111111111111111"
        }],
        listBargeCount: 0
        //#endregion
      }
    },
    mounted: function(){
      //#region custom
      for(var i=0;i<100;i++){
        this.listItems.push({
          icon: "/static/walle/deviceIcon-04.png",
          devId: i,
          devName: i
        });
      }
      this.bargeCount = this.listItems.length;
      //#endregion
    },
    methods:{
      //#region inner
      onListItemClick: function(oItem){
        this.items.splice(0,1);
        this.bargeCount = this.items.length;
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
  .widgetShowSession{
    padding: 20px 100px;
    width:100%;
    box-sizing: border-box;
  }
  .title{
    color: #4d4d4d;
  }
  .level1{
    font-size: 32px;
    line-height: 54px;
  }
  .level2{
    margin-top: 40px;
    font-size: 22px;
    line-height: 48px;
  }
  .describe{
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }
  .showArea{
    width:100%;
  }
  .codeArea{
    width: 100%;
    height:100%;
    background-color: #f0f0f0;
    overflow: auto;
  }
  .codeArea pre,.codeArea code{
    padding: 0;
    margin: 0;
    min-width: 100%;
    float: left;
  }
  .showAreaInner{
    padding-top: 36px;
    box-sizing: border-box;
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
    background-color: rgba(0,0,0,0.4);
  }
  /*document fix  style end*/
  /*document custom style start*/
  .showArea{
    height:250px;
  }
  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/
</style>
