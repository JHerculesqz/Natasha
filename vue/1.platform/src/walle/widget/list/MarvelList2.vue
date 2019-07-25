<template>
  <div class="dashboard2Wrapper" v-bind:style="[{ 'z-index': zIndex }, oStyle]"
       v-bind:class="{ expand: isExpand }">
    <div class="dashboardExpandFolderIcon"
         v-on:click="onExpandBtnClick4Legend"
         :title="title">
      <div v-bind:class="listIcon"></div>
      <div class="legendTxt">{{title}}</div>
      <div class="tipInfo" v-if="bargeCount>0">{{ bargeCount }}</div>
    </div>
    <div class="dashboardContArea">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelList2 widget description
   *  @vuedoc
   *  @exports MarvelList2
   */
  export default {
    name: 'MarvelList2',
    props: {
      bargeCount: {
        type: Number,
        default: 0,
        required: false,
      },
      title: {
        type: String,
        default: "",
        required: false,
      },
      oStyle: {
        type: Object,
        default: {},
        required: false,
      },
    },
    data: function () {
      return {
        isExpand: false,
        zIndex: 2000,
        listIcon: "icon-arrow-up-right2"
      }
    },
    methods: {
      //#region inner

      onExpandBtnClick4Legend: function () {
        this.isExpand = !this.isExpand;
        this.listIcon = (this.listIcon == "icon-arrow-up-right2") ? "icon-arrow-down-left2" : "icon-arrow-up-right2";
        this.callback4OnExpandBtnClick4Legend(this.isExpand);
      },

      //#endregion
      //#region callback

      callback4OnExpandBtnClick4Legend: function (isExpand) {
        this.$emit("onExpandBtnClick4Legend", isExpand);
      },

      //#endregion
      //#region 3rd

      isLegendExpand: function () {
        return this.isExpand;
      },
      setZIndex: function (iNum) {
        this.zIndex = iNum;
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

  .dashboard2Wrapper {
    position: absolute;
    bottom: 20px;
    top: 440px;
    background-color: #ffffff;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    width: 46px;
    height: 46px;
    left: 256px;
  }

  .expand {
    height: 460px;
    width: 300px;
    border-radius: 4px;
    top: 280px;
  }

  @media (min-width: 1500px) {
    .dashboard2Wrapper {
      top: 620px;
    }

    .expand {
      top: 450px;
    }
  }

  .animate {
    -webkit-transition: all 1s ease-in-out 0s;
    -moz-transition: all 1s ease-in-out 0s;
    -ms-transition: all 1s ease-in-out 0s;
    -o-transition: all 1s ease-in-out 0s;
    transition: all 1s ease-in-out 0s;
  }

  .dashboard2Wrapper .dashboardExpandFolderIcon {
    width: 46px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    font-size: 18px;
    position: absolute;
    color: #3399ff;
    cursor: pointer;
  }

  .dashboard2Wrapper .dashboardExpandFolderIcon .tipInfo {
    background-color: #ff4c4c;
    border-radius: 20px;
    position: absolute;
    color: #ffffff;
    font-size: 12px;
    line-height: 20px;
    padding: 0 6px;
    top: -4px;
    right: -4px;
  }

  .dashboard2Wrapper .dashboardContArea {
    display: none;
  }

  .expand .dashboardExpandFolderIcon {
    background-color: #ffffff;
    top: 170px;
    left: -10px;
    border-radius: 100%;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.15);
  }

  .expand .dashboardExpandFolderIcon .tipInfo {
    display: none;
  }

  .expand .dashboardContArea {
    display: block;
    width: 300px;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
  }

  .dashboard2Wrapper .dashboardExpandFolderIcon .legendTxt {
    height: 25px;
    line-height: 25px;
    width: 100%;
    font-size: 12px;
  }

  /*region dark theme*/

  .dark .dashboard2Wrapper {
    background-color: #41475a;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
  }

  .dark .dashboard2Wrapper .dashboardExpandFolderIcon {
    color: #3399ff;
  }

  .dark .dashboard2Wrapper .dashboardExpandFolderIcon .tipInfo {
    background-color: #ff4c4c;
    color: #ffffff;
  }

  .dark .expand .dashboardExpandFolderIcon {
    background-color: #41475a;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.15);
  }

  /*endregion*/
</style>
