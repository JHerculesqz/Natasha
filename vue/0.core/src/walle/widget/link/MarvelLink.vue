<template>
  <div class="linkWrapper"
       v-bind:class="[classCustom, disable]"
       v-on:click="onClick">{{ label }}</div>
</template>

<script>
  export default {
    name: 'MarvelLink',
    props: ["label", "classCustom"],
    data: function() {
        return {
          disable: ""
        }
    },
    methods: {
      setDisable: function (bDisable){
        this.disable = bDisable == false ? "disable" : "";
      },
      onClick: function(e){
        this.$emit("onClick", e);
      }
    }
  }
</script>

<style scoped>
  .linkWrapper{
    display: inline-block;
    color: #3399ff;
    cursor: pointer;
  }
  .linkWrapper:hover{
    color: #006ad4;
    text-decoration: underline;
  }
  .convertLink{
    display: inline-block;
    color: #666;
    cursor: pointer;
  }
  .convertLink:hover{
     color: #006ad4;
     text-decoration: underline;
   }
  .disable{
    color:#666;
    pointer-events: none;
  }
</style>
