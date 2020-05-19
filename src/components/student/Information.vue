<template>
    <div class="container">
        <div class="locat">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >当前位置</el-breadcrumb-item>
                <el-breadcrumb-item >个人信息</el-breadcrumb-item>
                <el-breadcrumb-item>核对个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <h3>个人信息：</h3>
            <div class="stuinfo">
                <el-form label-width="80px" :model="form">
                    <el-form-item label="学院">
                        <el-input v-model="form.college" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="专业">
                        <el-input v-model="form.major" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="班级">
                        <el-input v-model="form.class" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="寝室号">
                        <el-input v-model="form.location" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="学号">
                        <el-input v-model="form.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-input v-model="form.sex" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="form.card_id" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item style="text-align:center;">
                        <el-button @click="verify" class="verify">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <el-divider></el-divider>
            <div class="tip">
                注：若以上个人信息不对，请联系学院教务科相关负责老师进行报备更改，一旦点击确定将不可更改。
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    college: "计算机科学学院",
                    major: "软件工程",
                    class: "4班",
                    location: "西3-106",
                    name: "陈香伶",
                    username: "2017110206",
                    sex: "女",
                    card_id: "12345619991022159X"
                }
            }
        },
        methods: {
            verify() {
                this.$confirm('此操作为确认信息无误, 确认后将不可更改，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                this.$message({
                    type: 'success',
                    message: '信息核对成功！'
                });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消核对！'
                    });          
                });
            }
        },
        components: {

        }
    }
</script>

<style scoped>
.locat {
    position: absolute;
    top: 20px;
    left: 30px;
}
.content {
    /* border: 1px solid #000; */
    position: absolute;
    width: 100%;
    top: 70px;
}
.content h3 {
    margin-left: 40px;
}
.stuinfo {
    /* border: 1px solid #000; */
    width: 400px;
    /* margin-left: 200px; */
    margin: 0 auto;
}
.verify {
    /* width: 200px; */
    background-color: #276E51;
    color: #fff;
}
.tip {
    /* border: 1px solid #000; */
    margin-left: 40px;
    font-size: 14px;
    margin-bottom: 20px;
}
</style>