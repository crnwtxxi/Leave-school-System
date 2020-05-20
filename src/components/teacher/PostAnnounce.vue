<template>
  	<div class="container">
    	<div class="locat">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>当前位置</el-breadcrumb-item>
				<el-breadcrumb-item>公告</el-breadcrumb-item>
				<el-breadcrumb-item>发布公告</el-breadcrumb-item>
			</el-breadcrumb>
    	</div>
		<div class="content">
			<h3>发布公告：</h3>
			<div class="form">
				<el-form
				:model="ruleForm"
				:rules="rules"
				ref="ruleForm"
				label-width="100px"
				class="demo-ruleForm"
				>
					<el-form-item label="公告标题" prop="title">
						<el-input v-model="ruleForm.title" class="title"></el-input>
					</el-form-item>
					<el-form-item label="公告内容" prop="content">
						<mavon-editor
						:toolbars="toolbars"
						style="height:500px"
						:autofocus="false"
						v-model="ruleForm.content"
						@change="change"
						ref="md"
						/>
					</el-form-item>
					<el-form-item style="text-align:right;">
						<el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
  	</div>
</template>

<script>
export default {
  	data() {
		var title = (rule, value, callback) => {
			var inputPattern = /[\u4e00-\u9fa5]{1,2}/
				setTimeout(() => {
					if (!inputPattern.test(value)) {
						callback(new Error('请输入中文标题'));
					} else {
						callback();
					}         
			}, 100);
		};
		return {
			ruleForm: {
				title: "",
				content: "",
				html: ""
			},
			rules: {
				title: [
					{ required: true, message: "请输入公告标题", trigger: "change" },
					{validator: title, trigger: 'change'}
				],
				content: [
					{ required: true, message: "请填写公告内容", trigger: "blur" }
				]
			},
			toolbars: {
				bold: true, // 粗体
				italic: true, // 斜体
				header: true, // 标题
				underline: true, // 下划线
				strikethrough: true, // 中划线
				mark: true, // 标记
				superscript: true, // 上角标
				subscript: true, // 下角标
				quote: true, // 引用
				ol: true, // 有序列表
				ul: true, // 无序列表
				link: true, // 链接
				code: false, // code
				table: true, // 表格
				fullscreen: true, // 全屏编辑
				readmodel: true, // 沉浸式阅读
				htmlcode: true, // 展示html源码
				help: true, // 帮助
				/* 1.3.5 */
				undo: true, // 上一步
				redo: true, // 下一步
				trash: true, // 清空
				save: true, // 保存（触发events中的save事件）
				/* 1.4.2 */
				navigation: true, // 导航目录
				/* 2.1.8 */
				alignleft: true, // 左对齐
				aligncenter: true, // 居中
				alignright: true, // 右对齐
				/* 2.2.1 */
				subfield: true, // 单双栏模式
				preview: true // 预览
			}
    	};
  	},
	methods: {
		change(value, render) {
			// render 为 markdown 解析后的结果[html]
			this.ruleForm.html = render;
		},
    	submitForm(formName) {
      		this.$refs[formName].validate(valid => {
        		if (valid) {
          			this.$axios({
						method: "post",
						url: "/api/notice/create",
						withCredentials: true,
						data: {
							title: this.ruleForm.title,
							content: this.ruleForm.html,
							username: this.getUsername(),
							date: new Date(),
							valid: true
						},
						header: {
							"Content-Type": "application/json;charset=UTF-8"
						}
					}).then(res => {
						console.log("111");
						this.$notify({
							title: "公告发布成功",
							message: "可以在首页公告栏处查看",
							offset: 100,
							type: "success",
							showClose: false,
							duration: 2500
						});
						this.resetForm("ruleForm");
					}).catch(error => {
						console.log("发布失败");
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
						console.log("Error", error.message);
						console.log(error.config);
					});
				} else {
					console.log("error submit!!");
					return false;
				}
     		});
    	},
		resetForm(formName) {
		this.$refs[formName].resetFields();
		},
		getUsername() {
		var obj = JSON.parse(sessionStorage.getItem("user"));
		return obj.username;
		}
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
.form {
	position: absolute;
	left: 60px;
	right: 100px;
}
</style>