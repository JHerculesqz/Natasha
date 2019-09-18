<template>
  <div class="container" @click.stop>
    <h4>
      这是一个自定义的搜索面板。
    </h4>
    <input v-model="inputVal"/>
    <button @click.stop="onClickSearch">搜索</button>
  </div>
</template>

<script>
  import Bus from "^/core/bus";

  export default {
    name: 'TableSearchComponent',
    props:{
      gridTitle:{
        type:Object
      }
    },
    data: function () {
      return {
        inputVal:""
      }
    },
    methods:{
      onClickSearch(){
        let arrRow = this.$parent.getRows();
        let arrRes = [];
        arrRow.forEach((oRow)=>{
          let oCell = this.$parent.getCellValueByKey(this.gridTitle.key, oRow);
          if(oCell.toLowerCase().indexOf(this.inputVal.toLowerCase()) >  -1){
            arrRes.push(oRow);
          }
        });
        Bus.$emit("searchCustomer4Table", arrRes);
      },
    }
  }
</script>

<style scoped>

  .container{
    padding: 10px;
    color: #666;
    background-color: #ffffff;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.12);
  }

</style>
