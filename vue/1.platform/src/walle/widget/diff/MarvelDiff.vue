<template>
  <div ref="marvelDiffOutput" class="marvelDiffWrapper"></div>
</template>

<script>
  export default {
    name: 'MarvelDiff',
    props: [],
    data: function() {
        return {

        }
    },
    mounted: function(){},
    methods: {
      //#region inner
      //#endregion
      //#region callback
      //#endregion
      //#region 3rd
      compareDiff: function (strOriginalText, strNewText, strLeftTitle, strRightTitle) {
        let base = difflib.stringAsLines(strOriginalText),
          newtxt = difflib.stringAsLines(strNewText),
          sm = new difflib.SequenceMatcher(base, newtxt),
          opcodes = sm.get_opcodes();
        const outData = diffview.buildView({
          baseTextLines:base,
          newTextLines:newtxt,
          opcodes:opcodes,
          baseTextName:strLeftTitle,
          newTextName:strRightTitle,
          contextSize:null,
          viewType:0
        });
        this.$refs.marvelDiffOutput.appendChild(outData);
      }
      //#endregion
    }
  }
</script>

<style scoped>
  .marvelDiffWrapper{
    overflow: auto;
    width: 100%;
    height: 100%;
    border: 1px solid #d5d5d5;
    box-sizing: border-box;
    background-color: #ffffff;
  }

  /*region blackBg*/

  .blackBg .marvelDiffWrapper{
    background-color: #322b2b;
  }

  /*endregion*/
</style>
