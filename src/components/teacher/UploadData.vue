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
                    <div class="format">
                        <el-image
                            :src="require('@/assets/format.png')" alt="Load Failed">
                        </el-image>
                    </div>
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
                fileList: []
            }
        },
        methods: {
            UploadUrl() {
                return "https://jsonplaceholder.typicode.com/posts/";
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
                console.log(file.raw);
                this.fileList.push(file.raw) ;
                console.log(this.fileList);
            },
            // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
            beforeUploadFile(file) {
                console.log('before upload');
                console.log(file);
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
                    console.log("调上传文件的接口");
                    // let form = new FormData();
                    // form.append('file', this.fileList);
                    // this.$axios({
                    //     method:"post",
                    //     url: "/statistical/uploadbug",
                    //     headers:{
                    //         'Content-type': 'multipart/form-data'
                    //     },
                    //     data: form
                    // }).then((res) => {
                    //     console.log(res);
                    // }).catch((error) => {
                    //     console.log('上传失败');
                    //     console.log(error.response.data);
                    //     console.log(error.response.status);
                    //     console.log(error.response.headers); 
                    //     console.log('Error', error.message);
                    //     console.log(error.config);
                    // })
                }
            }
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