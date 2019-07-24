<template>
  <div class="ObjLstCreateDialogWrapper">
    <marvel-dialog :showDialog="showDialog" ref="ObjLstCreateDialog"
                   title="创建" :width=500 :height=380 :dragable=true
                   v-on:onClickDialogClose="_onClickDialogClose">
      <div slot="dialogCont" style="height: 100%;">
        <obj-lst-create-dialog-cont ref="ObjLstCreateDialogCont" :contItems="contItems"></obj-lst-create-dialog-cont>
      </div>
      <div slot="dialogFoot">
        <marvel-button ref="confirmToCreate" label="新建"
                       v-on:onClick="_onCreate"></marvel-button>
        <marvel-button ref="cancel" label="取消"
                       v-on:onClick="_onClickDialogClose"></marvel-button>
      </div>
    </marvel-dialog>
  </div>
</template>

<script>
  import MarvelButton from '~~/widget/button/MarvelButton';
  import ObjLstCreateDialogCont from "./ObjLstCreateDialogCont";
  import MarvelDialog from '~~/widget/dialog/MarvelDialog';

  export default {
    name: "ObjLstCreateDialog",
    components: {
      ObjLstCreateDialogCont,
      MarvelDialog,
      MarvelButton
    },
    data(){
      return{
        showDialog:false,
        contItems:[{
          type:"input",
          key:"contItems_index1",
          name:"网元名称"
        },{
          type:"input",
          key:"contItems_index2",
          name:"网元IP"
        },{
          type:"dropdown",
          key:"contItems_index3",
          name:"网元类型",
          dropItems:[{
            label:"OptiX PTN 990",
            title:"OptiX PTN 990",
            active:true,
          },{
            label:"OptiX PTN 880",
            title:"OptiX PTN 880",
          },{
            label:"OptiX PTN 770",
            title:"OptiX PTN 770",
          }]
        },{
          type:"input",
          key:"contItems_index4",
          name:"调整前LSRID"
        },{
          type:"input",
          key:"contItems_index5",
          name:"调整后LSRID"
        },]
      }
    },
    methods:{
      //#region inner

      _onClickDialogClose: function () {
        this.showDialog = false;
      },
      _onCreate: function () {
        var oCreatOption = this.$refs.ObjLstCreateDialogCont.getValue();
        this.showDialog = false;
        this.callback4OnCreate(oCreatOption);
      },

      //#endregion
      //#region callback

      callback4OnCreate:function (oOptions) {
        this.$emit("onCreate", oOptions);
      },

      //#endregion
      //#region 3rd
      
      toShowDialog: function () {
        this.showDialog = true;
      }
      
      //#endregion
    },
  }
</script>

<style scoped>

</style>
