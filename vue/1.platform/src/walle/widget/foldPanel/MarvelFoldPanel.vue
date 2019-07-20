<template>
  <div class="foldPanelWrapper" v-bind:class="{fold: !item.bIsExpand}"
       :style="{height: item.height}">
    <div class="foldPanelTitle" v-on:click="expandOrFold">
      <div class="btn"
           v-bind:class="[{'icon-marvelIcon-01':item.bIsExpand},{'icon-marvelIcon-03': !item.bIsExpand}]"></div>
      <div class="title">{{item.name}}</div>
    </div>
    <div class="contArea" v-bind:class="{ uiSink: item.bIsExpand === false}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelFoldPanel widget description
   *  @vuedoc
   *  @exports MarvelFoldPanel
   */
  export default {
    name: 'MarvelFoldPanel',
    props: {
      item: {
        type: Object,
        default: undefined,
        required: true,
      }
    },
    data: function () {
      return {}
    },
    methods: {
      //#region inner
      expandOrFold: function () {
        this.item.bIsExpand = !this.item.bIsExpand;
        this.callback4OnTitleClick(this.item, this.item.bIsExpand);
      },
      //#endregion
      //#region callback

      callback4OnTitleClick: function (oItem, bIsExpand) {
        this.$emit('onTitleClick', oItem, bIsExpand);
      },

      //#endregion
      //#region 3rd
      //#endregion
    }
  }
</script>

<style scoped>
  .foldPanelWrapper {
    width: 100%;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  }

  .fold {
    height: 32px !important;
  }

  .foldPanelTitle {
    height: 32px;
    border-radius: 2px;
    background-color: #e8e8e8;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .title {
    font-size: 14px;
    font-weight: bolder;
    line-height: 32px;
    color: #333;
    float: left;
  }

  .btn {
    color: #3399ff;
    height: 32px;
    line-height: 32px;
    float: left;
    margin-right: 10px;
  }

  .contArea {
    padding: 10px 10px 20px 10px;
    height: calc(100% - 32px);
    box-sizing: border-box;
    background-color: #fdfefe;
    width: 100%;
  }

  .uiSink {
    position: absolute;
    opacity: 0;
    z-index: -1;
    display: none;
  }

  /*region dark theme*/

  .dark .foldPanelTitle {
    background-color: #36365b;
  }

  .dark .title {
    color: #ffffff;
  }

  .dark .btn {
    color: #3dcca6;
  }

  .dark .contArea {
    background-color: rgba(0, 0, 0, 0.3);
  }

  /*endregion*/
</style>
