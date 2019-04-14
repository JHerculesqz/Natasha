<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">选择类控件</div>
    <div class="describe">
      选择类控件
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">Radio Box</div>
    <div class="describe">
      单选框
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="onClick4Radio">getStatus</button>
            <br>
            <marvel-radio-box ref="ref0" id="id1" group="group1"
                              label="x1" showLabel="false"></marvel-radio-box>
            <marvel-radio-box ref="ref1" id="id2" group="group1"
                              label="x2" showLabel="true" v-on:onChange="onChange4Radio"></marvel-radio-box>
            <br>
            <marvel-radio-box ref="ref2" id="id3" group="group2"
                              label="x3" showLabel="true"></marvel-radio-box>
            <marvel-radio-box ref="ref3" id="id4" group="group2"
                              label="x4" showLabel="true"></marvel-radio-box>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;button v-on:click="onClick4Radio"&gt;getStatus&lt;/button&gt;
&lt;br&gt;
&lt;marvel-radio-box ref="ref0" id="id1" group="group1"
                  label="x1" showLabel="false"&gt;&lt;/marvel-radio-box&gt;
&lt;marvel-radio-box ref="ref1" id="id2" group="group1"
                  label="x2" showLabel="true" v-on:onChange="onChange4Radio"&gt;&lt;/marvel-radio-box&gt;
&lt;br&gt;
&lt;marvel-radio-box ref="ref2" id="id3" group="group2"
                  label="x3" showLabel="true"&gt;&lt;/marvel-radio-box&gt;
&lt;marvel-radio-box ref="ref3" id="id4" group="group2"
                  label="x4" showLabel="true"&gt;&lt;/marvel-radio-box&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--2级 start-->
    <div class="title level2">Switch</div>
    <div class="describe">
      Switch开关
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="onClick4Switch">getStatus</button>
            <br>
            <marvel-switch ref="ref4" id="id5" :check="false"></marvel-switch>
            <marvel-switch ref="ref5" id="id6"
                           buObj="buObj..."
                           v-on:onChange="onChange4Switch"></marvel-switch>
            <br>
            <marvel-switch ref="ref6" id="id7"></marvel-switch>
            <marvel-switch ref="ref7" id="id8"></marvel-switch>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;button v-on:click="onClick4Switch"&gt;getStatus&lt;/button&gt;
&lt;br&gt;
&lt;marvel-switch ref="ref4" id="id5" :check="false"&gt;&lt;/marvel-switch&gt;
&lt;marvel-switch ref="ref5" id="id6" buObj="buObj..."
               v-on:onChange="onChange4Switch"&gt;&lt;/marvel-switch&gt;
