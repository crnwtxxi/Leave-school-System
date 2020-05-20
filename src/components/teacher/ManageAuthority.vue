<template>
    <div class="container">
        <div class="locat">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >当前位置</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <h3>
                权限管理：
                <el-button type="primary" size="mini" @click="handleAdd()">
                    增加
                    <i class="el-icon-upload el-icon--right"></i>
                </el-button>
            </h3>
            <div class="admin">
                
                <el-table
                    ref="filterTable"
                    :data="tableDataPage"
                    stripe
                    style="width: 100%"
                    class="table">
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
                        prop="role"
                        label="角色"
                        width="180"
                        :filters="[{text: '系统管理员', value: 'super'}, {text: '教务处', value: 'office'}, {text: '图书馆', value: 'library'}, {text: '财务处', value: 'finance'}, {text: '后勤处', value: 'dorm'}]"
                        :filter-method="filterHandler">
                    </el-table-column>
                    <el-table-column
                        prop="valid"
                        label="是否有效"
                        width="180"
                        :filters="[{ text: '是', value: true }, { text: '否', value: false }]"
                        :filter-method="filterTag"
                        filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag
                            :type="scope.row.valid ? 'success' : 'warning'"
                            disable-transitions>{{scope.row.valid}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
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


        <el-dialog 
            title="修改管理员信息" 
            :visible.sync="modifyAdminInfo_dialogTableVisible" 
            center :append-to-body='true' 
            :lock-scroll="false" 
            width="500px"
            v-if="modifyAdminInfo_dialogTableVisible">
            <modifyAdminInfo @func="closeModify"></modifyAdminInfo>
        </el-dialog>

        <el-dialog 
            title="添加管理员" 
            :visible.sync="addAdmin_dialogTableVisible" 
            center :append-to-body='true' 
            :lock-scroll="false" 
            width="500px"
            v-if="addAdmin_dialogTableVisible">
            <addAdmin @func="closeAdd"></addAdmin>
        </el-dialog>


    </div>
</template>

<script>
    import modifyAdminInfo from '@/components/popup/ModifyAdminInfo';
    import addAdmin from '@/components/popup/AddAdmin';
    export default {
        data() {
            return {
                ifHide: true,//当数据只有一页时隐藏页码
                pageCount: 3,//每页显示多少条数据
                currentPage: 1,//当前页数
                modifyAdminInfo_dialogTableVisible: false,
                addAdmin_dialogTableVisible: false,
                tableData: [],
                tableDataPage: [],
                currentPage: 1,
                tableViewData: []
            }
        },
        methods: {
            //重置筛选
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            //清楚筛选
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            //筛选标签
            filterTag(value, row) {
                return row.valid === value;
            },
            //过滤处理
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            //编辑
            handleEdit(index, row) {
                sessionStorage.setItem('rowAdminMsg', JSON.stringify(row));
                this.modifyAdminInfo_dialogTableVisible = true;
            },
            //增加
            handleAdd() {
                this.addAdmin_dialogTableVisible = true;
            },
            //删除
            handleDelete(index, row) {
                console.log("点击了删除");
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
            },
            closeAdd() {
                this.addAdmin_dialogTableVisible = false;
                this.getAllAdmin();
            },
            closeModify() {
                this.modifyAdminInfo_dialogTableVisible = false;
                this.getAllAdmin();
            },
            //获取管理员列表
            getAllAdmin() {
                this.$axios({
                    method: 'get',
                    url: '/api/admin/get/all'
                }).then((res) => {
                    this.$notify({
                        title: "管理员列表获取成功",
                        offset: 100,
                        type: "success",
                        showClose: false,
                        duration: 2000
                    });
                    this.tableData = res.data;
                    this.handleCurrentChange(1);
                }).catch((error) => {
                    this.$notify({
                        title: "管理员列表获取失败",
                        message: "请重试",
                        offset: 100,
                        type: "error",
                        showClose: false,
                        duration: 2000
                    });
                })
            }
        },
        components: {
            modifyAdminInfo,
            addAdmin
        },
        mounted() {
            this.getAllAdmin();
            this.handleCurrentChange(1);
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
    /* bottom: 0; */
}
.content h3 {
    /* border: 1px solid #000; */
    margin-left: 40px;
}
.admin {
    /* border: 1px solid #000; */
    margin-left: 40px;
}
.table {
    /* border: 1px solid #000; */
    border-top: 1px solid rgba(204, 204, 204, 0.441);
    margin-top: 5px;
    margin-bottom: 50px;
}
.page {
    /* border: 1px solid #000; */
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>