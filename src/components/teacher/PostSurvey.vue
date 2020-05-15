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
                      <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="选择题" name="first">
                    <div id="select">
                        
                        <!-- <button v-on:click="addSelect">添加题目</button> -->
                  
                        
                        <ul>
                           <li v-for="(item,index) in items" style="margin-top:30px">
                            <input style="width:500px;margin-left: 15px" placeholder="请输入标题" @input="updateTitleSelect($event,index)">
                <!--         <el-input placeholder="请输入标题" style="width: 500px" ></el-input> -->
                            <br>
                            <br>
                            <a>A:</a><input type="" name="" style="width:100px;margin-left: 5px" input="updateSelectOption($event,index,0)">
                            <a>B:</a><input type="" name="" style="width:100px;margin-left: 5px" input="updateSelectOption($event,index,1)">
                            <a>C:</a><input type="" name="" style="width:100px;margin-left: 5px" input="updateSelectOption($event,index,2)"> 
                            <a>D:</a><input type="" name="" style="width:100px;margin-left: 5px" input="updateSelectOption($event,index,3)">
                            <br>

                        </li>

                            
                        </ul>
                        <el-button type="primary" plain class="add" v-on:click="addSelect">添加题目</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="问答题" name="second">
                    
                    <div id="answer">
                       
                        <!-- <button v-on:click="addQuestion">添加题目</button> -->
                        <ul>
                           <li v-for="(item,index) in question" :key="item.message" style="margin-top:30px">
                             <input placeholder="请输入标题" style="width: 500px" @input="updateQuestion($event,index)">
               <!--              <input type="" name="" style="width:400px;margin-left: 15px" @input="updateQuestion($event,index)"> -->
                            <br>
                            </li>
                        </ul>
                        <el-button type="primary" plain class="add"  v-on:click="addQuestion">添加题目</el-button>


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
        data() {
            return {
            
                items:[
                    {title:'Foo',option:["1","2","3","4"]},
                    {title:'Bar',option:["2","2","2","3"]}
                    ],
                    activeName:'first',
                question:[
                    {title:"你对这次的服务还有什么建议"}
                    ]
                }

            
        },
        methods: {
            addSelect:function(){
                this.items.push({message:"tmp",option:["1","1","2","1"]})
            },
            addQuestion:function () {
                this.question.push({title:"i am here"})
                
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
                console.log(this.items[index].option[optionIndex])
                this.items[index].option[optionIndex]=updateValue
                console.log(items)
            },
            updateQuestion:function(event,index){
                var updateValue=event.currentTarget.value
                console.log(this.question[index].title)
                this.question[index].title=updateValue
            },
            handleClick(tab,event){

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
    margin-left: 200px;
}
.add{
    float: right;
    margin-right: 500px;
}
</style>