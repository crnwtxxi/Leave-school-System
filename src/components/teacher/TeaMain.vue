<template>
    <div class="stumain_container">
        <div class="header">
            <div class="system">数字离校系统</div>
            <div class="nav">
                <a href="">帮助</a> | 
                <a href="">关于</a> | 
                <a @click="toExit" class="exit">退出系统</a>
            </div>
            <div class="user">
                当前用户：{{ this.userMsg.username }}
            </div>
        </div>
        <div class="content clearfix">
            <div class="menu">
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-menu-item index="1">
                        <i class="el-icon-edit"></i>
                        <span slot="title" @click="toChangePwd2">修改密码</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-document-copy"></i>
                        <span>学生数据</span>
                        </template>
                        <el-menu-item index="2-1" @click="toUploadData">上传数据</el-menu-item>
                        <el-menu-item index="2-2" @click="toQueryData">查看数据</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-pie-chart"></i>
                        <span slot="title" @click="toStatistic">数据统计</span>
                    </el-menu-item>
                    <el-submenu index="4">
                        <template slot="title">
                        <i class="el-icon-edit-outline"></i>
                        <span>公共调查</span>
                        </template>
                        <el-menu-item index="4-1" @click="toPostSurvey">发布调查</el-menu-item>
                        <el-menu-item index="4-2" @click="toManageSurvey">管理调查</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                        <i class="el-icon-message"></i>
                        <span>公告</span>
                        </template>
                        <el-menu-item index="5-1" @click="toPostAnnounce">发布公告</el-menu-item>
                        <el-menu-item index="5-2" @click="toManageAnnounce">管理公告</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="6" v-if="isSuper()">
                        <i class="el-icon-collection-tag"></i>
                        <span slot="title" @click="toManageAuthority">权限管理</span>
                    </el-menu-item>
                    <el-menu-item index="7" v-if="isSuper()">
                        <i class="el-icon-notebook-1"></i>
                        <span slot="title" @click="toLog">日志显示</span>
                        <i class="el-icon-guide"></i>
                        <span slot="title" @click="toDataCollect">行为采集</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="component">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import changepwd2 from '@/components/teacher/ChangePwd2';
    import uploaddata from '@/components/teacher/UploadData';
    import querydataS from '@/components/teacher/QueryDataS';
    import querydataO from '@/components/teacher/QueryDataO';
    import querydataF from '@/components/teacher/QueryDataF';
    import querydataL from '@/components/teacher/QueryDataL';
    import querydataD from '@/components/teacher/QueryDataD';
    import statistic from '@/components/teacher/Statistic';
    import postsurvey from '@/components/teacher/PostSurvey';
    import managesurvey from '@/components/teacher/ManageSurvey';
    import configsurvey from '@/components/teacher/ConfigSurvey';
    import postannounce from '@/components/teacher/PostAnnounce';
    import manageannounce from '@/components/teacher/ManageAnnounce';
    import manageauthority from '@/components/teacher/ManageAuthority';
<<<<<<< HEAD
=======
    import displaylog from '@/components/teacher/DisplayLog';
>>>>>>> dev
    import advancedSearch from '@/components/popup/AdvancedSearch';
    import datacollect from '@/components/teacher/DataCollect';
    import collectdetail from '@/components/teacher/CollectDetail';
    export default {
        data() {
            return {
                userMsg: {}
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            toChangePwd2() {
                this.$router.push('/teacher/changepwd2')
            },
            toUploadData() {
                this.$router.push('/teacher/uploaddata')
            },
            toQueryData() {
                switch(this.userMsg.role) {
                    case 'super': this.$router.push('/teacher/querydataS');break;
                    case 'finance': this.$router.push('/teacher/querydataF');break;
                    case 'library': this.$router.push('/teacher/querydataL');break;
                    case 'office': this.$router.push('/teacher/querydataO');break;
                    case 'dorm': this.$router.push('/teacher/querydataD');break;
                }
            },
            toStatistic() {
                this.$router.push('/teacher/statistic')
            },
            toPostSurvey() {
                this.$router.push('/teacher/postsurvey')
            },
            toManageSurvey() {
                this.$router.push('/teacher/managesurvey')
            },
            toConfigSurvey() {
                this.$router.push('/teacher/configsurvey')
            },
            toPostAnnounce() {
                this.$router.push('/teacher/postannounce')
            },
            toManageAnnounce() {
                this.$router.push('/teacher/manageannounce')
            },
            toManageAuthority() {
                this.$router.push('/teacher/manageauthority')
            },
            toLog(){
                this.$router.push('/teacher/displaylog')
            },
            toDataCollect() {
                this.$router.push('/teacher/datacollect')
            },
            toCollectDetail() {
                this.$router.push('/teacher/collectdetail')
            },
            //方法
            isSuper() {
                if(this.userMsg.role == 'super') {
                    return true
                } else {
                    return false
                }
            },
            getRoleName() {
                // console.log(sessionStorage.getItem('user'));
                var user = JSON.parse(sessionStorage.getItem('user'));
                if(user == null) {
                    this.$router.push('/login');
                    this.$notify({
                        title: "请先登录",
                        offset: 100,
                        type: "warning",
                        showClose: false,
                        duration: 2500
                    });
                } else {
                    this.userMsg = user
                }
                
                // console.log(this.userMsg.role+this.userMsg.username);
            },
            //退出系统
            toExit() {
                this.$router.push('/');
                sessionStorage.removeItem('user');
            }
        },
        components: {
            changepwd2,
            uploaddata,
            querydataS,
            querydataO,
            querydataF,
            querydataL,
            querydataD,
            statistic ,
            postsurvey,
            managesurvey,
            configsurvey,
            postannounce,
            manageannounce,
            manageauthority,
            advancedSearch,
            datacollect,
            collectdetail
        },
        mounted() {
            this.toChangePwd2();
            this.getRoleName();
        }
    }
</script>

<style scoped>
.stumain_container {
    position: absolute;
    width: 100%;
}
.header {
  background-image: url(~@/assets/bg5.png);
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
.nav{
    position: absolute;
    right: 40px;
    top: 10px;
}
.nav a {
    color: #fff;
    font-size: 15px;
}
.user {
    position: absolute;
    right: 40px;
    top: 65px;
    font-size: 15px;
}
.content {
    position: absolute;
    /* border: 1px solid #000; */
    width: 100%;
    top: 100px;
    bottom: 0;
}
.menu {
    position: absolute;
    width: 200px;
    height: 100%;
    /* border-right: 1px solid rgba(133, 130, 130, 0.5); */
    box-shadow: 6px 5px 15px #ccc;
}
.component {
    position: absolute;
    /* border: 1px solid #000; */
    /* height: 100%; */
    top: 0;
    left: 200px;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
}
.exit {
    cursor: pointer;
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