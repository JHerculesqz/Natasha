<template>
  <ul id="demo" class="treeWrapper" v-bind:class="theme">
    <slot></slot>
  </ul>
</template>

<script>
  export default {
    name: 'MarvelZTree',
    props: ["theme"],
    data: function() {
        return {

        }
    }
  }
</script>

<style scoped>
.treeWrapper{
  width: 100%;
  height:100%;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0;
}
  .dark{
    border: 1px solid #04032a;
  }
</style>
