<template>
  <div class="dashboard2Wrapper animate" v-bind:style="{ 'z-index': zIndex }"
       v-bind:class="{ expand: isExpand }">
    <div class="dashboardExpandFolderIcon animate icon-marvelIcon-26"
         v-on:click="onExpandBtnClick">
      <div class="tipInfo" v-if="bargeCount>0">{{ bargeCount }}</div>
    </div>
    <div class="dashboardContArea">
      <div class="deviceItem" v-for="item in items">
        <div class="deviceIcon"
             v-bind:style="{ background: 'url(' + item.icon + ') no-repeat center' }">
          <div class="addBtn icon-plus" v-on:click="onListItemClick(item)"></div>
        </div>
        <div class="deviceInfo">
          <div>{{$t("deviceId")}}<span>{{item.devId}}</span></div>
          <div>{{$t("deviceName")}}<span>{{item.devName}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
  {
  "zh": {
  "deviceId": "设备ID:",
  "deviceName": "设备名称:"
  },
  "en": {
  "deviceId": "Device ID:",
  "deviceName": "Device Name:"
  }
  }
</i18n>

<script>
  /**
   *  MarvelList1 widget description
   *  @vuedoc
   *  @exports MarvelList1
   */
  export default {
    name: 'MarvelList1',
    props: {
      items: {
        type: Array,
        default: undefined,
        required: true,
      },
      bargeCount: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    data: function () {
      return {
        isExpand: false,
        zIndex: 2000
      }
    },
    methods: {
      //#region inner

      onExpandBtnClick: function () {
        this.isExpand = !this.isExpand;
      },

      //#endregion
      //#region callback

      onListItemClick: function (oItem) {
        this.$emit("onListItemClick", oItem);
      },

      //#endregion
      //#region 3rd

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

  /*endregion*/

  .animate {
    -webkit-transition: all 1s ease-in-out 0s;
    -moz-transition: all 1s ease-in-out 0s;
    -ms-transition: all 1s ease-in-out 0s;
    -o-transition: all 1s ease-in-out 0s;
    transition: all 1s ease-in-out 0s;
  }

  .dashboard2Wrapper {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #ffffff;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    width: 46px;
    height: 46px;
  }

  .dashboard2Wrapper .dashboardExpandFolderIcon {
    width: 46px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    font-size: 18px;
    position: absolute;
    color: #3399ff;
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

  .expand {
    height: 106px;
    width: calc(100% - 40px);
    border-radius: 4px;
  }

  .expand .dashboardExpandFolderIcon {
    background-color: #ffffff;
    top: -10px;
    left: -10px;
    border-radius: 100%;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.15);
  }

  .expand .dashboardExpandFolderIcon .tipInfo {
    display: none;
  }

  .expand .dashboardContArea {
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .dashboardContArea .deviceItem {
    display: inline-block;
    height: 100%;
    overflow: hidden;
    padding: 10px;
    margin-right: 20px;
    /*border: 1px solid transparent;*/
    box-sizing: border-box;
    border: 1px dashed #ccc;
  }

  .dashboardContArea .deviceItem .deviceIcon {
    float: left;
    width: 48px;
    height: 48px;
    background-size: contain;
    position: relative;
  }

  .dashboardContArea .deviceItem .deviceIcon .addBtn {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 22px;
    height: 22px;
    background-color: #3dcca6;
    border-radius: 100%;
    line-height: 22px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
  }

  .dashboardContArea .deviceItem .deviceInfo {
    float: left;
    display: none;
    overflow-y: auto;
  }

  .dashboardContArea .deviceItem:hover {
    /*border: 1px dashed rgba(255,255,255,0.2);*/
  }

  .dashboardContArea .deviceItem:hover .deviceInfo {
    display: block;
    height: 100%;
    padding-left: 22px;
    line-height: 22px;
    font-size: 12px;
    font-family: arial, "Microsoft YaHei", sans-serif;
    color: #666;
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

  .dark .dashboardContArea .deviceItem {
    border: 1px dashed rgba(255, 255, 255, 0.2);
  }

  .dark .dashboardContArea .deviceItem .deviceIcon .addBtn {
    background-color: #3dcca6;
    color: #ffffff;
  }

  .dark .dashboardContArea .deviceItem:hover .deviceInfo {
    color: rgba(255, 255, 255, 0.6);
  }

  /*endregion*/
</style>
