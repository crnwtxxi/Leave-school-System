<template>
    <div class="home_container">
        <div class="header">
            <div class="system">数字离线系统</div>
            <div class="login" @click="toLogin">
                <el-button plain>登录</el-button>
            </div>
        </div>
        <div class="content clearfix">
            <div class="carousel">
                <!-- 走马灯效果 -->
                <el-carousel>
                    <el-carousel-item v-for="item in carouselList" :key="item.id">
                        <!-- 图片标签，fit属性指示图片如何适应容器框 -->
                        <el-image :src="item.image" fit="fill"></el-image>
                    </el-carousel-item>
                </el-carousel>
                <div class="motto">
                    <div>因为大学</div>
                    <div>我们从五湖四海汇聚在一起！</div>
                    <div>四年生活忙碌而闲适!</div>
                    <div>学习紧张而刺激!</div>
                    <div>友情诚挚而纯洁！</div>
                    <div>春去秋来，时光荏苒</div>
                    <div>岁月带有了我们的稚气</div>
                    <div>留下了永恒的回忆！</div>
                    <div>大学四年，我们曾经一起走过！</div>
                </div>
                <div class="page_container">
                    <el-pagination
                        layout="prev, pager, next"
                        :total="this.announce.length"
                        class="page"
                        :hide-on-single-page="ifHide"
                        :page-size="pageCount"
                        :pager-count="5"
                        :current-page.sync="currentPage"
                        @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <div class="right">
                <el-divider content-position="left" class="announce-title">
                    最新公告
                </el-divider>
                <div class="announce">
                <!-- 此处公告 -->
                    <div v-for="item in announcePage" :key="item.id">
                        <div class="aAnnounce" @click="toAnnounce(item.id)">
                            <span class="atitle">{{ item.title }}</span>
                            <span class="adate">{{ item.date.substring(0,10)}}</span>
                            <el-divider></el-divider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>@2017110206-陈香伶</p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            ifHide: true,//当数据只有一页时隐藏页码
            pageCount: 9,//每页显示多少条数据
            currentPage: 1,//当前页数
            announce: [],//公告数据
            announcePage: [],
            carouselList: [
                { 
                    id: 1, 
                    image: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg' 
                },
                { 
                    id: 2, 
                    image: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
                },
                { 
                    id: 3, 
                    image: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg' 
                },
                { 
                    id: 4, 
                    image: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg' 
                },
                { 
                    id: 5,
                    image: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg' 
                },
                { 
                    id: 6, 
                    image: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg' 
                }
            ],
        }
    },
    methods: {
        toLogin() {
            this.$router.push('/login')
        },
        //点击某一个公告的时候查询公告详情
        toAnnounce(id) {
            this.$router.push({ name: 'announce', params: {id: id} });
        },
        //去请求所有公告
        getAnnounces() {
            this.$axios({
                method: 'get',
                url: '/api/notice/get/list'
            }).then((res) => {
                res.data.forEach(element => {
                    if(element.valid == true){
                        this.announce.push(element);
                    }    
                });
                this.handleCurrentChange(1);
            }).catch((error) => {
                this.$message({
                        type: "error",
                        message: "请求错误，获取公告失败！"
                    });
            })
        },
        //翻页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.announcePage.splice(0, this.announcePage.length);
            for(
                var i = (this.currentPage -1)*this.pageCount;
                i<this.currentPage*this.pageCount&&i<this.announce.length;
                i++
            ){
                this.announcePage.push(this.announce[i]);
            }
        }
    },
    // 组件的生命周期函数，当组件加载的时候会调用该函数
    mounted() {
        this.getAnnounces();
        this.handleCurrentChange(1);
        // this.showdate();
    }
}
</script>


<style scoped>
.home_container {
    position: absolute;
    width: 100%;
}
/* 设置头部
 * 位置，背景，高度和字体颜色
*/
.header {
    /* background-color: #276E51; */
    background-image: url(~@/assets/bg2.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 100px;
    color: #fff;
    top: 0;
}
.system {
    position: absolute;
    font-size: 36px;
    top: 20px;
    margin-left: 50px;
}
.content {
    /* border: 1px solid #000; */
    position: absolute;
    top: 100px;
    bottom: 50px;
    width: 100%;
}
.carousel {
    margin-top: 50px;
    margin-left: 5%;
    width: 20%;
    height: 100%;
    float: left;
}
.right {
    float: right;
    width: 62%;
    height: 100%;
    top: 100px;
    bottom: 50px;
    /* border: 1px solid red; */
    /* overflow-y: scroll; */
    padding: 0 5% 0 2%;
    box-shadow: -10px 0 10px #ccc;
}
.el-carousel--horizontal {
    overflow-y: hidden;
}
.notice {
    position: absolute;
    width: 300px;
    border: 1px solid #000;
    float: right;
}
.motto{
    font-size: 23px;
}
.login {
    position: absolute;
    text-align: right;
    color: #fff;
    top: 30px;
    right: 50px;
}
.login:hover  {
    cursor: pointer;
}
.announce-title {
    margin-top: 60px;
}
.announce {
    /* height: 800px; */
    margin-top: 50px;
    /* border: 1px solid #000; */
}
.page_container {
    position: absolute;
    left: 5%;
    /* right: 0; */
    bottom: 10px;
    text-align: center;
    width: 20%;
    /* border: 1px solid #000; */
}
.footer {
    position: absolute;
    width: 100%;
    height: 50px;
    background-image: url(~@/assets/bg4.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #fff;
    text-align: center;
    bottom: 0;
}
.footer p {
    font-size: 13px;
    margin-top: 17px;
}
.aAnnounce {
    cursor: pointer;
}
.adate {
    text-align: right;
    float: right;
    /* padding-top: 17px; */
}
.el-button {
    background: rgba(255, 255, 255, 0.7);
    color: #000;
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
