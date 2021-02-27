<template>
  <div class="worker">
    <!--加入员工展示-->
    <el-card shadow="never" class="flex" style="margin: 0 16px;" :body-style="{width: '100%',display: 'flex',padding: '0 100px', alignItem: 'center'}">
      <div class="card-item" v-for="(item, index) in CtaffList.slice(0,5)" :key="index">
        <span :style="{color: TextColor[index + 1]}">{{item.cont}}</span>
        <span>{{TitleTop[index + 1]}}</span>
      </div>
    </el-card>
    <!--异动员工-->
    <section class="wall-width flex row-between card-row">
      <div class="card-img flex-col row-center col-top" :style="{backgroundImage: 'url(' + bgImg[index + 1] + ')'}" v-for="(item, index) in CtaffList.slice(5,10)" :key="index">
        <span>{{TitleBot[index + 1]}}</span>
        <span class="flex">{{item.cont}}<div>人</div></span>
      </div>
    </section>
    <!--日报-->
    <section class="flex row-between" style="padding: 5px 16px 0px 16px;">
        <el-card shadow="never" class="card-log">
          <span class="title">日报</span>
          <el-table
              :data="NeedData"
              max-height="318"
              style="width: 100%">
            <el-table-column
                prop="Name"
                label="需求管理"
                width="180">
            </el-table-column>
            <el-table-column
                prop="Order"
                label="推荐简历"
                width="180">
            </el-table-column>
            <el-table-column
                prop="Resume"
                label="预约面试">
            </el-table-column>
          </el-table>
        </el-card>
        <div class="card-data">
          <el-calendar>
          </el-calendar>
        </div>
    </section>
    <!--top榜数据chart展示-->
    <section style="margin: 25px 16px">
      <el-card shadow="never" class="card-chart" :body-style="{height: '100%'}">
        <span class="title">TOP榜</span>
        <el-row style="height: 100%;">
          <el-col :span="12">
            <div ref="chartQual" class="chart-cont"></div>
          </el-col>
          <el-col :span="12">
            <div ref="chartPNum" class="chart-cont"></div>
          </el-col>
        </el-row>
      </el-card>
    </section>
    <!--需求测试表-->
    <section style="margin: 25px 16px">
      <el-card shadow="never" class="card-chart" :body-style="{height: '100%'}">
        <span class="title">需求测试</span>
        <el-table
            :data="DetectData"
            max-height="318"
            style="width: 100%">
          <el-table-column
              prop="Worker"
              label="需求名称"
              width="180">
          </el-table-column>
          <el-table-column
              prop="Data"
              label="发布时间"
              width="180">
          </el-table-column>
          <el-table-column
              prop="RData"
              label="期望完成时间">
          </el-table-column>
          <el-table-column
              prop="Work"
              label="岗位需求">
          </el-table-column>
          <el-table-column
              prop="RData"
              label="期望完成时间">
          </el-table-column>
          <el-table-column
              prop="Resume"
              label="推送简历">
          </el-table-column>
          <el-table-column
              prop="EnterWork"
              label="已入职">
          </el-table-column>
          <el-table-column
              prop="Confirm"
              label="确定意向">
          </el-table-column>
          <el-table-column
              prop="SuccessRate"
              label="完成率">
          </el-table-column>
        </el-table>
      </el-card>
    </section>
    <!--人员异动chart-->
    <section style="margin: 0 16px">
      <el-card shadow="never" class="card-but" :body-style="{position: 'relative'}">
        <span class="title">人员异动</span>
        <div ref="chartche" class="chart-but"></div>
        <div class="chartche-but flex-col">
          <div class="flex row-between">
            <el-button size="small" round :class="[ActiveIndex == 0 ? 'blue-but2' : 'white-but']" @click="ActiveIndex = 0">近7天</el-button>
            <el-button size="small" round :class="[ActiveIndex == 1 ? 'blue-but' : 'white-but']" @click="ActiveIndex = 1">最近15天</el-button>
            <el-date-picker
                v-model="value1"
                size="small"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="margin-left: 12px">
            </el-date-picker>
          </div>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script>
  // 导入axios请求
  import { GetCtaff, GetNeed, GetDetectd } from "../api/worker";
  // 导入echarts
  import echarts from "echarts";
  export default {
    name: "Worker",
    data() {
      return {
        CtaffList: [],
        ActiveIndex: 0,
        value1: '',
        TextColor: {
          1: "#1E90D0",
          2: "#FFB141",
          3: "#F07676",
          4: "#6AC9A4",
          5: "#7A53FC",
        },
        TitleTop: {
          1: "员工总数",
          2: "正式员工",
          3: "试用期员工",
          4: "试岗期员工",
          5: "入职员工"
        },
        TitleBot: {
          1: "缺勤人数",
          2: "请假人数",
          3: "调休人数",
          4: "外出人数",
          5: "离职人数",
        },
        bgImg: {
          1: require("../assets/img/a111.png"),
          2: require("../assets/img/a112.png"),
          3: require("../assets/img/a113.png"),
          4: require("../assets/img/a114.png"),
          5: require("../assets/img/a115.png"),
        },
        // 日报数据
        NeedData: [],
        // 需求检测
        DetectData: []
      }
    },
    mounted() {
      GetCtaff().then(res=> {
        let obj = res;
        let arr = []
        for (let i in obj) {
          arr.push({"name": i, "cont": obj[i]});
        }
        this.CtaffList = arr;
      })
      // 获取日报数据
      GetNeed().then(res=> {
        this.NeedData = res.data;
      })
      // 获取需求检测数据
      GetDetectd().then(res=> {
        console.log(res)
        this.DetectData = res.data;
      })
      this.chartQuality();
      this.chartPNum();
      this.chartPche();
    },
    methods: {
      chartQuality() {
        let chartQual = echarts.init(this.$refs.chartQual);
        let options = {
          xAxis: {
            type: 'category',
            data: ['张三', '闫慧娟', '王胜', '易彤', '王湾', '罗子君', '文章'],
            axisTick: { show: false }
          },
          yAxis: {
            type: 'value',
            axisTick: { show: false }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '<br/>{a0}: {c0}%'
          },
          series: [{
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#EDD8F8'
              }, {
                offset: 1,
                color: '#ffffff'
              }])
            },
            lineStyle: {    //线条渐变色
              width: 3,
              type: 'solid',
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#F95EA7'
              }, {
                offset: 1,
                color: '#7443FF'
              }])
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }]
        };
        chartQual.setOption(options);
      },
      chartPNum() {
        let chartPN = echarts.init(this.$refs.chartPNum);
        let options = {
          xAxis: {
            type: 'category',
            data: ['张三', '闫慧娟', '王胜', '易彤', '王湾', '罗子君', '文章'],
            axisTick: { show: false }
          },
          yAxis: {
            type: 'value',
            axisTick: { show: false }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '<br/>{a0}: {c0}%'
          },
          series: [{
            lineStyle: {
              width: 4,
              type: 'solid',
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#37DED6'
              }, {
                offset: 1,
                color: '#009BD4'
              }])
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }]
        };
        chartPN.setOption(options);
      },
      chartPche() {
        let chartPN = echarts.init(this.$refs.chartche);
        let options = {
          xAxis: {
            type: 'category',
            data: ['09.01', '09.02', '09.03', '09.04', '09.05', '09.06', '09.07','09.08', '09.09', '09.10', '09.11', '09.12', '09.13', '09.14', '09.15'],
            splitLine: { show:false },
            axisTick: { show: false }
          },
          yAxis: {
            type: 'value',
            splitLine:{ show:false },
            axisTick: { show: false }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '<br/>{a0}: {c0}%'
          },
          legend: {
            data: ['入职人数', '离职人数', '转正人数', '直接访问', '异动人数'],
            bottom: 0
          },
          series: [{
            lineStyle: {
              width: 3,
              type: 'solid',
              color: '#AF91F3',
              // shadowBlurnumbershadowColor: 'rgba(232,228,245,0.1)',
              // shadowBlur: 5
            },
            name: "入职人数",
            data: [30, 31, 32, 35, 31, 29, 25, 20, 15, 10, 23, 30, 30, 35, 37],
            type: 'line',
            smooth: true,
            symbol: 'none'
          },{
            lineStyle: {
              width: 4,
              type: 'solid',
              color: '#6DC8A5'
            },
            name: "离职人数",
            data: [6, 5, 5, 4, 4, 3, 3, 4, 4, 5, 5, 5, 6, 6, 7],
            type: 'line',
            smooth: true,
            symbol: 'none'
          },{
            lineStyle: {
              width: 3,
              type: 'solid',
              color: '#F38787'
            },
            name: "转正人数",
            data: [25, 26, 27, 15, 12, 12, 11, 10, 12, 12, 14, 14, 15, 15, 16],
            type: 'line',
            smooth: true,
            symbol: 'none'
          },{
            lineStyle: {
              width: 3,
              type: 'solid',
              color: '#FCB14C'
            },
            name: "异动人数",
            data: [4, 8, 16, 20, 23, 25, 30, 30, 27, 25, 24, 20, 17, 16, 10],
            type: 'line',
            smooth: true,
            symbol: 'none'
          },]
        };
        chartPN.setOption(options);
      }
    }
  }
