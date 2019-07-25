<template>
  <div class="wrapper">
    <div class="session"
         v-for="oListItem in listItems">
      <div class="left"
           v-bind:style="{
             backgroundImage : 'url(' + oListItem.img + ')'
         }"></div>
      <div class="right">
        <div class="title">{{oListItem.title}}</div>
        <div class="details">{{oListItem.desc}}</div>
        <marvel-button :label="oListItem.btnName"
                       v-on:onClick="onClick(oListItem)">
        </marvel-button>
      </div>
    </div>
  </div>
</template>

<script>
  import MarvelButton from "../button/MarvelButton";

  /**
   *  MarvelList3 widget description
   *  @vuedoc
   *  @exports MarvelList3
   */
  export default {
    components: {MarvelButton},
    name: 'MarvelList3',
    props: {
      listItems: {
        type: Array,
        default: undefined,
        required: true,
      }
    },
    data: function () {
      return {}
    },
    methods: {
      //#region inner

      //#endregion
      //#region callback

      onClick: function (oListItem) {
        this.$emit("onBtnClick4List", oListItem);
      },

      //#endregion
      //#region 3rd

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
  .wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    box-sizing: border-box;
  }

  .wrapper .session {
    width: 100%;
    height: 110px;
    float: left;
    margin-bottom: 10px;
    border: 1px dashed #d5d5d5;
    box-sizing: border-box;
    padding: 8px;
  }

  .wrapper .session .left {
    width: 90px;
    height: 90px;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    float: left;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .wrapper .session .right {
    width: calc(100% - 90px);
    height: 90px;
    box-sizing: border-box;
    padding-left: 10px;
    float: left;
  }

  .wrapper .session .right .title {
    line-height: 32px;
    font-size: 16px;
    color: #2dcca6;
  }

  .wrapper .session .right .details {
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #b8c7ce;
  }

  .wrapper .session .right .btn {
    height: 32px;
    float: right;
  }

  /*region dark theme*/

  .dark .wrapper {
  }

  .dark .wrapper .session {
    border: 1px dashed #d5d5d5;
  }

  .dark .wrapper .session .left {
    border: 1px solid #d5d5d5;
  }

  .dark .wrapper .session .right {
  }

  .dark .wrapper .session .right .title {
    color: #2dcca6;
  }

  .dark .wrapper .session .right .details {
    color: #b8c7ce;
  }

  .dark .wrapper .session .right .btn {
  }

  /*endregion*/
</style>
