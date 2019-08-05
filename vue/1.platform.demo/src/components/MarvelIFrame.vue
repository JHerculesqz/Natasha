<template>
  <div :id="id" style="width: 100%"></div>
</template>

<script>
  export default {
    name: 'MarvelIFrame',
    props: {
      id: {
        type: String,
        default: "IFrame",
        required: true,
      },
      src: {
        type: String,
        default: "",
        required: true,
      }
    },
    data: function () {
      return {
        oIframeId:undefined,
        oIframe:undefined,
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        this.oIframeId = this.id + "_iframe";
      },

      //#endregion

      _setIFrameStyle4DemoPage: function () {
        $("#" + this.oIframeId).contents().find(".navbar").css('display', 'none');
        $("#" + this.oIframeId).contents().find(".details").css('display', 'none');
        $("#" + this.oIframeId).contents().find("footer").css('display', 'none');
        $("#" + this.oIframeId).contents().find("#toc").css('display', 'none');
        $("#" + this.oIframeId).contents().find("#toc-content").css('width', '100%');

        $("#" + this.oIframeId).css({
          display:"block"
        });
        var iIFrameContentH = $("#" + this.oIframeId).contents().find("html").css('height');
        $("#" + this.oIframeId).css('height', iIFrameContentH);
      },

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      setIframe4DemoPage: function () {
        this.oIframe = document.createElement("iframe");
        this.oIframe.id = this.oIframeId;
        this.oIframe.src = this.src;
        var self = this;

        if (this.oIframe.attachEvent){
          this.oIframe.attachEvent("onload", function(){
            self._setIFrameStyle4DemoPage()
          });
        } else {
          this.oIframe.onload = function(){
            self._setIFrameStyle4DemoPage()
          };
        }

        $("#" + this.id).append(this.oIframe);
        $("#" + this.oIframeId).css({
          width:'100%',
          border:'none',
          display:"none"
        });
      },

      //#endregion
    }
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/

</style>
