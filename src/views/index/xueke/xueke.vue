<template>
  <div>
    <el-card class="box-card top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <el-input v-model="formInline.id" class="duan"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input v-model="formInline.name" class="chang"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formInline.username" class='duan'></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态"  class="chang">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary">
            <i class="el-icon-plus">新增学科</i>
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
        label="操作">
        <!-- 如果我想在一行里面加按钮,那么最好要用到自定义列,因为用它可以很方便的拿到这一行的数据 -->
        <!-- 自定义模板 -->
        <template slot-scope="scope">
          <el-button  type='text'>编辑</el-button>
          <el-button  type='text' @click='changeadd(scope.row)'>
           {{scope.row.status===1?'禁用':'启用'}}
          </el-button>
          <el-button  type='text'>删除</el-button>
        </template>
      </el-table-column>
      <!-- 分页 -->
    </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
//导入xueke.js
import {xuekelist,xuekexiu} from '@/api/xueke.js'
export default {
  data() {
    return {
      // 分页的当前页
        page: 1,
        //页容量
        size:10,
        //数据总量
        total:0,
        // input绑定的数据
      formInline: {
        id: "",
        name: "",
        username: ""
      },
      //表格绑定的数据
      tableData: []
    }
  },
  methods: {
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
        console.log(`每页 ${size} 条`);
      },
      // 页码改变事件
      handleCurrentChange(page) {
        console.log(`当前页: ${page}`);
      },
        add(){
      //获取学科列表
    xuekelist({
      page:1,
      limit:5,
    }).then(res=>{
      // console.log(res)
      this.tableData=res.data.data.items
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
