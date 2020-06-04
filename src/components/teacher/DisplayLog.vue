<template>
    <div class="container">
        <div class="locat">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>当前位置</el-breadcrumb-item>
            <el-breadcrumb-item>日志显示</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <div class="content">
        <h3>日志显示：</h3>
        <div class="optBottom">
            <el-button type="primary" @click="clearScreen">清屏</el-button>
            <el-button type="primary" @click="scrollBottom">滚动至底部</el-button>
            <el-button type="primary" @click="autoScroll">{{isScroll}}自动滚动</el-button>
            <el-button type="primary" @click="download">下载<i class="el-icon-download"></i></el-button>
        </div>
        <div class="log">
            <textarea rows="18" v-model="content" class="logcontent" wrap="off" readonly="readonly" ></textarea>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                content:'1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23\n24',
                isAutoScroll:false,
                isScroll:'开启',
                websock:null
            };
        },
        methods: {
            clearScreen(){
                this.content = '';
                this.$notify({
                    offset: 100,
                    title: '清屏成功',
                    type: 'success',
                    duration: 1000
                });
                console.log("clearScreen test!");
            },
            scrollBottom(){
                const tx = document.querySelector(".logcontent");
                tx.scroll(0,tx.scrollHeight);
                console.log("scrollBottom test!");
            },
            autoScroll(){
                if(this.isAutoScroll == true){
                    this.isAutoScroll = false;
                    this.isScroll = '开启'
                }else{
                    this.isAutoScroll = true;
                    this.isScroll = '关闭';
                }
                console.log("autoScroll test!");
            },
            download(){
                console.log("download test!");
            },
            initWebSocket(){ //初始化weosocket
                const wsuri = "ws://106.15.206.229:80/websocket/logging";
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onopen = this.websocketonopen;
                this.websock.onerror = this.websocketonerror;
                this.websock.onclose = this.websocketclose;
                console.log("初始化成功!");
            },
            websocketonopen(){ //连接建立之后执行send方法发送数据
                console.log("webSocket创建成功！");
            },
            websocketonerror(){//连接建立失败重连
                this.initWebSocket();
            },
            websocketonmessage(e){ //数据接收
                console.log("接收到数据！");
                console.log(e); 
            },
            websocketclose(e){  //关闭
                console.log('断开连接',e);
            },
        },
        created() {
            this.initWebSocket();
        },
        destroyed() {
            this.websock.close() //离开路由之后断开websocket连接
        },
    };
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
    .optBottom{
        margin-left: 59%;
    }
    .content h3 {
        margin-left: 40px;
    }
    .log{
        width: 80%;
        margin: 0 auto;
        margin-top: 30px;
    }
    .logcontent{
        width: 100%;
        min-height: 10px;
        resize: none;
        font-size: 25px;
        overflow: scroll;
        outline-color: green;
        outline-width: 2px;
    }
</style>
