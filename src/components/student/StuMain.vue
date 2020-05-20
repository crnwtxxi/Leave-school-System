<template>
    <div class="stumain_container">
        <div class="header">
            <div class="system">数字离线系统</div>
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
                    default-active="1-1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>个人信息</span>
                        </template>
                        <el-menu-item index="1-1" @click="toInformation">核对个人信息</el-menu-item>
                        <el-menu-item index="1-2" @click="toChangePwd">修改密码</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-collection-tag"></i>
                        <span slot="title" @click="toSchedule">离校手续进度</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i class="el-icon-edit"></i>
                        <span slot="title" @click="toSurveyList">查看调查</span>
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
    import schedule from '@/components/student/Schedule';
    import information from '@/components/student/Information';
    import changepwd from '@/components/student/ChangePwd';
    import surveylist from '@/components/student/SurveyList';
    export default {
        data() {
            return {
                userMsg: {}
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
            toInformation() {
                this.$router.push('/student/information')
            },
            toChangePwd() {
                this.$router.push('/student/changepwd')
            },
            toSchedule() {
                this.$router.push('/student/schedule')
            },
            toSurveyList(){
                this.$router.push('/student/surveylist')
            },
            getStuMsg() {
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
            },
            //退出系统
            toExit() {
                this.$router.push('/');
                sessionStorage.removeItem('user');
            }
        },
        components: {
            schedule,
            information,
            changepwd,
            surveylist
        },
        mounted() {
            this.toInformation();
            this.getStuMsg();
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
    box-shadow: 6px 5px 15px #ccc;
}
.component {
    position: absolute;
    /* border: 1px solid #000; */
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