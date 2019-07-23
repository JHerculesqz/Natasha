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
  import Page4Date from './demo4widgets/2.widget/Page4Date'
  import Page4WorkFlow from './demo4widgets/3.navigator/Page4WorkFlow'

  export default {
    components: {
      MarvelAccordion,
      Page4Date,
      Page4WorkFlow,
    },
    name: 'page1',
    data: function () {
      return {
        //#region accordion
        defaultSelectLabel: "时间日期",
        accordionItems: [{
          label: "开发指南",
          icon: "icon-paint-format",
          expand: false,
          subItems:[{
            id: "",
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
            id: "",
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
            id: "",
            label: "色彩"
          }, {
            id: "",
            label: "字体"
          }, {
            id: "",
            label: "栅格"
          }, {
            id: "",
            label: "图标"
          }, {
            id: "",
            label: "布局1"
          }, {
            id: "",
            label: "布局2"
          }, {
            id: "",
            label: "动画"
          }, {
            id: "",
            label: "滚动"
          }]
        }, {
          label: "控件(表单)",
          icon: "icon-pacman",
          expand: true,
          subItems: [{
            id: "",
            label: "按钮"
          }, {
            id: "Page4Date",
            label: "时间日期"
          },{
            id: "",
            label: "文本对比"
          }, {
            id: "",
            label: "文本输入"
          }, {
            id: "",
            label: "链接"
          }, {
            id: "",
            label: "搜索框"
          }, {
            id: "",
            label: "选择"
          }, {
            id: "",
            label: "时间线"
          }, {
            id: "",
            label: "时间选择器"
          }, {
            id: "",
            label: "文件上传"
          }]
        }, {
          label: "控件(导航)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "",
            label: "手风琴"
          }, {
            id: "",
            label: "面包屑"
          }, {
            id: "",
            label: "顶部菜单"
          }, {
            id: "",
            label: "右键菜单"
          }, {
            id: "",
            label: "顶部附属菜单"
          }, {
            id: "",
            label: "页签"
          }, {
            id: "",
            label: "向导"
          }, {
            id: "Page4WorkFlow",
            label: "工作流"
          }]
        }, {
          label: "控件(面板)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "",
            label: "Dashboard"
          }, {
            id: "",
            label: "对话框"
          }, {
            id: "",
            label: "扩展面板"
          }, {
            id: "",
            label: "折叠面板"
          }]
        }, {
          label: "控件(小部件)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "",
            label: "编码"
          }, {
            id: "",
            label: "图例"
          }, {
            id: "",
            label: "页面加载"
          }, {
            id: "",
            label: "页面加载_2"
          }, {
            id: "",
            label: "页面加载-供全局使用"
          }, {
            id: "",
            label: "location"
          }, {
            id: "",
            label: "全局消息"
          }, {
            id: "",
            label: "Toolbar"
          }, {
            id: "",
            label: "告警板"
          }, {
            id: "",
            label: "分页控件"
          }]
        }, {
          label: "控件(表格)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "",
            label: "表格"
          }, {
            id: "",
            label: "悬浮List1"
          }, {
            id: "",
            label: "悬浮List2"
          }, {
            id: "",
            label: "List3"
          }]
        }, {
          label: "控件(树)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "",
            label: "Tree"
          }]
        }, {
          label: "控件(图表)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "",
            label: "图表"
          }]
        }, {
          label: "控件(topo)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "",
            label: "Topo"
          }]
        }, {
          label: "控件(gis)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "",
            label: "GIS"
          }]
        }, {
          label: "控件(devPanel)",
          icon: "icon-pacman",
          expand: false,
          subItems: [{
            id: "",
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
        rightModuleName: "Page4Date"
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
