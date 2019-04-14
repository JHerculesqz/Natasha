<template>
  <div class="promptExWrapper" v-bind:class="[notify]">
    <div class="iconBtn"
         v-bind:class="[icon]"
         v-bind:title="label"
         v-on:click="onClick"></div>
    <div class="messageArea"></div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelPromptEx',
    props: ["label", "icon"],
    data: function() {
      return {
        notify: ""
      }
    },
    methods: {
      //#region inner

      //#endregion
      //#region callback
      onClick: function(){
        this.$emit("onClick");
      },
      //#endregion
      //#region 3rd
      setNotify: function (bHasNotify) {
        this.notify = bHasNotify==true ? "tip" : "";
      },
      //#endregion
    }
  }
</script>

<style scoped>
  .iconBtn{
    color: #777;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    display: inline-block;
    cursor: pointer;
    position: relative;
  }
  .iconBtn:hover{
    color: #3399ff;

  }
  .tip .iconBtn:after{
    content: "";
    position: absolute;
    top: -4px;
    right: -4px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #ff4400;
  }
  .disable{
    color: #aaa;
    pointer-events: none;
  }
</style>