</script>

<style lang="scss">
  .worker {
    .el-card {
      border: none;
    }
    .card-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px 0;

      span:first-of-type {
        font-size: 38px;
        font-width: 500;
      }

      span:last-of-type {
        font-size: 15px;
        font-weight: 500;
        margin-top: 3px;
      }
    }
    .card-img {
      width: 301px;
      height: 176px;
      background-repeat: no-repeat;

      span:first-of-type {
        font-size: 17px;
        font-weight: 500;
        color: #fbfbfb;
        margin-left: 40px;
      }
      span:last-of-type {
        font-size: 30px;
        font-weight: 500;
        margin: 9px 0 9px 40px;
        color: #ffffff;
      }
      span:last-of-type div {
        font-size: 14px;
        font-weight: 400;
        color: #fbfbfb;
        margin: 8px 0 0 9px;
      }
    }
    .card-row {
      margin-top: 15px;
    }
    .card-data {
      width: 350px;
      /*height: 400px;*/
      .el-calendar {
        height: 100%;
      }
      .el-calendar__body {
        padding: 12px 20px 20px;
      }
      .el-calendar__header {
        border: 0;
        padding: 20px 20px 0;
      }
      .el-calendar__header .el-calendar__title {
        font-size: 17px;
        font-width: 500 !important;
      }
      .el-calendar-table tr td:first-child {
        border: 0;
      }
      .el-calendar-table tr:first-child td {
        border: 0;
      }
      .el-calendar-table tr:first-child td .el-calendar-day{
        padding-top: 10px;
        height: 53px;
        line-height: 53px;
      }
      .el-calendar-table td {
        border: 0;
      }
      thead th {
        border-bottom: 1px solid #EBEEF5;
        padding-bottom: 23px;
      }
      .el-calendar .el-calendar-day {
        padding: 0;
        height: 43px;
        text-align: center;
        line-height: 43px;
      }
    }
    .card-log {
      width: 75%;
      .el-table {
        margin-top: 16px;
      }
      .el-table th {
        border-top: 1px solid #EBEEF5;
      }
    }
    .card-chart {
      height: 403px;
    }
    .chart-cont {
      width: 760px;
      height: 320px;
    }
    .card-but {
      height: 440px;
      margin-bottom: 40px;
      .chart-but {
        height: 330px;
        width: 1530px;
        margin-top: 20px;
      }
      .chartche-but {
        position: absolute;
        top: 53px;
        right: 66px;
        .white-but {
          border: 1px solid #ffffff;
          font-size: 16px;
        }
        .white-but:hover,
        .white-but:focus,
        .white-but:focus {
          background: #ffffff;
          border: 1px solid #ffffff;
          color: #333333;
        }
        .blue-but {
          background: #127BBF;
          border: 1px solid #127BBF;
          font-size: 16px;
          color: #ffffff;
        }
        .blue-but:hover,
        .blue-but:focus,
        .blue-but:focus {
          color: #ffffff;
        }
        .blue-but2 {
          background: #0398F4;
          border: 1px solid #0398F4;
          font-size: 16px;
          color: #ffffff;
        }
        .blue-but:hover,
        .blue-but:focus,
        .blue-but:focus {
          color: #ffffff;
        }
        .el-range-editor--small.el-input__inner {
          width: 255px;
        }
      }
    }
    .title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .el-table {
      margin-top: 16px;
    }
    .el-table th {
      border-top: 1px solid #EBEEF5;
    }
  }
</style>