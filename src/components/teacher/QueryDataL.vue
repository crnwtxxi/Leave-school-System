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
                        :data="tableView"
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
                            prop="name"
                            label="姓名"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            label="借书状态"
                            width="140"
                            :filters="[{ text: '不满足条件', value: '0' }, { text: '满足条件', value: '1' }]"
                            :filter-method="filterTag"
                            filter-placement="bottom-end">
                            <template slot-scope="scope">
                                <el-tag
                                :type="scope.row.state=='1' ? 'success' : 'warning'"
                                disable-transitions>{{scope.row.state}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="cost"
                            label="所欠费用"
                            width="150">
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
                            </template>
                        </el-table-column>
                    </el-table>
                    <div id="page">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage" 
                        :page-sizes="[1,3,10,15,20]" 
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper" 
                        :total="tableData.length">
                    </el-pagination>
                    </div>
                </div>
            </div>
        </div>


        <el-dialog 
            title="修改图书馆信息" 
            :visible.sync="modifyLibraryInfo_dialogTableVisible" 
            center
            :append-to-body='true' 
            :lock-scroll="false" 
            width="500px"
            :before-close="handleDialogClose"
            v-if="modifyLibraryInfo_dialogTableVisible">
            <modifyLibraryInfo></modifyLibraryInfo>
        </el-dialog>

        <el-dialog 
            title="添加学生图书馆信息" 
            :visible.sync="addLibrary_dialogTableVisible" 
            center :append-to-body='true' 
            :lock-scroll="false" 
            :before-close="handleDialogClose"
            width="500px">
            <addLibrary></addLibrary>
        </el-dialog>


    </div>
</template>

<script>
    import modifyLibraryInfo from '@/components/popup/ModifyLibraryInfo';
    import addLibrary from '@/components/popup/AddLibrary';
    export default {
        data() {
            return {
                modifyLibraryInfo_dialogTableVisible: false,
                addLibrary_dialogTableVisible: false,
                ruleForm: {
                    username: "",
                    name: ""
                },
                tableView:[],
                currentPage:1,
                pageSize:3,
                tableData: [
                    {
                        username: "2017110206",
                        name: "陈香伶",
                        state: "0",
                        cost: "10.5",
                        remark: "借书超期应支付费用"
                    },
                    {
                        username: "2017110206",
                        name: "陈死狗",
                        state: "0",
                        cost: "0",
                        remark: "无"
                    },
                    {
                        username: "2017110206",
                        name: "权志龙",
                        state: "1",
                        cost: "0",
                        remark: "无"
                    }
                ],
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
                return row.state === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            handleEdit(index, row) {
                console.log(index, row);
                sessionStorage.setItem('rowLibraryMsg', JSON.stringify(row));
                this.modifyLibraryInfo_dialogTableVisible = true;
                
                // this.libraryInfo = row;
            },
            handleAdd() {
                this.addLibrary_dialogTableVisible = true;
            },
            handleDialogClose(){
                this.getDataList();
                this.modifyLibraryInfo_dialogTableVisible=false;
                this.addLibrary_dialogTableVisible=false;
            },
            postDelete(id){
                this.$axios({
                method: 'get',
                url: 'http://106.15.206.229/library/del/'+id

                }).then((res) => {
                console.log('111');
                // console.log(res.data);
                console.log("yes")
                

                }).catch((error) => {

                console.log('删除失败');
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log('Error', error.message);
                console.log(error.config);
                })
            },
            getDataList(){
                 this.$axios({
                 method: 'get',
                 url: 'http://106.15.206.229/library/get/list'

                 }).then((res) => {
                 this.tableData=res.data
                 this.handleCurrentChange(1);
                 }).catch((error) => {

                 console.log('调查获取失败');
                 console.log(error.response.data);
                 console.log(error.response.status);
                 console.log(error.response.headers);
                 console.log('Error', error.message);
                 console.log(error.config);
                 })
            },
            handleDelete() {
                    var len=this.multipleSelection.length
                    var tmpTable=this.multipleSelection
                    var len2=this.tableData.length
                    var len3=this.tableView.length
                    //  前端的删除
                    
                    for(var i = 0 ; i < len ; i++){
                        console.log(tmpTable[i].id)
                        for(var j = 0; j<len2;j++){
                                if(tmpTable[i].id==this.tableData[j].id){
                                    this.tableData.splice(j,1);
                                    break;
                                }
                        }
                        for(var j = 0 ; j < len3 ; j++){
                            if(tmpTable[i].id==this.tableView[j].id){
                                    this.tableView.splice(j,1);
                                    break;
                            }
                        }
                        //与数据库进行交互删除
                        this.postDelete(tmpTable[i].id)
                        // this.tableData.splice(tmpTable[i].id-1,1)
                    }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
               // console.log(val);
            },
            handleSizeChange(val) {
            console.log(`每页大小为：${val}`);
            this.pageSize = val;
            this.handleCurrentChange(1);
            },
            // currentPage 改变时会触发
            handleCurrentChange(val) {
                console.log(`当前 ${val} 页`);
                this.currentPage = val;
                this.tableView.splice(0, this.tableView.length);

            for (
            var i = (this.currentPage - 1) * this.pageSize;
            i < this.currentPage * this.pageSize && i < this.tableData.length; i++ ) {
              this.tableView.push(this.tableData[i]); } },
        },
        components: {
            modifyLibraryInfo,
            addLibrary
        },
        mounted(){
                 
                 this.$axios({
                     method: 'get',
                        url: 'http://106.15.206.229/library/get/list'

                 }).then((res) => {
                 this.tableData=res.data
                 this.handleCurrentChange(1);
                 }).catch((error) => {

                 console.log('调查获取失败');
                 console.log(error.response.data);
                 console.log(error.response.status);
                 console.log(error.response.headers);
                 console.log('Error', error.message);
                 console.log(error.config);
                 })
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
    margin-right: 0;
    float: right;
}
.manage{
    /* border: 1px solid red; */
    clear: both;
    margin-left: 40px;
}
#page {
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