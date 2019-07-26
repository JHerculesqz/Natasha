<template>
  <!--使用潜规则 父容器高度应保证大于78px-->
  <!-- wizards start-->
  <div class="wizardsWrapper">
    <div class="wizardsItem"
         v-for="item in items"
         v-bind:class="[{ complected: item.complected }, {unClickable: !isClickable}]"
         v-bind:style="{ width: 100 / items.length + '%' }" v-on:click="onWizardClick(item)">
      <div class="name" :title="item.label">{{ item.label }}</div>
      <div class="decoration">
        <div class="bar"></div>
        <div class="circle icon-marvelIcon-09"></div>
        <div class="num" :title="item.index">{{ item.index }}</div>
      </div>
    </div>
  </div>
  <!-- wizards end-->
</template>

<script>
  /**
   *  MarvelWizard widget description
   *  @vuedoc
   *  @exports MarvelWizard
   */
  export default {
    name: 'MarvelWizard',
    props: {
      items: {
        type: Array,
        default: undefined,
        required: true,
      },
      hasJudgeBeforeWizardSwitch:{
        type: Boolean,
        default: false,
        required: false,
      },
      isClickable: {
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

      onWizardClick: function (oItem) {
        if(this.hasJudgeBeforeWizardSwitch){
          this.callback4OnWizardClick(oItem);
        }else{
          this.setProgress(oItem.index);
          this.callback4OnWizardClick(oItem);
        }
      },

      //#endregion
      //#region callback

      callback4OnWizardClick: function (oItem) {
        this.$emit("onWizardClick", oItem);
      },

      //#endregion
      //#region 3rd

      setProgress: function (iIndex) {
        for (var i = 0; i < this.items.length; i++) {
          var oItem = this.items[i];
          if (oItem.index > iIndex) {
            var strTmp = oItem.label;
            oItem.label = " ";
            oItem.label = strTmp;
            oItem.complected = false;
          }
        }

        for (var i = 0; i < this.items.length; i++) {
          var oItem = this.items[i];
          if (oItem.index <= iIndex) {
            var strTmp = oItem.label;
            oItem.label = " ";
            oItem.label = strTmp;
            oItem.complected = true;
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
  .wizardsWrapper {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .wizardsWrapper .wizardsItem {
    height: 100%;
    float: left;
    cursor: pointer;
  }

  .wizardsWrapper .unClickable {
    pointer-events: none;
  }

  .wizardsWrapper .wizardsItem .name {
    height: 18px;
    line-height: 18px;
    font-size: 14px;
    color: #666;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .wizardsWrapper .wizardsItem .decoration {
    height: 50px;
    position: relative;
  }

  .wizardsWrapper .wizardsItem .decoration .bar {
    height: 5px;
    position: absolute;
    width: 100%;
    top: 22.5px;
    left: 0px;
    background-color: #e2e2e2;
  }

  .wizardsWrapper .wizardsItem .decoration .circle {
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

  .wizardsWrapper .wizardsItem .decoration .num {
    height: 100%;
    line-height: 50px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    text-align: center;
    font-size: 16px;
  }

  .wizardsWrapper .complected .name {
    color: #3dcca6;
  }

  .wizardsWrapper .complected .decoration .bar {
    background-color: #3dcca6;
  }

  .wizardsWrapper .complected .decoration .circle {
    color: #3dcca6;
  }

  .wizardsWrapper .complected .decoration .num {
    color: #fff;
  }

  /*region dark theme*/
  .dark .wizardsWrapper .wizardsItem .name {
    color: #8b90b3;
  }

  .dark .wizardsWrapper .complected .name {
    color: #3dcca6;
  }

  /*endregion*/
</style>
