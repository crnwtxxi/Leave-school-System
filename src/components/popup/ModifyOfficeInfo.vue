<template>
    <div class="container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="user_name">
                <el-input v-model="ruleForm.user_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="处分状态" prop="punish">
                <el-select v-model="ruleForm.punish" placeholder="请选择">
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
            <el-form-item label="学分状态" prop="credit">
                <el-select v-model="ruleForm.credit" placeholder="请选择">
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
            <el-form-item label="原因" prop="remark">
                <el-input v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item style="text-align:center;margin-left:-70px;">
                <el-button type="primary" @click="submitForm('ruleForm')" class="isjs-ac">立即修改</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
    import Vue from 'vue'
    import {checkChinese} from '../../components/reg.js'
    import {doCollect} from '../dataAcquisition.js'
    export default {
        data() {
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
                    remark: [
                        { validator: checkChinese, trigger: 'blur' }
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
                            url: '/api/office/update/'+this.ruleForm.id,
                            withCredentials : true,
                            data: {
                                user_name: this.ruleForm.user_name,
                                name: this.ruleForm.name,
                                punish: this.ruleForm.punish,
                                credit: this.ruleForm.credit,
                                remark: this.ruleForm.remark
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            //获得该行数据
            getRowMsg() {
                var JsonStr = sessionStorage.getItem('rowOfficeMsg');
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