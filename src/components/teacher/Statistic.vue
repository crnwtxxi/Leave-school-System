<template>
  <div class="container" v-loading.fullscreen.lock="loading">
    <div class="locat">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <h3>数据统计：</h3>
      <div class="statis">
        <div id="main"></div>
        <div id="main2"></div>
        <div id="main3"></div>
        <div id="main4"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: '',
    data() {
      return {
        loading:true,
        total:0,
        charts: '',
        opinion: ['教务处未完成人数', '教务处完成人数'],
        opinion1: ['图书馆未完成人数', '图书馆完成人数'],
        opinion2: ['财务处未完成人数', '财务处完成人数'],
        opinion3: ['后勤未完成人数', '后勤完成人数'],
        opinionData: [{
            value: 31,
            name: '教务处未完成人数'
          },
          {
            value: 310,
            name: '教务处完成人数'
          }
        ],
        opinion1Data: [{
            value: 300,
            name: '图书馆未完成人数'
          },
          {
            value: 200,
            name: '图书馆完成人数'
          }
        ],
        opinion2Data: [{
            value: 300,
            name: "财务处未完成人数"
          },
          {
            value: 200,
            name: '财务处完成人数'
          }
        ],
        opinion3Data: [{
            value: 300,
            name: "后勤未完成人数"
          },
          {
            value: 200,
            name: '后勤完成人数'
          }
        ]


      }
    },
    methods: {
      //加载echart插件
      drawPie(id) {
        this.charts = echarts.init(document.getElementById(id))
        if (id == 'main') {
          var tmp1 = this.opinion
          var tmp2 = this.opinionData
        } else if (id == 'main2') {
          var tmp1 = this.opinion1
          var tmp2 = this.opinion1Data
        } else if (id == 'main3') {
          var tmp1 = this.opinion2
          var tmp2 = this.opinion2Data
        } else {
          var tmp1 = this.opinion3
          var tmp2 = this.opinion3Data
        }
        this.charts.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c}  ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: tmp1
          },
          series: [{
            name: '数据统计',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'blod'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: tmp2
          }]
        })
      },
      //调用get方法获取数据
      getData() {
        this.$axios({
          method: 'get',
          url: '/api//statistic/get'

        }).then((res) => {
          this.total=res.data.Total
          this.opinionData[0].value=this.total-res.data.office
          this.opinionData[1].value=res.data.office
          this.opinion1Data[0].value=this.total-res.data.library
          this.opinion1Data[1].value=res.data.library
          this.opinion2Data[0].value=this.total-res.data.finance
          this.opinion2Data[1].value=res.data.finance
          this.opinion3Data[0].value=this.total-res.data.dorm
          this.opinion3Data[1].value=res.data.dorm
          this.drawPie('main');
          this.drawPie('main2');
          this.drawPie('main3');
          this.drawPie('main4');
          this.loading=false
          
        }).catch((error) => {

        })
      }
    },
    //调用
    mounted() {
     
      this.$nextTick(function () {
         this.getData()
        
      })
    }
  }

</script>

<style scoped>
  .locat {
    position: absolute;
    top: 20px;
    left: 40px;
  }

  .content {
    /* border: 1px solid #000; */
    position: absolute;
    width: 100%;
    top: 70px;
  }

  .content h3 {
    margin-left: 40px;
  }

  .statis {
    position: absolute;
    /* border: 1px solid #000; */
    width: 100%;
    top: 100px;
  }

  #main {
    /* border: 1px solid #000; */
    width: 300px;
    height: 330px;
    margin-left: 70px;
    float: left;
  }

  #main2 {
    /* border: 1px solid #000; */
    width: 300px;
    height: 330px;
    margin-left: 70px;
    float: left;
  }

  #main3 {
    /* border: 1px solid #000; */
    width: 300px;
    height: 330px;
    margin-left: 70px;
    float: left;
  }

  #main4 {
    /* border: 1px solid #000; */
    width: 300px;
    height: 330px;
    margin-left: 70px;
    float: left;
  }


  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
