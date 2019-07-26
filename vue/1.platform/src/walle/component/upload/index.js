export default {
  /**
   * 上传组件
   * oFile:上传文件，
   * postUrl:服务地址，
   * blockSize： 分片大小，
   * oParam：请求参数
   * oSuccessCallback：上传成功的回调
   * oFailCallback：上传失败的回调
   * iBlockIndex：分片索引，外界不需要关注
   */
  upload: function (oFile, postUrl, blockSize, oParam, oSuccessCallback, oFailCallback, iBlockIndex) {
    if (undefined == iBlockIndex) {
      iBlockIndex = 1;
    }

    //1.根据文件大小分片
    var ifileSize = oFile.size;
    var bIsFinish = false;

    //2.如果文件较小，直接上传
    var oFileBlock = "";
    if (ifileSize < blockSize) {
      oFileBlock = oFile;
      bIsFinish = true;
    } else {
      //1.当前是否是最后一片
      var iBlockCount = Math.ceil(ifileSize / blockSize);
      if (iBlockCount == iBlockIndex) {
        oFileBlock = oFile.slice((iBlockIndex - 1) * blockSize, ifileSize);
        bIsFinish = true;
      } else {
        oFileBlock = oFile.slice((iBlockIndex - 1) * blockSize, iBlockIndex * blockSize - 1);
        bIsFinish = false;
      }
    }

    //3.上传
    let oMyForm = new FormData();
    for (var strParamKey in oParam) {
      oMyForm.append(strParamKey, oParam[strParamKey]);
    }
    oMyForm.append("file", oFileBlock);
    if (bIsFinish) {
      oMyForm.append("isFinish", "true");
    } else {
      oMyForm.append("isFinish", "false");
    }
    let oReq = new XMLHttpRequest();
    oReq.open("POST", postUrl, true);
    oReq.send(oMyForm);
    oReq.onload = (oEvent) => {
      if (oReq.status == 200) {
        if (bIsFinish) {
          oSuccessCallback();
        } else {
          this.upload(oFile, postUrl, blockSize, oParam, oSuccessCallback, oFailCallback, iBlockIndex + 1);
        }
      } else {
        oFailCallback();
      }
    }
  }
}
