<template>
  <div class="uploadWrapper">
    <input class="uploadFile" type="file" v-on:change="onSelectFileBtnClick">
    <input class="uploadFileName" readonly="readonly" disabled type="text"
           :placeholder="placeHolder" :value="fileName">
    <span class="uploadFileSelectBtn">...</span>
  </div>
  <!--<button class="" v-on:click="onUploadBtnClick">{{ label }}</button>-->
</template>

<script>
  export default {
    name: 'MarvelUpload',
    props: [ "placeHolder"],
    data: function() {
        return {
          file: undefined,
          fileName: ""
        }
    },
    methods: {
      onSelectFileBtnClick: function(evt){
        this.file = evt.target.files[0];
        this.fileName = this.file.name;
        this.$emit("onSelectFileBtnClick",this.file);
      },
      getFile: function(){
          return this.file;
      },
      clearCache:function(){
        this.file = undefined;
        this.fileName = "";
      }
    }
  }
</script>

<style scoped>
.uploadWrapper{
  width: 100%;
  height: 32px;
  border:1px solid #cccccc;
  box-sizing: border-box;
  position: relative;
  border-radius: 2px;
}
  .uploadWrapper .uploadFile{
    position: absolute;
    top:0;
    left: 0;
    width:100%;
    height:30px;
    border: none;
    background-color: transparent;
    opacity:0;
    z-index: 1;
    cursor: pointer;
  }
  .uploadWrapper .uploadFileName{
    position: absolute;
    top:0;
    left: 0;
    width: calc(100% - 30px);
    height: 30px;
    border: none;
    background-color: transparent;
    padding: 0 10px;
    box-sizing: border-box;
    color: #666;
  }

  .uploadWrapper .uploadFileSelectBtn{
    width: 30px;
    height:30px;
    top:0;
    right: 0;
    position: absolute;
    line-height: 18px;
    text-align: center;
    color: #777;
  }

  /*region dark theme*/

  .dark .uploadWrapper{
    border:1px solid #8b90b3;
  }
  .dark .uploadFile{
  }
  .dark .uploadFileName{
    color: #8b90b3;
  }

  .dark .uploadFileSelectBtn{
    color: #8b90b3;
  }

  /*region dark theme*/

</style>
