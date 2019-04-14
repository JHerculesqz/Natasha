<template>
  <!--checkBoxSlide start-->
  <div class="checkBoxSlideWrapper" :title="title">
    <div class="checkBoxSlide">
      <input type="checkbox" v-bind:id="[id]" v-model="checkItem"
             :disabled="isDisable"/>
      <label v-bind:for="[id]"></label>
    </div>
  </div>
  <!--checkBoxSlide end-->
</template>

<script>
  export default {
    name: 'MarvelSwitch',
    props: ["id", "check", "buObj", "title"],
    data: function() {
        return {
          checkItem: this.check === false ? false : true,
          isDisable: false,
        }
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
  .checkBoxSlideWrapper{
    display: inline-block;
  }
  .checkBoxSlideWrapper .checkBoxSlide{
    width: 38px;
    height: 20px;
    position: relative;
  }
  .checkBoxSlideWrapper .checkBoxSlide input[type=checkbox]{
    /*pos*/
    margin: 0;
    padding: 0;
    /*style*/
    visibility: hidden;
  }
  .checkBoxSlideWrapper .checkBoxSlide input[type=checkbox]:checked + label:after{
    /*pos*/
    /*style*/
    left: 18px;
    top: -2px;
    border: 1px solid #3dcca6;
  }
  .checkBoxSlideWrapper .checkBoxSlide input[type=checkbox]:checked + label{
    /*pos*/
    height: 16px;
    top: 2px;
    /*style*/
    background: #3dcca6;
    border: none;
  }
  .checkBoxSlideWrapper .checkBoxSlide input[type=checkbox]:disabled + label:after{
    /*pos*/
    /*style*/
    border: 1px solid #ccc;
  }
  .checkBoxSlideWrapper .checkBoxSlide input[type=checkbox]:disabled + label{
    /*pos*/
    /*style*/
    background: #e2e2e2;
    pointer-events: none;
  }
  .checkBoxSlideWrapper .checkBoxSlide label{
    /*pos*/
    width: 38px;
    height: 16px;
    position: absolute;
    top: 2px;
    left: 0;
    /*style*/
    background-color: #666;
    border-radius: 20px;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }
  .checkBoxSlideWrapper .checkBoxSlide label:hover{
    background-color: #999;
  }
  .checkBoxSlideWrapper .checkBoxSlide label:after{
    /*pos*/
    width: 18px;
    height: 18px;
    position: absolute;
    top: -2px;
    left: 0px;
    border-radius: 100%;
    content: "";
    /*style*/
    cursor: pointer;
    border: 1px solid #666;
    background-color: #fff;
    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -ms-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
  }
</style>