&lt;br&gt;
&lt;marvel-switch ref="ref6" id="id7"&gt;&lt;/marvel-switch&gt;
&lt;marvel-switch ref="ref7" id="id8"&gt;&lt;/marvel-switch&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--2级 start-->
    <div class="title level2">CheckBox</div>
    <div class="describe">
      CheckBox
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems3">
        <marvel-tab-item :isActive="tabItems3[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="onClick4Check">getStatus</button>
            <br>
            <marvel-check-box ref="ref8" id="id9"
                              label="x1" showLabel="false"></marvel-check-box>
            <marvel-check-box ref="ref9" id="id10"
                              label="x2" showLabel="true"
                              buObj="buObj..."
                              v-bind:check="true"
                              v-on:onChange="onChange4Check"></marvel-check-box>
            <br>
            <marvel-check-box ref="ref10" id="id11"
                              label="x3" showLabel="true"></marvel-check-box>
            <marvel-check-box ref="ref11" id="id12"
                              label="x4" showLabel="true"></marvel-check-box>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems3[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;button v-on:click="onClick4Check"&gt;getStatus&lt;/button&gt;
&lt;br&gt;
&lt;marvel-check-box ref="ref8" id="id9"
                  label="x1" showLabel="false"&gt;&lt;/marvel-check-box&gt;
&lt;marvel-check-box ref="ref9" id="id10" buObj="buObj..." v-bind:check="true"
                  label="x2" showLabel="true"
                  v-on:onChange="onChange4Check"&gt;&lt;/marvel-check-box&gt;
&lt;br&gt;
&lt;marvel-check-box ref="ref10" id="id11"
                  label="x3" showLabel="true"&gt;&lt;/marvel-check-box&gt;
&lt;marvel-check-box ref="ref11" id="id12"
                  label="x4" showLabel="true"&gt;&lt;/marvel-check-box&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--2级 start-->
    <div class="title level2">Select Card</div>
    <div class="describe">
      Select Card
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems4">
        <marvel-tab-item :isActive="tabItems4[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="onClick4SelectCard">获取</button><br>
            <marvel-select-card ref="ref12" :items="items" size="mini"></marvel-select-card>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems4[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;button v-on:click="onClick4SelectCard"&gt;获取&lt;/button&gt;&lt;br&gt;
&lt;marvel-select-card ref="ref12" :items="items" size="mini"&gt;&lt;/marvel-select-card&gt;
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
  import MarvelRadioBox from "@/walle/widget/select/MarvelRadioBox";
  import MarvelSwitch from "@/walle/widget/select/MarvelSwitch";
  import MarvelCheckBox from "@/walle/widget/select/MarvelCheckBox";
  import MarvelSelectCard from "@/walle/widget/select/MarvelSelectCard";

  export default {
    name: 'page4RadioBox',
    components: {
      MarvelTabItem,
      MarvelTab,
      MarvelSelectCard,
      MarvelCheckBox,
      MarvelRadioBox, MarvelSwitch},
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
        tabItems4: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        group1: '',
        group2: '',
        items: ["100M", "200M", "300M", "400M"]
        //#endregion
      }
    },
    mounted: function(){
      //#region custom
      //1.
      this.$refs.ref0.setStatus(false, false);
      this.$refs.ref1.setStatus(true, false);
      this.$refs.ref2.setStatus(false, true);
      this.$refs.ref3.setStatus(true, true);
      //2.
//      this.$refs.ref4.setStatus(false, false);
      this.$refs.ref5.setStatus(true, false);
      this.$refs.ref6.setStatus(false, true);
      this.$refs.ref7.setStatus(true, true);
      //3.
      this.$refs.ref8.setStatus(false, false);
//      this.$refs.ref9.setStatus(true, false);
      this.$refs.ref10.setStatus(false, true);
      this.$refs.ref11.setStatus(true, true);
      //#endregion
    },
    methods: {
      //#region inner
      onClick4Radio: function(){
        console.log("[Radio]getStatus..." +
          this.$refs.ref0.getCheckItem() + "," +
          this.$refs.ref1.getCheckItem());
      },
      onChange4Radio: function(strOldVal, strNewVal){
        console.log("[Radio]change..." + strNewVal);
      },
      onClick4Switch: function () {
        console.log("[Switch]getStatus..." +
          this.$refs.ref4.getCheckItem() + "," +
          this.$refs.ref5.getCheckItem());
      },
      onChange4Switch: function(strOldVal, strNewVal, buObj){
        console.log("[Switch]change..." + strNewVal + "," + buObj);
      },
      onClick4Check: function(){
        console.log("[CheckBox]getStatus..." +
          this.$refs.ref8.getCheckItem() + "," +
          this.$refs.ref9.getCheckItem());
      },
      onChange4Check: function(strOldVal, strNewVal, oBuObj){
        console.log("[CheckBox]change..." + strNewVal + "," + oBuObj);
      },
      onClick4SelectCard: function(){
        console.log("[SelectCard]..." + this.$refs.ref12.getSelectItem());
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

  /*region dark theme*/

  .dark .title {
    color: #ffffff;
  }
  .dark .describe {
    color: #8b90b3;
  }

  /*endregion*/
</style>
