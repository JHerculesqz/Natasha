<template>
  <div class="ObjLstCreateDialogContWrapper">
    <div class="sessionArea" v-for="item in contItems">
      <div v-if="item.type == 'input'" class="sessionCont">
        <div class="labelArea" :title="item.name">{{item.name}}：</div>
        <div class="formItemArea">
          <marvel-input :ref="item.key"></marvel-input>
        </div>
      </div>
      <div v-else-if="item.type == 'dropdown'" class="sessionCont">
        <div class="labelArea" :title="item.name">{{item.name}}：</div>
        <div class="formItemArea">
          <marvel-drop-down-button :ref="item.key" :dropDownItems="item.dropItems" width="100%"></marvel-drop-down-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MarvelDropDownButton from '~~/widget/button/MarvelDropDownButton';
  import MarvelInput from '~~/widget/input/MarvelInput';
  export default {
    name: "ObjLstCreateDialogCont",
    components: {
      MarvelDropDownButton,
      MarvelInput
    },
    props:{
      contItems:{
        type: Array,
        default:undefined,
        required:true
      },
    },
    data(){
      return{

      }
    },
    methods:{
      //#region inner

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      getValue: function () {
        var oValues = {};
        for(var i = 0; i< this.contItems.length; i++){
          var oItem = this.contItems[i];
          if(oItem.type == 'input'){
            oValues[oItem.key]=this.$refs[oItem.key][0].getInputMsg();
          }else if(oItem.type == 'dropdown'){
            oValues[oItem.key]=this.$refs[oItem.key][0].getSelectItem();
          }
        }
        return oValues;
      }

      //#endregion
    },
  }
</script>

<style scoped>

  .ObjLstCreateDialogContWrapper{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .sessionArea{
    width: 100%;
    height: 50px;
  }

  .sessionCont{
    width: 100%;
    height: 100%;
  }

  .labelArea{
    width: 120px;
    float: left;
    height: 100%;
    font-size: 14px;
    color: #4d4d4d;
  }

  .formItemArea{
    width: calc(100% - 120px);
    float: left;
  }

</style>
