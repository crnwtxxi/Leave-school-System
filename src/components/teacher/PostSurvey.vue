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
                      <h4>调查题目：</h4><input class="eInput" style="width: 500px;" v-model="title">
                      <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="选择题" name="first">
                    <div id="select" >                       
                        <ul>
                           <li v-for="(item,index) in items" style="margin-top:30px">
                            <input style="width:500px;margin-left: 15px" class="eInput" placeholder="请输入标题" @input="updateTitleSelect($event,index)">
                <!--         <el-input placeholder="请输入标题" style="width: 500px" ></el-input> -->
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
                       
                        <!-- <button v-on:click="addQuestion">添加题目</button> -->
                        <ul>
                           <li v-for="(item,index) in question" :key="item.message" style="margin-top:30px">
                             <input class="eInput" placeholder="请输入标题" style="width: 500px" @input="updateQuestion($event,index)">
               <!--              <input type="" name="" style="width:400px;margin-left: 15px" @input="updateQuestion($event,index)"> -->
                            <br>
                            </li>
                        </ul>
                        <el-button type="primary" plain class="add"  v-on:click="addQuestion">添加题目</el-button>
                         <el-button type="primary" plain class="add"  v-on:click="deleteQuestion">删除题目</el-button>
                    </div>
                </el-tab-pane>
                </el-tabs>
                 <el-button type="primary" plain class="add" style="margin-top:80px; " v-on:click="verify">发布</el-button>
           </div>
            </div>
        </div>
    </div>
</template>

<script>

    
    export default {
     
        data() {
            return {
                title:"xx",
                items:[
                    {title:'xx',option:["x","x","x","x"]},

                    ],
                    activeName:'first',
                question:[
                    {title:"x"}
                    ]
                }
            
        },
        methods: {
             open() {
                  this.$alert('您的信息还未创建完整', '错误提醒', {
                  confirmButtonText: '确定',
                  callback: action => {
                 this.$message({
                        type: 'info',
                        message: `请检查发布内容`
                         });
                        }
                    });
                    }
                ,
            deleteQuestion:function(){
                this.question.pop()
            },

            deleteSelect:function(){
                this.items.pop()
            } ,
            addSelect:function(){
                var len=this.items.length
                
                if(len==0){
                     this.items.push({title:'',option:["","","",""]})
                     return
                }
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
            addQuestion:function () {
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
            updateTitleSelect:function(event,index){
                console.log(event.currentTarget.value)
                var updateValue=event.currentTarget.value
                console.log(this.items[index].title)
                console.log("arrary"+this.items)
                this.items[index].title=updateValue
                console.log('title'+this.items[index].title)

            },
            updateSelectOption:function(event,index,optionIndex){
                var updateValue=event.currentTarget.value
                //console.log(this.items[index].option[optionIndex])
                this.items[index].option[optionIndex]=updateValue
                //console.log(this.items[index].option[optionIndex])
            },
            updateQuestion:function(event,index){
                var updateValue=event.currentTarget.value
                console.log(this.question[index].title)
                this.question[index].title=updateValue
            },
            handleClick(tab,event){

            },
            postSurvey:function(){
                //
                    // 将数据传送到数据库，然后页面展示发布成功，然后
                //
            },
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
                            url: 'http://106.15.206.229/survey/post',
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
                            console.log('111');
                            console.log(res);
                            this.$notify({
                                title: "发布成功",
                                offset: 100,
                                type: "success",
                                showClose: false,
                                duration: 1500
                            });
                            this.$emit('func');
                        }).catch((error) => {
                             this.$message({
                                     type: 'info',
                                     message: '发布失败，请重新尝试！'
                                 });    
                            console.log('失败');
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers); 
                            console.log('Error', error.message);
                            console.log(error.config);
                        })
                // this.$message({

                //     type: 'success',
                //     message: '调查发布成功！'
                // });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消发布！'
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