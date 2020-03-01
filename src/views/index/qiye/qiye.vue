<template>
  <div>
    <el-card class="box-card top">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        ref="form"
      >
        <el-form-item label="企业编号" prop="id">
          <el-input v-model="formInline.id" class="duan"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="formInline.name" class="chang"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="formInline.username" class="duan"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="region">
          <el-select
            v-model="formInline.region"
            placeholder="请选择状态"
            class="chang"
          >
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dosearch">搜索</el-button>
          <el-button @click="resetForm">清除</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addqiye">
            新增企业
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table :data="tableData">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="eid" label="企业编号"> </el-table-column>
        <el-table-column prop="name" label="企业名称"> </el-table-column>
        <el-table-column prop="short_name" label="简称"> </el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="create_time" label="创建日期">
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
    <addlist ref="addlist"></addlist>
    <qiyeEdit ref="qiyeEdit"></qiyeEdit>
  </div>
</template>

<script>
//导入列表请求
import { qiyelist,qiyedel,qiyezt } from "@/api/qiye.js";
//导入addlist.vue组件
import addlist from "./components/addlist.vue";
import qiyeEdit from './components/qiyeEdit.vue'
export default {
  //注册组件
  components: {
    addlist,
    qiyeEdit
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
        id: "",
        name: "",
        username: "",
        region: ""
      },
      //表格绑定的数据
      tableData: []
    };
  },
  methods: {
    //状态修改
    changeadd(item){
      qiyezt({
        id:item.id
      }).then(res=>{

        if(res.data.code==200){
          this.add()
        }
      })
    },
    //删除企业
    Delete(item){
      qiyedel({
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
          this.add()
        }
      })
    },
    //清除列表
    resetForm(){
      this.$refs.form.resetFields()
      this.page=1
      this.add()
    },
    //搜索
    dosearch(){
      this.page=1
      this.add()
    },
    bianji(item){
      // console.log(item)
      this.$refs.qiyeEdit.dialogFormVisible=true
      if(item!=this.olditem){
        this.$refs.qiyeEdit.form={...item}
        this.olditem=item
      }
    },
    //页容量改变事件
      handleSizeChange(size) {
        // console.log(`每页 ${val} 条`);
        this.size=size;
        this.page=1;
        this.add()
      },
      handleCurrentChange(page) {
        // console.log(`当前页: ${val}`);
        //把当前用户点击的页码给page
        this.page=page
        //在重新请求数据
        this.add()
      },
    //新增企业
    addqiye() {
      this.$refs.addlist.dialogFormVisible = true;
    },
    //封装一个企业列表函数
    add() {
      qiyelist({
        name:this. formInline.name,
        eid:this.formInline.id,
        username:this.formInline.username,
        status:this.formInline.region,
        page:this.page,
        limit:this.size
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.items;
        this.total=res.data.data.pagination.total
      });
    }
  },
  created() {
    this.add();
  }
};
</script>

<style lang="less">
.top {
  margin-bottom: 20px;
  .duan {
    width: 100px;
  }
  .chang {
    width: 149px;
  }
}
</style>
