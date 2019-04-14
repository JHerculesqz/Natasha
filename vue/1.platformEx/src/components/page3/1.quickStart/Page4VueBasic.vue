<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">VueBasic</div>
    <div class="describe">
      VueBasic
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">VueBasic</div>
    <div class="describe">
      VueBasic
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 180px;height:100%">
              <p>Page1</p>
              <div id="jquery">{{ divHtml }}</div>
              <div v-text="vText"></div>
              <div v-html="vHtml"></div>
              <div v-bind:class="{ testClass: isTestClass}"></div>
              <div v-if="vIf">v-if</div>
              <ul>
                <li v-for="(item,index) in vFor">
                  <label v-on:click="doSth">{{index + 1}}.{{item.text}} </label>
                  <time>{{item.time | date}}</time>
                </li>
              </ul>
              <input type="text" v-model="vWatch"/>
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
  //#region fui
  import {MarvelTab, MarvelTabItem} from "marvel-fui2";
  import MarvelHight from "marvel-fui2/src/walle/component/highlight";
  import DateUtils from 'marvel-fui2/src/walle/component/date';
  import LogUtils from 'marvel-fui2/src/walle/component/log';
  //#endregion

  export default {
    components: {
      MarvelTabItem,
      MarvelTab},
    name: 'page4VueBasic',
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
        tabItems2: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems3: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        divHtml: 'divHtml',
        vText: 'vText',
        vHtml: '<h1>vHtml</h1>',
        isTestClass: true,
        vIf: false,
        vFor: [{
          text:"a1",
          time: Date.now()
        }, {
          text:"a2",
          time: Date.now()
        }],
        vWatch: "vWatch"
        //#endregion
      }
    },
    methods:{
      //#region inner
      doSth: function(){
        //v-html
        LogUtils.debug("Page1", "doSth", this.divHtml);
        //v-if
        this.vIf = true;
        //http
        this.$http.get('/').then(res=>{
          LogUtils.debug("Page1", "doSth", res.body);
        });
        //vuex
        LogUtils.debug("Page1", "doSth", this.$store.getters.a);
        this.$store.dispatch("action1");
        LogUtils.debug("Page1", "doSth", this.$store.getters.a);
        //jquery
        $("#jquery").html("jquery test...");
      }
      //#endregion
      //#region callback

      //#endregion
      //#region 3rd

      //#endregion
    },
    watch:{
      //#region custom
      'vWatch': function (strVal, strOldVal) {
        //watch
        LogUtils.debug("Page1", "vWatch", strVal + "," + strOldVal);
      }
      //#endregion
    },
    filters:{
      //#region custom
      date: function(strDate){
        //filters
        return DateUtils.calendar(strDate);
      }
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
</style>
