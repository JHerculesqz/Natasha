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
  .search_dropDown{
    height: 32px;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    border: 1px solid #cccccc;
    box-sizing: border-box;
  }
  .search_dropDown:hover{
    border: 1px solid #3399ff;
  }
  .search_dropDown .dropdownArea{
    display: inline-block;
    height: 32px;
  }
  .search_dropDown .dropdownArea:after{
    content: "";
    display: inline-block;
    position: relative;
    top:-4px;
    left: 4px;
    width: 0.5px;
    height:24px;
    background-color: #ccc;
  }
  .search_dropDown .dropdownArea .dropdownBtn{
    border: none;
  }
  .search_dropDown .dropdownArea .dropdownBtn .label{
    position: relative;
  }
  .search_dropDown .dropdownArea .dropdownBtn .label:after{
    content: "";
    height: 22px;
    width: 1px;
    position: absolute;
    right: 0;
    top: 5px;
    background-color: #cccccc;
  }
  .search_dropDown .dropdownArea .dropdownBtn .options{
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  .search_dropDown .searchArea{
    display: inline-block;
    height: 30px;
    position: relative;
    top: -2px;
  }
</style>
