<template>
  <div class="marvelWizardAdvanceWrapper">
    <div class="preStepArea" v-if="showStepArea">
      <div v-bind:class="{'icon-marvelIcon-08':true, 'preIcon':canClickPreBtn, 'preIconNoClick':!canClickPreBtn}"
           @click="onClickPreBtn"></div>
    </div>
    <div class="wiazrdArea">
      <div class="wizardsItemContiner" :id="wizardsItem.id" v-if="wizardsItem.isShow" :key="wizardsItem.id"
           v-for="wizardsItem in arrItems">
        <div class="decorationArea">
          <template v-if="wizardsItem.isActive">
            <div class="decorationLeftActive"></div>
            <div class="decorationCenterActive"></div>
            <div class="decorationRightActive"></div>
          </template>
          <template v-else>
            <div class="decorationLeft"></div>
            <div class="decorationCenter"></div>
            <div class="decorationRight"></div>
          </template>
        </div>
        <div class="contArea" v-on:click="onClickItem(wizardsItem)">
          <template v-if="wizardsItem.isActive">
            <div v-if="wizardsItem.isFinish" class="wizardsItemFinishActive icon-checkmark"></div>
            <div class="wizardsItemTextActive">
              {{ wizardsItem.label }}
            </div>
            <div class="wizardRightActive icon-marvelIcon-24" v-if="showSubMenuIcon(wizardsItem)"
                 @click.stop="showSubMenu(wizardsItem)"></div>
          </template>
          <template v-else>
            <div v-if="wizardsitem.isFinish" class="wizardsItemFinish icon-checkmark"></div>
            <div class="wizardsItemText">
              {{ wizardsItem.label }}
            </div>
            <div class="wizardRight icon-marvelIcon-24" v-if="showSubMenuIcon(wizardsItem)"
                 @click.stop="showSubMenu(wizardsItem)"></div>
          </template>
        </div>
        <div class="userInfoSubMenu" :ref="wizardsItem.id" v-bind:style="genLeftStyle(wizardsItem)"
             v-bind:class="calcLeftCtyle(wizardsItem)" v-show="wizardsItem.isShowSubItem" v-click-outside = "hideSubMenu">
          <div class="topTriangle"></div>
          <div class="userInfoSubMenuCont">
            <div class="userInfoSubMenuItem" v-for="item in wizardsItem.subItems">
              <div class="userInfoSubMenuItemName" v-on:click.stop="clickSubMenu(wizardsItem, item.label)">
                {{item.label}}
              </div>
            </div>
          </div>
        </div>
        <div v-if="wizardsItem.isWarning" class="wizardWarningDiv"><span class="wizardWarningNum">wizardsItem.warningNum</span>
        </div>
      </div>
    </div>
    <div class="nextStepArea" v-if="showStepArea">
      <div v-bind:class="{'icon-marvelIcon-06':true, 'nextIcon':canClickNextBtn, 'nextIconNoClick':!canClickNextBtn}"
           @click="onClickNextBtn"></div>
    </div>
  </div>
</template>

<script>
  import MarvelMenuDropDown from "../menudropdown/MarvelMenuDropDown";
  /**
   *  MarvelWizardAdvance widget description
   *  @vuedoc
   *  @exports MarvelWizardAdvance
   */
  export default {
    name: 'MarvelWizardAdvance',
    components:{
      MarvelMenuDropDown
    },
    props: {
      wizardsItems: {
        type: Array,
        default: undefined,
        required: true,
      }
    },
    data: function () {
      return {}
    },
    methods: {
      //#region inner

      onWizardClick: function (oItem) {
        this.setProgress(oItem.index);
        this.callback4OnWizardClick(oItem);
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
