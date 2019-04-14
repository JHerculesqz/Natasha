<template>
  <div class="leftExtPanelWrapper">
    <div class="content"
         v-bind:style="{width: iWidth + 'px','min-width':minW + 'px','max-width':maxW + 'px'}"
         v-show="showEx">
      <slot name="content"></slot>
      <div class="draggableHandel" v-show="canDragEx"
           v-bind:class="[{isDragging:bIsDragging}]"
           v-on:mousedown="mouseDown"
           v-on:mousemove="mouseMove"
           v-on:mouseout="mouseUp"
           v-on:mouseup="mouseUp"></div>
    </div>
    <div class="expandBtn"
         v-bind:class="[icon]"
         v-on:click="onExpandBtnClick"></div>
  </div>
</template>

<script>
  export default{
    name: 'MarvelLeftExtPanel',
    props: ['width', 'show', 'canDrag', 'minW', 'maxW'],
    data: function() {
      return {
        showEx: this.show == "true",
        canDragEx: this.canDrag == "true",
        bIsDragging:false,
        iWidth:0,
        iBasicWidth:0,
        iMouseDownX:0,
        iMinW:undefined,
        iMaxW:undefined,
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
          var calcW = this.iBasicWidth + (x - this.iMouseDownX);

          //如果有最大最小值的限制 且当前值在取值区间内
          if(this.iMinW != undefined && this.iMaxW != undefined && calcW >= this.iMinW && calcW <= this.iMaxW){
            this._afterCalcW(calcW);
          }
          //仅有最小值限制 且当前值大于最小值
          else if(this.iMinW != undefined && this.iMaxW == undefined && calcW >= this.iMinW){
            this._afterCalcW(calcW);
          }
          //仅有最大值限制 且当前值小于最大值
          else if(this.iMinW == undefined && this.iMaxW != undefined && calcW <= this.iMaxW){
            this._afterCalcW(calcW);
          }
          //无最大最小值限制
          else if(this.iMinW == undefined && this.iMaxW == undefined){
            this._afterCalcW(calcW);
          }
        }
      },
      _afterCalcW: function(calcW){
        this.iWidth = calcW;
        this.$emit("onDrag", this.iWidth);
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

      if(this.minW != undefined){
        this.iMinW = parseInt(this.minW);
      }
      if(this.maxW != undefined){
        this.iMaxW = parseInt(this.maxW);
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
    position: relative;
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
  .draggableHandel{
    height: 100%;
    width: 10px;
    position: absolute;
    top: 0;
    right: 0;
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
    border-left:16px solid #1a1927;
    color: #3dcca6;
  }

  /*endregion*/

  /*region blackBg*/

  .blackBg .content{
    background-color: #333840;
  }
  .blackBg .expandBtn{
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-left:16px solid #333840;
    color: #61b5fd;
  }

  /*endregion*/
</style>
