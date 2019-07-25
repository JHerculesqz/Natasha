<template>
  <div class="panel" :id="domId"></div>
</template>

<script>
  import "natasha-devpanelex/css/MarvelRackPanel.css";

  require('natasha-devpanelex/lib/jquery-3.2.1.min.js');
  require('natasha-devpanelex/lib/svg.min.js');
  require('natasha-devpanelex/lib/saveSvgAsPng.js');
  require('natasha-devpanelex/lib/html2canvas.min.js');
  require('natasha-devpanelex/js/MarvelRackPanel.js');
  require('natasha-devpanelex/js/MarvelRackCabinet.js');

  /**
   *  MarvelDevPanelEx widget description
   *  @vuedoc
   *  @exports MarvelDevPanelEx
   */
  export default {
    name: "MarvelDevPanelEx",
    props: {
      domId: {
        type: String,
        default: "",
        required: true,
      }
    },
    data() {
      return {
        devPanelObj: undefined
      };
    },
    mounted() {
      this.devPanelObj = new $.MarvelRackCabinet();
    },
    methods: {
      //region inner
      //endregion
      //region callback

      _callbackOnClick(strBuObjId, strSubBuObjId, evt) {
        this.$emit("callbackOnClick", strBuObjId, strSubBuObjId, evt);
      },
      _callbackOnContextmenu(strBuObjId, strSubBuObjId, evt) {
        this.$emit("callbackOnContextmenu", strBuObjId, strSubBuObjId, evt);
      },
      _callbackOndblclick(strBuObjId, strSubBuObjId, evt) {
        this.$emit("callbackOndblclick", strBuObjId, strSubBuObjId, evt);
      },

      //endregion
      //region 3rd

      init(oOptions, callback) {
        let options = Object.assign({
          id: this.domId,
          buObjId: "",
          imgUrl: "",
          subBuObjIds: []
        }, oOptions);

        let oEventOptions = {
          callbackOnClick: (strBuObjId, strSubBuObjId, evt) => {
            this._callbackOnClick(strBuObjId, strSubBuObjId, evt);
          },
          callbackOnContextmenu: (strBuObjId, strSubBuObjId, evt) => {
            this._callbackOnContextmenu(strBuObjId, strSubBuObjId, evt);
          },
          callbackOndblclick: (strBuObjId, strSubBuObjId, evt) => {
            this._callbackOndblclick(strBuObjId, strSubBuObjId, evt);
          }
        };

        this.devPanelObj.init(options, oEventOptions, callback);
      },
      addNode(strSlotId, oBuObj, oAfterCallback, oEventCallback) {
        this.devPanelObj.addNode(strSlotId, oBuObj, oAfterCallback, oEventCallback);
      },
      removeNode(strSlotId) {
        this.devPanelObj.removeNode(strSlotId);
      },
      addMainNode(strSlotId, oBuObj, oAfterCallback, oEventCallback) {
        this.devPanelObj.addMainNode(strSlotId, oBuObj, oAfterCallback, oEventCallback);
      },
      addSubNode(strFirstSlotId, strSecondSlotId, oBuObj, oAfterCallback, oEventCallback) {
        this.devPanelObj.addSubNode(strFirstSlotId, strSecondSlotId, oBuObj, oAfterCallback, oEventCallback);
      },
      removeSubNode(strFirstSlotId, strSecondSlotId) {
        this.devPanelObj.removeSubNode(strFirstSlotId, strSecondSlotId);
      },
      setActiveStyle(...args) {
        this.devPanelObj.setActiveStyle.call(this.devPanelObj, args);
      },
      removeAllActiveStyle() {
        this.devPanelObj.removeAllActiveStyle();
      },
      exportPng(strPicName, oOptions) {
        this.devPanelObj.exportPng(strPicName, oOptions);
      },
      setDisabledStyle(strSlotId) {
        this.devPanelObj.setDisabledStyle(strSlotId);
      },
      removeAllDisabledStyle() {
        this.devPanelObj.removeAllDisabledStyle();
      },
      addNoPictureColor(strSlotId) {
        this.devPanelObj.addNoPictureColor(strSlotId);
      },
      getSVGDataUrl(callback) {
        this.devPanelObj.getSVGDataUrl(callback);
      },

      //endregion
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
  .panel {
    width: 100%;
    height: 100%;
  }
</style>
