<template>
  <div class="widgetShowSession">
    <!--1级 start-->
    <div class="title level1">图表控件</div>
    <div class="describe">
      图表控件支持各种展现形式的图表，包括柱状图、饼图、曲线图、仪表盘、走势图等。
    </div>
    <!--1级 end-->
    <!--2级 start-->
    <div class="title level2">仪表盘</div>
    <div class="describe">
      仪表盘
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems1">
        <marvel-tab-item :isActive="tabItems1[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="chart">
              <div style="width: 500px; height: 350px;">
                <marvel-chart-gauge ref="ref1" id="id1" theme="dark"></marvel-chart-gauge>
              </div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems1[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-chart-gauge ref="ref1" id="id1" theme="dark"&gt;&lt;/marvel-chart-gauge&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">能力图</div>
    <div class="describe">
      能力图
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems2">
        <marvel-tab-item :isActive="tabItems2[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div class="chart">
              <div style="width: 500px; height: 350px;">
                <marvel-chart-radar ref="ref2" id="id2" theme="dark"></marvel-chart-radar>
              </div>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems2[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-chart-radar ref="ref2" id="id2" theme="dark"&gt;&lt;/marvel-chart-radar&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">地图</div>
    <div class="describe">
      地图
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems3">
        <marvel-tab-item :isActive="tabItems3[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 500px; height: 350px;">
              <marvel-chart-scatter ref="ref3" id="id3" theme="dark"></marvel-chart-scatter>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems3[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-chart-scatter ref="ref3" id="id3" theme="dark"&gt;&lt;/marvel-chart-scatter&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">地图+柱状图</div>
    <div class="describe">
      地图+柱状图
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems4">
        <marvel-tab-item :isActive="tabItems4[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 850px; height: 350px;">
              <marvel-chart-scatter2 ref="ref4" id="id4" theme="dark"
                                     v-on:onScatterItemClick="onScatterItemClick"></marvel-chart-scatter2>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems4[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-chart-scatter2 ref="ref4" id="id4" theme="dark" v-on:onClick="onScatterItemClick"&gt;&lt;/marvel-chart-scatter2&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">复杂柱状图</div>
    <div class="describe">
      柱状图
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems5">
        <marvel-tab-item :isActive="tabItems5[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 500px; height: 350px">
              <marvel-chart-stack-line ref="ref5" id="id5" theme="dark"></marvel-chart-stack-line>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems5[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">
&lt;marvel-chart-stack-line ref="ref5" id="id5" theme="dark"&gt;&lt;/marvel-chart-stack-line&gt;
                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">折线图</div>
    <div class="describe">
      折线图
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems6">
        <marvel-tab-item :isActive="tabItems6[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 500px; height: 350px">
              <marvel-chart-line ref="ref6" id="id6" theme="dark"></marvel-chart-line>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems6[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">

                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">饼图</div>
    <div class="describe">
      饼图
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems6">
        <marvel-tab-item :isActive="tabItems6[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 500px; height: 350px">
              <marvel-chart-pie ref="ref7" id="id7" theme="dark"></marvel-chart-pie>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems6[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">

                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->

    <!--2级 start-->
    <div class="title level2">柱状图</div>
    <div class="describe">
      柱状图
    </div>
    <div class="showArea">
      <marvel-tab :tabItems="tabItems7">
        <marvel-tab-item :isActive="tabItems7[0].isActive">
          <div class="showAreaInner">
            <!--2级DemoView start-->
            <div style="width: 500px; height: 350px">
              <marvel-chart-bar ref="ref8" id="id8" theme="dark"
                                v-on:onBarItemClick="onBarItemClick">
              </marvel-chart-bar>
            </div>
            <!--2级DemoView end-->
          </div>
        </marvel-tab-item>
        <marvel-tab-item :isActive="tabItems7[1].isActive">
          <div class="codeArea">
            <!--2级CodeView start-->
            <pre>
                <code class="html">

                </code>
              </pre>
            <!--2级CodeView end-->
          </div>
        </marvel-tab-item>
      </marvel-tab>
    </div>
    <!--2级 end-->
  </div>
</template>

<script>
  import MarvelChartGauge from "@/walle/widget/echart/MarvelChartGauge";
  import MarvelChartRadar from "@/walle/widget/echart/MarvelChartRadar";
  import MarvelChartScatter from "@/walle/widget/echart/MarvelChartScatter";
  import MarvelChartStackLine from "@/walle/widget/echart/MarvelChartStackLine";
  import MarvelChartScatter2 from "@/walle/widget/echart/MarvelChartScatter2";
  import MarvelChartLine from "@/walle/widget/echart/MarvelChartLine";
  import MarvelTab from "@/walle/widget/tab/MarvelTab";
  import MarvelTabItem from "@/walle/widget/tab/MarvelTabItem";
  import MarvelChartPie from "@/walle/widget/echart/MarvelChartPie";
  import MarvelChartBar from "@/walle/widget/echart/MarvelChartBar";

  export default {
    name: 'page4Chart',
    components: {
      MarvelChartBar,
      MarvelChartPie,
      MarvelChartLine,
      MarvelChartScatter2,
      MarvelChartStackLine,
      MarvelChartScatter,
      MarvelChartRadar,
      MarvelChartGauge,
      MarvelTab,
      MarvelTabItem
    },
    data: function () {
      return {
        //#region document data
        tabItems1: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        tabItems2: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        tabItems3: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        tabItems4: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        tabItems5: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        tabItems6: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        tabItems7: [
          {
            label: "Demo View",
            isActive: true
          },
          {
            label: "Code View",
            isActive: false
          }
        ],
        //#endregion
        //#region custom data
        gaugeData: {
          title: "新产生告警",
          key: "产生率",
          value: 0
        },
        radarData: {
          title: "告警分布",
          seriesTitle: [
            {name: '告警1', max: 300},
            {name: '告警2', max: 250},
            {name: '告警3', max: 300},
            {name: '告警4', max: 5},
            {name: '告警5', max: 200},
            {name: '告警7', max: 100}
          ],
          seriesName: "",
          data: []
        },
        scatterData: {
          title: "机床利用率",
          name: "usage",
          subtxt: "",
          sublink: "",
          geoType: "china",
          topN: 3,
          data: [{
            name: "机床1",
            value: [121.15, 31.89, 100]
          }, {
            name: "机床2",
            value: [120.38, 37.35, 50]
          }, {
            name: "机床3",
            value: [122.207216, 29.985295, 20]
          }, {
            name: "机床4",
            value: [123.97, 47.33, 10]
          }, {
            name: "机床5",
            value: [120.33, 36.07, 1]
          }]
        },
        scatterData2: {
          title: "机床利用率",
          name: "usage",
          subtxt: "",
          sublink: "",
          geoType: "world",
          geoZoom: 0.9,
          topN: 5,
          topNEx: 10,
          data: [{
            name: "机床1",
            value: [121.15, 31.89, 100]
          }, {
            name: "机床2",
            value: [120.38, 37.35, 50]
          }, {
            name: "机床3",
            value: [122.207216, 29.985295, 20]
          }, {
            name: "机床4",
            value: [123.97, 47.33, 10]
          }, {
            name: "机床5",
            value: [120.33, 36.07, 1]
          }]
        },
        stackLineData: {
          y1Title: "机床状态用时(小时)",
          y2Title: "机床在线率(%)",
          category: ["加工", "待机", "离线", "机床在线率"],
          data: [{
            label: "2017-7-1",
            value: [12, 3, 9, 50]
          }, {
            label: "2017-7-2",
            value: [8, 4, 12, 33]
          }, {
            label: "2017-7-3",
            value: [6, 10, 8, 25]
          }, {
            label: "2017-7-4",
            value: [4, 10, 10, 17]
          }, {
            label: "2017-7-5",
            value: [18, 3, 3, 75]
          }, {
            label: "2017-7-6",
            value: [20, 3, 1, 83]
          }, {
            label: "2017-7-7",
            value: [16, 3, 5, 66]
          }, {
            label: "2017-7-8",
            value: [12, 6, 6, 50]
          }]
        },
        lineData: {
          title: "温度",
          data: []
        },
        pieData: {
          title: "性别",
          subTitle: "联合国出品",
          radius: "50%",
          legendItems: ["男", "女", "不男不女", "伪娘", "女汉子"],
          data: [
            {name: "男", value: 10},
            {name: "女", value: 20},
            {name: "不男不女", value: 10},
            {name: "伪娘", value: 30},
            {name: "女汉子", value: 30},
          ],
        },
        barData: {
          title: "分数",
          xData: ["张三", "李四", "王五", "麻子六"],
          yData: [100, 70, 40, 10],
          lstBuObj: ["张三ID", "李四ID", "王五ID", "麻子六ID"],
        },
        interval1: null,
        interval2: null,
        interval3: null,
        //#endregion
      }
    },
    mounted: function () {
      //#region custom
      var self = this;
      //1.
      this.interval1 = setInterval(function () {
        self.gaugeData.value = (Math.random() * 100).toFixed(2) - 0;
        self.$refs.ref1.setData(self.gaugeData);
      }, 2000);
      //2.
      this.interval2 = setInterval(function () {
        //region data
        var dataBJ = [
          [55, 9, 56, 0.46, 18, 6, 1],
          [25, 11, 21, 0.65, 34, 9, 2],
          [56, 7, 63, 0.3, 14, 5, 3],
          [33, 7, 29, 0.33, 16, 6, 4],
          [42, 24, 44, 0.76, 40, 16, 5],
          [82, 58, 90, 1.77, 68, 33, 6],
          [74, 49, 77, 1.46, 48, 27, 7],
          [78, 55, 80, 1.29, 59, 29, 8],
          [267, 216, 280, 4.8, 108, 64, 9],
          [185, 127, 216, 2.52, 61, 27, 10],
          [39, 19, 38, 0.57, 31, 15, 11],
          [41, 11, 40, 0.43, 21, 7, 12],
          [64, 38, 74, 1.04, 46, 22, 13],
          [108, 79, 120, 1.7, 75, 41, 14],
          [108, 63, 116, 1.48, 44, 26, 15],
          [33, 6, 29, 0.34, 13, 5, 16],
          [94, 66, 110, 1.54, 62, 31, 17],
          [186, 142, 192, 3.88, 93, 79, 18],
          [57, 31, 54, 0.96, 32, 14, 19],
          [22, 8, 17, 0.48, 23, 10, 20],
          [39, 15, 36, 0.61, 29, 13, 21],
          [94, 69, 114, 2.08, 73, 39, 22],
          [99, 73, 110, 2.43, 76, 48, 23],
          [31, 12, 30, 0.5, 32, 16, 24],
          [42, 27, 43, 1, 53, 22, 25],
          [154, 117, 157, 3.05, 92, 58, 26],
          [234, 185, 230, 4.09, 123, 69, 27],
          [160, 120, 186, 2.77, 91, 50, 28],
          [134, 96, 165, 2.76, 83, 41, 29],
          [52, 24, 60, 1.03, 50, 21, 30],
          [46, 5, 49, 0.28, 10, 6, 31]
        ];
        var dataGZ = [
          [26, 37, 27, 1.163, 27, 13, 1],
          [85, 62, 71, 1.195, 60, 8, 2],
          [78, 38, 74, 1.363, 37, 7, 3],
          [21, 21, 36, 0.634, 40, 9, 4],
          [41, 42, 46, 0.915, 81, 13, 5],
          [56, 52, 69, 1.067, 92, 16, 6],
          [64, 30, 28, 0.924, 51, 2, 7],
          [55, 48, 74, 1.236, 75, 26, 8],
          [76, 85, 113, 1.237, 114, 27, 9],
          [91, 81, 104, 1.041, 56, 40, 10],
          [84, 39, 60, 0.964, 25, 11, 11],
          [64, 51, 101, 0.862, 58, 23, 12],
          [70, 69, 120, 1.198, 65, 36, 13],
          [77, 105, 178, 2.549, 64, 16, 14],
          [109, 68, 87, 0.996, 74, 29, 15],
          [73, 68, 97, 0.905, 51, 34, 16],
          [54, 27, 47, 0.592, 53, 12, 17],
          [51, 61, 97, 0.811, 65, 19, 18],
          [91, 71, 121, 1.374, 43, 18, 19],
          [73, 102, 182, 2.787, 44, 19, 20],
          [73, 50, 76, 0.717, 31, 20, 21],
          [84, 94, 140, 2.238, 68, 18, 22],
          [93, 77, 104, 1.165, 53, 7, 23],
          [99, 130, 227, 3.97, 55, 15, 24],
          [146, 84, 139, 1.094, 40, 17, 25],
          [113, 108, 137, 1.481, 48, 15, 26],
          [81, 48, 62, 1.619, 26, 3, 27],
          [56, 48, 68, 1.336, 37, 9, 28],
          [82, 92, 174, 3.29, 0, 13, 29],
          [106, 116, 188, 3.628, 101, 16, 30],
          [118, 50, 0, 1.383, 76, 11, 31]
        ];
        var dataSH = [
          [91, 45, 125, 0.82, 34, 23, 1],
          [65, 27, 78, 0.86, 45, 29, 2],
          [83, 60, 84, 1.09, 73, 27, 3],
          [109, 81, 121, 1.28, 68, 51, 4],
          [106, 77, 114, 1.07, 55, 51, 5],
          [109, 81, 121, 1.28, 68, 51, 6],
          [106, 77, 114, 1.07, 55, 51, 7],
          [89, 65, 78, 0.86, 51, 26, 8],
          [53, 33, 47, 0.64, 50, 17, 9],
          [80, 55, 80, 1.01, 75, 24, 10],
          [117, 81, 124, 1.03, 45, 24, 11],
          [99, 71, 142, 1.1, 62, 42, 12],
          [95, 69, 130, 1.28, 74, 50, 13],
          [116, 87, 131, 1.47, 84, 40, 14],
          [108, 80, 121, 1.3, 85, 37, 15],
          [134, 83, 167, 1.16, 57, 43, 16],
          [79, 43, 107, 1.05, 59, 37, 17],
          [71, 46, 89, 0.86, 64, 25, 18],
          [97, 71, 113, 1.17, 88, 31, 19],
          [84, 57, 91, 0.85, 55, 31, 20],
          [87, 63, 101, 0.9, 56, 41, 21],
          [104, 77, 119, 1.09, 73, 48, 22],
          [87, 62, 100, 1, 72, 28, 23],
          [168, 128, 172, 1.49, 97, 56, 24],
          [65, 45, 51, 0.74, 39, 17, 25],
          [39, 24, 38, 0.61, 47, 17, 26],
          [39, 24, 39, 0.59, 50, 19, 27],
          [93, 68, 96, 1.05, 79, 29, 28],
          [188, 143, 197, 1.66, 99, 51, 29],
          [174, 131, 174, 1.55, 108, 50, 30],
          [187, 143, 201, 1.39, 89, 53, 31]
        ];
        //endregion
        var i = Math.random() * 100;
        if (i > 0 && i < 30) {
          self.radarData.data = dataBJ;
        }
        else if (i > 30 && i < 50) {
          self.radarData.data = dataGZ;
        }
        else {
          self.radarData.data = dataSH;
        }
        self.$refs.ref2.setData(self.radarData);
      }, 2000);
      //3.
      self.$refs.ref3.setData(self.scatterData);
      self.$refs.ref4.setData(self.scatterData2);
      //4.
      self.$refs.ref5.setData(self.stackLineData);
      //5.
      var i = 1;
      this.interval3 = setInterval(function () {
        var oNow = new Date();
        var oTime = new Date(+oNow + i * 1000 * 60 * 60 * 24);
        var strTime = [oTime.getFullYear(), oTime.getMonth() + 1, oTime.getDate()].join('-');
        var oValue = Math.random();
        self.lineData.data.push({name: strTime, value: [strTime, oValue]});
        i++;
        self.$refs.ref6.setData(self.lineData);
      }, 2000);
      //6.
      self.$refs.ref7.setData(self.pieData);
      //7.
      self.$refs.ref8.setData(self.barData);
      //#endregion
    },
    beforeDestroy: function () {
      //#region custom
      if (this.interval1 != null) {
        clearInterval(this.interval1);
      }
      if (this.interval2 != null) {
        clearInterval(this.interval2);
      }
      if (this.interval3 != null) {
        clearInterval(this.interval3);
      }
      //#endregion
    },
    methods: {
      //#region inner
      onScatterItemClick: function (oItem) {
        console.log(oItem);
      },
      onBarItemClick: function (oItem, oBuObj) {
        console.log(oItem);
        console.log(oBuObj);
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

  .codeArea pre, .codeArea code {
    padding: 0;
    margin: 0;
    min-width: 100%;
    float: left;
  }

  .showAreaInner {
    padding-top: 36px;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
  }

  /*document fix  style end*/
  /*document custom style start*/
  .showArea {
    width: 100%;
    height: 400px;
  }

  /*document custom style end*/
  /*custom style start*/
  .chart {
    height: 100%;
    overflow-y: scroll;
  }

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
