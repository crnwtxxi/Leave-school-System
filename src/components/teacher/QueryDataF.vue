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
                        style="width: 100%">
                        <el-table-column
                            prop="username"
                            label="用户名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="cost"
                            label="所欠费用"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="欠费备注"
                            width="180">  
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            label="财务状态"
                            width="180"
                            :filters="[{ text: '不满足条件', value: '0' }, { text: '满足条件', value: '1' }]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
                            <template slot-scope="scope">
                                <el-tag
                                :type="scope.row.state=='1' ? 'success' : 'warning'"
                                disable-transitions>{{scope.row.state == '0'? '不满足条件':'满足条件'}}</el-tag>
                            </template>
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
            title="修改财务信息" 
            :visible.sync="modifyFinanceInfo_dialogTableVisible" 
            center
            :append-to-body='true' 
            :lock-scroll="false" 
            width="500px"
            v-if="modifyFinanceInfo_dialogTableVisible">
            <modifyFinanceInfo @func="closeModify"></modifyFinanceInfo>
        </el-dialog>

        <el-dialog 
            title="添加学生财务数据" 
            :visible.sync="addFinance_dialogTableVisible" 
            center :append-to-body='true' 
            :lock-scroll="false" 
            width="500px">
            <addFinance @func="closeAdd"></addFinance>
        </el-dialog>

    </div>
</template>

<script>
    import modifyFinanceInfo from '@/components/popup/ModifyFinanceInfo';
    import addFinance from '@/components/popup/AddFinance';
    export default {
        data() {
            return {
                ifHide: true,//当数据只有一页时隐藏页码
                pageCount: 5,//每页显示多少条数据
                currentPage: 1,//当前页数
                modifyFinanceInfo_dialogTableVisible: false,
                addFinance_dialogTableVisible: false,
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
                return row.state === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleEdit(index, row) {
                sessionStorage.setItem('rowFinanceMsg', JSON.stringify(row));
                this.modifyFinanceInfo_dialogTableVisible = true;
            },
            handleAdd() {
                this.addFinance_dialogTableVisible = true;
            },
            handleDelete(index, row) {
                this.$axios({
                    method: 'get',
                    url: '/api/finance/del/'+row.id
                }).then((res) => {
                    this.$notify({
                        title: "该条学生数据删除成功",
                        offset: 100,
                        type: "success",
                        showClose: false,
                        duration: 1500
                    });
                    this.getFinanceData();
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
                this.addFinance_dialogTableVisible = false;
                this.getFinanceData();
            },
            closeModify() {
                this.modifyFinanceInfo_dialogTableVisible = false;
                this.getFinanceData();
            },
            getFinanceData() {
                this.$axios({
                    method: "get",
                    url: "/api/finance/get/list"
                }).then(res => {
                    this.$notify({
                        title: "财务处数据获取成功",
                        offset: 100,
                        type: "success",
                        showClose: false,
                        duration: 2000
                    });
                    this.tableData = res.data;
                    this.handleCurrentChange(1);
                }).catch(error => {
                    this.$notify({
                        title: "财务处数据获取失败",
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
            modifyFinanceInfo,
            addFinance
        },
        mounted() {
            this.getFinanceData();
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


.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}
</style>