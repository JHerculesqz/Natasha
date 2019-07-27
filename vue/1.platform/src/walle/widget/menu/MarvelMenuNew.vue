<template>
  <div class="menuNavWrapper">
    <div class="menuNavItemsWrapper">
      <div class="menuItem" v-for="item in items"
           v-on:click.stop="showSubMenu(item)">
        {{item.label}}{{flagVal}}
      </div>
    </div>

    <div class="subMenuItemsWrapper" @mouseleave="hideSubMenu()"
         v-bind:class="{ dpn: !show}"
         v-bind:style="{ top: top + 'px', left: left + 'px'}"
         v-click-outside="hideSubMenu">
      <div class="subMenuGroup" v-for="group in curMenuItem.groups">
        <div class="subMenuSession" v-for="session in group.sessions">
          <div class="subMenuTitle"><span v-bind:class="session.iconVal"></span>&nbsp:&nbsp:{{ session.label }}
          </div>
          <div class="subMenuItem" v-bind:class="item.disable"
               v-for="item in session.items"
               :title="item.label"
               v-on:click="subMenuItemClick(group, session, item)">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelMenuNew widget description
   *  @vuedoc
   *  @exports MarvelMenuNew
   */
  export default {
    name: 'MarvelMenuNew',
    props: {
      items: {
        type: Array,
        default: undefined,
        required: true,
      }
    },
    data: function () {
      return {
        curMenuItem: {},
        show: false,
        flagVal: ">>",
        //IE兼容问题，位置先固定
        top: 90,
        left: 200
      }
    },
    methods: {
      //#region inner

      showSubMenu: function (oClickItem) {
        //1.set active
        this.items.forEach(function (item) {
          if (item.label == oClickItem.label) {
            item.active = true;
          } else {
            item.active = false;
          }
        });

        //2.show subMenu
        this.curMenuItem = oClickItem;
        this.show = this.show ? false : true;
        if (this.show) {
          this.flagVal = "<<";
        } else {
          this.flagVal = ">>";
        }

        //3.emit event
        this.callback4MenuItemClick(this.curMenuItem);
      },
      hideSubMenu: function () {
        this.show = false;
        if (this.show) {
          this.flagVal = "<<";
        } else {
          this.flagVal = ">>";
        }
        this.items.forEach(function (item) {
          item.active = false;
        });
      },
      subMenuItemClick: function (group, session, item) {
        this.callback4SubMenuItemClick(this.curMenuItem, group, session, item);
      },

      //#endregion
      //#region callback

      callback4MenuItemClick: function (curMenuItem) {
        this.$emit("menuItemClick", curMenuItem);
      },
      callback4SubMenuItemClick: function (curMenuItem, group, session, item) {
        this.$emit("subMenuItemClick", curMenuItem, group, session, item);
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
  .dpn {
    display: none;
  }

  .menuNavWrapper {
    height: 50px;
  }

  .menuNavWrapper .menuNavItemsWrapper {
    height: 50px;
  }

  .menuNavWrapper .menuItem {
    height: 47px;
    margin: 0 15px;
    font-size: 16px;
    line-height: 47px;
    color: orange;
    border-bottom: 3px solid rgba(0, 0, 0, 0);
    cursor: pointer;
    font-weight: bolder;
  }

  .menuNavWrapper .active {
    color: orange;
    border-bottom: 3px solid #3399ff;
  }

  .subMenuItemsWrapper .subMenuGroup .subMenuSession .disable {
    pointer-events: none;
    color: #ccc;
  }

  .subMenuItemsWrapper {
    position: fixed;
    background-color: #fff;
    border-radius: 2px;
    overflow: hidden;
    z-index: 9999;
  }

  .subMenuItemsWrapper .subMenuGroup {
    padding: 0px 0px 10px 10px;
    float: left;
  }

  .subMenuItemsWrapper .subMenuGroup .subMenuSession {
    padding: 10px 10px;
    border: 1px solid #ccc;
    color: #333;
    width: 220px;
    height: 280px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  }

  .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuTitle {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: bolder;
    color: #444;
  }

  .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuItem {
    font-size: 14px;
    margin-bottom: 10px;
    cursor: pointer;
    margin-left: 20px;
    margin-top: 20px;
  }

  .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuItem:last-child {
    margin-bottom: 0;
  }

  /*region dark theme*/

  .dark .menuNavWrapper {
    background-color: #17191f;
  }

  .dark .menuNavItemsWrapper {
  }

  .dark .menuItem {
    color: #a7abbe;
    border-bottom: 3px solid rgba(0, 0, 0, 0);
  }

  .dark .active {
    color: #fff;
    border-bottom: 3px solid #3dcaa6;
  }

  .dark .subMenuItemsWrapper {
    background-color: #17191f;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  }

  .dark .subMenuItemsWrapper .subMenuGroup {
  }

  .dark .subMenuItemsWrapper .subMenuGroup .subMenuSession {
  }

  .dark .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuTitle {
    color: #ffffff;
  }

  .dark .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuItem {
    color: #a7abbe;
  }

  .dark .subMenuItemsWrapper .subMenuGroup .subMenuSession .subMenuItem:last-child {
  }

  /*endregion*/
</style>
