<template>
  <!--radio start-->
  <div class="radioWrapper">
    <div class="radio">
      <input type="radio" v-bind:id="[id]" v-bind:name="group"
             v-bind:value="label" v-model="$parent[group]" v-on:change="onClick"
             :disabled="isDisable"/>
      <label v-bind:for="[id]"></label>
    </div>
    <label v-bind:for="[id]" class="radioLabel" v-bind:title="title ? title : label"
           v-bind:class="{ dpn: isShowLabel }">{{ label }}</label>
  </div>
  <!--radio end-->
</template>

<script>
  /**
   *  MarvelRadioBox widget description
   *  @vuedoc
   *  @exports MarvelRadioBox
   */
  export default {
    name: 'MarvelRadioBox',
    props: {
      id: {
        type: String,
        default: "",
        required: false,
      },
      group: {
        type: String,
        default: "",
        required: false,
      },
      label: {
        type: String,
        default: "",
        required: false,
      },
      showLabel: {
        type: Boolean,
        default: true,
        required: false,
      },
      title: {
        type: String,
        default: undefined,
        required: false,
      },
    },
    data: function() {
      return {
        isDisable: false,
        isShowLabel: true,
      }
    },
    mounted: function(){
      this.isShowLabel = this.showLabel == false ? true : false;
    },
    methods: {
      //#region inner

      onClick: function () {
        var strOldVal = this.$parent[this.group];
        this.$parent[this.group] = this.label;
        var strNewVal = this.$parent[this.group];
        this.callback4OnChange(strOldVal, strNewVal);
      },

      //#endregion
      //#region callback

      callback4OnChange: function (strOldVal, strNewVal) {
        this.$emit("onChange", strOldVal, strNewVal);
      },
      callback4OnChangeBy3rd: function (strOldVal, strNewVal) {
        this.$emit("onChangeBy3rd", strOldVal, strNewVal);
      },

      //#endregion
      //#region 3rd

      setStatus: function (bIsCheck, bIsDisable) {
        var strOldVal = this.$parent[this.group];
        this.$parent[this.group] = bIsCheck ? this.label : '';
        var strNewVal = this.$parent[this.group];
        this.callback4OnChangeBy3rd(strOldVal, strNewVal);
        this.isDisable = bIsDisable;
      },
      setDisableStatus: function (bIsDisable) {
        this.isDisable = bIsDisable;
      },
      getCheckItem: function () {
        return this.$parent[this.group];
      },

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
  * {
    box-sizing: border-box
  }

  .radioWrapper {
    display: inline-block;
  }

  .dpn {
    display: none;
  }

  .radioWrapper .radio {
    width: 16px;
    height: 16px;
    position: relative;
    float: left;
  }

  .radioWrapper .radio input[type=radio] {
    /*pos*/
    margin: 0;
    padding: 0;
    /*style*/
    visibility: hidden;
  }

  .radioWrapper .radio input[type=radio]:checked + label:after {
    /*pos*/
    /*style*/
    opacity: 1;
    border-top: none;
    border-right: none;
  }

  .radioWrapper .radio input[type=radio]:checked + label {
    /*pos*/
    /*style*/
    background-color: #3399ff;
  }

  .radioWrapper .radio input[type=radio]:disabled + label:after {
    /*pos*/
    /*style*/
    background-color: #aaa;
  }

  .radioWrapper .radio input[type=radio]:disabled + label {
    /*pos*/
    /*style*/
    border: 1px solid #999999;
    background-color: #f0f0f0;
    pointer-events: none;
  }

  .radioWrapper .radio label {
    /*pos*/
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    /*style*/
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 100%;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }

  .radioWrapper .radio label:hover {
    border: 1px solid #60b0ff;
  }

  .radioWrapper .radio label:after {
    /*pos*/
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    top: 4px;
    left: 4px;
    /*style*/
    opacity: 0;
    content: '';
    background-color: #fff;
  }

  .radioWrapper .radioLabel {
    margin: 0 0 0 5px;
    width: calc(100% - 21px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0;
    float: left;
    font-size: 14px;
    line-height: 16px;
    color: #666666;
  }

  /*region dark theme*/

  .dark .radioLabel {
    color: #8b90b3;
  }

  /*endregion*/
</style>
