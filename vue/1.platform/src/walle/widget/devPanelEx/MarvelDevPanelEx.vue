<template>
  <div class="panel" :id="domId"></div>
</template>

<script>
  export default {
    name: "MarvelDevPanelEx",
    props: {
      domId: String
    },
    data() {
      return {
        devPanelObj: undefined
      };
    },
    mounted() {
      this.devPanelObj = new window.$.MarvelRackPanel();
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
      //endregion

      //region 3rd
      init(oOptions) {
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
          }
        };

        this.devPanelObj.init(options, oEventOptions);
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
      }
      //endregion
    }
  }
</script>

<style scoped>
  .panel {
    width: 100%;
    height: 100%;
  }
</style>
