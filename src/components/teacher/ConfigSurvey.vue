<template>
    <div class="container">
        <div class="locat">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >当前位置</el-breadcrumb-item>
                <el-breadcrumb-item>公共调查</el-breadcrumb-item>
                <el-breadcrumb-item>查看调查结果</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <h3>调查结果统计分析({{title}})：</h3>
            <div style="width: 600px;margin-left: 300px">
                    <h4>选择题结果显示</h4>
                    <el-collapse v-model="activeNames" >
                        <el-collapse-item v-for="(item,i) in dataList" v-bind:title="item.title" v-bind:name="i" :key="item.title">
                            <div v-bind:id="i">
                                A:{{item.A.title}}<el-progress :text-inside="true" :stroke-width="26" :percentage="item.A.score"></el-progress>
                                B:{{item.A.title}}<el-progress :text-inside="true" :stroke-width="24" :percentage="item.B.score" status="success"></el-progress>
                                C:{{item.A.title}}<el-progress :text-inside="true" :stroke-width="22" :percentage="item.C.score" status="warning"></el-progress>
                                D:{{item.A.title}}<el-progress :text-inside="true" :stroke-width="20" :percentage="item.D.score" status="exception"></el-progress>
                            </div>
                        </el-collapse-item>
                        
                    </el-collapse>
            </div>
             <div style="width: 600px;margin-left: 300px">
                    <h4>简答题结果显示</h4>
                    <el-collapse v-model="activeNames2" >
                        <el-collapse-item v-for="(item,i) in dataTwoList" v-bind:title="item.title" v-bind:name="i" :key="item.title">
                            <div v-bind:id="i">
                               <el-table :data="item.ans" height="250" border style="width: 100%">
                                   <el-table-column prop="id" label="name" width="100"></el-table-column>
                                   <el-table-column prop="answer" label="answer" width="495"></el-table-column>
                                   <!-- <el-table-column prop="item.ans.answer" label="ans" width="200"></el-table-column> -->
                               </el-table>
                            </div>
                        </el-collapse-item>
                        
                    </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>
    
    export default {
    data() {
      return {
        title:"第几次调查",
        activeNames: ['1'],
        activeNames2:['1'],
        dataList:[{title:'1.你觉得本次服务怎么样?',A:{title:"满意",score:20},B:{title:'b满意',score:30},C:{title:'c满意',score:30},D:{title:'d满意',score:30}},{title:'2.你觉得老师怎么样？',A:{title:'满意',score:30},B:{title:'b满意',score:30},C:{title:'c满意',score:30},D:{title:'d满意',score:30}}],
        dataTwoList:[{title:"有什么建议吗？",ans:[{id:'还好',answer:'okok'},{id:'Fin',answer:'fine'},{name:'zhang',answer:'nonono'},{id:'zhang',answer:'nonono'},{id:'zhang',answer:'nonono'},{id:'zhang',answer:'nonono'}]}]
        
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      loadEchart(i){

      }
      ,
      drawPie(id){
               // console.log("i am here")
                console.log(id)
                this.charts = echarts.init(document.getElementById(id))
                if(id == 1){
                  var tmp1=this.opinion
                  var tmp2=this.opinionData
                }
                else if (id == 'main2'){
                  var tmp1=this.opinion1
                  var tmp2=this.opinion1Data
                }
                else if (id=='main3'){
                  var tmp1=this.opinion2
                  var tmp2=this.opinion2Data
                }
                else {
                  var tmp1=this.opinion3
                  var tmp2=this.opinion3Data
                }

                this.charts.setOption({
                  tooltip: {
                    trigger: 'item',
                    formatter: '{a}<br/>{b}:{c}  ({d}%)'
                  },
                  legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:tmp1
                  },
                  series: [
                    {
                        name:'数据统计',
                        type:'pie',
                        radius:['50%','70%'],
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
                      data:tmp2
                    }
                  ]
                })
          }
    },
    mounted(){
      var Sid=this.$route.query.id
      console.log(Sid)
      this.$axios({
                            method: 'get',
                            url: 'http://106.15.206.229/survey/get/'+Sid,
                           
                            
                        }).then((res) => {
                            console.log('111');
                           // console.log(res.data);
                            this.title=res.data.title
                            this.dataList=res.data.choice
                            this.dataTwoList=res.data.questionAnswer
                            // 

                            
                        }).catch((error) => {
                             
                            console.log('调查获取失败');
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers); 
                            console.log('Error', error.message);
                            console.log(error.config);
                        })
            // this.$nextTick(function() {
              //  this.drawPie(1);
                
            // })
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
</style>