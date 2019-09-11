import Vue from 'vue'
import Router from 'vue-router'

import Page4Develop from '../components/demo4widgets/1.quickStart/Page4Develop'
import Page4Install from '../components/demo4widgets/1.quickStart/Page4Install'
import Page4Lan from '../components/demo4widgets/1.quickStart/Page4Lan'
import Page4Start from '../components/demo4widgets/1.quickStart/Page4Start'
import Page4Theme from '../components/demo4widgets/1.quickStart/Page4Theme'

import Page4Icons from '../components/demo4widgets/2.basic/Page4Icons'
import Page4MarvelAnimate from '../components/demo4widgets/2.basic/Page4MarvelAnimate'
import Page4MarvelFrame from '../components/demo4widgets/2.basic/Page4MarvelFrame'

import Page4MarvelBidirectionalSelect from '../components/demo4widgets/3.form/Page4MarvelBidirectionalSelect'
import Page4MarvelButtonC from '../components/demo4widgets/3.form/Page4MarvelButtonC'
import Page4MarvelButton from '../components/demo4widgets/3.form/Page4MarvelButton'
import Page4MarvelCheckBox from '../components/demo4widgets/3.form/Page4MarvelCheckBox'
import Page4MarvelDate from '../components/demo4widgets/3.form/Page4MarvelDate'
import Page4MarvelDate2 from '../components/demo4widgets/3.form/Page4MarvelDate2'
import Page4MarvelDiff from '../components/demo4widgets/3.form/Page4MarvelDiff'
import Page4MarvelDropDownButton from '../components/demo4widgets/3.form/Page4MarvelDropDownButton'
import Page4MarvelIconButton from '../components/demo4widgets/3.form/Page4MarvelIconButton'
import Page4MarvelIconTxtButton from '../components/demo4widgets/3.form/Page4MarvelIconTxtButton'
import Page4MarvelInfo from '../components/demo4widgets/3.form/Page4MarvelInfo'
import Page4MarvelInput from '../components/demo4widgets/3.form/Page4MarvelInput'
import Page4MarvelInputDropDownC from '../components/demo4widgets/3.form/Page4MarvelInputDropDownC'
import Page4MarvelInputDropDown from '../components/demo4widgets/3.form/Page4MarvelInputDropDown'
import Page4MarvelInputDropDownWithTip from '../components/demo4widgets/3.form/Page4MarvelInputDropDownWithTip'
import Page4MarvelLink from '../components/demo4widgets/3.form/Page4MarvelLink'
import Page4MarvelListInput from '../components/demo4widgets/3.form/Page4MarvelListInput'
import Page4MarvelMultiDropDown from '../components/demo4widgets/3.form/Page4MarvelMultiDropDown'
import Page4MarvelMultiInput from '../components/demo4widgets/3.form/Page4MarvelMultiInput'
import Page4MarvelNumberSelect from '../components/demo4widgets/3.form/Page4MarvelNumberSelect'
import Page4MarvelProgress from '../components/demo4widgets/3.form/Page4MarvelProgress'
import Page4MarvelRadioBox from '../components/demo4widgets/3.form/Page4MarvelRadioBox'
import Page4MarvelSearch from '../components/demo4widgets/3.form/Page4MarvelSearch'
import Page4MarvelSearchAdvance from '../components/demo4widgets/3.form/Page4MarvelSearchAdvance'
import Page4MarvelSearchWithDropDown from '../components/demo4widgets/3.form/Page4MarvelSearchWithDropDown'
import Page4MarvelSearchBox from '../components/demo4widgets/3.form/Page4MarvelSearchBox'
import Page4MarvelSelectCard from '../components/demo4widgets/3.form/Page4MarvelSelectCard'
import Page4MarvelSwitch from '../components/demo4widgets/3.form/Page4MarvelSwitch'
import Page4MarvelTabButton from '../components/demo4widgets/3.form/Page4MarvelTabButton'
import Page4MarvelTableDiff from '../components/demo4widgets/3.form/Page4MarvelTableDiff'
import Page4MarvelTimeLine from '../components/demo4widgets/3.form/Page4MarvelTimeLine'
import Page4MarvelTxtButton from '../components/demo4widgets/3.form/Page4MarvelTxtButton'
import Page4MarvelUpload from '../components/demo4widgets/3.form/Page4MarvelUpload'
import Page4MarvelUploadSimple from '../components/demo4widgets/3.form/Page4MarvelUploadSimple'
import Page4MarvelDragHelp from '../components/demo4widgets/3.form/Page4MarvelDragHelp'

