<template>
  <iframe :id="id" :src="src"></iframe>
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
      return {}
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
      },

      //#endregion

      _setIFrameStyle4DemoPage: function () {
        $("#" + this.id).contents().find(".navbar").css('display', 'none');
        $("#" + this.id).contents().find(".details").css('display', 'none');
        $("#" + this.id).contents().find("footer").css('display', 'none');
        $("#" + this.id).contents().find("#toc").css('display', 'none');
        $("#" + this.id).contents().find("#toc-content").css('width', '100%');

        var iIFrameContentH = $("#" + this.id).contents().find("html").css('height');
        $("#" + this.id).css('height', iIFrameContentH);
      },

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      setIframe4DemoPage: function () {
        var self = this;
        var setIFrameInterval = setInterval(function () {
          if ($("#" + self.id).contents().find("#toc-content").length > 0) {
            self._setIFrameStyle4DemoPage();
            window.clearInterval(setIFrameInterval);
          }
        }, 100)
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
