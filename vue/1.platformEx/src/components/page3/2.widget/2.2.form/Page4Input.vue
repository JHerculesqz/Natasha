<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">输入框</div>
    <div class="describe">
      输入框控件，支持正常输入、错误提示、禁用等功能。
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">正常输入</div>
    <div class="describe">
      正常输入，可以获取用户输入的信息
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width:200px;">
              <button v-on:click="onClick4Input1">获取</button>
              <marvel-input ref="ref0" :status="status1" placeHolder="please..." errMsg="输入错误..."
                            :inputMsg="inputMsg" theme="dark" size="mini"></marvel-input>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="html">
&lt;marvel-input ref="ref0" :status="status1" placeHolder="please..." errMsg="输入错误..." :inputMsg = "inputMsg" theme="dark" size="mini"&gt;&lt;/marvel-input&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">错误提示</div>
    <div class="describe">
      当判断输入信息非法或者错误时，可以提示错误。
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width:200px;">
              <button v-on:click="onClick4Input2">触发错误</button>
              <marvel-input :status="status2" placeHolder="please..." errMsg="输入错误..."></marvel-input>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="html">
&lt;marvel-input :status="status2" placeHolder="please..." errMsg="输入错误..."&gt;&lt;/marvel-input&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">禁用</div>
    <div class="describe">
      将input框设置为禁用状态
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems3">
        <marvel-tab-item :isActive="tabItems3[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width:200px;">
              <button v-on:click="onClick4Input3">disable</button>
              <marvel-input :status="status3" placeHolder="please..." errMsg="输入错误..."></marvel-input>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems3[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="html">
&lt;marvel-input :status="status3" placeHolder="please..." errMsg="输入错误..."&gt;&lt;/marvel-input&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">多行文本框</div>
    <div class="describe">
      多行文本框
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems4">
        <marvel-tab-item :isActive="tabItems4[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width:200px;">
              <button v-on:click="onClick4Input4">获取</button>
              <marvel-multi-input ref="ref1" :status="status4" placeHolder="please..."
                                  :inputMsg="inputMsg2" theme="dark" size="mini">
              </marvel-multi-input>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems4[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-multi-input ref="ref1" :status="status4" placeHolder="please..."
                    :inputMsg="inputMsg2" theme="dark" size="mini"&gt;
&lt;/marvel-multi-input&gt;
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
  import {MarvelInput, MarvelMultiInput} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4Input',
    components: {
      MarvelMultiInput,
      MarvelInput,
      MarvelTab,
      MarvelTabItem
    },
    data: function () {
      return {
        //#region document data
        tabItems1: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        tabItems2: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        tabItems3: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        tabItems4: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        //#endregion
        //#region custom data
        inputMsg: "",
        status1: "",
        status2: "",
        status3: "",
        inputMsg2: "",
        status4: "",
        //#endregion
      }
    },
    methods: {
      //#region inner
      onClick4Input1: function () {
        console.log(this.$refs.ref0.getInputMsg());
      },
      onClick4Input2: function () {
        this.status2 = "error";
      },
      onClick4Input3: function () {
        this.status3 = "disable";
      },
      onClick4Input4: function () {
        console.log(this.$refs.ref1.getInputMsg());
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
