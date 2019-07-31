define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var HighlightRules = require("./yang_highlight_rules").YangHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent; /*括号匹配*/
var CStyleFoldMode = require("./folding/cstyle").FoldMode;/*折叠模式 C*/

var Mode = function() {
    this.HighlightRules = HighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    //获取下一行缩进
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        if (state == "comment") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    //检查括号
    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };
    //检查括号
    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };
    //
    this.getCompletions = function(state, session, pos, prefix) {
        return [];
    };

    //检查语法 如果有规范性的语法检测规则 可参照javaScript的语法规则进行扩展
    this.createWorker = function(session) {
        return null;
    };


    this.$id = "ace/mode/yang";
}).call(Mode.prototype);

exports.Mode = Mode;
});
