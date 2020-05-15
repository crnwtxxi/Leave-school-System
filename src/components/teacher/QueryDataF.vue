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
                                :type="scope.row.state=='1' ? 'success' : 'error'"
                                disable-transitions>{{scope.row.state}}</el-tag>
                            </template>
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
                    <el-pagination
                        layout="prev, pager, next"
                        :total="50"
                        class="page">
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
            <modifyFinanceInfo></modifyFinanceInfo>
        </el-dialog>

        <el-dialog 
            title="添加学生财务数据" 
            :visible.sync="addFinance_dialogTableVisible" 
            center :append-to-body='true' 
            :lock-scroll="false" 
            width="500px">
            <addFinance></addFinance>
        </el-dialog>

    </div>
</template>

<script>
    import modifyFinanceInfo from '@/components/popup/ModifyFinanceInfo';
    import addFinance from '@/components/popup/AddFinance';
    export default {
        data() {
            return {
                modifyFinanceInfo_dialogTableVisible: false,
                addFinance_dialogTableVisible: false,
                ruleForm: {
                    username: "",
                    name: ""
                },
                tableData: [
                    {
                        username: "2017110206",
                        name: "陈香伶",
                        state: "0",
                        cost: "200",
                        remark: "教材费"
                    },
                    {
                        username: "2017110206",
                        name: "陈死狗",
                        state: "1",
                        cost: "300",
                        remark: "教材费"
                    },
                    {
                        username: "2017110206",
                        name: "权志龙",
                        state: "1",
                        cost: "200",
                        remark: "教材费"
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
                sessionStorage.setItem('rowFinanceMsg', JSON.stringify(row));
                this.modifyFinanceInfo_dialogTableVisible = true;
            },
            handleAdd() {
                this.addFinance_dialogTableVisible = true;
            },
            handleDelete() {
                console.log("点击了删除");
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // console.log(val);
            }
        },
        components: {
            modifyFinanceInfo,
            addFinance
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