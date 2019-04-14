<template>
  <ul>
    <li class="checkNode" v-for="oNode in treeNodes">
      <input type="checkbox" v-model="oNode.show"/>{{oNode.label}}
    </li>
  </ul>
</template>

<script>
  import BusUtils from '@/walle/core/bus';
  export default {
    name: 'MarvelCheckTree',
    data: function() {
        return {
          treeNodes: []
        }
    },
    created: function () {
      BusUtils.$on('imsgMarvelCheckTreeSetData', this.imsgMarvelCheckTreeSetData);
      BusUtils.$on('imsgMarvelCheckTreeGetData', this.imsgMarvelCheckTreeGetData);
    },
    beforeDestroy: function () {
      BusUtils.$off('imsgMarvelCheckTreeSetData', this.imsgMarvelCheckTreeSetData);
      BusUtils.$off('imsgMarvelCheckTreeGetData', this.imsgMarvelCheckTreeGetData);
    },
    methods:{
      imsgMarvelCheckTreeSetData: function(arrTreeNodes){
        this.treeNodes = arrTreeNodes;
      },
      imsgMarvelCheckTreeGetData: function(){
        this.$emit('onGetTreeData', this.treeNodes);
      }
    }
  }
</script>

<style scoped>
  .checkNode{
    list-style:none;
    line-height:40px;
    color:#fff;
  }
</style>
