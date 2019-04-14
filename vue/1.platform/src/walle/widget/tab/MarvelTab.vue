<template>
  <!--tab start-->
  <div class="tabOutsideBox">
    <div class="tabWrapper theme1">
      <div class="headArea">
        <div class="headItem" v-for="tabItem in tabItems"
             v-bind:class="[{ active : tabItem.isActive }, { dpn : tabItem.isHide }]"
             v-on:click="onTabClick(tabItem.label)">
          {{ tabItem.label }}
        </div>
      </div>
      <div class="contArea">
        <slot></slot>
      </div>
    </div>
  </div>
  <!--tab end-->
</template>

<script>
  export default {
    name: 'MarvelTab',
    props: ["tabItems"],
    data: function () {
      return {}
    },
    mounted:function(){
      for (var iIndex = 0; iIndex < this.tabItems.length; iIndex++) {
        var oTabItem = this.tabItems[iIndex];
        if (!oTabItem.hasOwnProperty("isHide")) {
          this.$set(oTabItem,"isHide", false);
        }
      }
    },
    methods: {
      onTabClick: function (strTabLabel) {
        for (var iIndex = 0; iIndex < this.tabItems.length; iIndex++) {
          var oTabItem = this.tabItems[iIndex];
          if (oTabItem.label == strTabLabel) {
            oTabItem.isActive = true;
          }
          else {
            oTabItem.isActive = false;
          }
        }
        this.$emit("onTabClick", strTabLabel)
      },
      setTabItemHide: function (strTabLabel) {
        for (var iIndex = 0; iIndex < this.tabItems.length; iIndex++) {
          //设置隐藏状态
          var oTabItem = this.tabItems[iIndex];
          if (oTabItem.label == strTabLabel) {
            oTabItem.isHide = true;
            console.log("hide " + oTabItem.label);
            console.log(this.tabItems);

            //若当前需要隐藏的tabItem为选中状态 则须选择另一项可见的tabItem为选中项
            if(oTabItem.isActive ==true){
              for (var iIndex = 0; iIndex < this.tabItems.length; iIndex++) {
                var oTabItem = this.tabItems[iIndex];
                if (oTabItem.isHide === false && oTabItem.isActive === false){
                  this.setActiveTabItem(oTabItem.label);
                  break;
                }
              }
            }

            break;
          }
        }
      },
      setTabItemShow: function (strTabLabel) {
        for (var iIndex = 0; iIndex < this.tabItems.length; iIndex++) {
          //设置隐藏状态
          var oTabItem = this.tabItems[iIndex];
          if (oTabItem.label == strTabLabel) {
            this.tabItems[iIndex].isHide = false;
            console.log("show " + this.tabItems[iIndex].label);
            console.log(this.tabItems);
            break;
          }
        }
      },
      setActiveTabItem: function (strTabLabel) {
        this.tabItems.forEach((oItem) => {
          if (oItem.label == strTabLabel) {
            oItem.isActive = true;
          }
          else {
            oItem.isActive = false;
          }
        });
      },
    }
  }
</script>

<style scoped>
  .tabOutsideBox {
    width: 100%;
    height: 100%;
  }

  .tabWrapper {
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1px solid #cccccc;
    box-sizing: border-box;
  }

  .tabWrapper .headArea {
    height: 30px;
    border-bottom: 1px solid #cccccc;
    clear: both;
  }

  .tabWrapper .headArea .headItem {
    height: 100%;
    line-height: 30px;
    float: left;
    font-family: arial, "微软雅黑", sans-serif;
    color: #333;
    font-size: 16px;
    padding: 0 10px;
    cursor: pointer;
  }

  .tabWrapper .headArea .headItem:hover {
    color: #3399ff;
  }

  .tabWrapper .contArea {
    width: 100%;
    height: calc(100% - 30px);
    clear: both;
    background-color: #ffffff;
  }

  .tabWrapper .contArea .cont {
    width: 100%;
    height: 100%;
  }

  .dpn {
    display: none;
  }

  .theme1 .headArea .headItem {
    border-bottom: 3px solid rgba(0, 0, 0, 0);
    line-height: 27px;
  }

  .theme1 .headArea .active {
    border-bottom: 3px solid #3399ff;
    box-sizing: border-box;
  }

  .theme2 .headArea .headItem {
    /*margin-top: 1px;*/
  }

  .theme2 .headArea .active {
    border-top: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    background-color: #ffffff;

  }

  /*region dark theme*/

  .dark .tabWrapper {
    border: 1px solid transparent;
    background-color: #161C36;
  }

  .dark .tabWrapper .headArea {
    border-bottom: 1px solid rgb(128, 128, 128);
  }

  .dark .tabWrapper .headArea .headItem {
    color: #FFFFFF;
  }

  .dark .tabWrapper .headArea .headItem:hover {
    color: #3399ff;
  }

  .dark .tabWrapper .contArea {
    background-color: transparent;
  }

  .dark .tabWrapper .contArea .cont {
  }

  .dark .theme1 .headArea .headItem {
    border-bottom: 3px solid rgba(0, 0, 0, 0);
    line-height: 27px;
  }

  .dark .theme1 .headArea .active {
    border-bottom: 3px solid #3399ff;
    box-sizing: border-box;
    font-weight: bold;

  }

  .dark .theme2 .headArea .headItem {
    /*margin-top: 1px;*/
  }

  .dark .theme2 .headArea .active {
    border-top: 1px solid rgb(128, 128, 128);
    border-left: 1px solid rgb(128, 128, 128);
    border-right: 1px solid rgb(128, 128, 128);
    background-color: #161C36;

  }

  /*endregion*/

  /*blackBg theme*/

  .blackBg .tabWrapper {
    border: 1px solid #444;
  }

  .blackBg .tabWrapper .headArea {
    border-bottom: 1px solid #444;
  }

  .blackBg .tabWrapper .headArea .headItem {
    color: #eee;
  }

  .blackBg .tabWrapper .headArea .headItem:hover {
    color: #3399ff;
  }

  .blackBg .tabWrapper .contArea {
    background-color: #000;
  }

  .blackBg .theme1 .headArea .active {
    border-bottom: 3px solid #3399ff;
  }

  .blackBg .theme2 .headArea .active {
    border-top: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
    background-color: #ffffff;

  }

  /*endregion*/

</style>
