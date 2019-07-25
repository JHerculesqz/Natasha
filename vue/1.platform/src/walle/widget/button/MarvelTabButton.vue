<template>
  <div class="btn" v-bind:class="[{ active: isActive }, {tip:isWarn}]"
       v-on:click="onClick">
    {{ label }}
  </div>
</template>

<script>
  /**
   *  MarvelTabButton widget description
   *  @vuedoc
   *  @exports MarvelTabButton
   */
  export default {
    name: 'MarvelTabButton',
    props: {
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
        isActive: false
      }
    },
    mounted: function () {

    },
    methods: {
      //#region inner
      //#endregion
      //#region callback

      onClick: function () {
        this.$emit("onClick");
      },

      //#endregion
      //#region 3rd

      setActive: function (bIsActive) {
        this.isActive = bIsActive;
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

  .btn {
    height: 22px;
    line-height: 22px;
    float: left;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    border: 0.4px dashed #cccccc;
    margin-right: 20px;
    padding: 0 10px;
    position: relative;
  }

  .btn:hover {
    color: #3399ff;
  }

  .btn:last-child {
    margin-right: 0;
  }

  .tip:after {
    content: "";
    position: absolute;
    top: 1px;
    left: 2px;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background-color: #ff4400;
  }

  .active {
    border: 0.4px solid #3399ff;
    color: #333;
    background-color: rgba(51, 153, 255, 0.2);
  }

  /*region dark theme*/

  .dark .btn {
    color: #a7abbe;
    border: 0.4px dashed #a7abbe;
  }

  .dark .btn:hover {
    color: #3dcaa6;
  }

  .dark .active {
    border: 0.4px solid #3dcaa6;
    color: #fff;
    background-color: rgba(61, 202, 166, 0.2);
  }

  /*endregion*/
</style>
