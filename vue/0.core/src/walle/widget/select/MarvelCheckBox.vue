<template>
  <!--checkBox start-->
  <div class="checkBoxWrapper">
    <div class="checkBox">
      <input type="checkbox" v-bind:id="[id]"
             v-bind:value="label" v-model="checkItem"
             :disabled="isDisable"/>
      <label v-bind:for="[id]"></label>
    </div>
    <label v-bind:for="[id]" class="checkBoxLabel "
           v-bind:class="{ dpn: isShowLabel }">{{ label }}</label>
  </div>
  <!--checkBox end-->
</template>

<script>
  export default {
    name: 'MarvelCheckBox',
    props: ["id", "label", "showLabel", "check", "buObj"],
    data: function() {
        return {
          checkItem: this.check === true ? true : false,
          isDisable: false,
          isShowLabel: true
        }
    },
    mounted: function(){
      this.isShowLabel = this.showLabel == "false" ? true : false;
    },
    methods: {
      setStatus: function(bIsCheck, bIsDisable){
        this.checkItem = bIsCheck;
        this.isDisable = bIsDisable;
      },
      getCheckItem: function(){
        return this.checkItem;
      }
    },
    watch: {
      checkItem: function(strNewVal, strOldVal){
        this.$emit("onChange", strOldVal, strNewVal, this.buObj);
      }
    }
  }
</script>

<style scoped>
  *{box-sizing: border-box}
  .checkBoxWrapper{
    display: inline-block;
  }
  .dpn{
    display: none;
  }
  .checkBoxWrapper .checkBox{
    width: 16px;
    height: 16px;
    position: relative;
    float: left;
  }
  .checkBoxWrapper .checkBox input[type=checkbox]{
    /*pos*/
    margin: 0;
    padding: 0;
    /*style*/
    visibility: hidden;
  }
  .checkBoxWrapper .checkBox input[type=checkbox]:checked + label:after{
    /*pos*/
    /*style*/
    opacity: 1;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
  }
  .checkBoxWrapper .checkBox input[type=checkbox]:checked + label{
    /*pos*/
    /*style*/
    background: #3399ff;
    border: 1px solid rgba(0,0,0,0);
  }
  .checkBoxWrapper .checkBox input[type=checkbox]:disabled + label:after{
    /*pos*/
    /*style*/
    border: 2px solid #999999;
    border-top: none;
    border-right: none;
  }
  .checkBoxWrapper .checkBox input[type=checkbox]:disabled + label{
    /*pos*/
    /*style*/
    border: 1px solid #999999;
    background-color: #f0f0f0;
    pointer-events: none;
  }
  .checkBoxWrapper .checkBox label{
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
    border-radius: 2px;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }
  .checkBoxWrapper .checkBox label:hover{
    border: 1px solid #60b0ff;
  }
  .checkBoxWrapper .checkBox label:after{
    /*pos*/
    position: absolute;
    width: 7px;
    height: 4px;
    top: 3px;
    left: 2px;
    /*style*/
    opacity: 0;
    content: '';
    background: transparent;
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .checkBoxWrapper .checkBoxLabel{
    margin: 0 0 0 5px;
    padding: 0;
    float: left;
    font-size: 14px;
    line-height: 16px;
  }
</style>
