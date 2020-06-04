<template>
    <div class="container">
        <div class="locat">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >当前位置</el-breadcrumb-item>
                <el-breadcrumb-item>行为采集</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <h3>用户行为数据采集：</h3>
            <div class="table">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        label="学号"
                        prop="username"
                        width="280">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="warning"
                                @click="handleView(scope.$index, scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getList() {
                this.$axios({
                    method: 'get',
                    url: '/api/acquisition/getlist'
                }).then((res) => {
                    console.log(res);
                    for(var i in res.data) {
                        var t = {
                            username: res.data[i]
                        }
                        this.tableData.push(t)
                    }
                }).catch((error) => {
                    console.log(error);
                })
            },
            handleView(index, row) {
                // console.log(index, row);
                // this.$router.push('/teacher/collectdetail')
                this.$router.push({name: 'collectdetail',params: {username: row.username}})
            }
        },
        mounted() {
            this.getList();
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

</style>