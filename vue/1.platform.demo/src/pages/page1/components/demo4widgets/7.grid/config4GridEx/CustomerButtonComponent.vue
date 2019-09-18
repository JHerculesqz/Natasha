<template>
  <div>
    <marvel-button :label="label"></marvel-button>
  </div>
</template>

<script>
  import MarvelButton from "^/widget/button/MarvelButton";

  export default {
    name: 'CustomerButtonComponent',
    components: {
      MarvelButton,
    },
    props:{
      row:{
        type:Array,
        default:function () {
          return [];
        }
      }
    },
    data: function () {
      return {
        label:"自定义按钮"
      }
    }
  }
</script>

<style scoped>
</style>
