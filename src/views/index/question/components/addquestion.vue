<template>
      <el-dialog title="新增题库测试" :visible.sync="dialogFormVisible" fullscreen=true class="my-dialog">
  <el-form :model="form" center>
    <el-form-item label="学科" :label-width="formLabelWidth">
      <xuekeselect v-model="form.subject"></xuekeselect>
    </el-form-item>
    <el-form-item label="阶段" :label-width="formLabelWidth">
       <el-select  placeholder="请选择阶段" v-model="form.step">
      <el-option label="初级" value="1"></el-option>
      <el-option label="中级" value="2"></el-option>
      <el-option label="高级" value="3"></el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="企业" :label-width="formLabelWidth">
      <qiyeselect v-model="form.enterprise"></qiyeselect>
    </el-form-item>
     <el-form-item label="城市" :label-width="formLabelWidth">
      <el-cascader
    v-model="form.city"
    :options="options"
    :props="{ expandTrigger: 'hover',value:'label' }"
    @change="handleChange"></el-cascader>
    </el-form-item>
    <el-form-item label='题型' :label-width="formLabelWidth">
         <el-radio-group v-model="form.type">
    <el-radio :label="1">单选</el-radio>
    <el-radio :label="2">多选</el-radio>
    <el-radio :label="3">简答</el-radio>
  </el-radio-group>
    </el-form-item>
     <el-form-item label='难度' :label-width="formLabelWidth">
         <el-radio-group v-model="form.difficulty">
    <el-radio :label="1">简单</el-radio>
    <el-radio :label="2">一般</el-radio>
    <el-radio :label="3">困难</el-radio>
  </el-radio-group>
    </el-form-item>
    <el-form-item >
        <el-divider></el-divider>
    </el-form-item>
    <el-form-item label='试题标题' :label-width="formLabelWidth">
        <myeditor v-model="form.title"></myeditor>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
//导入编辑器
import myeditor from './myeditor'
//拿到省市区联动数据
import { regionDataPlus } from 'element-china-area-data'
export default {
    components:{
myeditor
    },
data() {
    return {
        dialogFormVisible:false,
        formLabelWidth:'306px',
        options:regionDataPlus,
        form:{
           subject:'',
           step:'',
           enterprise:'',
            city:'',
            type:'',
            difficulty:''
        }
    }
},
}
</script>

<style lang='less'>
    .my-dialog{
        .el-select{
            width: 364px;
        }
        .el-form-item__label{
            padding-right: 41px;
        }
    }
</style>