<template>
  <!--使用潜规则 父容器高度应保证大于78px-->
  <!-- wizards start-->
  <div class="wizardsWrapper">
    <div class="wizardsItem"
         v-for="item in items"
         v-bind:class="{ complected: item.complected }"
         v-bind:style="{ width: 100 / items.length + '%' }" v-on:click="onWizardClick(item)">
      <div class="name">{{ item.label }}</div>
      <div class="decoration">
        <div class="bar"></div>
        <div class="circle icon-marvelIcon-09"></div>
        <div class="num">{{ item.index }}</div>
      </div>
    </div>
  </div>
  <!-- wizards end-->
</template>

<script>
  export default {
    name: 'MarvelWizard',
    props: ["items"],
    data: function() {
        return {

        }
    },
    methods: {
      setProgress: function(iIndex){
        for(var i=0;i<this.items.length;i++){
          var oItem = this.items[i];
          if(oItem.index > iIndex){
            var strTmp = oItem.label;
            oItem.label = " ";
            oItem.label = strTmp;
            oItem.complected = false;
          }
        }

        for(var i=0;i<this.items.length;i++){
          var oItem = this.items[i];
          if((oItem.index == iIndex)||((oItem.index < iIndex)&&(oItem.complected == false))){
            var strTmp = oItem.label;
            oItem.label = " ";
            oItem.label = strTmp;
            oItem.complected = true;
          }
        }
      },
      onWizardClick: function(oItem){
          this.setProgress(oItem.index);
          this.$emit("onWizardClick", oItem);
      }
    }
  }
</script>

<style scoped>
  .wizardsWrapper{
    height: 100%;
    width: 100%;
    overflow:hidden;
  }
  .wizardsWrapper .wizardsItem{
    height: 100%;
    float: left;
  }
  .wizardsWrapper .wizardsItem .name{
    height: 16px;
    line-height: 16px;
    color: #666;
    margin-bottom: 10px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .wizardsWrapper .wizardsItem .decoration{
    height: 50px;
    position: relative;
  }
  .wizardsWrapper .wizardsItem .decoration .bar{
    height: 5px;
    position: absolute;
    width: 100%;
    top: 22.5px;
    left: 0px;
    background-color: #e2e2e2;
  }
  .wizardsWrapper .wizardsItem .decoration .circle{
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    line-height: 50px;
    text-align: center;
    font-size: 50px;
    color: #e2e2e2;
  }
  .wizardsWrapper .wizardsItem .decoration .num{
    height: 100%;
    line-height: 50px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    text-align: center;
    font-size: 16px;
  }

  .wizardsWrapper .complected .name{
    color: #3dcca6;
  }
  .wizardsWrapper .complected .decoration .bar{
    background-color: #3dcca6;
  }
  .wizardsWrapper .complected .decoration .circle{
    color: #3dcca6;
  }
  .wizardsWrapper .complected .decoration .num{
    color: #fff;
  }
</style>
