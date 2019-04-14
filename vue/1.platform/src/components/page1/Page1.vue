<template>
  <div class="page1">
    <div class="leftArea">
      <!--accordionArea start-->
      <marvel-accordion isFolder="false" hasShadow="true"
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
  import MarvelAccordion from "@/walle/widget/accordion/MarvelAccordion";
  //#endregion
  //#region 1.quickStart
  import Page4Install from '@/components/page3/1.quickStart/Page4Install'
  import Page4VueBasic from '@/components/page3/1.quickStart/Page4VueBasic'
  //#endregion
  //#region 2.1.widget.basic
  import Page4Color from '@/components/page3/2.widget/2.1.basic/Page4Color'
  import Page4Font from '@/components/page3/2.widget/2.1.basic/Page4Font'
  import Page4Frame from '@/components/page3/2.widget/2.1.basic/Page4Frame'
  import Page4Icon from '@/components/page3/2.widget/2.1.basic/Page4Icon'
  import Page4Layout1 from '@/components/page3/2.widget/2.1.basic/Page4Layout1'
  import Page4Layout2 from '@/components/page3/2.widget/2.1.basic/Page4Layout2'
  import Page4Animate from "../page3/2.widget/2.1.basic/Page4Animate";
  //#endregion
  //#region 2.2.widget.form
  import Page4Button from '@/components/page3/2.widget/2.2.form/Page4Button'
  import Page4Date from '@/components/page3/2.widget/2.2.form/Page4Date'
  import page4Diff from '@/components/page3/2.widget/2.2.form/Page4Diff'
  import Page4Input from '@/components/page3/2.widget/2.2.form/Page4Input'
  import Page4Link from '@/components/page3/2.widget/2.2.form/Page4Link'
  import Page4Search from '@/components/page3/2.widget/2.2.form/Page4Search'
  import Page4Select from '@/components/page3/2.widget/2.2.form/Page4Select'
  import Page4TimeLine from '@/components/page3/2.widget/2.2.form/Page4TimeLine'
  import Page4Upload from '@/components/page3/2.widget/2.2.form/Page4Upload'
  //#endregion
  //#region 2.3.widget.navigator
  import Page4Accordion from '@/components/page3/2.widget/2.3.navigator/Page4Accordion'
  import Page4Crumb from '@/components/page3/2.widget/2.3.navigator/Page4Crumb'
  import Page4Menu from '@/components/page3/2.widget/2.3.navigator/Page4Menu'
  import Page4MenuContext from '@/components/page3/2.widget/2.3.navigator/Page4MenuContext'
  import Page4MenuDropDown from '@/components/page3/2.widget/2.3.navigator/Page4MenuDropDown'
  import Page4Tab from '@/components/page3/2.widget/2.3.navigator/Page4Tab'
  import Page4Wizard from '@/components/page3/2.widget/2.3.navigator/Page4Wizard'
  //#endregion
  //#region 2.4.widget.panel
  import Page4DashBoard from '@/components/page3/2.widget/2.4.panel/Page4DashBoard'
  import Page4Dialog from '@/components/page3/2.widget/2.4.panel/Page4Dialog'
  import Page4ExtPanel from '@/components/page3/2.widget/2.4.panel/Page4ExtPanel'
  import Page4FoldPanel from '@/components/page3/2.widget/2.4.panel/Page4FoldPanel'
  //#endregion
  //#region 2.5.widget.items
  import Page4Legend from '@/components/page3/2.widget/2.5.items/Page4Legend'
  import Page4Loading1 from '@/components/page3/2.widget/2.5.items/Page4Loading1'
  import Page4Loading2 from '@/components/page3/2.widget/2.5.items/Page4Loading2'
  import Page4Location from '@/components/page3/2.widget/2.5.items/Page4Location'
  import Page4Prompt from '@/components/page3/2.widget/2.5.items/Page4Prompt'
  import Page4Toolbar from '@/components/page3/2.widget/2.5.items/Page4Toolbar'
  import Page4Warning from '@/components/page3/2.widget/2.5.items/Page4Warning'
  import Page4Paging from '@/components/page3/2.widget/2.5.items/Page4Paging'
  //#endregion
  //#region 2.6.widget.grid
  import Page4Grid from '@/components/page3/2.widget/2.6.grid/Page4Grid'
  import Page4List1 from '@/components/page3/2.widget/2.6.grid/Page4List1'
  import Page4List2 from '@/components/page3/2.widget/2.6.grid/Page4List2'
  import Page4List3 from '@/components/page3/2.widget/2.6.grid/Page4List3'
  //#endregion
  //#region 2.7.widget.tree
  import Page4ZTree from '@/components/page3/2.widget/2.7.tree/Page4ZTree'
  //#endregion
  //#region 2.8.widget.chart
  import Page4Chart from '@/components/page3/2.widget/2.8.chart/Page4Chart'
  //#endregion
  //#region 2.9.widget.topo
  import Page4Topo from '@/components/page3/2.widget/2.9.topo/Page4Topo'
  //#endregion
  //#region 2.10.widget.gis
  import Page4Leaflet from '@/components/page3/2.widget/2.10.gis/Page4Leaflet'
  //#endregion
  //#region 2.11.widget.devPanel
  import Page4DevPanel from '@/components/page3/2.widget/2.11.devPanel/Page4DevPanel'
  //#endregion

  export default {
    components: {
      MarvelAccordion,
      //#region 1.quickStart
      Page4Install,
      Page4VueBasic,
      //#endregion
      //#region 2.1.widget.basic
      Page4Color,
      Page4Font,
      Page4Frame,
      Page4Icon,
      Page4Layout1,
      Page4Layout2,
      Page4Animate,
      //#endregion
      //#region 2.2.widget.form
      Page4Button,
      Page4Date,
      page4Diff,
      Page4Input,
      Page4Link,
      Page4Search,
      Page4Select,
      Page4TimeLine,
      Page4Upload,
      //#endregion
      //#region 2.3.widget.navigator
      Page4Accordion,
      Page4Crumb,
      Page4Menu,
      Page4MenuContext,
      Page4MenuDropDown,
      Page4Tab,
      Page4Wizard,
      //#endregion
      //#region 2.4.widget.panel
      Page4DashBoard,
      Page4Dialog,
      Page4ExtPanel,
      Page4FoldPanel,
      //#endregion
      //#region 2.5.widget.items
      Page4Legend,
      Page4Loading1,
      Page4Loading2,
      Page4Location,
      Page4Prompt,
      Page4Toolbar,
      Page4Warning,
      Page4Paging,
      //#endregion
      //#region 2.6.widget.grid
      Page4Grid,
      Page4List1,
      Page4List2,
      Page4List3,
      //#endregion
      //#region 2.7.widget.tree
      Page4ZTree,
      //#endregion
      //#region 2.8.widget.chart
      Page4Chart,
      //#endregion
      //#region 2.9.widget.topo
      Page4Topo,
      //#endregion
      //#region 2.10.widget.gis
      Page4Leaflet,
      //#endregion
      //#region 2.11.widget.devPanel
      Page4DevPanel
      //#endregion
    },
    name: 'page1',
    data: function () {
      return {
        //#region accordion
        defaultSelectLabel: "安装",
        accordionItems: [{
          label: "开发指南",
          icon: "icon-paint-format",
          expand: true,
          subItems:[{
            id: "Page4Install",
            label: "安装"
          }, {
            id: "",
            label: "快速入门"
          }, {
            id: "",
            label: "国际化"
          }, {
            id: "",
            label: "自定义主题"
          }, {
            id: "Page4VueBasic",
            label: "Vue基础"
          }, {
            id: "",
            label: "Vue消息"
          }]
        }, {
          label: "控件(基础)",
          icon: "icon-headphones",
          expand: false,
          subItems: [{
            id: "Page4Color",
            label: "色彩"
          }, {
            id: "Page4Font",
            label: "字体"
          }, {
            id: "Page4Frame",
            label: "栅格"
          }, {
            id: "Page4Icon",
            label: "图标"
          }, {
            id: "Page4Layout1",
            label: "布局1"
          }, {
            id: "Page4Layout2",
            label: "布局2"
          }, {
            id: "Page4Animate",
            label: "动画"
          }]
        }, {
          label: "控件(表单)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "Page4Button",
            label: "按钮"
          }, {
            id: "Page4Date",
            label: "时间日期"
          },{
            id: "page4Diff",
            label: "文本对比"
          }, {
            id: "Page4Input",
            label: "文本输入"
          }, {
            id: "Page4Link",
            label: "链接"
          }, {
            id: "Page4Search",
            label: "搜索框"
          }, {
            id: "Page4Select",
            label: "选择"
          }, {
            id: "Page4TimeLine",
            label: "时间线"
          }, {
            id: "",
            label: "时间选择器"
          }, {
            id: "Page4Upload",
            label: "文件上传"
          }]
        }, {
          label: "控件(导航)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "Page4Accordion",
            label: "手风琴"
          }, {
            id: "Page4Crumb",
            label: "面包屑"
          }, {
            id: "Page4Menu",
            label: "顶部菜单"
          }, {
            id: "Page4MenuContext",
            label: "右键菜单"
          }, {
            id: "Page4MenuDropDown",
            label: "顶部附属菜单"
          }, {
            id: "Page4Tab",
            label: "页签"
          }, {
            id: "Page4Wizard",
            label: "向导"
          }]
        }, {
          label: "控件(面板)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "Page4DashBoard",
            label: "Dashboard"
          }, {
            id: "Page4Dialog",
            label: "对话框"
          }, {
            id: "Page4ExtPanel",
            label: "扩展面板"
          }, {
            id: "Page4FoldPanel",
            label: "折叠面板"
          }]
        }, {
          label: "控件(小部件)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "Page4Legend",
            label: "图例"
          }, {
            id: "Page4Loading1",
            label: "页面加载"
          }, {
            id: "Page4Loading2",
            label: "页面加载_2"
          }, {
            id: "Page4Location",
            label: "location"
          }, {
            id: "Page4Prompt",
            label: "全局消息"
          }, {
            id: "Page4Toolbar",
            label: "Toolbar"
          }, {
            id: "Page4Warning",
            label: "告警板"
          }, {
            id: "Page4Paging",
            label: "分页控件"
          }]
        }, {
          label: "控件(表格)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "Page4Grid",
            label: "表格"
          }, {
            id: "Page4List1",
            label: "悬浮List1"
          }, {
            id: "Page4List2",
            label: "悬浮List2"
          }, {
            id: "Page4List3",
            label: "List3"
          }]
        }, {
          label: "控件(树)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "Page4ZTree",
            label: "Tree"
          }]
        }, {
          label: "控件(图表)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "Page4Chart",
            label: "图表"
          }]
        }, {
          label: "控件(topo)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "Page4Topo",
            label: "Topo"
          }]
        }, {
          label: "控件(gis)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "Page4Leaflet",
            label: "GIS"
          }]
        }, {
          label: "控件(devPanel)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "Page4DevPanel",
            label: "DevPanel"
          }]
        }, {
          label: "典型页面",
          icon: "icon-book",
          expand: false,
          subItems: [{
            id: "",
            label: "Dashboard"
          }, {
            id: "",
            label: "列表类"
          }, {
            id: "",
            label: "二级管理页面"
          }, {
            id: "",
            label: "对象管理器"
          }, {
            id: "",
            label: "设计配置类工具"
          }, {
            id: "",
            label: "表单配置类"
          }]
        }, {
          id: "",
          label: "更新日志",
          icon: "icon-clock2"
        }],
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
        }
        else {
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
  }

  .page1 .rightArea {
    width: calc(100% - 234px);
    float: left;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .page1 .fold{
    width: calc(100% - 76px);
  }

  .dark .rightArea{
    background-color: #04051b;
  }
</style>
