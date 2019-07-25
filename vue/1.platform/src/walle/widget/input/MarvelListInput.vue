<template>
  <div class="listInputWrapper">
    <div>
      <div style="margin: 2px; padding: 2px;" v-for="(item, index) in tableData"
           :key="item.id" v-show="index >= 5*(currentPage -1) && index < 5*currentPage">
        <div style="display: inline-block; width: calc(100% - 25px)">
          <marvel-input :ref="item.id"
                        :status="item.error"
                        :placeHolder="placeHolder" @onBlur="_onValueChange">
          </marvel-input>
        </div>
        <div style="display: inline-block; width: 20px" class="button-style icon-minus"
             @click="_deleteOneRow(index)"></div>
      </div>
      <div class="errorTip icon-notification" v-show="errMsg != ''" :title="errMsg">{{ errMsg }}</div>
    </div>
    <div style="padding: 5px;clear: both;position: absolute;bottom: 0;width: 100%; box-sizing: border-box;">
      <div style="display: inline-block; float: right;">
        <div class="button-style icon-marvelIcon-04" @click="_paggingChange(-1)" style="float: left;"></div>
        <div class="text-style" style="float: left;">{{currentPage}}/{{Math.ceil((totalNum)/5)}}</div>
        <div class="button-style icon-marvelIcon-02" @click="_paggingChange(1)" style="float: left;"></div>
        <div class="text-style" style="float: left;margin-left: 10px">Total:{{totalNum}}</div>
      </div>
      <div style="display: inline-block; float: left;">
        <span class="button-style icon-plus" @click="_addNewRow()" style="margin-right: 15px"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import MarvelInput from "./MarvelInput";
  import StringUtilsEx from "../../component/str";

  /**
   *  MarvelListInput widget description
   *  @vuedoc
   *  @exports MarvelListInput
   */
  export default {
    name: 'MarvelListInput',
    components: {MarvelInput},
    data: function () {
      return {
        placeHolder: "",
        tableData: [],
        currentPage: 1,
        totalNum: 1,
        errMsg: ''
      }
    },
    methods: {
      //#region inner

      _genListInputOptions: function (oOriginData) {
        var newData = [];
        for (var i = 0; i < oOriginData.length; i++) {
          oOriginData[i].id = StringUtilsEx.uuid();
          newData.push(oOriginData[i]);
        }

        return newData;
      },
      _onValueChange: function () {
        this.callback4OnValueChange();
      },
      _addNewRow: function () {
        let newRow = {
          id: StringUtilsEx.uuid(),
          value: ""
        };
        this.tableData.push(newRow);
        this.totalNum = this.tableData.length;
        this.currentPage || (this.currentPage = 1);
        this.$nextTick(function () {
          this.callback4OnValueChange();
        });
      },
      _deleteOneRow: function (rowId) {
        this.tableData.splice(rowId, 1);
        this.totalNum = this.tableData.length;
        this.currentPage > Math.ceil(this.totalNum / 5) && (this.currentPage = Math.ceil(this.totalNum / 5));
        this.callback4OnValueChange();
      },
      _paggingChange: function (value) {
        this.currentPage += value;
        this.currentPage < 1 && (this.currentPage = 1);
        this.currentPage > Math.ceil(this.totalNum / 5) && (this.currentPage = Math.ceil(this.totalNum / 5));
      },

      //#endregion
      //#region callback

      callback4OnValueChange: function () {
        this.$emit("onValueChange");
      },

      //#endregion
      //#region 3rd

      init: function (oData) {
        this.placeHolder = oData.placeHolder;
        this.setListInputMsg(JSON.parse(JSON.stringify(oData.listInputItems)));
      },
      setListInputMsg: function (arrListInputItems) {
        this.tableData = this._genListInputOptions(arrListInputItems);
        this.$nextTick(function () {
          for (const item of this.tableData) {
            this.$refs[item.id][0].setInputMsg(item.value);
          }
          this.totalNum = this.tableData.length;
        });
      },
      getListInputMsg: function () {
        let data = [];
        for (const item of this.tableData) {
          data.push({
            value: this.$refs[item.id][0].getInputMsg()
          });
        }
        return data;
      },
      setErrStatus: function (arrTargetIndex, strErrTip) {
        //清除error提示
        this.clearErrorStatus();
        //设置error提示
        this.errMsg = strErrTip;
        for (var i = 0; i < arrTargetIndex.length; i++) {
          var iTargetIndex = parseInt(arrTargetIndex[i]);
          this.tableData[iTargetIndex].error = 'errorNoTip';
        }
      },
      clearErrorStatus: function () {
        this.errMsg = '';
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].error = '';
        }
      },

      //#endregion
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

  .listInputWrapper {
    width: 100%;
    position: relative;
    display: inline-block;
    height: 235px;
    border: 1px solid #e6e6e6;
  }

  .button-style {
    color: #b6b6b6;
    cursor: pointer;
    line-height: 20px;
  }

  .text-style {
    color: #b6b6b6;
    user-select: none;
  }

  .errorTip {
    color: #ff4c4c;
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    margin-left: 5px;
  }

  .errorTip:before {
    margin-right: 10px;
  }

  .errorNoTip .errorTip {
    display: block;
  }

</style>
