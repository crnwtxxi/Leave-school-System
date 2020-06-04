<template>
  <div class="container">
    <div class="locat">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
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
            <el-button type="danger" size="mini" @click="handleDelete()">删除<i class="el-icon-delete el-icon--right"></i>
            </el-button>
            
          </div>
          <div class="search">
            <input style="width:250px;margin-left: 15px" class="eInput" placeholder=""
              @input="updateTitleSelect($event,index)">
            <el-button icon="el-icon-search" circle></el-button>
          </div>

        </div>
        <div class="manage">
          <el-divider></el-divider>
          <el-table v-loading="loading" ref="filterTable" :data="tableView" stripe style="width: 90%;margin: 0 auto;"
            class="table" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="state" label="借书状态" width="140"
              :filters="[{ text: '不满足条件', value: '0' }, { text: '满足条件', value: '1' }]" :filter-method="filterTag"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.state=='1' ? 'success' : 'warning'" disable-transitions>{{scope.row.state}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="cost" label="所欠费用" width="150">
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="250">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div id="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="currentPage" :page-sizes="[1,3,10,15,20]" :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>


    <el-dialog title="修改图书馆信息" :visible.sync="modifyLibraryInfo_dialogTableVisible" center :append-to-body='true'
      :lock-scroll="false" width="500px" :before-close="handleDialogClose" v-if="modifyLibraryInfo_dialogTableVisible">
      <modifyLibraryInfo></modifyLibraryInfo>
    </el-dialog>

    <el-dialog title="添加学生图书馆信息" :visible.sync="addLibrary_dialogTableVisible" center :append-to-body='true'
      :lock-scroll="false" :before-close="handleDialogClose" width="500px">
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
        tableView: [],
        currentPage: 1,
        pageSize: 3,
        tableData: [],
        multipleSelection: [],
        loading: true
      }
    },
    methods: {

      //对图书馆的一个选择绑定
      filterTag(value, row) {
        return row.state === value;
      },
      //调出修改的框
      handleEdit(index, row) {
        sessionStorage.setItem('rowLibraryMsg', JSON.stringify(row));
        this.modifyLibraryInfo_dialogTableVisible = true;
      },
      //调出增加的框
      handleAdd() {
        this.addLibrary_dialogTableVisible = true;
      },
      //dig框关闭的时候调用的方法
      handleDialogClose() {
        this.getDataList();
        this.modifyLibraryInfo_dialogTableVisible = false;
        this.addLibrary_dialogTableVisible = false;
      },
      //post传递id，向服务器传递请求
      postDelete(id) {
        this.$axios({
          method: 'get',
          url: '/api/library/del/' + id

        }).then((res) => {
          this.$notify({
            title: "删除成功",
            offset: 100,
            type: "success",
            showClose: false,
            duration: 1500
          });


        }).catch((error) => {

          this.$notify({
            title: "服务器繁忙，删除失败",
            offset: 100,
            type: "error",
            showClose: false,
            duration: 1500
          });
        })
      },
      getDataList() {
        this.$axios({
          method: 'get',
          url: '/api/library/get/list'

        }).then((res) => {
          this.tableData = res.data
          this.handleCurrentChange(1);
        }).catch((error) => {
          this.$notify({
            title: "服务器繁忙，请稍等",
            offset: 100,
            type: "error",
            showClose: false,
            duration: 1500
          });

        })
      },
      //正则过滤（字符串）
      stripscript(s) {
        var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）――|{}【】‘；：”“']")
        var rs = "";
        for (var i = 0; i < s.length; i++) {
          rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs;
      },
      //检验是不是正数
      checkIdigal(va) {
        var posPattern = /^\d*\.?\d+$/;

      },
      //删除
      handleDelete() {
        var len = this.multipleSelection.length
        var tmpTable = this.multipleSelection
        var len2 = this.tableData.length
        var len3 = this.tableView.length
        //  前端的删除

        for (var i = 0; i < len; i++) {

          for (var j = 0; j < len2; j++) {
            if (tmpTable[i].id == this.tableData[j].id) {
              this.tableData.splice(j, 1);
              break;
            }
          }
          for (var j = 0; j < len3; j++) {
            if (tmpTable[i].id == this.tableView[j].id) {
              this.tableView.splice(j, 1);
              break;
            }
          }
          //与数据库进行交互删除
          this.postDelete(tmpTable[i].id)
          // this.tableData.splice(tmpTable[i].id-1,1)
        }
      },
      //数据的变化
      handleSelectionChange(val) {
        this.multipleSelection = val;

      },
      //页数的大小变化
      handleSizeChange(val) {
        this.pageSize = val;
        this.handleCurrentChange(1);
      },
      // currentPage 改变时会触发，改变页
      handleCurrentChange(val) {
        this.currentPage = val;
        this.tableView.splice(0, this.tableView.length);
        for (
          var i = (this.currentPage - 1) * this.pageSize; i < this.currentPage * this.pageSize && i < this.tableData
          .length; i++) {
          this.tableView.push(this.tableData[i]);
        }
      },
    },
    components: {
      modifyLibraryInfo,
      addLibrary
    },
    mounted() {
      this.$axios({
        method: 'get',
        url: '/api/library/get/list'
      }).then((res) => {
        this.tableData = res.data
        this.handleCurrentChange(1);
        this.loading = false
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
    /* width: 80%;
    //height: 100%;
    //margin: 0 auto; */
  }

  .query {
    /* border: 1px solid #000; */
    /* position: absolute; */
    width: 600px;
    margin-right: 0;
    float: right;
  }

  .manage {
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
    .eInput{
    width:150px;
    border-radius: 4px;
    border:1px solid #dcdfe6;
    height: 40px;
    line-height:40px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);

    }
.search{
  float:right;
}
</style>
