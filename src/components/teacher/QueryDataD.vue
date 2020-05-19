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
            <div class="data clearfix">
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
                            prop="user_name"
                            label="用户名"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            align="center"
                            label="姓名"
                            width="200">
                        </el-table-column>
                         <el-table-column
                            prop="location"
                            label="寝室号"
                            align="center"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            label="后勤状态"
                            align="center"
                            :filters="[{ text: '未完成', value: '0' }, { text: '已完成', value: '1' }]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
                            <template slot-scope="scope">
                                <el-tag
                                :type="scope.row.state=='1' ? 'success' : 'warning'"
                                disable-transitions>{{scope.row.state == '0'? '未完成':'已完成'}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注"
                            align="center"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            label="操作" align="center">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5,10,15,20]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        class="page"
                        :total="tableDataCount">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog 
            title="修改后勤信息" 
            :visible.sync="modifyDormInfo_dialogTableVisible" 
            center
            :append-to-body='true' 
            :lock-scroll="false" 
            width="500px"
            v-if="modifyDormInfo_dialogTableVisible">
            <modifyDormInfo></modifyDormInfo>
        </el-dialog>

        <el-dialog 
            title="添加学生后勤数据" 
            :visible.sync="addDorm_dialogTableVisible" 
            center :append-to-body='true' 
            :lock-scroll="false" 
            width="500px">
            <addDorm></addDorm>
        </el-dialog>

    </div>
</template>

<script>
    import modifyDormInfo from '@/components/popup/ModifyDormInfo';
    import addDorm from '@/components/popup/AddDorm';
    export default {
        data() {
            return {
                modifyDormInfo_dialogTableVisible: false,
                addDorm_dialogTableVisible: false,
                ruleForm: {
                    username: "",
                    name: ""
                },
                tableData: [
                    
                ],
                tableAllData:[

                ],
                tablefilterData:[

                ],
                multipleSelection: [],
                // 当前的页码
                currentPage: 1,
                // 每页数据的数量
                pageSize: 5,
                //总的数据
                tableDataCount: 0,
            }
        },
        methods: {
            handleSizeChange(val){
                this.pageSize = val;
                this.handleCurrentChange(1);
            },
            handleCurrentChange(val){
                console.log("调用了handleCurrentChange函数,当前页"+val);
                this.currentPage = val;
                this.tableData.splice(0, this.tableData.length);
                for (
                    var i = (this.currentPage - 1) * this.pageSize;
                    i < this.currentPage * this.pageSize && i < this.tableDataCount;
                    i++
                ) {
                    this.tableData.push(this.tableAllData[i]);
                }
                console.log("tableData的数据");
                console.log(this.tableData);
            },
            // 查询的方法
            onQuery() {
                console.log("调用了查询");
                // this.tablefilterData = this.tableAllData;
                // console.log(this.tableAllData.length);
                // this.tableAllData.splice(0,this.tableAllData.length);
                // this.tablefilterData.forEach(element => {
                //     if((this.ruleForm.username == ""||this.ruleForm.username == element.user_name)&&(this.ruleForm.name == ""||this.ruleForm.name == element.name)){
                //         this.tableAllData.push(element);
                //     }
                // });
                this.handleCurrentChange(1);
            },
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            filterTag(value, row) {
                return row.state === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleEdit(index, row) {
                console.log(index, row);
                sessionStorage.setItem('rowDormMsg', JSON.stringify(row));
                this.modifyDormInfo_dialogTableVisible = true;
            },
            handleAdd() {
                this.addDorm_dialogTableVisible = true;
            },
            handleDelete() {
                this.$confirm("此操作将永久删除选中的学生, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                }).then(() => {
                    this.multipleSelection.forEach(element => {
                        this.handleReqDelete(element.id,element.name);
                    });
                }).catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
            },
            handleReqDelete(id,name){
                this.$axios({
                    method: "get",
                    url: "/api/dorm/remove/" + id
                }).then(res => {
                    this.tableAllData.some((item, index) => {
                        if (item.id == id) {
                            this.tableAllData.splice(index, 1);
                            this.tableDataCount = this.tableDataCount - 1;
                            return true;
                        }
                    });
                    console.log("当前tableAllData的数据：" + this.tableAllData);
                    this.$message({
                        type: "success",
                        message: "删除学生"+name+"成功!"
                    });
                    this.handleCurrentChange(1);
                }).catch(error => {
                    this.$message({
                        type: "error",
                        message: "请求错误，删除"+name+"学生失败!"
                    });
                    console.log(error);
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            },
            getDormInfo(){
                this.$axios({
                method: "get",
                url: "/api/dorm/get/list"
                }).then(res => {
                    console.log("获取后勤数据成功!");
                    console.log(res);
                    this.tableAllData = res.data;
                    this.tableDataCount = this.tableAllData.length;
                    this.handleCurrentChange(1);
                }).catch(error => {
                    console.log("后勤数据获取失败");
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    console.log("Error", error.message);
                    console.log(error.config);
                });
            },
            successAdd(){
                this.addDorm_dialogTableVisible = false;
                this.getDormInfo();
            },
            successEdit(){
                console.log('修改成功函数被调用!');
                this.modifyDormInfo_dialogTableVisible = false;
                this.getDormInfo();
            }
        },
        mounted() {
            console.log("调用加载函数成功!");
            this.getDormInfo();
        },
        components: {
            modifyDormInfo,
            addDorm
        }
    }
</script>

<style scoped>
/* 
 *带有scroped的style标签
 *是有作用域的，其包含的样式只作用于当前组件
 */
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
    /* position: absolute; */
    /* border: 1px solid #000; */
    width: 80%;
    height: 100%;
    margin: 0 auto;
}
.delete {
    /* border: 1px solid #000; */
    float: left; 
    margin-top: 10px;
}
.query {
    /* border: 1px solid #000; */
    /* position: absolute; */
    width: 600px;
    margin-right: 0;
    float: right;
}
.manage{
    /* border: 1px solid red; */
    clear: both;
    /* margin-left: 40px; */
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