export default {
  mock4GetObjLst: function (iCurentPage, iLimit) {
    var oRes = {
      "resultObj": {
        arrRows: [],
        totalNum: 1000,
        totalPage: 20,
      },
      "errorObj": null,
      "ok": true
    };

    for (var i = iCurentPage; i < iCurentPage + iLimit; i++) {
      let oRow = [];
      oRow.push({
        key:"id",
        value:i
      });
      oRow.push({
        key:"nodeName",
        value:"nodeName" + i
      });
      oRow.push({
        key:"LSRIDBefore",
        value:"LSRIDBefore" + i
      });
      oRow.push({
        key:"tergetLSRID",
        value:"tergetLSRID" + i
      });
      oRow.push({
        key:"nodeType",
        value:"nodeType" + i
      });
      oRow.push({
        key:"createTime",
        value:"createTime" + i
      });
      oRow.push({
        key:"executionTime",
        value:"executionTime" + i
      });
      oRow.push({
        key:"executionStatus",
        value:"executionStatus" + i
      });
      oRow.push({
        key:"userName",
        value:"userName" + i
      });

      oRes.resultObj.arrRows.push(oRow);
    }

    return oRes;
  }
}
