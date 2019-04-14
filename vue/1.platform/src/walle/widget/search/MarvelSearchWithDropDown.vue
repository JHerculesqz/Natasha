/**
* Created by destina on 2017/9/7.
*/
<template>

  <div class="search_dropDown">
    <div class="dropdownArea">
      <!-- dropdown_button start-->
      <MarvelDropDownButton ref="ref1"></MarvelDropDownButton>
      <!-- dropdown_button end-->
    </div>
    <div class="searchArea">
      <!-- search start-->
      <MarvelSearch @search="search" :placeholder="placeholder" mixin="true"></MarvelSearch>
      <!-- search end-->
    </div>
  </div>
  </div>

</template>

<script>
  import MarvelDropDownButton from '../button/MarvelDropDownButton.vue';
  import MarvelSearch from './MarvelSearch.vue';

  export default {
    components: {
      MarvelDropDownButton,
      MarvelSearch
    },
    name: "MarvelSearchWithDropDown",
    data: function () {
      return {
      }
    },
    props: ["placeholder", "selectItems"],
    computed: {},
    methods: {
      search: function (strSearchVal) {
        let searchKey = this.$refs.ref1.getSelectItem();
        this.$emit("search", searchKey, strSearchVal);
      }
    },
    mounted: function () {
      let selectLabel = "";
      for (var i = 0, len = this.selectItems.length; i < len; i++) {
        if (this.selectItems[i].selected === true) {
          selectLabel = this.selectItems[i].label;
          break;
        }
      }
      this.$refs.ref1.init(this.selectItems, selectLabel);
    },
  }

</script>

<style scoped>
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
