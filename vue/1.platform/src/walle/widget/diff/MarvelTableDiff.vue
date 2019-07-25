<template>
  <div class="diffContent">
    <div style="padding:10px; overflow: hidden;">
      <div class="auditLegendPanel switchArea">
        <div class="createLegend"></div>
        <div class="legendText">{{$t('diff_create')}}</div>
        <div class="modifyLegend"></div>
        <div class="legendText">{{$t('diff_modify')}}</div>
        <div class="deleteLegend"></div>
        <div class="legendText">{{$t('diff_delete')}}</div>
      </div>
    </div>
    <div class="treeCont">
      <table class="tb_table">
        <thead class="tb_thead">
        <tr>
          <th>{{$t('diff_key')}}</th>
          <th>{{$t('diff_device')}}</th>
          <th>{{$t('diff_controller')}}</th>
        </tr>
        </thead>
        <tbody class="tb_tbody" :id="id">
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import StringUtils from "../../component/str";

  /**
   *  MarvelTableDiff widget description
   *  @vuedoc
   *  @exports MarvelTableDiff
   */
  export default {
    name: 'MarvelTableDiff',
    components: {},
    props: {
      id: {
        type: String,
        default: "",
        required: true,
      }
    },
    data: function () {
      return {
        tBodyData: '',
        tDiffDepth: 0
      }
    },
    methods: {
      //#region inner

      _genTable(oDiffData) {
        let oData = oDiffData;
        for (let i = 0; i < oData.length; i++) {
          this._buildTreeTable(oData[i].diffJson, "");
          $("#" + this.id).append(this.tBodyData);
          this.tBodyData = '';
        }
        $("#" + this.id).click(function (e) {
          const curObj = e.target;
          if (curObj.tagName === "SPAN") {
            let lineObj = curObj.parentElement.parentElement.parentElement;
            let curDeepth = parseInt(lineObj.getAttribute("deepth"));
            let nextLines = $(lineObj).nextAll();
            const toOpen = curObj.getAttribute("class").indexOf("icon-marvelIcon-65") > -1;
            if (toOpen) {
              $(curObj).addClass("icon-marvelIcon-64");
              $(curObj).removeClass("icon-marvelIcon-65");
            } else {
              $(curObj).addClass("icon-marvelIcon-65");
              $(curObj).removeClass("icon-marvelIcon-64");
            }
            for (let j = 0; j < nextLines.length; j++) {
              var lineDeep = parseInt(nextLines[j].getAttribute("deepth"));
              if (lineDeep > curDeepth) {
                if (toOpen && nextLines[j].getAttribute("treeNode")) {
                  $(nextLines[j].children[0].children[0].children[0]).addClass("icon-marvelIcon-64");
                  $(nextLines[j].children[0].children[0].children[0]).removeClass("icon-marvelIcon-65");
                }

                toOpen ? $(nextLines[j]).show() : $(nextLines[j]).hide();
              } else {
                break;
              }
            }
          }
        });
      },
      _buildTreeTable(oDiffData, position) {
        //如果是个数组，那就有很多兄弟
        if (Array.isArray(oDiffData)) {
          for (const arrData of oDiffData) {
            if (Object.prototype.toString.call(arrData) === '[object Object]' && (arrData.hasOwnProperty("left") || arrData.hasOwnProperty("right"))) {
              let leftData = arrData.left;
              let rightData = arrData.right;
              //创建、删除场景
              if (Object.prototype.toString.call(arrData) === '[object Object]' || Object.prototype.toString.call(arrData) === '[object Object]') {
                this._buildTreeTable(leftData || rightData, leftData ? "left" : "right");
              }
            } else {
              this._buildTreeTable(arrData, position);
            }
          }
        }
        //如果是个对象，那就一个或者一堆儿子
        else if (Object.prototype.toString.call(oDiffData) === '[object Object]') {
          for (const strKey in oDiffData) {
            this.tDiffDepth = this.tDiffDepth + 1;
            let children = oDiffData[strKey];

            if (Object.prototype.toString.call(children) !== '[object Object]' && !Array.isArray(children)) {
              let leftData = '';
              let rightData = '';

              if (position === "left") {

                leftData = children;
                this.tBodyData = this.tBodyData + `<tr deepth="${this.tDiffDepth}">\r\n<td title=${StringUtils.htmlEscape(strKey)}><div style="margin-left: ${this.tDiffDepth * 20}px">${StringUtils.htmlEscape(strKey)}</div></td>\r\n`;
                this.tBodyData = this.tBodyData + `<td class="deleteColor" title=${StringUtils.htmlEscape(leftData)}>${StringUtils.htmlEscape(leftData)}</td>\r\n`;
                this.tBodyData = this.tBodyData + `<td title=${StringUtils.htmlEscape(rightData)}>${StringUtils.htmlEscape(rightData)}</td>\r\n</tr>\r\n`;
              } else if (position === "right") {

                rightData = children;
                this.tBodyData = this.tBodyData + `<tr deepth="${this.tDiffDepth}">\r\n<td title=${StringUtils.htmlEscape(strKey)}><div style="margin-left: ${this.tDiffDepth * 20}px">${StringUtils.htmlEscape(strKey)}</div></td>\r\n`;
                this.tBodyData = this.tBodyData + `<td title=${StringUtils.htmlEscape(leftData)}>${StringUtils.htmlEscape(leftData)}</td>\r\n`;
                this.tBodyData = this.tBodyData + `<td class="createColor" title=${StringUtils.htmlEscape(rightData)}>${StringUtils.htmlEscape(rightData)}</td>\r\n</tr>\r\n`;
              } else {

                leftData = rightData = children;
                //未改变的 简单数据对
                this.tBodyData = this.tBodyData + `<tr deepth="${this.tDiffDepth}" class="diffNoChange">\r\n<td title=${StringUtils.htmlEscape(strKey)}><div style="margin-left: ${this.tDiffDepth * 20}px">${StringUtils.htmlEscape(strKey)}</div></td>\r\n`;
                this.tBodyData = this.tBodyData + `<td title=${StringUtils.htmlEscape(leftData)}>${StringUtils.htmlEscape(leftData)}</td>\r\n`;
                this.tBodyData = this.tBodyData + `<td title=${StringUtils.htmlEscape(rightData)}>${StringUtils.htmlEscape(rightData)}</td>\r\n</tr>\r\n`;
              }

            } else {
              // 过滤掉left的一层
              if (Object.prototype.toString.call(children) === '[object Object]' && (children.hasOwnProperty("left") || children.hasOwnProperty("right"))) {
                let leftData = children.left;
                let rightData = children.right;

                //简单类型 --可能有修改、创建、删除
                if (Object.prototype.toString.call(leftData) !== '[object Object]' && Object.prototype.toString.call(rightData) === '[object, Object]'
                  && !Array.isArray(leftData) && !Array.isArray(rightData)) {
                  this.tBodyData = this.tBodyData + `<tr deepth="${this.tDiffDepth}">\r\n<td title=${StringUtils.htmlEscape(strKey)}><div style="margin-left: ${this.tDiffDepth * 20}px">${StringUtils.htmlEscape(strKey)}</div></td>\r\n`;
                  let textClass = "modifyColor";
                  if (leftData === undefined) {
                    textClass = "createColor";
                  } else if (rightData === undefined) {
                    textClass = "deleteColor";
                  }
                  this.tBodyData = this.tBodyData + `<td class="${textClass}" title=${StringUtils.htmlEscape(leftData)}>${StringUtils.htmlEscape(leftData)}</td>\r\n`;
                  this.tBodyData = this.tBodyData + `<td class="${textClass}" title=${StringUtils.htmlEscape(rightData)}>${StringUtils.htmlEscape(rightData)}</td>\r\n</tr>\r\n`;
                } else {
                  this.tBodyData = this.tBodyData + `<tr deepth="${this.tDiffDepth}" treeNode=true>\r\n<td title=${StringUtils.htmlEscape(strKey)}><div style="margin-left: ${this.tDiffDepth * 20 - 15}px"><span class="icon-marvelIcon-64" style="cursor: pointer;" onselectstart="return false"></span>${StringUtils.htmlEscape(strKey)}</div></td>\r\n`;
                  this.tBodyData = this.tBodyData + `<td></td>\r\n`;
                  this.tBodyData = this.tBodyData + `<td></td>\r\n</tr>\r\n`;
                  this._buildTreeTable(leftData || rightData, leftData ? "left" : "right");
                }
              } else {
                this.tBodyData = this.tBodyData + `<tr deepth="${this.tDiffDepth}" treeNode=true>\r\n<td><div style="margin-left: ${this.tDiffDepth * 20 - 15}px"><span class="icon-marvelIcon-64" style="cursor: pointer;" onselectstart="return false"></span>${StringUtils.htmlEscape(strKey)}</div></td>\r\n`;
                this.tBodyData = this.tBodyData + `<td></td>\r\n`;
                this.tBodyData = this.tBodyData + `<td></td>\r\n</tr>\r\n`;
                this._buildTreeTable(children, position);
              }

            }
            this.tDiffDepth = this.tDiffDepth - 1;
          }
        }
      },

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      setData: function (oDiffData) {
        this._genTable(oDiffData);
      },

      //#endregion
    }
  }
