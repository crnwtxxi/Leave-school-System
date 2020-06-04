<template>
    <div class="container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
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
                <el-button type="primary" @click="submitForm('ruleForm')" class="isjs-ac">添加</el-button>
                <el-button @click="resetForm('ruleForm')" class="isjs-ac">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {checkUsername} from '../../components/reg.js'
    import {doCollect} from '../dataAcquisition.js'
    export default {
        data() {
            return {
                ruleForm: {
                    username: '',
                    name: '',
                    rolename: ''
                },
                rules: {
                    username: [
                        { validator: checkUsername, trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入名字', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
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
                        this.$axios({
                            method: 'post',
                            url: '/api/admin/create',
                            withCredentials : true,
                            data: {
                                username: this.ruleForm.username,
                                realname: this.ruleForm.name,
                                password: '123456',
                                role: this.ruleForm.rolename
                            },
                            header: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            this.$notify({
                                title: "管理员添加成功",
                                offset: 100,
                                type: "success",
                                showClose: false,
                                duration: 1500
                            });
                            this.$emit('func');
                        }).catch((error) => {
                            this.$notify({
                                title: "添加管理员失败",
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
            }
        },
        mounted() {
            doCollect();
        }
    }
</script>

<style scoped>

</style>