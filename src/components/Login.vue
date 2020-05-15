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
    <el-button @click="toStudent">学生系统入口</el-button>
    <el-button @click="toTeacher">管理员系统入口</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data () {
    return {
        url: {
          codeUrl: '/api/captcha.jpg'
        },
        ruleForm: {
            username: '',
            password: '',
            type: '',
            captcha: ''
        },
        rules: {
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
        // super   dorm library finance office
        roleName: ""
    }
  },
  methods:{
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
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
              // console.log('111');
              // console.log(res);
              var role = res.data.role;
              console.log("登陆成功");
              this.roleName = role;
              // sessionStorage.setItem("roleName",role);
              // console.log(res.data.content);
              sessionStorage.setItem('user', JSON.stringify(res.data));
              if(this.roleName == 'student') {
                this.$router.push('/student');
              } else {
                this.$router.push('/teacher');
              }
            }).catch((error) => {
              console.log('登陆失败');
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers); 
              console.log('Error', error.message);
              console.log(error.config);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    toStudent() {
        this.$router.push('/student');
    },
    toTeacher() {
      sessionStorage.setItem("role",this.role);
      this.$router.push('/teacher');
      // this.$router.push({ name: 'teacher', params: {irole: this.role} });
    },
    reqCode() {
      return "/api/captcha.jpg";
    },
    changeCode() {
      console.log("hahha");
      // this.url.codeUrl = "http://106.15.206.229/captcha.jpg"
      Vue.set(this.url,"codeUrl","http://106.15.206.229/captcha.jpg");
    }
  }
}
</script>


<style scoped>
.login_container {
    position: absolute;
    width: 100%;
    /* background-image: url(~@/assets/bg3.png);
    background-size: 100% 100%;
    background-repeat: no-repeat; */
    /* border: 2px solid #000; */
    /* height: 100%; */
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
