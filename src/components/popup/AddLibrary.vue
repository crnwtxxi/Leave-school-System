<template>
    <div class="container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="借书状态" prop="state">
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
                <el-button type="primary" @click="submitForm('ruleForm')" class="isjs-ac">立即添加</el-button>
                <el-button @click="resetForm('ruleForm')" class="isjs-ac">清空</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {checkChinese, checkCost, checkUsername, checkName} from '../../components/reg.js'
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
                    cost: [
                        {validator:checkCost,  trigger: 'blur' }
                    ],
                    remark: [
                        {validator:checkChinese,trigger: 'blur' }
                     ],
                     username:[
                        {validator:checkUsername,trigger: 'blur' }
                     ],
                     name:[
                       {validator:checkName,trigger: 'blur' }
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
                            url: '/api/library/create',
                            withCredentials : true,
                            data: {
                                username:this.ruleForm.username,
                                name:this.ruleForm.name,
                                state:this.ruleForm.state,
                                cost:this.ruleForm.cost,
                                remark:this.ruleForm.remark
                         },
                         header: {
                            'Content-Type': 'application/json;charset=UTF-8'
                         }
                         }).then((res) => {
      
                         this.$notify({
                            title: "添加成功",
                            offset: 100,
                            type: "success",
                            showClose: false,
                            duration: 1500
                         });
                         this.$emit('func');
                         
                         }).catch((error) => {
                             this.$notify({
                             title: "服务器繁忙",
                             offset: 100,
                             type: "error",
                             showClose: false,
                             duration: 1500
                             });
                         }
                             
                         )
                    } else {
                        
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