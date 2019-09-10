<template>
  <div v-bind:id="contextMenuItemId"
       v-bind:class="{ dpn: !show,contextMenuWrapper_icon: onlyIcon,contextMenuWrapper_text:!onlyIcon }"
       v-bind:style="{ top: top + 'px', left: left + 'px',position: bIsFixed?'fixed':'absolute'}"
       @contextmenu.prevent
       v-click-outside="hideSubMenu">
    <div v-if="onlyIcon" v-for="item in items"
         class="contextMenuItem"
         v-bind:class="item.icon"
         v-bind:style="{ color: item.color }"
         v-bind:title="item.label"
         v-on:click="onMenuItemClick(item.label)"></div>
    <div v-if="!onlyIcon" v-for="item in items"
         class="contextMenuItem">
      <div v-if="item.subMenu" class="multiItem" v-bind:title="item.label"
           v-on:mouseenter="onMenuItemMouseEnter(item)">
        <div class="firstLevelLabel">{{item.label}}</div>
        <div class="subMenuIcon icon-marvelIcon-23"></div>
        <div class="subMenuWrapper" :class="{show: currentEnterMenuItem == item}">
          <div v-for="subMenuItem in item.subMenu"
               class="subMenuItem" v-bind:title="subMenuItem.label"
               v-on:click="onMenuItemClick(subMenuItem.label, subMenuItem)">{{subMenuItem.label}}
          </div>
        </div>
      </div>
      <div v-else class="singleItem" v-bind:title="item.label"
           v-on:click="onMenuItemClick(item.label, item)"
           v-on:mouseenter="onMenuItemMouseEnter(item)">{{item.label}}
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelContextMenu widget description
   *  @vuedoc
   *  @exports MarvelContextMenu
   */
  export default {
    name: 'MarvelContextMenu',
    props: {
      onlyIcon: {
        type: Boolean,
        default: false,
        required: false,
      },
      items: {
        type: Array,
        default: undefined,
        required: true,
      },
      contextMenuItemId: {
        type: String,
        default: "",
        required: false,
      },
      containerId: {
        type: String,
        default: "",
        required: false,
      },
      bIsFixed: {
        type: Boolean,
        default: false,
        required: false,
      }
    },
    data: function () {
      return {
        show: false,
        top: 0,
        left: 0,
        currentEnterMenuItem: {}
      }
    },
    methods: {
      //#region inner

      hideSubMenu: function () {
        this.show = false;
        this.currentEnterMenuItem = {};
      },
      onMenuItemMouseEnter: function (oItem) {
        if (oItem == this.currentEnterMenuItem) {
          this.currentEnterMenuItem = {};
        } else {
          this.currentEnterMenuItem = oItem;
        }
      },

      //#endregion
      //#region callback

      onMenuItemClick: function (strMenuItemLabel, oItem) {
        this.$emit("onMenuItemClick", strMenuItemLabel, oItem);
      },

      //#endregion
      //#region 3rd

      showSubMenu: function (iX, iY) {
        //1.show subMenu
        this.show = true;

        if (this.containerId == "") {
          this.top = iY;
          this.left = iX;
          return;
        }

        this.$nextTick(function () {
            //1.先算右键菜单的宽和高
            let IContextMenuW = document.getElementById(this.contextMenuItemId).clientWidth;
            let IContextMenuH = document.getElementById(this.contextMenuItemId).clientHeight;

            //2.计算外部容器的宽和高
            let IwinH = document.getElementById(this.containerId).clientHeight;
            let IwinW = document.getElementById(this.containerId).clientWidth;
            let IwinTop = document.getElementById(this.containerId).getBoundingClientRect().y;
            let IwinLeft = document.getElementById(this.containerId).getBoundingClientRect().x;

            //3.计算鼠标点击位置距离所给区域的top、left值
            let ISubMenuContainerTop = iY;
            let ISubMenuContainerLeft = iX;
            let ItopDistance = ISubMenuContainerTop - IwinTop;
            let IleftDistance = ISubMenuContainerLeft - IwinLeft;
            let IContextMenuTop;
            let IContextMenuLeft;

            //4.计算右键菜单位置
            if (IContextMenuH < IwinH) {
              let IContextMenuDistance = IwinH - IContextMenuH;
              //当偏移量加上自身高度小于所给区域
              if (ItopDistance < IContextMenuDistance) {
                IContextMenuTop = ISubMenuContainerTop;
              }
              //当偏移量加上自身高度大于所给区域
              else if (ItopDistance >= IContextMenuDistance) {
                //当鼠标点击位置topdistance小于一级菜单高度
                if (ItopDistance < IContextMenuH) {
                  if (ItopDistance > IwinH / 2) {
                    if (IContextMenuH / 2 <= IContextMenuDistance) {
                      IContextMenuTop = IContextMenuDistance - IContextMenuH / 2 + IwinTop;
                    } else {
                      IContextMenuTop = IContextMenuDistance - 10 + IwinTop;
                    }
                  }
                  if (ItopDistance > IContextMenuH / 2 && ItopDistance <= IwinH / 2) {
                    if (IContextMenuH / 2 <= IContextMenuDistance) {
                      IContextMenuTop = ItopDistance - IContextMenuDistance + IwinTop;
                    } else {
                      IContextMenuTop = IContextMenuH / 2 - IContextMenuDistance + IwinTop;
                    }
                  } else if (ItopDistance <= IContextMenuH / 2) {
                    if (IContextMenuH / 2 - ItopDistance > IContextMenuDistance) {
                      IContextMenuTop = IContextMenuDistance - 10 + IwinTop;
                    } else {
                      IContextMenuTop = IContextMenuH / 2 - ItopDistance + IwinTop;
                    }
                  }
                }
                //当鼠标点击位置topdistance小于一级菜单高度
                else if (ItopDistance >= IContextMenuH) {
                  if (ItopDistance - IContextMenuH > IContextMenuDistance) {
                    IContextMenuTop = IContextMenuDistance - 10 + IwinTop;
                  } else {
                    IContextMenuTop = ItopDistance - IContextMenuH + IwinTop;
                  }
                }
              }
              //当leftdistance偏移量加上自身宽度小于所给区域的宽度
              if (IleftDistance + IContextMenuW < IwinW) {
                IContextMenuLeft = ISubMenuContainerLeft;
              }
              //当leftdistance偏移量加上自身宽度大于所给区域的宽度
              else {
                IContextMenuLeft = ISubMenuContainerLeft - IContextMenuW;
              }
            } else {
              IContextMenuTop = IwinTop + 10;
              //当leftdistance偏移量加上自身宽度小于所给区域的宽度
              if (IleftDistance + IContextMenuW < IwinW) {
                IContextMenuLeft = ISubMenuContainerLeft;
              }
              //当leftdistance偏移量加上自身宽度大于所给区域的宽度
              else {
                IContextMenuLeft = ISubMenuContainerLeft - IContextMenuW;
              }
            }
            this.top = IContextMenuTop - IwinTop;
            this.left = IContextMenuLeft - IwinLeft;
          }
        );
      },

      //#endregion
    },
    directives: {
      'click-outside':
        {
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

  .contextMenuWrapper_icon {
    position: absolute;
    max-width: 144px;
    overflow: hidden;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 2px;
    z-index: 1000;
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.15);
  }

  .contextMenuWrapper_icon .contextMenuItem {
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

  .contextMenuWrapper_icon .contextMenuItem:hover {
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.15);
    font-size: 22px;
  }

  .contextMenuWrapper_text {
    position: absolute;
    background-color: #FFFFFF;
    border-radius: 4px;
    padding: 2px 0px;
    border: 1px solid #cccccc;
    box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.15);
    z-index: 1002;
    white-space: nowrap;
  }

  .contextMenuWrapper_text .contextMenuItem {
    height: 32px;
    padding: 0 6px;
  }

  .contextMenuWrapper_text .contextMenuItem .multiItem {
    height: 100%;
    position: relative;
  }

  .contextMenuWrapper_text .contextMenuItem .multiItem .firstLevelLabel {
    padding-right: 20px;
    box-sizing: border-box;
    height: 100%;
    text-align: left;
    line-height: 32px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }

  .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuIcon {
    position: absolute;
    height: 100%;
    top: 0;
    right: 0;
    line-height: 32px;
    font-size: 12px;
    color: #666;
  }

  .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper {
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

  .contextMenuWrapper_text .contextMenuItem .multiItem .show {
    display: block;
  }

  .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper .subMenuItem {
    height: 32px;
    padding: 0 6px;
    text-align: left;
    line-height: 32px;
    font-size: 12px;
    color: #666;
    cursor: pointer;
    white-space: nowrap;
  }

  .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper .subMenuItem:hover {
    background-color: #f0f0f0;
    color: #3399ff;
  }

  .contextMenuWrapper_text .contextMenuItem .singleItem {
    height: 100%;
    text-align: left;
    line-height: 32px;
    font-size: 14px;
    color: #666;
    cursor: pointer;
  }

  .contextMenuWrapper_text .contextMenuItem:hover {
    background-color: #f0f0f0;
    color: #3399ff;
  }

  /*region dark theme*/

  .dark .contextMenuWrapper_text {
    background-color: rgba(0, 0, 0, 0.8);
    border: 1px solid #3dcca6;
    box-shadow: none;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .multiItem .firstLevelLabel {
    color: #8b90b3;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuIcon {
    color: #8b90b3;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper {
    background-color: rgba(0, 0, 0, 0.8);
    border: 1px solid #3dcca6;
    box-shadow: none;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper .subMenuItem {
    color: #8b90b3;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .multiItem .subMenuWrapper .subMenuItem:hover {
    background-color: #1d3b60;
    color: #3dcca6;
  }

  .dark .contextMenuWrapper_text .contextMenuItem .singleItem {
    color: #8b90b3;
  }

  .dark .contextMenuWrapper_text .contextMenuItem:hover {
    background-color: #1d3b60;
    color: #3dcca6;
  }

  .dark .contextMenuWrapper_icon {
    background-color: rgba(0, 0, 0, 0.8);
    box-shadow: none;
  }

  .dark .contextMenuWrapper_icon .contextMenuItem {
    color: #33bbff;
  }

  .dark .contextMenuWrapper_icon .contextMenuItem:hover {
    box-shadow: 0 0 2px 3px rgba(255, 255, 255, 0.15);
  }

  /*endregion*/
</style>
