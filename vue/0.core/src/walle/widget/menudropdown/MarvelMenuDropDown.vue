<template>
  <div class="userInfoWrapper" v-bind:style="{ height: height }">
    <div class="userInfoLabel">
      <div class="labelIcon" v-bind:class="menus.mainMenu.icon"></div>
      <div class="mainMenu" v-on:click.stop="clickDropDownBtn">
        <div class="labelText">{{menus.mainMenu.label}}</div>
        <div class="labelDropDownIcon"></div>
      </div>
    </div>
    <div class="userInfoSubMenu" v-show="showSubMenu" v-click-outside="hideSubMenu">
      <div class="topTriangle"></div>
      <div class="userInfoSubMenuCont">
        <div class="userInfoSubMenuItem" v-for="item in menus.subMenu">
          <div class="userInfoSubMenuItemIcon" v-bind:class="item.icon"></div>
          <div class="userInfoSubMenuItemName" v-on:click="clickSubMenu(item.label)">{{item.label}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelMenuDropDown',
    props: ["menus","height"],
    data: function () {
      return {
        showSubMenu: false
      }
    },
    methods: {
      clickDropDownBtn: function () {
        this.showSubMenu = !this.showSubMenu;
      },
      clickSubMenu:function(strLabel){
        this.showSubMenu = false;
        this.$emit("clickSubMenu",strLabel);
      },
      hideSubMenu:function(){
        this.showSubMenu = false;
      }
    },
    directives:{
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
  .userInfoWrapper {
    height: 100%;
    position: relative;
    background-color: #1a1827;
  }

  .userInfoWrapper .userInfoLabel {
    height: 100%;
    overflow: hidden;
    cursor: pointer;
  }

  .userInfoWrapper .userInfoLabel .labelIcon {
    float: left;
    height: 100%;
    width: 48px;
    margin-right: 4px;
    padding: 13px 7px;
    box-sizing: border-box;
    pointer-events: none;
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
  .mainMenu{
    float:left;
    height:100%;
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
    color: #ffffff;
  }

  .userInfoWrapper .userInfoLabel .labelText {
    float: left;
    height: 100%;
    color: #ffffff;
    line-height: 60px;
    font-size: 12px;
    margin-right: 8px;
    pointer-events: none;
  }

  .userInfoWrapper .userInfoLabel .labelDropDownIcon {
    float: left;
    margin-top: 28px;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-top: 5px solid #cccccc;
  }

  .userInfoWrapper .userInfoSubMenu {
    position: absolute;
    top: 44px;
    z-index: 2;
  }

  .userInfoWrapper .userInfoSubMenu .topTriangle {
    width: 0;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 5px solid rgba(0, 0, 0, 0.4);
    margin: 0 auto;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont {
    background-color: #101a35;
    padding: 9px;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem {
    height: 24px;
    padding: 3px 10px;
    border: 1px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    box-sizing: border-box;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem:hover {
    background-color: rgba(61, 204, 166, 0.6);
    border: 1px solid #3dcaa6;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem .userInfoSubMenuItemIcon {
    display: inline-block;
    height: 18px;
    width: 18px;
    color: #ffffff;
  }

  .userInfoWrapper .userInfoSubMenu .userInfoSubMenuCont .userInfoSubMenuItem .userInfoSubMenuItemName {
    display: inline-block;
    position: relative;
    top: -4px;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
    color: #ffffff;
    white-space: nowrap;
  }

</style>
