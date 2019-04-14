<template>
  <div>
    <div class="pageSwitch">
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

      <div class="item" v-if="pages > 1"
           :class="{ current: curPageIndex == pages }"
           @click.stop="onPageItemClick(pages)">{{pages}}
      </div>

      <div class="item icon-marvelIcon-02" @click.stop="onNextClick"></div>

    </div>
    <div class="select-page">
      <span>{{$t('marvelPaging_to')}}</span>
      <select v-model="curPageIndex"
              @change.stop="onChangePage">
        <option v-for="item in pagesEx" :value="item">{{item}}</option>
      </select>
    </div>

    <div class="text">{{$t('marvelPaging_total')}}{{totalNum}}{{$t('marvelPaging_num')}}</div>
  </div>
</template>

<i18n>
  {
  "en": {
  "marvelPaging_to": "To",
  "marvelPaging_total": "Total",
  "marvelPaging_num": " "
  },
  "zh": {
  "marvelPaging_to": "跳转",
  "marvelPaging_total": "共",
  "marvelPaging_num": "条"
  }
  }
</i18n>

<script>
  export default {
    name: "MarvelPaging",
    props: {
      totalNum: Number,
      pages: Number,
      limit: {
        type: Number,
        default: 7,
        validator: function (value) {
          return value >= 3 && value % 2 == 1;
        }
      }
    },
    data() {
      return {
        pagination: [],
        curPageIndex: 1,
        pagesEx: [],
        limitEx: this.limit - 2
      }
    },
    created() {
      this._preHandleData();
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
          return lastPageNum < this.pages - 1;
        }
        return false;
      }
    },
    methods: {
      _preHandleData() {
        this.curPageIndex = 1;
        this.pagesEx = [];
        this.pagination = [];
        for (let i = 0; i < this.pages; i++) {
          this.pagesEx.push(i + 1);
        }
        if (this.pages > 2) {
          let iStart = 2;
          let iEnd = Math.min(iStart + (this.limitEx - 1), this.pages - 1);
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
        if (this.curPageIndex < this.pages) {
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
            let iEndTarget = Math.min(this.curPageIndex, this.pages - 1);
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
          iEndTarget = Math.min(iEndTarget, this.pages - 1);
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
        this.$emit("onPageChange", this.curPageIndex);
      },
      onChangePage(event) {
        this.afterPageChange();
      },
      resetCurPageIndex() {
        if (this.curPageIndex != 1) {
          this.curPageIndex = 1;
          this.afterPageChange();
        }
      },
      getCurPageIndex() {
        return this.curPageIndex;
      }
    },
    watch: {
      pages() {
        this._preHandleData();
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
    maring: 0 4px;
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

  .text {
    height: 100%;
    float: left;
    line-height: 26px;
    color: #666;
    margin: 0 4px;
    padding: 0 4px;
    font-size: 12px;
  }

  /*region dark theme*/

  .dark .pageSwitch {
  }

  .dark .pageSwitch .item {
    color: #ffffff;
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
    color: #ffffff;
  }

  .dark .text {
    color: #ffffff;
  }

  /*endregion*/

</style>
