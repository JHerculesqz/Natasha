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
          "id": "aaaaa",
          "parentId": null,
          "wfInsId": "aaaaa",
          "name": "STEP1.起床",
          "startTime": "2019-07-207 04:00:32",
          "endTime": ""
        },{
          "id": "bbbbb",
          "parentId": null,
          "wfInsId": "bbbbb",
          "name": "STEP2.吃早饭",
          "startTime": "2019-07-207 04:00:32",
          "endTime": ""
        },{
          "id": "ccccc",
          "parentId": "bbbbb",
          "wfInsId": "ccccc",
          "name": "STEP2.1.喝水",
          "startTime": "2019-07-207 04:00:32",
          "endTime": ""
        }],
        "errorObj": null,
        "ok": true
      }
    }

  }
}
