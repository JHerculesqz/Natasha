<template>
  <div class="mainContainer">
    <div class="searchButton">
      <marvel-icon-txt-button id="mggaiy" :label="labelHead" ;icon="icon4PanelShow" iconPos="right"
                              v-on:onClick="onClickShowPanel"></marvel-icon-txt-button>
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
        <div class="search">
          <marvel-icon-txt-button :label="labelFoot" :icon="icon4Search" iconPos="right"
                                  v-on:onClick="onClickSearch"></marvel-icon-txt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MarvelIconTxtButton from "../../../walle/widget/button/MarvelIconTxtButton";
  import MarvelInput from "../../../walle/widget/input/MarvelInput";
  import MarvelDropDownButton from "../../../walle/widget/button/MarvelDropDownButton";

  /**
   *  MarvelSearchAdvance widget description
   *  @vuedoc
   *  @exports MarvelSearchAdvance
   */
  export default {
    name: "MarvelSearchAdvance",
    components: {
      MarvelDropDownButton,
      MarvelInput,
      MarvelIconTxtButton
    },
    props: {
      labelHead: {
        type: String,
        default: "Advance Search",
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
        required: true,
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
        if(icon == 'icon-marvel-03'){
          this.icon4PageShow = 'ico'
        }
      }
      
      //#endregion
      //#region callback
      //#endregion
      //#region 3rd
      //#endregion
    }
  }

</script>

<style scoped>
  .searchWrapper {
    height: 32px;
    width: 100%;
    position: relative;
    background-color: transparent;
  }

  .searchWrapper .searchInput {
    height: 100%;
    border: 1px solid #cccccc;
    width: 100%;
    float: left;
    padding: 0 70px 0 10px;
    outline: none;
    line-height: 30px;
    color: #333;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: 2px;
    background-color: transparent;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .searchWrapper .searchInput:hover {
    border: 1px solid #3399ff;
  }

  .searchWrapper .searchBtn {
    position: absolute;
    height: 30px;
    width: 40px;
    top: 0px;
    right: 0px;
    color: #777;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    cursor: pointer;
  }

  .searchWrapper .searchBtn:hover {
    color: #3399ff !important;
  }

  .searchWrapper .deleBtn {
    position: absolute;
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: #999;
    top: 3px;
    right: 40px;
    border-right: 1px solid #ccc;
    cursor: pointer;
  }

  .searchWrapper .deleBtn:hover {
    color: #3399ff;
  }

  .searchInputEx {
    height: 30px;
    box-sizing: border-box;
  }

  .searchInputEx .searchInput {
    border: none;
  }

  .searchInputEx .searchInput:hover {
    border: none;
  }

  .dpn {
    display: none
  }


  /*region dark theme*/
  .dark .searchWrapper .searchInput {
    border: 1px solid #8b90b3;
    color: #ffffff;
  }

  .dark .searchWrapper .searchInput:hover {
    border: 1px solid #3dcca6;
  }

  .dark .searchWrapper .searchBtn {
    color: #8b90b3;
  }

  .dark .searchWrapper .searchBtn:hover {
    color: #3dcca6 !important;
  }

  .dark .searchWrapper .deleBtn {
    color: #8b90b3;
    border-right: 1px solid #8b90b3;
  }

  .dark .searchWrapper .deleBtn:hover {
    color: #3dcca6;
  }

  .dark .searchInputEx .searchInput {
    border: none;
  }

  .dark .searchInputEx .searchInput:hover {
    border: none;
  }

  /*endregion*/
</style>
