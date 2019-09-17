const configs={
  allEle:{
    titles: [{
      label: "",
      key: "radioBox",
      type: "radioBox", //或者为 "checkBox"
      visible: true,
      width: "40px",
      freeze: "left",
      bCanColumnConfig:false
    },{
      label: "",
      key: "checkBox",
      type: "checkBox", //或者为 "checkBox"
      visible: true,
      width: "40px",
      freeze: "left",
    }, {
      label: "name",
      key: "name",
      type: "text",
      visible: true,
      orderBy: true,
      width: "100px",
      freeze: "left",
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
      freeze: "right",
    }, {
      label: "目标网元",
      key: "node",
      type: "multiDropdown",
      visible: true,
      width: "200px",
      freeze: "right",
    }],
    rows: [],
    totalNum: 200,
    totalPage: 10,
    limit: 20,
  },
  tableData:{
    titles: [{
      label: "",
      key: "radioBox",
      type: "radioBox", //或者为 "checkBox"
      visible: true,
      width: "40px",
      freeze: "left",
      bCanColumnConfig:false
    },{
      label: "",
      key: "checkBox",
      type: "checkBox", //或者为 "checkBox"
      visible: true,
      width: "40px",
      freeze: "left",
    }, {
      label: "name",
      key: "name",
      type: "text",
      visible: true,
      orderBy: true,
      width: "100px",
      freeze: "left",
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
      freeze: "right",
    }, {
      label: "目标网元",
      key: "node",
      type: "multiDropdown",
      visible: true,
      width: "200px",
      freeze: "right",
    }],
    rows: [],
    totalNum: 200,
    totalPage: 10,
    limit: 20,
  }
};

export default configs;
