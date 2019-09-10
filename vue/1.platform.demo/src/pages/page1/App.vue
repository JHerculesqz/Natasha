<template>
  <div id="app">
    <div class="header">
      <div class="logo">{{ logo }}</div>
      <ul class="menu">
        <li>
          <a href="http://localhost:8989">{{$t('L.APP_INDEX')}}</a>
        </li>
        <li>
          <a href="http://localhost:8989/page1.html#/">使用说明</a>
        </li>
        <li>
          <a href="https://cn.vuejs.org/" target="_blank">Vue社区</a>
        </li>
        <li>
          <a class="icon-github" style="font-size: 20px;"
             href="https://github.com/JHerculesqz/demo-js-vue" target="_blank"></a>
        </li>
        <li>
          <a class="icon-twitter" style="font-size: 20px;"
             href="https://github.com/JHerculesqz/demo-js-vue" target="_blank"></a>
        </li>
        <li>
          <a class="icon-droplet" style="font-size: 20px;" v-on:click="onThemeChange"></a>
        </li>
        <li>
          <a class="icon-marvelIcon-69" style="font-size: 20px;"
             @click="onLangChange"></a>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="page1">
        <div class="leftArea">
          <!--accordionArea start-->
          <marvel-accordion :isFolder="false" :hasShadow="true"
                            title="使用说明" titleIcon="icon-evil2"
                            :defaultSelectLabel="defaultSelectLabel"
                            :items="accordionItems"
                            v-on:accordionItemClick="accordionItemClick"
                            v-on:afterShowOrHide="afterShowOrHide"
                            v-on:accordionSubItemClick="accordionSubItemClick"></marvel-accordion>
          <!--accordionArea end-->
        </div>
        <div class="rightArea" v-bind:class="isContainerFold">
          <!--        <component v-bind:is="rightModuleName"></component>-->
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
    <div class="footer">
      footer
    </div>
  </div>
</template>

