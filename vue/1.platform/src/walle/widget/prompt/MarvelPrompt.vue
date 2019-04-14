<template>

  <div class="promptContainer" :class="classObj">
    <div class="left" :class="leftIconClass"></div>
    <div class="center">
      {{content}}
    </div>
    <div class="right icon-cross" @click="clickDel"></div>
  </div>

</template>

<script>
  export default {
    name: "MarvelPrompt",
    data: function(){
      return {

      };
    },
    props: ['status', 'content'],//status: '0'表示info,'1'代表提示,'2'表示警告
    methods: {
      clickDel: function(){
        this.$el.remove();
      }
    },
    computed: {
      classObj: function(){
        if(this.status == '0'){
          return 'promptInfo';
        }
        if(this.status == '1'){
          return 'promptTip';
        }
        else{
          return 'promptError';
        }
      },
      leftIconClass: function(){
        if(this.status == '0'){
          return ["icon-checkmark", "leftInfo"];
        }
        else if(this.status == '1'){
          return ["icon-info", "leftTip"];
        }
        else{
          return ["icon-info", "leftError"];
        }
      }
    },
    mounted: function(){
      setTimeout(function(){
        this.clickDel();
      }.bind(this), 10000);
    }
  }

</script>

<style scoped>
  .promptContainer {
    width: 400px;
    min-height: 40px;
    box-sizing: border-box;
    padding: 0 15px;
    font-size: 14px;
    border: 1px solid;
    overflow: hidden;
  }
  .promptInfo{
    background-color: rgba(61, 204, 166,0.3);
    border-color: #3dcca6;
    color: #3dcca6;
  }
  .promptTip{
    background-color: rgba(51, 153, 255, 0.3);
    border-color: #3399ff;
    color: #3399ff;
  }
  .promptError{
    background-color: rgba(255,76,76,0.3);
    border-color: #ff4c4c;
    color: #ff4c4c;
  }
  .promptContainer .left{
    float: left;
    margin-top: 12px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: #FFFFFF;
    line-height: 16px;
    font-size: 8px;
    text-align: center;
  }
  .leftInfo{
    background-color: #3dcca6;
  }
  .leftTip{
    background-color: #3399ff;
  }
  .leftError{
    background-color: #ff4c4c;
  }
  .promptContainer .center{
    float: left;
    margin: 10px 15px 10px 10px;
    width: 313px;
  }
  .promptContainer .right{
    float: right;
    margin-top: 12px;
    line-height: 16px;
    font-size: 8px;
    text-align: center;
    width: 12px;
  }
</style>
