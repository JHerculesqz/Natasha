<template>
  <div class="toolbarWrapper" v-click-outside="hideSubMenu">
    <div class="toolbarItemWrapper" v-for="item in items">
      <div v-if="item.type === 'bar'" class="bar"></div>
      <div v-else-if="item.type === 'hasCustom'">
        <slot :name="item.id"></slot>
      </div>
      <div v-else class="toolbarItem"
           v-bind:key="item.id" v-bind:class="[{dpn: item.visible === false},{disable: item.disable === true}]">
        <div class="toolbarItemLabel" :title="item.tip? item.tip : item.label" v-bind:class="item.itemLabelCustom"
             v-on:click="onToolbarItemClick($event, item)">
          <div class="toolbarIcon" v-bind:class="item.icon" v-bind:class="item.iconCustom"></div>
          <div class="toolbarName" :class="{dpn: !showLabels}" v-bind:class="item.nameCustom">{{item.label}}
          </div>
        </div>
        <div class="toolbarCustomSubPanel" v-if="item.hasCustomSubPanel"
             v-bind:class="{dpn: item.label != selectItem.label}">
          <slot :name="item.id"></slot>
        </div>
        <div class="toolbarSubMenu" v-if="item.subMenu != undefined"
             v-bind:class="{dpn: item.label != selectItem.label}">
          <div class="toolbarSubMenuItem" v-for="subItems in item.subMenu"
               :title="subItems.tip ? subItems.tip : subItems.label"
               v-on:click="onToolbarSubItemClick($event, subItems, item)"
               v-bind:key="subItems.id"
               v-bind:class="[{dpn: subItems.visible === false},{disable: subItems.disable === true}]">
            <div class="iconArea" v-bind:class="subItems.icon"></div>
            <div class="textArea" :class="{dpn: !showSubItemLabels}">{{subItems.label}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelToolbar widget description
   *  @vuedoc
   *  @exports MarvelToolbar
   */
  export default {
    name: 'MarvelToolbar',
    props: {
      items: {
        type: Array,
        default: undefined,
        required: true,
      },
      showLabels: {
        type: Boolean,
        default: true,
        required: false,
      },
      showSubItemLabels: {
        type: Boolean,
        default: true,
        required: false,
      },
    },
    data: function () {
      return {
        selectItem: {label: "", icon: ""}
      };
    },
    methods: {
      //#region inner

      onToolbarItemClick: function (evt, oItem) {
        this.selectItem = oItem;
        this.callback4OnToolbarItemClick(oItem);
      },
      onToolbarSubItemClick: function (evt, oItem, oParent) {
        this.hideSubMenu();
        this.callback4OnToolbarSubItemClick(oItem, oParent);
      },
      hideSubMenu: function () {
        this.selectItem = {label: "", icon: ""};
      },

      //#endregion
      //#region callback

      callback4OnToolbarItemClick: function (oItem) {
        this.$emit("onToolbarItemClick", oItem);
      },
      callback4OnToolbarSubItemClick: function (oItem, oParent) {
        this.$emit("onToolbarSubItemClick", oItem, oParent);
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
  .dpn {
    display: none !important;
  }

  .toolbarWrapper {
    width: 100%;
    height: 100%;
    padding: 0 10px;
  }

  .toolbarWrapper .toolbarItemWrapper {
    float: left;
  }

  .toolbarWrapper .toolbarItemWrapper .bar {
    height: 30px;
    width: 1px;
    background-color: #d5d5d5;
    margin: 0 6px;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem {
    float: left;
    height: 30px;
    border: 1px solid transparent;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarItemLabel {
    height: 30px;
    padding: 0 10px;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarItemLabel .toolbarIcon {
    height: 100%;
    width: 16px;
    line-height: 28px;
    text-align: center;
    font-size: 16px;
    color: #3399ff;
    float: left;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarItemLabel .toolbarName {
    height: 100%;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    color: #666;
    float: left;
    margin-left: 10px;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarCustomSubPanel {
    position: absolute;
    top: 30px;
    left: 0;
    background-color: #ffffff;
    min-width: 100%;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
    padding: 10px;
    box-sizing: border-box;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarSubMenu {
    position: absolute;
    top: 30px;
    left: 0;
    background-color: #ffffff;
    min-width: 100%;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem {
    height: 24px;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
    white-space: nowrap;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem:hover .textArea {
    color: #3399ff;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem .iconArea {
    height: 24px;
    width: 16px;
    line-height: 24px;
    text-align: center;
    font-size: 16px;
    color: #3399ff;
    display: inline-block;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem .textArea {
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-left: 10px;
    display: inline-block;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarSubMenu .disable {
    pointer-events: none;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarSubMenu .disable .iconArea {
    color: #999;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarSubMenu .disable .textArea {
    color: #999;
  }

  .toolbarWrapper .toolbarItemWrapper .toolbarItem:hover {
    border: 1px solid #3399ff;
    background-color: rgba(51, 153, 255, 0.2);
  }

  .toolbarWrapper .toolbarItemWrapper .disable {
    pointer-events: none;
  }

  .toolbarWrapper .toolbarItemWrapper .disable .toolbarItemLabel .toolbarIcon {
    color: #999;
  }

  .toolbarWrapper .toolbarItemWrapper .disable .toolbarItemLabel .toolbarName {
    color: #999;
  }


  /*region dark theme*/
  .dark .toolbarWrapper .toolbarItemWrapper .bar {
    background-color: rgba(61, 204, 166, 0.4);
  }

  .dark .toolbarItemWrapper .toolbarItem .toolbarItemLabel .toolbarIcon {
    color: #3dcca6;
  }

  .dark .toolbarItemWrapper .toolbarItem .toolbarItemLabel .toolbarName {
    color: #ffffff;
  }

  .dark .toolbarItemWrapper .toolbarItem:hover {
    border: 1px solid #3dcca6;
    background-color: rgba(61, 204, 166, 0.2);
  }

  .dark .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarCustomSubPanel {
    background-color: #000000;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
  }

  .dark .toolbarItemWrapper .toolbarItem .toolbarSubMenu {
    background-color: #000000;
    box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.25);
  }

  .dark .toolbarItemWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem {
  }

  .dark .toolbarItemWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem:hover .textArea {
    color: #3dcca6;
  }

  .dark .toolbarItemWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem .iconArea {
    color: #3dcca6;
  }

  .dark .toolbarItemWrapper .toolbarItem .toolbarSubMenu .toolbarSubMenuItem .textArea {
    color: #fff;
  }

  .dark .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarSubMenu .disable {
    pointer-events: none;
  }

  .dark .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarSubMenu .disable .iconArea {
    color: #999;
  }

  .dark .toolbarWrapper .toolbarItemWrapper .toolbarItem .toolbarSubMenu .disable .textArea {
    color: #999;
  }

  .dark .toolbarWrapper .toolbarItemWrapper .disable {
    pointer-events: none;
  }

  .dark .toolbarWrapper .toolbarItemWrapper .disable .toolbarItemLabel .toolbarIcon {
    color: #999;
  }

  .dark .toolbarWrapper .toolbarItemWrapper .disable .toolbarItemLabel .toolbarName {
    color: #999;
  }

  /*endregion*/
</style>
