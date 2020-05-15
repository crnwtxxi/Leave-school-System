<template>
    <div class="container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="是否有效" prop="valid">
                <el-switch v-model="ruleForm.valid" active-text="有效"></el-switch>
            </el-form-item>
            <el-form-item label="角色" prop="rolename">
                <el-radio-group v-model="ruleForm.rolename">
                    <el-radio label="office">教务处</el-radio>
                    <el-radio label="library">图书馆</el-radio>
                    <el-radio label="finance">财务处</el-radio>
                    <el-radio label="dorm">后勤处</el-radio>
                    <el-radio label="super">系统管理员</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item style="text-align:center;margin-left:-70px;">
                <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                <el-button @click="resetForm('ruleForm')">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    username: '',
                    name: '',
                    password: '',
                    rolename: '',
                    valid: true
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入名字', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    rolename: [
                        { required: true, message: '请选择一个角色', trigger: 'change' }
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
                            url: '/api/admin/create',
                            withCredentials : true,
                            data: {
                                username: this.ruleForm.username,
                                realname: this.ruleForm.name,
                                password: this.ruleForm.password,
                                role: this.ruleForm.rolename
                            },
                            header: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            // console.log('111');
                            // console.log(res);
                            this.$notify({
                                title: "管理员添加成功",
                                offset: 100,
                                type: "success",
                                showClose: false,
                                duration: 1500
                            });
                            this.$emit('func');
                        }).catch((error) => {
                            console.log('添加管理员失败');
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