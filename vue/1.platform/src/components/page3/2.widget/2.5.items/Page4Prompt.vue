<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">提示</div>
    <div class="describe">
      提示信息
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">Div提示（局部）</div>
    <div class="describe">
      提示信息，分为"info"，"tip"，"error"三个级别，面板在10s之后自动消失。
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width:100%; height: 100%;">
              <div class="panel">
                <MarvelPrompt :status="items[0].status" :content="items[0].content"></MarvelPrompt>
              </div>
              <div class="panel">
                <MarvelPrompt :status="items[1].status" :content="items[1].content"></MarvelPrompt>
              </div>
              <div class="panel">
                <MarvelPrompt :status="items[2].status" :content="items[2].content"></MarvelPrompt>
              </div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="html">
                  &lt;MarvelPrompt :status="status" :content="content"&gt;&lt;/MarvelPrompt&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--2级 start-->
    <div class="title level2">Div提示（全局）</div>
    <div class="describe">
      提示信息，分为"info"，"tip"，"error"三个级别，面板在10s之后自动消失。
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click="onClickAddError">添加一条错误提示</button>
            <button v-on:click="onClickAddWarning">添加一条警告提示</button>
            <button v-on:click="onClickAddTip">添加一条普通提示</button>
            <MarvelPromptGlobal :oPrompts="oGlobalPrompts"></MarvelPromptGlobal>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
              <pre>
                <code class="html">
                  &lt;MarvelPromptGlobal :oPrompts="oGlobalPrompts"&gt;&lt;/MarvelPromptGlobal&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--2级 start-->
    <div class="title level2">用户消息提示</div>
    <div class="describe">
      用户消息提示
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems3">
        <marvel-tab-item :isActive="tabItems3[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width:100%; height: 100%;">
              <button v-on:click="onClick">设置</button>
              <marvel-prompt-ex ref="ref0"
                                label="用户日志"
                                icon="icon-mail4"></marvel-prompt-ex>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems3[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
                  &lt;MarvelPrompt :status="status" :content="content"&gt;&lt;/MarvelPrompt&gt;
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
  import MarvelPrompt from '@/walle/widget/prompt/MarvelPrompt'
  import MarvelTab from "@/walle/widget/tab/MarvelTab"
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem"
  import MarvelPromptEx from "@/walle/widget/prompt/MarvelPromptEx";
  import MarvelPromptGlobal from "@/walle/widget/prompt/MarvelPromptGlobal";

  export default {
    components: {
      MarvelPromptEx,
      MarvelPrompt,
      MarvelTab,
      MarvelTabItem,
      MarvelPromptGlobal
    },
    name: 'page4MenuDropDown',
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
        //#endregion
        //#region Custom data
        items: [
          {
            status: '0',
            content: '中华人民共和国解放了'
          },
          {
            status: '1',
            content: 'xxx共和国快倒闭了'
          },
          {
            status: '2',
            content: 'xxx共和国倒闭了，xxx共和国倒闭了，xxx共和国倒闭了, xxx共和国倒闭了'
          }
        ],
        hasNotify: false,
        oGlobalPrompts:[]
        //#endregion
      };
    },
    methods: {
      onClick: function () {
        this.hasNotify = !this.hasNotify;
        this.$refs.ref0.setNotify(this.hasNotify);
      },
      onClickAddError:function(){
        this.oGlobalPrompts.push({
          status: '2',
          content: '中华人民共和国解放了'
        });
      },
      onClickAddWarning:function(){
        this.oGlobalPrompts.push({
          status: '1',
          content: 'xxx共和国快倒闭了'
        });
      },
      onClickAddTip:function(){
        this.oGlobalPrompts.push({
          status: '0',
          content: 'xxx共和国倒闭了，xxx共和国倒闭了，xxx共和国倒闭了, xxx共和国倒闭了'
        });
      }
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
  .level2 {
    margin-top: 40px;
    font-size: 22px;
    line-height: 48px;
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
  /*document fix style end*/
  /*document custom style start*/
  .showArea {
    width: 100%;
    height: 500px;
  }
  /*document custom style end*/
  /*custom style start*/
  .panel {
    margin-top: 10px;
    margin-left: 10px;
    marign-bottom: 10px;
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
