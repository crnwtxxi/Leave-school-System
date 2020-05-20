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
            <h3>
                查看数据：
                <el-button type="primary" size="mini" @click="handleAdd()">增加<i class="el-icon-upload el-icon--right"></i></el-button>    
            </h3>
            <div class="data">
                <div class="manage">
                    <el-divider></el-divider>
                    <el-table
                        ref="filterTable"
                        :data="tableDataPage"
                        stripe
                        style="width: 100%"
                        class="table">
                        <el-table-column
                            prop="user_name"
                            label="用户名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="punish"
                            label="处分状态"
                            width="140"
                            :filters="[{ text: '不满足条件', value: '0' }, { text: '满足条件', value: '1' }]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
                            <template slot-scope="scope">
                                <el-tag
                                :type="scope.row.punish=='1' ? 'success' : 'warning'"
                                disable-transitions>{{scope.row.punish == '0'? '不满足条件':'满足条件'}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="credit"
                            label="学分状态"
                            width="140"
                            :filters="[{ text: '不满足条件', value: '0' }, { text: '满足条件', value: '1' }]"
                            :filter-method="filterTag1"
                            filter-placement="bottom-end">
                            <template slot-scope="scope">
                                <el-tag
                                :type="scope.row.credit=='1' ? 'success' : 'warning'"
                                disable-transitions>{{scope.row.credit == '0'? '不满足条件':'满足条件'}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="scope">
                                <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                size="mini"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        layout="prev, pager, next"
                        :total="this.tableData.length"
                        class="page"
                        :hide-on-single-page="ifHide"
                        :page-size="pageCount"
                        :pager-count="5"
                        :current-page.sync="currentPage"
                        @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>

        <el-dialog 
            title="修改教务信息" 
            :visible.sync="modifyOfficeInfo_dialogTableVisible" 
            center
            :append-to-body='true' 
            :lock-scroll="false" 
            width="500px"
            v-if="modifyOfficeInfo_dialogTableVisible">
            <modifyOfficeInfo @func="closeModify"></modifyOfficeInfo>
        </el-dialog>

        <el-dialog 
            title="添加教务信息" 
            :visible.sync="addOffice_dialogTableVisible" 
            center :append-to-body='true' 
            :lock-scroll="false" 
            width="500px">
            <addOffice @func="closeAdd"></addOffice>
        </el-dialog>

    </div>
</template>

<script>
    import modifyOfficeInfo from '@/components/popup/ModifyOfficeInfo';
    import addOffice from '@/components/popup/AddOffice';
    export default {
        data() {
            return {
                ifHide: true,//当数据只有一页时隐藏页码
                pageCount: 5,//每页显示多少条数据
                currentPage: 1,//当前页数
                modifyOfficeInfo_dialogTableVisible: false,
                addOffice_dialogTableVisible: false,
                ruleForm: {
                    username: "",
                    name: ""
                },
                tableData: [],
                tableDataPage: []
            }
        },
        methods: {
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            filterTag(value, row) {
                return row.punish === value;
            },
            filterTag1(value, row) {
                return row.credit === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleEdit(index, row) {
                sessionStorage.setItem('rowOfficeMsg', JSON.stringify(row));
                this.modifyOfficeInfo_dialogTableVisible = true;
            },
            handleAdd() {
                this.addOffice_dialogTableVisible = true;
            },
            handleDelete(index, row) {
                this.$axios({
                    method: 'get',
                    url: '/api/office/remove/'+row.id
                }).then((res) => {
                    this.$notify({
                        title: "该条学生数据删除成功",
                        offset: 100,
                        type: "success",
                        showClose: false,
                        duration: 1500
                    });
                    this.getOfficeData();
                }).catch((error) => {
                    this.$notify({
                        title: "该条学生数据删除失败",
                        message: "请重试",
                        offset: 100,
                        type: "error",
                        showClose: false,
                        duration: 2000
                    });
                })
            },
            closeAdd() {
                this.addOffice_dialogTableVisible = false;
                this.getOfficeData();
            },
            closeModify() {
                this.modifyOfficeInfo_dialogTableVisible = false;
                this.getOfficeData();
            },
            getOfficeData() {
                this.$axios({
                    method: "get",
                    url: "/api/office/get/list"
                }).then(res => {
                    this.$notify({
                        title: "教务处数据获取成功",
                        offset: 100,
                        type: "success",
                        showClose: false,
                        duration: 2000
                    });
                    this.tableData = res.data;
                    this.handleCurrentChange(1);
                }).catch(error => {
                    this.$notify({
                        title: "教务处数据获取失败",
                        message: "请重试",
                        offset: 100,
                        type: "error",
                        showClose: false,
                        duration: 2000
                    });
                });
            },
            //翻页
            handleCurrentChange(val) {
                this.currentPage = val;
                this.tableDataPage.splice(0, this.tableDataPage.length);
                for(
                    var i = (this.currentPage -1)*this.pageCount;
                    i<this.currentPage*this.pageCount&&i<this.tableData.length;
                    i++
                ){
                    this.tableDataPage.push(this.tableData[i]);
                }
            }
        },
        components: {
            modifyOfficeInfo,
            addOffice
        },
        mounted() {
            this.getOfficeData();
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
.table {
    margin-bottom: 50px;
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