<script>
  import MarvelAccordion from "~~/widget/accordion/MarvelAccordion";
  import SkinUtilsEx from "~~/component/skin";
  import I18nUtilsEx from "~~/component/i18n";
  import Router from "~~/component/router";

  export default {
    name: 'app',
    components: {
      MarvelAccordion
    },
    data: function () {
      return {
        //#region logo
        logo: "Fuck UI 3.0",
        //#endregion
        defaultSelectLabel: "安装",
        accordionItems: [{
          label: "开发指南",
          icon: "icon-paint-format",
          expand: true,
          subItems: [{
            id: "/",
            label: "安装"
          }, {
            id: "Page4Start",
            label: "快速入门"
          }, {
            id: "Page4Develop",
            label: "Vue控件开发"
          }]
        }, {
          label: "控件(基础)",
          icon: "icon-headphones",
          expand: false,
          subItems: [{
            id: "Page4Lan",
            label: "国际化"
          }, {
            id: "Page4Theme",
            label: "自定义主题"
          }, {
            id: "Page4Icons",
            label: "图标"
          }, {
            id: "Page4MarvelAnimate",
            label: "*动画"
          }, {
            id: "Page4MarvelFrame",
            label: "布局"
          }, {
            id: "",
            label: "色彩"
          },]
        }, {
          label: "控件(表单)",
          icon: "icon-pacman",
          expand: false,
          subItems: [
            //#region button
            {id: "Page4MarvelButtonC", label: "Page4MarvelButton(C)"},
            {id: "Page4MarvelButton", label: "Page4MarvelButton"},
            {id: "Page4MarvelIconButton", label: "Page4MarvelIconButton"},
            {id: "Page4MarvelIconTxtButton", label: "Page4MarvelIconTxtButton"},
            {id: "Page4MarvelTabButton", label: "*Page4MarvelTabButton"},
            {id: "Page4MarvelTxtButton", label: "Page4MarvelTxtButton"},
            //endregion

            //#region link
            {id: "Page4MarvelLink", label: "*Page4MarvelLink"},
            //endregion

            //#region Radio
            {id: "Page4MarvelRadioBox", label: "Page4MarvelRadioBox"},
            //endregion

            //#region Check
            {id: "Page4MarvelCheckBox", label: "Page4MarvelCheckBox"},
            //endregion

            //#region Input
            {id: "Page4MarvelInput", label: "Page4MarvelInput"},
            {id: "Page4MarvelMultiInput", label: "Page4MarvelMultiInput"},
            //endregion

            //#region NumberSelect
            {id: "Page4MarvelNumberSelect", label: "Page4MarvelNumberSelect"},
            //endregion

            //#region DropDown
            {id: "Page4MarvelDropDownButton", label: "Page4MarvelDropDownButton"},
            //endregion

            //#region Switch
            {id: "Page4MarvelSwitch", label: "Page4MarvelSwitch"},
            //endregion

            //#region Slider
            {id: "Page4MarvelSlider", label: "Page4MarvelSlider"},
            //endregion

            //#region Date
            {id: "Page4MarvelDate", label: "Page4MarvelDate"},
            {id: "Page4MarvelDate2", label: "Page4MarvelDate2"},
            //endregion

            //#region Upload
            {id: "Page4MarvelUpload", label: "Page4MarvelUpload"},
            {id: "Page4MarvelUploadSimple", label: "Page4MarvelUploadSimple"},
            //endregion

            //#region BidirectionalSelect
            {id: "Page4MarvelBidirectionalSelect", label: "Page4MarvelBidirectionalSelect"},
            //endregion
          ]
        },  {
          label: "data(数据)",
          icon: "icon-pacman",
          expand: false,
          subItems: [
            //#region Grid
            {id: "Page4MarvelGrid", label: "Page4MarvelGrid"},
            {id: "Page4MarvelGridEx", label: "Page4MarvelGridEx"},
            {id: "Page4MarvelGridExFilter", label: "Page4MarvelGridExFilter"},
            {id: "Page4MarvelGridExWithFreezeColumn", label: "Page4MarvelGridExWithFreezeColumn"},
            //endregion

            //#region Progress
            {id: "Page4MarvelProgress", label: "Page4MarvelProgress"},
            //endregion

            //#region Tree
            {id: "Page4MarvelLazyLoadTree", label: "*Page4MarvelLazyLoadTree"},
            {id: "Page4MarvelZTree", label: "Page4MarvelZTree"},
            //endregion

            //#region Paging
            {id: "Page4MarvelPaging", label: "Page4MarvelPaging"},
            //endregion
          ]
        }, {
          label: "Notice",
          icon: "icon-pacman",
          expand: false,
          subItems: [
            //#region Prompt
            {id: "Page4MarvelPrompt", label: "Page4MarvelPrompt"},
            {id: "Page4MarvelPromptGLobal", label: "Page4MarvelPromptGLobal"},
            //endregion

            //#region Loading
            {id: "Page4MarvelLoadingC", label: "Page4MarvelLoadingC"},
            {id: "Page4MarvelLoading", label: "Page4MarvelLoading"},
            {id: "Page4MarvelLoadingIconPublic", label: "Page4MarvelLoadingIconPublic"},
            {id: "Page4MarvelLoadingMini", label: "Page4MarvelLoadingMini"},
            {id: "Page4MarvelLoadingPublic", label: "Page4MarvelLoadingPublic"},
            {id: "Page4MarvelLoadingPublicEx", label: "Page4MarvelLoadingPublicEx"},
            //endregion

            //#region Confirm
            {id: "Page4MarvelConfirmC", label: "Page4MarvelConfirmC"},
            {id: "Page4MarvelConfirm", label: "Page4MarvelConfirm"},
            {id: "Page4MarvelConfirmEx", label: "Page4MarvelConfirmEx"},
            //endregion
          ]
        },{
          label: "控件(导航)",
          icon: "icon-pacman",
          expand: false,
          subItems: [
            //#region Menu
            {id: "Page4MarvelMenu", label: "Page4MarvelMenu"},
            //endregion

            //#region Tab
            {id: "Page4MarvelTab", label: "Page4MarvelTab"},
            //endregion

            //#region Tab
            {id: "Page4MarvelCrumb", label: "Page4MarvelCrumb"},
            //endregion

            //#region Wizard
            {id: "Page4MarvelWizard", label: "Page4MarvelWizard"},
            {id: "Page4MarvelWizardAdvance", label: "Page4MarvelWizardAdvance"},
            {id: "Page4MarvelWizardTab", label: "Page4MarvelWizardTab"},
            //endregion
            ]
        }, {
          label: "others",
          icon: "icon-pacman",
          expand: false,
          subItems: [
            //#region Dialog
            {id: "Page4MarvelDialog", label: "Page4MarvelDialog"},
            //#endregion
            //endregion

            //#region Dashboard
            {id: "Page4MarvelDashboardC", label: "Page4MarvelDashboardC"},
            {id: "Page4MarvelDashboard", label: "Page4MarvelDashboard"},
            {id: "Page4MarvelDashboardAdaptToContH", label: "Page4MarvelDashboardAdaptToContH"},
            //endregion

            //#region FoldPanel
            {id: "Page4MarvelFoldPanel", label: "Page4MarvelFoldPanel"},
            //endregion

            //#region TimeLine
            {id: "Page4MarvelTimeLine", label: "Page4MarvelTimeLine"},
            //endregion

            //#region extPanel
            {id: "page4MarvelFlexiblePanel", label: "page4MarvelFlexiblePanel"},
            {id: "page4MarvelFloatPanel", label: "page4MarvelFloatPanel"},
            {id: "Page4MarvelBottomExtPanel", label: "Page4MarvelBottomExtPanel"},
            {id: "Page4MarvelLeftExtPanel", label: "Page4MarvelLeftExtPanel"},
            {id: "Page4MarvelRightExtPanel", label: "Page4MarvelRightExtPanel"},
            //endregion
          ]
        }, {
          label: "控件(小部件)",
          icon: "icon-pacman",
          expand: false,
          subItems: [
            {id: "Page4MarvelAceEditor", label: "Page4MarvelAceEditor"},
            {id: "Page4MarvelLegend", label: "Page4MarvelLegend"},
            {id: "Page4MarvelLogView", label: "Page4MarvelLogView"},
            {id: "Page4MarvelPromptEx", label: "*Page4MarvelPromptEx"},
            {id: "Page4MarvelToolbar", label: "Page4MarvelToolbar"},
            {id: "Page4MarvelWarning", label: "Page4MarvelWarning"},
          ]
        }, {
          label: "控件(图表)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelChartBar", label: "Page4MarvelChartBar"},
            {id: "Page4MarvelChartBarLine", label: "Page4MarvelChartBarLine"},
            {id: "Page4MarvelChartBarLine2", label: "Page4MarvelChartBarLine2"},
            {id: "Page4MarvelChartForce", label: "*Page4MarvelChartForce"},
            {id: "Page4MarvelChartGauge", label: "*Page4MarvelChartGauge"},
            {id: "Page4MarvelChartLine", label: "Page4MarvelChartLine"},
            {id: "Page4MarvelChartLine2", label: "Page4MarvelChartLine2"},
            {id: "Page4MarvelChartLineNew", label: "Page4MarvelChartLineNew"},
            {id: "Page4MarvelChartNBar", label: "Page4MarvelChartNBar"},
            {id: "Page4MarvelChartPie", label: "Page4MarvelChartPie"},
            {id: "Page4MarvelChartPie2", label: "Page4MarvelChartPie2"},
            {id: "Page4MarvelChartRadar", label: "Page4MarvelChartRadar"},
            {id: "Page4MarvelChartScatter", label: "Page4MarvelChartScatter"},
            {id: "Page4MarvelChartScatter2", label: "Page4MarvelChartScatter2"},
            {id: "Page4MarvelChartStackLine", label: "Page4MarvelChartStackLine"},
            {id: "Page4MarvelD3Tree", label: "*Page4MarvelD3Tree"},]
        }, {
          label: "控件(topo)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelTopo", label: "*Page4MarvelTopo"},]
        }, {
          label: "控件(gis)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelLeaflet", label: "Page4MarvelLeaflet"},]
        }, {
          label: "控件(devPanel)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelDevPanel", label: "Page4MarvelDevPanel"},
            {id: "Page4MarvelDevPanelEx", label: "Page4MarvelDevPanelEx"},]
        }, {
          label: "典型页面",
          icon: "icon-book",
          expand: false,
          subItems: [{
            id: "*Page4MarvelLayout1",
            label: "布局1"
          }, {
            id: "*Page4MarvelLayout2",
            label: "布局2"
          }]
        },{
          label: "其他",
          icon: "icon-pacman",
          expand: false,
          subItems: [
            {id: "Page4MarvelAccordion", label: "Page4MarvelAccordion"},
            {id: "Page4MarvelAccordion2", label: "Page4MarvelAccordion2"},
            {id: "Page4MarvelAccordion3", label: "Page4MarvelAccordion3"},
            {id: "Page4MarvelAccordion4", label: "Page4MarvelAccordion4"},


            {id: "Page4MarvelMenuContext", label: "Page4MarvelMenuContext"},
            {id: "Page4MarvelMenuContext2", label: "Page4MarvelMenuContext2"},
            {id: "Page4MarvelMenuDropDown", label: "Page4MarvelMenuDropDown"},
            {id: "Page4MarvelMenuHelp", label: "Page4MarvelMenuHelp"},
            {id: "Page4MarvelMenuNew", label: "Page4MarvelMenuNew"},
            {id: "Page4MarvelDiff", label: "*Page4MarvelDiff"},
            {id: "Page4MarvelDragHelp", label: "Page4MarvelDragHelp"},

            {id: "Page4MarvelInfo", label: "Page4MarvelInfo"},

            {id: "Page4MarvelInputDropDownC", label: "Page4MarvelInputDropDownC"},
            {id: "Page4MarvelInputDropDown", label: "Page4MarvelInputDropDown"},
            {id: "Page4MarvelInputDropDownWithTip", label: "Page4MarvelInputDropDownWithTip"},

            {id: "Page4MarvelListInput", label: "*Page4MarvelListInput"},
            {id: "Page4MarvelMultiDropDown", label: "Page4MarvelMultiDropDown"},




            {id: "Page4MarvelSearch", label: "Page4MarvelSearch"},
            {id: "Page4MarvelSearchAdvance", label: "Page4MarvelSearchAdvance"},
            {id: "Page4MarvelSearchWithDropDown", label: "Page4MarvelSearchWithDropDown"},
            {id: "Page4MarvelSearchBox", label: "Page4MarvelSearchBox"},
            {id: "Page4MarvelSelectCard", label: "Page4MarvelSelectCard"},


            {id: "Page4MarvelGridM", label: "*Page4MarvelGridM"},
            {id: "Page4MarvelGridPriority", label: "Page4MarvelGridPriority"},
            {id: "Page4MarvelGridTree", label: "Page4MarvelGridTree"},
            {id: "Page4MarvelList1", label: "*Page4MarvelList1"},
            {id: "Page4MarvelList2", label: "Page4MarvelList2"},
            {id: "Page4MarvelList2Analysis", label: "Page4MarvelList2Analysis"},
            {id: "Page4MarvelList3", label: "*Page4MarvelList3"},
            {id: "Page4MarvelList4", label: "Page4MarvelList4"},
            {id: "Page4MarvelList5", label: "Page4MarvelList5"},
            {id: "Page4MarvelDragHelp", label: "Page4MarvelDragHelp"},
          ]
        },],
        isContainerFold: "",
        //#endregion
      }
    },
    mounted: function () {
      //#region custom

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        Router.toEx(this.$router, "/");
      },

      //#endregion

      //#endregion

      //#region theme

      onThemeChange: function () {
        var bIsDark = SkinUtilsEx.getCurrentTheme() == "dark";
        if (bIsDark) {
          SkinUtilsEx.themeChange("");
        } else {
          SkinUtilsEx.themeChange("dark");
        }
      },

      //#endregion

      //#region language

      onLangChange: function () {
        var bIsZh = I18nUtilsEx.getCurrentLocal(this.$i18n) == "zh";
        if (bIsZh) {
          I18nUtilsEx.localeChange(this.$i18n, "en");
        } else {
          I18nUtilsEx.localeChange(this.$i18n, "zh");
        }
      },

      //#endregion

      accordionItemClick: function (oItem) {
        Router.toEx(this.$router, oItem.id);
      },
      afterShowOrHide: function (bIsFolder) {
        if (bIsFolder) {
          this.isContainerFold = "fold";
        } else {
          this.isContainerFold = "";
        }
      },
      accordionSubItemClick: function (oSubItem) {
        Router.toEx(this.$router, oSubItem.id);
      }
    }
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Tahoma, Arial, Roboto, ”Droid Sans”, ”Helvetica Neue”, ”Droid Sans Fallback”, ”Heiti SC”, sans-self;
  }

  ol, ul {
    list-style: none;
  }

  #app {
    height: 100%;
  }

  .header {
    width: 100%;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #3b2e49;
    z-index: 999;
  }

  .header .logo {
    width: 240px;
    height: 100%;
    float: left;
    /*color: #007df9;*/
    color: #ffaa00;
    font-size: 26px;
    font-weight: bold;
    line-height: 50px;
    text-align: center;
  }

  .header ul {
    margin: 0;
    padding: 0;
    float: right;
    margin-right: 40px;
  }

  .header ul li {
    float: left;
    margin-right: 10px;
    margin-top: 0;
    list-style-type: none
  }

  .header ul li a {
    line-height: 50px;
    /*color: #666;*/
    color: #ffffff;
    font-size: 14px;
    padding: 0 10px;
    text-decoration: none;
  }

  .header ul li .active {
    color: #ffaa00;
  }

  .content {
    height: 100%;
    position: relative;
  }

  .page1 {
    position: absolute;
    width: 100%;
    height: calc(100% - 50px);
    top: 50px;
  }

  .page1 .leftArea {
    float: left;
    height: 100%;
    width: 320px;
  }

  .page1 .rightArea {
    width: calc(100% - 320px);
    float: left;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .page1 .fold {
    width: calc(100% - 76px);
  }

  .dark .rightArea {
    background-color: #04051b;
  }

  .accordionItemSubMenuItem {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .footer {
    height: 0px;
    background-color: #e8e8e8
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-active {
    transform: translateX(-430px);
    opacity: 0;
  }
</style>
