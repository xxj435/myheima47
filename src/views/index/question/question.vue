<template>
<!-- 跟标签 -->
<div class='warapper'>
   <el-card>
   <el-form :inline="true" :model="formInline" class="demo-form-inline">

  <el-form-item label="学科">
    <el-select v-model="formInline.subject" placeholder="请选择学科">
      <el-option v-for="(item,index) in xuekelist" :key="index" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="阶段">
    <el-select v-model="formInline.step" placeholder="请选择阶段">
      <el-option label="初级" value="1"></el-option>
      <el-option label="中级" value="2"></el-option>
      <el-option label="高级" value="3"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="企业">
    <el-select v-model="formInline.enterprise" placeholder="请选择企业">
      <el-option v-for="(item,index) in qiyelist" :key="index" :label="item.name" value="item.id"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="题型">
    <el-select v-model="formInline.type" placeholder="请选择题型">
      <el-option label="单选" value="1"></el-option>
      <el-option label="多选" value="2"></el-option>
      <el-option label="简答" value="3"></el-option>
    </el-select>
  </el-form-item>
  <br>
    <el-form-item label="难度">
    <el-select v-model="formInline.difficulty" placeholder="请选择难度">
      <el-option label="简单" value="1"></el-option>
      <el-option label="一般" value="2"></el-option>
      <el-option label="困难" value="3"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label='作者'>
    <el-input v-model='username'></el-input>
  </el-form-item>
    <el-form-item label="状态">
    <el-select v-model="formInline.status" placeholder="请选择状态">
      <el-option label="禁用" value="0"></el-option>
      <el-option label="启用" value="1"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="日期">
      <el-date-picker
      v-model="formInline.create_date"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
    <br>
  </el-form-item>
  <el-form-item label='标题' class='chang'>
    <el-input></el-input>
  </el-form-item>
  <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" icon='el-icon-plus'>新增学科</el-button>
        </el-form-item>

  </el-form>
 </el-card>
 <!-- 底部卡片 -->
 <el-card>
   <el-table
   border
      :data="tableData"
      style="width: 100%">
      <el-table-column
       type='index'
        label="序号">
      </el-table-column>
      <el-table-column
        prop="title"
        label="题目">
        <template slot-scope="scope">
        <span v-html="scope.row.title"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="学科.阶段">
        <template slot-scope="scope">
          {{scope.row | format}}
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="题型">
        <template slot-scope="scope">
          <span v-if="scope.row.type==1">单选</span>
          <span v-if="scope.row.type==2">多选</span>
          <span v-if="scope.row.type==3">简答</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="enterprise_name"
        label="企业">
      </el-table-column>
      <el-table-column
        prop="username"
        label="创建者">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">禁用</span>
          <span v-if="scope.row.status==1">启用</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="访问量">
      </el-table-column>
      <el-table-column
      width='150px'
        label="操作">
        <template slot-scope="scope">
        <el-button type='text'>编辑</el-button>
        <el-button type='text' @click='doaddress(scope.row)'>
          {{scope.row.status===1? '禁用':'启用'}}
        </el-button>
        <el-button type='text'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
    background
      :current-page="page"
      :page-sizes="[5,10,20,30]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
 </el-card>
</div>

</template>

<script>
import {xuekelist} from '@/api/xueke.js'
import {qiyelist} from '@/api/qiye.js'
//导入题目请求
import {listquestion,statusquestion} from '@/api/question.js'
export default {
data() {
  return {
    xuekelist:[],
  qiyelist:[],
  tableData:[],
  pagination:[],
  page:1,
  size:5,
  total:0,

    formInline:{
      //日期
     create_date:'',
     subject:'',
     step:'',
     enterprise:'',
     type:'',
     difficulty:"",
     username:'',
     status:""
    }
  }
},
methods:{
  doaddress(item){
    statusquestion({
      id:item.id
    }).then(res=>{
      // console.log(res)
      if(res.data.code==200){
        this.add()
      }
    })
  },
  add(){
    listquestion().then(res=>{
    console.log(res)
    this.tableData=res.data.data.items
    this.pagination=res.data.data.pagination
  })
  }
},
created() {
  //获取学科数据
  xuekelist({
    status:1
  }).then(res=>{
    // console.log(res)
    this.list=res.data.data.items
  })
  //获取企业数据
  qiyelist({
    status:1
  }).then(res=>{
    // console.log(res)
    this.qiyelist=res.data.data.items
  })
  this.add()
},
//过滤器
filters:{
  format(val){
    //声明保存
    let num=''
    if(val.step==1){
      num='初级'
    }else if(val.step==2){
      num='中级'
    }else{
      num='高级'
    }
    return val.subject_name+'.'+num
  }
}
}
</script>

<style lang='less'>
.warapper{
    .el-form-item:not(:last-child) .el-form-item__content{
    width: 150px;
  }
  .el-form-item.chang .el-form-item__content{
    width: 388px;
  }
  .el-form-item__label{
    padding-right: 31px;
    padding-left: 20px;
  }
  .el-form-item .el-form-item__content .el-date-editor{
    width: 150px;
  }
  .el-pagination{
    text-align: center;
    margin-top: 31px;
  }
}
</style>