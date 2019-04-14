<template>
  <div class="toolbarWrapper" v-bind:class="theme">
      <div class="toolbarItem" v-for="item in items"
           v-on:click="onToolbarItemClick($event, item)"
           v-bind:key="item.id">
        <div class="toolbarIcon" v-bind:class="item.icon"></div>
        <div class="toolbarName">{{item.label}}</div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'MarvelToolbar',
    props: ['items', 'theme'],
    data: function(){
      return {

      };
    },
    methods: {
      onToolbarItemClick: function(evt, oItem){
        this.$emit("onToolbarItemClick", oItem);
      }
    }
  }

</script>

<style scoped>
.toolbarWrapper{
  overflow: hidden;
  padding: 0 10px;
}
.toolbarWrapper .toolbarItem{
  float: left;
  padding: 0 10px;
  height:30px;
  border: 1px solid transparent;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
}
.toolbarWrapper .toolbarItem .toolbarIcon{
  height:100%;
  width: 16px;
  margin-right: 10px;
  line-height: 28px;
  text-align: center;
  font-size: 16px;
  color: #3399ff;
  float: left;
}
.toolbarWrapper .toolbarItem .toolbarName{
  height:100%;
  line-height: 28px;
  text-align: center;
  font-size: 14px;
  color: #666;
  float: left;
}
.toolbarWrapper .toolbarItem:hover{
  border: 1px solid #3399ff;
  background-color: rgba(51, 153, 255, 0.2);
}
.toolbarWrapper .disable{
  pointer-events: none;
}
.toolbarWrapper .disable .toolbarIcon{
  color: #999;
}
.toolbarWrapper .disable .toolbarName{
  color: #999;
}

.dark{}
.dark .toolbarItem{}
.dark .toolbarItem .toolbarIcon{
  color: #3dcca6;
}
.dark .toolbarItem .toolbarName{
  color: #ffffff;
}
.dark .toolbarItem:hover{
  border: 1px solid #3dcca6;
  background-color: rgba(61, 204, 166, 0.2);
}
.dark .disable{
  pointer-events: none;
}
.dark .disable .toolbarIcon{
  color: #999;
}
.dark .disable .toolbarName{
  color: #999;
}
</style>
