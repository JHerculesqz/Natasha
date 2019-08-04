<template>
  <div class="customerGripWrapper">
    <marvel-grid-ex ref="gridEx"
                    :titles="gridTitle"
                    :rows="rowsEx"
                    :limit="15"
                    gridId="demoCustomer1"
                    :showTitles="false"
                    :canDrag="false"
                    :hasFoot="false"></marvel-grid-ex>
  </div>
</template>

<script>
  import MarvelGridEx from "^/widget/grid/MarvelGridEx";
  import CommonTitle from "./common_title"

  export default {
    name: 'CustomerGridComponent1',
    components: {
      MarvelGridEx
    },
    props:{
      row:Array
    },
    data: function () {
      return {
        gridTitle: CommonTitle,
        rowsEx:[]
      }
    },
    watch:{
      row:{
        handler: function () {
          var oMap = this.row[this.row.length - 1].value;
          for(var strKey in oMap){
            var oRow = oMap[strKey];
            this.rowsEx.push(oRow);
          }
        },
        deep: true
      }
    },
    mounted() {
      var oMap = this.row[this.row.length - 1].value;
      for(var strKey in oMap){
        var oRow = oMap[strKey];
        this.rowsEx.push(oRow);
      }
    }
  }
</script>

<style scoped>

  .customerGripWrapper{
    padding: 0 0 0 35px;
  }

</style>

<style>

  .customerGripWrapper tbody{
    overflow: hidden !important;
  }

</style>
