<template>
    <div class="container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="realname">
                <el-input v-model="ruleForm.realname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="cardid">
                <el-input v-model="ruleForm.cardid"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio label=1>男</el-radio>
                    <el-radio label=2>女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="学院" prop="college">
                <el-input v-model="ruleForm.college"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major">
                <el-input v-model="ruleForm.major"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="clazz">
                <el-input v-model="ruleForm.clazz"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center;margin-left:-70px;">
                <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        data() {
            return {
                ruleForm: {},
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    realname: [
                        { required: true, message: '请输入名字', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    cardid: [
                        { required: true, message: '请输入身份证', trigger: 'blur' }
                    ],
                    college: [
                        { required: true, message: '请输入学院', trigger: 'blur' }
                    ],
                    major: [
                        { required: true, message: '请输入专业', trigger: 'blur' }
                    ],
                    clazz: [
                        { required: true, message: '请输入班级', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.$axios({
                            method: 'post',
                            url: '/api/student/update',
                            withCredentials : true,
                            data: {
                                username: this.ruleForm.username,
                                password: this.ruleForm.password,
                                role: "student",
                                realname: this.ruleForm.realname,
                                sex: this.ruleForm.sex,
                                cardid: this.ruleForm.cardid,
                                college: this.ruleForm.college,
                                major: this.ruleForm.major,
                                clazz: this.ruleForm.clazz
                            },
                            header: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            console.log('111');
                            console.log(res);
                            this.$notify({
                                title: "学生信息修改成功",
                                offset: 100,
                                type: "success",
                                showClose: false,
                                duration: 1500
                            });
                            this.$emit('func');
                        }).catch((error) => {
                            console.log('学生信息修改失败');
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
            getRowMsg() {
                var JsonStr = sessionStorage.getItem('rowSuperMsg');
                this.ruleForm = JSON.parse(JsonStr);
                console.log("sex:"+this.ruleForm.sex);
            }
        },
        // props: ['rowMsg'],
        mounted() {
            this.getRowMsg();
        }
    }
</script>

<style scoped>

</style>