<template>
    <div class="container">
        <div class="locat">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item >当前位置</el-breadcrumb-item>
                <el-breadcrumb-item>公共调查</el-breadcrumb-item>
                <el-breadcrumb-item>发布调查</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="content">
            <h3>发布调查：</h3>
            <div class="QA">
                      <h4>调查题目：</h4>
                      <input class="eInput" style="width: 500px;" v-model="title" placeholder="请输入标题">
                       <el-button type="primary" plain class="add" style="float: right;  " v-on:click="verify">发布
                       </el-button>
                      <el-tabs v-model="activeName" >
                        <el-tab-pane label="选择题" name="first">
                    <div id="select" >                       
                        <ul>
                           <li v-for="(item,index) in items" style="margin-top:30px">
                            <input style="width:500px;margin-left: 15px" class="eInput" placeholder="请输入标题" @input="updateTitleSelect($event,index)">
               
                            <br>
                            <br>
                            <a>A:</a><input class="eInput" type="" name="" style="width:100px;margin-left: 5px" @input="updateSelectOption($event,index,0)">
                            <a>B:</a><input class="eInput" type="" name="" style="width:100px;margin-left: 5px" @input="updateSelectOption($event,index,1)">
                            <a>C:</a><input class="eInput" type="" name="" style="width:100px;margin-left: 5px" @input="updateSelectOption($event,index,2)"> 
                            <a>D:</a><input class="eInput" type="" name="" style="width:100px;margin-left: 5px" @input="updateSelectOption($event,index,3)">
                            <br>

                        </li>

                            
                        </ul>
                         <el-button type="primary" plain class="add" v-on:click="addSelect">添加题目</el-button>
                         <el-button type="primary" plain class="add" v-on:click="deleteSelect">删除题目</el-button>
                      </div>
                    </el-tab-pane>
                    <el-tab-pane label="问答题" name="second">
                    
                    <div id="answer">
                       
                     
                        <ul>
                           <li v-for="(item,index) in question" :key="item.message" style="margin-top:30px">
                             <input class="eInput" placeholder="请输入标题" style="width: 500px" @input="updateQuestion($event,index)">
                            <br>
                            </li>
                        </ul>
                        <el-button type="primary" plain class="add"  v-on:click="addQuestion">添加题目</el-button>
                         <el-button type="primary" plain class="add"  v-on:click="deleteQuestion">删除题目</el-button>
                    </div>
                </el-tab-pane>
                </el-tabs>
                
           </div>
            </div>
        </div>
    </div>
</template>

<script>

    
    export default {
     //数据
        data() {
            return {
                title:"",
                items:[
                   

                    ],
                    activeName:'first',
                question:[
                    
                    ]
                }
            
        },
        methods: {
            //打开提示信息
            open() {
                  this.$notify({
                  title: "添加题目失败",
                  message: "请检查之前的题目是否填完整",
                  offset: 100,
                  type: "error",
                  showClose: false,
                  duration: 2000
                  });
                   },
            //删除题目
            deleteQuestion(){
                this.question.pop()
            },
            deleteSelect(){
                this.items.pop()
            } ,
            //添加题目
            addSelect(){
                var len=this.items.length
                
                if(len==0){
                     this.items.push({title:'',option:["","","",""]})
                     return
                }
                //这个是判断上一个答案是否有空的情况，如果为空的话，就给出提示信息
                var check1=this.items[len-1].title
                var flg1=1
                var flg2=1
                if(check1==''){
                    flg1=0
                }
                var check2=this.items[len-1].option
                for (var i in check2){
                        if(i==''){
                            flg2=0
                        }
                }
                if((!flg1||!flg2)){
                    this.open()
                }
                else {
                this.items.push({title:'',option:["","","",""]})
                    }
            },
            addQuestion() {
                var len=this.question.length
                if(len==0){
                    this.question.push({title:""})
                    return 
                }
                var check1=this.question[len-1].title
                if(check1==''){
                    this.open()
                }
                else{
                this.question.push({title:""})
            }
                
            },
            //更新标题数据变化，并进行xss过滤
            updateTitleSelect(event,index){
                
                var updateValue=event.currentTarget.value
                this.items[index].title=this.stripscript(updateValue)
            },
            //更新标题选项，并进行xss过滤
            updateSelectOption(event,index,optionIndex){
                var updateValue=event.currentTarget.value       
                this.items[index].option[optionIndex]=this.stripscript(updateValue)
               
            },
            //更新问答题标题，并进行xss过滤
            updateQuestion(event,index){
                var updateValue=event.currentTarget.value
                this.question[index].title=this.stripscript(updateValue)
            },
            //进行xss过滤            
            stripscript(s)
            {
                //过滤掉敏感的字母,预防xss攻击
                var pattern = new RegExp("[%--`~!@#$^&*()=|{}''\\[\\]<>/?~！@#￥……&*（）――|{}【】‘”“']")
                var rs = "";
                for (var i = 0; i < s.length; i++) { rs=rs+s.substr(i,1).replace(pattern,''); } return rs; 
            }, 
            //给出提示信息 
            verify() {
                var check=this.title
                if(check==''){
                    this.open()
                    return
                }
                this.$confirm('确认发布？，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                 this.$axios({
                            method: 'post',
                            url: '/api/survey/post',
                            withCredentials : true,
                            data: {
                               title:this.title,
                               choice:this.items,
                               questionAnswer:this.question
                            },
                            header: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            }
                        }).then((res) => {
                            this.$notify({
                                title: "发布成功",
                                offset: 100,
                                type: "success",
                                showClose: false,
                                duration: 1500
                            });
                            this.$emit('func');
                        }).catch((error) => {
                             this.$notify({
                             title: "发布失败",
                             offset: 100,
                             type: "error",
                             showClose: false,
                             duration: 1500
                             });
                            
                        })
                
                }).catch(() => {
                    this.$notify({
                    title: "发布取消",
                    offset: 100,
                    type: "error",
                    showClose: false,
                    duration: 1500
                    });
                });
            }

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
.QA{
    margin-left: 250px;
    width: 800px;
}
.add{
    float: right;
    margin-right: 20px;
}
/*input{
    border-radius:5px;
}
*/
.eInput{
  width:350px;
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
</style>