<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">文本对比</div>
    <div class="describe">
      文本对比
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">文本对比</div>
    <div class="describe">
      文本对比
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="height:300px;">
              <marvel-diff ref="textDiff"></marvel-diff>
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
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelDiff from "../../../../walle/widget/diff/MarvelDiff";

  export default {
    name: 'page4DiffMatchPatch',
    components: {
      MarvelDiff,
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
        //#endregion
        //#region custom data

        //#endregion
      }
    },
    mounted:function(){
      //#region custom

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      _initEx: function () {
        var strOriginalText = "policy-map aaa\n" +
          "  class class-default\n" +
          "    shape average 100\n" +
          "  !\n" +
          "!\n" +
          "interface GigabitEthernet0/8.88\n" +
          "  description Link to PE / pe0 - GigabitEthernet0/0/0/3\n" +
          "  encapsulation dot1q 88\n" +
          "  ip address 192.168.1.1 255.255.255.252\n" +
          "  service-policy output aaa\n" +
          "  no shutdown\n";
        var strNewText = "policy-map aaa\n" +
          "  class class-default\n" +
          "    shape average 100\n" +
          "  !\n" +
          "!\n" +
          "exit\n" +
          "router bgp 100\n" +
          "  neighbor 192.168.1.2 remote-as 100\n" +
          "  neighbor 192.168.1.2 activate\n" +
          "  address-family ipv4 unicast\n" +
          "    neighbor 192.168.1.2 activate\n" +
          "\tnetwork 10.1.1.0 mask 255.255.255.128\n" +
          "    exit-address-family\n" +
          "  !\n" +
          "!";
        this.$refs.textDiff.compareDiff(strOriginalText, strNewText, "leftTitle", "rightTitle");
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
