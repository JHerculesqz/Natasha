export default {
  mock4TestWfModel: function () {
    return {
      "resultObj": {
        "id": "f716b4b9-9fd8-42ce-ad12-1b445071439f",
        "curTaskId": "351551b3-2d61-47e4-98a3-b107ae7e6ad6",
        "lstUIWFInsTaskVo": [{
          "id": "351551b3-2d61-47e4-98a3-b107ae7e6ad6",
          "name": "待改造网元信息",
          "uiComponentName": "RenovationNEInfo"
        }, {
          "id": "bb3b45b8-71b5-4315-b9ba-6520db2ef57c",
          "name": "改造前准备",
          "uiComponentName": "RenovationSetup"
        }, {
          "id": "4fc77e28-91d3-467e-84f3-709c17a26495",
          "name": "改造分析报告",
          "uiComponentName": "RenovationReport"
        }, {
          "id": "8ee98632-1031-417c-a9cb-1065db481222",
          "name": "MOP清单",
          "uiComponentName": "RenovationMOP"
        }],
        "startTime": "2019-07-26 11:07:56",
        "endTime": null,
        "userId": "jdl",
        "finish": false
      }, "errorObj": null, "ok": true
    }

  },
  mock4GetComponentInfo: function (strComponentName) {
    if (strComponentName == "RenovationNEInfo") {
      return {
        resultObj: [{
          title: "XXXForm1",
          contItems: [{
            type: "input",
            key: "contItems_index1",
            name: "XXX名称"
          }, {
            type: "input",
            key: "contItems_index2",
            name: "XXX"
          }, {
            type: "dropdown",
            key: "contItems_index3",
            name: "XXX",
            dropItems: [{
              label: "Option1",
              title: "Option1",
              active: true,
            }, {
              label: "Option2",
              title: "Option2",
            }, {
              label: "Option3",
              title: "Option3",
            }]
          }, {
            type: "input",
            key: "contItems_index4",
            name: "XXX"
          }, {
            type: "input",
            key: "contItems_index5",
            name: "XXX"
          },]
        }, {
          title: "XXXForm2",
          contItems: [{
            type: "input",
            key: "contItems_index1",
            name: "XXX名称"
          }, {
            type: "input",
            key: "contItems_index2",
            name: "XXX"
          }, {
            type: "dropdown",
            key: "contItems_index3",
            name: "XXX",
            dropItems: [{
              label: "Option1",
              title: "Option1",
              active: true,
            }, {
              label: "Option2",
              title: "Option2",
            }, {
              label: "Option3",
              title: "Option3",
            }]
          }, {
            type: "input",
            key: "contItems_index4",
            name: "XXX"
          }, {
            type: "input",
            key: "contItems_index5",
            name: "XXX"
          },]
        }],
        errorObj: null,
        ok: true
      }
    } else if (strComponentName == "RenovationMOP") {
      var treeNodes = [];
      for (var i = 0; i < 2; i++) {
        var oNode = {
          name: i,
          id: i,
          no: i,
          operation: "operation" + i,
          operationobj: "operationObj" + i,
          progress: i + "%",
          state: "ing...",
          skip: [{
            title: "跳过",
            value: "icon-forward2"
          }],
          pause: [{
            title: "暂停",
            value: "icon-pause"
          }],
          viewdetails: [{
            title: "查看详情",
            value: "icon-file-text2"
          }],
          children: [],
          nodeLevel: 1,
          hasCheckbox: false,
          hasRadiobox: false,
          isInitCheck: false,
          isInitExpand: true,
          isLeafNode: false
        };
        for (var j = 0; j < 3; j++) {
          var oNodeChild = {
            name: oNode.id + "_" + j,
            id: oNode.id + "_" + j,
            no: oNode.id + "_" + j,
            operation: "operation" + oNode.id + "_" + j,
            operationobj: "operationObj" + oNode.id + "_" + j,
            progress: j + "%",
            state: "ing...",
            skip: [{
              title: "跳过",
              value: "icon-forward2"
            }],
            pause: [{
              title: "暂停",
              value: "icon-pause"
            }],
            viewdetails: [{
              title: "查看详情",
              value: "icon-file-text2"
            }],
            children: [],
            nodeLevel: 2,
            hasCheckbox: false,
            hasRadiobox: false,
            isInitCheck: false,
            isInitExpand: true,
            isLeafNode: false
          };
          oNode.children.push(oNodeChild);
          for (var k = 0; k < 7; k++) {
            var oNodeChildEx = {
              name: oNodeChild.id + "_" + k,
              id: oNodeChild.id + "_" + k,
              no: oNodeChild.id + "_" + k,
              operation: "operation" + oNodeChild.id + "_" + k,
              operationobj: "operationObj" + oNodeChild.id + "_" + k,
              progress: k + "%",
              state: "ing...",
              skip: [{
                title: "跳过",
                value: "icon-forward2"
              }],
              pause: [{
                title: "暂停",
                value: "icon-pause"
              }],
              viewdetails: [{
                title: "查看详情",
                value: "icon-file-text2"
              }],
              children: [],
              nodeLevel: 3,
              hasCheckbox: false,
              hasRadiobox: false,
              isInitCheck: false,
              isInitExpand: true,
              isLeafNode: true
            };
            oNodeChild.children.push(oNodeChildEx);
          }
        }
        treeNodes.push(oNode);
      }
      return {
        resultObj: treeNodes,
        errorObj: null,
        ok: true
      }
    }

  }
}
