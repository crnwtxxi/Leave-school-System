<template>
    <div class="container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码" prop="card_id">
                <el-input v-model="ruleForm.card_id"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="ruleForm.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="学院" prop="college">
                <el-input v-model="ruleForm.college"></el-input>
            </el-form-item>
            <el-form-item label="专业" prop="major">
                <el-input v-model="ruleForm.major"></el-input>
            </el-form-item>
            <el-form-item label="班级" prop="class">
                <el-input v-model="ruleForm.class"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center;margin-left:-70px;">
                <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                <el-button @click="resetForm('ruleForm')">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        data() {
            return {
                ruleForm: {
                    username: "",
                    name: "",
                    card_id: "",
                    sex: "",
                    college: "",
                    major: "",
                    class: ""
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入名字', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    card_id: [
                        { required: true, message: '请输入身份证', trigger: 'blur' }
                    ],
                    college: [
                        { required: true, message: '请输入学院', trigger: 'blur' }
                    ],
                    major: [
                        { required: true, message: '请输入专业', trigger: 'blur' }
                    ],
                    class: [
                        { required: true, message: '请输入班级', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        var pwd = this.ruleForm.card_id.slice(12);
                        this.$axios({
                            method: 'post',
                            url: '/api/student/create',
                            withCredentials : true,
                            data: {
                                username: this.ruleForm.username,
                                password: pwd,
                                role: "student",
                                realname: this.ruleForm.name,
                                sex: this.ruleForm.sex,
                                cardid: this.ruleForm.card_id,
                                college: this.ruleForm.college,
                                major: this.ruleForm.major,
                                clazz: this.ruleForm.class
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
                            console.log('添加学生失败');
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
            }
        }
    }
</script>

<style scoped>

</style>