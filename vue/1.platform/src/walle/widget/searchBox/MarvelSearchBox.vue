<template>
  <div class="search_dropDown" :class="{onlySearch:!dropDownItems.length>0}">
    <div class="dropdownArea" v-if="dropDownItems.length>0">
      <!-- dropdown_button start-->
      <marvel-drop-down-button ref="ref1" :dropDownItems="dropDownItems" :width="width"
                               :maxHeight="maxHeight"></marvel-drop-down-button>
      <!-- dropdown_button end-->
    </div>
    <div class="searchArea">
      <!-- search start-->
      <div class="searchWrapper">
        <input type="text" class="searchInput" v-bind:placeholder="placeholder" v-model.trim="inputVal" @keyup.enter="search">
        <div class="searchBtn icon-marvelIcon-19" v-on:click="search"></div>
        <div class="deleBtn icon-marvelIcon-20" v-bind:class="{dpn: inputVal == ''}" @click="clear"></div>
      </div>
      <!-- search end-->
    </div>
  </div>
</template>

<script>
  import MarvelDropDownButton from '../button/MarvelDropDownButton.vue';
  import MarvelSearch from './MarvelSearch.vue';

  /**
   *  MarvelSearch widget description
   *  @vuedoc
   *  @exports MarvelSearch
   */
  export default {
    components: {
      MarvelDropDownButton,
      MarvelSearch
    },
    name: "MarvelSearch",
    data: function () {
      return {
        dropDownItems: [],
        inputVal: ''
      }
    },
    props: {
      placeholder: {
        type: String,
        default: "",
        required: false,
      },
      selectItems: {
        type: Array,
        default: function () {
          return [];
        },
        required: false,
      },
      width: {
        type: String,
        default: "",
        required: false,
      },
      maxHeight: {
        type: String,
        default: "",
        required: false,
      },
    },
    computed: {},
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        let selectLabel = "";
        for (var i = 0, len = this.selectItems.length; i < len; i++) {
          if (this.selectItems[i].selected === true) {
            this.selectItems[i].active = true;
            break;
          }
        }
        this.dropDownItems = this.selectItems;
      },

      //#endregion

      search: function (strSearchVal) {
        let searchKey = this.$refs.ref1.getSelectItem();
        let searchKeyObj = this.$refs.ref1.getSelectItemObj();
        if (strSearchVal == undefined) {
          strSearchVal = ""
        }
        this.callback4Search(searchKey, strSearchVal, searchKeyObj);
      },

      //#endregion
      //#region callback

      callback4Search: function (searchKey, strSearchVal, searchKeyObj) {
        this.$emit("search", searchKey, strSearchVal, searchKeyObj);
      },

      //#endregion
      //#region 3rd

      clear: function () {
        this.inputVal = "";
        this.$emit("onClear", this.inputVal);
      }

      //#endregion
    },
    watch: {
      selectItems: {
        handler: function () {
          this._initEx();
        },
        deep: true
      }
    },
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
  /*search dropDown*/
  .search_dropDown {
    height: 32px;
    display: table;
    position: relative;
    white-space: nowrap;
    border: 1px solid #cccccc;
    box-sizing: border-box;
    width: 100%;
  }

  .search_dropDown:hover {
    border: 1px solid #3399ff;
  }

  .search_dropDown .dropdownArea {
    display: inline-block;
    height: 30px;
    float: left;
    position: relative;
    top: -1px;
    left: -1px;
  }

  .search_dropDown .searchArea {
    display: table-cell;
    height: 30px;
    width: 100%;
  }

  .searchWrapper {
    height: 30px;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    background-color: transparent;
  }

  .searchWrapper .searchInput {
    height: 100%;
    border: none;
    width: 100%;
    float: left;
    padding: 0 70px 0 10px;
    outline: none;
    line-height: 30px;
    color: #333;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: 2px;
    background-color: transparent;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .searchWrapper .searchBtn {
    position: absolute;
    height: 30px;
    width: 40px;
    top: 0px;
    right: 0px;
    color: #777;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    cursor: pointer;
  }

  .searchWrapper .searchBtn:hover {
    color: #3399ff !important;
  }

  .searchWrapper .deleBtn {
    position: absolute;
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: #999;
    top: 3px;
    right: 40px;
    border-right: 1px solid #ccc;
    cursor: pointer;
  }

  .searchWrapper .deleBtn:hover {
    color: #3399ff;
  }

  .dpn {
    display: none
  }

  /*region dark theme*/

  .dark .search_dropDown {
    border: 1px solid #8b90b3;
  }

  .dark .search_dropDown:hover {
    border: 1px solid #3dcca6;
  }

  .dark .searchWrapper .searchInput {
    border: 1px solid #8b90b3;
    color: #ffffff;
  }

  .dark .searchWrapper .searchInput:hover {
    border: 1px solid #3dcca6;
  }

  .dark .searchWrapper .searchBtn {
    color: #8b90b3;
  }

  .dark .searchWrapper .searchBtn:hover {
    color: #3dcca6 !important;
  }

  .dark .searchWrapper .deleBtn {
    color: #8b90b3;
    border-right: 1px solid #8b90b3;
  }

  .dark .searchWrapper .deleBtn:hover {
    color: #3dcca6;
  }

  .dark .searchInputEx .searchInput {
    border: none;
  }

  .dark .searchInputEx .searchInput:hover {
    border: none;
  }

  /*endregion*/
</style>
