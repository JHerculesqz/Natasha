<template>
  <div class="contextMenuWrapper_text"
       v-bind:class="{ dpn: !show }"
       v-bind:style="{ top: top + 'px', left: left + 'px'}"
       v-click-outside="hideSubMenu">
    <div v-for="item in items"
         class="contextMenuItem"
         v-bind:title="item.label">
      <div v-if="item.subMenu" class="multiItem"
           v-on:click="onMenuItemWithSubMenuClick(item)">
        <div class="firstLevelLabel">{{item.label}}</div>
        <div class="subMenuIcon icon-marvelIcon-23"></div>
        <div class="subMenuWrapper"  :class="{show: currentShowSubMenu == item}">
          <div v-for="subMenuItem in item.subMenu" class="subMenuItem"
               v-on:click="onMenuItemClick(subMenuItem.label, subMenuItem)">{{subMenuItem.label}}</div>
        </div>
      </div>
      <div v-else class="singleItem" v-on:click="onMenuItemClick(item.label, item)">{{item.label}}</div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelMenuContext2',
    props: ["items"],
    data: function() {
        return {
          show: false,
          top: 0,
          left: 0,
          currentShowSubMenu:{}
        }
    },
    methods: {
      showSubMenu: function(iX, iY){
        //1.show subMenu
        this.show = true;
        this.top = iY;
        this.left = iX;
      },
      hideSubMenu: function(){
        this.show = false;
        this.currentShowSubMenu = {};
      },
      onMenuItemClick: function(strMenuItemLabel){
        this.$emit("onMenuItemClick", strMenuItemLabel);
      },
      onMenuItemWithSubMenuClick:function(oItem){
        if(oItem == this.currentShowSubMenu){
          this.currentShowSubMenu = {};
        }else{
          this.currentShowSubMenu = oItem;
        }
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
  .dpn{
    display: none;
  }

  .contextMenuWrapper_text{
    position: fixed;
    background-color: #FFFFFF;
    border-radius: 4px;
    padding: 2px 0px;
    border: 1px solid #cccccc;
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.15);
    z-index: 1000;
  }
  .contextMenuWrapper_text .contextMenuItem{
    height: 32px;
    padding: 0 6px;
  }
  .contextMenuWrapper_text .contextMenuItem .multiItem{
    height: 100%;
    position: relative;
  }
  .contextMenuWrapper_text .contextMenuItem .multiItem .firstLevelLabel{
    padding-right: 20px;
    box-sizing: border-box;
    height: 100%;
    text-align: left;
    line-height: 32px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }
  .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuIcon{
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    line-height: 32px;
    font-size: 12px;
    color: #666;
  }
  .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper{
    position: absolute;
    top: 4px;
    left: calc(100% - 4px);
    background-color: #FFFFFF;
    border-radius: 4px;
    padding: 2px 0px;
    border: 1px solid #cccccc;
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.15);
    display: none;
  }

  .contextMenuWrapper_text .contextMenuItem .multiItem .show{
    display: block;
  }

  .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper .subMenuItem{
    height: 32px;
    padding: 0 6px;
    text-align: left;
    line-height: 32px;
    font-size: 12px;
    color: #666;
    cursor: pointer;
  }
  .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper .subMenuItem:hover{
    background-color: #f0f0f0;
    color: #3399ff;
  }
  .contextMenuWrapper_text .contextMenuItem .singleItem{
    height: 100%;
    text-align: left;
    line-height: 32px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }
  .contextMenuWrapper_text .contextMenuItem:hover{
    background-color: #f0f0f0;
    color: #3399ff;
  }

  /*region dark theme*/

  .dark .contextMenuWrapper_text{
    background-color: rgba(0,0,0,0.8);
    border: 1px solid #3dcca6;
    box-shadow: none;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .multiItem .firstLevelLabel{
    color: #8b90b3;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuIcon{
    color: #8b90b3;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper{
    background-color: rgba(0,0,0,0.8);
    border: 1px solid #3dcca6;
    box-shadow: none;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper .subMenuItem{
    color: #8b90b3;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper .subMenuItem:hover{
    background-color: #1d3b60;
    color: #3dcca6;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .singleItem{
    color: #8b90b3;
  }

  .dark .contextMenuWrapper_text .contextMenuItem:hover{
    background-color: #1d3b60;
    color: #3dcca6;
  }

  /*endregion*/
</style>
