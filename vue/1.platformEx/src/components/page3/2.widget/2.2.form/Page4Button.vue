<template>
  <!--TODO:切换几次view就很慢，待定位-->
  <div>
    <div class="widgetShowSession">
      <!--1级 start-->
      <div class="title level1">Button</div>
      <div class="describe">
        Text button文本按钮、Text + icon button文本+图片按钮、Icon button图标按钮、纯文本按钮、Drop down button下拉按钮。
      </div>
      <!--1级 end-->
      <!--2级 start-->
      <div class="title level2">Important button</div>
      <div class="describe">
        文本按钮的一种，常用做强调重要或需要引起用户注意功能的按钮。其尺寸有大小之分，可根据使用场景选择合适尺寸。
      </div>
      <div class="showArea">
        <marvel-tab :tabItems="tabItems1">
          <marvel-tab-item :isActive="tabItems1[0].isActive">
            <div class="showAreaInner">
              <!--2级DemoView start-->
              <marvel-primary-button size="large" classCustom="classCustom1" label="Large"
                                     v-on:onClick="onClick"></marvel-primary-button>
              <marvel-primary-button classCustom="classCustom1" label="Small"
                                     v-on:onClick="onClick"></marvel-primary-button>
              <marvel-primary-button ref="ref4" classCustom="classCustom1" label="MouseDown"
                                     v-on:onClick="onClick"></marvel-primary-button>
              <marvel-primary-button ref="ref5" classCustom="classCustom1" label="Focus"
                                     v-on:onClick="onClick"></marvel-primary-button>
              <marvel-primary-button ref="ref6" classCustom="classCustom1" label="Disable"
                                     v-on:onClick="onClick"></marvel-primary-button>
              <!--2级DemoView end-->
            </div>
          </marvel-tab-item>
          <marvel-tab-item :isActive="tabItems1[1].isActive">
            <div class="codeArea">
              <!--2级CodeView start-->
              <pre>
                <code class="html">
                  &lt;marvel-primary-button size="large" classCustom="classCustom1" label="Large" v-on:onClick="onClick"&gt;&lt;/marvel-primary-button&gt;
                  &lt;marvel-primary-button classCustom="classCustom1" label="Small"
                  v-on:onClick="onClick"&gt;&lt;/marvel-primary-button&gt;
                  &lt;marvel-primary-button ref="ref4" classCustom="classCustom1" label="MouseDown"
                  v-on:onClick="onClick"&gt;&lt;/marvel-primary-button&gt;
                  &lt;marvel-primary-button ref="ref5" classCustom="classCustom1" label="Focus"
                  v-on:onClick="onClick"&gt;&lt;/marvel-primary-button&gt;
                  &lt;marvel-primary-button ref="ref6" classCustom="classCustom1" label="Disable"
                  v-on:onClick="onClick"&gt;&lt;/marvel-primary-button&gt;
                </code>
              </pre>
              <!--2级CodeView end-->
            </div>
          </marvel-tab-item>
        </marvel-tab>
      </div>
      <!--2级 end-->
      <!--2级 start-->
      <div class="title level2">Secondary button</div>
      <div class="describe">
        文本按钮的一种。其尺寸有大小之分，可根据使用场景选择合适尺寸。
      </div>
      <div class="showArea">
        <marvel-tab :tabItems="tabItems2">
          <marvel-tab-item :isActive="tabItems2[0].isActive">
            <div class="showAreaInner">
              <marvel-button size="large" classCustom="classCustom1" label="Large"
                             v-on:onClick="onClick"></marvel-button>
              <marvel-button classCustom="classCustom1" label="Small"
                             v-on:onClick="onClick"></marvel-button>
              <marvel-button ref="ref1" classCustom="classCustom1" label="MouseDown"
                             v-on:onClick="onClick"></marvel-button>
              <marvel-button ref="ref2" classCustom="classCustom1" label="Focus"
                             v-on:onClick="onClick"></marvel-button>
              <marvel-button ref="ref3" classCustom="classCustom1" label="Disable"
                             v-on:onClick="onClick"></marvel-button>
            </div>
          </marvel-tab-item>
          <marvel-tab-item :isActive="tabItems2[1].isActive">
            <div class="codeArea">
              <pre>
                <code class="html">
                  &lt;marvel-button size="large" classCustom="classCustom1" label="Large" v-on:onClick="onClick">&lt;/marvel-button&gt;
                  &lt;marvel-button classCustom="classCustom1" label="Small" v-on:onClick="onClick">&lt;/marvel-button&gt;
                  &lt;marvel-button ref="ref1" classCustom="classCustom1" label="MouseDown" v-on:onClick="onClick">&lt;/marvel-button&gt;
                  &lt;marvel-button ref="ref2" classCustom="classCustom1" label="Focus" v-on:onClick="onClick">&lt;/marvel-button&gt;
                  &lt;marvel-button ref="ref3" classCustom="classCustom1" label="Disable" v-on:onClick="onClick"&gt;&lt;/marvel-button&gt;
                </code>
              </pre>
            </div>
          </marvel-tab-item>
        </marvel-tab>
      </div>
      <!--2级 end-->
      <!--2级 start-->
      <div class="title level2">Text + icon button</div>
      <div class="describe">
        图标文字按钮，图文结合的形式，强调图形表达命令的可视性。其尺寸有大小之分，可根据使用场景选择合适尺寸。
      </div>
      <div class="showArea">
        <marvel-tab :tabItems="tabItems3">
          <marvel-tab-item :isActive="tabItems3[0].isActive">
            <div class="showAreaInner">
              <marvel-icon-txt-button size="large" classCustom="classCustom1" label="Large"
                                      icon="icon-home3"
                                      v-on:onClick="onClick"></marvel-icon-txt-button>
              <marvel-icon-txt-button classCustom="classCustom1" label="Small"
                                      icon="icon-home3"
                                      v-on:onClick="onClick"></marvel-icon-txt-button>
              <marvel-icon-txt-button ref="ref7" classCustom="classCustom1" label="MouseDown"
                                      icon="icon-home3"
                                      v-on:onClick="onClick"></marvel-icon-txt-button>
              <marvel-icon-txt-button ref="ref8" classCustom="classCustom1" label="Focus"
                                      icon="icon-home3"
                                      v-on:onClick="onClick"></marvel-icon-txt-button>
              <marvel-icon-txt-button ref="ref9" classCustom="classCustom1" label="Disable"
                                      icon="icon-home3"
                                      v-on:onClick="onClick"></marvel-icon-txt-button>
            </div>
          </marvel-tab-item>
          <marvel-tab-item :isActive="tabItems3[1].isActive">
            <div class="codeArea">
              <pre>
                <code class="html">
                  &lt;marvel-icon-txt-button size="large" classCustom="classCustom1" label="Large" icon="icon-home3"
                  v-on:onClick="onClick"&gt;&lt;/marvel-icon-txt-button&gt;
                  &lt;marvel-icon-txt-button classCustom="classCustom1" label="Small" icon="icon-home3"
                  v-on:onClick="onClick"&gt;&lt;/marvel-icon-txt-button&gt;
                  &lt;marvel-icon-txt-button ref="ref7" classCustom="classCustom1" label="MouseDown" icon="icon-home3"
                  v-on:onClick="onClick"&gt;&lt;/marvel-icon-txt-button&gt;
                  &lt;marvel-icon-txt-button ref="ref8" classCustom="classCustom1" label="Focus" icon="icon-home3"
                  v-on:onClick="onClick"&gt;&lt;/marvel-icon-txt-button&gt;
                  &lt;marvel-icon-txt-button ref="ref9" classCustom="classCustom1" label="Disable" icon="icon-home3"
                  v-on:onClick="onClick"&gt;&lt;/marvel-icon-txt-button&gt;
                </code>
              </pre>
            </div>
          </marvel-tab-item>
        </marvel-tab>
      </div>
      <!--2级 end-->
      <!--2级 start-->
      <div class="title level2">Icon button</div>
      <div class="describe">
        图标按钮，优先级较低，一般适用于辅助功能。尺寸上无大小之分。
      </div>
      <div class="showArea">
        <marvel-tab :tabItems="tabItems4">
          <marvel-tab-item :isActive="tabItems4[0].isActive">
            <div class="showAreaInner">
              <marvel-icon-button classCustom="classCustom1" label="normal"
                                  icon="icon-home3"
                                  v-on:onClick="onClick"></marvel-icon-button>
              <marvel-icon-button ref="ref10" classCustom="classCustom1" label="mouseDown"
                                  icon="icon-home3"
                                  v-on:onClick="onClick"></marvel-icon-button>
              <marvel-icon-button ref="ref11" classCustom="classCustom1" label="disable"
                                  icon="icon-home3"
                                  v-on:onClick="onClick"></marvel-icon-button>
            </div>
          </marvel-tab-item>
          <marvel-tab-item :isActive="tabItems4[1].isActive">
            <div class="codeArea">
               <pre>
                <code class="html">
                  &lt;marvel-icon-button classCustom="classCustom1" label="normal" icon="icon-home3"
                  v-on:onClick="onClick"&gt;&lt;/marvel-icon-button&gt;
                  &lt;marvel-icon-button ref="ref10" classCustom="classCustom1" label="mouseDown" icon="icon-home3"
                  v-on:onClick="onClick"&gt;&lt;/marvel-icon-button&gt;
                  &lt;marvel-icon-button ref="ref11" classCustom="classCustom1" label="disable" icon="icon-home3"
                  v-on:onClick="onClick"&gt;&lt;/marvel-icon-button&gt;
                </code>
              </pre>
            </div>
          </marvel-tab-item>
        </marvel-tab>
      </div>
      <!--2级 end-->
      <!--2级 start-->
      <div class="title level2">Text button</div>
      <div class="describe">
        文本按钮的一种，常用于表格内的操作。尺寸上无大小之分。
      </div>
      <div class="showArea">
        <marvel-tab :tabItems="tabItems5">
          <marvel-tab-item :isActive="tabItems5[0].isActive">
            <div class="showAreaInner">
              <marvel-txt-button classCustom="classCustom1" label="normal"
                                 v-on:onClick="onClick"></marvel-txt-button>
              <marvel-txt-button ref="ref12" classCustom="classCustom1" label="mouseDown"
                                 v-on:onClick="onClick"></marvel-txt-button>
              <marvel-txt-button ref="ref13" classCustom="classCustom1" label="disable"
                                 v-on:onClick="onClick"></marvel-txt-button>
            </div>
          </marvel-tab-item>
          <marvel-tab-item :isActive="tabItems5[1].isActive">
            <div class="codeArea">
               <pre>
                <code class="html">
                  &lt;marvel-txt-button classCustom="classCustom1" label="normal" v-on:onClick="onClick">&lt;/marvel-txt-button&gt;
                  &lt;marvel-txt-button ref="ref12" classCustom="classCustom1" label="mouseDown" v-on:onClick="onClick">&lt;/marvel-txt-button&gt;
                  &lt;marvel-txt-button ref="ref13" classCustom="classCustom1" label="disable" v-on:onClick="onClick"&gt;&lt;/marvel-txt-button&gt;
                </code>
              </pre>
            </div>
          </marvel-tab-item>
        </marvel-tab>
      </div>
      <!--2级 end-->
      <!--2级 start-->
      <div class="title level2">Drop down button</div>
      <div class="describe">
        下拉按钮，可在多个选项之间进行选择。尺寸上无大小之分。1111
      </div>
      <div class="showArea">
        <marvel-tab :tabItems="tabItems6">
          <marvel-tab-item :isActive="tabItems6[0].isActive">
            <div class="showAreaInner">
              <button v-on:click="onDropDownClick">getCheckItem</button>
              <marvel-drop-down-button ref="ref14" disable="" theme="dark" width="100%"
                                       v-on:onClick="onClick"></marvel-drop-down-button>
            </div>
          </marvel-tab-item>
          <marvel-tab-item :isActive="tabItems6[1].isActive">
            <div class="codeArea">
              <pre>
                <code class="html">
