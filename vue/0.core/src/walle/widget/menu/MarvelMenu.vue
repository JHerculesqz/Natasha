<template>
  <div class="menuNavWrapper" v-bind:class="[theme]">
    <div class="menuNavItemsWrapper">
      <div class="menuItem" v-for="item in items"
           v-bind:class="{ active: item.active }"
           v-on:click.stop="showSubMenu(item, this.event)">
        {{item.label}}
      </div>
    </div>

    <div class="subMenuItemsWrapper"
         v-bind:class="{ dpn: !show}"
         v-bind:style="{ top: top + 'px', left: left + 'px'}"
         v-click-outside="hideSubMenu">
      <div class="subMenuGroup" v-for="group in curMenuItem.groups">
        <div class="subMenuSession" v-for="session in group.sessions">
          <div class="subMenuTitle">{{ session.label }}</div>
          <div class="subMenuItem"
               v-for="item in session.items"
               v-on:click="subMenuItemClick(group, session, item)">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelMenu',
    props: ["items", "theme"],
    data: function() {
        return {
          curMenuItem: {},
          show: false,
          top: 0,
          left: 0
        }
    },
    methods: {
      showSubMenu: function(oClickItem, oEvent){
        //1.set active
        this.items.forEach(function(item){
          if(item.label == oClickItem.label){
            item.active = true;
          }
          else{
            item.active = false;
          }
        });

        //2.show subMenu
        this.curMenuItem = oClickItem;
        this.show = true;
        var iEleWidth = oEvent.target.offsetWidth;
        var iEleHeight = oEvent.target.offsetHeight;
        var iOffsetLeft = oEvent.target.getBoundingClientRect().left + window.scrollX;
        var iOffsetTop = oEvent.target.getBoundingClientRect().top + window.scrollY;
        this.top = iOffsetTop + iEleHeight;
        this.left = iOffsetLeft + iEleWidth/2;

        //3.emit event
        this.$emit("menuItemClick", this.curMenuItem);
      },
      hideSubMenu: function(){
        this.show = false;
      },
      subMenuItemClick: function(group, session, item){
          this.$emit("subMenuItemClick", this.curMenuItem, group, session, item);
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

  .menuNavWrapper{
    height: 50px;
    background-color: #17191f;
  }
  .menuNavWrapper .menuNavItemsWrapper{
    height: 50px;
  }
  .menuNavWrapper .menuItem{
    height: 47px;
    float: left;
    margin: 0 15px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 47px;
    color: #a7abbe;
    border-bottom: 3px solid rgba(0,0,0,0);
    cursor: pointer;
  }
  .menuNavWrapper .active{
    color: #fff;
    border-bottom: 3px solid #3399ff;
  }

  .subMenuItemsWrapper{
    position: fixed;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
    overflow: hidden;
    z-index: 2;
  }
  .subMenuItemsWrapper .subMenuGroup{
    padding: 0 30px;
    float: left;
  }
  .subMenuItemsWrapper .subMenuGroup .subMenuSession{
    padding: 20px 0;
  }
  .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuTitle{
    margin-bottom: 15px;
    font-size: 14px;
    color: #444;
  }
  .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuItem{
    font-size: 12px;
    color: #777;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuItem:last-child{
    margin-bottom: 0;
  }

  .dark{
    background-color: #17191f;
  }
  .dark .menuNavItemsWrapper{}
  .dark .menuItem{
    color: #a7abbe;
    border-bottom: 3px solid rgba(0,0,0,0);
  }
  .dark .active{
    color: #fff;
    border-bottom: 3px solid #3dcaa6;
  }

  .dark .subMenuItemsWrapper{
    background-color: #17191f;
    box-shadow: 0 3px 8px rgba(0,0,0,0.15);
  }
  .dark .subMenuItemsWrapper .subMenuGroup{}
  .dark .subMenuItemsWrapper .subMenuGroup .subMenuSession{}
  .dark .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuTitle{
    color: #ffffff;
  }
  .dark .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuItem{
    color: #a7abbe;
  }
  .dark .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuItem:last-child{
  }
</style>
