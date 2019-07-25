<template>
  <div id="app">
    <router-view></router-view>
    <marvel-loading-icon-public ref="loading"></marvel-loading-icon-public>
    <marvel-confirm-ex :showConfirm="showConfirmEx"
                       :showOkBtn="showOkBtn4ConfirmEx"
                       :showCancelBtn="showCancelBtn4ConfirmEx"
                       :confirmTitle="confirmTitle4ConfirmEx"
                       :confirmIcon="confirmIcon4ConfirmEx"
                       :confirmIconColor="confirmIconColor4ConfirmEx"
                       :confirmSubTitle="confirmSubTitle4ConfirmEx"
                       :confirmCont="confirmExContent4ConfirmEx"
                       v-on:onClickOK="_onConfirmExOk"
                       v-on:onClickCancel="_onConfirmExCancel"></marvel-confirm-ex>
    <marvel-prompt-global :oPrompts="globalPrompt" :disposeTimeOut="disposeTimeOut"></marvel-prompt-global>
  </div>
</template>

<script>
  import Bus from "~~/core/bus";
  import MarvelLoadingIconPublic from "~~/widget/loading/MarvelLoadingIconPublic";
  import MarvelConfirmEx from "~~/widget/dialog/MarvelConfirmEx";
  import MarvelPromptGlobal from "~~/widget/prompt/MarvelPromptGlobal";
  export default {
    components:{
      MarvelLoadingIconPublic,
      MarvelConfirmEx,
      MarvelPromptGlobal,
    },
    name: 'app',
    data: function () {
      return {
        //#region confirmEx
        showConfirmEx: false,
        showOkBtn4ConfirmEx: true,
        showCancelBtn4ConfirmEx: true,
        confirmTitle4ConfirmEx: "",
        confirmIcon4ConfirmEx: "icon-cancel-circle",
        confirmIconColor4ConfirmEx: "#ff4040",
        confirmSubTitle4ConfirmEx: "Operation Failed",
        confirmExContent4ConfirmEx: [],
        funOnConfirmExOk:undefined,
        funOnConfirmExCancel:undefined,
        //#endregion
        //#region prompt
        globalPrompt:[],
        disposeTimeOut:3000,
        //#endregion
      }
    },
    mounted: function () {
      //#region custom
      this._initEx();
      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        //事件监听
        Bus.$on('msg', (e, params) => {
          if(e == "show-loading"){
            var key = params;
            this.$refs.loading.imsgMarvelLoadingPublicShow(key);
          }
          else if(e == "hide-loading"){
            var key = params;
            this.$refs.loading.imsgMarvelLoadingPublicHide(key);
          }
          else if(e == "show-confirmEx"){
            this._showConfirmEx(params)
          }
          else if(e == "add-prompt"){
            this._addPrompt(params)
          }
        })
      },

      //#endregion

      //#region confirmEx

      _showConfirmEx: function (oParams) {
        this.showConfirmEx = true;
        this.showOkBtn4ConfirmEx = oParams.showOkButton;
        this.showCancelBtn4ConfirmEx = oParams.showCancelBtn;
        this.confirmTitle4ConfirmEx = oParams.confirmTitle;
        this.confirmIcon4ConfirmEx = oParams.confirmIcon;
        this.confirmIconColor4ConfirmEx = oParams.confirmIconColor;
        this.confirmSubTitle4ConfirmEx = oParams.confirmSubTitle;
        this.confirmExContent4ConfirmEx = oParams.confirmCont;
        this.funOnConfirmExOk = oParams.oAfterOk;
        this.funOnConfirmExCancel = oParams.oAfterCancel;
      },

      _onConfirmExOk: function() {
        this.showConfirmEx = false;
        this.funOnConfirmExOk();
      },

      _onConfirmExCancel: function(){
        this.showConfirmEx = false;
        this.funOnConfirmExCancel();
      },

      //#endregion

      //#region prompt

      _addPrompt: function (oParams) {
        this.globalPrompt.push(oParams);
      },

      //#endregion

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd
      //#endregion
    }
  }
</script>

<style>

  *{
    font-family: "Microsoft YaHei", 'arial', sans-serif;
  }
  ::-webkit-scrollbar{
    width: 8px;
    height: 8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #808080;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Tahoma, Arial, Roboto, ”Droid Sans”, ”Helvetica Neue”, ”Droid Sans Fallback”, ”Heiti SC”, sans-self;
  }

  #app {
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .promptGlobalContainer{
    top: 70px;
    width: 800px;
    left: calc(50% - 400px);
    bottom: auto !important;
    right: auto !important;
  }

  .promptContainer{
    width: 100% !important;
  }
</style>
