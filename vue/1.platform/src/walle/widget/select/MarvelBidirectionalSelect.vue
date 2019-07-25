<template>
  <div class="bidirectionalSelectWrapper">
    <div class="leftPart">
      <div class="partLabel">{{options.leftTitle}}</div>
      <div class="partOptionWrapper">
        <div class="partOptionSelectAll icon-stack"
             v-on:click="selectAllLeft">{{isItemAllSelectInLeft}}
        </div>
        <div class="partOptions">
          <div v-for="(item, index) in options.items"
               class="partOptionItem" :class="{show:item.belongTo=='left'}">
            <div class="check">
              <div class="checkBoxWrapper">
                <div class="checkBox">
                  <input type="checkbox" :id="getId('left', index)"
                         v-bind:value="item.label" v-model="item.bIsCheckInLeft"
                         v-on:change="onItemSelectStatusChange(item)"/>
                  <label v-bind:for="getId('left', index)"></label>
                </div>
                <label v-bind:for="getId('left', index)" class="checkBoxLabel"
                       v-bind:title="item.label">{{ item.label }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="centerPart">
      <div class="btnWrapper">
        <div class="switchBtn btnGoRight icon-marvelIcon-02"
             v-on:click="selectToRight"
             :class="{active:hasItemBeenSelectedInLeft}"></div>
        <div class="switchBtn btnGoLeft icon-marvelIcon-04"
             v-on:click="selectToLeft"
             :class="{active:hasItemBeenSelectedInRight}"></div>
      </div>
    </div>
    <div class="rightPart">
      <div class="partLabel">{{options.rightTitle}}</div>
      <div class="partOptionWrapper">
        <div class="partOptionSelectAll icon-stack"
             v-on:click="selectAllRight">{{isItemAllSelectInRight}}
        </div>
        <div class="partOptions">
          <div v-for="(item, index) in options.items"
               class="partOptionItem" :class="{show:item.belongTo=='right'}">
            <div class="check">
              <div class="checkBoxWrapper">
                <div class="checkBox">
                  <input type="checkbox" :id="getId('right', index)"
                         v-bind:value="item.label" v-model="item.bIsCheckInRight"
                         v-on:change="onItemSelectStatusChange(item)"/>
                  <label v-bind:for="getId('right', index)"></label>
                </div>
                <label v-bind:for="getId('right', index)" class="checkBoxLabel"
                       v-bind:title="item.label">{{ item.label }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
  {
  "zh": {
  "selectAll": "全选",
  "selectCancel": "取消全选"
  },
  "en": {
  "selectAll": "Select All",
  "selectCancel": "Select Cancel"
  }
  }
</i18n>

<script>
  /**
   *  MarvelBidirectionalSelect widget description
   *  @vuedoc
   *  @exports MarvelBidirectionalSelect
   */
  export default {
    name: 'MarvelBidirectionalSelect',
    props: {
      options: {
        type: Object,
        default: undefined,
        required: true,
      }
    },
    data: function () {
      return {
        bIsItemAllSelectInLeft: false,
        bIsItemAllSelectInRight: false
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    computed: {
      hasItemBeenSelectedInLeft: function () {
        var bHasItemSelect = false;
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          var bIsChecked = oItem.bIsCheckInLeft;
          if (bIsChecked && oItem.belongTo == "left") {
            bHasItemSelect = true;
          }
        }
        return bHasItemSelect;
      },
      hasItemBeenSelectedInRight: function () {
        var bHasItemSelect = false;
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          var bIsChecked = oItem.bIsCheckInRight;
          if (bIsChecked && oItem.belongTo == "right") {
            bHasItemSelect = true;
          }
        }
        return bHasItemSelect;
      },
      isItemAllSelectInLeft: function () {
        var bIsItemAllSelect = true;

        //is empty
        var bIsEmpty = true;
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          if (oItem.belongTo == "left") {
            bIsEmpty = false;
            break;
          }
        }

        if (bIsEmpty) {
          bIsItemAllSelect = false;
        } else {
          for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
            var oItem = this.options.items[iIndex];
            var bIsChecked = oItem.bIsCheckInLeft;
            if (!bIsChecked && oItem.belongTo == "left") {
              bIsItemAllSelect = false;
            }
          }
        }

        this.bIsItemAllSelectInLeft = bIsItemAllSelect;
        if (bIsItemAllSelect) {
          return this.$t("selectCancel");
        } else {
          return this.$t("selectAll");
        }
      },
      isItemAllSelectInRight: function () {
        var bIsItemAllSelect = true;

        //is empty
        var bIsEmpty = true;
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          if (oItem.belongTo == "right") {
            bIsEmpty = false;
            break;
          }
        }

        if (bIsEmpty) {
          bIsItemAllSelect = false;
        } else {
          for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
            var oItem = this.options.items[iIndex];
            var bIsChecked = oItem.bIsCheckInRight;
            if (!bIsChecked && oItem.belongTo == "right") {
              bIsItemAllSelect = false;
            }
          }
        }

        this.bIsItemAllSelectInRight = bIsItemAllSelect;
        if (bIsItemAllSelect) {
          return this.$t("selectCancel");
        } else {
          return this.$t("selectAll");
        }
      }
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          if (!oItem.hasOwnProperty("belongTo")) {
            this.$set(oItem, "belongTo", "left");
          }
          if (!oItem.hasOwnProperty("bIsCheckInLeft")) {
            this.$set(oItem, "bIsCheckInLeft", false);
          }
          if (!oItem.hasOwnProperty("bIsCheckInRight")) {
            this.$set(oItem, "bIsCheckInRight", false);
          }
        }
      },

      //#endregion

      getId: function (str, index) {
        return this.options.id + str + index;
      },
      selectAllLeft: function () {
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          if (oItem.belongTo == "left") {
            if (!this.bIsItemAllSelectInLeft) {
              oItem.bIsCheckInLeft = true;
            } else {
              oItem.bIsCheckInLeft = false;
            }
          }
        }
      },
      selectAllRight: function () {
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          if (oItem.belongTo == "right") {
            if (!this.bIsItemAllSelectInRight) {
              oItem.bIsCheckInRight = true;
            } else {
              oItem.bIsCheckInRight = false;
            }
          }
        }
      },
      selectToRight: function () {
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          var bIsChecked = oItem.bIsCheckInLeft;
          if (bIsChecked) {
            oItem.belongTo = "right";
            oItem.bIsCheckInLeft = false;
            oItem.bIsCheckInRight = true;
          }
        }
      },
      selectToLeft: function () {
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          var bIsChecked = oItem.bIsCheckInRight;
          if (bIsChecked) {
            oItem.belongTo = "left";
            oItem.bIsCheckInRight = false;
            oItem.bIsCheckInLeft = true;
          }
        }
      },

      //#endregion
      //#region callback

      onItemSelectStatusChange: function (oItem) {
        this.$emit('onItemSelectStatusChange', oItem);
      },

      //#endregion
      //#region 3rd

      getItemsInLeft: function () {
        var arrLeftItems = [];
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          if (oItem.belongTo == "left") {
            arrLeftItems.push(oItem);
          }
        }

        return arrLeftItems;
      },
      getItemsInRight: function () {
        var arrRightItems = [];
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          if (oItem.belongTo == "right") {
            arrRightItems.push(oItem);
          }
        }

        return arrRightItems;
      },
      getSelectItemsInLeft: function () {
        var arrLeftItems = [];
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          if (oItem.belongTo == "left" && oItem.bIsCheckInLeft) {
            arrLeftItems.push(oItem);
          }
        }

        return arrLeftItems;
      },
      getSelectItemsInRight: function () {
        var arrRightItems = [];
        for (var iIndex = 0; iIndex < this.options.items.length; iIndex++) {
          var oItem = this.options.items[iIndex];
          if (oItem.belongTo == "right" && oItem.bIsCheckInRight) {
            arrRightItems.push(oItem);
          }
        }

        return arrRightItems;
      }

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
  .bidirectionalSelectWrapper {
    width: 100%;
    height: 100%;
  }

  .bidirectionalSelectWrapper .leftPart {
    width: calc(50% - 50px);
    height: 100%;
    float: left;
  }

  .bidirectionalSelectWrapper .rightPart {
    width: calc(50% - 50px);
    height: 100%;
    float: left;
  }

  .bidirectionalSelectWrapper .partLabel {
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #333333;
  }

  .bidirectionalSelectWrapper .partOptionWrapper {
    height: calc(100% - 32px);
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    background-color: #ffffff;
  }

  .bidirectionalSelectWrapper .partOptionWrapper .partOptionSelectAll {
    height: 28px;
    border-bottom: 1px solid #d5d5d5;
    box-sizing: border-box;
    line-height: 32px;
    font-size: 14px;
    color: #666;
    text-align: center;
    cursor: pointer;
  }

  .bidirectionalSelectWrapper .partOptionWrapper .partOptionSelectAll:before {
    margin-right: 6px;
    color: #3399ff;
  }

  .bidirectionalSelectWrapper .partOptionWrapper .partOptionSelectAll:hover {
    color: #3399ff;
  }

  .bidirectionalSelectWrapper .partOptionWrapper .partOptions {
    height: calc(100% - 28px);
    overflow: auto;
  }

  .bidirectionalSelectWrapper .partOptionWrapper .partOptions .partOptionItem {
    height: 28px;
    border-bottom: 1px dashed #d5d5d5;
    box-sizing: border-box;
    padding: 4px 10px 0px 10px;
    display: none;
  }

  .bidirectionalSelectWrapper .partOptionWrapper .partOptions .show {
    display: block;
  }

  .bidirectionalSelectWrapper .partOptionWrapper .partOptions .partOptionItem:hover {
    background-color: #f0f0f0;
  }

  .bidirectionalSelectWrapper .partOptionWrapper .partOptions .partOptionItem .check {
  }

  .bidirectionalSelectWrapper .centerPart {
    width: 100px;
    height: calc(100% - 32px);
    float: left;
    position: relative;
    top: 32px;
  }

  .bidirectionalSelectWrapper .centerPart .btnWrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -30px;
    margin-top: -42px;
  }

  .bidirectionalSelectWrapper .centerPart .btnWrapper .switchBtn {
    width: 60px;
    height: 32px;
    background-color: #ccc;
    border-radius: 2px;
    color: #666;
    font-size: 16px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
    margin-bottom: 20px;
    pointer-events: none;
  }

  .bidirectionalSelectWrapper .centerPart .btnWrapper .active {
    background-color: #3399ff;
    color: #FFFFFF;
    pointer-events: auto;
  }

  .bidirectionalSelectWrapper .centerPart .btnWrapper .switchBtn:hover {
    background-color: #60b0ff;
  }

  .bidirectionalSelectWrapper .centerPart .btnWrapper .switchBtn:last-child {
    margin-bottom: 0px;
  }

  .bidirectionalSelectWrapper .centerPart .btnWrapper .switchBtnUnClickable {
    background-color: #ccc;
    pointer-events: none;
  }

  /*region dark theme*/

  .dark .bidirectionalSelectWrapper {
  }

  .dark .bidirectionalSelectWrapper .leftPart {
  }

  .dark .bidirectionalSelectWrapper .rightPart {
  }

  .dark .bidirectionalSelectWrapper .partLabel {
    color: #ffffff;
  }

  .dark .bidirectionalSelectWrapper .partOptionWrapper {
    border: 1px solid #8b90b3;
    background-color: #1e1f36;
  }

  .dark .bidirectionalSelectWrapper .partOptionWrapper .partOptionSelectAll {
    border-bottom: 1px solid #8b90b3;
    color: #ffffff;
  }

  .dark .bidirectionalSelectWrapper .partOptionWrapper .partOptionSelectAll:before {
    color: #3dcca6;
  }

  .dark .bidirectionalSelectWrapper .partOptionWrapper .partOptionSelectAll:hover {
    color: #3dcca6;
  }

  .dark .bidirectionalSelectWrapper .partOptionWrapper .partOptions {
  }

  .dark .bidirectionalSelectWrapper .partOptionWrapper .partOptions .partOptionItem {
    border-bottom: 1px dashed #8b90b3;
  }

  .dark .bidirectionalSelectWrapper .partOptionWrapper .partOptions .show {
  }

  .dark .bidirectionalSelectWrapper .partOptionWrapper .partOptions .partOptionItem:hover {
    background-color: #393b70;
  }

  .dark .bidirectionalSelectWrapper .partOptionWrapper .partOptions .partOptionItem .check {
  }

  .dark .bidirectionalSelectWrapper .centerPart {
  }

  .dark .bidirectionalSelectWrapper .centerPart .btnWrapper {
  }

  .dark .bidirectionalSelectWrapper .centerPart .btnWrapper .switchBtn {
    background-color: #252b43;
    color: #666;
  }

  .dark .bidirectionalSelectWrapper .centerPart .btnWrapper .active {
    background-color: #3dcca6;
    color: #FFFFFF;
  }

  .dark .bidirectionalSelectWrapper .centerPart .btnWrapper .switchBtn:hover {
    background-color: #45e0b7;
  }

  .dark .bidirectionalSelectWrapper .centerPart .btnWrapper .switchBtn:last-child {
  }

  .dark .bidirectionalSelectWrapper .centerPart .btnWrapper .switchBtnUnClickable {
    background-color: #252b43;
  }

  /*endregion*/

  /*region check*/
  * {
    box-sizing: border-box
  }

  .checkBoxWrapper {
    display: inline-block;
    width: 100%;
  }

  .dpn {
    display: none;
  }

  .checkBoxWrapper .checkBox {
    width: 16px;
    height: 16px;
    position: relative;
    float: left;
  }

  .checkBoxWrapper .checkBox input[type=checkbox] {
    /*pos*/
    margin: 0;
    padding: 0;
    /*style*/
    visibility: hidden;
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:checked + label:after {
    /*pos*/
    /*style*/
    opacity: 1;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:checked + label {
    /*pos*/
    /*style*/
    background: #3399ff;
    border: 1px solid rgba(0, 0, 0, 0);
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:disabled + label:after {
    /*pos*/
    /*style*/
    border: 2px solid #999999;
    border-top: none;
    border-right: none;
  }

  .checkBoxWrapper .checkBox input[type=checkbox]:disabled + label {
    /*pos*/
    /*style*/
    border: 1px solid #999999;
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .checkBoxWrapper .checkBox label {
    /*pos*/
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    /*style*/
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 2px;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  .checkBoxWrapper .checkBox label:hover {
    border: 1px solid #60b0ff;
  }

  .checkBoxWrapper .checkBox label:after {
    /*pos*/
    position: absolute;
    width: 7px;
    height: 4px;
    top: 3px;
    left: 2px;
    /*style*/
    opacity: 0;
    content: '';
    background: transparent;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .checkBoxWrapper .checkBoxLabel {
    margin: 0 0 0 5px;
    width: calc(100% - 21px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0;
    float: left;
    font-size: 14px;
    line-height: 16px;
    color: #666666;
    cursor: pointer;
  }

  /*region dark theme*/
  .dark .checkBoxLabel {
    color: #8b90b3;
  }

  /*endregion*/

  /*endregion*/
</style>
