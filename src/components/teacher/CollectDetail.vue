<template>
    <div class="container">
        <div class="locat">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >当前位置</el-breadcrumb-item>
                <el-breadcrumb-item><a @click="toDataCollect">行为采集</a></el-breadcrumb-item>
                <el-breadcrumb-item>详细数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <h3>用户行为数据：</h3>
            <div class="show">
                <!-- <div class="row">
                    <h5 class="col-xs-2" >下次刷新: <i style="color: #ff2929;" class="js-time">10s</i></h5>
                </div> -->
                <div class="row">
                    <div class="col-xs-2">
                        <p class="head-item bg-primary">
                            <b>用户标识</b>
                            <i class="js-uuid">...</i>
                        </p>
                    </div>
                    <div class="col-xs-2 ">
                        <p class="head-item bg-success">
                            <b>页面访问</b>
                            <i class="js-page">...</i>
                        </p>
                    </div>
                    <div class="col-xs-2 ">
                        <p class="head-item bg-danger">
                            <b>代码异常</b>
                            <i class="js-code">...</i>
                        </p>
                    </div>
                    <div class="col-xs-2 ">
                        <p class="head-item bg-warning">
                            <b>点击次数</b>
                            <i class="js-click">...</i>
                        </p>
                    </div>
                    <div class="col-xs-2 ">
                        <p class="head-item bg-danger">
                            <b>请求异常</b>
                            <i class="js-send">...</i>
                        </p>
                    </div>
                    <div class="col-xs-2 ">
                        <p class="head-item bg-info">
                            <b>输入数据</b>
                            <i class="js-input">...</i>
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <h4>用户轨迹</h4>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>时间点</th>
                                    <th>页面</th>
                                    <th>动作</th>
                                    <th>元素id/class</th>
                                    <th>值</th>
                                </tr>
                            </thead>
                            <tbody class="js-userFoot"></tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <h4>代码异常信息</h4>
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>时间点</th>
                                <th>页面</th>
                                <th>异常摘要</th>
                                <th>位置</th>
                                <th>异常堆栈</th>
                                <th>浏览器信息</th>
                            </tr>
                            </thead>
                            <tbody class="js-errCode"></tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <h4>接口异常信息</h4>
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>时间点</th>
                                <th>页面</th>
                                <th>请求地址</th>
                                <th>请求参数</th>
                                <th>状态码</th>
                                <th>异常信息</th>
                            </tr>
                            </thead>
                            <tbody class="js-reqError"></tbody>
                        </table>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xs-6">
                        <h4>页面性能</h4>
                        <table class="table table-bordered">
                            <thead>
                            <tr>
                                <th>页面</th>
                                <th>DNS</th>
                                <th>TCP</th>
                                <th>WT</th>
                                <th>PRDOM</th>
                                <th>DR</th>
                                <th>ONL</th>
                                <th>FXHR</th>
                                <th>ALLRT</th>
                            </tr>
                            </thead>
                            <tbody class="js-pagePer"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import $ from 'jquery'
    // import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
    // import '../../../node_modules/bootstrap/dist/js/bootstrap.min.js'
    export default {
        data() {
            return {
                username: this.$route.params.username
            }
        },
        methods: {
            toDataCollect() {
                this.$router.push('/teacher/datacollect')
            },
            //发送请求
            getData() {
                var _self = this;
                var user = JSON.parse(sessionStorage.getItem('user'));
                this.$axios({
                    method: 'get',
                    url: '/api/acquisition/get/'+this.username
                }).then((res) => {
                    var ac = []
                    for(var i in res.data.acData) {
                        ac.push(JSON.parse(res.data.acData[i]))
                    }
                    console.log(ac)
                    _self.renderPage(res.data.username, ac);
                }).catch((error) => {
                    console.log(error);
                })
            },
            renderPage(uuid, acData) {
                var pageSize = 0,
                    codeSize = 0,
                    sendSize = 0,
                    clickSize = 0,
                    inputSize = 0;

                var userFoot = [],
                    errCode  = [],
                    reqError = [],
                    pagePer  = [];

                for(var i=0,len=acData.length; i < len; i++){
                    switch (acData[i].type){
                        case 'ACPAGE':
                            pageSize++;
                            userFoot.push('<tr class="' + (userFoot.length % 2 == 0 ? '':'success') +'">' +
                                '<th scope="row">'+ userFoot.length +'</th>' +
                                '<td>'+ acData[i].sTme +'</td>' +
                                '<td>'+ acData[i].path +'</td>' +
                                '<td>页面访问</td><td>无</td><td>无</td></tr>');
                            break;
                        case 'ACINPUT':
                            inputSize++;
                            userFoot.push('<tr class="' + (userFoot.length % 2 == 0 ? '':'success') +'">' +
                                '<th scope="row">'+ userFoot.length +'</th>' +
                                '<td>'+ acData[i].sTme +'</td>' +
                                '<td>'+ acData[i].path +'</td>' +
                                '<td>输入</td>' +
                                '<td>class: '+ acData[i].className +'</td>' +
                                '<td>'+ acData[i].val + '</td></tr>');
                            break;
                        case 'ACCLIK':
                            clickSize++;
                            userFoot.push('<tr class="' + (userFoot.length % 2 == 0 ? '':'success') +'">' +
                                '<th scope="row">'+ userFoot.length +'</th>' +
                                '<td>'+ acData[i].sTme +'</td>' +
                                '<td>'+ acData[i].path +'</td>' +
                                '<td>点击</td>' +
                                '<td>class: '+ acData[i].className +'</td>' +
                                '<td>'+ acData[i].val + '</td></tr>');
                            break;
                        case 'ACRERR':
                            sendSize++;
                            reqError.push('<tr class="' + (reqError.length % 2 == 0 ? '':'success') +'">' +
                                '<td>'+ acData[i].sTme +'</td>' +
                                '<td>'+ acData[i].path +'</td>' +
                                '<td>'+ acData[i].requrl +'</td>' +
                                '<td>'+ acData[i].reqData +'</td>' +
                                '<td>'+ acData[i].status +'</td>' +
                                '<td>'+ acData[i].statusText +'</td></tr>');
                            break;
                        case 'ACTIME':
                            pagePer.push('<tr class="' + (pagePer.length % 2 == 0 ? '':'success') +'">' +
                                '<td>'+ acData[i].path +'</td>' +
                                '<td>'+ acData[i].DNS +'</td>' +
                                '<td>'+ acData[i].TCP +'</td>' +
                                '<td>'+ acData[i].WT +'</td>' +
                                '<td>'+ acData[i].PRDOM +'</td>' +
                                '<td>'+ acData[i].DR +'</td>' +
                                '<td>'+ acData[i].ONL +'</td>' +
                                '<td>'+ acData[i].FXHR +'</td>' +
                                '<td>'+ acData[i].ALLRT +'</td> </tr>');
                            break;
                        case 'ACCERR':
                            codeSize++;
                            errCode.push('<tr class="' + (errCode.length % 2 == 0 ? '':'success') +'">' +
                                '<td>'+ acData[i].sTme +'</td>' +
                                '<td>'+ acData[i].path +'</td>' +
                                '<td>'+ acData[i].msg +'</td>' +
                                '<td>line: '+ acData[i].line + ' <br/> col: ' + acData[i].col +'</td>' +
                                '<td>'+ acData[i].err +'</td>' +
                                '<td>'+ acData[i].ua +'</td></tr>');
                            break;
                    }
                }
                //渲染页面
                $('.js-uuid').text(uuid);
                $('.js-page').text(pageSize + '次');
                $('.js-code').text(codeSize + '条');
                $('.js-click').text(clickSize + '次');
                $('.js-send').text(sendSize + '条');
                $('.js-input').text(inputSize + '条');

                $('.js-userFoot').html(userFoot.join(''));
                $('.js-errCode').html(errCode.join(''));
                $('.js-reqError').html(reqError.join(''));
                $('.js-pagePer').html(pagePer.join(''));

            }
        },
        mounted() {
            this.getData();
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
/* .show {
    border: 1px solid #000;
} */
.row{
    margin: 0;
}
.head-item{
    padding: 25px 0;
}
.head-item > b{
    display: block;
    text-align: center;
}
.head-item > i{
    display: block;
    text-align: center;
    margin-top: 10px;
}
</style>