import Page4MarvelAccordion from '../components/demo4widgets/4.navigator/Page4MarvelAccordion'
import Page4MarvelAccordion2 from '../components/demo4widgets/4.navigator/Page4MarvelAccordion2'
import Page4MarvelAccordion3 from '../components/demo4widgets/4.navigator/Page4MarvelAccordion3'
import Page4MarvelAccordion4 from '../components/demo4widgets/4.navigator/Page4MarvelAccordion4'
import Page4MarvelCrumb from '../components/demo4widgets/4.navigator/Page4MarvelCrumb'
import Page4MarvelMenu from '../components/demo4widgets/4.navigator/Page4MarvelMenu'
import Page4MarvelMenuContextC from '../components/demo4widgets/4.navigator/Page4MarvelMenuContextC'
import Page4MarvelMenuContext from '../components/demo4widgets/4.navigator/Page4MarvelMenuContext'
import Page4MarvelMenuContext2 from '../components/demo4widgets/4.navigator/Page4MarvelMenuContext2'
import Page4MarvelDropDownMenu from '../components/demo4widgets/4.navigator/Page4MarvelDropDownMenu'
import Page4MarvelMenuDropDown from '../components/demo4widgets/4.navigator/Page4MarvelMenuDropDown'
import Page4MarvelMenuHelp from '../components/demo4widgets/4.navigator/Page4MarvelMenuHelp'
import Page4MarvelMenuNew from '../components/demo4widgets/4.navigator/Page4MarvelMenuNew'
import Page4MarvelTab from '../components/demo4widgets/4.navigator/Page4MarvelTab'
import Page4MarvelWizard from '../components/demo4widgets/4.navigator/Page4MarvelWizard'
import Page4MarvelWizardAdvance from '../components/demo4widgets/4.navigator/Page4MarvelWizardAdvance'
import Page4MarvelWizardTab from '../components/demo4widgets/4.navigator/Page4MarvelWizardTab'

import Page4MarvelFlexiblePanel from '../components/demo4widgets/5.panel/Page4MarvelFlexiblePanel'
import Page4MarvelFloatPanel from '../components/demo4widgets/5.panel/Page4MarvelFloatPanel'
import Page4MarvelBottomExtPanel from '../components/demo4widgets/5.panel/Page4MarvelBottomExtPanel'
import Page4MarvelConfirmC from '../components/demo4widgets/5.panel/Page4MarvelConfirmC'
import Page4MarvelConfirm from '../components/demo4widgets/5.panel/Page4MarvelConfirm'
import Page4MarvelConfirmEx from '../components/demo4widgets/5.panel/Page4MarvelConfirmEx'
import Page4MarvelDashboardC from '../components/demo4widgets/5.panel/Page4MarvelDashboardC'
import Page4MarvelDashboard from '../components/demo4widgets/5.panel/Page4MarvelDashboard'
import Page4MarvelDashboardAdaptToContH from '../components/demo4widgets/5.panel/Page4MarvelDashboardAdaptToContH'
import Page4MarvelDialog from '../components/demo4widgets/5.panel/Page4MarvelDialog'
import Page4MarvelFoldPanel from '../components/demo4widgets/5.panel/Page4MarvelFoldPanel'
import Page4MarvelLeftExtPanel from '../components/demo4widgets/5.panel/Page4MarvelLeftExtPanel'
import Page4MarvelRightExtPanel from '../components/demo4widgets/5.panel/Page4MarvelRightExtPanel'

