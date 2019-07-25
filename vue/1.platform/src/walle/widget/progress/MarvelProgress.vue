<template>
  <div class="progressWrapper">
    <div v-if="showLabel" class="label" v-bind:style="'width:' + width + 'px'">{{label}}</div>
    <div class="progress" v-bind:style="'width:calc(100% - 75px - ' + this.width + 'px)'">
      <div class="progress-bar" :style="'width: ' + percent + '%'"></div>
    </div>
    <div class="progress-percentage">{{percent + "%"}}</div>
  </div>
</template>

<script>
  /**
   *  MarvelProgress widget description
   *  @vuedoc
   *  @exports MarvelProgress
   */
  export default {
    name: "MarvelProgress",
    components: {},
    props: {
      percent: {
        type: Number,
        default: 0,
        required: false,
      },
      label: {
        type: String,
        default: "",
        required: false,
      },
      width: {
        type: Number,
        default: 0,
        required: false,
      },
      showLabel: {
        type: Boolean,
        default: true,
        required: false,
      },
    },
    data: function () {
      return {}
    },
    methods: {}
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

  .progressWrapper {
    height: 100%;
  }

  .label {
    display: inline-block;
    width: 80px;
  }

  .progress {
    display: inline-block;
    width: calc(100% - 100px);
    height: 100%;
    border-radius: 5px;
    background: #dcdcdc;
    margin-left: 10px;
  }

  .progress-bar {
    background: #5ecc49;
    border-radius: 6px;
    float: left;
    width: 0;
    height: 100%;
    font-size: 12px;
  }

  .progress-percentage {
    display: inline-block;
    margin-left: 10px;
    color: #333;
    vertical-align: top;
  }
</style>
