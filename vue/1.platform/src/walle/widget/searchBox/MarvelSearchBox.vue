/**
* Created by destina on 2017/9/7.
*/
<template>
  <div class="search_dropDown">
    <div class="dropdownArea">
      <!-- dropdown_button start-->
      <marvel-drop-down-button ref="ref1" :dropDownItems="dropDownItems" :width="width"
                               :maxHeight="maxHeight"></marvel-drop-down-button>
      <!-- dropdown_button end-->
    </div>
    <div class="searchArea">
      <!-- search start-->
      <MarvelSearch @search="search" ref="ref4SearchInput" :placeholder="placeholder" :mixin="true"></MarvelSearch>
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
        this.$refs.ref4SearchInput.clear();
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

  /*region dark theme*/

  .dark .search_dropDown {
    border: 1px solid #8b90b3;
  }

  .dark .search_dropDown:hover {
    border: 1px solid #3dcca6;
  }

  /*endregion*/
</style>
