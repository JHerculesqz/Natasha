<template>
  <div class="leftExtPanelWrapper"
       v-bind:class="[theme]"
       :draggable="canDrag"
       v-on:dragstart="onDragStart">
    <div class="content"
         v-bind:style="{width: width + 'px'}"
         v-show="showEx">
      <slot name="content"></slot>
    </div>
    <div class="expandBtn"
         v-bind:class="[icon]"
         v-on:click="onExpandBtnClick"></div>
  </div>
</template>

<script>
  export default{
    name: 'MarvelLeftExtPanel',
    props: ['theme', 'width', 'show', 'canDrag'],
    data: function() {
      return {
        showEx: this.show == "true"
      }
    },
    computed: {
      icon: function(){
        var strIcon = this.showEx ? "icon-marvelIcon-25" : "icon-marvelIcon-23";
        return strIcon;
      }
    },
    methods: {
      onDragStart: function () {
        alert("onDragStart");
      },
      onExpandBtnClick: function () {
        this.showEx = !this.showEx;
      }
    }
  }
</script>

<style scoped>
  .leftExtPanelWrapper{
    height: 100%;
    position: absolute;
    top: 0;
    left:0;
  }
  .leftExtPanelWrapper .content{
    height: 100%;
    background-color: #ffffff;
    padding: 10px;
    box-sizing: border-box;
  }
  .leftExtPanelWrapper .expandBtn{
    position: absolute;
    right: -16px;
    top:50%;
    margin-top: -32px;
    width: 0px;
    height: 45px;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-left:16px solid #ffffff;
    color: #777;
    text-align: center;
    line-height: 45px;
    font-size: 12px;
    cursor: pointer;
  }
  .leftExtPanelWrapper .expandBtn:before{
    position: relative;
    left: -14px;
  }

  .dark {
  }
  .dark .content{
    background-color: #1a1927;
  }
  .dark .expandBtn{
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-left:16px solid #1a1927;
    color: #3dcca6;
  }
</style>
