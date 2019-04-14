<template>
  <div class="bottomExtPanelWrapper">
    <div class="expandBtn"
         v-bind:class="[icon]"
         v-on:click="onExpandBtnClick"></div>
    <div class="content"
         v-bind:style="{height: iHeight + 'px'}"
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
    name: 'MarvelBottomExtPanel',
    props: ['height', 'show', 'canDrag'],
    data: function() {
      return {
        showEx: this.show == "true",
        canDragEx: this.canDrag == "true",
        bIsDragging:false,
        iHeight:0,
        iBasicHeight:0,
        iMouseDownY:0
      }
    },
    computed: {
      icon: function(){
        var strIcon = this.showEx ? "icon-marvelIcon-24" : "icon-marvelIcon-22";
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
          this.iMouseDownY = e.pageY;
        }
      },
      mouseMove:function(e){
        if(this.bIsDragging){
          var y = e.pageY;
          this.iHeight = this.iBasicHeight + (this.iMouseDownY - y);
        }
      },
      mouseUp:function(){
        if(this.bIsDragging){
          this.bIsDragging = false;
          this.iBasicHeight = this.iHeight;
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
      this.iHeight = parseInt(this.height);
      this.iBasicHeight = parseInt(this.height);
    }
  }
</script>

<style scoped>
  .bottomExtPanelWrapper{
    width: 100%;
    position: absolute;
    bottom: 0;
    left:0;
  }
  .bottomExtPanelWrapper .content{
    width: 100%;
    background-color: #ffffff;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
  }
  .bottomExtPanelWrapper .expandBtn{
    margin: 0px auto;
    width: 45px;
    height: 0;
    border-left:10px solid transparent;
    border-right:10px solid transparent;
    border-bottom:16px solid #ffffff;
    color: #777;
    text-align: center;
    line-height: 16px;
    font-size: 12px;
    cursor: pointer;
  }
  .draggableHandel{
    height: 10px;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    cursor: row-resize;
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
    border-left:10px solid transparent;
    border-right:10px solid transparent;
    border-bottom:16px solid #1a1927;
    color: #3dcca6;
  }

  /*endregion*/
</style>
