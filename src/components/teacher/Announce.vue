<template>
    <div class="container">
        <el-page-header @back="goBack" content=""></el-page-header>
        
            <div class="title">
                {{this.announceDetail.title}}
            </div>
        <div class="detail">
            <div class="date">
                {{this.announceDetail.date}}
            </div>
            <div class="content" v-html="this.announceDetail.content">
            </div>
            <div class="author">
                作者：{{this.announceDetail.username}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                announceId: null,
                announceDetail: {}
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            getAnnounceDetail() {
                this.announceId = this.$route.query.id;
                this.$axios({
                    method: 'get',
                    url: '/api/notice/get/'+this.announceId
                }).then((res) => {
                    console.log('111');
                    console.log(res);
                    this.announceDetail = res.data;
                    this.announceDetail.date = this.announceDetail.date.substring(0,10);
                }).catch((error) => {
                    console.log('公告详情获取失败');
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers); 
                    console.log('Error', error.message);
                    console.log(error.config);
                })
            }
        },
        mounted() {
            this.getAnnounceDetail();
        }
    }
</script>

<style scoped>
.detail {
    padding: 10px 400px;
}
.title {
    font-size: 30px;
    text-align: center;
    margin-top: 30px;
}
.date {
    text-align: right;
    margin-top: 20px;
}
.content {
    margin-top: 20px;
    font-size: 18px;
    line-height: 2.0;
}
.author {
    margin-top: 30px;
    text-align: right;
    margin-bottom: 30px;
}
</style>