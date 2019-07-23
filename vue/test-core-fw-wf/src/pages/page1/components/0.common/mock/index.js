export default {
  mock4TestWfModel:function () {
    return {
      "resultObj": {
        "wfModelVo4Chgs": [
          {
            "id": "NavToolsPTNLSRID:1:33a985bc-ac36-11e9-a9ad-aeb6d0d021b1",
            "key": "NavToolsPTNLSRID",
            "name": "1_导航类_PTNLSRID修改",
            "desc": null
          }
        ],
        "testWfModelOutItemVos": [
          {
            "modelKey": "NavToolsPTNLSRID",
            "wfModelStepVo4Chgs": [
              {
                "id": "sid-FB5E2195-AA44-4CB7-B68B-DCE29124D0C7",
                "name": "待改造网元信息",
                "uiCompName": "RenovationNEInfo",
                "lstWFModelStepVo4Chg": []
              },
              {
                "id": "sid-C5D2B786-78D8-46F1-8C20-3856A018515C",
                "name": "改造前准备",
                "uiCompName": "RenovationSetup",
                "lstWFModelStepVo4Chg": []
              },
              {
                "id": "sid-7EDF9213-9B25-466D-BA04-BBFBDD64F316",
                "name": "改造分析报告",
                "uiCompName": "RenovationReport",
                "lstWFModelStepVo4Chg": []
              },
              {
                "id": "sid-6BD47116-F9F2-4163-A60A-63F7B9A36BAB",
                "name": "MOP清单",
                "uiCompName": "RenovationMOP",
                "lstWFModelStepVo4Chg": []
              }
            ]
          }
        ]
      },
      "errorObj": null,
      "ok": true
    }

  }
}
