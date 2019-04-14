<template>
  <div class="alarmGroup">
    <div class="alarm emergent" v-for="item in items"
         v-bind:class="[item.level]">
      {{ item.label }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelWarning',
    props: ["items"],
    data: function() {
        return {

        }
    }
  }
</script>

<style scoped>
  .alarmGroup{
    overflow: hidden;
    clear: both;
  }
  .alarmGroup .alarm{
    font-size: 14px;
    color: #293035;
    float: left;
    margin-right: 40px;
  }
  .alarmGroup .alarm:before{
    content: "";
    display: inline-block;
    margin-right: 10px;
    width: 12px;
    height: 12px;
    margin-top: 1px;
    border-radius: 100%;
  }
  .alarmGroup .alarm:last-child{
    margin-right: 0px;
  }
  .alarmGroup .level1:before{
    background-color: #ff4c4c;
  }
  .alarmGroup .level2:before{
    background-color: #ff8833;
  }
  .alarmGroup .level3:before{
    background-color: #f5df28;
  }
  .alarmGroup .level4:before{
    background-color: #3399ff;
  }
  .alarmGroup .level5:before{
    background-color: #3dcca6;
  }
  .alarmGroup .level6:before{
    background-color: #808080;
  }

  /*region dark theme*/
  .dark .alarm{
    color: #fff;
  }
  /*endregion*/
</style>
