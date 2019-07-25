<template>
  <div class="ObjLstCreateDialogWrapper">
    <marvel-dialog :showDialog="showDialog" ref="ObjLstCreateDialog"
                   title="上传" :width=500 :height=380 :dragable=true
                   v-on:onClickDialogClose="_onClickDialogClose">
      <div slot="dialogCont" style="height: 100%;">

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
  import MarvelDialog from '~~/widget/dialog/MarvelDialog';

  export default {
    name: "ObjLstBatchCreateDialog",
    components: {
      MarvelDialog,
      MarvelButton
    },
    data(){
      return{
        showDialog:false,
        contItems:[{
          type:"input",
          key:"contItems_index1",
          name:"XXX名称"
        },{
          type:"input",
          key:"contItems_index2",
          name:"XXX"
        },{
          type:"dropdown",
          key:"contItems_index3",
          name:"XXX",
          dropItems:[{
            label:"Option1",
            title:"Option1",
            active:true,
          },{
            label:"Option2",
            title:"Option2",
          },{
            label:"Option3",
            title:"Option3",
          }]
        },{
          type:"input",
          key:"contItems_index4",
          name:"XXX"
        },{
          type:"input",
          key:"contItems_index5",
          name:"XXX"
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
