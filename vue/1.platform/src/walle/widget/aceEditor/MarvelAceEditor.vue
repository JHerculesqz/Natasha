<template>
  <pre :id="id" class="aceEditorCodeArea">
    {{code}}
  </pre>
</template>

<script>
  import ace from 'ace-builds'
  import 'ace-builds/webpack-resolver'
  import 'ace-builds/src-noconflict/theme-dracula'
  import 'ace-builds/src-noconflict/mode-javascript'
  import StringUtilsEx from '../../component/str'

  /**
   *  MarvelAceEditor widget description
   *  @vuedoc
   *  @exports MarvelAceEditor
   */
  export default {
    name: 'MarvelAceEditor',
    props: {
      theme: {
        type: String,
        default: "chrome",
        required: false,
      },
      fontSize: {
        type: Number,
        default: 15,
        required: false,
      },
      readOnly: {
        type: Boolean,
        default: false,
        required: false,
      },
      wrap: {
        type: Boolean,
        default: false,
        required: false,
      },
      codeIn: {
        type: String,
        default: "",
        required: false
      },
      lan: {
        type: String,
        default: "html",
        required: false
      }
    },
    data: function () {
      return {
        id: StringUtilsEx.uuid(),
        code: '',
        language: '',
        oEditor: undefined
      }
    },
    mounted: function () {
      //#region init

      this._initEx();

      //#endregion
    },
    methods: {
      //#region inner

      //#region lifeCycle

      _initEx: function () {
        //初始化对象
        this.oEditor = ace.edit(this.id);

        //设置风格
        this.oEditor.setTheme("ace/theme/" + this.theme);

        //字体大小
        this.oEditor.setFontSize(this.fontSize);

        //设置只读（true时只读，用于展示代码）
        this.oEditor.setReadOnly(this.readOnly);

        //自动换行,设置为off关闭,free为自动换行
        if (this.wrap) {
          this.oEditor.setOption("wrap", "free");
        } else {
          this.oEditor.setOption("wrap", "off");
        }

        //清除中线
        this.oEditor.setShowPrintMargin(false);

        //setCode
        if (this.codeIn !== undefined && this.lan !== undefined) {
          this.setCode(this.codeIn, this.lan);
        }
      },

      //#endregion

      //#region format

      formatJson: function (json, options) {
        var reg = null,
          formatted = '',
          pad = 0,
          PADDING = '    ';
        options = options || {};
        options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
        options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;
        if (typeof json !== 'string') {
          json = JSON.stringify(json);
        } else {
          json = JSON.parse(json);
          json = JSON.stringify(json);
        }
        reg = /([\{\}])/g;
        json = json.replace(reg, '\r\n$1\r\n');
        reg = /([\[\]])/g;
        json = json.replace(reg, '\r\n$1\r\n');
        reg = /(\,)/g;
        json = json.replace(reg, '$1\r\n');
        reg = /(\r\n\r\n)/g;
        json = json.replace(reg, '\r\n');
        reg = /\r\n\,/g;
        json = json.replace(reg, ',');
        if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
          reg = /\:\r\n\{/g;
          json = json.replace(reg, ':{');
          reg = /\:\r\n\[/g;
          json = json.replace(reg, ':[');
        }
        if (options.spaceAfterColon) {
          reg = /\:/g;
          json = json.replace(reg, ':');
        }
        (json.split('\r\n')).forEach(function (node, index) {
            var i = 0,
              indent = 0,
              padding = '';

            if (node.match(/\{$/) || node.match(/\[$/)) {
              indent = 1;
            } else if (node.match(/\}/) || node.match(/\]/)) {
              if (pad !== 0) {
                pad -= 1;
              }
            } else {
              indent = 0;
            }

            for (i = 0; i < pad; i++) {
              padding += PADDING;
            }

            formatted += padding + node + '\r\n';
            pad += indent;
          }
        );
        return formatted;
      },

      //#endregion

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd

      setCode: function (strCode, language) {
        //设置代码内容 并将光标移至末尾处
        this.oEditor.setValue(strCode, 1);

        if (language != undefined) {
          this.language = language;
          this.oEditor.session.setMode("ace/mode/" + this.language);
        }

        //格式化
      },
      getCode: function () {
        return this.oEditor.session.getValue();
      },
      setLanguage: function (language) {
        this.language = language;
        this.oEditor.session.setMode("ace/mode/" + this.language);
      },
      formatCode: function () {
        //当前只支持json
        if (this.language == 'json') {
          var code = this.getCode();
          var formatCode = this.formatJson(code);
          this.oEditor.setValue(formatCode, 1);
        }
      },

      //#endregion
    },
    watch: {
      theme: {
        handler() {
          this.oEditor.setTheme("ace/theme/" + this.theme);
        },
        deep: false
      },
      fontSize: {
        handler() {
          this.oEditor.setFontSize(this.fontSize);
        },
        deep: false
      },
      readOnly: {
        handler() {
          this.oEditor.setReadOnly(this.readOnly);
        },
        deep: false
      },
      wrap: {
        handler() {
          if (this.wrap) {
            this.oEditor.setOption("wrap", "free");
          } else {
            this.oEditor.setOption("wrap", "off");
          }
        },
        deep: false
      }
    },
  }
</script>

<style scoped>
  /*region basic*/

  *{
    font-family:'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    font-weight: normal;
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
  .aceEditorCodeArea {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
<style>
  .aceEditorCodeArea * {
    font-weight: normal;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
  }
</style>
