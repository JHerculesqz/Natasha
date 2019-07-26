export default {
  mock4GetObjLst: function (iCurentPage, iLimit) {
    var oResObj = {
      "resultObj": [{
        "id": "d015ae5b-6d0c-4f27-bcee-598e5cf9834c",
        "curTaskId": "ecaaab22-9797-4292-86ee-09c051385201",
        "lstUIWFInsTaskVo": [{
          "id": "ecaaab22-9797-4292-86ee-09c051385201",
          "name": "待改造网元信息",
          "uiComponentName": "RenovationNEInfo"
        }, {
          "id": "c94e543f-05fb-4199-b49d-d0b9aa106911",
          "name": "改造前准备",
          "uiComponentName": "RenovationSetup"
        }, {
          "id": "d4d88402-14bd-4ab6-8571-e1b74f6e1975",
          "name": "改造分析报告",
          "uiComponentName": "RenovationReport"
        }, {"id": "0386108d-7ffd-4575-89bf-0b5ce031f36e", "name": "MOP清单", "uiComponentName": "RenovationMOP"}],
        "startTime": "2019-07-26 10:52:24",
        "endTime": null,
        "userId": "jdl",
        "finish": false
      }, {
        "id": "262d39b8-156d-4b95-a20f-42569eb57adf",
        "curTaskId": null,
        "lstUIWFInsTaskVo": [],
        "startTime": "2019-07-26 11:07:02",
        "endTime": null,
        "userId": "asfasfa",
        "finish": false
      }, {
        "id": "18be5a5b-6b9b-4c61-afab-9b6e77e6e68e",
        "curTaskId": null,
        "lstUIWFInsTaskVo": [],
        "startTime": "2019-07-26 11:07:35",
        "endTime": null,
        "userId": "jdl",
        "finish": false
      }],
      "errorObj": null,
      "ok": true
    };

    return oResObj;
  }
}
