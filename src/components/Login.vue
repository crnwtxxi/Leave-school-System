<template>
  <div class="login_container">
    <div class="login">
        <div class="title">
            Log in
        </div>
        <el-divider><i class="el-icon-s-promotion" style="font-size:20px;color:#276E51"></i></el-divider>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份" prop="type" style="text-align: center;">
                <el-radio-group v-model="ruleForm.type">
                <el-radio label="student"></el-radio>
                <el-radio label="admin"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="验证码" prop="captcha">
                <el-input v-model="ruleForm.captcha"></el-input>
                <!-- 验证码 -->
                <div class="code">
                  <el-image
                    class="img"
                    v-if="!code"
                    :src="url.codeUrl">
                  </el-image>
                  <el-button type="text" @click="changeCode()">看不清，换一张</el-button>
                </div>
            </el-form-item>
            <el-form-item style="text-align: center;margin-left:-70px;">
                <el-button style="background-color:#276E51;color:#fff;" @click="submitForm('ruleForm')">登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-button @click="toHome">返回首页</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  inject:['reload'], 
  data () {
    return {
        url: {
          codeUrl: '/api/captcha.jpg'
        },
        code: false,
        ruleForm: {
            username: '',
            password: '',
            type: '',
            captcha: ''
        },
        rules: {
          //验证
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择登录身份', trigger: 'change' }
          ],
          captcha: [
            { required: true, message: '请输入正确的验证码', trigger: 'blur' }
          ]
        },
        role: "super",
        roleName: ""
    }
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'post',
              url: '/api/login',
              withCredentials : true,
              data: {
                  username: this.ruleForm.username,
                  password: this.ruleForm.password,
                  type: this.ruleForm.type,
                  captcha: this.ruleForm.captcha
              },
              header: {
                  'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then((res) => {
              var role = res.data.role;
              this.$notify({
                    title: "登陆成功",
                    offset: 100,
                    type: "success",
                    showClose: false,
                    duration: 2000
                });
              this.roleName = role;
              sessionStorage.setItem('user', JSON.stringify(res.data));
              if(this.roleName == 'student') {
                this.$router.push('/student');
              } else {
                this.$router.push('/teacher');
              }
            }).catch((error) => {
              if(error.response.status==401) {
                this.$notify({
                    title: "登陆失败",
                    message: "用户名或密码错误 / 或者验证码错误，请重新登录",
                    offset: 100,
                    type: "error",
                    showClose: false,
                    duration: 2000
                });
                this.reload();//刷新页面
              }
            })
          } else {
            this.$notify({
                title: "表单提交失败",
                message: "请重试",
                offset: 100,
                type: "error",
                showClose: false,
                duration: 2000
            });
            return false;
          }
        });
    },
    //清空表单
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    //返回首页
    toHome() {
        this.$router.push('/');
    },
    //请求验证码
    reqCode() {
      return "/api/captcha.jpg";
    },
    //看不清，换一张
    changeCode() {
      var flag = this.code;
      if(flag) {
        this.code = false;
      } else {
        this.code = true;
      }
    }
  }
}
</script>


<style scoped>
.login_container {
    position: absolute;
    width: 100%;
    background-color: #F2F2F2;
}
.login {
    position: absolute;
    width: 400px;
    top: 200px;
    left: 50%;
    margin-left: -230px;
    background-color: #fff;
    padding: 50px 30px 30px 30px;
    border-radius: 15px;
    box-shadow: 5px 10px 35px #ccc;
}
.title {
    font-family: 'impact';
    font-size: 36px;
    text-align: center;
    color: #276E51;
}
.code {
  /* border: 1px solid #000; */
  margin-top: 10px;
  text-align: center;
}
.img {
  width: 100px;
  height: 50px;
}
</style>
