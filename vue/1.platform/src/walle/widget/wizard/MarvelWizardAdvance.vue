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
            <div v-if="wizardsItem.isFinish" class="wizardsItemFinish icon-checkmark"></div>
            <div class="wizardsItemText">
              {{ wizardsItem.label }}
            </div>
            <div class="wizardRight icon-marvelIcon-24" v-if="showSubMenuIcon(wizardsItem)"
                 @click.stop="showSubMenu(wizardsItem)"></div>
          </template>
        </div>
        <div class="userInfoSubMenu" :ref="wizardsItem.id" v-bind:style="genLeftStyle(wizardsItem)"
             v-bind:class="calcLeftCtyle(wizardsItem)" v-show="wizardsItem.isShowSubItem" v-click-outside="hideSubMenu">
          <div class="topTriangle"></div>
          <div class="userInfoSubMenuCont">
            <div class="userInfoSubMenuItem" v-for="item in wizardsItem.subItems">
              <div class="userInfoSubMenuItemName" v-on:click.stop="clickSubMenu(wizardsItem, item.label)">
                {{item.label}}
              </div>
            </div>
          </div>
        </div>
        <div v-if="wizardsItem.isWarning" class="wizardWarningDiv"><span class="wizardWarningNum">{{wizardsItem.warningNum }}</span>
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
    components: {
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
      return {
        arrItems: [],
        firstShowItem: undefined,
        lastShowItem: undefined,
        canClickPreBtn: false,
        canClickNextBtn: false,
        showStepArea: false,
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    watch: {
      wizardsItems: {
        handler(newVal) {
          this.arrItems = JSON.parse(JSON.stringify(newVal));
          for (var i = 0; i < this.arrItems.length; i++) {
            var oItem = this.arrItems[i];
            this.$set(oItem, "left", "0px");
            this.$set(oItem, "isShow", true);
          }
          this.calcItemShow();
        },
        deep: true
      }
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.arrItems = JSON.parse(JSON.stringify(this.wizardsItems));
        for (var i = 0; i < this.arrItems.length; i++) {
          var oItem = this.arrItems[i];
          this.$set(oItem, "left", "0px");
          this.$set(oItem, "isShow", true);
        }

        //1.计算isShow
        this.calcItemShow();
      },

      //#endregion

      calcItemShow: function () {
        this.$nextTick(() => {
          var iWidthParent = $("#" + this.arrItems[0].id).parent().width();
          let iWidthSum = 0;
          //是否找到最后一个元素
          let iActiveItemIndex = undefined;
          for (var i = this.arrItems.length - 1; i >= 0; i--) {
            var oWizardItem = this.arrItems[i];
            var iWidth = $("#" + oWizardItem.id).width();
            iWidthSum = iWidthSum + iWidth;
            if (oWizardItem.isActive) {
              if (undefined == iActiveItemIndex) {
                iActiveItemIndex = i;
              }
            }
          }
          if (iWidthSum < iWidthParent) {
            this.showStepArea = false;
            return;
          }

          let bIsLastShowItemFind = false;
          let bIsFirstShowItemFind = false;
          iWidthSum = 0;
          var oStandardItem = this.arrItems[iActiveItemIndex];
          iWidthSum = iWidthSum + $("#" + oStandardItem.id).width();
          var iIndexStep = 1;
          var iPreIndexDst = iActiveItemIndex;
          var iLastIndexDst = iActiveItemIndex;
          while (!bIsLastShowItemFind && !bIsFirstShowItemFind) {
            //1.寻找之前的元素
            var iPreIndex = iActiveItemIndex - iIndexStep;
            oStandardItem = this.arrItems[iPreIndex];
            //1.1.先判断index是否符合标准
            if (iPreIndex >= 0) {
              var oStandardPreItem = this.arrItems[iPreIndex];
              var iPreItemWidth = $("#" + oStandardItem.id).width();
              //1.2.如果加上这次的已经大于父容器的宽度，说明已经找到
              if (iWidthSum + iPreItemWidth >= iWidthParent) {
                bIsFirstShowItemFind = true;
                bIsLastShowItemFind = true;
              }
              //1.2.如果这次的还小于父容器的宽度，需要继续找到
              else {
                iPreIndexDst = iPreIndex;
                iWidthSum = iWidthSum + iPreItemWidth;
              }
            }

            //2.寻找之后的元素
            var iNextIndex = iActiveItemIndex + iIndexStep;
            if (iNextIndex < this.arrItems.length) {
              var oStandardNextItem = this.arrItems[iNextIndex];
              var iNextItemWidth = $("#" + oStandardNextItem.id).width();
              //1.2.如果加上这次的已经大于父容器的宽度，说明已经找到
              if (iWidthSum + iNextItemWidth >= iWidthParent) {
                bIsFirstShowItemFind = true;
                bIsLastShowItemFind = true;
              }
              //1.2.如果这次的还小于父容器的宽度，需要继续找到
              else {
                iLastIndexDst = iNextIndex;
                iWidthSum = iWidthSum + iNextItemWidth;
              }
            }
            iIndexStep++;
          }

          //3.find firstShowItem/lastShowItem
          this.firstShowItem = this.arrItems[iPreIndexDst];
          this.lastShowItem = this.arrItems[iLastIndexDst];

          //4.canClickPreBtn/canClickNextBtn
          if (iPreIndexDst == 0) {
            this.canClickPreBtn = false;
          } else {
            this.canClickPreBtn = true;
          }
          if (iLastIndexDst == this.arrItems.length - 1) {
            this.canClickNextBtn = false;
          } else {
            this.canClickNextBtn = true;
          }

          //5.set isShow
          for (var i = iPreIndexDst - 1; i >= 0; i--) {
            var oItem = this.arrItems[i];
            oItem.isShow = false;
          }
          for (var i = iLastIndexDst + 1; i < this.arrItems.length; i++) {
            var oItem = this.arrItems[i];
            oItem.isShow = false;
          }

          //6.set showStepArea
          this.showStepArea = true;
        });
      },
      onClickItem: function (oWizardsItem) {
        this.callback4OnClickItem(oWizardsItem);
      },
      hideSubMenu: function () {
        for (var i = 0; i < this.arrItems.length; i++) {
          var oWizardItem = this.arrItems[i];
          if (oWizardItem.subItems != undefined) {
            oWizardItem.isShowSubItem = false;
          }
        }
      },
      showSubMenu: function (wizardsItem) {
        wizardsItem.isShowSubItem = true;
      },
      clickSubMenu: function (oWizardsItem, strLabel) {
        oWizardsItem.isShowSubItem = false;
        this.callback4OnClickSubMenu(oWizardsItem, strLabel);
      },
      showSubMenuIcon: function (wizardsItem) {
        if (wizardsItem.subItems && wizardsItem.isShowSubIcon) {
          return true;
        } else {
          return false;
        }
      },
      calcLeftCtyle: function (oWizardsItem) {
        this.$nextTick(() => {
          var abc = this.$refs[oWizardsItem.id];
          var iWidth = $(abc).width();
          var iWidthParent = $(abc).parent().width();
          var iLeft = iWidthParent / 2 - iWidth / 2;
          oWizardsItem.left = iLeft + "px";
        });
      },
      genLeftStyle: function (wizardsItem) {
        return {
          left: wizardsItem.left
        }
      },
      onClickPreBtn: function () {
        var iFirstIndex = 0;
        var iLastIndex = 0;
        for (let i = 1; i < this.arrItems.length; i++) {
          var oPreItem = this.arrItems[i - 1];
          var oNextItem = this.arrItems[i];
          if (oNextItem.id == this.firstShowItem.id) {
            oPreItem.isShow = true;
            iFirstIndex = i - 1;
          }
          if (oNextItem.id == this.lastShowItem.id) {
            oNextItem.isShow = false;
            iLastIndex = i - 1;
          }
        }
        this.firstShowItem = this.arrItems[iFirstIndex];
        this.lastShowItem = this.arrItems[iLastIndex];
        if (this.lastShowItem.id == this.arrItems[this.arrItems.length - 1].id) {
          this.canClickNextBtn = false;
        } else {
          this.canClickNextBtn = true;
        }
        if (this.firstShowItem.id == this.arrItems[0].id) {
          this.canClickPreBtn = false;
        } else {
          this.canClickPreBtn = true;
        }
      },
      onClickNextBtn: function () {
        var iFirstIndex = 0;
        var iLastIndex = 0;
        for (let i = this.arrItems.length - 1; i > 0; i--) {
          var oPreItem = this.arrItems[i - 1];
          var oNextItem = this.arrItems[i];
          if (oPreItem.id == this.lastShowItem.id) {
            oNextItem.isShow = true;
            iLastIndex = i - 1;
          }
          if (oPreItem.id == this.firstShowItem.id) {
            oPreItem.isShow = false;
            iFirstIndex = i - 1;
          }
        }
        this.firstShowItem = this.arrItems[iFirstIndex];
        this.lastShowItem = this.arrItems[iLastIndex];
        if (this.lastShowItem.id == this.arrItems[this.arrItems.length - 1].id) {
          this.canClickNextBtn = false;
        } else {
          this.canClickNextBtn = true;
        }
        if (this.firstShowItem.id == this.arrItems[0].id) {
          this.canClickPreBtn = false;
        } else {
          this.canClickPreBtn = true;
        }
      },

      //#endregion
      //#region callback

      callback4OnClickItem: function (oWizardsItem) {
        this.$emit("onClickItem", oWizardsItem);
      },
      callback4OnClickSubMenu: function (oWizardsItem, strLabel) {
        this.$emit("onClickSubMenu", oWizardsItem, strLabel);
      },

      //#endregion
      //#region 3rd
      //#endregion
    },
    directives: {
      'click-outside': {
        bind: function (el, binding, vnode) {
          el.event = function (event) {
            if (!(el == event.target || el.contains(event.target))) {
              vnode.context[binding.expression](event);
            }
          };
          document.body.addEventListener('click', el.event);
        },
        unbind: function (el) {
          document.body.removeEventListener('click', el.event);
        }
      }
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
  .marvelWizardAdvanceWrapper {
    height: 100%;
    text-align: center;
    white-space: nowrap;
  }

  .preStepArea {
    float: left;
    width: 20px;
    height: 100%;
    background-color: #3399ff;
    margin-right: 10px;
  }

  .preIcon:before {
    line-height: 35px;
    color: #fff;
  }

  .preIcon:hover {
    cursor: pointer;
  }

  .preIconNoClick {
    line-height: 35px;
    color: #878787;
    pointer-events: none;
  }

  .preIconNoClick:hover {
    cursor: not-allowed;
  }

  .nextStepArea {
    float: right;
    width: 20px;
    height: 100%;
    background-color: #3399ff;
    margin-left: 10px;
  }

  .nextIcon:before {
    color: #fff;
    line-height: 35px;
  }

  .nextIconNoClick {
    color: #878787;
    line-height: 35px;
    pointer-events: none;
  }

  .nextIcon:hover {
    cursor: pointer;
  }

  .nextIconNoClick:hover {
    cursor: not-allowed;
  }

  .wiazrdArea {
    display: inline-block;
    width: calc(100% - 60px);
    height: 100%;
  }

  .wizardsItemContiner {
    margin-right: 8px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    position: relative;
  }

  .decorationArea {
    height: 100%;
  }

  .decorationLeft {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.0);
    float: left;
    box-sizing: border-box;
    border-top: 15px solid #fff;
    border-bottom: 15px solid #fff;
    border-left: 17px solid transparent;
  }

  .decorationLeftActive {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.0);
    float: left;
    box-sizing: border-box;
    border-top: 15px solid #3399ff;
    border-bottom: 15px solid #3399ff;
    border-left: 17px solid transparent;
  }

  .decorationCenter {
    float: left;
    width: calc(100% - 35px);
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
  }

  .decorationCenterActive {
    float: left;
    width: calc(100% - 35px);
    height: 100%;
    background-color: #3399ff;
    box-sizing: border-box;
  }

  .decorationRight {
    float: left;
    position: relative;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 17px solid #fff;
  }

  .decorationRightActive {
    float: left;
    position: relative;
    border-left: 17px solid #3399ff;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
  }

  .contArea {
    height: 100%;
    position: relative;
    top: -30px;
    margin-left: 19px;
    margin-right: 19px;
  }

  .contArea:hover {
    cursor: pointer;
  }

  .wizardsItemText {
    float: left;
    color: #000;
    background-color: #fff;
    margin-left: 8px;
    margin-right: 8px;
  }

  .wizardsItemTextActive {
    float: left;
    color: #fff;
    background-color: #3399ff;
    margin-left: 8px;
    margin-right: 8px;
  }

  .wizardsItemFinish {
    float: left;
    color: #000;
    background-color: #fff;
    margin-top: 6px;
    margin-left: 5px;
  }

  .wizardsItemFinishActive {
    float: left;
    color: #fff;
    background-color: #3399ff;
    margin-top: 6px;
    margin-left: 5px;
  }

  .wizardRightActive {
    float: left;
    width: 17px;
    display: inline-block;
    font-size: 16px;
    line-height: 30px;
    text-align: left;
    color: #fff;
  }

  .wizardRightActive:hover {
    cursor: pointer;
  }

  .wizardRight {
    float: left;
    width: 17px;
    display: inline-block;
    font-size: 16px;
    line-height: 30px;
    text-align: left;
    color: #000;
  }

  .wizardRight:hover {
    cursor: pointer;
  }

  .userInfoSubMenu {
    position: absolute;
    top: 30px;
    z-index: 2;
  }

  .userInfoSubMenu .topTriangle {
    width: 0;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 5px solid #f0f0f0;
    margin: 0 auto;
  }

  .userInfoSubMenu .userInfoSubMenuCont {
    padding: 9px;
    border: 1px solid #ccc;
    background-color: #ffffff;
  }

  .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem {
    height: 24px;
    padding: 3px 10px;
    border: 1px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    box-sizing: border-box;
  }

  .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem:hover {
    background-color: #f5f6f7;
  }

  .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem .userInfoSubMenuItemIcon {
    display: inline-block;
    height: 18px;
    width: 18px;
    color: #666666;
  }

  .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem .userInfoSubMenuItemName {
    display: inline-block;
    position: relative;
    top: -4px;
    height: 18px;
    line-height: 18px;
    font-size: 14px;
    color: #666666;
    white-space: nowrap;
  }

  .wizardWarningDiv {
    float: right;
    width: 20px;
    margin-top: -45px;
  }

  .wizardWarningNum {
    background: red;
    border-radius: 6px;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #fff;
    top: -14px;
    position: relative;
    padding: 0 5px;
  }
</style>
