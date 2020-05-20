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
            <div class="progress">
                <div class="pro pro1">
                    <div>
                        <el-progress type="circle" :percentage="transPercent(this.percentages.student)"></el-progress>
                        <p>核对个人信息</p>
                    </div>
                </div>
                <div class="pro pro2">
                    <div>
                        <el-progress type="circle" :percentage="transPercent(this.percentages.office)"></el-progress>
                        <p>教务处</p>
                    </div>
                </div>
                <div class="pro pro3">
                    <div>
                        <el-progress type="circle" :percentage="transPercent(this.percentages.finance)"></el-progress>
                        <p>财务处</p>
                    </div>
                </div>
                <div class="pro pro4">
                    <div>
                        <el-progress type="circle" :percentage="transPercent(this.percentages.library)"></el-progress>
                        <p>图书馆</p>
                    </div>
                </div>
                <div class="pro pro5">
                    <div>
                        <el-progress type="circle" :percentage="transPercent(this.percentages.dorm)"></el-progress>
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
                percentages: {}
            }
        },
        methods: {
            //获取进度
            getSchedule() {
                var plan = JSON.parse(sessionStorage.getItem('plan'));
                this.percentages = plan;
            },
            //转换进度
            transPercent(value) {
                if(value) {
                    return 100
                } else {
                    return 0
                }
            },
            setPercentColor(per) {
                if(per=='100') {
                    return '276E51'
                }
            }
        },
        mounted() {
            this.getSchedule();
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