<template>
  <div>
    <el-card class="box-card top">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        ref="form"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="formInline.username" class="duan"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formInline.email" class="chang"></el-input>
        </el-form-item>
        
        <el-form-item label="角色" prop="role_id">
          <el-select
            v-model="formInline.role_id"
            placeholder="请选择状态"
            class="chang"
          >
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label='学生' value='4'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dosearch">搜索</el-button>
          <el-button @click="resetForm">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addqiye">
            新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table :data="tableData" border>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="status" label="备注">
          <template slot-scope="scope">
            {{ scope.row.create_time | formatTime }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">启用</span>
            <span v-else style="color:red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 如果我想在一行里面加按钮,那么最好要用到自定义列,因为用它可以很方便的拿到这一行的数据 -->
          <!-- 自定义模板 -->
          <template slot-scope="scope">
            <el-button type="text" @click="bianji(scope.row)">编辑</el-button>
            <el-button type="text" @click="changeadd(scope.row)">
              {{ scope.row.status === 1 ? "禁用" : "启用" }}
            </el-button>
            <el-button type="text" @click="Delete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <!-- 分页 -->
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <adduser ref="adduser"></adduser>
  </div>
</template>

<script>
//导入
import adduser from './components/adduser'
//导入user请求
import {userlist,userStatus,userRemove} from '@/api/user.js'
export default {
  //注册
  components:{
    adduser
  },
data() {
    return {
      // 分页的当前页
      page: 1,
      //页容量
      size: 5,
      //数据总量
      total: 0,
      // input绑定的数据
      // iska:true,
      olditem: null,
      formInline: {
        username: "",
       email:'',
       role_id:null
      },
      //表格绑定的数据
      tableData: []
    };
  },
  methods: {
    //编辑
    bianji(item){
       this.$refs.adduser.dialogFormVisible=true
          if(item!=this.olditem){
        this.$refs.adduser.form={...item}
        this.olditem=item
      }
    },
    //新增用户
    addqiye(){
      this.$refs.adduser.dialogFormVisible=true
    },
     //状态修改
    changeadd(item){
      userStatus({
        id:item.id
      }).then(res=>{

        if(res.data.code==200){
          this.getlist()
        }
      })
    },
    //删除企业
    Delete(item){
      userRemove({
        id:item.id
      }).then(res=>{
        console.log(res)
        if(res.data.code==200){
          this.$message.success('删除成功')
          if(this.tableData.length==1){
            //如果是最后一条就到上一条
            this.page--
          }
          if(this.page<1){
            this.page=1
          }
          this.getlist()
        }
      })
    },
     //清除列表
    resetForm(){
      this.$refs.form.resetFields()
      this.page=1
      this.getlist()
    },
    //搜索
    dosearch(){
      this.page=1
      this.getlist()
    },
      //页容量改变事件
      handleSizeChange(size) {
        // console.log(`每页 ${val} 条`);
        this.size=size;
        this.page=1;
        this.getlist()
      },
      handleCurrentChange(page) {
        // console.log(`当前页: ${val}`);
        //把当前用户点击的页码给page
        this.page=page
        //在重新请求数据
        this.getlist()
      },
    getlist(){
userlist({
      username:this.formInline.username,
      role_id:this.formInline.role_id,
      email:this.formInline.email,
    page:this.page,
        limit:this.size
}).then(res=>{
  // console.log(res)
 this.tableData = res.data.data.items;
        this.total=res.data.data.pagination.total
})
    }
},
created() {
this.getlist();
},
}
</script>

<style>

</style>