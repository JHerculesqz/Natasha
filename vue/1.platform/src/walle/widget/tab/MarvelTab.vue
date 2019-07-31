<template>
  <!--tab start-->
  <div class="tabOutsideBox">
    <div class="tabWrapper theme1" :class="hideBorder ? 'tabWrapperNoBorder':'tabWrapperWithBorder'">
      <div class="headArea">
        <div class="headItem" v-for="tabItem in tabItems"
             :title="tabItem.label"
             v-bind:class="[{ active : tabItem.isActive }, { dpn : tabItem.isHide }, tabCustomClass]"
             v-on:click="onTabClick(tabItem.label)">
          {{ tabItem.label }}
          <div v-if="tabItem.showWarn" style="float: right;width: 25px">
            <span class="warn">{{tabItem.warnCount}}</span>
          </div>
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
  /**
   *  MarvelTab widget description
   *  @vuedoc
   *  @exports MarvelTab
   */
  export default {
    name: 'MarvelTab',
    props: {
      tabItems: {
        type: Array,
        default: function () {
          return [];
        },
        required: true,
      },
      tabCustomClass: {
        type: String,
        default: "",
        required: false,
      },
      hideBorder: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: function () {
      return {}
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        for (var iIndex = 0; iIndex < this.tabItems.length; iIndex++) {
          var oTabItem = this.tabItems[iIndex];
          if (!oTabItem.hasOwnProperty("isHide")) {
            this.$set(oTabItem, "isHide", false);
          }
        }
      },

      //#endregion

      onTabClick: function (strTabLabel) {
        for (var iIndex = 0; iIndex < this.tabItems.length; iIndex++) {
          var oTabItem = this.tabItems[iIndex];
          if (oTabItem.label == strTabLabel) {
            oTabItem.isActive = true;
          } else {
            oTabItem.isActive = false;
          }
        }
        this.callback4OnTabClick(strTabLabel)
      },

      //#endregion
      //#region callback

      callback4OnTabClick: function (strTabLabel) {
        this.$emit("onTabClick", strTabLabel)
      },

      //#endregion
      //#region 3rd

      setTabItemHide: function (strTabLabel) {
        for (var iIndex = 0; iIndex < this.tabItems.length; iIndex++) {
          //设置隐藏状态
          var oTabItem = this.tabItems[iIndex];
          if (oTabItem.label == strTabLabel) {
            oTabItem.isHide = true;
            //若当前需要隐藏的tabItem为选中状态 则须选择另一项可见的tabItem为选中项
            if (oTabItem.isActive == true) {
              for (var iIndex = 0; iIndex < this.tabItems.length; iIndex++) {
                var oTabItem = this.tabItems[iIndex];
                if (oTabItem.isHide === false && oTabItem.isActive === false) {
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
            break;
          }
        }
      },
      setActiveTabItem: function (strTabLabel) {
        this.tabItems.forEach((oItem) => {
          if (oItem.label == strTabLabel) {
            oItem.isActive = true;
          } else {
            oItem.isActive = false;
          }
        });
      },
      getCurrentActiveItem: function () {
        for (var iIndex = 0; iIndex < this.tabItems.length; iIndex++) {
          var oTabItem = this.tabItems[iIndex];
          if (oTabItem.isActive == true) {
            return oTabItem.label;
          }
        }
      },

      //#endregion
    }
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
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
    background-color: #aaa;
  }

  /*endregion*/
  .tabOutsideBox {
    width: 100%;
    height: 100%;
  }

  .tabWrapper {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
  }

  .tabWrapperWithBorder {
    border: 1px solid #cccccc;
  }

  .tabWrapperNoBorder {
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
    font-family: arial, "Microsoft YaHei", sans-serif;
    color: #333;
    font-size: 14px;
    padding: 0 10px;
    cursor: pointer;
  }

  .tabWrapper .headArea .headItem:hover {
    color: #3399ff;
  }

  .warn {
    background: red;
    border-radius: 6px;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #fff;
    top: -14px;
    left: -2px;
    position: relative;
    padding: 0px 3px;
  }

  .tabWrapper .contArea {
    width: 100%;
    height: calc(100% - 30px);
    clear: both;
    background-color: #ffffff;
    position: relative;
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
    box-sizing: border-box;
  }

  .theme1 .headArea .active {
    border-bottom: 3px solid #3399ff;
    box-sizing: border-box;
    color: #3399ff;
    font-weight: bolder;
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
    color: #3399ff;
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

</style>
