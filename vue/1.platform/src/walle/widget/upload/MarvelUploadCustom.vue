<template>
  <div>
    <div v-on:click="onClick">
      <slot></slot>
    </div>
    <input v-show="false" type="file" @change="onSelectFile"/>
  </div>
</template>

<script>

  export default {
    name: "MarvelUploadCustom",
    components: {},
    props: ["btnTitle", "icon"],
    data() {
      return {}
    },
    methods: {
      //region inner
      onClick() {
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
