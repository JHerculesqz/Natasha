<template>
  <div class="rightExtPanelWrapper">
    <div class="expandBtn"
         v-bind:class="[icon]"
         v-on:click="onExpandBtnClick"></div>
    <div class="content"
         v-bind:style="{width: iWidth + 'px'}"
         v-show="showEx">
      <slot name="content"></slot>
      <div class="draggableHandel" v-show="canDragEx"
           v-bind:class="[{isDragging:bIsDragging}]"
           v-on:mousedown="mouseDown"
           v-on:mousemove="mouseMove"
           v-on:mouseout="mouseUp"
           v-on:mouseup="mouseUp"></div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'MarvelRightExtPanel',
    props: ['width', 'show', 'canDrag'],
    data: function() {
      return {
        showEx: this.show == "true",
        canDragEx: this.canDrag == "true",
        bIsDragging:false,
        iWidth:0,
        iBasicWidth:0,
        iMouseDownX:0
      }
    },
    computed: {
      icon: function(){
        var strIcon = this.showEx ? "icon-marvelIcon-25" : "icon-marvelIcon-23";
        return strIcon;
      }
    },
    methods: {
      onExpandBtnClick: function () {
        this.showEx = !this.showEx;
        this.$emit("onExpandBtnClick", this.showEx);
      },
      mouseDown: function(e){
        if(this.canDrag){
          this.bIsDragging = true;
          this.iMouseDownX = e.pageX;
        }
      },
      mouseMove:function(e){
        if(this.bIsDragging){
          var x = e.pageX;
          this.iWidth = this.iBasicWidth + (this.iMouseDownX - x);
        }
      },
      mouseUp:function(){
        if(this.bIsDragging){
          this.bIsDragging = false;
          this.iBasicWidth = this.iWidth;
        }
      },
      expand:function(bIsExpand){
        if(bIsExpand){
          this.showEx = true;
        }else{
          this.showEx = false;
        }
      }
    },
    mounted:function(){
      this.iWidth = parseInt(this.width);
      this.iBasicWidth = parseInt(this.width);
    }
  }
</script>

<style scoped>
  .rightExtPanelWrapper{
    height: 100%;
    position: absolute;
    top: 0;
    right:0;
  }
  .rightExtPanelWrapper .content{
    height: 100%;
    background-color: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
  }
  .rightExtPanelWrapper .expandBtn{
    position: absolute;
    left: -16px;
    top:50%;
    margin-top: -32px;
    width: 0px;
    height: 45px;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-right:16px solid #ffffff;
    color: #777;
    text-align: center;
    line-height: 45px;
    font-size: 12px;
    cursor: pointer;
  }
  .rightExtPanelWrapper .expandBtn:before{
    position: relative;
    left: 2px;
  }
  .draggableHandel{
    height: 100%;
    width: 10px;
    position: absolute;
    top: 0;
    left: 0;
    cursor: col-resize;
  }
  .isDragging{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /*region dark theme*/

  .dark .content{
    background-color: #1a1927;
  }
  .dark .expandBtn{
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-right:16px solid #1a1927;
    color: #3dcca6;
  }

  /*endregion*/
</style>
