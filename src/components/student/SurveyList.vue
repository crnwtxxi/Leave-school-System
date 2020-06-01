<template>
  <div class="container">
    <div class="locat">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>查看调查</el-breadcrumb-item>

      </el-breadcrumb>
    </div>
    <div class="content">
      <h3>查看调查：</h3>
      <div id="table">
        <el-table
          v-loading="loading"
          :data="tableViewData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%">
          <el-table-column label="调查标题" prop="title"></el-table-column>
          <el-table-column label="调查发表时间" prop="date"></el-table-column>
          <el-table-column align="right">
            <!-- scope在此没有使用过 -->
            <template slot="header">
              
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.$index, scope.row)">填写</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div id="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[1,5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="announceCount"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: "请求成功",
        announceCount: 18,
        announceViewCount: 18,
        // 表格的数据
        tableViewData: [],
        tableData: [          
        ],
        search: "",
        currentPage: 1,
        pageSize: 1,
        loading:true
      };
    },
    methods: {
      //   查看公告的点击事件
      handleView(index, row) {
        this.$router.push({
          path: "/student/survey",
          query: {
            id: row.id
          }
        });
      },
      // 设置公告的有效性
      setTag(index, row) {
        if (this.tableViewData[index].tag == "有效") {
          this.tableViewData.some((item, i) => {
            if (item.id == row.id) {
              this.tableViewData[i].tag = "无效";
            }
          });
          this.tableData.some((item, i) => {
            if (item.id == row.id) {
              this.tableData[i].tag = "无效";
            }
          });
        } else {
          this.tableViewData.some((item, i) => {
            if (item.id == row.id) {
              this.tableViewData[i].tag = "有效";
            }
          });
          this.tableData.some((item, i) => {
            if (item.id == row.id) {
              this.tableData[i].tag = "有效";
            }
          });
        }
      },
      // 删除公告的点击事件
      handleDelete(index, row) {

        this.tableData.some((item, index) => {
          if (item.id == row.id) {
            this.tableData.splice(index, 1);
            this.announceCount = this.announceCount - 1;
            if (
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
      },
      // pageSize 改变时会触发
      handleSizeChange(val) {

        this.pageSize = val;
        this.handleCurrentChange(1);
      },
      // currentPage 改变时会触发,加载数据
      handleCurrentChange(val) {
        this.currentPage = val;
        this.tableViewData.splice(0, this.tableViewData.length);
        for (
          var i = (this.currentPage - 1) * this.pageSize; i < this.currentPage * this.pageSize && i < this
          .announceCount; i++
        ) {
          this.tableViewData.push(this.tableData[i]);
        }
      },

      // 筛选标记位
      filterTag(value, row) {
        return row.tag === value;
      }
    },
    mounted() {
      this.$axios({
        method: 'get',
        url: '/api/survey/get/list'

      }).then((res) => {
        this.tableData = res.data
        var len = this.tableData.length
        for (var i = 0; i < len; i++) {
         
          this.tableData[i].date = this.tableData[i].date.substring(0, 10)
        }
        this.handleCurrentChange(1);
        this.announceCount = this.tableData.length
        this.loading=false
      }).catch((error) => {
          this.$notify({
          title: "服务器繁忙，请稍等",
          offset: 100,
          type: "error",
          showClose: false,
          duration: 1500
          });
      })

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
    /* border: 1px solid #000; */
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
