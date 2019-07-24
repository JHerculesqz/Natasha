export default {
  mock4TestWfModel:function () {
    return {
      "resultObj": {
        "wfModelVo4Chgs": [
          {
            "id": "NavToolsPTNLSRID:1:33a985bc-ac36-11e9-a9ad-aeb6d0d021b1",
            "key": "NavToolsPTNLSRID",
            "name": "workFlowName",
            "desc": null
          }
        ],
        "testWfModelOutItemVos": [
          {
            "modelKey": "NavToolsPTNLSRID",
            "wfModelStepVo4Chgs": [
              {
                "id": "sid-FB5E2195-AA44-4CB7-B68B-DCE29124D0C7",
                "name": "Step1",
                "uiCompName": "RenovationNEInfo",
                "lstWFModelStepVo4Chg": []
              },
              {
                "id": "sid-C5D2B786-78D8-46F1-8C20-3856A018515C",
                "name": "Step2",
                "uiCompName": "RenovationSetup",
                "lstWFModelStepVo4Chg": []
              },
              {
                "id": "sid-7EDF9213-9B25-466D-BA04-BBFBDD64F316",
                "name": "Step3",
                "uiCompName": "RenovationReport",
                "lstWFModelStepVo4Chg": []
              },
              {
                "id": "sid-6BD47116-F9F2-4163-A60A-63F7B9A36BAB",
                "name": "Step4",
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

  },
  mock4GetComponentInfo:function (strComponentName) {
    if(strComponentName == "RenovationNEInfo"){
      return {
        resultObj: [{
          title:"XXXForm1",
          contItems:[{
            type:"input",
            key:"contItems_index1",
            name:"XXX名称"
          },{
            type:"input",
            key:"contItems_index2",
            name:"XXX"
          },{
            type:"dropdown",
            key:"contItems_index3",
            name:"XXX",
            dropItems:[{
              label:"Option1",
              title:"Option1",
              active:true,
            },{
              label:"Option2",
              title:"Option2",
            },{
              label:"Option3",
              title:"Option3",
            }]
          },{
            type:"input",
            key:"contItems_index4",
            name:"XXX"
          },{
            type:"input",
            key:"contItems_index5",
            name:"XXX"
          },]
        },{
          title:"XXXForm2",
          contItems:[{
            type:"input",
            key:"contItems_index1",
            name:"XXX名称"
          },{
            type:"input",
            key:"contItems_index2",
            name:"XXX"
          },{
            type:"dropdown",
            key:"contItems_index3",
            name:"XXX",
            dropItems:[{
              label:"Option1",
              title:"Option1",
              active:true,
            },{
              label:"Option2",
              title:"Option2",
            },{
              label:"Option3",
              title:"Option3",
            }]
          },{
            type:"input",
            key:"contItems_index4",
            name:"XXX"
          },{
            type:"input",
            key:"contItems_index5",
            name:"XXX"
          },]
        }],
        errorObj: null,
        ok: true
      }
    }else if(strComponentName == "RenovationMOP"){
      var treeNodes = [];
      for(var i = 0; i< 2;i++){
        var oNode={
          name:i,
          id:i,
          no:i,
          operation:"operation" + i,
          operationobj:"operationObj" + i,
          progress:i + "%",
          state:"ing...",
          skip:[{
            title:"跳过",
            value:"icon-forward2"
          }],
          pause:[{
            title:"暂停",
            value:"icon-pause"
          }],
          viewdetails:[{
            title:"查看详情",
            value:"icon-file-text2"
          }],
          children:[],
          nodeLevel:1,
          hasCheckbox: false,
          hasRadiobox: false,
          isInitCheck: false,
          isInitExpand: true,
          isLeafNode: false
        };
        for(var j = 0; j<3;j++){
          var oNodeChild = {
            name:oNode.id + "_" + j,
            id:oNode.id + "_" + j,
            no:oNode.id + "_" + j,
            operation:"operation" + oNode.id + "_" + j,
            operationobj:"operationObj" + oNode.id + "_" + j,
            progress:j + "%",
            state:"ing...",
            skip:[{
              title:"跳过",
              value:"icon-forward2"
            }],
            pause:[{
              title:"暂停",
              value:"icon-pause"
            }],
            viewdetails:[{
              title:"查看详情",
              value:"icon-file-text2"
            }],
            children:[],
            nodeLevel:2,
            hasCheckbox: false,
            hasRadiobox: false,
            isInitCheck: false,
            isInitExpand: true,
            isLeafNode: false
          };
          oNode.children.push(oNodeChild);
          for(var k = 0; k<7;k++){
            var oNodeChildEx = {
              name:oNodeChild.id + "_" + k,
              id:oNodeChild.id + "_" + k,
              no:oNodeChild.id + "_" + k,
              operation:"operation" + oNodeChild.id + "_" + k,
              operationobj:"operationObj" + oNodeChild.id + "_" + k,
              progress:k + "%",
              state:"ing...",
              skip:[{
                title:"跳过",
                value:"icon-forward2"
              }],
              pause:[{
                title:"暂停",
                value:"icon-pause"
              }],
              viewdetails:[{
                title:"查看详情",
                value:"icon-file-text2"
              }],
              children:[],
              nodeLevel:3,
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
