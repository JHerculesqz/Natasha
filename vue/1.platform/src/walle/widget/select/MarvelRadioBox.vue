<template>
  <!--radio start-->
  <div class="radioWrapper">
    <div class="radio">
      <input type="radio" v-bind:id="[id]" v-bind:name="group"
             v-bind:value="label" v-model="$parent[group]" v-on:change="onClick"
             :disabled="isDisable"/>
      <label v-bind:for="[id]"></label>
    </div>
    <label v-bind:for="[id]" class="radioLabel" v-bind:title="label"
           v-bind:class="{ dpn: isShowLabel }">{{ label }}</label>
  </div>
  <!--radio end-->
</template>

<script>
  export default {
    name: 'MarvelRadioBox',
    props: ["id", "group", "label", "showLabel"],
    data: function() {
        return {
          isDisable: false,
          isShowLabel: true
        }
    },
//    computed: {
//      checkItem: {
//        get: function() {
//          return this.initValue;
//        },
//        set: function() {
//          this.$emit("onChange", this.label)
//        }
//      }
//    },
    mounted: function(){
      this.isShowLabel = this.showLabel == "false" ? true : false;
    },
    methods: {
      setStatus: function(bIsCheck, bIsDisable){
        var strOldVal = this.$parent[this.group];
        this.$parent[this.group] = bIsCheck ? this.label: '';
        var strNewVal = this.$parent[this.group];
        this.$emit("onChange", strOldVal, strNewVal);
        this.isDisable = bIsDisable;
      },
      getCheckItem: function(){
        return this.$parent[this.group];
      },
      onClick: function(){
        var strOldVal = this.$parent[this.group];
        this.$parent[this.group] = this.label;
        var strNewVal = this.$parent[this.group];
        this.$emit("onChange", strOldVal, strNewVal);
      }
    }
  }
</script>

<style scoped>
  *{box-sizing: border-box}
  .radioWrapper{
    display: inline-block;
  }
  .dpn{
    display: none;
  }
  .radioWrapper .radio{
    width:16px;
    height:16px;
    position:relative;
    float: left;
  }
  .radioWrapper .radio input[type=radio]{
    /*pos*/
    margin: 0;
    padding: 0;
    /*style*/
    visibility:hidden;
  }
  .radioWrapper .radio input[type=radio]:checked + label:after{
    /*pos*/
    /*style*/
    opacity: 1;
    border-top: none;
    border-right: none;
  }
  .radioWrapper .radio input[type=radio]:checked + label{
    /*pos*/
    /*style*/
    background-color: #3399ff;
  }
  .radioWrapper .radio input[type=radio]:disabled + label:after{
    /*pos*/
    /*style*/
    background-color: #aaa;
  }
  .radioWrapper .radio input[type=radio]:disabled + label{
    /*pos*/
    /*style*/
    border:1px solid #999999;
    background-color: #f0f0f0;
    pointer-events: none;
  }
  .radioWrapper .radio label{
    /*pos*/
    position:absolute;
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
  .radioWrapper .radio label:hover{
    border: 1px solid #60b0ff;
  }
  .radioWrapper .radio label:after{
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
  .radioWrapper .radioLabel{
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

  .dark .radioLabel{
    color: #8b90b3;
  }

  /*endregion*/
</style>
