<template>
    <div class="container">
        <div class="locat">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >当前位置</el-breadcrumb-item>
                <el-breadcrumb-item>学生数据</el-breadcrumb-item>
                <el-breadcrumb-item>查看数据</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <h3>查看数据：</h3>
            <div class="data">
                <div class="head clearfix">
                    <div class="delete">
                        <el-button type="primary" size="mini" @click="handleAdd()">增加<i class="el-icon-upload el-icon--right"></i>
                        </el-button>
                        <el-button type="danger" size="mini" @click="handleDelete()">删除<i class="el-icon-delete el-icon--right"></i></el-button>
                    </div>
                    <div class="query">
                        <el-form :model="ruleForm" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                            <el-row>
                                <el-col :span="8">
                                    <el-form-item label="学号" prop="username">
                                        <el-input v-model="ruleForm.username"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="姓名" prop="name">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item>
                                        <el-button type="primary" @click="onQuery" style="margin-left:-20px;">立即查询</el-button>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
                <div class="manage">
                    <el-divider></el-divider>
                    <el-table
                        ref="filterTable"
                        :data="tableData"
                        stripe
                        style="width: 100%"
                        class="table"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                            type="selection"
                            width="55">
                        </el-table-column>
                        <el-table-column
                            prop="username"
                            label="用户名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="realname"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="password"
                            label="密码"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="cardid"
                            label="身份证号码"
                            width="230">  
                        </el-table-column>
                        <el-table-column
                            prop="sex"
                            label="性别"
                            width="100"
                            :filters="[{ text: '男', value: 1 }, { text: '女', value: 2 }]"
                            :filter-method="filterHandler">
                        </el-table-column>
                        <el-table-column
                            prop="college"
                            label="学院"
                            width="180"
                            :filters="[{ text: '计算机科学学院', value: '计算机科学学院' }, { text: '音乐学院', value: '音乐学院' }]"
                            :filter-method="filterHandler">
                        </el-table-column>
                        <el-table-column
                            prop="major"
                            label="专业"
                            width="180"
                            :filters="[{ text: '软件工程', value: '软件工程' }, { text: '美声', value: '美声' }]"
                            :filter-method="filterHandler">
                        </el-table-column>
                        <el-table-column
                            prop="clazz"
                            label="班级"
                            width="110"
                            :filters="[{ text: '1班', value: '1班' }, { text: '2班', value: '2班' }, { text: '3班', value: '3班' }, { text: '4班', value: '4班' }, { text: '5班', value: '5班' }]"
                            :filter-method="filterHandler">
                        </el-table-column>
                        <!-- <el-table-column
                            prop="location"
                            label="寝室号"
                            width="180"
                            :filters="[{ text: '西3-106', value: '西3-106' }, { text: '西4-106', value: '西4-106' }]"
                            :filter-method="filterHandler">
                        </el-table-column> -->
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="50"
                        class="page">
                    </el-pagination>
                </div>
            </div>
        </div>


        <el-dialog 
            title="修改学生信息" 
            :visible.sync="modifySuperInfo_dialogTableVisible" 
            center
            :append-to-body='true' 
            :lock-scroll="false" 
            width="500px"
            v-if="modifySuperInfo_dialogTableVisible">
            <modifySuperInfo @func="closeModify"></modifySuperInfo>
        </el-dialog>

        <el-dialog 
            title="添加学生" 
            :visible.sync="addStudent_dialogTableVisible" 
            center :append-to-body='true' 
            :lock-scroll="false" 
            width="500px">
            <addStudent @func="closeAdd"></addStudent>
        </el-dialog>


    </div>
</template>

<script>
    import modifySuperInfo from '@/components/popup/ModifySuperInfo';
    import addStudent from '@/components/popup/AddStudent';
    export default {
        data() {
            return {
                modifySuperInfo_dialogTableVisible: false,
                addStudent_dialogTableVisible: false,
                ruleForm: {
                    username: "",
                    name: ""
                },
                tableData: [],
                multipleSelection: []
            }
        },
        methods: {
            onQuery() {
                console.log("提交查询")
            },
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            filterTag(value, row) {
                return row.valid === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleEdit(index, row) {
                console.log(index, row);
                sessionStorage.setItem('rowSuperMsg', JSON.stringify(row));
                this.modifySuperInfo_dialogTableVisible = true;
            },
            handleAdd() {
                this.addStudent_dialogTableVisible = true;
            },
            handleDelete() {
                console.log("点击了删除");
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // console.log(val);
            },
            closeAdd() {
                this.addStudent_dialogTableVisible = false;
                this.getAllStudent();
            },
            closeModify() {
                this.modifySuperInfo_dialogTableVisible = false;
                this.getAllStudent();
            },
            getAllStudent() {
                this.$axios({
                    method: 'get',
                    url: '/api/student/get/all'
                }).then((res) => {
                    console.log('获取成功');
                    console.log(res);
                    this.tableData = res.data;
                }).catch((error) => {
                    console.log('学生列表获取失败');
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers); 
                    console.log('Error', error.message);
                    console.log(error.config);
                })
            }
        },
        components: {
            modifySuperInfo,
            addStudent
        },
        mounted() {
            this.getAllStudent();
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
.data {
    position: absolute;
    /* border: 1px solid #000; */
    width: 100%;
}
.delete {
    /* border: 1px solid #000; */
    float: left;
    margin-left: 40px;
    margin-top: 10px;
}
.query {
    /* border: 1px solid #000; */
    /* position: absolute; */
    width: 600px;
    /* margin-right: 0; */
    float: right;
}
.manage{
    /* border: 1px solid red; */
    clear: both;
    margin-left: 40px;
}
.page {
    /* border: 1px solid #000; */
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
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