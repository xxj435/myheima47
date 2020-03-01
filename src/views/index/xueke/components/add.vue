<template>
  <el-dialog title="新增学科" :visible.sync="dialogFormVisible" center>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop='id'>
        <el-input v-model="form.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop='region'>
        <el-input v-model="form.region" autocomplete="off"></el-input>
      </el-form-item>

        <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.textarea"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.beizu" autocomplete="off"></el-input>
      </el-form-item>
 
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click='dialogFormVisible=false'>取 消</el-button>
      <el-button type="primary" @click='qued'>确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入添加学科js
import {xuekeadd} from '@/api/xueke.js'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        id: "",
        region: "",
        textarea:'',
        beizu:'',
        username:''
      },
      formLabelWidth: "80px",

      //规则
      rules: {
          id: [
            { required: true, message: '请输入学科编号', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请输入学科名称', trigger: 'change' }
          ],
      }
    };
  },
  //方法集
  methods:{
      qued(){
             this.$refs.form.validate((valid) => {
          if (valid) {
            xuekeadd(
                {
                    rid:this.form.id,
                    name:this.form.region,
                    short_name:this.form.textarea,
                    intro:this.form.beizu,
                     remark:this.form.username
                }
            ).then(res=>{
                // console.log(res)
                if(res.data.code==200){
                    this.dialogFormVisible=false,
                    this.$message.success('新增成功')
                    //刷新表格
                    this.$parent.add();
                }else{
                    this.$message.error(res.data.message)
                    this.dialogFormVisible=true
                }
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      }
  }
};
</script>

<style></style>
