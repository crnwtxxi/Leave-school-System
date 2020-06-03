<template>
    <div class="container">
        <el-form :model="ruleForm" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.realname"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="是否有效" prop="valid">
                <el-switch v-model="ruleForm.valid" active-text="有效"></el-switch>
            </el-form-item>
            <el-form-item label="角色" prop="rolename">
                <el-radio-group v-model="ruleForm.role">
                    <el-radio label="office">教务处</el-radio>
                    <el-radio label="library">图书馆</el-radio>
                    <el-radio label="finance">财务处</el-radio>
                    <el-radio label="dorm">后勤处</el-radio>
                    <el-radio label="super">系统管理员</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item style="text-align:center;margin-left:-70px;">
                <el-button type="primary" @click="submitForm('ruleForm')" class="isjs-ac">立即修改</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
    import Vue from 'vue'
    import {doCollect} from '../dataAcquisition.js'
    export default {
        data() {
            return {
                ruleForm: {},
                rules: {
                    name: [
                        { required: true, message: '请输入名字', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
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
                            url: '/api/admin/update',
                            withCredentials : true,
                            data: {
                                username: this.ruleForm.username,
                                realname: this.ruleForm.realname,
                                password: this.ruleForm.password,
                                role: this.ruleForm.role
                            },
                            header: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            this.$notify({
                                title: "管理员修改成功",
                                offset: 100,
                                type: "success",
                                showClose: false,
                                duration: 2000
                            });
                            this.$emit('func');
                        }).catch((error) => {
                            this.$notify({
                                title: "学生信息修改失败",
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
            //获得该行数据
            getRowMsg() {
                var JsonStr = sessionStorage.getItem('rowAdminMsg');
                this.ruleForm = JSON.parse(JsonStr);
            }
        },
        mounted() {
            doCollect();
            this.getRowMsg();
        }
    }
</script>

<style scoped>

</style>