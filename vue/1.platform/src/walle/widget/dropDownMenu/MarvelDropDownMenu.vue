<template>
  <div :id="dropDownMenuId" class="userInfoWrapper" v-bind:style="{ height: height }">
    <div class="userInfoLabel" v-if="type != 'Simplify'">
      <img class="labelIcon" :src="menus.mainMenu.icon" v-bind:style="{ top: iconTopPos }">
      <div class="mainMenu" v-on:click.stop="clickDropDownBtn">
        <div class="labelText" v-bind:style="{ 'line-height': height }">{{menus.mainMenu.label}}</div>
        <div class="labelDropDownIcon" v-bind:style="{ top: dropDownIconTop }"></div>
      </div>
    </div>
    <div class="userInfoLabelSimple" v-if="type == 'Simplify'" v-on:click.stop="clickDropDownBtn" v-bind:style="{ top: dropDownIconTop }">
      {{menus.mainMenu.label}}
    </div>
    <div class="userInfoSubMenu" v-show="showSubMenu" v-click-outside="hideSubMenu" v-bind:style="{ top: height,left: subMenuLeft + 'px' }">
      <div class="topTriangle"></div>
      <div class="userInfoSubMenuCont">
        <div class="userInfoSubMenuItem" v-for="item in menus.subMenu">
          <div class="userInfoSubMenuItemContainer" v-on:click="clickSubMenu(item.label)">
            <div class="userInfoSubMenuItemIcon" v-bind:class="item.icon"></div>
            <div class="userInfoSubMenuItemName">{{item.label}}</div>
            <div class="userInfoSubMenuItemOperationIcon"
                 v-if="item.operationIcons && item.operationIcons.length>0"
                 v-for="operation in item.operationIcons"
                 v-bind:class="operation.icon"
                 v-on:click.stop="clickOperationIcon(item.label, operation.icon)" ></div>
          </div>
          <div class="userInfoSecondLevelItem" v-if="item.subMenu" v-for="itemSub in item.subMenu">
            <div class="userInfoSecondLevelItemContainer" v-on:click="clickSubMenu(itemSub.label)">
              <div class="userInfoSecondLevelItemName">{{itemSub.label}}</div>
              <div class="userInfoSecondLevelItemOperationIcon"
                   v-if="itemSub.operationIcons && itemSub.operationIcons.length>0"
                   v-for="subOperation in itemSub.operationIcons"
                   v-bind:class="subOperation.icon"
                   v-on:click.stop="clickOperationIcon(itemSub.label, subOperation.icon)" ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StringUtilsEx from "../../component/str";
  /**
   *  MarvelMenuDropDown widget description
   *  @vuedoc
   *  @exports MarvelMenuDropDown
   */
  export default {
    name: 'MarvelMenuDropDown',
    props: {
      type: {
        type: String,
        default: "default",
        required: false,
        validator: function (str) {
          if (str == "default" || str == "Simplify") {
            return true;
          } else {
            return false;
          }
        }
      },
      menus: {
        type: Object,
        default: undefined,
        required: true,
      },
      height: {
        type: String,
        default: "50px",
        required: false,
      }
    },
    data: function () {
      return {
        dropDownMenuId:"",
        showSubMenu: false,
        subMenuLeft:0
      }
    },
    computed: {
      iconTopPos: function () {
        return (parseInt(this.height) - 34) / 2 + "px"
      },
      dropDownIconTop: function () {
        return (parseInt(this.height) - 5) / 2 + "px"
      },
    },
    created() {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.dropDownMenuId = StringUtilsEx.uuid();
      },

      //#endregion

      clickDropDownBtn: function () {
        this.callback4ClickDropDownBtn();
        this.showSubMenu = !this.showSubMenu;
        this.calSubMenuPos();
      },
      calSubMenuPos: function(){
        var iUserInfoW = 0;
        if(this.type == "Simplify"){
          iUserInfoW = parseInt($("#" + this.dropDownMenuId + " .userInfoLabelSimple").outerWidth());
        }else{
          iUserInfoW = parseInt($("#" + this.dropDownMenuId + " .userInfoLabel").outerWidth());
        }
        var iSubMenuW = parseInt($("#" + this.dropDownMenuId + " .userInfoSubMenu").outerWidth());

        this.subMenuLeft = -(iSubMenuW-iUserInfoW)/2;
        console.log(iUserInfoW);
        console.log(iSubMenuW);
        console.log(this.subMenuLeft);
      },
      clickSubMenu: function (strLabel) {
        this.showSubMenu = false;
        this.callback4ClickSubMenu(strLabel);
      },
      clickOperationIcon: function(strLabel, strIcon){
        this.callback4ClickOperationIcon(strLabel, strIcon);
      },
      hideSubMenu: function () {
        this.showSubMenu = false;
      },

      //#endregion
      //#region callback

      callback4ClickDropDownBtn: function () {
        this.$emit("clickDropDownBtn");
      },
      callback4ClickSubMenu: function (strLabel) {
        this.$emit("clickSubMenu", strLabel);
      },
      callback4ClickOperationIcon: function (strLabel, strIcon) {
        this.$emit("clickOperationIcon", strLabel, strIcon);
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

  .userInfoWrapper {
    display: inline-block;
    height: 100%;
    position: relative;
    background-color: #ffffff;
  }

  .userInfoWrapper .userInfoLabel {
    height: 100%;
    overflow: hidden;
    cursor: pointer;
  }

  .userInfoWrapper .userInfoLabel .labelIcon {
    float: left;
    height: 34px;
    width: 34px;
    margin-right: 11px;
    pointer-events: none;
    border-radius: 100%;
    position: relative;
  }

  .userInfoWrapper .userInfoLabel .labelIcon:before {
    width: 34px;
    height: 34px;
    display: inline-block;
    font-size: 34px;
    line-height: 42px;
    text-align: center;
    overflow: hidden;
    background-color: #e6e6e6;
    border-radius: 100%;
    color: #c4c4c4;
  }

  .mainMenu {
    float: left;
    height: 100%;
  }

  .userInfoWrapper .userInfoLabel .hasNoBgColor:before {
    width: 34px;
    height: 34px;
    display: inline-block;
    font-size: 18px;
    line-height: 34px;
    text-align: center;
    overflow: hidden;
    background-color: transparent;
    border-radius: 0;
    color: #333;
  }

  .userInfoWrapper .userInfoLabel .labelText {
    float: left;
    height: 100%;
    color: #333;
    vertical-align: center;
    font-size: 12px;
    margin-right: 8px;
    pointer-events: none;
  }

  .userInfoWrapper .userInfoLabel .labelDropDownIcon {
    float: left;
    position: relative;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-top: 5px solid #cccccc;
  }

  .userInfoWrapper .userInfoLabelSimple{
    height: 20px;
    border-radius: 30px;
    line-height: 20px;
    text-align: center;
    padding: 0 8px;
    font-size: 12px;
    color: #ffffff;
    background-color: #3399ff;
    display: inline-block;
    cursor: pointer;
    position: relative;
  }

  .userInfoWrapper .userInfoSubMenu {
    position: absolute;
    z-index: 1003;
  }

  .userInfoWrapper .userInfoSubMenu .topTriangle {
    width: 0;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 5px solid #f0f0f0;
    margin: 0 auto;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont {
    background-color: #f0f0f0;
    padding: 9px;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem {
    border: 1px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    box-sizing: border-box;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItemContainer{
    height: 24px;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem:hover {
    background-color: rgba(61, 204, 166, 0.6);
    border: 1px solid #3dcaa6;
    overflow: hidden;
    clear: both;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem .userInfoSubMenuItemIcon {
    float: left;
    font-size: 18px;
    height: 18px;
    line-height: 24px;
    width: 18px;
    color: #666666;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem .userInfoSubMenuItemName {
    float: left;
    height: 18px;
    line-height: 24px;
    margin-left: 6px;
    font-size: 12px;
    color: #666666;
    white-space: nowrap;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem .userInfoSubMenuItemName:hover {
    color: #ffffff;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSecondLevelItem {
    height: 20px;
    border: 1px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    box-sizing: border-box;
    clear: both;
  }

  .userInfoSecondLevelItemContainer{
    padding-left: 24px;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSecondLevelItem .userInfoSecondLevelItemName {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #666666;
    white-space: nowrap;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSecondLevelItem .userInfoSecondLevelItemName:hover{
    color: #ffffff;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSecondLevelItem .userInfoSecondLevelItemOperationIcon {
    display: inline-block;
    height: 20px;
    font-size: 14px;
    line-height: 20px;
    width: 18px;
    color: #3399ff;
    margin-left: 6px;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSecondLevelItem .userInfoSecondLevelItemOperationIcon:hover {
    font-size: 18px;
  }

  /*region dark theme*/

  .dark .userInfoWrapper {
    background-color: transparent;
  }

  .dark .userInfoWrapper .userInfoLabel .labelIcon:before {
    background-color: #e6e6e6;
    color: #c4c4c4;
  }

  .dark .userInfoWrapper .userInfoLabel .hasNoBgColor:before {
    color: #ffffff;
  }

  .dark .userInfoWrapper .userInfoLabel .labelText {
    float: left;
    height: 100%;
    color: #ffffff;
  }

  .dark .userInfoWrapper .userInfoLabel .labelDropDownIcon {
    border-top: 5px solid #cccccc;
  }

  .dark .userInfoWrapper .userInfoSubMenu {
  }

  .dark .userInfoWrapper .userInfoSubMenu .topTriangle {
    border-bottom: 5px solid rgba(0, 0, 0, 0.4);
  }

  .dark .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont {
    background-color: #101a35;
  }

  .dark .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem:hover {
    background-color: rgba(61, 204, 166, 0.6);
    border: 1px solid #3dcaa6;
  }

  .dark .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem .userInfoSubMenuItemIcon {
    color: #ffffff;
  }

  .dark .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem .userInfoSubMenuItemName {
    color: #ffffff;
  }

  /*endregion*/

</style>
