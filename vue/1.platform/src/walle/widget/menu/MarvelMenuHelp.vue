<template>
  <div class="menuhelpWrapper">
    <div class="showhelp-btn" v-on:click.stop="showSubHelpItem"><span>{{title}}</span></div>
    <div class="platformHelp_SubMenuItemWrap" v-click-outside="hideSubMenu" v-show="showSubMenu">
      <div class="menuHelptopTriangle"></div>
      <div class="menuHelpSubMenuCont">
        <div class="menuHelpSubMenuItem" v-for="item in items">
          <div class="helpitem" v-if="item.type == 'textIcon'">
            <div class="menuHelpItemIcon" v-bind:class="item.icon"></div>
            <div class="showhelp-content">
              <a :href="item.url" target="_blank">
                <span class="showhelp-title-text">{{item.label}}</span>
              </a>
            </div>
          </div>
          <div class="helpitem" v-if="item.type == 'itemEspase'">
            <div class="menuHelpItemIcon" :title="item.title">
              <span v-bind:class="item.icon"></span>
            </div>
            <span class="showhelp-title-text">{{item.label}}</span>
            <div class="showhelpContact" v-for="itemSubItem in item.subItems">
              <span class="showhelp-text">{{itemSubItem.label}}</span>
              <a class="iconACss" :href="generateHref(itemSubItem.userId)" title="eSpace">
                <span class="icon-marvel-113"></span>
              </a>
              <a class="iconACss" :href="generateMail(itemSubItem.userId, item.title)" title="Email">
                <span class="icon-marvelIcon-104"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelMenuHelp widget description
   *  @vuedoc
   *  @exports MarvelMenuHelp
   */
  export default {
    name: 'MarvelMenuHelp',
    props: {
      items: {
        type: Array,
        default: undefined,
        required: true,
      },
      title: {
        type: String,
        default: "",
        required: false,
      }
    },
    data: function () {
      return {
        showSubMenu: false,

      }
    },
    methods: {
      //#region inner
      
      showSubHelpItem: function () {
        this.callback4ShowSubHelpItem();
        this.showSubMenu = !this.showSubMenu;
      }
      hideSubMenu: function () {
        this.showSubMenu = false;
      },
      generateHref: function (strUserId) {
        return 'im:' + strUserId + '&name=' + strUserId;
      },
      generateMail: function (strUserId, strLabel) {
        return 'mailTo:' + strUserId + '?subject=【' + strLabel + '】';
      },

      //#endregion
      //#region callback

      callback4ShowSubMenuHelpItem: function () {
        this.$emit("showSubHelpItem");
      }

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

  .menuhelpWrapper {
    width:100%;
    height: 100%;
    position: relative;
  }

  .showhelp-btn {
    height: 100%;
    line-height: 48px;
    cursor: pointer;
    user-select: none;
    color: #ffffff;
  }

  .showhelp-btn span {
    background-color: #3399ff;
    border: 2px solid #3399ff;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 10px;
    font-size: 12px;
  }

  .platformHelp_SubMenuItemWrap{
    position: absolute;
    top: 44px;
    left: -50px;
    z-index: 1003;
  }

  .menuHelptopTriangle{
    width: 0;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    border-bottom: 5px solid #f0f0f0;
    margin: 0 auto;
  }

  .menuHelpSubMenuCont{
    background-color: #f0f0f0;
    padding: 9px;
  }

  .menuHelpSubMenuItem{
    padding: 0px 10px;
    cursor: pointer;
    white-space: nowrap;

  }
</style>
