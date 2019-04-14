<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">右键菜单</div>
    <div class="describe">
      右键菜单
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">右键菜单--图片版</div>
    <div class="describe">
      右键菜单--图片版
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click.stop="onClick">show</button>
            <marvel-menu-context ref="ref0"
                                 :items="items"
                                 v-on:onMenuItemClick="onMenuItemClick"></marvel-menu-context>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;button v-on:click.stop="onClick"&gt;show&lt;/button&gt;
&lt;marvel-menu-context ref="ref0"
                         :items="items"
                         v-on:onMenuItemClick="onMenuItemClick"&gt;&lt;/marvel-menu-context&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--2级 start-->
    <div class="title level2">右键菜单--文字版</div>
    <div class="describe">
      右键菜单--文字版
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button v-on:click.stop="onClick2">show</button>
            <marvel-menu-context2 ref="ref1"
                                 :items="items4TextContext"
                                 v-on:onMenuItemClick="onMenuItemClick2"></marvel-menu-context2>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
                  &lt;button v-on:click.stop="onClick2"&gt;show&lt;/button&gt;
                  &lt;marvel-menu-context2 ref="ref1"
                                  :items="items4TextContext"
                                  v-on:onMenuItemClick="onMenuItemClick2"&gt;&lt;/marvel-menu-context2&gt;
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
  import MarvelMenuContext from "@/walle/widget/menu/MarvelMenuContext"
  import MarvelMenuContext2 from "@/walle/widget/menu/MarvelMenuContext2"

  export default {
    name: 'page4Menu',
    components: {MarvelTabItem,
      MarvelTab,MarvelMenuContext,
      MarvelMenuContext2},
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
        //#endregion
        //#region custom data
        items: [{
          icon: "icon-cancel-circle",
          color: "#ff4c4c",
          label: "删除"
        }, {
          icon: "icon-pencil",
          color: "",
          label: "编辑"
        }],
        items4TextContext:[{
          label: "contextMenu1",
          subMenu:[{
            label: "contextSubMenu1"
          },{
            label: "contextSubMenu2"
          },{
            label: "contextSubMenu3"
          },{
            label: "contextSubMenu4"
          }]
        },{
          label: "contextMenu2"
        }]
        //#endregion
      }
    },
    methods: {
      //#region inner
      onClick: function(){
        console.log("1");
        this.$refs.ref0.showSubMenu(500,200);
      },
      onClick2: function(){
        this.$refs.ref1.showSubMenu(500,400);
      },
      onMenuItemClick: function(strMenuItemLabel){
        alert(strMenuItemLabel);
      },
      onMenuItemClick2: function(strMenuItemLabel){
        alert(strMenuItemLabel);
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