import Page4MarvelAceEditor from '../components/demo4widgets/6.items/Page4MarvelAceEditor'
import Page4MarvelLegend from '../components/demo4widgets/6.items/Page4MarvelLegend'
import Page4MarvelLoadingC from '../components/demo4widgets/6.items/Page4MarvelLoadingC'
import Page4MarvelLoading from '../components/demo4widgets/6.items/Page4MarvelLoading'
import Page4MarvelLoadingIconPublic from '../components/demo4widgets/6.items/Page4MarvelLoadingIconPublic'
import Page4MarvelLoadingMini from '../components/demo4widgets/6.items/Page4MarvelLoadingMini'
import Page4MarvelLoadingPublic from '../components/demo4widgets/6.items/Page4MarvelLoadingPublic'
import Page4MarvelLoadingPublicEx from '../components/demo4widgets/6.items/Page4MarvelLoadingPublicEx'
import Page4MarvelLogView from '../components/demo4widgets/6.items/Page4MarvelLogView'
import Page4MarvelPaging from '../components/demo4widgets/6.items/Page4MarvelPaging'
import Page4MarvelPromptC from '../components/demo4widgets/6.items/Page4MarvelPromptC'
import Page4MarvelPrompt from '../components/demo4widgets/6.items/Page4MarvelPrompt'
import Page4MarvelPromptGLobal from '../components/demo4widgets/6.items/Page4MarvelPromptGLobal'
import Page4MarvelSlider from '../components/demo4widgets/6.items/Page4MarvelSlider'
import Page4MarvelToolbar from '../components/demo4widgets/6.items/Page4MarvelToolbar'
import Page4MarvelWarning from '../components/demo4widgets/6.items/Page4MarvelWarning'

import Page4MarvelGrid from '../components/demo4widgets/7.grid/Page4MarvelGrid'
import Page4MarvelGridEx from '../components/demo4widgets/7.grid/Page4MarvelGridEx'
import Page4MarvelGridExFilter from '../components/demo4widgets/7.grid/Page4MarvelGridExFilter'
import Page4MarvelGridExWithFreezeColumn from '../components/demo4widgets/7.grid/Page4MarvelGridExWithFreezeColumn'
import Page4MarvelGridM from '../components/demo4widgets/7.grid/Page4MarvelGridM'
import Page4MarvelGridPriority from '../components/demo4widgets/7.grid/Page4MarvelGridPriority'
import Page4MarvelGridTree from '../components/demo4widgets/7.grid/Page4MarvelGridTree'
import Page4MarvelList1 from '../components/demo4widgets/7.grid/Page4MarvelList1'
import Page4MarvelList2 from '../components/demo4widgets/7.grid/Page4MarvelList2'
import Page4MarvelList2Analysis from '../components/demo4widgets/7.grid/Page4MarvelList2Analysis'
import Page4MarvelList3 from '../components/demo4widgets/7.grid/Page4MarvelList3'
import Page4MarvelList4 from '../components/demo4widgets/7.grid/Page4MarvelList4'
import Page4MarvelList5 from '../components/demo4widgets/7.grid/Page4MarvelList5'

import Page4MarvelLazyLoadTree from '../components/demo4widgets/8.tree/Page4MarvelLazyLoadTree'
import Page4MarvelZTree from '../components/demo4widgets/8.tree/Page4MarvelZTree'

