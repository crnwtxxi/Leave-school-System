<template>
  <div class="container">
    <div class="locat">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>公告</el-breadcrumb-item>
        <el-breadcrumb-item>管理公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <h3>管理公告：</h3>
      <div id="table">
        <el-table
          :data="tableViewData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
          v-loading="loading"
          stripe
        >
          <el-table-column label="公告标题" prop="title"></el-table-column>
          <el-table-column label="发表日期" prop="date"></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope>
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.$index, scope.row)">查看</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div id="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,15,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="announceCount"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: "",
            // 公告的总数
            announceCount: 0,
            // 渲染公告数量
            announceViewCount: 0,
            // 渲染公告数据
            tableViewData: [],
            // 所有公告数据
            tableData: [],
            search: "",
            // 当前的页码
            currentPage: 1,
            // 每页公告的数量
            pageSize: 5,
            loading: true
        };
    },
    methods: {
        //   查看公告的点击事件
        handleView(index, row) {
            this.$router.push({ path: "/teacher/teannounce", query: { id: row.id } });
        },
        // 删除公告的点击事件
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该公告, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true
            }).then(() => {
                this.$axios({
                    method: "post",
                    url: "/api/notice/invalid/" + row.id
                }).then(res => {
                    // console.log("111");
                    // console.log(res);
                    // console.log(row.id);
                    this.tableData.some((item, index) => {
                        if (item.id == row.id) {
                            this.tableData.splice(index, 1);
                            this.announceCount = this.announceCount - 1;
                            if(
                                this.announceCount % this.pageSize == 0 &&
                                this.announceCount != 0 &&
                                this.currentPage != 1
                            ) {
                                this.handleCurrentChange(this.currentPage - 1);
                            } else {
                                this.handleCurrentChange(this.currentPage);
                            }
                            return true;
                        }
                    });
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                }).catch(error => {
                    console.log("删除公告失败");
                    this.$message({
                        type: "error",
                        message: "请求错误，删除公告失败!"
                    });
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    console.log("Error", error.message);
                    console.log(error.config);
                    });
                }).catch(() => {
                    this.$message({
                    type: "info",
                    message: "已取消删除"
                });
            });
        },
        // pageSize 改变时会触发
        handleSizeChange(val) {
            console.log(`每页大小为：${val}`);
            this.pageSize = val;
            this.handleCurrentChange(1);
        },
        // currentPage 改变时会触发
        handleCurrentChange(val) {
            console.log(`当前 ${val} 页`);
            this.currentPage = val;
            this.tableViewData.splice(0, this.tableViewData.length);
            for (
                var i = (this.currentPage - 1) * this.pageSize;
                i < this.currentPage * this.pageSize && i < this.announceCount;
                i++
            ) {
                var tempData = this.tableData[i];
                tempData.date = tempData.date.substring(0, 10);
                this.tableViewData.push(tempData);
            }
            this.announceViewCount = this.tableViewData.length;
            this.loading = false;
        },
        // 获取公告列表
        getAnnounces() {
            this.loading = true;
            this.$axios({
                method: "get",
                url: "/api/notice/get/list"
            }).then(res => {
                console.log("获取公告成功!");
                console.log(res);
                this.tableData.splice(0, this.tableData.length);
                res.data.forEach(element => {
                    if (element.valid == true) {
                        this.tableData.push(element);
                    }
                });
                this.announceCount = this.tableData.length;
                this.handleCurrentChange(1);
            }).catch(error => {
                console.log("公告获取失败");
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log("Error", error.message);
                console.log(error.config);
            });
        }
    },
    mounted() {
        this.getAnnounces();
    }
};
</script>

<style scoped>
.locat {
    position: absolute;
    top: 20px;
    left: 40px;
}
.content {
    position: absolute;
    width: 100%;
    top: 70px;
}
.content h3 {
    margin-left: 40px;
}
#table {
    width: 80%;
    height: 100%;
    margin: 0 auto;
}
#page {
    width: 80%;
    margin: 0 auto;
    padding: 30px;
    text-align: center;
}
#add {
    margin-left: 82%;
    margin-bottom: 10px;
}
</style>