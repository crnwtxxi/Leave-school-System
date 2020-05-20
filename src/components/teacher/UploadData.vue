<template>
    <div class="container">
        <div class="locat">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >当前位置</el-breadcrumb-item>
                <el-breadcrumb-item>学生数据</el-breadcrumb-item>
                <el-breadcrumb-item>上传数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <h3>上传数据：</h3>
            <div class="upload">
                <div class="left">
                    <el-upload
                        class="upload-demo"
                        drag
                        ref="upload"
                        accept=".xlsx"
                        :action="UploadUrl()"
                        :auto-upload="false"
                        :limit="limitNum"
                        :before-upload="beforeUploadFile"
                        :on-change="fileChange"
                        :on-exceed="exceedFile"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :file-list="fileList">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>选择文件</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传xlxs文件，且不超过10M</div>
                    </el-upload>
                    <br/>
                    <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
                    <el-button size="small" @click="cancelUpload">取消</el-button>
                </div>
                <div class="right">
                    <el-divider content-position="left">表头格式</el-divider>
                    <el-table :data="tableDataOffice" border style="width: 100%;" v-if="office">
                        <el-table-column prop="username" label="用户名" width="150"></el-table-column>
                        <el-table-column prop="realname" label="姓名" width="150"></el-table-column>
                        <el-table-column prop="chufen" label="处分" width="150"></el-table-column>
                        <el-table-column prop="xuefen" label="学分" width="150"></el-table-column>
                        <el-table-column prop="remark" label="备注" width="150"></el-table-column>
                    </el-table>
                    <el-table :data="tableDataDorm" border style="width: 100%" v-if="dorm">
                        <el-table-column prop="username" label="用户名" width="150"></el-table-column>
                        <el-table-column prop="realname" label="姓名" width="150"></el-table-column>
                        <el-table-column prop="state" label="状态" width="150"></el-table-column>
                        <el-table-column prop="remark" label="备注" width="150"></el-table-column>
                    </el-table>
                    <el-table :data="tableDataLibrary" border style="width: 100%" v-if="library">
                        <el-table-column prop="username" label="用户名" width="150"></el-table-column>
                        <el-table-column prop="realname" label="姓名" width="150"></el-table-column>
                        <el-table-column prop="state" label="状态" width="150"></el-table-column>
                        <el-table-column prop="cost" label="费用" width="150"></el-table-column>
                        <el-table-column prop="remark" label="备注" width="150"></el-table-column>
                    </el-table>
                    <el-table :data="tableDataFinance" border style="width: 100%" v-if="finance">
                        <el-table-column prop="username" label="用户名" width="150"></el-table-column>
                        <el-table-column prop="realname" label="姓名" width="150"></el-table-column>
                        <el-table-column prop="state" label="状态" width="150"></el-table-column>
                        <el-table-column prop="cost" label="费用" width="150"></el-table-column>
                        <el-table-column prop="remark" label="备注" width="150"></el-table-column>
                    </el-table>
                    <el-table :data="tableDataSuper" border style="width: 100%" v-if="this.super">
                        <el-table-column prop="username" label="用户名" width="150"></el-table-column>
                        <el-table-column prop="realname" label="姓名" width="150"></el-table-column>
                        <el-table-column prop="sex" label="性别" width="150"></el-table-column>
                        <el-table-column prop="password" label="密码" width="150"></el-table-column>
                        <el-table-column prop="cardid" label="身份证号" width="180"></el-table-column>
                        <el-table-column prop="college" label="学院" width="150"></el-table-column>
                        <el-table-column prop="major" label="专业" width="150"></el-table-column>
                        <el-table-column prop="clazz" label="班级" width="150"></el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                limitNum: 1,
                fileList: [],
                uploadRole: "",
                office: false,
                dorm: false,
                library: false,
                finance: false,
                super: false,
                tableDataOffice: [{
                    username: '2017110xxx',
                    realname: '张三',
                    chufen: '0',
                    xuefen: '1',
                    remark: "处分记录未消除"
                }],
                tableDataDorm: [{
                    username: '2017110xxx',
                    realname: '张三',
                    state: '1',
                    remark: "寝室钥匙未归还"
                }],
                tableDataLibrary: [{
                    username: '2017110xxx',
                    realname: '张三',
                    state: '1',
                    cost: "10.3",
                    remark: "借书超期应支付费用"
                }],
                tableDataFinance: [{
                    username: '2017110xxx',
                    realname: '张三',
                    state: '1',
                    cost: "200",
                    remark: "教材费"
                }],
                tableDataSuper: [{
                    username: '2017110xxx',
                    realname: '张三',
                    sex: '女',
                    password: "123456",
                    cardid: "123456199912234567",
                    college: "计算机科学学院",
                    major: "软件工程",
                    clazz: "4"
                }]
            }
        },
        methods: {
            UploadUrl() {
                return "http://106.15.206.229/"+this.uploadRole+"/upload";
            },
            // 文件超出个数限制时的钩子
            exceedFile(files, fileList) {
                this.$notify({
                    title: '文件超出个数限制',
                    message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`,
                    offset: 100,
                    type: 'warning',
                    showClose: false,
                    duration: 1500
                });
            },
            // 文件状态改变时的钩子
            fileChange(file, fileList) {
                this.fileList.push(file.raw) ;
            },
            // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
            beforeUploadFile(file) {
                let extension = file.name.substring(file.name.lastIndexOf('.')+1);
                let size = file.size / 1024 / 1024;
                if(extension !== 'xlsx') {
                    this.$message.warning('只能上传后缀是.xlsx的文件');
                }
                if(size > 10) {
                    this.$message.warning('文件大小不得超过10M');
                }
            },
            // 文件上传成功时的钩子
            handleSuccess(res, file, fileList) {
                this.$notify({
                    title: '文件上传成功',
                    offset: 100,
                    type: 'success',
                    showClose: false,
                    duration: 1500
                });
            },
            // 文件上传失败时的钩子
            handleError(err, file, fileList) {
                this.$notify({
                    title: '文件上传失败',
                    offset: 100,
                    type: 'error',
                    showClose: false,
                    duration: 1500
                });
            },
            //取消上传请求
            cancelUpload() {
                this.$refs.upload.abort();
            },
            uploadFile() {
                if (this.fileList.length === 0){
                    this.$notify({
                        title: '请上传文件',
                        offset: 100,
                        type: 'warning',
                        showClose: false,
                        duration: 1500
                    });
                } else {
                    var formData = new FormData();
                    formData.append('file', this.fileList[0]);
                    this.$axios.post("/api/"+this.uploadRole+"/upload", formData)
                    .then((res) => {
                        this.$notify({
                            title: '文件上传成功',
                            offset: 100,
                            type: 'success',
                            showClose: false,
                            duration: 1500
                        });
                    }).catch((error) => {
                        this.$notify({
                            title: "文件上传失败",
                            message: "请重试",
                            offset: 100,
                            type: "error",
                            showClose: false,
                            duration: 2000
                        });
                    })
                }
            },
            //判断当前管理员角色和初始化
            judgeRole() {
                var user = JSON.parse(sessionStorage.getItem('user'));
                this.uploadRole = user.role;
                switch(this.uploadRole) {
                    case "office": this.office = true;break;
                    case "dorm": this.dorm = true;break;
                    case "library": this.library = true;break;
                    case "finance": this.finance = true;break;
                    case "super": this.super = true;break;
                }
            }
        },
        mounted() {
            this.judgeRole();
        }
    }
</script>

<style scoped>
.locat {
    position: absolute;
    top: 20px;
    left: 40px;
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
.upload {
    /* position: absolute; */
    /* border: 1px solid #000; */
    /* width: 100%; */
    /* left: 70px; */
    /* right: 0; */
    margin-left: 70px;
    margin-top: 50px;
    margin-right: 100px;
}
.right {
    margin-top: 50px;
}


.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>