<template>
  <div ref="marvelDiffOutput" class="marvelDiffWrapper"></div>
</template>

<script>
  import "natasha-diff/diffview.css";

  require('natasha-diff/diffview.js');
  require('natasha-diff/difflib.js');

  /**
   *  MarvelDiff widget description
   *  @vuedoc
   *  @exports MarvelDiff
   */
  export default {
    name: 'MarvelDiff',
    props: [],
    data: function () {
      return {}
    },
    mounted: function () {
    },
    methods: {
      //#region inner
      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      compareDiff: function (strOriginalText, strNewText, strLeftTitle, strRightTitle) {
        var difflib = new $.difflib();
        var diffview = new $.diffview();
        let base = difflib.stringAsLines(strOriginalText),
          newtxt = difflib.stringAsLines(strNewText),
          sm = new difflib.SequenceMatcher(base, newtxt),
          opcodes = sm.get_opcodes();
        const outData = diffview.buildView({
          baseTextLines: base,
          newTextLines: newtxt,
          opcodes: opcodes,
          baseTextName: strLeftTitle,
          newTextName: strRightTitle,
          contextSize: null,
          viewType: 0
        });
        this.$refs.marvelDiffOutput.appendChild(outData);
      }

      //#endregion
    }
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family: "Microsoft YaHei", "arial",sans-serif;
  }
  ::-webkit-scrollbar{
    width:8px;
    height:8px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: #aaa;
  }

  /*endregion*/
  .marvelDiffWrapper {
    overflow: auto;
    width: 100%;
    height: 100%;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    background-color: #ffffff;
  }

  /*region blackBg*/

  .blackBg .marvelDiffWrapper {
    background-color: #322b2b;
  }

  /*endregion*/
</style>
