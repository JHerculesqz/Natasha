<template>
  <div class="iconBtn"
       v-bind:class="[disable, classCustom, icon, {tip:isWarn}]"
       v-bind:title="label"
       v-on:click="onClick"></div>
</template>

<script>
  /**
   *  MarvelIconButton widget description
   *  @vuedoc
   *  @exports MarvelIconButton
   */
  export default {
    name: 'MarvelIconButton',
    props: {
      classCustom: {
        type: String,
        default: "",
        required: false,
      },
      label: {
        type: String,
        default: "",
        required: false,
      },
      icon: {
        type: String,
        default: "",
        required: false,
      },
      isWarn: {
        type: Boolean,
        default: false,
        required: false,
      },
    },
    data: function () {
      return {
        disable: ""
      }
    },
    methods: {
      //#region inner
      //#endregion
      //#region callback

      onClick: function () {
        this.$emit('onClick');
      },

      //#endregion
      //#region 3rd

      setBtnDisable: function (bIsDisable) {
        this.disable = bIsDisable ? "disable" : "";
      }

      //#endregion

    }
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .iconBtn {
    color: #777;
    height: 16px;
    line-height: 16px;
    font-size: 16px;
    display: inline-block;
    cursor: pointer;
    position: relative;
  }

  .iconBtn:hover {
    color: #3399ff;

  }

  .tip:after {
    content: "";
    position: absolute;
    top: -6px;
    left: -6px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #ff4400;
  }

  .disable {
    color: #aaa;
    pointer-events: none;
  }

  /*region dark theme*/

  .dark .iconBtn {
    color: #ffffff;
  }

  .dark .iconBtn:hover {
    color: #3dcca6;
  }

  .dark .disable {
    color: #36365b;
  }

  /*endregion*/
</style>
