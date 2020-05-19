<template>
  <div class="container">
    <div class="locat">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>查看调查</el-breadcrumb-item>
        <el-breadcrumb-item>填写公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <h3>填写公告：</h3>
      <div id="choice">
        <div v-for="item in questionData.choice">
          <template>
            <h4>{{item.title}}</h4>
            <el-radio v-model="item.radio" label="1">{{item.A.title}}</el-radio>
            <el-radio v-model="item.radio" label="2">{{item.B.title}}</el-radio>
            <el-radio v-model="item.radio" label="3">{{item.C.title}}</el-radio>
            <el-radio v-model="item.radio" label="4">{{item.D.title}}</el-radio>
          </template>
        </div>
      </div>
      <div id="questionAnswer">
        <div v-for="(item,index) in questionData.questionAnswer">
          <h4>{{item.title}}</h4>
          <input placeholder="请输入您的想法" class="eInput" @input="update($event,index)"></input>
        </div>
      </div>
      <div id="submit">
        <el-button type="success" round v-on:click="verify">提交</el-button>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "请求成功",
      announceCount: 18,
      announceViewCount: 18,
      // 表格的数据
      tableViewData: [],
      //题目数据
      title:"",

      questionData:{
        choice:[
                {
                  title:"你对本次的服务满意程度是多少?",
                  option:[
                      {title:"满意"},
                      {title:"还行"},
                      {title:"一般"},
                      {title:"不满意"}
                 
                  ],
                   radio:'1'
                }
        ],
        questionAnswer:[
              {title:"你还要其他建议吗?",anstion:""}
        ]
      },
      search: "",
      currentPage: 1,
      pageSize: 1
    };
  },
  methods: {
    //   查看公告的点击事件
    update(event,val){
       console.log(val)
       console.log(event.currentTarget.value)
       this.questionData.questionAnswer[val].anstion=event.currentTarget.value  

    }
    ,
    handleView(index, row) {
      this.$router.push({ path: "/teacher/configsurvey", query: { id: row.id } });
    },
    // 设置公告的有效性
    setTag(index, row) {
      if (this.tableViewData[index].tag == "有效") {
        this.tableViewData.some((item, i) => {
          if (item.id == row.id) {
            this.tableViewData[i].tag = "无效";
          }
        });
        this.tableData.some((item, i) => {
          if (item.id == row.id) {
            this.tableData[i].tag = "无效";
          }
        });
      } else {
        this.tableViewData.some((item, i) => {
          if (item.id == row.id) {
            this.tableViewData[i].tag = "有效";
          }
        });
        this.tableData.some((item, i) => {
          if (item.id == row.id) {
            this.tableData[i].tag = "有效";
          }
        });
      }
    },
    // 删除公告的点击事件
    handleDelete(index, row) {
      this.tableData.some((item, index) => {
        if (item.id == row.id) {
          this.tableData.splice(index, 1);
          console.log("删除标题为----《" + item.title + "》----的调查！");
          this.announceCount = this.announceCount - 1;
          if (
            this.announceCount % this.pageSize == 0 &&
            this.announceCount != 0 &&
            this.currentPage != 1
          ) {
            this.handleCurrentChange(this.currentPage - 1);
          } else {
            this.handleCurrentChange(this.currentPage);
          }
          return true;
        }
      });
    },
    // pageSize 改变时会触发
    handleSizeChange(val) {
      console.log(`每页大小为：${val}`);
      this.pageSize = val;
      this.handleCurrentChange(1);
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      console.log(`当前 ${val} 页`);
      this.currentPage = val;
      this.tableViewData.splice(0, this.tableViewData.length);
      for (
        var i = (this.currentPage - 1) * this.pageSize;
        i < this.currentPage * this.pageSize && i < this.announceCount;
        i++
      ) {
        this.tableViewData.push(this.tableData[i]);
      }
    },

    // 筛选标记位
    filterTag(value, row) {
      return row.tag === value;
    },
    verify() {
                

                

                this.$confirm('确认提交？，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  this.$axios({
                            method: 'post',
                            url: 'http://106.15.206.229/survey/finish',
                            withCredentials : true,
                            data: {
                               id:this.$route.query.id,
                               title:this.title,
                               choice:this.questionData.choice,
                               questionAnswer:this.questionData.questionAnswer
                            },
                            header: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            console.log('111');
                            console.log(res);
                            this.$notify({
                                title: "发布成功",
                                offset: 100,
                                type: "success",
                                showClose: false,
                                duration: 1500
                            });
                            this.$emit('func');
                        }).catch((error) => {
                             this.$message({
                                     type: 'info',
                                     message: '发布失败，请重新尝试！'
                                 });  
                            
                            console.log('失败');
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers); 
                            console.log('Error', error.message);
                            console.log(error.config);
                        })
                this.$message({
                    type: 'success',
                    message: '调查提交成功！'
                });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消提交！'
                    });          
                });
            }
  },
  mounted() {
      // var user=JSON.parse(sessionStorage.getItem('user'));
      // console.log(user.username
      var Sid=this.$route.query.id
      //这里记得最后 要改

      console.log(Sid)
      this.$axios({
                       method: 'get',
                       url: 'http://106.15.206.229/survey/write/'+Sid,
                           
                            
                        }).then((res) => {
                            console.log('111');
                            console.log(res.data.choice);
                            this.title=res.data.title
                            this.questionData.choice=res.data.choice
                            var len=this.questionData.choice.length
                            for(var i =0 ; i < len ; i++){
                              this.questionData.choice[i].radio='1'
                            }
                            var tmpJson=res.data.questionAnswer
                            console.log(tmpJson)
                            var len2=tmpJson.length
                            for(var i = 0 ; i < len2 ; i++ ){
                              tmpJson.answer=' '
                            }
                            this.questionData.questionAnswer=tmpJson
                            //this.questionAnswer.questionAnswer=res.data.questionAnswer
                            // console.log(this.title)
                            // 

                            console.log(this.questionData)
                        }).catch((error) => {
                             
                            console.log('调查获取失败');
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers); 
                            console.log('Error', error.message);
                            console.log(error.config);
                        })

    // this.handleCurrentChange(1);
  }
};
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
#table {
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
#page {
  width: 80%;
  margin: 0 auto;
  padding: 30px;
  text-align: center;
}
#add {
  margin-left: 82%;
  margin-bottom: 10px;
}
#choice{
  text-align: center;
}
#questionAnswer{
  text-align: center;
}
.eInput{
  width:350px;
  border-radius: 4px;
  border:1px solid #dcdfe6;
  height: 40px;
  line-height:40px;
      -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    
}
#submit{
  margin-top:50px; 
  text-align: center;
}
</style>