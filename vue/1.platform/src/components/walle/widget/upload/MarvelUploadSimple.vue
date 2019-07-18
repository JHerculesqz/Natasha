<template>
  <div>
    <marvel-icon-txt-button :size="btnSize"
                            :label="btnName"
                            :icon="btnIcon"
                            :isWarn="false"
                            v-on:onClick="onClickBtn"></marvel-icon-txt-button>
    <input v-show="false" type="file" :multiple="isMulti? 'multiple' : undefined" @change="onSelectFile"/>
  </div>
</template>

<script>
  import MarvelIconTxtButton from "../button/MarvelIconTxtButton"

  /**
   *  MarvelUploadSimple widget description
   *  @vuedoc
   *  @exports MarvelUploadSimple
   */
  export default {
    name: "MarvelUploadSimple",
    components: {
      MarvelIconTxtButton
    },
    props: {
      btnSize: {
        type: String,
        default: "normal",
        required: false,
      },
      btnIcon: {
        type: String,
        default: "icon-upload2",
        required: false,
      },
      btnName: {
        type: String,
        default: "Upload",
        required: false,
      },
      isMulti: {
        type: Boolean,
        default: false,
        required: false,
      }
    },
    data() {
      return {}
    },
    methods: {
      //#region inner

      onClickBtn() {
        this._clearFileVaule();
        let elements = this.$el.getElementsByTagName("input");
        if (elements.length) {
          elements[0].click();
        }
      },
      onSelectFile(oEvent) {
        let arrFile = oEvent.target.files;
        if (arrFile.length) {
          var oFile;
          if (this.isMulti) {
            oFile = arrFile;
          } else {
            oFile = arrFile[0];
          }
          this.callback4OnUploadFile(oFile);
        }
      },
      _clearFileVaule() {
        let elements = this.$el.getElementsByTagName("input");
        if (elements.length) {
          elements[0].value = "";
        }
      },

      //#endregion
      //#region callback

      callback4OnUploadFile: function (oFile) {
        this.$emit("onUploadFile", oFile);
      },

      //#endregion
      //#region 3rd
      //#endregion
    }
  }
</script>

<style scoped>

</style>
