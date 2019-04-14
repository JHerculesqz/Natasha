<template>
  <div class="tipDialogBg" v-show="showConfirm">
    <div class="tipDialogWrapper">
      <div class="tipDialogTitleArea">
        <div class="titleName">Confirm</div>
        <div class="closeBtn icon-marvelIcon-20"
             v-on:click="onClickCancel"></div>
      </div>
      <div class="tipDialogContArea">
        <div class="leftMessageIcon icon-cancel-circle" v-if="tipType == 'error'" ></div>
        <div class="leftMessageIcon icon-notification" v-else-if="tipType == 'warning'" ></div>
        <div class="leftMessageIcon icon-question" v-else="tipType == 'tip'" ></div>
        <div class="rightMessageCont">
          <div class="MessageTitle errorTitle" v-if="tipType == 'error'">Error</div>
          <div class="MessageTitle warningTitle" v-else-if="tipType == 'warning'">Warning</div>
          <div class="MessageTitle tipTitle" v-else="tipType == 'tip'" >Tip</div>
          <div name="dialogCont" class="customContArea">{{confirmCont}}</div>
        </div>
      </div>
      <div class="tipDialogBtnArea">
        <marvel-icon-txt-button :label="$t('marvelConfirm_confirm')" icon="icon-checkmark"
                                v-on:onClick="onClickOK"></marvel-icon-txt-button>
        <marvel-icon-txt-button :label="$t('marvelConfirm_cancel')" icon="icon-cross"
                                v-on:onClick="onClickCancel"></marvel-icon-txt-button>
      </div>
    </div>
  </div>
</template>

<i18n>
  {
  "en": {
  "marvelConfirm_confirm": "OK",
  "marvelConfirm_cancel": "Cancel"
  },
  "zh": {
  "marvelConfirm_confirm": "确定",
  "marvelConfirm_cancel": "取消"
  }
  }
</i18n>

<script>
  import MarvelIconTxtButton from "../button/MarvelIconTxtButton";

  export default {
    components: {MarvelIconTxtButton},
    name: 'MarvelConfirmDialog',
    props: ["showConfirm","tipType", "confirmCont"],
    data: function() {
        return {

        }
    },
    methods: {
      onClickOK: function () {
        this.$emit("onClickOK");
      },
      onClickCancel: function(){
        this.$emit("onClickCancel");
      }
    }
  }
</script>

<style scoped>
  .tipDialogBg{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 3000;
    background-color: rgba(0,0,0,0.2);
  }
  .tipDialogBg .tipDialogWrapper{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 420px;
    height: 212px;
    margin-top: -140px;
    margin-left: -106px;
    border-radius: 2px;
    box-shadow: 0 0 30px 2px rgba(0,0,0,0.2);
    pointer-events: auto;
    background-color: #ffffff;
  }
  .tipDialogBg .tipDialogWrapper .tipDialogTitleArea{
    height: 52px;
    width: 100%;
    clear: both;
  }
  .tipDialogTitleArea .titleName:before{
    width: 3px;
    display: inline-block;
    content: "";
    background-color: #3399ff;
    height: 22px;
    margin-right: 30px;
  }
  .tipDialogTitleArea .titleName{
    height: 100%;
    float: left;
    padding-top: 30px;
    font-size: 24px;
    line-height: 24px;
    color: #333333;
    box-sizing: border-box;
    font-family: arial, "微软雅黑", sans-serif;
  }
  .tipDialogTitleArea .closeBtn{
    height: 100%;
    padding-top: 10px;
    margin-right: 10px;
    font-size: 10px;
    color: #777777;
    cursor:pointer;
    float: right;
    box-sizing: border-box;
  }
  .tipDialogBg .tipDialogWrapper .tipDialogContArea{
    padding: 20px 33px;
    width: 100%;
    height:calc(100% - 115px);
    box-sizing: border-box;
    clear: both;
    overflow: hidden;
  }
  .tipDialogBg .tipDialogWrapper .tipDialogContArea .leftMessageIcon{
    width: 45px;
    height: 45px;
    float: left;
    line-height: 45px;
    font-size: 45px;
  }
  .icon-cancel-circle{
    color: #ff4c4c;
  }
  .icon-notification{
    color: #ff8833;
  }
  .icon-question{
    color: #3dcca6;
  }
  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont{
    width: calc(100% - 45px);
    height: 100%;
    float: left;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .MessageTitle{
    font-size: 18px;
    line-height: 18px;
    margin-bottom: 10px;
  }
  .errorTitle{
    color: #ff4c4c;
  }
  .warningTitle{
    color: #ff8833;
  }
  .tipTitle{
    color: #3dcca6;
  }
  .tipDialogBg .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea{
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 6px;
    color: #666;
  }

  .tipDialogBg .tipDialogWrapper .tipDialogBtnArea{
    height: 63px;
    width: 100%;
    padding-top: 16px;
    box-sizing: border-box;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-color: #f5f5f5;
    position: relative;
    clear: both;
    text-align: center;
  }
  @media (max-width: 440px){
    .tipDialogBg .tipDialogWrapper{
      width: 90%;
      left: 5%;
      margin-left: 0px;
    }
  }

  /*region dark theme*/

  .dark .tipDialogBg{
    background-color: rgba(0,0,0,0.7);
  }
  .dark .tipDialogWrapper{
    box-shadow: 0 0 30px 2px rgba(0,0,0,0);
    background-color: #282746;
  }
  .dark .tipDialogWrapper .tipDialogTitleArea{}
  .dark .titleName:before{
    background-color: #02a888;
  }
  .dark .titleName{
    color: #8b90b3;
  }
  .dark .closeBtn{
    color: #8b90b3;
  }
  .dark .tipDialogWrapper .tipDialogContArea{}
  .dark .tipDialogWrapper .tipDialogContArea .rightMessageCont .customContArea{
    font-size: 14px;
    line-height: 14px;
    margin-bottom: 6px;
    color: #8b90b3;
  }
  .dark .tipDialogWrapper .tipDialogBtnArea{
    background-color: #1e1f36;
  }

  /*endregion*/

</style>
