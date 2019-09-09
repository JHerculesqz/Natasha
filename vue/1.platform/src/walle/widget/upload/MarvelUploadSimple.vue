<template>
  <div>
    <marvel-icon-txt-button :ref="id4Btn"
                            :size="btnSize"
                            :label="btnName"
                            :icon="btnIcon"
                            :isWarn="false"
                            v-on:onClick="onClickBtn"></marvel-icon-txt-button>
    <input v-show="false" type="file" :multiple="isMulti? 'multiple' : undefined" @change="onSelectFile"/>
  </div>
</template>

<script>
  import MarvelIconTxtButton from "../button/MarvelIconTxtButton"
  import StringUtilsEx from '../../component/str'

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
      return {
        id4Btn:StringUtilsEx.uuid(),
      }
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

      setBtnDisable: function (bIsDisable) {
        this.$refs[this.id4Btn].setBtnDisable(bIsDisable);
      }

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
