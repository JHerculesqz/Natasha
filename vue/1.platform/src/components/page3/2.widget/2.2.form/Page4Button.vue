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
                                     v-on:onClick="onClick" isWarn=true></marvel-primary-button>
              <marvel-primary-button classCustom="classCustom1" label="normal"
                                     v-on:onClick="onClick"></marvel-primary-button>
              <marvel-primary-button size="small" classCustom="classCustom1" label="small"
                                     v-on:onClick="onClick"></marvel-primary-button>
              <marvel-primary-button size="mini" classCustom="classCustom1" label="mini"
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
                  &lt;marvel-primary-button size="large" classCustom="classCustom1" label="Large" v-on:onClick="onClick" isWarn=true&gt;&lt;/marvel-primary-button&gt;
                  &lt;marvel-primary-button classCustom="classCustom1" label="normal"
                                         v-on:onClick="onClick"&gt;&lt;/marvel-primary-button&gt;
                  &lt;marvel-primary-button size="small" classCustom="classCustom1" label="small"
                                         v-on:onClick="onClick"&gt;&lt;/marvel-primary-button&gt;
                  &lt;marvel-primary-button size="mini" classCustom="classCustom1" label="mini"
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
              <marvel-button size="large" classCustom="classCustom1"
                             label="Large" isWarn=true
                             v-on:onClick="onClick"></marvel-button>
              <marvel-button classCustom="classCustom1" label="normal"
                             v-on:onClick="onClick"></marvel-button>
              <marvel-button size="small" classCustom="classCustom1" label="small"
                             v-on:onClick="onClick"></marvel-button>
              <marvel-button size="mini" classCustom="classCustom1" label="mini"
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
                  &lt;marvel-button size="large" classCustom="classCustom1" label="Large" isWarn=true v-on:onClick="onClick">&lt;/marvel-button&gt;
                  &lt;marvel-button classCustom="classCustom1" label="normal" v-on:onClick="onClick">&lt;/marvel-button&gt;
                  &lt;marvel-button size="small" classCustom="classCustom1" label="small" v-on:onClick="onClick">&lt;/marvel-button&gt;
                  &lt;marvel-button size="mini" classCustom="classCustom1" label="mini" v-on:onClick="onClick">&lt;/marvel-button&gt;
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
                                      icon="icon-home3" isWarn=true
                                      v-on:onClick="onClick"></marvel-icon-txt-button>
              <marvel-icon-txt-button classCustom="classCustom1" label="normal"
                                      icon="icon-home3"
                                      v-on:onClick="onClick"></marvel-icon-txt-button>
              <marvel-icon-txt-button size="small" classCustom="classCustom1" label="small"
                                      icon="icon-home3"
                                      v-on:onClick="onClick"></marvel-icon-txt-button>
              <marvel-icon-txt-button size="mini" classCustom="classCustom1" label="mini"
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
                  isWarn=true v-on:onClick="onClick"&gt;&lt;/marvel-icon-txt-button&gt;
                  &lt;marvel-icon-txt-button classCustom="classCustom1" label="normal" icon="icon-home3"
                  v-on:onClick="onClick"&gt;&lt;/marvel-icon-txt-button&gt;
                  &lt;marvel-icon-txt-button size="small" classCustom="classCustom1" label="small" icon="icon-home3"
                  v-on:onClick="onClick"&gt;&lt;/marvel-icon-txt-button&gt;
                  &lt;marvel-icon-txt-button size="mini" classCustom="classCustom1" label="mini" icon="icon-home3"
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
                                  icon="icon-home3" isWarn=true
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
                  &lt;marvel-icon-button classCustom="classCustom1" label="normal" icon="icon-home3" isWarn=true
                  isWarn=true v-on:onClick="onClick"&gt;&lt;/marvel-icon-button&gt;
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
                                 v-on:onClick="onClick" isWarn=true></marvel-txt-button>
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
                  &lt;marvel-txt-button classCustom="classCustom1" label="normal"
                                     v-on:onClick="onClick" isWarn=true&gt;&lt;/marvel-txt-button&gt;
                  &lt;marvel-txt-button classCustom="classCustom1" label="normal"
                                     v-on:onClick="onClick"&gt;&lt;/marvel-txt-button&gt;
                  &lt;marvel-txt-button ref="ref12" classCustom="classCustom1" label="mouseDown"
                                     v-on:onClick="onClick"&gt;&lt;/marvel-txt-button&gt;
                  &lt;marvel-txt-button ref="ref13" classCustom="classCustom1" label="disable"
                                     v-on:onClick="onClick"&gt;&lt;/marvel-txt-button&gt;
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
              <button v-on:click="onClick4GetSelectItem">getSelectItem</button>
              <button v-on:click="onClick4GetSelectItemObj">getSelectItemObj</button>
              <button v-on:click="onClick4setSelectItem">setSelectItem Item1</button>
              <marvel-drop-down-button ref="ref14" disable="" width="100%"
                                       maxHeight="100px"
                                       v-on:onOptionSelect="onOptionSelect"></marvel-drop-down-button>
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
              <marvel-tab-button ref="ref4TabBtn" label="点我" isWarn=true
                                 v-on:onClick="onClick4TabBtn"></marvel-tab-button>
            </div>
          </marvel-tab-item>
          <marvel-tab-item :isActive="tabItems7[1].isActive">
            <div class="codeArea">
              <pre>
                <code class="html">
                  &lt;marvel-tab-button ref="ref4TabBtn" label="点我"  isWarn=true
                                     v-on:onClick="onClick4TabBtn"&gt;&lt;/marvel-tab-button&gt;
                </code>
              </pre>
            </div>
          </marvel-tab-item>
        </marvel-tab>
      </div>
      <!--2级 end-->
      <!--2级 start-->
      <div class="title level2">下拉框多选控件</div>
      <div class="describe">
        下拉框多选
      </div>
      <div class="showArea">
        <marvel-tab :tabItems="tabItems8">
          <marvel-tab-item :isActive="tabItems8[0].isActive">
            <div class="showAreaInner">
              <marvel-multi-drop-down :items="multiItems"
                                      maxHeight="150px"
                                      :needCheckAll="true"
                                      @onAllCheckChangeEvent="onAllCheckChangeEvent"
                                      @onItemCheckChangeEvent="onItemCheckChangeEvent"></marvel-multi-drop-down>
            </div>
          </marvel-tab-item>
          <marvel-tab-item :isActive="tabItems8[1].isActive">
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
      <!--2级 start-->
      <div class="title level2">可输入下拉框控件</div>
      <div class="describe">
        可输入下拉框
      </div>
      <div class="showArea">
        <marvel-tab :tabItems="tabItems9">
          <marvel-tab-item :isActive="tabItems9[0].isActive">
            <div class="showAreaInner">
              <button v-on:click="onClick4GetInputDropDownSelectItem">getSelectItem</button>
              <button v-on:click="onClick4GetInputDropDownSelectItemObj">getSelectItemObj</button>
              <button v-on:click="onClick4setInputDropDownSelectItem">setSelectItem Item6</button>
              <marvel-input-drop-down ref="ref15"
                                      maxHeight="120px"></marvel-input-drop-down>
            </div>
          </marvel-tab-item>
          <marvel-tab-item :isActive="tabItems9[1].isActive">
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
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelHight from "@/walle/component/highlight";
  import MarvelButton from "@/walle/widget/button/MarvelButton";
  import MarvelPrimaryButton from "@/walle/widget/button/MarvelPrimaryButton";
  import MarvelIconTxtButton from "@/walle/widget/button/MarvelIconTxtButton";
  import MarvelIconButton from "@/walle/widget/button/MarvelIconButton";
  import MarvelTxtButton from "@/walle/widget/button/MarvelTxtButton";
  import MarvelDropDownButton from "@/walle/widget/button/MarvelDropDownButton";
  import MarvelTabButton from "@/walle/widget/button/MarvelTabButton";
  import MarvelMultiDropDown from "@/walle/widget/button/MarvelMultiDropDown";
  import MarvelInputDropDown from "@/walle/widget/button/MarvelInputDropDown";

  export default {
    name: 'page4Button',
    components: {
      MarvelTabButton,
      MarvelTabItem,
      MarvelTab,
      MarvelDropDownButton,
      MarvelIconTxtButton,
      MarvelButton, MarvelPrimaryButton, MarvelIconButton,
      MarvelTxtButton,
      MarvelMultiDropDown,
      MarvelInputDropDown
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
        tabItems8: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems9: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        //region dropDownBtn
        items: [{
          label: "Item1"
//          icon: "icon-pencil"
        }, {
          label: "Item2",
//          icon: "icon-pen"
          icon: ""
        }, {
          label: "Item3",
          icon: "icon-droplet"
        }],
        //endregion
        //region multiDropDown
        multiItems: [],
        //endregion
        //region inputDropDown
        inputItems:[{
          label: "Item1Name"
        }, {
          label: "Item2Name"
        }, {
          label: "Item3Name"
        },{
          label: "aaaaaaaaaaa"
        }, {
          label: "bbbbbbbbbbb"
        }, {
          label: "ccccccccccc"
        }]
        //endregion
        //#endregion
      }
    },
    created() {
      console.log("created p");
    },
    mounted: function () {
      console.log("mounted p");
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
      //region multiDropdown
      for (let i = 0; i < 20; i++) {
        this.multiItems.push({
          label: "abcdEFG" + i,
          checked: i % 2 == 0 ? true : false
        });
      }

      //endregion
      this.$refs.ref15.init(this.inputItems, "Item1Name");
      //region multiDropdown
      //#endregion
    },
    methods: {
      //#region inner
      onClick: function () {
        console.log(1);
      },
      onClick4GetSelectItem: function () {
        console.log(this.$refs.ref14.getSelectItem());
      },
      onClick4GetSelectItemObj: function () {
        console.log(this.$refs.ref14.getSelectItemObj());
      },
      onClick4setSelectItem: function () {
        this.$refs.ref14.setSelectItem(this.items[0].label)
      },
      onOptionSelect: function (oItem) {
        console.log(oItem);
      },
      onClick4TabBtn: function () {
        this.$refs.ref4TabBtn.setActive(true);
        console.log("onClick4TabBtn");
      },
      onAllCheckChangeEvent: function (bCheck) {
        console.log(bCheck);
      },
      onItemCheckChangeEvent: function (oItem) {
        console.log(oItem);
      },
      onClick4GetInputDropDownSelectItem:function(){
        console.log(this.$refs.ref15.getSelectItem());
      },
      onClick4GetInputDropDownSelectItemObj:function(){
        console.log(this.$refs.ref15.getSelectItemObj());
      },
      onClick4setInputDropDownSelectItem:function(){
        this.$refs.ref15.setSelectItem(this.inputItems[5].label);
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

  /*region dark theme*/

  .dark .title {
    color: #ffffff;
  }

  .dark .describe {
    color: #8b90b3;
  }

  /*endregion*/
</style>
