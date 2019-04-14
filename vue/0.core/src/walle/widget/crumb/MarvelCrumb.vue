<template>
  <!--crumb Start-->
  <div class="crumbWrapper" v-bind:class="[theme]">
    <div class="crumbItem" v-for="item in items">
      <div class="name" v-on:click="onCrumbItemClick(item.label)">{{ item.label }}</div>
      <div class="symbol icon-marvelIcon-02"></div>
    </div>
  </div>
  <!--crumb End-->
</template>

<script>
  export default {
    name: 'MarvelCrumb',
    props: ["items", "theme"],
    data: function() {
        return {

        }
    },
    methods: {
      onCrumbItemClick: function(strItemLabel){
        this.$emit("onCrumbItemClick", strItemLabel);
      }
    }
  }
</script>

<style scoped>
  .crumbWrapper{
    overflow: hidden;
    height: 14px;
  }
  .crumbWrapper .crumbItem{
    float: left;
  }
  .crumbWrapper .crumbItem .name,.crumbWrapper .crumbItem .symbol{
    float: left;
    font-size: 12px;
    color: #666;
    line-height: 14px;
    margin-right: 5px;
    cursor: pointer;
  }
  .crumbWrapper .crumbItem .name:hover{
    color: #3399ff;
  }
  .crumbWrapper .crumbItem:last-child .name{
    font-weight: bold;
  }
  .crumbWrapper .crumbItem:last-child .name:hover{
    color: #666;
  }
  .crumbWrapper .crumbItem:last-child .symbol{
    display: none;
  }
  .dark .crumbItem .name,.dark .crumbItem .symbol{
    color: #fff;
  }
  .dark .crumbItem:last-child .name:hover{
    color: #fff;
  }
</style>
