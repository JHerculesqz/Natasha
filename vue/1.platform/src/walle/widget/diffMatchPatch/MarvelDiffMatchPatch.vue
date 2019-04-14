<template>
  <div class="marvelDiffMatchPatchWrapper">
    <div class="leftArea">
      <div class="text4MarvelDiffMatchPatch" v-html="originalText"></div>
    </div>
    <div class="rightArea">
      <div class="text4MarvelDiffMatchPatch" v-html="diffText"></div>
    </div>
  </div>
</template>

<script>
  import dmp from 'diff-match-patch'

  export default {
    name: 'MarvelDiffMatchPatch',
    data: function () {
      return {
        // dmp:undefined,
        originalText:"",
        diffText:""
      }
    },
    mounted: function(){

    },
    methods: {
      //#region inner

      //#region customSetting

      _customSetting: function(strDiffHtml){
        var strRes = strDiffHtml;

        //表示色、特殊字符 替换
        var redColor = new RegExp( '#ffe6e6' , "g" );
        var greenColor = new RegExp( '#e6ffe6' , "g" );
        var para = new RegExp( '&para;' , "g" );
        strRes = strRes.replace( redColor , 'rgba(255,0,0,0.6);text-decoration-line: none;' );
        strRes = strRes.replace( greenColor , 'rgba(0,255,0,0.3);text-decoration-line: none;' );
        strRes = strRes.replace( para , '' );

        //空格替换
        var empty = new RegExp( '  ' , "g" );
        strRes = strRes.replace( empty , '&nbsp;&nbsp;' );

        return strRes;
      },

      //#endregion

      //#endregion
      //#region callback

      //#endregion
      //#region 3rd

      compareDiff: function (strOriginalText, strNewText) {
        var arrOriginal = [[0, strOriginalText]];
        var strOriginalHtml= dmp.prototype.diff_prettyHtml(arrOriginal);
        this.originalText = this._customSetting(strOriginalHtml);

        var arrDiff = dmp.prototype.diff_main(strOriginalText, strNewText);
        dmp.prototype.diff_cleanupSemantic(arrDiff);
        var strDiffHtml = dmp.prototype.diff_prettyHtml(arrDiff);
        this.diffText = this._customSetting(strDiffHtml);
      }

      //#endregion
    }
  }
</script>

<style scoped>
  .marvelDiffMatchPatchWrapper{
    width: 100%;
    height: 100%;
    border: 1px solid #d5d5d5;
  }

  .marvelDiffMatchPatchWrapper .leftArea{
    border-right: 1px dashed #d5d5d5;
  }

  .marvelDiffMatchPatchWrapper .leftArea, .marvelDiffMatchPatchWrapper .rightArea{
    height: 100%;
    width: calc(50% - 1px);
    float: left;
  }

  .text4MarvelDiffMatchPatch{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0);
    resize: none;
    border: none;
    padding: 10px;
    margin: 0;
    box-sizing: border-box;
    display: block;
    overflow: auto;
    font-size: 14px;
    color: #333;
  }

  .rightArea .text4MarvelDiffMatchPatch{
    white-space: nowrap;
  }

  /*region dark*/

  .dark .text4MarvelDiffMatchPatch{
    color: #eeeeee;
  }

  /*endregion*/

  /*region blackBg*/

  .blackBg .text4MarvelDiffMatchPatch{
    color: #eeeeee;
  }

  /*endregion*/
</style>
