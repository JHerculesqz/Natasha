<template>
  <div class="panel">
    <div>自定义面板中的内容</div>
    <marvel-grid-ex ref="gridEx"
                    :titles="titleEx"
                    :rows="rowsEx"
                    :limit="15"
                    gridId="demoCustomer"
                    :canDrag="true"
                    :hasFoot="false"></marvel-grid-ex>
  </div>
</template>

<script>
  import MarvelGridEx from "^/widget/grid/MarvelGridEx";

  export default {
    name: 'CustomerGridComponent',
    components: {
      MarvelGridEx
    },
    props:{
      row:Array
    },
    data: function () {
      return {
        titleEx: [{
          label: "",
          key: "checkBox",
          type: "checkBox", //或者为 "checkBox"
          visible: true,
          width: "40px",
        }, {
          label: "name",
          key: "name",
          type: "text",
          visible: true,
          orderBy: true,
          search: true,
          width: "100px",
        }, {
          label: "描述信息",
          key: "description",
          type: "input",
          visible: true,
          orderBy: true,
          width: "200px"
        }, {
          label: "操作",
          key: "operation",
          type: "icon",
          visible: true,
          width: "200px"
        }, {
          label: "链接",
          key: "link",
          type: "textIcon",
          visible: true,
          width: "200px"
        }, {
          label: "配置项",
          key: "config",
          type: "dropdown",
          visible: true,
          width: "200px",
        }, {
          label: "node",
          key: "node",
          type: "multiDropdown",
          visible: true,
          width: "200px"
        }, {
          label: "自定义",
          key: "customer",
          type: "customer",
          visible: true,
          width: "200px"
        }],
        rowsEx:[],
        skipEx:0,
        limitEx:10
      }
    },
    mounted() {
      this.rowsEx.push(this.row)
    },
    methods:{
      getInfo(){
        return this.row;
      }
    }
  }
</script>

<style scoped>

  .panel{
    background-color: #ffffDf;
    padding: 10px;
  }

</style>