</script>

<i18n>
  {
  "en": {
  "diff_difference": "Difference",
  "diff_all": "All",
  "diff_create": "Add",
  "diff_modify": "Modify",
  "diff_delete": "Delete",
  "diff_key": "Attribute",
  "diff_device": "Old Data",
  "diff_controller": "New Data"
  },
  "zh": {
  "diff_difference": "差异",
  "diff_all": "全部",
  "diff_create": "新增",
  "diff_modify": "修改",
  "diff_delete": "删除",
  "diff_key": "属性",
  "diff_device": "老数据",
  "diff_controller": "新数据"
  }
  }
</i18n>

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
  .diffContent {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.05);
    position: relative;
    box-sizing: border-box;
    height: 100%;
  }

  .switchArea {
    display: inline-block;
  }

  .switchArea > div {
    display: inline-block;
  }

  .legendText {
    line-height: 15px;
    margin-right: 10px;
  }

  .deleteLegend {
    background-color: #e54545;
    width: 15px;
    height: 15px;
  }

  .modifyLegend {
    background-color: #fb3;
    width: 15px;
    height: 15px;
  }

  .createLegend {
    background-color: #5ccbb1;
    width: 15px;
    height: 15px;
  }

  .deleteColor {
    color: #e54545;
  }

  .modifyColor {
    color: #fb3;
  }

  .createColor {
    color: #5ccbb1;
  }

  .diffContent .treeCont {
    height: calc(100% - 42px);
    width: 100%;
    overflow-y: scroll;
    overflow-x: scroll;
  }

  .tb_table {
    width: 100%;
    border-collapse: unset;
    border: 1px solid #d5d5d5;
  }

  .tb_thead {
    background-color: #ddd;
  }

  .tb_thead th {
    word-break: keep-all;
    max-width: 30%;
    white-space: nowrap;
    margin-left: 10px;
    border: none;
    width: 300px;
    text-align: left;
    font-weight: 200
  }

  .tb_tbody {
    overflow-y: auto;
  }

  .tb_tbody tr {
    margin-left: 10px;
    border-bottom: 1px solid #d5d5d5;
  }

  .tb_tbody td {
    word-break: keep-all;
    white-space: nowrap;
    width: 200px;
    margin-left: 10px;
  }

  .tb_tbody td dev {
    width: 250px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .tb_tbody td:nth-child(2) {
    overflow: hidden;
    max-width: 300px;
    text-overflow: ellipsis;
  }

  .tb_tbody td:last-child {
    overflow: hidden;
    max-width: 300px;
    text-overflow: ellipsis;
    border-right: 1px solid #d5d5d5;
  }
</style>
