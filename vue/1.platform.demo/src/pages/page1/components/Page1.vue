<template>
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
      <component v-bind:is="rightModuleName"></component>
    </div>
  </div>
</template>

<script>
  //#region fui
  import MarvelAccordion from "~~/widget/accordion/MarvelAccordion";
  //#endregion
  import Page4Develop from './demo4widgets/1.quickStart/Page4Develop'
  import Page4Install from './demo4widgets/1.quickStart/Page4Install'
  import Page4Lan from './demo4widgets/1.quickStart/Page4Lan'
  import Page4Start from './demo4widgets/1.quickStart/Page4Start'
  import Page4Theme from './demo4widgets/1.quickStart/Page4Theme'

  import Page4Icons from './demo4widgets/2.basic/Page4Icons'
  import Page4MarvelAnimate from './demo4widgets/2.basic/Page4MarvelAnimate'
  import Page4MarvelFrame from './demo4widgets/2.basic/Page4MarvelFrame'

  import Page4MarvelBidirectionalSelect from './demo4widgets/3.form/Page4MarvelBidirectionalSelect'
  import Page4MarvelButton from './demo4widgets/3.form/Page4MarvelButton'
  import Page4MarvelCheckBox from './demo4widgets/3.form/Page4MarvelCheckBox'
  import Page4MarvelDate from './demo4widgets/3.form/Page4MarvelDate'
  import Page4MarvelDate2 from './demo4widgets/3.form/Page4MarvelDate2'
  import Page4MarvelDiff from './demo4widgets/3.form/Page4MarvelDiff'
  import Page4MarvelDragHelp from './demo4widgets/3.form/Page4MarvelDragHelp'
  import Page4MarvelDropDownButton from './demo4widgets/3.form/Page4MarvelDropDownButton'
  import Page4MarvelIconButton from './demo4widgets/3.form/Page4MarvelIconButton'
  import Page4MarvelIconTxtButton from './demo4widgets/3.form/Page4MarvelIconTxtButton'
  import Page4MarvelInfo from './demo4widgets/3.form/Page4MarvelInfo'
  import Page4MarvelInput from './demo4widgets/3.form/Page4MarvelInput'
  import Page4MarvelInputDropDown from './demo4widgets/3.form/Page4MarvelInputDropDown'
  import Page4MarvelInputDropDownWithTip from './demo4widgets/3.form/Page4MarvelInputDropDownWithTip'
  import Page4MarvelLink from './demo4widgets/3.form/Page4MarvelLink'
  import Page4MarvelListInput from './demo4widgets/3.form/Page4MarvelListInput'
  import Page4MarvelMultiDropDown from './demo4widgets/3.form/Page4MarvelMultiDropDown'
  import Page4MarvelMultiInput from './demo4widgets/3.form/Page4MarvelMultiInput'
  import Page4MarvelNumberSelect from './demo4widgets/3.form/Page4MarvelNumberSelect'
  import Page4MarvelProgress from './demo4widgets/3.form/Page4MarvelProgress'
  import Page4MarvelRadioBox from './demo4widgets/3.form/Page4MarvelRadioBox'
  import Page4MarvelSearch from './demo4widgets/3.form/Page4MarvelSearch'
  import Page4MarvelSearchAdvance from './demo4widgets/3.form/Page4MarvelSearchAdvance'
  import Page4MarvelSearchWithDropDown from './demo4widgets/3.form/Page4MarvelSearchWithDropDown'
  import Page4MarvelSelectCard from './demo4widgets/3.form/Page4MarvelSelectCard'
  import Page4MarvelSwitch from './demo4widgets/3.form/Page4MarvelSwitch'
  import Page4MarvelTabButton from './demo4widgets/3.form/Page4MarvelTabButton'
  import Page4MarvelTableDiff from './demo4widgets/3.form/Page4MarvelTableDiff'
  import Page4MarvelTimeLine from './demo4widgets/3.form/Page4MarvelTimeLine'
  import Page4MarvelTxtButton from './demo4widgets/3.form/Page4MarvelTxtButton'
  import Page4MarvelUpload from './demo4widgets/3.form/Page4MarvelUpload'
  import Page4MarvelUploadSimple from './demo4widgets/3.form/Page4MarvelUploadSimple'

  import Page4MarvelAccordion from './demo4widgets/4.navigator/Page4MarvelAccordion'
  import Page4MarvelAccordion2 from './demo4widgets/4.navigator/Page4MarvelAccordion2'
  import Page4MarvelAccordion3 from './demo4widgets/4.navigator/Page4MarvelAccordion3'
  import Page4MarvelAccordion4 from './demo4widgets/4.navigator/Page4MarvelAccordion4'
  import Page4MarvelCrumb from './demo4widgets/4.navigator/Page4MarvelCrumb'
  import Page4MarvelMenu from './demo4widgets/4.navigator/Page4MarvelMenu'
  import Page4MarvelMenuContext from './demo4widgets/4.navigator/Page4MarvelMenuContext'
  import Page4MarvelMenuContext2 from './demo4widgets/4.navigator/Page4MarvelMenuContext2'
  import Page4MarvelMenuDropDown from './demo4widgets/4.navigator/Page4MarvelMenuDropDown'
  import Page4MarvelMenuHelp from './demo4widgets/4.navigator/Page4MarvelMenuHelp'
  import Page4MarvelMenuNew from './demo4widgets/4.navigator/Page4MarvelMenuNew'
  import Page4MarvelTab from './demo4widgets/4.navigator/Page4MarvelTab'
  import Page4MarvelWizard from './demo4widgets/4.navigator/Page4MarvelWizard'
  import Page4MarvelWizardAdvance from './demo4widgets/4.navigator/Page4MarvelWizardAdvance'
  import Page4MarvelWizardTab from './demo4widgets/4.navigator/Page4MarvelWizardTab'

  import Page4MarvelBottomExtPanel from './demo4widgets/5.panel/Page4MarvelBottomExtPanel'
  import Page4MarvelConfirm from './demo4widgets/5.panel/Page4MarvelConfirm'
  import Page4MarvelConfirmEx from './demo4widgets/5.panel/Page4MarvelConfirmEx'
  import Page4MarvelDashboard from './demo4widgets/5.panel/Page4MarvelDashboard'
  import Page4MarvelDashboardAdatptToContH from './demo4widgets/5.panel/Page4MarvelDashboardAdatptToContH'
  import Page4MarvelDialog from './demo4widgets/5.panel/Page4MarvelDialog'
  import Page4MarvelFoldPanel from './demo4widgets/5.panel/Page4MarvelFoldPanel'
  import Page4MarvelLeftExtPanel from './demo4widgets/5.panel/Page4MarvelLeftExtPanel'
  import Page4MarvelRightExtPanel from './demo4widgets/5.panel/Page4MarvelRightExtPanel'

  import Page4MarvelAceEditor from './demo4widgets/6.items/Page4MarvelAceEditor'
  import Page4MarvelLegend from './demo4widgets/6.items/Page4MarvelLegend'
  import Page4MarvelLoading from './demo4widgets/6.items/Page4MarvelLoading'
  import Page4MarvelLoadingIconPublic from './demo4widgets/6.items/Page4MarvelLoadingIconPublic'
  import Page4MarvelLoadingMini from './demo4widgets/6.items/Page4MarvelLoadingMini'
  import Page4MarvelLoadingPublic from './demo4widgets/6.items/Page4MarvelLoadingPublic'
  import Page4MarvelLoadingPublicEx from './demo4widgets/6.items/Page4MarvelLoadingPublicEx'
  import Page4MarvelLogView from './demo4widgets/6.items/Page4MarvelLogView'
  import Page4MarvelPaging from './demo4widgets/6.items/Page4MarvelPaging'
  import Page4MarvelPrompt from './demo4widgets/6.items/Page4MarvelPrompt'
  import Page4MarvelPromptEx from './demo4widgets/6.items/Page4MarvelPromptEx'
  import Page4MarvelPromptGLobal from './demo4widgets/6.items/Page4MarvelPromptGLobal'
  import Page4MarvelSlider from './demo4widgets/6.items/Page4MarvelSlider'
  import Page4MarvelToolbar from './demo4widgets/6.items/Page4MarvelToolbar'
  import Page4MarvelWarning from './demo4widgets/6.items/Page4MarvelWarning'

  import Page4MarvelGrid from './demo4widgets/7.grid/Page4MarvelGrid'
  import Page4MarvelGridEx from './demo4widgets/7.grid/Page4MarvelGridEx'
  import Page4MarvelGridExFilter from './demo4widgets/7.grid/Page4MarvelGridExFilter'
  import Page4MarvelGridExWithFreezeColumn from './demo4widgets/7.grid/Page4MarvelGridExWithFreezeColumn'
  import Page4MarvelGridM from './demo4widgets/7.grid/Page4MarvelGridM'
  import Page4MarvelGridPriority from './demo4widgets/7.grid/Page4MarvelGridPriority'
  import Page4MarvelGridTree from './demo4widgets/7.grid/Page4MarvelGridTree'
  import Page4MarvelList1 from './demo4widgets/7.grid/Page4MarvelList1'
  import Page4MarvelList2 from './demo4widgets/7.grid/Page4MarvelList2'
  import Page4MarvelList2Analysis from './demo4widgets/7.grid/Page4MarvelList2Analysis'
  import Page4MarvelList3 from './demo4widgets/7.grid/Page4MarvelList3'
  import Page4MarvelList4 from './demo4widgets/7.grid/Page4MarvelList4'
  import Page4MarvelList5 from './demo4widgets/7.grid/Page4MarvelList5'

  import Page4MarvelLazyLoadTree from './demo4widgets/8.tree/Page4MarvelLazyLoadTree'
  import Page4MarvelZTree from './demo4widgets/8.tree/Page4MarvelZTree'

  import Page4MarvelChartBar from './demo4widgets/9.chart/Page4MarvelChartBar'
  import Page4MarvelChartBarLine from './demo4widgets/9.chart/Page4MarvelChartBarLine'
  import Page4MarvelChartBarLine2 from './demo4widgets/9.chart/Page4MarvelChartBarLine2'
  import Page4MarvelChartForce from './demo4widgets/9.chart/Page4MarvelChartForce'
  import Page4MarvelChartGauge from './demo4widgets/9.chart/Page4MarvelChartGauge'
  import Page4MarvelChartLine from './demo4widgets/9.chart/Page4MarvelChartLine'
  import Page4MarvelChartLine2 from './demo4widgets/9.chart/Page4MarvelChartLine2'
  import Page4MarvelChartLineNew from './demo4widgets/9.chart/Page4MarvelChartLineNew'
  import Page4MarvelChartNBar from './demo4widgets/9.chart/Page4MarvelChartNBar'
  import Page4MarvelChartPie from './demo4widgets/9.chart/Page4MarvelChartPie'
  import Page4MarvelChartPie2 from './demo4widgets/9.chart/Page4MarvelChartPie2'
  import Page4MarvelChartRadar from './demo4widgets/9.chart/Page4MarvelChartRadar'
  import Page4MarvelChartScatter from './demo4widgets/9.chart/Page4MarvelChartScatter'
  import Page4MarvelChartScatter2 from './demo4widgets/9.chart/Page4MarvelChartScatter2'
  import Page4MarvelChartStackLine from './demo4widgets/9.chart/Page4MarvelChartStackLine'
  import Page4MarvelD3Tree from './demo4widgets/9.chart/Page4MarvelD3Tree'

  import Page4MarvelTopo from './demo4widgets/10.topo/Page4MarvelTopo'
  import Page4MarvelTopoArbor from './demo4widgets/10.topo/Page4MarvelTopoArbor'

  import Page4MarvelLeaflet from './demo4widgets/11.gis/Page4MarvelLeaflet'

  import Page4MarvelDevPanel from './demo4widgets/12.devPanel/Page4MarvelDevPanel'
  import Page4MarvelDevPanelEx from './demo4widgets/12.devPanel/Page4MarvelDevPanelEx'


  import Page4MarvelLayout1 from './demo4widgets/2.basic/Page4MarvelLayout1'
  import Page4MarvelLayout2 from './demo4widgets/2.basic/Page4MarvelLayout2'

  export default {
    components: {
      MarvelAccordion,

      Page4Develop,
      Page4Install,
      Page4Lan,
      Page4Start,
      Page4Theme,
      Page4MarvelTopo,
      Page4MarvelTopoArbor,
      Page4MarvelLeaflet,
      Page4MarvelDevPanel,
      Page4MarvelDevPanelEx,
      Page4Icons,
      Page4MarvelAnimate,
      Page4MarvelFrame,
      Page4MarvelLayout1,
      Page4MarvelLayout2,
      Page4MarvelBidirectionalSelect,
      Page4MarvelButton,
      Page4MarvelCheckBox,
      Page4MarvelDate,
      Page4MarvelDate2,
      Page4MarvelDiff,
      Page4MarvelDragHelp,
      Page4MarvelDropDownButton,
      Page4MarvelIconButton,
      Page4MarvelIconTxtButton,
      Page4MarvelInfo,
      Page4MarvelInput,
      Page4MarvelInputDropDown,
      Page4MarvelInputDropDownWithTip,
      Page4MarvelLink,
      Page4MarvelListInput,
      Page4MarvelMultiDropDown,
      Page4MarvelMultiInput,
      Page4MarvelNumberSelect,
      Page4MarvelProgress,
      Page4MarvelRadioBox,
      Page4MarvelSearch,
      Page4MarvelSearchAdvance,
      Page4MarvelSearchWithDropDown,
      Page4MarvelSelectCard,
      Page4MarvelSwitch,
      Page4MarvelTabButton,
      Page4MarvelTableDiff,
      Page4MarvelTimeLine,
      Page4MarvelTxtButton,
      Page4MarvelUpload,
      Page4MarvelUploadSimple,
      Page4MarvelAccordion,
      Page4MarvelAccordion2,
      Page4MarvelAccordion3,
      Page4MarvelAccordion4,
      Page4MarvelCrumb,
      Page4MarvelMenu,
      Page4MarvelMenuContext,
      Page4MarvelMenuContext2,
      Page4MarvelMenuDropDown,
      Page4MarvelMenuHelp,
      Page4MarvelMenuNew,
      Page4MarvelTab,
      Page4MarvelWizard,
      Page4MarvelWizardAdvance,
      Page4MarvelWizardTab,
      Page4MarvelBottomExtPanel,
      Page4MarvelConfirm,
      Page4MarvelConfirmEx,
      Page4MarvelDashboard,
      Page4MarvelDashboardAdatptToContH,
      Page4MarvelDialog,
      Page4MarvelFoldPanel,
      Page4MarvelLeftExtPanel,
      Page4MarvelRightExtPanel,
      Page4MarvelAceEditor,
      Page4MarvelLegend,
      Page4MarvelLoading,
      Page4MarvelLoadingIconPublic,
      Page4MarvelLoadingMini,
      Page4MarvelLoadingPublic,
      Page4MarvelLoadingPublicEx,
      Page4MarvelLogView,
      Page4MarvelPaging,
      Page4MarvelPrompt,
      Page4MarvelPromptEx,
      Page4MarvelPromptGLobal,
      Page4MarvelSlider,
      Page4MarvelToolbar,
      Page4MarvelWarning,
      Page4MarvelGrid,
      Page4MarvelGridEx,
      Page4MarvelGridExFilter,
      Page4MarvelGridExWithFreezeColumn,
      Page4MarvelGridM,
      Page4MarvelGridPriority,
      Page4MarvelGridTree,
      Page4MarvelList1,
      Page4MarvelList2,
      Page4MarvelList2Analysis,
      Page4MarvelList3,
      Page4MarvelList4,
      Page4MarvelList5,
      Page4MarvelLazyLoadTree,
      Page4MarvelZTree,
      Page4MarvelChartBar,
      Page4MarvelChartBarLine,
      Page4MarvelChartBarLine2,
      Page4MarvelChartForce,
      Page4MarvelChartGauge,
      Page4MarvelChartLine,
      Page4MarvelChartLine2,
      Page4MarvelChartLineNew,
      Page4MarvelChartNBar,
      Page4MarvelChartPie,
      Page4MarvelChartPie2,
      Page4MarvelChartRadar,
      Page4MarvelChartScatter,
      Page4MarvelChartScatter2,
      Page4MarvelChartStackLine,
      Page4MarvelD3Tree,
    },
    name: 'page1',
    data: function () {
      return {
        //#region accordion
        defaultSelectLabel: "时间日期",
        accordionItems: [{
          label: "开发指南",
          icon: "icon-paint-format",
          expand: true,
          subItems: [{
            id: "Page4Install",
            label: "安装"
          }, {
            id: "Page4Start",
            label: "快速入门"
          }, {
            id: "Page4Lan",
            label: "国际化"
          }, {
            id: "Page4Theme",
            label: "自定义主题"
          }, {
            id: "Page4Develop",
            label: "Vue控件开发"
          }]
        }, {
          label: "控件(基础)",
          icon: "icon-headphones",
          expand: false,
          subItems: [{
            id: "Page4Icons",
            label: "图标"
          }, {
            id: "Page4MarvelAnimate",
            label: "动画"
          }, {
            id: "Page4MarvelFrame",
            label: "布局"
          }]
        }, {
          label: "控件(表单)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelBidirectionalSelect", label: "Page4MarvelBidirectionalSelect"},
            {id: "Page4MarvelButton", label: "Page4MarvelButton"},
            {id: "Page4MarvelCheckBox", label: "Page4MarvelCheckBox"},
            {id: "Page4MarvelDate", label: "Page4MarvelDate"},
            {id: "Page4MarvelDate2", label: "Page4MarvelDate2"},
            {id: "Page4MarvelDiff", label: "Page4MarvelDiff"},
            {id: "Page4MarvelDragHelp", label: "Page4MarvelDragHelp"},
            {id: "Page4MarvelDropDownButton", label: "Page4MarvelDropDownButton"},
            {id: "Page4MarvelIconButton", label: "Page4MarvelIconButton"},
            {id: "Page4MarvelIconTxtButton", label: "Page4MarvelIconTxtButton"},
            {id: "Page4MarvelInfo", label: "Page4MarvelInfo"},
            {id: "Page4MarvelInput", label: "Page4MarvelInput"},
            {id: "Page4MarvelInputDropDown", label: "Page4MarvelInputDropDown"},
            {id: "Page4MarvelInputDropDownWithTip", label: "Page4MarvelInputDropDownWithTip"},
            {id: "Page4MarvelLink", label: "Page4MarvelLink"},
            {id: "Page4MarvelListInput", label: "Page4MarvelListInput"},
            {id: "Page4MarvelMultiDropDown", label: "Page4MarvelMultiDropDown"},
            {id: "Page4MarvelMultiInput", label: "Page4MarvelMultiInput"},
            {id: "Page4MarvelNumberSelect", label: "Page4MarvelNumberSelect"},
            {id: "Page4MarvelProgress", label: "Page4MarvelProgress"},
            {id: "Page4MarvelRadioBox", label: "Page4MarvelRadioBox"},
            {id: "Page4MarvelSearch", label: "Page4MarvelSearch"},
            {id: "Page4MarvelSearchAdvance", label: "Page4MarvelSearchAdvance"},
            {id: "Page4MarvelSearchWithDropDown", label: "Page4MarvelSearchWithDropDown"},
            {id: "Page4MarvelSelectCard", label: "Page4MarvelSelectCard"},
            {id: "Page4MarvelSwitch", label: "Page4MarvelSwitch"},
            {id: "Page4MarvelTabButton", label: "Page4MarvelTabButton"},
            {id: "Page4MarvelTableDiff", label: "Page4MarvelTableDiff"},
            {id: "Page4MarvelTimeLine", label: "Page4MarvelTimeLine"},
            {id: "Page4MarvelTxtButton", label: "Page4MarvelTxtButton"},
            {id: "Page4MarvelUpload", label: "Page4MarvelUpload"},
            {id: "Page4MarvelUploadSimple", label: "Page4MarvelUploadSimple"},]
        }, {
          label: "控件(导航)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelAccordion", label: "Page4MarvelAccordion"},
            {id: "Page4MarvelAccordion2", label: "Page4MarvelAccordion2"},
            {id: "Page4MarvelAccordion3", label: "Page4MarvelAccordion3"},
            {id: "Page4MarvelAccordion4", label: "Page4MarvelAccordion4"},
            {id: "Page4MarvelCrumb", label: "Page4MarvelCrumb"},
            {id: "Page4MarvelMenu", label: "Page4MarvelMenu"},
            {id: "Page4MarvelMenuContext", label: "Page4MarvelMenuContext"},
            {id: "Page4MarvelMenuContext2", label: "Page4MarvelMenuContext2"},
            {id: "Page4MarvelMenuDropDown", label: "Page4MarvelMenuDropDown"},
            {id: "Page4MarvelMenuHelp", label: "Page4MarvelMenuHelp"},
            {id: "Page4MarvelMenuNew", label: "Page4MarvelMenuNew"},
            {id: "Page4MarvelTab", label: "Page4MarvelTab"},
            {id: "Page4MarvelWizard", label: "Page4MarvelWizard"},
            {id: "Page4MarvelWizardAdvance", label: "Page4MarvelWizardAdvance"},
            {id: "Page4MarvelWizardTab", label: "Page4MarvelWizardTab"},]
        }, {
          label: "控件(面板)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelBottomExtPanel", label: "Page4MarvelBottomExtPanel"},
            {id: "Page4MarvelConfirm", label: "Page4MarvelConfirm"},
            {id: "Page4MarvelConfirmEx", label: "Page4MarvelConfirmEx"},
            {id: "Page4MarvelDashboard", label: "Page4MarvelDashboard"},
            {id: "Page4MarvelDashboardAdatptToContH", label: "Page4MarvelDashboardAdatptToContH"},
            {id: "Page4MarvelDialog", label: "Page4MarvelDialog"},
            {id: "Page4MarvelFoldPanel", label: "Page4MarvelFoldPanel"},
            {id: "Page4MarvelLeftExtPanel", label: "Page4MarvelLeftExtPanel"},
            {id: "Page4MarvelRightExtPanel", label: "Page4MarvelRightExtPanel"},]
        }, {
          label: "控件(小部件)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelAceEditor", label: "Page4MarvelAceEditor"},
            {id: "Page4MarvelLegend", label: "Page4MarvelLegend"},
            {id: "Page4MarvelLoading", label: "Page4MarvelLoading"},
            {id: "Page4MarvelLoadingIconPublic", label: "Page4MarvelLoadingIconPublic"},
            {id: "Page4MarvelLoadingMini", label: "Page4MarvelLoadingMini"},
            {id: "Page4MarvelLoadingPublic", label: "Page4MarvelLoadingPublic"},
            {id: "Page4MarvelLoadingPublicEx", label: "Page4MarvelLoadingPublicEx"},
            {id: "Page4MarvelLogView", label: "Page4MarvelLogView"},
            {id: "Page4MarvelPaging", label: "Page4MarvelPaging"},
            {id: "Page4MarvelPrompt", label: "Page4MarvelPrompt"},
            {id: "Page4MarvelPromptEx", label: "Page4MarvelPromptEx"},
            {id: "Page4MarvelPromptGLobal", label: "Page4MarvelPromptGLobal"},
            {id: "Page4MarvelSlider", label: "Page4MarvelSlider"},
            {id: "Page4MarvelToolbar", label: "Page4MarvelToolbar"},
            {id: "Page4MarvelWarning", label: "Page4MarvelWarning"},]
        }, {
          label: "控件(表格)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelGrid", label: "Page4MarvelGrid"},
            {id: "Page4MarvelGridEx", label: "Page4MarvelGridEx"},
            {id: "Page4MarvelGridExFilter", label: "Page4MarvelGridExFilter"},
            {id: "Page4MarvelGridExWithFreezeColumn", label: "Page4MarvelGridExWithFreezeColumn"},
            {id: "Page4MarvelGridM", label: "Page4MarvelGridM"},
            {id: "Page4MarvelGridPriority", label: "Page4MarvelGridPriority"},
            {id: "Page4MarvelGridTree", label: "Page4MarvelGridTree"},
            {id: "Page4MarvelList1", label: "Page4MarvelList1"},
            {id: "Page4MarvelList2", label: "Page4MarvelList2"},
            {id: "Page4MarvelList2Analysis", label: "Page4MarvelList2Analysis"},
            {id: "Page4MarvelList3", label: "Page4MarvelList3"},
            {id: "Page4MarvelList4", label: "Page4MarvelList4"},
            {id: "Page4MarvelList5", label: "Page4MarvelList5"},]
        }, {
          label: "控件(树)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelLazyLoadTree", label: "Page4MarvelLazyLoadTree"},
            {id: "Page4MarvelZTree", label: "Page4MarvelZTree"},]
        }, {
          label: "控件(图表)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelChartBar", label: "Page4MarvelChartBar"},
            {id: "Page4MarvelChartBarLine", label: "Page4MarvelChartBarLine"},
            {id: "Page4MarvelChartBarLine2", label: "Page4MarvelChartBarLine2"},
            {id: "Page4MarvelChartForce", label: "Page4MarvelChartForce"},
            {id: "Page4MarvelChartGauge", label: "Page4MarvelChartGauge"},
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
            {id: "Page4MarvelD3Tree", label: "Page4MarvelD3Tree"},]
        }, {
          label: "控件(topo)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{id: "Page4MarvelTopo", label: "Page4MarvelTopo"},
            {id: "Page4MarvelTopoArbor", label: "Page4MarvelTopoArbor"},]
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
        },{
          label: "典型页面",
          icon: "icon-book",
          expand: false,
          subItems: [{
            id: "Page4MarvelLayout1",
            label: "布局1"
          }, {
            id: "Page4MarvelLayout2",
            label: "布局2"
          }]
        },],
        isContainerFold: "",
        //#endregion
        //#region right
        rightModuleName: "Page4Install"
        //#endregion
      }
    },
    methods: {
      //#region inner
      accordionItemClick: function (oItem) {
        this.rightModuleName = oItem.id;
      },
      afterShowOrHide: function (bIsFolder) {
        if (bIsFolder) {
          this.isContainerFold = "fold";
        } else {
          this.isContainerFold = "";
        }
      },
      accordionSubItemClick: function (oSubItem) {
        this.rightModuleName = oSubItem.id;
      }
      //#endregion
      //#region callback

      //#endregion
      //#region 3rd

      //#endregion
    }
  }
</script>

<style>
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

  .accordionItemSubMenuItem{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
