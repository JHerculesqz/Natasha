<template>
  <div class="mainContainer">
    <div class="searchButton">
      <marvel-button id="mggaiy" :label="labelHead" :icon="icon4PanelShow" iconPos="right"
                     v-on:onClick="onClickShowPanel"></marvel-button>
    </div>
    <div class="searchContainer" v-bind:style="getPos4SearchPanel()" v-if="bShowPanel">
      <div class="searchArea" v-for="(item, index) in searchItems">
        <span class="searchLabel">{{item.label}}:</span>
        <div class="searchMsg" style="width:150px" v-if="item.type == 'input'">
          <marvel-input :ref="'inputEx' + index"></marvel-input>
        </div>
        <div class="searchMsg" v-if="item.type=='dropdown'">
          <marvel-drop-down-button width="150px" :ref="'dropDownEx' + index"
                                   :dropDownItems="item.value"></marvel-drop-down-button>
        </div>
      </div>
      <div class="search">
        <marvel-button :label="labelFoot" :icon="icon4Search" iconPos="right"
                       v-on:onClick="onClickSearch"></marvel-button>
      </div>
    </div>
  </div>
</template>

<script>
  import MarvelButton from "../btn/MarvelButton.vue";
  import MarvelInput from "../input/MarvelInput.vue";
  import MarvelDropDownButton from "../button/MarvelDropDownButton.vue";

  /**
   *  MarvelSearchAdvance widget description
   *  @vuedoc
   *  @exports MarvelSearchAdvance
   */
  export default {
    name: "MarvelSearchAdvance",
    components: {
      MarvelButton,
      MarvelInput,
      MarvelDropDownButton,
    },
    props: {
      labelHead: {
        type: String,
        default: "Advanced Search",
        required: false,
      },
      width: {
        type: Number,
        default: 800,
        required: false,
      },
      height: {
        type: Number,
        default: 200,
        required: false,
      },
      position: {
        type: String,
        default: "left",
        required: false,
      },
      searchItems: {
        type: Array,
        default: undefined,
        required: true,
      },
      labelFoot: {
        type: String,
        default: "Search",
        required: false,
      }
    },
    data: function () {
      return {
        icon4PanelShow: 'icon-marvelIcon-03',
        bShowPanel: false,
        icon4Search: "icon-search"
      }
    },
    methods: {
      //#region inner

      onClickShowPanel: function (icon) {
        if (icon == 'icon-marvelIcon-03') {
          this.icon4PanelShow = 'icon-marvelIcon-01';
          this.bShowPanel = true;
          this.callback4OnClickAdvancedSearch(true);
        } else {
          this.icon4PanelShow = 'icon-marvelIcon-03';
          this.bShowPanel = false;
          this.callback4OnClickAdvancedSearch(false);
        }
      },
      onClickSearch: function () {
        var oRes = {};
        for (var i = 0; i < this.searchItems.length; i++) {
          var oSearchItem = this.searchItems[i];
          var oResItem = {};
          if (oSearchItem.type == 'input') {
            var strRef = "inputEx" + i;
            oResItem[oSearchItem.label] = this.$refs[strRef][0].getInputMsg();
          } else if (oSearchItem.type == 'dropdown') {
            var strRef = "dropDownEx" + i;
            oResItem[oSearchItem.label] = this.$refs[strRef][0].getSelectItem();
          }
          oRes = Object.assign({}, oRes, oResItem)
        }
        this.callback4OnClickSearch(oRes, (isCollapse) => {
          if (isCollapse) {
            this.bShowPanel = false;
            this.icon4PanelShow = 'icon-marvelIcon-03';
          }
        });
      },
      getPos4SearchPanel: function () {
        var oRes = {
          width: this.width + "px",
          height: this.height + "px",
        };
        if (this.position == "right") {
          oRes["right"] = "0px";
        } else if (this.position == "left") {
          oRes["left"] = "0px";
        }
        return oRes;
      },


      //#endregion
      //#region callback

      callback4OnClickAdvancedSearch: function (bIsShow) {
        this.$emit('onClickAdvancedSearch', bIsShow);
      },
      callback4OnClickSearch: function (oRes, oIsCollapse) {
        this.$emit('onClickSearch', oRes, oIsCollapse);
      }

      //#endregion
      //#region 3rd
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
  .mainContainer {
    clear: both;
    position: relative;
  }

  .searchContainer {
    border: 1px solid #cccccc;
    margin-top: 5px;
    position: absolute;
  }

  .searchArea {
    display: inline-block;
    margin: 20px 10px 0 10px;
  }

  .searchLabel {
    line-height: 30px;
  }

  .searchMsg {
    float: right;
  }

  .search {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

</style>