import Page4MarvelChartBar from '../components/demo4widgets/9.chart/Page4MarvelChartBar'
import Page4MarvelChartBarLine from '../components/demo4widgets/9.chart/Page4MarvelChartBarLine'
import Page4MarvelChartBarLine2 from '../components/demo4widgets/9.chart/Page4MarvelChartBarLine2'
import Page4MarvelChartForce from '../components/demo4widgets/9.chart/Page4MarvelChartForce'
import Page4MarvelChartGauge from '../components/demo4widgets/9.chart/Page4MarvelChartGauge'
import Page4MarvelChartLine from '../components/demo4widgets/9.chart/Page4MarvelChartLine'
import Page4MarvelChartLine2 from '../components/demo4widgets/9.chart/Page4MarvelChartLine2'
import Page4MarvelChartLineNew from '../components/demo4widgets/9.chart/Page4MarvelChartLineNew'
import Page4MarvelChartNBar from '../components/demo4widgets/9.chart/Page4MarvelChartNBar'
import Page4MarvelChartPie from '../components/demo4widgets/9.chart/Page4MarvelChartPie'
import Page4MarvelChartPie2 from '../components/demo4widgets/9.chart/Page4MarvelChartPie2'
import Page4MarvelChartRadar from '../components/demo4widgets/9.chart/Page4MarvelChartRadar'
import Page4MarvelChartScatter from '../components/demo4widgets/9.chart/Page4MarvelChartScatter'
import Page4MarvelChartScatter2 from '../components/demo4widgets/9.chart/Page4MarvelChartScatter2'
import Page4MarvelChartStackLine from '../components/demo4widgets/9.chart/Page4MarvelChartStackLine'
import Page4MarvelD3Tree from '../components/demo4widgets/9.chart/Page4MarvelD3Tree'

import Page4MarvelTopo from '../components/demo4widgets/10.topo/Page4MarvelTopo'

import Page4MarvelLeaflet from '../components/demo4widgets/11.gis/Page4MarvelLeaflet'

import Page4MarvelDevPanel from '../components/demo4widgets/12.devPanel/Page4MarvelDevPanel'
import Page4MarvelDevPanelEx from '../components/demo4widgets/12.devPanel/Page4MarvelDevPanelEx'


