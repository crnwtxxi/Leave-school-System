<template>
    <div class="container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="财务状态" prop="state">
                <el-select v-model="ruleForm.state" placeholder="请选择">
                    <el-option
                        v-for="item in states"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所欠费用" prop="cost">
                <el-input v-model="ruleForm.cost"></el-input>
            </el-form-item>
            <el-form-item label="费用原因" prop="remark">
                <el-input v-model="ruleForm.remark"></el-input>
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
            var checkUsername = (rule, value, callback) => {
                var inputPattern = /^\d{10}$/;
                if (!value) {
                    return callback(new Error('学号不能为空'));
                }
                setTimeout(() => {
                    if (!inputPattern.test(value)) {
                        callback(new Error('请输入正确的学号'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            var checkChinese = (rule, value, callback) => {
                var inputPattern = /[\u4e00-\u9fa5]/;
                if(!value) {
                    callback();
                } else {
                    setTimeout(() => {
                        if (!inputPattern.test(value)) {
                            callback(new Error('请正确输入,只能输入中文'));
                        } else {
                            callback();
                        }
                    }, 1000);
                }
            };
            var checkCost = (rule, value, callback) => {
                var inputPattern = /^-?(([0-9]*(\.[0-9]{1,2})$)|([0-9]+$))/;
                if (!value) {
                    return callback(new Error('费用不能为空'));
                }
                setTimeout(() => {
                    if (!inputPattern.test(value)) {
                        callback(new Error('请输入正确的数字'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            return {
                states: [
                    {
                        value: '0',
                        label: '不满足条件'
                    },
                    {
                        value: '1',
                        label: '满足条件'
                    }
                ],
                ruleForm: {},
                rules: {
                    username: [
                        { validator: checkUsername, trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入名字', trigger: 'blur' },
                        { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
                    ],
                    cost: [
                        { validator: checkCost, trigger: 'blur' }
                    ],
                    remark: [
                        { validator: checkChinese, trigger: 'blur' },
                        { min: 0, max: 20, message: '长度在 0 到 15 个字符', trigger: 'blur' }
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
                            url: '/api/finance/create',
                            withCredentials : true,
                            data: {
                                username: this.ruleForm.username,
                                name: this.ruleForm.name,
                                state: this.ruleForm.state,
                                cost: this.ruleForm.cost,
                                remark: this.ruleForm.remark
                            },
                            header: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            this.$notify({
                                title: "学生信息增加成功",
                                offset: 100,
                                type: "success",
                                showClose: false,
                                duration: 1500
                            });
                            this.$emit('func');
                        }).catch((error) => {
                            this.$notify({
                                title: "学生信息增加失败",
                                message: '该学生的教务信息已经存在 / 该学生不存在，请重新上传',
                                offset: 100,
                                type: "error",
                                showClose: false,
                                duration: 2500
                            });
                            this.resetForm('ruleForm');
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
        }
    }
</script>

<style scoped>

</style>