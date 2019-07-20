<template>
  <div>
    <div class="pageSwitch" v-if="showPageSwitch">
      <div class="item icon-marvelIcon-04" @click.stop="onPreClick"></div>

      <div class="item"
           :class="{ current: curPageIndex == 1 }"
           @click.stop="onPageItemClick(1)">1
      </div>

      <div class="item" v-show="preMore"
           @click.stop="onPreMoreClick">...
      </div>

      <div class="item" v-for="item in pagination"
           :class="{ current: curPageIndex == item }"
           @click.stop="onPageItemClick(item)">{{ item }}
      </div>

      <div class="item" v-show="backMore"
           @click.stop="onBackMoreClick">...
      </div>

      <div class="item" v-if="pageInner > 1"
           :class="{ current: curPageIndex == pageInner }"
           @click.stop="onPageItemClick(pageInner)">{{pageInner}}
      </div>

      <div class="item icon-marvelIcon-02" @click.stop="onNextClick"></div>

    </div>
    <div class="select-page">
      {{$t('to')}}
      <select v-model="curPageIndex"
              @change.stop="onChangePage">
        <option v-for="item in pagesEx" :value="item">{{item}}</option>
      </select>
    </div>
    <div v-if="showChangeLimit" class="change-limit">
      <select v-model="perPageNumInner"
              @change.stop="onChangePerPageNum">
        <option v-for="item in limitRange" :value="item">{{item}}</option>
      </select>
      <span>{{$t("perPageNum")}}</span>
    </div>
    <div class="text">
      <span v-if="showPageNum">{{$t("show") + pageNumInfo}}</span>
      <span>{{$t("total") + totalNum $t("unit")}}</span>
    </div>
    <div class="text">
      <span v-if="showNumSelected">{{$t("select") + selectedNum + $t("unit")}}</span>
    </div>
  </div>
</template>

<i18n>
  {
  "zh": {
  "to": "跳转",
  "total": "共",
  "unit": "条",
  "show": "显示",
  "perPageNum": "条/页",
  "select": "选中"
  },
  "en": {
  "to": "To",
  "total": "Total:",
  "unit": "",
  "show": "Show:",
  "perPageNum": "Records/Page",
  "select": "selected:"
  }
  }
</i18n>

