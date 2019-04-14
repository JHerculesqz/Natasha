<template>
  <div class="btn" v-bind:class="{ active: isActive }"
       v-on:click="onClick">
    {{ label }}
  </div>
</template>

<script>
  export default {
    name: 'MarvelTabButton',
    props: ["label"],
    data: function() {
        return {
          isActive: false
        }
    },
    mounted: function(){

    },
    methods: {
      onClick: function(){
        this.$emit("onClick");
      },
      setActive: function(bIsActive){
        this.isActive = bIsActive;
      }
    }
  }
</script>

<style scoped>
  .btn {
    height: 22px;
    line-height: 22px;
    float: left;
    color: #a7abbe;
    font-size: 14px;
    cursor: pointer;
    border: 0.4px dashed #a7abbe;
    margin-right: 20px;
    padding: 0 10px;
  }
  .btn:hover {
    color: #3dcaa6;
  }
  .btn:last-child{
    margin-right: 0;
  }
  .active {
    border: 0.4px solid #3dcaa6;
    color: #fff;
    background-color: rgba(61, 202, 166, 0.2);
  }
</style>
