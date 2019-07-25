<template>
  <!--使用潜规则 父容器高度应保证大于78px-->
  <!-- wizards start-->
  <div class="wizard2Wrapper" v-bind:class="size">
    <div class="wizard2Item" v-bind:class="{ active : item.isActive, tip:item.isWarn }"
         v-for="item in wizardTabs"
         v-on:click="onClick(item)">
      <div class="decorationArea">
        <div class="decorationLeft"></div>
        <div class="decorationRight"></div>
      </div>
      <div class="contArea">
        <div class="wizardNum">{{item.index}}</div>
        <div class="wizardName" :title="item.label">{{item.label}}</div>
        <div class="wizardRight icon-marvelIcon-66"></div>
        <div class="wizardRedPoint"></div>
      </div>
    </div>
  </div>
  <!-- wizards end-->
</template>

<script>
  /**
   *  MarvelWizardTab widget description
   *  @vuedoc
   *  @exports MarvelWizardTab
   */
  export default {
    name: 'MarvelWizardTab',
    props: {
      size: {
        type: String,
        default: "",
        required: false,
      },
      wizardTabs: {
        type: Array,
        default: undefined,
        required: true,
      },
      custom: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: function () {
      return {}
    },
    methods: {
      //#region inner

      onClick: function (oClickItem) {
        for (var i = 0; i < this.wizardTabs.length; i++) {
          var oItem = this.wizardTabs[i];
          if(this.custom != true){
            if (oItem.index == oClickItem.index) {
              oItem.isActive = true;
            } else {
              oItem.isActive = false;
            }
          }
        }
        this.callback4OnClick(oClickItem);
      },

      //#endregion
      //#region callback

      callback4OnClick: function (oClickItem) {
        this.$emit("onClick", oClickItem);
      },

      //#endregion
      //#region 3rd

      setItemWarnOrNot: function (arrItemIndex, bIsWarn) {
        for (var i = 0; i < this.wizardTabs.length; i++) {
          var oItem = this.wizardTabs[i];
          if (arrItemIndex.indexOf(oItem.index) != -1 && bIsWarn) {
            oItem.isWarn = true;
          } else if (arrItemIndex.indexOf(oItem.index) != -1 && !bIsWarn) {
            oItem.isWarn = false;
          }
        }
      },
      setItemActive: function (arrItemIndex) {
        for (var i = 0; i < this.wizardTabs.length; i++) {
          var oItem = this.wizardTabs[i];
          if (arrItemIndex.indexOf(oItem.index) != -1) {
            this.onClick(oItem)
          }
        }
      },
      setItemAddActiveCss: function (arrItemIndex) {
        for (var i = 0; i < this.wizardTabs.length; i++) {
          var oItem = this.wizardTabs[i];
          if (arrItemIndex.indexOf(oItem.index) != -1) {
            oItem.isActive = true;
          } else {
            oItem.isActive = false;
          }
        }
      }

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
  .wizard2Wrapper {
    height: 22px;
  }

  .wizard2Item {
    height: 100%;
    float: left;
    overflow: hidden;
    margin-right: 10px;
    position: relative;
    cursor: pointer;
  }

  .decorationArea {
    height: 100%;
  }

  .decorationLeft {
    width: calc(100% - 13px);
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    float: left;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-right: none;
  }

  .decorationRight {
    float: left;
    width: 0;
    height: 0;
    position: relative;
    border-top: 11px solid transparent;
    border-bottom: 11px solid transparent;
    border-left: 13px solid rgba(0, 0, 0, 0.1);
  }

  .contArea {
    height: 100%;
    position: relative;
    top: -22px;
    overflow: hidden;
  }

  .wizardNum {
    float: left;
    position: relative;
    margin-right: 10px;
    display: inline-block;
    color: #fff;
    font-size: 14px;
    line-height: 22px;
    background-color: #ccc;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .wizardNum:after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    display: inline-block;
    top: 0;
    right: -10px;
    border-top: 0px solid transparent;
    border-bottom: 22px solid transparent;
    border-left: 10px solid #ccc;
  }

  .wizardName {
    float: left;
    display: inline-block;
    color: #333;
    font-size: 12px;
    line-height: 22px;
    padding-left: 6px;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (min-width: 1500px) {
    .wizardName {
      font-size: 14px;
      padding-right: 10px;
      max-width: 160px;
    }
  }

  .wizardRight {
    float: left;
    width: 13px;
    display: inline-block;
    font-size: 22px;
    line-height: 22px;
    color: #ccc;
    text-align: left;
  }

  .wizardRedPoint {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #ff4400;
    display: none;
  }

  .tip .wizardRedPoint {
    display: block;
  }

  .active .decorationArea .decorationLeft {
    background-color: rgba(51, 153, 255, 0.4);
    border: 1px solid #3399ff;
    border-right: none;
  }

  .active .decorationArea .decorationRight {
    border-left: 13px solid rgba(51, 153, 255, 0.4);
  }

  .active .contArea .wizardNum {
    background-color: #3399ff;
  }

  .active .contArea .wizardNum:after {
    border-top: 0px solid transparent;
    border-bottom: 22px solid transparent;
    border-left: 10px solid #3399ff;
  }

  .active .contArea .wizardRight {
    color: #3399ff;
  }

  .large {
    height: 26px;
  }

  .large .wizard2Item {
    margin-right: 14px;
  }

  .large .decorationLeft {
    width: calc(100% - 16px);
  }

  .large .decorationRight {
    border-top: 13px solid transparent;
    border-bottom: 13px solid transparent;
    border-left: 13px solid rgba(0, 0, 0, 0.1);
  }

  .large .contArea {
    top: -26px;
  }

  .large .wizardNum {
    font-size: 16px;
    line-height: 26px;
  }

  .large .wizardNum:after {
    border-bottom: 26px solid transparent;
  }

  .large .wizardName {
    font-size: 16px;
    line-height: 26px;
    padding-right: 10px;
    max-width: 220px;
  }

  .large .active .contArea .wizardNum:after {
    border-bottom: 26px solid transparent;
  }

  /*region dark theme*/

  .dark .wizard2Item .decorationArea .decorationLeft {
    background-color: rgba(54, 54, 90, 0.4);
    border: 1px solid #8b90b3;
    border-right: none;
  }

  .dark .wizard2Item .decorationArea .decorationRight {
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: rgba(54, 54, 90, 0.4);
  }

  .dark .wizard2Item .contArea {
  }

  .dark .wizard2Item .contArea .wizardNum {
    color: #ffffff;
    background-color: #8b90b3;
  }

  .dark .wizard2Item .contArea .wizardNum:after {
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: #8b90b3;
  }

  .dark .wizard2Item .contArea .wizardName {
    color: #ffffff;
  }

  .dark .wizard2Item .contArea .wizardRight {
    color: #8b90b3;
  }

  .dark .active .decorationArea .decorationLeft {
    background-color: rgba(61, 202, 166, 0.4);
    border: 1px solid #3dcca6;
    border-right: none;
  }

  .dark .active .decorationArea .decorationRight {
    border-left-color: rgba(61, 202, 166, 0.4);
  }

  .dark .active .contArea .wizardNum {
    background-color: #3dcca6;
  }

  .dark .active .contArea .wizardNum:after {
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: #3dcca6;
  }

  .dark .active .contArea .wizardRight {
    color: #3dcca6;
  }

  /*endregion*/
</style>
