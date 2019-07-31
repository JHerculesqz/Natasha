export default {
  mock4TestWfModel: function () {
    return {
      "resultObj": {
        "id": "f716b4b9-9fd8-42ce-ad12-1b445071439f",
        "curTaskId": "351551b3-2d61-47e4-98a3-b107ae7e6ad6",
        "lstUIWFInsTaskVo": [{
          "id": "351551b3-2d61-47e4-98a3-b107ae7e6ad6",
          "name": "step1",
          "uiComponentName": "RenovationNEInfo"
        }, {
          "id": "bb3b45b8-71b5-4315-b9ba-6520db2ef57c",
          "name": "step2",
          "uiComponentName": "RenovationSetup"
        }, {
          "id": "4fc77e28-91d3-467e-84f3-709c17a26495",
          "name": "step3",
          "uiComponentName": "RenovationReport"
        }, {
          "id": "8ee98632-1031-417c-a9cb-1065db481222",
          "name": "step4",
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
      return {
        "resultObj": [{
          "id": "be0e27cb-b1e0-11e9-a6ea-000ec6c62bf6",
          "wfInsId": "be0b4194-b1e0-11e9-a6ea-000ec6c62bf6",
          "name": "STEP1.起床",
          "startTime": "2019-07-210 05:10:43",
          "endTime": "2019-07-210 05:11:05",
          "children": [{
            "id": "be0e27cb-b1e0-11e9-a6ea-000ec6c62bf6aaa",
            "wfInsId": "be0b4194-b1e0-11e9-a6ea-000ec6c62bf6aaa",
            "name": "STEP1.1 起床",
            "startTime": "2019-07-210 05:10:43",
            "endTime": "2019-07-210 05:11:05",
            "children": [{
              "id": "be0e27cb-b1e0-11e9-a6ea-000ec6c62bf6aaabbb",
              "wfInsId": "be0b4194-b1e0-11e9-a6ea-000ec6c62bf6aaabbb",
              "name": "STEP1.1.1 起床",
              "startTime": "2019-07-210 05:10:43",
              "endTime": "2019-07-210 05:11:05",
              "children": []
            }]
          }]
        }, {
          "id": "cb5f1f1e-b1e0-11e9-a6ea-000ec6c62bf6",
          "wfInsId": "be0b4194-b1e0-11e9-a6ea-000ec6c62bf6",
          "name": "STEP2.吃饭",
          "startTime": "2019-07-210 05:11:05",
          "endTime": "2019-07-210 05:21:34",
          "children": []
        }, {
          "id": "427cc8e1-b1e2-11e9-a6ea-000ec6c62bf6",
          "wfInsId": "be0b4194-b1e0-11e9-a6ea-000ec6c62bf6",
          "name": "STEP3.出发",
          "startTime": "2019-07-210 05:21:34",
          "endTime": "",
          "children": []
        }],
        "errorObj": null,
        "ok": true
      }
    }

  },
  mock4GetLog: function () {
    return {
      "resultObj": {
        "count": 1,
        "lstWFLogVo4Chg": [{
          "id": "ab302dcd-82ac-42b3-a247-1bc44236bdb8",
          "insId": "04fbe84d-b1dc-11e9-af47-000ec6c62bf6",
          "taskId": "",
          "userId": "",
          "level": 1,
          "content": "【创建工作流】业务数据保存成功..",
          "createTime": "2019-07-29 08:36:54"
        }]
      }, "errorObj": null, "ok": true
    }
  }
}