import Page4MarvelLayout1 from '../components/demo4widgets/2.basic/Page4MarvelLayout1'
import Page4MarvelLayout2 from '../components/demo4widgets/2.basic/Page4MarvelLayout2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Page4Install',
      component: Page4Install
    },{
      path: '/Page4Start',
      name: 'Page4Start',
      component: Page4Start
    },{
      path: '/Page4Develop',
      name: 'Page4Develop',
      component: Page4Develop
    },{
      path: '/Page4Lan',
      name: 'Page4Lan',
      component:Page4Lan
    },{
      path: '/Page4Theme',
      name: 'Page4Theme',
      component:Page4Theme
    },{
      path: '/Page4Icons',
      name: 'Page4Icons',
      component:Page4Icons
    },{
      path: '/Page4MarvelAnimate',
      name: 'Page4MarvelAnimate',
      component:Page4MarvelAnimate
    },{
      path: '/Page4MarvelFrame',
      name: 'Page4MarvelFrame',
      component:Page4MarvelFrame
    },{
      path: '/Page4MarvelBidirectionalSelect',
      name: 'Page4MarvelBidirectionalSelect',
      component:Page4MarvelBidirectionalSelect
    },{
      path: '/Page4MarvelButtonC',
      name: 'Page4MarvelButtonC',
      component:Page4MarvelButtonC
    },{
      path: '/Page4MarvelButton',
      name: 'Page4MarvelButton',
      component:Page4MarvelButton
    },{
      path: '/Page4MarvelCheckBox',
      name: 'Page4MarvelCheckBox',
      component:Page4MarvelCheckBox
    },{
      path: '/Page4MarvelDate',
      name: 'Page4MarvelDate',
      component:Page4MarvelDate
    },{
      path: '/Page4MarvelDate2',
      name: 'Page4MarvelDate2',
      component:Page4MarvelDate2
    },{
      path: '/Page4MarvelDiff',
      name: 'Page4MarvelDiff',
      component:Page4MarvelDiff
    },{
      path: '/Page4MarvelDropDownButton',
      name: 'Page4MarvelDropDownButton',
      component:Page4MarvelDropDownButton
    },{
      path: '/Page4MarvelIconButton',
      name: 'Page4MarvelIconButton',
      component:Page4MarvelIconButton
    },{
      path: '/Page4MarvelIconTxtButton',
      name: 'Page4MarvelIconTxtButton',
      component:Page4MarvelIconTxtButton
    },{
      path: '/Page4MarvelInfo',
      name: 'Page4MarvelInfo',
      component:Page4MarvelInfo
    },{
      path: '/Page4MarvelInput',
      name: 'Page4MarvelInput',
      component:Page4MarvelInput
    },{
      path: '/Page4MarvelInputDropDownC',
      name: 'Page4MarvelInputDropDownC',
      component:Page4MarvelInputDropDownC
    },{
      path: '/Page4MarvelInputDropDown',
      name: 'Page4MarvelInputDropDown',
      component:Page4MarvelInputDropDown
    },{
      path: '/Page4MarvelInputDropDownWithTip',
      name: 'Page4MarvelInputDropDownWithTip',
      component:Page4MarvelInputDropDownWithTip
    },{
      path: '/Page4MarvelLink',
      name: 'Page4MarvelLink',
      component:Page4MarvelLink
    },{
      path: '/Page4MarvelListInput',
      name: 'Page4MarvelListInput',
      component:Page4MarvelListInput
    },{
      path: '/Page4MarvelMultiDropDown',
      name: 'Page4MarvelMultiDropDown',
      component:Page4MarvelMultiDropDown
    },{
      path: '/Page4MarvelMultiInput',
      name: 'Page4MarvelMultiInput',
      component:Page4MarvelMultiInput
    },{
      path: '/Page4MarvelNumberSelect',
      name: 'Page4MarvelNumberSelect',
      component:Page4MarvelNumberSelect
    },{
      path: '/Page4MarvelProgress',
      name: 'Page4MarvelProgress',
      component:Page4MarvelProgress
    },{
      path: '/Page4MarvelRadioBox',
      name: 'Page4MarvelRadioBox',
      component:Page4MarvelRadioBox
    },{
      path: '/Page4MarvelSearch',
      name: 'Page4MarvelSearch',
      component:Page4MarvelSearch
    },{
      path: '/Page4MarvelSearchAdvance',
      name: 'Page4MarvelSearchAdvance',
      component:Page4MarvelSearchAdvance
    },{
      path: '/Page4MarvelSearchWithDropDown',
      name: 'Page4MarvelSearchWithDropDown',
      component:Page4MarvelSearchWithDropDown
    },{
      path: '/Page4MarvelSearchBox',
      name: 'Page4MarvelSearchBox',
      component:Page4MarvelSearchBox
    },{
      path: '/Page4MarvelSelectCard',
      name: 'Page4MarvelSelectCard',
      component:Page4MarvelSelectCard
    },{
      path: '/Page4MarvelSwitch',
      name: 'Page4MarvelSwitch',
      component:Page4MarvelSwitch
    },{
      path: '/Page4MarvelTabButton',
      name: 'Page4MarvelTabButton',
      component:Page4MarvelTabButton
    },{
      path: '/Page4MarvelTableDiff',
      name: 'Page4MarvelTableDiff',
      component:Page4MarvelTableDiff
    },{
      path: '/Page4MarvelTimeLine',
      name: 'Page4MarvelTimeLine',
      component:Page4MarvelTimeLine
    },{
      path: '/Page4MarvelTxtButton',
      name: 'Page4MarvelTxtButton',
      component:Page4MarvelTxtButton
    },{
      path: '/Page4MarvelUpload',
      name: 'Page4MarvelUpload',
      component:Page4MarvelUpload
    },{
      path: '/Page4MarvelUploadSimple',
      name: 'Page4MarvelUploadSimple',
      component:Page4MarvelUploadSimple
    },{
      path: '/Page4MarvelAccordion',
      name: 'Page4MarvelAccordion',
      component:Page4MarvelAccordion
    },{
      path: '/Page4MarvelAccordion2',
      name: 'Page4MarvelAccordion2',
      component:Page4MarvelAccordion2
    },{
      path: '/Page4MarvelAccordion3',
      name: 'Page4MarvelAccordion3',
      component:Page4MarvelAccordion3
    },{
      path: '/Page4MarvelAccordion4',
      name: 'Page4MarvelAccordion4',
      component:Page4MarvelAccordion4
    },{
      path: '/Page4MarvelCrumb',
      name: 'Page4MarvelCrumb',
      component:Page4MarvelCrumb
    },{
      path: '/Page4MarvelMenu',
      name: 'Page4MarvelMenu',
      component:Page4MarvelMenu
    },{
      path: '/Page4MarvelMenuContextC',
      name: 'Page4MarvelMenuContextC',
      component:Page4MarvelMenuContextC
    },{
      path: '/Page4MarvelMenuContext',
      name: 'Page4MarvelMenuContext',
      component:Page4MarvelMenuContext
    },{
      path: '/Page4MarvelMenuContext2',
      name: 'Page4MarvelMenuContext2',
      component:Page4MarvelMenuContext2
    },{
      path: '/Page4MarvelDropDownMenu',
      name: 'Page4MarvelDropDownMenu',
      component:Page4MarvelDropDownMenu
    },{
      path: '/Page4MarvelMenuDropDown',
      name: 'Page4MarvelMenuDropDown',
      component:Page4MarvelMenuDropDown
    },{
      path: '/Page4MarvelMenuHelp',
      name: 'Page4MarvelMenuHelp',
      component:Page4MarvelMenuHelp
    },{
      path: '/Page4MarvelMenuNew',
      name: 'Page4MarvelMenuNew',
      component:Page4MarvelMenuNew
    },{
      path: '/Page4MarvelTab',
      name: 'Page4MarvelTab',
      component:Page4MarvelTab
    },{
      path: '/Page4MarvelWizard',
      name: 'Page4MarvelWizard',
      component:Page4MarvelWizard
    },{
      path: '/Page4MarvelWizardAdvance',
      name: 'Page4MarvelWizardAdvance',
      component:Page4MarvelWizardAdvance
    },{
      path: '/Page4MarvelWizardTab',
      name: 'Page4MarvelWizardTab',
      component:Page4MarvelWizardTab
    },{
      path: '/Page4MarvelFlexiblePanel',
      name: 'Page4MarvelFlexiblePanel',
      component:Page4MarvelFlexiblePanel
    },{
      path: '/Page4MarvelFloatPanel',
      name: 'Page4MarvelFloatPanel',
      component:Page4MarvelFloatPanel
    },{
      path: '/Page4MarvelBottomExtPanel',
      name: 'Page4MarvelBottomExtPanel',
      component:Page4MarvelBottomExtPanel
    },{
      path: '/Page4MarvelConfirmC',
      name: 'Page4MarvelConfirmC',
      component:Page4MarvelConfirmC
    },{
      path: '/Page4MarvelConfirm',
      name: 'Page4MarvelConfirm',
      component:Page4MarvelConfirm
    },{
      path: '/Page4MarvelConfirmEx',
      name: 'Page4MarvelConfirmEx',
      component:Page4MarvelConfirmEx
    },{
      path: '/Page4MarvelDashboardC',
      name: 'Page4MarvelDashboardC',
      component:Page4MarvelDashboardC
    },{
      path: '/Page4MarvelDashboard',
      name: 'Page4MarvelDashboard',
      component:Page4MarvelDashboard
    },{
      path: '/Page4MarvelDashboardAdaptToContH',
      name: 'Page4MarvelDashboardAdaptToContH',
      component:Page4MarvelDashboardAdaptToContH
    },{
      path: '/Page4MarvelDialog',
      name: 'Page4MarvelDialog',
      component:Page4MarvelDialog
    },{
      path: '/Page4MarvelFoldPanel',
      name: 'Page4MarvelFoldPanel',
      component:Page4MarvelFoldPanel
    },{
      path: '/Page4MarvelLeftExtPanel',
      name: 'Page4MarvelLeftExtPanel',
      component:Page4MarvelLeftExtPanel
    },{
      path: '/Page4MarvelRightExtPanel',
      name: 'Page4MarvelRightExtPanel',
      component:Page4MarvelRightExtPanel
    },{
      path: '/Page4MarvelAceEditor',
      name: 'Page4MarvelAceEditor',
      component:Page4MarvelAceEditor
    },{
      path: '/Page4MarvelLegend',
      name: 'Page4MarvelLegend',
      component:Page4MarvelLegend
    },{
      path: '/Page4MarvelLoadingC',
      name: 'Page4MarvelLoadingC',
      component:Page4MarvelLoadingC
    },{
      path: '/Page4MarvelLoading',
      name: 'Page4MarvelLoading',
      component:Page4MarvelLoading
    },{
      path: '/Page4MarvelLoadingIconPublic',
      name: 'Page4MarvelLoadingIconPublic',
      component:Page4MarvelLoadingIconPublic
    },{
      path: '/Page4MarvelLoadingMini',
      name: 'Page4MarvelLoadingMini',
      component:Page4MarvelLoadingMini
    },{
      path: '/Page4MarvelLoadingPublic',
      name: 'Page4MarvelLoadingPublic',
      component:Page4MarvelLoadingPublic
    },{
      path: '/Page4MarvelLoadingPublicEx',
      name: 'Page4MarvelLoadingPublicEx',
      component:Page4MarvelLoadingPublicEx
    },{
      path: '/Page4MarvelLogView',
      name: 'Page4MarvelLogView',
      component:Page4MarvelLogView
    },{
      path: '/Page4MarvelPaging',
      name: 'Page4MarvelPaging',
      component:Page4MarvelPaging
    },{
      path: '/Page4MarvelPromptC',
      name: 'Page4MarvelPromptC',
      component:Page4MarvelPromptC
    },{
      path: '/Page4MarvelPrompt',
      name: 'Page4MarvelPrompt',
      component:Page4MarvelPrompt
    },{
      path: '/Page4MarvelPromptGLobal',
      name: 'Page4MarvelPromptGLobal',
      component:Page4MarvelPromptGLobal
    },{
      path: '/Page4MarvelSlider',
      name: 'Page4MarvelSlider',
      component:Page4MarvelSlider
    },{
      path: '/Page4MarvelToolbar',
      name: 'Page4MarvelToolbar',
      component:Page4MarvelToolbar
    },{
      path: '/Page4MarvelWarning',
      name: 'Page4MarvelWarning',
      component:Page4MarvelWarning
    },{
      path: '/Page4MarvelGrid',
      name: 'Page4MarvelGrid',
      component:Page4MarvelGrid
    },{
      path: '/Page4MarvelGridEx',
      name: 'Page4MarvelGridEx',
      component:Page4MarvelGridEx
    },{
      path: '/Page4MarvelGridExFilter',
      name: 'Page4MarvelGridExFilter',
      component:Page4MarvelGridExFilter
    },{
      path: '/Page4MarvelGridExWithFreezeColumn',
      name: 'Page4MarvelGridExWithFreezeColumn',
      component:Page4MarvelGridExWithFreezeColumn
    },{
      path: '/Page4MarvelGridM',
      name: 'Page4MarvelGridM',
      component:Page4MarvelGridM
    },{
      path: '/Page4MarvelGridPriority',
      name: 'Page4MarvelGridPriority',
      component:Page4MarvelGridPriority
    },{
      path: '/Page4MarvelGridTree',
      name: 'Page4MarvelGridTree',
      component:Page4MarvelGridTree
    },{
      path: '/Page4MarvelList1',
      name: 'Page4MarvelList1',
      component:Page4MarvelList1
    },{
      path: '/Page4MarvelList2',
      name: 'Page4MarvelList2',
      component:Page4MarvelList2
    },{
      path: '/Page4MarvelList2Analysis',
      name: 'Page4MarvelList2Analysis',
      component:Page4MarvelList2Analysis
    },{
      path: '/Page4MarvelList3',
      name: 'Page4MarvelList3',
      component:Page4MarvelList3
    },{
      path: '/Page4MarvelList4',
      name: 'Page4MarvelList4',
      component:Page4MarvelList4
    },{
      path: '/Page4MarvelList5',
      name: 'Page4MarvelList5',
      component:Page4MarvelList5
    },{
      path: '/Page4MarvelDragHelp',
      name: 'Page4MarvelDragHelp',
      component:Page4MarvelDragHelp
    },{
      path: '/Page4MarvelLazyLoadTree',
      name: 'Page4MarvelLazyLoadTree',
      component:Page4MarvelLazyLoadTree
    },{
      path: '/Page4MarvelZTree',
      name: 'Page4MarvelZTree',
      component:Page4MarvelZTree
    },{
      path: '/Page4MarvelChartBar',
      name: 'Page4MarvelChartBar',
      component:Page4MarvelChartBar
    },{
      path: '/Page4MarvelChartBarLine',
      name: 'Page4MarvelChartBarLine',
      component:Page4MarvelChartBarLine
    },{
      path: '/Page4MarvelChartBarLine2',
      name: 'Page4MarvelChartBarLine2',
      component:Page4MarvelChartBarLine2
    },{
      path: '/Page4MarvelChartForce',
      name: 'Page4MarvelChartForce',
      component:Page4MarvelChartForce
    },{
      path: '/Page4MarvelChartGauge',
      name: 'Page4MarvelChartGauge',
      component:Page4MarvelChartGauge
    },{
      path: '/Page4MarvelChartLine',
      name: 'Page4MarvelChartLine',
      component:Page4MarvelChartLine
    },{
      path: '/Page4MarvelChartLine2',
      name: 'Page4MarvelChartLine2',
      component:Page4MarvelChartLine2
    },{
      path: '/Page4MarvelChartLineNew',
      name: 'Page4MarvelChartLineNew',
      component:Page4MarvelChartLineNew
    },{
      path: '/Page4MarvelChartNBar',
      name: 'Page4MarvelChartNBar',
      component:Page4MarvelChartNBar
    },{
      path: '/Page4MarvelChartPie',
      name: 'Page4MarvelChartPie',
      component:Page4MarvelChartPie
    },{
      path: '/Page4MarvelChartPie2',
      name: 'Page4MarvelChartPie2',
      component:Page4MarvelChartPie2
    },{
      path: '/Page4MarvelChartRadar',
      name: 'Page4MarvelChartRadar',
      component:Page4MarvelChartRadar
    },{
      path: '/Page4MarvelChartScatter',
      name: 'Page4MarvelChartScatter',
      component:Page4MarvelChartScatter
    },{
      path: '/Page4MarvelChartScatter2',
      name: 'Page4MarvelChartScatter2',
      component:Page4MarvelChartScatter2
    },{
      path: '/Page4MarvelChartStackLine',
      name: 'Page4MarvelChartStackLine',
      component:Page4MarvelChartStackLine
    },{
      path: '/Page4MarvelD3Tree',
      name: 'Page4MarvelD3Tree',
      component:Page4MarvelD3Tree
    },{
      path: '/Page4MarvelTopo',
      name: 'Page4MarvelTopo',
      component:Page4MarvelTopo
    },{
      path: '/Page4MarvelLeaflet',
      name: 'Page4MarvelLeaflet',
      component:Page4MarvelLeaflet
    },{
      path: '/Page4MarvelDevPanel',
      name: 'Page4MarvelDevPanel',
      component:Page4MarvelDevPanel
    },{
      path: '/Page4MarvelDevPanelEx',
      name: 'Page4MarvelDevPanelEx',
      component:Page4MarvelDevPanelEx
    },{
      path: '/Page4MarvelLayout1',
      name: 'Page4MarvelLayout1',
      component:Page4MarvelLayout1
    },{
      path: '/Page4MarvelLayout2',
      name: 'Page4MarvelLayout2',
      component:Page4MarvelLayout2
    }]
})
