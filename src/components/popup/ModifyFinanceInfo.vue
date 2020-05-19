<template>
    <div class="container">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name" disabled></el-input>
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
                        { required: true, message: '请输入费用', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert(this.ruleForm.remark);
                        this.$axios({
                            method: 'post',
                            url: '/api/finance/update/'+this.ruleForm.id,
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
                var JsonStr = sessionStorage.getItem('rowFinanceMsg');
                this.ruleForm = JSON.parse(JsonStr);
                console.log(this.ruleForm.name);
            }
        },
        mounted() {
            // console.log("更新");
            this.getRowMsg();
        }
    }
</script>

<style scoped>

</style>