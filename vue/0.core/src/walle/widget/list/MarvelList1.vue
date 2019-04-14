<template>
  <div class="dashboard2Wrapper animate" v-bind:class="{ expand: isExpand }">
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
          <div>设备ID：<span>{{item.devId}}</span></div>
          <div>设备名称：<span>{{item.devName}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelList1',
    props: ["items", "bargeCount"],
    data: function() {
      return {
        isExpand: false
      }
    },
    methods: {
      onExpandBtnClick: function(){
        this.isExpand = !this.isExpand;
      },
      onListItemClick: function(oItem){
        this.$emit("onListItemClick", oItem);
      }
    }
  }
</script>

<style scoped>
  .animate{
    -webkit-transition: all 1s ease-in-out 0s;
    -moz-transition: all 1s ease-in-out 0s;
    -ms-transition: all 1s ease-in-out 0s;
    -o-transition: all 1s ease-in-out 0s;
    transition: all 1s ease-in-out 0s;
  }
  .dashboard2Wrapper{
    position: absolute;
    bottom: 20px;
    right: 20px;
    background-color: #41475a;
    box-shadow: 2px 3px 4px rgba(0,0,0,0.25);
    border-radius: 24px;
    width: 46px;
    height: 46px;
    z-index: 2000;
  }
  .dashboard2Wrapper .dashboardExpandFolderIcon{
    width: 46px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    font-size: 18px;
    position: absolute;
    color: #3399ff;
  }
  .dashboard2Wrapper .dashboardExpandFolderIcon .tipInfo{
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
  .dashboard2Wrapper .dashboardContArea{
    display: none;
  }

  .expand{
    height: 106px;
    width: calc(100% - 40px);
    border-radius: 4px;
  }
  .expand .dashboardExpandFolderIcon{
    background-color: #41475a;
    top: -10px;
    left: -10px;
    border-radius: 100%;
    box-shadow: 2px 3px 4px rgba(0,0,0,0.15);
  }
  .expand .dashboardExpandFolderIcon .tipInfo{
    display: none;
  }
  .expand .dashboardContArea{
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .dashboardContArea .deviceItem{
    display: inline-block;
    height: 100%;
    overflow: hidden;
    padding: 10px;
    margin-right: 20px;
    /*border: 1px solid transparent;*/
    box-sizing: border-box;
    border: 1px dashed rgba(255,255,255,0.2);
  }
  .dashboardContArea .deviceItem .deviceIcon{
    float: left;
    width: 48px;
    height: 48px;
    background-size: contain;
    position: relative;
  }
  .dashboardContArea .deviceItem .deviceIcon .addBtn{
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
  .dashboardContArea .deviceItem .deviceInfo{
    float: left;
    display: none;
    overflow-y: auto;
  }
  .dashboardContArea .deviceItem:hover{
    /*border: 1px dashed rgba(255,255,255,0.2);*/
  }
  .dashboardContArea .deviceItem:hover .deviceInfo{
    display: block;
    height: 100%;
    padding-left: 22px;
    line-height: 22px;
    font-size: 12px;
    font-family: arial, "微软雅黑", sans-serif;
    color: rgba(255,255,255,0.6);
  }
</style>
