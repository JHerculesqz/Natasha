<template>
  <div class="bottomExtPanelWrapper"
       v-bind:class="[theme]"
       :draggable="canDrag"
       v-on:dragstart="onDragStart">
    <div class="expandBtn"
         v-bind:class="[icon]"
         v-on:click="onExpandBtnClick"></div>
    <div class="content"
         v-bind:style="{height: height + 'px'}"
         v-show="showEx">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'MarvelBottomExtPanel',
    props: ['theme', 'height', 'show', 'canDrag'],
    data: function() {
      return {
        showEx: this.show == "true"
      }
    },
    computed: {
      icon: function(){
        var strIcon = this.showEx ? "icon-marvelIcon-24" : "icon-marvelIcon-22";
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

  .dark {
  }
  .dark .content{
    background-color: #1a1927;
  }
  .dark .expandBtn{
    border-left:10px solid transparent;
    border-right:10px solid transparent;
    border-bottom:16px solid #1a1927;
    color: #3dcca6;
  }
</style>
