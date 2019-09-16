<template>
  <marvel-dialog :show-dialog="showDialog"
                 :title="$t('column_config')"
                 :width="550" :height="450"
                 v-on:onClickDialogClose="_closeDialog">
    <div slot="dialogCont" v-if="showDialog">
      <div style="height: 300px;">
        <marvel-bidirectional-select :options="bidirectional"
                                     ref="doubleSelect">
        </marvel-bidirectional-select>
      </div>
    </div>
    <div slot="dialogFoot">
      <marvel-button :label="$t('showHide_Ok')"
                     v-on:onClick="_onClickDialogOk">
      </marvel-button>
      <marvel-button :label="$t('showHide_Cancel')"
                     v-on:onClick="_closeDialog">
      </marvel-button>
    </div>
  </marvel-dialog>
</template>

<i18n>
  {
  "en": {
  "leftTitle": "To be selected",
  "rightTitle": "Already selected",
  "column_config": "Select column to dispaly",
  "showHide_Ok": "OK",
  "showHide_Cancel": "Cancel"
  },
  "zh": {
  "leftTitle": "备选项",
  "rightTitle": "已选项",
  "column_config": "选择显示的列",
  "showHide_Ok": "确认",
  "showHide_Cancel": "取消"
  }
  }
</i18n>

<script>
  import MarvelDialog from "../dialog/MarvelDialog";
  import MarvelBidirectionalSelect from "../select/MarvelBidirectionalSelect";
  import MarvelButton from "../button/MarvelButton";

  /**
   *  MarvelTableColumnConfig widget description
   *  @vuedoc
   *  @exports MarvelTableColumnConfig
   */
  export default {
    components: {MarvelButton, MarvelBidirectionalSelect, MarvelDialog},
    name: 'MarvelTableColumnConfig',
    props: [],
    data: function () {
      return {
        //#region dialog
        showDialog: false,
        //#endregion
        //region bidirectional
        bidirectional: {
          id: "bidirectionalSelectTest",
          leftTitle: this.$t('leftTitle'),
          rightTitle: this.$t('rightTitle'),
          items: []
        },
        //#endregion
      }
    },
    mounted: function () {
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function (oData) {
        this.bidirectional.items = oData;
      },

      //#endregion

      //#region dialog

      _onClickDialogOk: function () {
        let newData = this.bidirectional.items;
        this.callback4HandleTblDataToShow(newData);
        this._closeDialog();
      },

      _closeDialog: function () {
        this.showDialog = false;
      },

      //#endregion

      //#endregion
      //#region callback

      callback4HandleTblDataToShow: function (oNewData) {
        this.$emit("handleTblDataToShow", oNewData);
      },

      //#endregion
      //#region 3rd

      init: function (oData) {
        this._initEx(oData);
        this.showDialog = true;
      }

      //#endregion
    },
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
