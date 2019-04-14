<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">表格</div>
    <div class="describe">
      表格控件，用于以表格的形式展示数据
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">表格</div>
    <div class="describe">
      表格
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width:500px;height:300px;">
              <marvel-grid :titles="titles" :rows="rows" :inputMsgs="inputMsgs" gridId="demo"
                           v-on:onClickRow="onClickRow"
                           v-on:onIconClick="onIconClick"
                           v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheck"
                           v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheck"
                           v-on:updateRow="updateRow"
                           v-on:onRowRadionCheckOrUnCheck="onRowRadionCheckOrUnCheck"></marvel-grid>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="js">
&lt;marvel-grid :titles="titles" :rows="rows"&gt;&lt;/marvel-grid&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">表格-2.1</div>
    <div class="describe">
      表格-2
    </div>
    <div class="showArea" style="height: 450px;">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <button @click="setRowColorEx">setRowColor</button>
            <button @click="removeRowColorEx">removeRowColor</button>
            <button @click="getSelectRows4CheckboxEx">getSelectRows4Checkbox</button>
            <button @click="getSelectRow4RadioboxEx">getSelectRow4Radiobox</button>
            <button @click="removeRowEx">removeRow</button>
            <button @click="getRowsEx">getRows</button>
            <button @click="getActiveRowsEx">getActiveRows</button>
            <button @click="resetRowEx">resetRow</button>
            <button @click="disableRowEx">disableRow</button>
            <button @click="enableRowEx">enableRow</button>
            <button @click="enableAllRowsEx">enableAllRows</button>
            <button @click="checkRow">checkRow</button>
            <button @click="disabledDropDownCell">disabledDropDownCell</button>
            <div style="width:800px;height:300px; background-color: #000000">
              <marvel-grid-ex ref="gridEx"
                              :titles="titlesEx"
                              :rows="rowsEx"
                              :limit="15"
                              gridId="demoEx"
                              :editCellFinished="editCellFinishedEx"
                              :canDrag="true"
                              :hasFoot="true"
                              detailRowComponent="CustomerGridComponent"
                              v-on:onClickRow="onClickRowEx"
                              v-on:onIconClick="onIconClickEx"
                              v-on:onClickTextIcon="onClickTextIconEx"
                              v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheckEx"
                              v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheckEx"
                              v-on:onRowRadioCheck="onRowRadioCheckEx"
                              v-on:onOptionChange="onOptionChangeEx"
                              v-on:onClickMultiDropdownItem="onClickMultiDropdownItemEx"
                              v-on:onClickTextCell="onClickTextCell"></marvel-grid-ex>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="js">
