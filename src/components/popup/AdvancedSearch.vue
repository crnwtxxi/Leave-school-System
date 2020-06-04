<template>
  <div class="container">
    <el-form :model="ruleForm" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="标题名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
       <el-form-item label="发布人" prop="username">
         <el-input v-model="ruleForm.name"></el-input>
       </el-form-item>
      <el-form-item label="时间范围" prop="cost">
      <div class="block">
        
        <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      </el-form-item>
      <el-form-item label="相关内容" prop="remark">
        <el-input v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item style="text-align:center;margin-left:-70px;">
        <el-button type="primary" @click="submitForm('ruleForm')">搜索</el-button>
        <el-button @click="resetForm('ruleForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data() {
    //   var checkChinese = (rule, value, callback) => {
    //     var inputPattern = /[\u4e00-\u9fa5]/;
    //     if (!value) {
    //       return callback(new Error('不能为空'));
    //     }
    //     setTimeout(() => {
    //       if (!inputPattern.test(value)) {
    //         callback(new Error('请正确输入,只能输入中文'));
    //       } else {
    //         callback();
    //       }
    //     }, 500);
    //   };
    //   var checkDigal = (rule, value, callback) => {
    //     var inputPattern = /^\d*\.?\d+$/;
    //     if (!value) {
    //       return callback(new Error('不能为空'));
    //     }
    //     setTimeout(() => {
    //       if (!inputPattern.test(value)) {
    //         callback(new Error('请正确输入,只能输入数字'));
    //       } else {
    //         callback();
    //       }
    //     }, 500);
    //   };
      return {
        states: [{
            value: '0',
            label: '不满足条件'
          },
          {
            value: '1',
            label: '满足条件'
          }
        ],
        ruleForm: {},
        rules: {
        //   cost: [{
        //     validator: checkDigal,
        //     trigger: 'blur'
        //   }],
        //   remark: [{
        //     validator: checkChinese,
        //     trigger: 'blur'
        //   }],
        //   username: [{
        //     validator: checkDigal,
        //     trigger: 'blur'
        //   }],
        //   name: [{
        //     validator: checkChinese,
        //     trigger: 'blur'
        //   }]

        },
         pickerOptions: {
         shortcuts: [{
         text: '最近一周',
         onClick(picker) {
         const end = new Date();
         const start = new Date();
        //  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
         picker.$emit('pick', [start, end]);
         }
         }, {
         text: '最近一个月',
         onClick(picker) {
         const end = new Date();
         const start = new Date();
         start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
         picker.$emit('pick', [start, end]);
         console.log(value)
         }
         }, {
         text: '最近三个月',
         onClick(picker) {
         const end = new Date();
         const start = new Date();
         start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
         picker.$emit('pick', [start, end]);
         }
         }]
         },
         value1: '',
         value2: '',
         title:'',
         start:'',
         end:'',
         content:'',
         name:''
      };
    },
    methods: {
      submitForm(formName) {
          console.log(this.value1)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios({
              method: 'get',
              url: '/api/notice_search/full',
              withCredentials: true,
              params:{title:this.title,name:this.name,start:this.value1[0],end:this.value1[1],content:this.content},
              header: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then((res) => {

              this.$notify({
                title: "添加成功",
                offset: 100,
                type: "success",
                showClose: false,
                duration: 1500
              });
              this.$emit('func');

            }).catch((error) => {
                this.$notify({
                  title: "服务器繁忙",
                  offset: 100,
                  type: "error",
                  showClose: false,
                  duration: 1500
                });
              }

            )
          } else {

            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

    }
  }
</script>

<style scoped>

</style>