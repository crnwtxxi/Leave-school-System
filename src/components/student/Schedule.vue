<template>
    <div class="container">
        <div class="locat">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >当前位置</el-breadcrumb-item>
                <el-breadcrumb-item>离校手续进度查询</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <h3>离校手续办理进度：</h3>
            <el-progress :percentage="percentage" color="#276E51" style="margin-left: 100px;margin-right: 100px;margin-top: 50px;"></el-progress>
            <div class="progress">
                <div class="pro pro1">
                    <div>
                        <el-progress type="circle" :percentage="percentages.info" :status="status.info"></el-progress>
                        <p>核对个人信息</p>
                    </div>
                </div>
                <div class="pro pro2">
                    <div>
                        <el-progress type="circle" :percentage="percentages.jwc" :status="status.jwc"></el-progress>
                        <p>教务处</p>
                    </div>
                </div>
                <div class="pro pro3">
                    <div>
                        <el-progress type="circle" :percentage="percentages.finance"  :status="status.finance"></el-progress>
                        <p>财务处</p>
                    </div>
                </div>
                <div class="pro pro4">
                    <div>
                        <el-progress type="circle" :percentage="percentages.library"  :status="status.library"></el-progress>
                        <p>图书馆</p>
                    </div>
                </div>
                <div class="pro pro5">
                    <div>
                        <el-progress type="circle" :percentage="percentages.service"  :status="status.service"></el-progress>
                        <p>后勤处</p>
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
                percentage: 20,
                status: {
                    info: 'success',
                    jwc: 'warning',
                    finance: '',
                    library: '',
                    service: ''
                },
                percentages: {
                    info: 100,
                    jwc: 75,
                    finance: 0,
                    library: 0,
                    service: 0
                }
            }
        },
        methods: {

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
.progress {
    /* border: 1px solid #000; */
    margin-top: 70px;
}
.progress .pro {
    /* border: 1px solid red; */
    width: 30%;
    text-align: center;
}
.progress .pro1 {
    float: left;
}
.progress .pro2 {
    float: left;
    margin-left: 5%;
}
.progress .pro3 {
    float: right;
}
.progress .pro4 {
    float: left;
    margin-top: 50px;
}
.progress .pro5 {
    float: left;
    margin-left: 5%;
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