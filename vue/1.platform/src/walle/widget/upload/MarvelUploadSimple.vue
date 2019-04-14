<template>
  <div>
    <marvel-icon-txt-button :size="btnSize"
                            :label="btnName"
                            :icon="btnIcon"
                            :isWarn="false"
                            v-on:onClick="onClickBtn"></marvel-icon-txt-button>
    <input v-show="false" type="file" @change="onSelectFile"/>
  </div>
</template>

<script>
  import MarvelIconTxtButton from "@/walle/widget/button/MarvelIconTxtButton"

  export default {
    name: "MarvelUploadSimple",
    components: {
      MarvelIconTxtButton
    },
    props: {
      btnSize: {
        type: String,
        default: "normal"
      },
      btnIcon: {
        type: String,
        default: "icon-upload2"
      },
      btnName: {
        type: String
      }
    },
    data() {
      return {}
    },
    methods: {
      //region inner
      onClickBtn() {
        let elements = this.$el.getElementsByTagName("input");
        if (elements.length) {
          elements[0].click();
        }
      },
      onSelectFile(oEvent) {
        let arrFile = oEvent.target.files;
        if (arrFile.length) {
          let oFile = arrFile[0];
          this._clearFileVaule();
          this.$emit("onUploadFile", oFile);
        }
      },
      _clearFileVaule() {
        let elements = this.$el.getElementsByTagName("input");
        if (elements.length) {
          elements[0].value = "";
        }
      }
      //endregion
    }
  }
</script>

<style scoped>

</style>
