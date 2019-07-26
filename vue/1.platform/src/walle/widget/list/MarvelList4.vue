<template>
  <div class="dashboard2Wrapper" v-bind:style="[{ 'z-index': zIndex }, {'left' : leftValue}]">
    <div class="dashboardExpandFolderIcon"
         v-on:click="onExpandBtnClick4Legend"
         :title="title">
      <div v-bind:class="listIcon"></div>
      <div class="legendTxt">{{title}}</div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelList4 widget description
   *  @vuedoc
   *  @exports MarvelList4
   */
  export default {
    name: 'MarvelList4',
    props: {
      title: {
        type: String,
        default: "",
        required: false,
      }
    },
    data: function () {
      return {
        isExpand: false,
        zIndex: 998,
        iConCustom: "icon-arrow-up-right2",
        leftValue: "0px",
      }
    },
    methods: {
      //#region inner

      onExpandBtnClick4Legend: function () {
        this.iConCustom = (this.iConCustom == "icon-arrow-up-right2") ? "icon-arrow-down-left2" : "icon-arrow-up-right2";
        this.callback4OnClick()
      },

      //#endregion
      //#region callback

      callback4OnClick: function () {
        this.$emit("onClick")
      },

      //#endregion
      //#region 3rd

      setZIndex: function (iNum) {
        this.zIndex = iNum;
      },
      setLeftValue: function (value) {
        this.leftValue = value;
      }

      //#endregion
    }
  }
</script>

<style scoped>
  /*region basic*/

  * {
    font-family: "Microsoft YaHei", "arial", sans-serif;
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
    background-color: #aaa;
  }

  /*endregion*/
  .dashboard2Wrapper {
    position: relative;
    background-color: #ffffff;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    width: 46px;
    height: 46px;
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

  .expand .dashboardExpandFolderIcon .legendTxt {
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
