<template>
  <div class="contextMenuWrapper"
       v-bind:class="{ dpn: !show }"
       v-bind:style="{ top: top + 'px', left: left + 'px'}"
       v-click-outside="hideSubMenu">
    <div v-for="item in items"
         class="contextMenuItem"
         v-bind:class="item.icon"
         v-bind:style="{ color: item.color }"
         v-bind:title="item.label"
         v-on:click="onMenuItemClick(item.label)"></div>
  </div>
</template>

<script>
  /**
   *  MarvelMenuContext widget description
   *  @vuedoc
   *  @exports MarvelMenuContext
   */
  export default {
    name: 'MarvelMenuContext',
    props: {
      items: {
        type: Array,
        default: undefined,
        required: true,
      }
    },
    data: function () {
      return {
        show: false,
        top: 0,
        left: 0,
        buObj: undefined
      }
    },
    methods: {
      //#region inner

      hideSubMenu: function () {
        this.show = false;
      },

      //#endregion
      //#region callback

      onMenuItemClick: function (strMenuItemLabel) {
        this.$emit("onMenuItemClick", strMenuItemLabel, this.buObj);
      },

      //#endregion
      //#region 3rd

      showSubMenu: function (iX, iY, oBuObj) {
        //1.show subMenu
        this.show = true;
        this.top = iY;
        this.left = iX;
        this.buObj = oBuObj;
      },

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
  .dpn {
    display: none;
  }

  .contextMenuWrapper {
    position: fixed;
    max-width: 144px;
    overflow: hidden;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 2px;
    z-index: 1000;
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.15);
  }

  .contextMenuWrapper .contextMenuItem {
    width: 32px;
    height: 32px;
    float: left;
    text-align: center;
    margin: 2px;
    line-height: 32px;
    font-size: 18px;
    color: #33bbff;
    cursor: pointer;
    -webkit-transition: font-size 0.4s ease-in-out 0s;
    -moz-transition: font-size 0.4s ease-in-out 0s;
    -ms-transition: font-size 0.4s ease-in-out 0s;
    -o-transition: font-size 0.4s ease-in-out 0s;
    transition: font-size 0.4s ease-in-out 0s;
  }

  .contextMenuWrapper .contextMenuItem:hover {
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.15);
    font-size: 22px;
  }

  /*region dark theme*/

  .dark .contextMenuWrapper {
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: none;
  }

  .dark .contextMenuWrapper .contextMenuItem {
    color: #33bbff;
  }

  .dark .contextMenuWrapper .contextMenuItem:hover {
    box-shadow: 0 0 2px 3px rgba(255, 255, 255, 0.15);
  }

  /*endregion*/
</style>
