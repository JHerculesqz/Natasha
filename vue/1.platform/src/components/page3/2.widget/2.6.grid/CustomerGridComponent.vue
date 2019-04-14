<template>
  <div class="panel">
    <div>自定义面板中的内容</div>
    <marvel-grid-ex ref="gridEx"
                    :titles="titlesEx"
                    :rows="rowsEx"
                    :limit="15"
                    gridId="demoCustomer"
                    :canDrag="true"
                    :hasFoot="false"></marvel-grid-ex>
  </div>
</template>

<script>
  import MarvelGridEx from "@/walle/widget/grid/MarvelGridEx";

  export default {
    name: "CustomerGridComponent",
    components: {
      MarvelGridEx
    },
    props: {
      row: Array
    },
    data() {
      return {
        //region gridEx
        titlesEx: [{
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
          width: "100px"
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
          width: "200px"
        }, {
          label: "目标网元",
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
        skipEx: 0,
        limitEx: 10,
        rowsEx: [],
        //endregion
      }
    },
    computed: {},
    mounted() {
      this.rowsEx.push(this.row);
    }
  }
</script>

<style scoped>
  .panel {
    background-color: #FFFFDF;
    padding: 10px;
  }
</style>
