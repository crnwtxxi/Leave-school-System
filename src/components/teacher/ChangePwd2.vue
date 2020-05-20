<template>
    <div class="changepwd2_container">
        <div class="locat">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >当前位置</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <h3>修改密码：</h3>
            <div class="form">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="原密码" prop="oldPwd">
                        <el-input type="password" v-model="ruleForm.oldPwd" autocomplete="off" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pwd">
                        <el-input type="password" v-model="ruleForm.pwd" autocomplete="off" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPwd" >
                        <el-input type="password" v-model="ruleForm.checkPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">清空</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPwd !== '') {
                        this.$refs.ruleForm.validateField('checkPwd');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                username:'',
                ruleForm: {
                    oldPwd: '',
                    pwd: '',
                    checkPwd: ''
                },
                rules: {
                    oldPwd: [
                        { required: true, message: '请输入原密码', trigger: 'blur' }
                    ],
                    pwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPwd: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            }
            },
            methods: {
                submitForm(formName) {
                    this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.$axios({
                            method: 'post',
                            url: '/api/admin/modify/password',
                            withCredentials : true,
                            data: {
                                username: this.username,
                                password: this.ruleForm.pwd,
                                origin: this.ruleForm.oldPwd
                            },
                            header: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            this.resetForm('ruleForm');
                            this.$notify({
                                title: "密码修改成功",
                                message: "请重新登录",
                                offset: 100,
                                type: "success",
                                showClose: false,
                                duration: 2000
                            });
                            this.$router.push('/login');
                        }).catch((error) => {
                            this.$notify({
                                title: "密码修改失败",
                                message: "请重试",
                                offset: 100,
                                type: "error",
                                showClose: false,
                                duration: 2000
                            });
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
                resetForm(formName) {
                    this.$refs[formName].resetFields();
                },
                getAdminMsg() {
                    var user = JSON.parse(sessionStorage.getItem('user'));
                    this.username = user.username;
                }
            },
            mounted(){
                this.getAdminMsg();
            },
            components: {

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
.form {
    /* border: 1px solid #000; */
    width: 500px;
    margin: 0 auto;
    padding: 30px 20px 0 20px;
}
</style>