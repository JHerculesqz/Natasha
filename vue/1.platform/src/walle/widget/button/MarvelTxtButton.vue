<template>
  <div class="textBtn" :title="label"
       v-bind:class="[disable, classCustom, {tip:isWarn}]"
       v-on:click="onClick">{{ label }}
  </div>
</template>

<script>
  /**
   *  MarvelTxtButton widget description
   *  @vuedoc
   *  @exports MarvelTxtButton
   */
  export default {
    name: 'MarvelTxtButton',
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
  .textBtn {
    color: #3399ff;
    height: 14px;
    line-height: 14px;
    font-size: 14px;
    display: inline-block;
    cursor: pointer;
    position: relative;
  }

  .textBtn:hover {
    color: #006ad4;

  }

  .disable {
    color: #ccc;
    pointer-events: none;
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

  /*region dark theme*/

  .dark .textBtn {
    color: #3dcca6;
  }

  .dark .textBtn:hover {
    color: #45e0b7;
  }

  .dark .disable {
    color: #8d8d8d;
  }

  .dark .tip:after {
    background-color: #ff4400;
  }

  /*endregion*/
</style>
