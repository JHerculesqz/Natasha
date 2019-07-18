<template>
  <div class="textBtn" :style="{width: widthVal}">
    <div class="class4Icon icon-info" v-on:click="showLabelOpen"></div>
    <div v-show="showLabel">
      <div :title="label" class="class4label">{{label}}</div>
      <div class="class4Icon icon-cancel-circle" v-on:click="showLabelClose"></div>
    </div>
  </div>
</template>

<script>
  /**
   *  MarvelInfo widget description
   *  @vuedoc
   *  @exports MarvelInfo
   */
  export default {
    name: 'MarvelInfo',
    props: {
      label: {
        type: String,
        default: "",
        required: false,
      },
    },
    data: function () {
      return {
        showLabel: true,
        widthVal: "600px",
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        if (window.innerWidth < 1500) {
          this.widthVal = "400px"
        } else {
          this.widthVal = "600px"
        }
      },

      //#endregion

      showLabelOpen: function () {
        this.showLabel = true;
        if (window.innerWidth < 1500) {
          this.widthVal = "400px"
        } else {
          this.widthVal = "600px"
        }
      },
      showLabelClose: function () {
        this.showLabel = false;
        if (window.innerWidth < 1500) {
          this.widthVal = "70px"
        } else {
          this.widthVal = "70px"
        }
      },

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd
      //#endregion

    }
  }
</script>

<style scoped>
  .class4label {
    color: red;
    font-size: 12px;
    float: left;
    max-width: 320px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  @media (min-width: 1500px) {
    .class4label {
      max-width: 560px;
    }
  }

  .class4Icon {
    color: grey;
    float: left;
  }

  .textBtn:hover {
    color: #006ad4;
  }
</style>
