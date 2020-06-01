<template>
  <div class="container" v-loading.fullscreen.lock="loading">
    <div class="locat">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>公共调查</el-breadcrumb-item>
        <el-breadcrumb-item>查看调查结果</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <h3>{{title}}结果：</h3>
      <h3>目前共有{{num}}人填写完成</h3>
      <div class="QA">
        <h4>选择题结果显示</h4>
        <el-collapse v-model="activeNames">
          <el-collapse-item v-for="(item,i) in dataList" v-bind:title="item.title" v-bind:name="i" :key="item.title">
            <div v-bind:id="i">
              A:{{item.A.title}}<el-progress :text-inside="true" :stroke-width="26" :percentage="item.A.score">
              </el-progress>
              B:{{item.A.title}}<el-progress :text-inside="true" :stroke-width="24" :percentage="item.B.score"
                status="success"></el-progress>
              C:{{item.A.title}}<el-progress :text-inside="true" :stroke-width="22" :percentage="item.C.score"
                status="warning"></el-progress>
              D:{{item.A.title}}<el-progress :text-inside="true" :stroke-width="20" :percentage="item.D.score"
                status="exception"></el-progress>
            </div>
          </el-collapse-item>

        </el-collapse>
      </div>
      <div class="QA">
        <h4>简答题结果显示</h4>
        <el-collapse v-model="activeNames2">
          <el-collapse-item v-for="(item,i) in dataTwoList" v-bind:title="item.title" v-bind:name="i" :key="item.title">
            <div v-bind:id="i">
              <el-table :data="item.anstion" height="250" border style="width: 100%">
                <el-table-column prop="id" label="name" width="100"></el-table-column>
                <el-table-column prop="answer" label="answer" width="500"></el-table-column>
                <!-- <el-table-column prop="item.ans.answer" label="ans" width="200"></el-table-column> -->
              </el-table>
            </div>
          </el-collapse-item>

        </el-collapse>
      </div>
      <div id="submit">
        <el-button type="success" round v-on:click="handleBack" id="back">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: "",
        activeNames: ['1'],
        activeNames2: ['1'],
        dataList: [],
        dataTwoList: [],
        num: 0,
        loading:true
        

      };
    },
    methods: {
     //返回上一页
      handleBack(){
      this.$router.go(-1)
      }
    },
    mounted() {
      //获取调查的id号
      var Sid = this.$route.query.id
      this.$axios({
        method: 'get',
        url: '/api/survey/get/' + Sid
      }).then((res) => {
        this.num = res.data.num
        this.title = res.data.title
        this.dataList = res.data.choice
        this.dataTwoList = res.data.questionAnswer
        this.loading=false
      }).catch((error) => {
        this.$notify({
        title: "服务器繁忙",
        offset: 100,
        type: "error",
        showClose: false,
        duration: 1500
        });
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
   #submit {
   margin-top: 50px;
   text-align: center;
   width: 770px;
   }
#back{
  float:right;
}
.QA{
  width: 600px;
  margin-left: 470px
}
</style>