&lt;marvel-grid-ex ref="gridEx"
                :titles="titlesEx"
                :rows="rowsEx"
                :limit="15"
                :inputMsgs="inputMsgsEx"
                gridId="demoEx"
                :editCellFinished="editCellFinishedEx"
                :canDrag="true"
                v-on:onClickRow="onClickRowEx"
                v-on:onIconClick="onIconClickEx"
                v-on:onClickTextIcon="onClickTextIconEx"
                v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheckEx"
                v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheckEx"
                v-on:onRowRadioCheck="onRowRadioCheckEx"
                v-on:onOptionChange="onOptionChangeEx"
                v-on:onClickMultiDropdownItem="onClickMultiDropdownItemEx"&gt;&lt;/marvel-grid-ex&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">表格-2.2</div>
    <div class="describe">
      表格-2.2，和表格2.1是同一个控件，这里演示动态分页的功能。
    </div>
    <div class="showArea" style="height: 450px;">
      <marvel-tab :tabItems="tabItems3">
        <marvel-tab-item :isActive="tabItems3[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width:800px;height:300px; background-color: #000000">
              <marvel-grid-ex ref="gridEx2_2"
                              gridId="demoEx2_2"
                              :titles="titlesEx2"
                              :rows="rowsEx2"
                              :dynamicPaging="true"
                              :totalNum="totalNum"
                              :totalPage="totalPage"
                              :canDrag="true"
                              :hasFoot="true"
                              v-on:onPageChange="onPageChange"></marvel-grid-ex>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems3[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="js">
&lt;marvel-grid-ex ref="gridEx"
                :titles="titlesEx"
                :rows="rowsEx"
                :limit="15"
                :inputMsgs="inputMsgsEx"
                gridId="demoEx"
                :editCellFinished="editCellFinishedEx"
                :canDrag="true"
                v-on:onClickRow="onClickRowEx"
                v-on:onIconClick="onIconClickEx"
                v-on:onClickTextIcon="onClickTextIconEx"
                v-on:onTitleCheckOrUncheck="onTitleCheckOrUncheckEx"
                v-on:onRowCheckOrUnCheck="onRowCheckOrUnCheckEx"
                v-on:onRowRadioCheck="onRowRadioCheckEx"
                v-on:onOptionChange="onOptionChangeEx"
                v-on:onClickMultiDropdownItem="onClickMultiDropdownItemEx"&gt;&lt;/marvel-grid-ex&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">表格-3</div>
    <div class="describe">
      表格-3
    </div>
    <div class="showArea" style="height: 450px;">
      <marvel-tab :tabItems="tabItems4">
        <marvel-tab-item :isActive="tabItems4[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="height:300px; background-color: #fafafa;">
              <marvel-grid-m :titles="titles4GridM"
                             :rows="rows4GridM"
                             v-on:onClickMore="onClickMore"></marvel-grid-m>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems4[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="js">

                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--2级 start-->
    <div class="title level2">表格-优先级排列表</div>
    <div class="describe">
      表格-优先级排列表
    </div>
    <div class="showArea" style="height: 450px;">
      <marvel-tab :tabItems="tabItems5">
        <marvel-tab-item :isActive="tabItems5[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="height:300px;">
              <button @click="getPriorityList">getPriorityList</button>
              <marvel-grid-priority :list="list4Priority" col1Title="col1Title" col2Title="col2Title"
              ></marvel-grid-priority>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems5[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="js">

                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
  </div>
</template>

<script>
  import Vue from "vue";
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelHight from "@/walle/component/highlight";
  import MarvelGrid from "@/walle/widget/grid/MarvelGrid";
  import MarvelGridEx from "@/walle/widget/grid/MarvelGridEx";
  import MarvelGridM from "@/walle/widget/grid/MarvelGridM";
  import MarvelGridPriority from "@/walle/widget/grid/MarvelGridPriority";
  import CustomerGridComponent from "./CustomerGridComponent";

  export default {
    name: 'page4Grid',
    components: {
      MarvelGridM,
      MarvelTabItem,
      MarvelTab,
      MarvelGrid,
      MarvelGridEx,
      MarvelGridPriority,
    },
    created() {
      Vue.component(CustomerGridComponent.name, CustomerGridComponent);
    },
    data: function () {
      return {
        //#region document data
        tabItems1: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems2: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems3: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems4: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        tabItems5: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        //#region grid
        titles: [{
          label: "列1",
          width: "25%",
          type: "checkBox"
        }, {
          label: "列2",
          width: "25%"
        }, {
          label: "列3",
          width: "25%"
        }, {
          label: "列4",
          width: "25%"
        }],
        skip: 0,
        limit: 10,
        rows: [],
        inputMsgs: [],
        //#endregion
        //region gridEx
        titlesEx: [{
          label: "",
          key: "checkBox",
          type: "checkBox", //或者为 "checkBox"
          visible: true,
          width: "40px",
        }, {
          label: "name",
          key: "name",
          type: "text",
          visible: true,
          orderBy: true,
          width: "100px"
        }, {
          label: "描述信息",
          key: "description",
          type: "input",
          visible: true,
          orderBy: true,
          width: "200px"
        }, {
          label: "操作",
          key: "operation",
          type: "icon",
          visible: true,
          width: "200px"
        }, {
          label: "链接",
          key: "link",
          type: "textIcon",
          visible: true,
          width: "200px"
        }, {
          label: "配置项",
          key: "config",
          type: "dropdown",
          visible: true,
          width: "200px"
        }, {
          label: "目标网元",
          key: "node",
          type: "multiDropdown",
          visible: true,
          width: "200px"
        }, {
          label: "自定义",
          key: "customer",
          type: "customer",
          visible: true,
          width: "200px"
        }],
        skipEx: 0,
        limitEx: 10,
        rowsEx: [],
        //endregion
        //region gridEx2
        titlesEx2: [{
          label: "",
          key: "checkBox",
          type: "checkBox", //或者为 "checkBox"
          visible: true,
          width: "40px",
        }, {
          label: "name",
          key: "name",
          type: "text",
          visible: true,
          orderBy: true,
          width: "100px"
        }, {
          label: "描述信息",
          key: "description",
          type: "input",
          visible: true,
          orderBy: true,
          width: "200px"
        }, {
          label: "操作",
          key: "operation",
          type: "icon",
          visible: true,
          width: "200px"
        }, {
          label: "链接",
          key: "link",
          type: "textIcon",
          visible: true,
          width: "200px"
        }, {
          label: "配置项",
          key: "config",
          type: "dropdown",
          visible: true,
          width: "200px"
        }, {
          label: "目标网元",
          key: "node",
          type: "multiDropdown",
          visible: true,
          width: "200px"
        }],
        rowsEx2: [],
        totalNum: 1000,
        totalPage: 10,
        //endregion
        //#region gridM
        titles4GridM: ["故障设备", "告警ID"],
        rows4GridM: [],
        //#endregion
        //#region gridPriority
        list4Priority: [
          {
            name: "aaa",
            id: "aaa",
            priority: 1
          },
          {
            name: "bbb",
            id: "bbb",
            priority: 2
          },
          {
            name: "ccc",
            id: "ccc",
            priority: 3
          },
          {
            name: "ddd",
            id: "ddd",
            priority: 4
          },
          {
            name: "eee",
            id: "eee",
            priority: 5
          },
          {
            name: "fff",
            id: "fff",
            priority: 6
          },
          {
            name: "ggg",
            id: "ggg",
            priority: 7
          }
        ]
        //#endregion
        //#endregion
      }
    },
    mounted: function () {
      //#region custom

      //#region grid

      this.rows = [];
      //1.
      for (var i = 0; i < 2; i++) {
        var oRow = [];
        for (var j = 0; j < 4; j++) {
          if (j == 0) {
            var oCell = {
              value: "value" + i,
              type: "checkBox",
              isCheck: false
            };
          }
          else if (j == 1) {
            var oCell = {
              value: "value" + i,
              type: "input"
            };
            this.inputMsgs.push(oCell.value);
          }
          else {
            var oCell = {
              value: "value" + i,
              type: "text"
            };
          }
          oRow.push(oCell);
        }
        this.rows.push(oRow);
      }
      //2.
      for (var i = 0; i < 2; i++) {
        var oRow = [];
        for (var j = 0; j < 4; j++) {
          if (j == 0) {
            var oCell = {
              value: "value" + i,
              type: "checkBox",
              isCheck: false
            };
          }
          else {
            var oCell = {
              value: [{
                value: "icon-location2",
              }, {
                value: "icon-location2",
              }],
              type: "icon"
            };
          }

          oRow.push(oCell);
        }
        this.rows.push(oRow);
      }
      //3.
      for (var i = 0; i < 2; i++) {
        var oRow = [];
        for (var j = 0; j < 4; j++) {
          if (j == 0) {
            var oCell = {
              value: "value" + i,
              type: "checkBox",
              isCheck: false
            };
          }
          else {
            var oCell = {
              value: "icon-podcast",
              color: "#28aad3",
              label: "shit",
              type: "textIcon"
            };
          }

          oRow.push(oCell);
        }
        this.rows.push(oRow);
      }
      //#endregion

      //region gridEx
      this.rowsEx = [];
      for (let i = 0; i < 1000; i++) {
        let oRow = [];
        //key:id用于标识这一列的唯一性，在界面上不会绘制出来
        oRow.push({
          key: "id",
          value: i
        });
        oRow.push({
          key: "checkBox",
          value: "",
          checked: i == 0 ? true : false,
          disabled: i % 4 == 0 ? true : false
        });
        oRow.push({
          key: "name",
          value: "name_cell" + i
        });
        oRow.push({
          key: "description",
          value: "input_cell" + i
        });
        oRow.push({
          key: "operation",
          value: [{
            value: "icon-location2",
            color: "red",
            label: "lallalala"
          }, {
            value: "icon-location2",
            label: "lallalalasdfasfsfa"
          }]
        });
        oRow.push({
          key: "link",
          value: "icon-podcast",
          color: "#28aad3",
          label: "shit",
        });
        oRow.push({
          key: "config",
          value: [{
            value: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
          }, {
            value: "B",
            selected: true
          }, {
            value: "C"
          }],
        });
        oRow.push({
          key: "node",
          value: [{
            value: "Node1",
            selected: true,
          }, {
            value: "Node2",
            selected: true
          }, {
            value: "Node3"
          }, {
            value: "Node4"
          }],
        });
        oRow.push({
          key: "customer",
          type: "text",
          value: "自定义"
        });
        this.rowsEx.push(oRow);
      }
      //endregion

      //region gridEx2.2
      this._initGridEx2_2(1);
      //endregion

      //#region gridM

      for (var i = 0; i < 100; i++) {
        var oRow = {
          item0: "#ff0022",
          item1: "ZY201711081707" + i,
          item2: "Process",
          item3: "SDN9900" + i,
          item4: "102/205/220/300/299/2876",
          item5: "2017-11-08 17:07",
        };
        this.rows4GridM.push(oRow);
      }

      //#endregion

      //#endregion
    },
    methods: {
      //#region inner

      //#region grid

      onClickRow: function (oRow) {
        console.log(oRow);
      },
      onIconClick: function (oRow, oCell) {
        console.log(oRow);
        console.log(oCell);
      },
      onTitleCheckOrUncheck: function (oRow) {
        console.log("onTitleCheckOrUncheck" + oRow);
      },
      onRowCheckOrUnCheck: function (oRow) {
        console.log("onRowCheckOrUnCheck");
      },
      updateRow: function (oRow, oCallBack) {
        console.log("updateRow");
        oCallBack(true);
      },
      onRowRadionCheckOrUnCheck: function (oRow) {
        console.log(oRow);
      },

      //#endregion

      //region gridEx

      //region callback
      editCellFinishedEx: function (oRow, oCell, oOldVal, oNewVal, oAfterCallback) {
        console.log("editCellFinishedEx:" + "oldValue: " + oOldVal + ",oNewVal: " + oNewVal);
        //这里对oNewVal进行校验，如果校验通过那么就调用oAfterCallback
        let bValidate = true;
        if (bValidate) {
          oAfterCallback();
        }
      },
      onClickRowEx: function (oRow) {
        console.log("onClickRowEx");
      },
      onIconClickEx: function (oRow, oCell, oIcon) {
        console.log("onIconClickEx");
      },
      onClickTextIconEx: function (oRow, oCell) {
        console.log("onClickTextIconEx");
      },
      onTitleCheckOrUncheckEx: function (isChecked) {
        console.log("onTitleCheckOrUncheck" + isChecked);
      },
      onRowCheckOrUnCheckEx: function (oRow, isChecked) {
        let strId = this.$refs.gridEx.getCellValueByKey("id", oRow);
        if (strId == 1) {
          this.$refs.gridEx.setRowColor(strId, true);
        }
        console.log("onRowCheckOrUnCheck");
      },
      onRowRadioCheckEx: function (oRow) {
        console.log(oRow);
      },
      onOptionChangeEx: function (oRow, oCell, srtOldValue, strNewValue) {
        console.log("onOptionChangeEx");
        if (oCell.key == "customer") {
          oCell.type = "text";
          oCell.value = strNewValue + "xxxxxsss";
        }
      },
      onClickMultiDropdownItemEx: function (oRow, oCell, oItem) {
        console.log("onClickMultiDropdownItemEx");
      },
      onClickTextCell: function (oRow, oCell) {
        if (oCell.key == "customer") {
          oCell.type = "dropdown";
          oCell.value = [{
            value: "A",
          }, {
            value: "B",
            selected: true
          }, {
            value: "C",
          }];
        }
      },
      //endregion
      //region test
      setRowColorEx: function () {
        this.$refs.gridEx.setRowColor(0);
      },
      removeRowColorEx: function () {
        this.$refs.gridEx.removeRowColor(0);
      },
      getSelectRows4CheckboxEx: function () {
        let arrRows = this.$refs.gridEx.getSelectRows4Checkbox();
        console.log(arrRows);
      },
      getSelectRow4RadioboxEx: function () {
        let oRow = this.$refs.gridEx.getSelectRow4Radiobox();
        console.log(oRow);
      },
      removeRowEx: function () {
        this.$refs.gridEx.removeRow(0);
      },
      getRowsEx: function () {
        let arrRows = this.$refs.gridEx.getRows();
        console.log(arrRows);
      },
      getActiveRowsEx: function () {
        let arrRow = this.$refs.gridEx.getActiveRows();
        console.log(arrRow);
      },
      resetRowEx: function () {
        let arrRow = this.$refs.gridEx.getRows();
        arrRow.splice(arrRow.length - 1);
        this.rowsEx = arrRow;
      },
      disableRowEx: function () {
        this.$refs.gridEx.disableRow(1);
      },
      enableRowEx: function () {
        this.$refs.gridEx.enableRow(1);
      },
      enableAllRowsEx: function () {
        this.$refs.gridEx.enableAllRows();
      },
      checkRow: function () {
        this.$refs.gridEx.checkOrUnCheckRow4CheckBox(3, true);
      },
      disabledDropDownCell: function () {
        this.$refs.gridEx.disabledDropDownCell(4, "config", true);
      },
      //endregion

      //endregion

      //region gridEx2.2
      _initGridEx2_2: function (iPageIndex) {
        this.rowsEx2 = [];
        let iStart = (iPageIndex - 1) * 100;
        let iEnd = iPageIndex * 100;
        for (let i = iStart; i < iEnd; i++) {
          let oRow = [];
          //key:id用于标识这一列的唯一性，在界面上不会绘制出来
          oRow.push({
            key: "id",
            value: i
          });
          oRow.push({
            key: "checkBox",
            value: "",
            checked: i == 0 ? true : false
          });
          oRow.push({
            key: "name",
            value: "name_cell" + i
          });
          oRow.push({
            key: "description",
            value: "input_cell" + i
          });
          oRow.push({
            key: "operation",
            value: [{
              value: "icon-location2",
              color: "red",
              label: "lallalala"
            }, {
              value: "icon-location2",
              label: "lallalala"
            }]
          });
          oRow.push({
            key: "link",
            value: "icon-podcast",
            color: "#28aad3",
            label: "shit",
          });
          oRow.push({
            key: "config",
            value: [{
              value: "A",
            }, {
              value: "B",
              selected: true
            }, {
              value: "C"
            }],
          });
          oRow.push({
            key: "node",
            value: [{
              value: "Node1",
              selected: true,
            }, {
              value: "Node2",
              selected: true
            }, {
              value: "Node3"
            }, {
              value: "Node4"
            }],
          });
          this.rowsEx2.push(oRow);
        }
      },
      onPageChange: function (iPageIndex) {
        setTimeout(() => {
          this._initGridEx2_2(iPageIndex);
        }, 1000);
      },
      //endregion

      //#region gridM

      onClickMore: function (oRow) {
        console.log(oRow);
      },

      //#endregion

      //#region gridPriority

      getPriorityList: function () {
        console.log(this.list4Priority);
      }

      //#endregion

      //#endregion
      //#region callback

      //#endregion
      //#region 3rd

      //#endregion
    }
  }
</script>

<style scoped>
  /*document fix style start*/
  .widgetShowSession {
    padding: 20px 100px;
    width: 100%;
    box-sizing: border-box;
  }

  .title {
    color: #4d4d4d;
  }

  .level1 {
    font-size: 32px;
    line-height: 54px;
  }

  .describe {
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }

  .codeArea {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: auto;
  }

  .codeArea pre, .codeArea code {
    padding: 0;
    margin: 0;
    min-width: 100%;
    float: left;
  }

  .showAreaInner {
    padding-top: 36px;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
  }

  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    width: 100%;
    height: 400px;
  }

  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/

  /*region dark theme*/

  .dark .title {
    color: #ffffff;
  }

  .dark .describe {
    color: #8b90b3;
  }

  /*endregion*/
</style>
