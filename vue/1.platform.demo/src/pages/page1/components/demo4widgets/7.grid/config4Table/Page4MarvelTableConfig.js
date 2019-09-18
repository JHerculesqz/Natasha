const configs={
  allEle:{
    titles: [{
      label: "id",
      key: "id",
      type: "text", //或者为 "checkBox"
      visible: false,
      width: "100px",
      bCanColumnConfig:false
    },{
      label: "",
      key: "checkBox",
      type: "checkBox", //或者为 "checkBox"
      visible: true,
      width: "40px",
      bCanColumnConfig:false
    }, {
      label: "",
      key: "radioBox",
      type: "radioBox", //或者为 "checkBox"
      visible: true,
      width: "40px",
      bCanColumnConfig:false
    }, {
      label: "text",
      key: "name",
      type: "text",
      visible: true,
      orderBy: true,
      search: true,
      width: "80px",
    }, {
      label: "multiText",
      key: "multiText",
      type: "multiText",
      visible: true,
      orderBy: true,
      search: true,
      width: "110px",
    }, {
      label: "input",
      key: "description",
      type: "input",
      visible: true,
      orderBy: true,
      search: true,
      width: "80px"
    }, {
      label: "icon",
      key: "operation",
      type: "icon",
      visible: true,
      width: "90px"
    }, {
      label: "textIcon",
      key: "link",
      type: "textIcon",
      visible: true,
      width: "80px"
    }, {
      label: "dropdown",
      key: "config",
      type: "dropdown",
      visible: true,
      width: "100px",
    },{
      label: "dropdownEx",
      key: "dropdownEx",
      type: "dropdownEx",
      visible: true,
      width: "120px",
    }, {
      label: "multiDropdown",
      key: "node",
      type: "multiDropdown",
      visible: true,
      width: "100px",
    }, {
      label: "customer",
      key: "customer",
      type: "customer",
      visible: true,
      width: "120px",
    }, {
      label: "progress",
      key: "progress",
      type: "progress",
      visible: true,
      width: "100px",
    }, {
      label: "switch",
      key: "switch",
      type: "switch",
      visible: true,
      width: "60px",
    }, {
      label: "img",
      key: "img",
      type: "img",
      visible: true,
      width: "60px",
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

export default {
  getConfigOptions: function (strName, iPage) {
    configs.allEle.rows = this._initGridData4AllEle();
    configs.tableData.rows = this._initGridData4TableData(iPage);
    return configs[strName];
  },
  _initGridData4AllEle: function(){
    let iStart = 0;
    let iEnd = 100;
    var rows = [];
    for (let i = iStart; i < iEnd; i++) {
      let oRow = [];
      //key:id用于标识这一列的唯一性，在界面上不会绘制出来
      oRow.push({
        key: "id",
        value: i
      });
      oRow.push({
        key: "radioBox",
        value: "",
        checked: i == 0 ? true : false
      });
      oRow.push({
        key: "checkBox",
        value: "",
        checked: i == 0 ? true : false
      });
      oRow.push({
        key: "name",
        value: "name_" + i
      });
      oRow.push({
        key: "multiText",
        value: ["multiText" + i,"multiText" + i]
      });
      oRow.push({
        key: "description",
        value: "input_" + i
      });
      oRow.push({
        key: "operation",
        value: [{
          value: "icon-location2",
          color: "#ffb00f",
          label: "lallalala"
        }, {
          value: "icon-location2",
          color: "#3dcca6",
          label: "lallalala"
        }, {
          value: "icon-location2 disableIcon",
          label: "lallalala"
        }]
      });
      oRow.push({
        key: "link",
        value: "icon-podcast",
        color: "#28aad3",
        label: "shit",
      });
      oRow.push({
        key: "config",
        value: [{
          value: "A",
        }, {
          value: "B",
          selected: true
        }, {
          value: "C"
        }],
      });
      oRow.push({
        key: "dropdownEx",
        value: [{
          value: "Item1",
          selected: true,
          icon: "icon-pencil"
        }, {
          value: "Item2",
          icon: "icon-pen"
        }, {
          value: "Item3",
          icon: "icon-droplet"
        }]
      });
      oRow.push({
        key: "node",
        value: [{
          value: "Node1",
          selected: true,
        }, {
          value: "Node2",
          selected: true
        }, {
          value: "Node3"
        }, {
          value: "Node4"
        }],
      });
      if(i%3 == 1){
        oRow.push({
          type:"text",
          key: "customer",
          value: "customer_text",
        });
      }else if(i%3 == 2){
        oRow.push({
          type:"dropdown",
          key: "customer",
          value: [{
            value: "a_customer_dropdown",
          }, {
            value: "b_customer_dropdown",
            selected: true
          }, {
            value: "c_customer_dropdown"
          }],
        });
      }else{
        oRow.push({
          key: "customer",
          value: `<div style="background-color:#3dcca6; color: #ffffff;">html area</div>`,
        });
      }
      oRow.push({
        key: "progress",
        value: "80%",
        barColor: i%2 ==1?"#3dcca6":"#3399ff"
      });
      oRow.push({
        key: "switch",
        value: i%2 == 1,
      });
      oRow.push({
        key: "img",
        value: './static/image/others/2.png',
        label:"img"
      });
      rows.push(oRow);
    }
    return rows;
  },
  _initGridData4TableData: function(iPageIndex){
    let iStart = (iPageIndex - 1) * 20;
    let iEnd = iPageIndex * 20;
    var rows = [];
    for (let i = iStart; i < iEnd; i++) {
      let oRow = [];
      //key:id用于标识这一列的唯一性，在界面上不会绘制出来
      oRow.push({
        key: "id",
        value: i
      });
      oRow.push({
        key: "radioBox",
        value: "",
        checked: i == 0 ? true : false
      });
      oRow.push({
        key: "checkBox",
        value: "",
        checked: i == 0 ? true : false
      });
      oRow.push({
        key: "name",
        value: "name_" + i
      });
      oRow.push({
        key: "description",
        value: "input_cell" + i
      });
      oRow.push({
        key: "operation",
        value: [{
          value: "icon-location2",
          color: "red",
          label: "lallalala"
        }, {
          value: "icon-location2",
          label: "lallalala"
        }, {
          value: "icon-location2 disableIcon",
          label: "lallalala"
        }]
      });
      oRow.push({
        key: "link",
        value: "icon-podcast",
        color: "#28aad3",
        label: "shit",
      });
      oRow.push({
        key: "config",
        value: [{
          value: "A",
        }, {
          value: "B",
          selected: true
        }, {
          value: "C"
        }],
      });
      oRow.push({
        key: "node",
        value: [{
          value: "Node1",
          selected: true,
        }, {
          value: "Node2",
          selected: true
        }, {
          value: "Node3"
        }, {
          value: "Node4"
        }],
      });
      rows.push(oRow);
    }
    return rows;
  },
};
