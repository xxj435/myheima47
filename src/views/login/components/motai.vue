<template>
  <el-dialog
    title="用户注册"
    center
    :visible.sync="dialogFormVisible"
    width="603px"
  >
    <el-form :model="form" center :rules='rules' ref="form">
      <el-form-item label="昵称" :label-width="formLabelWidth" prop='name'>
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth" prop='email'>
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" :label-width="formLabelWidth" prop='phone'>
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

       <el-form-item label="密码" :label-width="formLabelWidth" prop='password'>
        <el-input v-model="form.password" autocomplete="off" show-password></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth" prop='code'>
        <el-row>
          <el-col :span='16'>
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
            <el-col :span='7' :offset='1'>
              <img @click='add' :src="picUrl" alt="" class="imgcode">
            </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop='rcode'>
        <el-row>
          <el-col :span='16'>
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
            <el-col :span='7' :offset='1'>
             <el-button :disabled='sec!=0' @click="yanzcode">
               {{sec==0?'获取用户验证码':'还有'+sec+'秒'}}
             </el-button>
            </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible:false,
      formLabelWidth: "65px",
      picUrl:process.env.VUE_APP_URL+'/captcha?type=sendsms',
      boolean:false,
       sec:0,
       t:0,
      form: {
        name:'',
        email:'',
        phone:'',
        password:'',
        code:'',
        rcode:'',
      },
      rules:{
        name:[
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {pattern:/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,message:'邮箱格式错误',trigger:'change'}
        ],
         phone:[
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {pattern:/0?(13|14|15|18|17)[0-9]{9}/,message:'手机号格式错误',trigger:'change'}
        ],
          password:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
          { min:5,max:15, message: '密码5到15之间', trigger: 'change' },
        ],
      }
    };
  },
  methods: {
    submitForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.dialogFormVisible=false
          } else {
            this.dialogFormVisible=true
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      add(){
        // alert(123)
        this.picUrl=process.env.VUE_APP_URL+'/captcha?type=sendsms'+'&'+this.t+'='+Math.random()*999
      },
      yanzcode(){
        this.sec=60;
        //写一个每隔一秒触发的计时器
        let timerID=setInterval(() => {
          this.sec--;
          if(this.sec==0){
            clearInterval(timerID)
          }
        }, 1000);
      }

    }
  }

</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
  .el-dialog__title {
    color: white;
    font-size: 17px;
  }
}
.imgcode{
  width: 100%;
  height: 41px;
  //解决默认img基线对齐
  vertical-align: top;
}
</style>
