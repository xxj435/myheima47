<template>
  <div>
    <el-card class="box-card top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" ref="form">
        <el-form-item label="学科" prop='id'>
          <el-input v-model="formInline.id" class="duan"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop='name'>
          <el-input v-model="formInline.name" class="chang"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop='username'>
          <el-input v-model="formInline.username" class='duan'></el-input>
        </el-form-item>
        <el-form-item label="状态" prop='region'>
          <el-select v-model="formInline.region" placeholder="请选择状态"  class="chang">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='dosearch'>搜索</el-button>
          <el-button @click="resetForm">清除</el-button>
          <el-button type="primary" icon='el-icon-plus' @click='addxueke'>
           新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
          <el-table
      :data="tableData">
      <el-table-column
      type='index'
        label="序号">
      </el-table-column>
      <el-table-column
        prop="rid"
        label="学科编号">
      </el-table-column>
      <el-table-column
        prop="name"
        label="学科名称">
      </el-table-column>
       <el-table-column
        prop="short_name"
        label="简称">
      </el-table-column>
       <el-table-column
        prop="username"
        label="创建者">
      </el-table-column>
       <el-table-column
        prop="create_time"
        label="创建日期">
        <template slot-scope="scope">
        {{scope.row.create_time | formatTime}}
        </template>
      </el-table-column>
       <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
         <span v-if='scope.row.status===1'>启用</span>
         <span v-else style="color:red">禁用</span>
        </template>
      </el-table-column>
       <el-table-column
        label="操作" v-if="['超级管理员','管理员','老师'].includes($store.state.role)">
        <!-- 如果我想在一行里面加按钮,那么最好要用到自定义列,因为用它可以很方便的拿到这一行的数据 -->
        <!-- 自定义模板 -->
        <template slot-scope="scope">
          <el-button  type='text' @click='bianji(scope.row)'>编辑</el-button>
          <el-button  type='text' @click='changeadd(scope.row)'>
           {{scope.row.status===1?'禁用':'启用'}}
          </el-button>
          <el-button  type='text' @click="Delete(scope.row)" v-if="['超级管理员','管理员'].includes($store.state.role)">删除</el-button>
        </template>
      </el-table-column>
      <!-- 分页 -->
    </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5,10,20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
    <!-- 组件 -->
    <add ref="add"></add>
    <xuekeEdit ref="xuekeEdit"></xuekeEdit>
  </div>
</template>

<script>
//导入add组价
import add from './components/add.vue'
//导入编辑组件
import xuekeEdit from './components/xuekeEdit.vue'
//导入xueke.js
import {xuekelist,xuekexiu,xuekeDelete} from '@/api/xueke.js'
export default {
  components:{
    add,
xuekeEdit
  },
  data() {
    return {
      // 分页的当前页
        page: 1,
        //页容量
        size:5,
        //数据总量
        total:0,
        // input绑定的数据
        // iska:true,
        olditem:null,
      formInline: {
        id: "",
        name: "",
        username: "",
        region:''
      },
      //表格绑定的数据
      tableData: []
    }
  },
  methods: {
    //删除学科
  Delete(item){
    // console.log(item)
    xuekeDelete(
      {id:item.id}
    ).then(res=>{
      // console.log(res)
      if(res.data.code==200){
        if( this.tableData.length==1){
          this.page--
        }
        //如果--后变成0了,就不合理了,要他页码变为1
        if(this.page==0){
          this.page=1
        }
        this.$message.success('删除成功')
        this.add();
      }
    })
  },
    //学科编辑
    bianji(item){
      // console.log(item)
      this.$refs.xuekeEdit.dialogFormVisible=true
      //因为是浅拷贝,两个变量公用一个地址
      // this.$refs.xuekeEdit.form=item
      //深拷贝,让他们两个变量称为两个不互相影响的对象
      //如果是第一次点击的话,那么就赋值给表单,如果不是的话,就不执行
      // if(this.iska==true){
      //   this.$refs.xuekeEdit.form={...item}
      //   this.iska=false
      // }
      //如果当前点击页不等于上一次点击页,那么执行赋值,把当前被点击页赋值给上一次点击页
      if(item!=this.olditem){
        this.$refs.xuekeEdit.form={...item}
        this.olditem=item
      }
    },
    //新增学科
  addxueke(){
    this.$refs.add.dialogFormVisible=true
  },
    //清空表单
    resetForm() {
        this.$refs.form.resetFields();
        this.page=1
        this.add();
      },
    //表单搜索
    dosearch(){
      // console.log(this.formInline)
      this.add();
    },
    //修改学科状态
    changeadd(item){
      xuekexiu({
        id:item.id
      }).then(res=>{
        console.log(res)
       this.add();
      })
    },
    // 页容量改变事件
    handleSizeChange(size) {
      //  console.log(size)
       //赋值为改变后的页容量
       //只要页容量改变了,都应该从第一页开始显示
      this.size=size;
      this.page=1;
      this.add();
      },
      // 页码改变事件
      handleCurrentChange(page) {
        //把当前点击的页码给page
        this.page=page;
        //在重新请求数据
        this.add()
      },
        add(){
      //获取学科列表
    xuekelist({
      page:this.page,
      limit:this.size,
      rid:this.formInline.id,
      name:this.formInline.name,
      username:this.formInline.username,
      status:this.formInline.region

    }).then(res=>{
      // console.log(res)
      this.tableData=res.data.data.items
      this.total=res.data.data.pagination.total
    })
   }
  },
  created() {
  this.add()
  },
};
</script>

<style lang='less'>
.top{
  margin-bottom: 20px;
  .duan{
  width: 100px;
}
.chang{
  width: 149px;
}
}
</style>
