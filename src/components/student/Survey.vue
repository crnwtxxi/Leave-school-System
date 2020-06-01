<template>
  <div class="container" v-loading.fullscreen.lock="loading">
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
            <el-radio-group v-model="item.radio">
              <el-radio label="1">{{item.A.title}}</el-radio>
              <el-radio label="2">{{item.B.title}}</el-radio>
              <el-radio label="3">{{item.C.title}}</el-radio>
              <el-radio label="4">{{item.D.title}}</el-radio>
            </el-radio-group>
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
        <el-button type="success" round v-on:click="handleBack">返回</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import surveylist from '@/components/student/SurveyList'
  export default {
    data() {
      return {
        loading: true,
        msg: "请求成功",
        announceCount: 18,
        sno: "",
        announceViewCount: 18,
        // 展示表格的数据
        tableViewData: [],
        //题目数据
        title: "x",
        questionData: {
          choice: [{
            title: "",
            A: {
              title: ""
            },
            B: {
              title: ""
            },
            C: {
              title: ""
            },
            D: {
              title: ""
            },
            radio: "1"
          }],
          questionAnswer: [{
            title: "你还要其他建议吗?",
            anstion: ""
          }]
        },
        search: "",
        currentPage: 1,
        pageSize: 1

      };
    },
    methods: {
      //更新简答题，并做xss预防
      update(event, val) {
        this.questionData.questionAnswer[val].anstion = this.stripscript(event.currentTarget.value)
      },
      handleBack() {
        this.$router.go(-1)
      },
      //进行xss过滤
      stripscript(s) {
        //过滤掉敏感的字母,预防xss攻击
        var pattern = new RegExp("[%--`~!@#$^&*()=|{}''\\[\\]<>/?~！@#￥……&*（）――|{}【】‘”“']")
        var rs = "";
        for (var i = 0; i < s.length; i++) {
          rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs;
      },

      // 筛选标记位
      filterTag(value, row) {
        return row.tag === value;
      },
      //显示信息
      verify() {
        this.$confirm('确认提交？是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method: 'post',
            url: '/api/survey/finish',
            withCredentials: true,
            data: {
              id: this.$route.query.id,
              sno: this.sno,
              choice: this.questionData.choice,
              questionAnswer: this.questionData.questionAnswer
            },
            header: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          }).then((res) => {
            this.$notify({
              title: "提交成功",
              offset: 100,
              type: "success",
              showClose: false,
              duration: 1500
            });
            this.$emit('func');
          }).catch((error) => {
            this.$notify({
              title: "填写失败",
              offset: 100,
              type: "error",
              showClose: false,
              duration: 1500
            });
          })

        }).catch(() => {
          this.$notify({
            title: "取消",
            offset: 100,
            type: "error",
            showClose: false,
            duration: 1500
          });
        });
      }
    },
    created() {
      //访问后台接口，获取数据
      var user = JSON.parse(sessionStorage.getItem('user'))

      this.sno = user.username
      var Sid = this.$route.query.id
      this.$axios({
        method: 'get',
        url: '/api/survey/write/' + Sid,
      }).then((res) => {
          this.title = res.data.title
          var len = res.data.choice.length
          for (var i = 0; i < len; i++) {
            res.data.choice[i].radio = 1
          }
          this.questionData.choice = res.data.choice;
          var tmpJson = res.data.questionAnswer;
          this.loading = false;
          var len2 = tmpJson.length
          for (var i = 0; i < len2; i++) {
            tmpJson.answer = ' '
          }
          this.questionData.questionAnswer = tmpJson
          this.questionAnswer.questionAnswer = res.data.questionAnswer
        }

      ).catch((error) => {})



    },
    mounted() {}
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

  #choice {
    text-align: center;
  }

  #questionAnswer {
    text-align: center;
  }

  .eInput {
    width: 350px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    height: 40px;
    line-height: 40px;
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
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);

  }

  #submit {
    margin-top: 50px;
    text-align: center;
  }

</style>
