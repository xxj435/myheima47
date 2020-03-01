<template>
    <el-dialog title="编辑企业" :visible.sync="dialogFormVisible" center>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop='eid'>
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop='name'>
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

        <el-form-item label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.intro"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
 
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click='dialogFormVisible=false'>取 消</el-button>
      <el-button type="primary" @click='bianj'>保 存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {bianjiqiye} from '@/api/qiye.js'
export default {
data() {
    return {
        dialogFormVisible:false,
        formLabelWidth: "80px",
        form:{
            eid:'',
            name:'',
            short_name:'',
            intro:'',
            remark:''
        },
         //规则
      rules: {
          eid: [
            { required: true, message: '请输入企业编号', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入企业名称', trigger: 'change' }
          ],
      }
    }
},
methods:{
    
    bianj(){
        // console.log(this.form)
            bianjiqiye(
                //拿到form表单数据
                this.form
            ).then(res=>{
                // console.log(res)
                if(res.data.code==200){
                    this.dialogFormVisible=false
                    this.$message.success('编辑成功')
                    //调用父组件的方法重新刷新表格
                    this.$parent.add()
                }else{
                     this.$message.error(res.data.message)
                    this.dialogFormVisible=true
                }
            })
}
}
}
</script>

<style>

</style>