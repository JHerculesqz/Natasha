<template>
  <div class="marvelHighLightWrapper">
    <pre class="marvelHighLightPre">
      <code class="marvelHighLightCode" v-bind:class="langType" v-if="show">{{sourceCode}}</code>
    </pre>
  </div>
</template>

<script>
  import * as hljs from 'highlight.js'
  import "highlight.js/styles/atom-one-light.css"

  const hightlightCode = () => {
    let blocks = document.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightBlock(block);
    });
  };

  export default {
    name: 'MarvelHighLight',
    data: function () {
      return {
        langType:"",
        sourceCode:"",
        show:true,
      }
    },
    mounted: function(){
      //#region Custom

      //#endregion
    },
    methods: {
      //#region inner
      //#endregion
      //#region callback

      //#endregion
      //#region 3rd
      setData: function (strLangType, strSourceCode) {
        this.show = false;
        this.langType = strLangType;
        this.sourceCode = strSourceCode;
        this.$nextTick(function(){
          this.show = true;
          this.$nextTick(function(){
            hightlightCode();
          });
        });
      }
      //#endregion
    }
  }
</script>

<style scoped>

  .marvelHighLightWrapper{
    padding: 0;
    margin: 0;
  }
  .marvelHighLightPre{
    padding: 0;
    margin: 0;
    white-space: pre-line;
  }
  .marvelHighLightCode{
    padding: 0;
    margin: 0;
  }

  /*region highlight*/

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #383a42;
    background: #fafafa;
  }

  .hljs-comment,
  .hljs-quote {
    color: #a0a1a7;
    font-style: italic;
  }

  .hljs-doctag,
  .hljs-keyword,
  .hljs-formula {
    color: #a626a4;
  }

  .hljs-section,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-deletion,
  .hljs-subst {
    color: #e45649;
  }

  .hljs-literal {
    color: #0184bb;
  }

  .hljs-string,
  .hljs-regexp,
  .hljs-addition,
  .hljs-attribute,
  .hljs-meta-string {
    color: #50a14f;
  }

  .hljs-built_in,
  .hljs-class .hljs-title {
    color: #c18401;
  }

  .hljs-attr,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-type,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-number {
    color: #986801;
  }

  .hljs-symbol,
  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-title {
    color: #4078f2;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  .hljs-link {
    text-decoration: underline;
  }

  /*endregion*/

  /*region highlight blackBg*/

  .blackBg .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #abb2bf;
    background: #282c34;
  }

  .blackBg .hljs-comment,
  .blackBg .hljs-quote {
    color: #5c6370;
    font-style: italic;
  }

  .blackBg .hljs-doctag,
  .blackBg .hljs-keyword,
  .blackBg .hljs-formula {
    color: #c678dd;
  }

  .blackBg .hljs-section,
  .blackBg .hljs-name,
  .blackBg .hljs-selector-tag,
  .blackBg .hljs-deletion,
  .blackBg .hljs-subst {
    color: #e06c75;
  }

  .blackBg .hljs-literal {
    color: #56b6c2;
  }

  .blackBg .hljs-string,
  .blackBg .hljs-regexp,
  .blackBg .hljs-addition,
  .blackBg .hljs-attribute,
  .blackBg .hljs-meta-string {
    color: #98c379;
  }

  .blackBg .hljs-built_in,
  .blackBg .hljs-class .hljs-title {
    color: #e6c07b;
  }

  .blackBg .hljs-attr,
  .blackBg .hljs-variable,
  .blackBg .hljs-template-variable,
  .blackBg .hljs-type,
  .blackBg .hljs-selector-class,
  .blackBg .hljs-selector-attr,
  .blackBg .hljs-selector-pseudo,
  .blackBg .hljs-number {
    color: #d19a66;
  }

  .blackBg .hljs-symbol,
  .blackBg .hljs-bullet,
  .blackBg .hljs-link,
  .blackBg .hljs-meta,
  .blackBg .hljs-selector-id,
  .blackBg .hljs-title {
    color: #61aeee;
  }

  .blackBg .hljs-emphasis {
    font-style: italic;
  }

  .blackBg .hljs-strong {
    font-weight: bold;
  }

  .blackBg .hljs-link {
    text-decoration: underline;
  }

  /*endregion*/
</style>
