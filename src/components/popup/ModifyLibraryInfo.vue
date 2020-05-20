<template>
  <div class="container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="借书状态" prop="state">
        <el-select v-model="ruleForm.state" placeholder="请选择">
          <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所欠费用" prop="cost">
        <el-input v-model="ruleForm.cost"></el-input>
      </el-form-item>
      <el-form-item label="费用原因" prop="remark">
        <el-input v-model="ruleForm.remark"></el-input>
      </el-form-item>
      <el-form-item style="text-align:center;margin-left:-70px;">
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    data() {
      var checkChinese = (rule, value, callback) => {
        var inputPattern = /[\u4e00-\u9fa5]/;
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!inputPattern.test(value)) {
            callback(new Error('请正确输入,只能输入中文'));
          } else {
            callback();
          }
        }, 1000);
      };
      var checkDigal = (rule, value, callback) => {
        var inputPattern = /^\d*\.?\d+$/;
        if (!value) {
          return callback(new Error('不能为空'));
        }
        setTimeout(() => {
          if (!inputPattern.test(value)) {
            callback(new Error('请正确输入,只能输入数字'));
          } else {
            callback();
          }
        }, 1000);
      };

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
          cost: [{
            validator: checkDigal,
            required: true,
            message: '请输入费用',
            trigger: 'blur'
          }],
          remark: [{
            validator: checkChinese,
            required: true,
            message: '请输入费用原因',
            trigger: 'change'
          }]
        }
      };
    },
    methods: {
      submitForm(formName) {
        if (!checkIdigal(this.cost)) {
          this.$message({
            type: 'info',
            message: '你的欠款项没有填写正确，请重新填写'
          });
          return
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$axios({
              method: 'post',
              url: '/api/library/update/' + this.ruleForm.id,
              withCredentials: true,
              data: {
                id: this.ruleForm.id,
                username: this.ruleForm.username,
                name: this.ruleForm.name,
                state: this.ruleForm.state,
                cost: this.ruleForm.cost,
                remark: this.ruleForm.remark
              },
              header: {
                'Content-Type': 'application/json;charset=UTF-8'
              }
            }).then((res) => {
              this.$notify({
                title: "修改成功",
                offset: 100,
                type: "success",
                showClose: false,
                duration: 1500
              });
              this.$emit('func');

            }).catch((error) => {
              this.$notify({
              title: "服务器繁忙，请重试",
              offset: 100,
              type: "error",
              showClose: false,
              duration: 1500
              });
             
            })
          } else {
        
            return false;
          }
        });
      },
      getRowMsg() {
        var JsonStr = sessionStorage.getItem('rowLibraryMsg');
        this.ruleForm = JSON.parse(JsonStr);
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
        return posPattern.test(va)
      }
    },
    mounted() {
      this.getRowMsg();

    }
  }

</script>

<style scoped>

</style>
