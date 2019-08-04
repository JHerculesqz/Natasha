<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">MarvelDate2</div>
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
            <button v-on:click="setFormat(`YYYY`)">setFormat: YYYY</button>
            <button v-on:click="setFormat(`YYYY-MM`)">setFormat: YYYY-MM</button>
            <button v-on:click="setFormat(`YYYY-MM-DD`)">setFormat: YYYY-MM-DD</button>
            <button v-on:click="setFormat(`YYYY-MM-DD HH:mm:ss`)">setFormat: YYYY-MM-DD HH:mm:ss</button>
            <button v-on:click="setFormat(`YYYY-MM-DD HH:mm`)">setFormat: YYYY-MM-DD HH:mm</button>
            <button v-on:click="setFormat(`YYYY-MM-DD HH`)">setFormat: YYYY-MM-DD HH</button>
            <button v-on:click="getDate">getDate</button>
            <button v-on:click="setDate">setDate</button>
            <button v-on:click="setRangeDate">setRangeDate</button>
            <button v-on:click="disable">disable</button>
            <button v-on:click="active">active</button>
            <button v-on:click="clearDates">clearDates</button>
            <br>
            <marvel-date2 ref="ref0" v-model="time" :format="format" :disabled="disabled" @input="input"></marvel-date2>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <marvel-ace-editor ref="aceEditor" theme="dracula" :fontSize="15" :readOnly="true" lan="html" codeIn='
            <button v-on:click="setFormat(`YYYY`)">setFormat: YYYY</button>
            <button v-on:click="setFormat(`YYYY-MM`)">setFormat: YYYY-MM</button>
            <button v-on:click="setFormat(`YYYY-MM-DD`)">setFormat: YYYY-MM-DD</button>
            <button v-on:click="setFormat(`YYYY-MM-DD HH:mm:ss`)">setFormat: YYYY-MM-DD HH:mm:ss</button>
            <button v-on:click="setFormat(`YYYY-MM-DD HH:mm`)">setFormat: YYYY-MM-DD HH:mm</button>
            <button v-on:click="setFormat(`YYYY-MM-DD HH`)">setFormat: YYYY-MM-DD HH</button>
            <button v-on:click="getDate">getDate</button>
            <button v-on:click="setDate">setDate</button>
            <button v-on:click="setRangeDate">setRangeDate</button>
            <button v-on:click="disable">disable</button>
            <button v-on:click="active">active</button>
            <button v-on:click="clearDates">clearDates</button>
            <br>
            <marvel-date2 ref="ref0" v-model="time" :format="format" :disabled="disabled" @input="input"></marvel-date2>
            '></marvel-ace-editor>
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
    <!--endregion-->
    <!--region doc area-->
    <div class="docArea">
      <marvel-i-frame ref="IFrame" id="IFrame" src="static/jsdoc/module-MarvelDate2.html"></marvel-i-frame>
    </div>
    <!--endregion-->
  </div>
</template>

<script>
  import MarvelTab from "~~/widget/tab/MarvelTab";
  import MarvelTabItem from "~~/widget/tab/MarvelTabItem";
  import MarvelAceEditor from "~~/widget/aceEditor/MarvelAceEditor";
  import MarvelIFrame from "../../../../../components/MarvelIFrame";
  import MarvelDate2 from "~~/widget/date/MarvelDate2";

  export default {
    name: 'page4MarvelDate2',
    components: {
      MarvelDate2,
      MarvelIFrame,
      MarvelAceEditor,
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
        format:"YYYY-MM-DD HH:mm:ss",
        time: new Date(),
        disabled: false
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
        this.$refs.IFrame.setIframe4DemoPage();
      },

      //#endregion
      
      setFormat: function (strFormat) {
        this.format = strFormat;
      },
      
      getDate: function () {
        var strValue = this.$refs.ref0.getValue();
        console.log(strValue);
      },

      setDate: function () {
        this.time = new Date();
      },

      setRangeDate: function () {
        var startTime = new Date();
        var endTime = new Date();
        endTime = endTime.setDate(endTime.getDate() + 10);
        this.time = [startTime, endTime];
      },
      
      disable: function () {
        this.disabled = true;
      },
      
      active: function () {
        this.disabled = false;
      },
      
      clearDates: function () {
        this.$refs.ref0.clearDates();
      },
      
      input: function (startDate) {
        console.log(startDate);
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
