<template>
  <div class="marvelGridPriorityWrapper">
    <div class="priorityLeftPart">
      <div class="priorityTitle">
        <div class="priorityItemIndex">{{col1Title}}</div>
        <div class="priorityItemName">{{col2Title}}</div></div>
      <div class="priorityItem"
           v-for="(item, index) in list"
           v-on:click="onClickItem(item, index)"
           v-bind:class="{isSelected:currentSelectItemIndex == index}">
        <div class="priorityItemIndex">{{index + 1}}</div>
        <div class="priorityItemName">{{item.name}}</div>
      </div>
    </div>
    <div class="priorityRightPart">
      <div class="changePriorityBtns">
        <div class="changePriorityBtn icon-marvelIcon-05" v-on:click="onClickToFirst"></div>
        <div class="changePriorityBtn icon-marvelIcon-22" v-on:click="onClickUp"></div>
        <div class="changePriorityBtn icon-marvelIcon-24" v-on:click="onClickDown"></div>
        <div class="changePriorityBtn icon-marvelIcon-07" v-on:click="onClickToLast"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    name: 'MarvelGridPriority',
    props: ["col1Title", "col2Title", "list"],
    data: function () {
      return {
        currentSelectItemIndex:0
      }
    },
    methods: {
      //#region inner

      //#endregion
      //#region callback
      onClickItem: function (oItem, index) {
        this.currentSelectItemIndex = index;
      },
      onClickToFirst: function () {
        for(;;){
          if(this.list[this.currentSelectItemIndex-1]){
            this.onClickUp();
          }else{
            break;
          }
        }
      },
      onClickUp: function () {
        if(this.list[this.currentSelectItemIndex-1]){
          var oTemporaryListItemName = this.list[this.currentSelectItemIndex-1].name;
          this.list[this.currentSelectItemIndex-1].name = this.list[this.currentSelectItemIndex].name;
          this.list[this.currentSelectItemIndex].name = oTemporaryListItemName;

          var oTemporaryListItemId = this.list[this.currentSelectItemIndex-1].id;
          this.list[this.currentSelectItemIndex-1].id = this.list[this.currentSelectItemIndex].id;
          this.list[this.currentSelectItemIndex].id = oTemporaryListItemId;

          this.currentSelectItemIndex = this.currentSelectItemIndex - 1;
        }
      },
      onClickDown: function () {
        if(this.list[this.currentSelectItemIndex+1]){
          var oTemporaryListItemName = this.list[this.currentSelectItemIndex+1].name;
          this.list[this.currentSelectItemIndex+1].name = this.list[this.currentSelectItemIndex].name;
          this.list[this.currentSelectItemIndex].name = oTemporaryListItemName;

          var oTemporaryListItemId = this.list[this.currentSelectItemIndex+1].id;
          this.list[this.currentSelectItemIndex+1].id = this.list[this.currentSelectItemIndex].id;
          this.list[this.currentSelectItemIndex].id = oTemporaryListItemId;

          this.currentSelectItemIndex = this.currentSelectItemIndex + 1;
        }
      },
      onClickToLast: function () {
        for(;;){
          if(this.list[this.currentSelectItemIndex+1]){
            this.onClickDown();
          }else{
            break;
          }
        }
      }
      //#endregion
      //#region 3rd

      //#endregion
    }
  }
</script>

<style scoped>

  .marvelGridPriorityWrapper{
    width: 100%;
    height: 100%;
    border: 1px solid #d5d5d5;
    background-color: #ffffff;
    box-sizing: border-box;
  }
  .priorityLeftPart{
    width: calc(100% - 46px);
    height: 100%;
    float: left;
    border-right: 1px solid #d5d5d5;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .priorityTitle{
    height: 32px;
    border-bottom: 1px dashed #d5d5d5;
    background-color: #f0f0f0;
  }
  .priorityTitle .priorityItemIndex,.priorityTitle .priorityItemName{
    color: #4d4d4d;
  }
  .priorityItem{
    height: 32px;
    border-bottom: 1px dashed #d5d5d5;
  }
  .priorityItemIndex{
    width: 240px;
    height: 100%;
    float: left;
    border-right: 1px dashed #d5d5d5;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 32px;
    font-size: 14px;
    color: #666666;
  }
  .priorityItemName{
    width: calc(100% - 242px);
    height: 100%;
    float: left;
    padding: 0 10px;
    box-sizing: border-box;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 32px;
    font-size: 14px;
    color: #666666;
    text-align: center;
  }

  .isSelected{
    background-color: #3399ff;
  }
  .isSelected .priorityItemIndex{color: #ffffff;}
  .isSelected .priorityItemName{color: #ffffff;}

  .priorityRightPart{
    width: 46px;
    float: left;
    height: 100%;
  }

  .changePriorityBtns{
    height: 184px;
    position: relative;
    top: 50%;
    margin-top: -92px;
    padding: 0 10px;
    box-sizing: border-box;
  }

  .changePriorityBtn{
    height: 26px;
    text-align: center;
    border-radius: 100%;
    background-color: #3399ff;
    font-size: 12px;
    line-height: 26px;
    color: #ffffff;
    margin: 16px 0;
    cursor: pointer;
  }

  /*region dark theme*/

  .dark .marvelGridPriorityWrapper{
    border: 1px solid #8b90b3;
    background-color: #1e1f36;
  }
  .dark .priorityLeftPart{
    border-right: 1px solid #8b90b3;
  }
  .dark .priorityTitle{
    border-bottom: 1px dashed #8b90b3;
    background-color: #2a3255;
  }
  .dark .priorityTitle .priorityItemIndex,.dark .priorityTitle .priorityItemName{
    color: #ffffff;
  }
  .dark .priorityItem{
    border-bottom: 1px dashed #8b90b3;
  }
  .dark .priorityItemIndex{
    border-right: 1px dashed #8b90b3;
    color: #8b90b3;
  }
  .dark .priorityItemName{
    color: #8b90b3;
  }

  .dark .isSelected{
    background-color: #3dcca6;
  }
  .dark .isSelected .priorityItemIndex{color: #ffffff;}
  .dark .isSelected .priorityItemName{color: #ffffff;}

  .dark .changePriorityBtn{
    background-color: #3dcca6;
    color: #ffffff;
  }

  /*endregion*/
</style>
