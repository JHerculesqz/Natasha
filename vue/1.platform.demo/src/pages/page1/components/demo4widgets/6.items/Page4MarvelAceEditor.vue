<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelAceEditor</div>
    <div class="describe">

    </div>
    <!--1级 end-->
    <!--region widget show area-->
    <!--2级 start-->

    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="margin-left: 54px;margin-top: -30px;height: 40px;">
              <div style="float: left;">
                <marvel-drop-down-button ref="languageSelect" width="200px" classCustom="btnCustom"
                                         maxHeight="240px" :dropDownItems="languageOptions"
                                         v-on:onOptionSelect="_onOptionSelect"></marvel-drop-down-button>
              </div>
              <marvel-button label="Get Code" classCustom="btnCustom"
                             v-on:onClick="_getCode"></marvel-button>
              <marvel-button label="Change theme" classCustom="btnCustom"
                             v-on:onClick="_changeTheme"></marvel-button>
              <marvel-button label="Increase font size" classCustom="btnCustom"
                             v-on:onClick="_fontSizeAddition"></marvel-button>
              <marvel-button label="Reduce font size" classCustom="btnCustom"
                             v-on:onClick="_fontSizeReduce"></marvel-button>
              <marvel-button label="Set editor model" classCustom="btnCustom"
                             v-on:onClick="_setEditorModel"></marvel-button>
            </div>
            <div style="border: 1px solid #eee; height: 90%;">
              <marvel-ace-editor ref="aceEditor" :theme="theme" :fontSize="fontSize" :readOnly="readOnly"></marvel-ace-editor>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor2" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <div style="margin-left: 54px;margin-top: -30px;height: 40px;">
              <div style="float: left;">
                <marvel-drop-down-button ref="languageSelect" width="200px" classCustom="btnCustom"
                                         maxHeight="240px" :dropDownItems="languageOptions"
                                         v-on:onOptionSelect="_onOptionSelect"></marvel-drop-down-button>
              </div>
              <marvel-button label="Get Code" classCustom="btnCustom"
                             v-on:onClick="_getCode"></marvel-button>
              <marvel-button label="Change theme" classCustom="btnCustom"
                             v-on:onClick="_changeTheme"></marvel-button>
              <marvel-button label="Increase font size" classCustom="btnCustom"
                             v-on:onClick="_fontSizeAddition"></marvel-button>
              <marvel-button label="Reduce font size" classCustom="btnCustom"
                             v-on:onClick="_fontSizeReduce"></marvel-button>
              <marvel-button label="Set editor model" classCustom="btnCustom"
                             v-on:onClick="_setEditorModel"></marvel-button>
            </div>
            <div style="border: 1px solid #eee; height: 90%;">
              <marvel-ace-editor ref="aceEditor" :theme="theme" :fontSize="fontSize" :readOnly="readOnly"></marvel-ace-editor>
            </div>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="page4MarvelAceEditorIFrame" id="page4MarvelAceEditorIFrame" src="static/jsdoc/module-MarvelAceEditor.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelDropDownButton from "^/widget/button/MarvelDropDownButton";
  import MarvelAceEditor from "^/widget/aceEditor/MarvelAceEditor";
  import MarvelButton from "^/widget/button/MarvelButton";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";

  export default {
    name: 'page4MarvelAceEditor',
    components: {
      MarvelIFrame,
      MarvelAceEditor,
      MarvelDropDownButton,
      MarvelButton,
      MarvelTab,
      MarvelTabItem,
    },
    data: function () {
      return {
        //#region document data
        tabItems1: [{
          label: "Demo View",
          isActive: true
        }, {
          label: "Code View",
          isActive: false
        }],
        //#endregion
        //#region custom data
        theme:"dracula",
        fontSize:15,
        readOnly:true,
        languageOptions: [{
          key: "HTML",
          label: "HTML",
          languageAceEditor: "html",
          active: true,
        }, {
          key: "Java",
          label: "Java",
          languageAceEditor: "java",
        },{
          key: "Python",
          label: "Python",
          languageAceEditor: "python",
        }, {
          key: "XML",
          label: "XML",
          languageAceEditor: "xml",
        }, {
          key: "JSON",
          label: "JSON",
          languageAceEditor: "json",
        }, {
          key: "Groovy",
          label: "Groovy",
          languageAceEditor: "groovy",
        }, {
          key: "Yang",
          label: "Yang",
          languageAceEditor: "yang",
        }]
        //#endregion
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
        this.$refs.page4MarvelAceEditorIFrame.setIframe4DemoPage();

        this._onOptionSelect(this.languageOptions[0]);
      },

      //#endregion

      _getDemoByLanguage: function (strLanguage) {
        var oCode = {
          HTML: "<!DOCTYPE html>\n" +
            "<html>\n" +
            "    <head>\n" +
            "\n" +
            "    <style type=\"text/css\">\n" +
            "        .text-layer {\n" +
            "            font-family: Monaco, \"Courier New\", monospace;\n" +
            "            font-size: 12px;\n" +
            "            cursor: text;\n" +
            "        }\n" +
            "    </style>\n" +
            "\n" +
            "    </head>\n" +
            "    <body>\n" +
            "        <h1 style=\"color:red\">Juhu Kinners</h1>\n" +
            "    </body>\n" +
            "</html>",
          Java: "import java.util.ArrayList;\n" +
            "import java.util.Vector;\n" +
            "\n" +
            "public class InfiniteLoop {\n" +
            "\n" +
            "    /*\n" +
            "     * This will cause the program to hang...\n" +
            "     *\n" +
            "     * Taken from:\n" +
            "     * http://www.exploringbinary.com/java-hangs-when-converting-2-2250738585072012e-308/\n" +
            "     */\n" +
            "    public static void main(String[] args) {\n" +
            "        double d = Double.parseDouble(\"2.2250738585072012e-308\");\n" +
            "\n" +
            "        // unreachable code\n" +
            "        System.out.println(\"Value: \" + d);\n" +
            "    }\n" +
            "}",
          Python: "#!/usr/local/bin/python\n" +
            "\n" +
            "import string, sys\n" +
            "\n" +
            "# If no arguments were given, print a helpful message\n" +
            "if len(sys.argv)==1:\n" +
            "    print '''Usage:\n" +
            "celsius temp1 temp2 ...'''\n" +
            "    sys.exit(0)\n" +
            "\n" +
            "# Loop over the arguments\n" +
            "for i in sys.argv[1:]:\n" +
            "    try:\n" +
            "        fahrenheit=float(string.atoi(i))\n" +
            "    except string.atoi_error:\n" +
            "        print repr(i), \"not a numeric value\"\n" +
            "    else:\n" +
            "        celsius=(fahrenheit-32)*5.0/9.0\n" +
            "        print '%i\\260F = %i\\260C' % (int(fahrenheit), int(celsius+.5))",
          XML: '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<query xmlns:yahoo="http://www.yahooapis.com/v1/base.rng"\n' +
            '    yahoo:count="7" yahoo:created="2011-10-11T08:40:23Z" yahoo:lang="en-US">\n' +
            '    <diagnostics>\n' +
            '        <publiclyCallable>true</publiclyCallable>\n' +
            '        <url execution-start-time="0" execution-stop-time="25" execution-time="25"><![CDATA[http://where.yahooapis.com/v1/continents;start=0;count=10]]></url>\n' +
            '        <user-time>26</user-time>\n' +
            '        <service-time>25</service-time>\n' +
            '        <build-version>21978</build-version>\n' +
            '    </diagnostics> \n' +
            '    <results>\n' +
            '        <place xmlns="http://where.yahooapis.com/v1/schema.rng"\n' +
            '            xml:lang="en-US" yahoo:uri="http://where.yahooapis.com/v1/place/24865670">\n' +
            '            <woeid>24865670</woeid>\n' +
            '            <placeTypeName code="29">Continent</placeTypeName>\n' +
            '            <name>Africa</name>\n' +
            '        </place>\n' +
            '        <place xmlns="http://where.yahooapis.com/v1/schema.rng"\n' +
            '            xml:lang="en-US" yahoo:uri="http://where.yahooapis.com/v1/place/24865675">\n' +
            '            <woeid>24865675</woeid>\n' +
            '            <placeTypeName code="29">Continent</placeTypeName>\n' +
            '            <name>Europe</name>\n' +
            '        </place>\n' +
            '        <place xmlns="http://where.yahooapis.com/v1/schema.rng"\n' +
            '            xml:lang="en-US" yahoo:uri="http://where.yahooapis.com/v1/place/24865673">\n' +
            '            <woeid>24865673</woeid>\n' +
            '            <placeTypeName code="29">Continent</placeTypeName>\n' +
            '            <name>South America</name>\n' +
            '        </place>\n' +
            '        <place xmlns="http://where.yahooapis.com/v1/schema.rng"\n' +
            '            xml:lang="en-US" yahoo:uri="http://where.yahooapis.com/v1/place/28289421">\n' +
            '            <woeid>28289421</woeid>\n' +
            '            <placeTypeName code="29">Continent</placeTypeName>\n' +
            '            <name>Antarctic</name>\n' +
            '        </place>\n' +
            '        <place xmlns="http://where.yahooapis.com/v1/schema.rng"\n' +
            '            xml:lang="en-US" yahoo:uri="http://where.yahooapis.com/v1/place/24865671">\n' +
            '            <woeid>24865671</woeid>\n' +
            '            <placeTypeName code="29">Continent</placeTypeName>\n' +
            '            <name>Asia</name>\n' +
            '        </place>\n' +
            '        <place xmlns="http://where.yahooapis.com/v1/schema.rng"\n' +
            '            xml:lang="en-US" yahoo:uri="http://where.yahooapis.com/v1/place/24865672">\n' +
            '            <woeid>24865672</woeid>\n' +
            '            <placeTypeName code="29">Continent</placeTypeName>\n' +
            '            <name>North America</name>\n' +
            '        </place>\n' +
            '        <place xmlns="http://where.yahooapis.com/v1/schema.rng"\n' +
            '            xml:lang="en-US" yahoo:uri="http://where.yahooapis.com/v1/place/55949070">\n' +
            '            <woeid>55949070</woeid>\n' +
            '            <placeTypeName code="29">Continent</placeTypeName>\n' +
            '            <name>Australia</name>\n' +
            '        </place>\n' +
            '    </results>\n' +
            '</query>',
          JSON:'{\n' +
            ' "query": {\n' +
            '  "count": 10,\n' +
            '  "created": "2011-06-21T08:10:46Z",\n' +
            '  "lang": "en-US",\n' +
            '  "results": {\n' +
            '   "photo": [\n' +
            '    {\n' +
            '     "farm": "6",\n' +
            '     "id": "5855620975",\n' +
            '     "isfamily": "0",\n' +
            '     "isfriend": "0",\n' +
            '     "ispublic": "1",\n' +
            '     "owner": "32021554@N04",\n' +
            '     "secret": "f1f5e8515d",\n' +
            '     "server": "5110",\n' +
            '     "title": "7087 bandit cat"\n' +
            '    },\n' +
            '    {\n' +
            '     "farm": "4",\n' +
            '     "id": "5856170534",\n' +
            '     "isfamily": "0",\n' +
            '     "isfriend": "0",\n' +
            '     "ispublic": "1",\n' +
            '     "owner": "32021554@N04",\n' +
            '     "secret": "ff1efb2a6f",\n' +
            '     "server": "3217",\n' +
            '     "title": "6975 rusty cat"\n' +
            '    },\n' +
            '    {\n' +
            '     "farm": "6",\n' +
            '     "id": "5856172972",\n' +
            '     "isfamily": "0",\n' +
            '     "isfriend": "0",\n' +
            '     "ispublic": "1",\n' +
            '     "owner": "51249875@N03",\n' +
            '     "secret": "6c6887347c",\n' +
            '     "server": "5192",\n' +
            '     "title": "watermarked-cats"\n' +
            '    },\n' +
            '    {\n' +
            '     "farm": "6",\n' +
            '     "id": "5856168328",\n' +
            '     "isfamily": "0",\n' +
            '     "isfriend": "0",\n' +
            '     "ispublic": "1",\n' +
            '     "owner": "32021554@N04",\n' +
            '     "secret": "0c1cfdf64c",\n' +
            '     "server": "5078",\n' +
            '     "title": "7020 mandy cat"\n' +
            '    },\n' +
            '    {\n' +
            '     "farm": "3",\n' +
            '     "id": "5856171774",\n' +
            '     "isfamily": "0",\n' +
            '     "isfriend": "0",\n' +
            '     "ispublic": "1",\n' +
            '     "owner": "32021554@N04",\n' +
            '     "secret": "7f5a3180ab",\n' +
            '     "server": "2696",\n' +
            '     "title": "7448 bobby cat"\n' +
            '    }\n' +
            '   ]\n' +
            '  }\n' +
            ' }\n' +
            '}',
          Yang: "module YangDemo{\n" +
            "    namespace \"http://example.com/YangDemo\";\n" +
            "    prefix \"YangDemo\";\n" +
            "\n" +
            "    import huawei-ac-applications {\n" +
            "        prefix app;\n" +
            "    }\n" +
            "    description\n" +
            "        \"The module for YangDemo example.\";\n" +
            "\n" +
            "    revision 2018-06-09 {\n" +
            "        description \"Initial revision\";\n" +
            "    }\n" +
            "\n" +
            "    container system {\n" +
            "        list user {\n" +
            "            app:application-definition \"YangDemo\";\n" +
            "            key \"name\"\n" +
            "            leaf name{\n" +
            "                type string;\n" +
            "            }\n" +
            "            leaf full-name{\n" +
            "                type string;\n" +
            "            }\n" +
            "            leaf class{\n" +
            "                type string;\n" +
            "            }\n" +
            "        }\n" +
            "    }\n" +
            "}",
          Groovy:"//http://groovy.codehaus.org/Martin+Fowler%27s+closure+examples+in+Groovy\n" +
            "\n" +
            "class Employee {\n" +
            "    def name, salary\n" +
            "    boolean manager\n" +
            "    String toString() { return name }\n" +
            "}\n" +
            "\n" +
            "def emps = [new Employee(name:'Guillaume', manager:true, salary:200),\n" +
            "    new Employee(name:'Graeme', manager:true, salary:200),\n" +
            "    new Employee(name:'Dierk', manager:false, salary:151),\n" +
            "    new Employee(name:'Bernd', manager:false, salary:50)]\n" +
            "\n" +
            "def managers(emps) {\n" +
            "    emps.findAll { e -> e.isManager() }\n" +
            "}\n" +
            "\n" +
            "assert emps[0..1] == managers(emps) // [Guillaume, Graeme]\n" +
            "\n" +
            "def highPaid(emps) {\n" +
            "    threshold = 150\n" +
            "    emps.findAll { e -> e.salary > threshold }\n" +
            "}\n" +
            "\n" +
            "assert emps[0..2] == highPaid(emps) // [Guillaume, Graeme, Dierk]\n" +
            "\n" +
            "def paidMore(amount) {\n" +
            "    { e -> e.salary > amount}\n" +
            "}\n" +
            "def highPaid = paidMore(150)\n" +
            "\n" +
            "assert highPaid(emps[0]) // true\n" +
            "assert emps[0..2] == emps.findAll(highPaid)\n" +
            "\n" +
            "def filename = 'test.txt'\n" +
            "new File(filename).withReader{ reader -> doSomethingWith(reader) }\n" +
            "\n" +
            "def readersText\n" +
            "def doSomethingWith(reader) { readersText = reader.text }\n" +
            "\n" +
            "assert new File(filename).text == readersText"
        };

        return oCode[strLanguage];
      },

      _onOptionSelect: function (oItem) {
        var strCode = this._getDemoByLanguage(oItem.key);
        this.$refs.aceEditor.setCode(strCode, oItem.languageAceEditor);
        this.$refs.aceEditor.formatCode();
      },

      _getCode: function () {
        console.log(this.$refs.aceEditor.getCode());
      },

      _changeTheme: function () {
        if(this.theme == "dracula"){
          this.theme = "chrome"
        }else{
          this.theme = "dracula"
        }
      },

      _fontSizeAddition: function () {
        this.fontSize++;
      },

      _fontSizeReduce: function () {
        this.fontSize--;
      },

      _setEditorModel: function () {
        this.readOnly = ! this.readOnly;
      }

      //#endregion
      //#region callback
      //#endregion
      //#region 3rd
      //#endregion
    }
  }
</script>

<style scoped>
  /*document fix style start*/
  .widgetShowSession {
    padding: 20px 100px;
    width: 100%;
    box-sizing: border-box;
  }

  .title {
    color: #4d4d4d;
  }

  .level1 {
    font-size: 32px;
    line-height: 54px;
  }

  .describe {
    font-size: 14px;
    color: #666;
    line-height: 36px;
  }

  .codeArea {
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
    overflow: auto;
  }

  .showAreaInner {
    height: 100%;
    box-sizing: border-box;
  }

  .docArea{
    width: 100%;
  }

  .docArea iframe{
    width: 100%;
    height: 100%;
    border: none;
  }

  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    height: 400px;
  }

  /*document custom style end*/
  /*custom style start*/

  /*custom style end*/

  /*region dark theme*/

  .dark .title {
    color: #ffffff;
  }

  .dark .describe {
    color: #8b90b3;
  }

  /*endregion*/
</style>