<script>
  /**
   *  MarvelPaging widget description
   *  @vuedoc
   *  @exports MarvelPaging
   */
  export default {
    name: "MarvelPaging",
    props: {
      totalNum: {
        type: Number,
        default: 0,
        required: false,
      },
      pages: {
        type: Number,
        default: 1,
        required: false,
      },
      perPageNum: {
        type: Number,
        default: undefined,
        required: false,
      },
      showPageSwitch: {
        type: Boolean,
        default: true,
        required: false,
      },
      showPageNum: {
        type: Boolean,
        default: false,
        required: false,
      },
      showNumSelected: {
        type: Boolean,
        default: false,
        required: false,
      },
      limit: {
        type: Number,
        default: 7,
        required: false,
        validator: function (value) {
          return value >= 3 && value % 2 == 1;
        }
      },
      showChangeLimit: {
        type: Boolean,
        default: false,
        required: false,
      },
      limitRange: {
        type: Array,
        default: function () {
          return [10, 20, 50];
        },
        required: false,
      },
    },
    data() {
      return {
        pagination: [],
        curPageIndex: 1,
        pageInner: this.pages,
        pagesEx: [],
        limitEx: this.limit - 2,
        perPageNumInner: this.perPageNum,
        selectedNum: 0,
      }
    },
    created() {
      //#region init

      this._initEx();

      //#endregion
    },
    computed: {
      preMore() {
        if (this.pagination.length) {
          let firstPageNum = this.pagination[0];
          return firstPageNum > 2;
        }
        return false;
      },
      backMore() {
        if (this.pagination.length) {
          let lastPageNum = this.pagination[this.pagination.length - 1];
          return lastPageNum < this.pageInner - 1;
        }
        return false;
      },
      pageNumInfo() {
        let min = Math.min((this.curPageIndex - 1) * this.perPageNumInner + 1, this.totalNum);
        let max = Math.min(this.curPageIndex * this.perPageNumInner, this.totalNum);
        return `${min}-${max}/`;
      }
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this._preHandleData();
      },

      //#endregion

      _preHandleData() {
        this.curPageIndex = 1;
        this.pagesEx = [];
        this.pagination = [];
        for (let i = 0; i < this.pageInner; i++) {
          this.pagesEx.push(i + 1);
        }
        if (this.pageInner > 2) {
          let iStart = 2;
          let iEnd = Math.min(iStart + (this.limitEx - 1), this.pageInner - 1);
          for (let i = iStart; i <= iEnd; i++) {
            this.pagination.push(i);
          }
        }
      },
      onPreClick() {
        if (this.curPageIndex > 1) {
          this.curPageIndex -= 1;
          this.afterPageChange();
        }
      },
      onNextClick() {
        if (this.curPageIndex < this.pageInner) {
          this.curPageIndex += 1;
        }
        this.afterPageChange();
      },
      updatePagination() {
        if (this.pagination.length) {
          let iStart = this.pagination[0];
          let iEnd = this.pagination[this.pagination.length - 1];
          //左移
          if (this.curPageIndex < iStart) {
            let iStartTarget = Math.max(this.curPageIndex, 2);
            let iGap = iStart - iStartTarget;
            this.pagination = this.pagination.map((iNum) => {
              return iNum - iGap;
            });
          }
          //右移
          else if (this.curPageIndex > iEnd) {
            let iEndTarget = Math.min(this.curPageIndex, this.pageInner - 1);
            let iGap = iEndTarget - iEnd;
            this.pagination = this.pagination.map((iNum) => {
              return iNum + iGap;
            });
          }
        }
      },
      onPageItemClick(iPage) {
        if (this.curPageIndex != iPage) {
          this.curPageIndex = iPage;
          this.afterPageChange();
        }
      },
      onPreMoreClick() {
        if (this.pagination.length) {
          let iStart = this.pagination[0];
          let iStartTarget = iStart - this.limitEx;
          iStartTarget = Math.max(iStartTarget, 2);
          let iGap = iStart - iStartTarget;
          this.pagination = this.pagination.map((iNum) => {
            return iNum - iGap;
          });
          //选中最后一个值
          this.curPageIndex = this.pagination[this.pagination.length - 1];
          this.pageChangeEvent();
        }
      },
      onBackMoreClick() {
        if (this.pagination.length) {
          let iEnd = this.pagination[this.pagination.length - 1];
          let iEndTarget = iEnd + this.limitEx;
          iEndTarget = Math.min(iEndTarget, this.pageInner - 1);
          let iGap = iEndTarget - iEnd;
          this.pagination = this.pagination.map((iNum) => {
            return iNum + iGap;
          });
          //选中第一个值
          this.curPageIndex = this.pagination[0];
          this.pageChangeEvent();
        }
      },
      afterPageChange() {
        //更新pagination
        this.updatePagination();
        //event
        this.pageChangeEvent();
      },
      pageChangeEvent() {
        this.callback4OnPageChange(this.curPageIndex, this.perPageNumInner);
      },
      onChangePage(event) {
        this.afterPageChange();
      },
      onChangePerPageNum() {
        this.pageInner = Math.ceil(this.totalNum / this.perPageNumInner);
        this._preHandleData();
        this.callback4OnPerPageNumChange(this.perPageNumInner);
      },

      //#endregion
      //#region callback

      callback4OnPageChange: function (iPage, perPageNum) {
        this.$emit("onPageChange", iPage, perPageNum);
      },
      callback4OnPerPageNumChange: function (perPageNum) {
        this.$emit("onPerPageNumChange", perPageNum);
      },

      //#endregion
      //#region 3rd

      resetCurPageIndex() {
        if (this.curPageIndex != 1) {
          this.curPageIndex = 1;
          this.afterPageChange();
        }
      },
      getCurPageIndex() {
        return this.curPageIndex;
      },
      setCurPage(iPage) {
        this.curPageIndex = iPage;
        //更新pagination
        this.updatePagination();
        //不发布事件
      },
      setSelectedNum: function (selectedNum) {
        this.selectedNum = selectedNum;
      }

      //#endregion
    },
    watch: {
      pages(iNewVal, iOldVal) {
        if (iNewVal !== this.pageInner) {
          this.pageInner = iNewVal;
          this._preHandleData();
        }
      }
    }
  }

</script>

<style scoped>

  .pageSwitch {
    float: left;
  }

  .pageSwitch .item {
    height: 100%;
    float: left;
    line-height: 26px;
    color: #666;
    padding: 0 4px;
    margin: 0 4px;
    font-size: 12px;
    cursor: pointer;
  }

  .pageSwitch .item:hover {
    color: #fff;
    background-color: #60b0ff;
  }

  .pageSwitch .current {
    color: #fff;
    background-color: #3399ff !important;
  }

  .select-page {
    float: left;
    color: #666;
    font-size: 12px;
  }

  .change-limit {
    float: left;
    margin-left: 5px;
    color: #666;
    font-size: 12px;
  }

  .text {
    height: 100%;
    float: left;
    line-height: 22px;
    color: #666;
    margin: 0 4px;
    padding: 0 4px;
    font-size: 12px;
  }

  /*region dark theme*/

  .dark .pageSwitch {
  }

  .dark .pageSwitch .item {
    color: rgba(255, 255, 255, 0.8);
  }

  .dark .pageSwitch .item:hover {
    color: #fff;
    background-color: #60b0ff;
  }

  .dark .pageSwitch .current {
    color: #fff;
    background-color: #3399ff !important;
  }

  .dark .select-page {
    color: rgba(255, 255, 255, 0.8);
  }

  .dark .text {
    color: rgba(255, 255, 255, 0.8);
  }

  .dark .change-limit {
    color: #fff;
  }

  /*endregion*/

</style>