&lt;marvel-drop-down-button ref="ref14" classCustom="classCustom1" v-on:onClick="onClick"&gt;&lt;/marvel-drop-down-button&gt;
                </code>
              </pre>
            </div>
          </marvel-tab-item>
        </marvel-tab>
      </div>
      <!--2级 end-->
      <!--2级 start-->
      <div class="title level2">导航式Button</div>
      <div class="describe">
        导航式Button
      </div>
      <div class="showArea">
        <marvel-tab :tabItems="tabItems7">
          <marvel-tab-item :isActive="tabItems7[0].isActive">
            <div class="showAreaInner">
              <marvel-tab-button ref="ref4TabBtn" label="点我"
                                 v-on:onClick="onClick4TabBtn"></marvel-tab-button>
            </div>
          </marvel-tab-item>
          <marvel-tab-item :isActive="tabItems7[1].isActive">
            <div class="codeArea">
              <pre>
                <code class="html">
                </code>
              </pre>
            </div>
          </marvel-tab-item>
        </marvel-tab>
      </div>
      <!--2级 end-->
    </div>
  </div>
</template>

<script>
  //#region fui
  import {MarvelTab, MarvelTabItem} from "marvel-fui2";
  import MarvelHight from "marvel-fui2/src/walle/component/highlight";
  import {MarvelButton, MarvelPrimaryButton, MarvelIconTxtButton,
    MarvelIconButton, MarvelTxtButton,
    MarvelDropDownButton, MarvelTabButton} from "marvel-fui2";
  //#endregion

  export default {
    name: 'page4Button',
    components: {
      MarvelTabButton,
      MarvelTabItem,
      MarvelTab,
      MarvelDropDownButton,
      MarvelIconTxtButton,
      MarvelButton, MarvelPrimaryButton, MarvelIconButton,
      MarvelTxtButton
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
        tabItems5: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems6: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems7: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        items: [{
          label: "Item1",
          icon: "icon-pencil"
        }, {
          label: "Item2",
          icon: "icon-pen"
        }, {
          label: "Item3",
          icon: "icon-droplet"
        }],
        //#endregion
      }
    },
    mounted: function () {
      //#region custom mounted
      this.$refs.ref1.setBtnMouseDown(true);
      this.$refs.ref2.setBtnFocus(true);
      this.$refs.ref3.setBtnDisable(true);
      this.$refs.ref4.setBtnMouseDown(true);
      this.$refs.ref5.setBtnFocus(true);
      this.$refs.ref6.setBtnDisable(true);
      this.$refs.ref7.setBtnMouseDown(true);
      this.$refs.ref8.setBtnFocus(true);
      this.$refs.ref9.setBtnDisable(true);
      this.$refs.ref10.setBtnMouseDown(true);
      this.$refs.ref11.setBtnDisable(true);
      this.$refs.ref12.setBtnMouseDown(true);
      this.$refs.ref13.setBtnDisable(true);
      this.$refs.ref14.init(this.items, "Item3");
      //#endregion
    },
    methods: {
      //#region inner
      onClick: function () {
        console.log(1);
      },
      onDropDownClick: function () {
        console.log(this.$refs.ref14.getSelectItem());
      },
      onClick4TabBtn: function () {
        this.$refs.ref4TabBtn.setActive(true);
        console.log("onClick4TabBtn");
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
  .showArea {
    width: 100%;
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
    height: 250px;
  }
  /*document custom style end*/
  /*custom style start*/
  .classCustom1 {
    margin-right: 20px;
  }
  /*custom style end*/
</style>
