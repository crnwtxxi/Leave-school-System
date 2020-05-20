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
            var checkCardid = (rule, value, callback) => {
                var inputPattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if (!value) {
                    return callback(new Error('身份证不能为空'));
                }
                setTimeout(() => {
                    if (!inputPattern.test(value)) {
                        callback(new Error('请输入正确的身份证号'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            var checkChinese = (rule, value, callback) => {
                var inputPattern = /[\u4e00-\u9fa5]/;
                if (!value) {
                    return callback(new Error('不能为空'));
                }
                setTimeout(() => {
                    if (!inputPattern.test(value)) {
                        callback(new Error('请正确输入,只能输入中文'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            var checkClass = (rule, value, callback) => {
                var inputPattern = /^\d{1,2}$/;
                if (!value) {
                    return callback(new Error('班级不能为空'));
                }
                setTimeout(() => {
                    if (!inputPattern.test(value)) {
                        callback(new Error('请输入正确的数字，长度为1-2'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            return {
                ruleForm: {},
                rules: {
                    realname: [
                        { required: true, message: '请输入名字', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ],
                    cardid: [
                        { validator: checkCardid, trigger: 'blur' }
                    ],
                    college: [
                        { validator: checkChinese, trigger: 'blur' }
                    ],
                    major: [
                        {validator: checkChinese, trigger: 'blur' }
                    ],
                    clazz: [
                        { validator: checkClass, trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            //提交修改表单
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
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
                            this.$notify({
                                title: "学生信息修改成功",
                                offset: 100,
                                type: "success",
                                showClose: false,
                                duration: 1500
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
            //获取这一行的信息
            getRowMsg() {
                var JsonStr = sessionStorage.getItem('rowSuperMsg');
                this.ruleForm = JSON.parse(JsonStr);
            }
        },
        mounted() {
            this.getRowMsg();
        }
    }
</script>

<style scoped>

</style>