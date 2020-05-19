<template>
    <div class="container">
        <div class="locat">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >当前位置</el-breadcrumb-item>
                <el-breadcrumb-item >个人信息</el-breadcrumb-item>
                <el-breadcrumb-item>核对个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <h3>个人信息：</h3>
            <div class="stuinfo">
                <el-form label-width="80px" :model="form">
                    <el-form-item label="学院">
                        <el-input v-model="form.college" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="专业">
                        <el-input v-model="form.major" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-input v-model="form.class" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="寝室号">
                        <el-input v-model="form.dorm" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="学号">
                        <el-input v-model="form.id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="form.sex" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="form.cardid" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:center;">
                        <el-button @click="verify" class="verify" v-if="!this.check">{{buttonText}}</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-divider></el-divider>
            <div class="tip">
                注：若以上个人信息不对，请联系学院教务科相关负责老师进行报备更改，一旦点击确定将不可更改。
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {},
                userMsg: {},
                check: "",
                buttonText: ""
            }
        },
        methods: {
            verify() {
                this.$confirm('此操作为确认信息无误, 确认后将不可更改，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios({
                        method: 'post',
                        url: '/api/student/checked/'+this.userMsg.username
                    }).then((res) => {
                        this.$message({
                            type: 'success',
                            message: '信息核对成功！'
                        });
                    }).catch((error) => {
                        console.log('核对失败');
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers); 
                        console.log('Error', error.message);
                        console.log(error.config);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消核对！'
                    });          
                });
            },
            //获取学生所有信息
            getStudentInfo() {
                this.$axios({
                    method: 'get',
                    url: '/api/student/info'
                }).then((res) => {
                    // console.log("hhhhhhhhhhh");
                    console.log(res);
                    this.form = res.data;
                    if(res.data.sex=="1") {
                        this.form.sex = '男'
                    } else {
                        this.form.sex = '女'
                    }
                    if(res.data.dorm=='true') {
                        this.form.dorm = "无"
                    }
                }).catch((error) => {
                    console.log('学生信息获取失败');
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers); 
                    console.log('Error', error.message);
                    console.log(error.config);
                })
            },
            //获取当前用户信息
            getUserInfo() {
                var user = JSON.parse(sessionStorage.getItem('user'));
                this.userMsg = user;
            },
            ifCheck() {
                this.$axios({
                    method: 'get',
                    url: '/api/student/plan'
                }).then((res) => {
                    console.log("-------------------");
                    console.log(res);
                    this.check = res.data.student;
                    sessionStorage.setItem('plan', JSON.stringify(res.data));
                }).catch((error) => {
                    console.log('学生核对情况获取失败');
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers); 
                    console.log('Error', error.message);
                    console.log(error.config);
                })
            }
        },
        mounted() {
            this.getStudentInfo();
            this.getUserInfo();
            this.ifCheck();
        }
    }
</script>

<style scoped>
.locat {
    position: absolute;
    top: 20px;
    left: 30px;
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
.stuinfo {
    /* border: 1px solid #000; */
    width: 400px;
    /* margin-left: 200px; */
    margin: 0 auto;
}
.verify {
    /* width: 200px; */
    background-color: #276E51;
    color: #fff;
}
.tip {
    /* border: 1px solid #000; */
    margin-left: 40px;
    font-size: 14px;
    margin-bottom: 20px;
}
</style>