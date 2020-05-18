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
          :data="tableViewData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column label="调查标题" prop="title"></el-table-column>
          <el-table-column label="调查发表时间" prop="date"></el-table-column>
          <!-- <el-table-column
            prop="tag"
            label="是否有效"
            width="100"
            :filters="[{ text: '有效', value: '有效' }, { text: '无效', value: '无效' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end"
          > -->
          <!--   <template slot-scope="scope">
              <el-tag
                :type="scope.row.tag === '有效' ? 'success' : 'danger'"
                disable-transitions
              >{{scope.row.tag}}</el-tag>
            </template>
          </el-table-column> -->
          <el-table-column align="right">
            <!-- scope在此没有使用过 -->
            <template slot="header">
              <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleView(scope.$index, scope.row)">填写</el-button>
              <!-- <el-button
                size="mini"
                @click="setTag(scope.$index, scope.row)"
              >设置{{scope.row.tag == "有效"?"无效":"有效"}}</el-button>
 -->              <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
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
      msg: "请求成功",
      announceCount: 18,
      announceViewCount: 18,
      // 表格的数据
      tableViewData: [],
      tableData: [
        {
          id: 1,
          title: "四川师范大学公共调查1",
          date: "2020-06-30"
          
        },
        {
          id: 2,
          title: "四川师范大学一卡通归还通知2",
          date: "2020-06-30"
          
        },
        {
          id: 3,
          title: "四川师范大学财务处通知3",
          date: "2020-06-30"
        },
        {
          id: 4,
          title: "四川师范大学教务处通知4",
          date: "2020-06-30"
        },
        {
          id: 5,
          title: "四川师范大学教务处通知5",
          date: "2020-06-30"
        },
        {
          id: 6,
          title: "四川师范大学教务处通知6",
          date: "2020-06-30"
        },
        {
          id: 7,
          title: "四川师范大学教务处通知7",
          date: "2020-06-30"
        },
        {
          id: 8,
          title: "四川师范大学教务处通知8",
          date: "2020-06-30",
          tag: "有效"
        },
        {
          id: 9,
          title: "四川师范大学教务处通知9",
          date: "2020-06-30",
          tag: "有效"
        },
        {
          id: 10,
          title: "四川师范大学教务处通知9",
          date: "2020-06-30",
          tag: "有效"
        },
        {
          id: 11,
          title: "四川师范大学教务处通知9",
          date: "2020-06-30",
          tag: "有效"
        },
        {
          id: 12,
          title: "四川师范大学教务处通知9",
          date: "2020-06-30",
          tag: "有效"
        },
        {
          id: 13,
          title: "四川师范大学教务处通知9",
          date: "2020-06-30",
          tag: "有效"
        },
        {
          id: 14,
          title: "四川师范大学教务处通知9",
          date: "2020-06-30",
          tag: "有效"
        },
        {
          id: 15,
          title: "四川师范大学教务处通知9",
          date: "2020-06-30",
          tag: "有效"
        },
        {
          id: 16,
          title: "四川师范大学教务处通知9",
          date: "2020-06-30",
          tag: "有效"
        },
        {
          id: 17,
          title: "四川师范大学教务处通知9",
          date: "2020-06-30",
          tag: "有效"
        },
        {
          id: 18,
          title: "四川师范大学教务处通知9",
          date: "2020-06-30",
          tag: "有效"
        }
      ],
      search: "",
      currentPage: 1,
      pageSize: 1
    };
  },
  methods: {
    //   查看公告的点击事件
    handleView(index, row) {
      this.$router.push({ path: "/student/changepwd", query: { id: row.id } });
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
          console.log("删除标题为----《" + item.title + "》----的调查！");
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
        this.tableViewData.push(this.tableData[i]);
      }
    },

    // 筛选标记位
    filterTag(value, row) {
      return row.tag === value;
    }
  },
  mounted() {
    this.handleCurrentChange(1);
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