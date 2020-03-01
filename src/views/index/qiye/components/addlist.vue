<template>
  <el-dialog title="新增企业" :visible.sync="dialogFormVisible" center>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop='id'>
        <el-input v-model="form.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop='region'>
        <el-input v-model="form.region" autocomplete="off"></el-input>
      </el-form-item>

        <el-form-item label="企业简称" :label-width="formLabelWidth" prop='username'>
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop='textarea'>
        <el-input
          type="textarea"
          :rows="2"
          v-model="form.textarea"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="企业备注" :label-width="formLabelWidth">
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
import {qiyeadd} from '@/api/qiye.js'
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
            { required: true, message: '请输入企业编号', trigger: 'blur' },
          ],
          region: [
            { required: true, message: '请输入企业名称', trigger: 'blur' }
          ],
          textarea:[
             { required: true, message: '请输入企业简介', trigger: 'blur' }
          ],
          username:[
              { required: true, message: '请输入企业简称', trigger: 'blur' }
          ]
      }
    };
  },
  //方法集
  methods:{
      qued(){
             this.$refs.form.validate((valid) => {
          if (valid) {
            qiyeadd(
                {
                    eid:this.form.id,
                    name:this.form.region,
                    short_name:this.form.textarea,
                    intro:this.form.beizu,
                     remark:this.form.username
                }
            ).then(res=>{
                console.log(res)
                if(res.data.code==200){
                    this.dialogFormVisible=false,
                    //清空表单内容
                    this.$refs.form.resetFields()
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
