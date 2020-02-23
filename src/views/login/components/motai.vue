<template>
  <el-dialog
    title="用户注册"
    center
    :visible.sync="dialogFormVisible"
    width="603px"
  >

    <el-form :model="form" center :rules="rules" ref="reqform">
        <!-- 上传 -->
    <el-form-item label="头像" :label-width="formLabelWidth" prop='avater'>
      <el-upload
      v-model='form.avater'
      name='image'
        class="avatar-uploader"
        :action='imgUrl'
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input
          v-model="form.password"
          autocomplete="off"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="图形码" :label-width="formLabelWidth" prop="code">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img @click="add" :src="picUrl" alt="" class="imgcode" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="验证码" :label-width="formLabelWidth" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button :disabled="sec != 0" @click="yanzcode">
              {{ sec == 0 ? "获取用户验证码" : "还有" + sec + "秒" }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { sendSMS,register } from "@/api/register.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "65px",
      picUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      imgUrl:process.env.VUE_APP_URL +'//uploads',
      boolean: false,
      sec: 0,
      t: 0,
      imageUrl: "",
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: "",
        avater:'',
      },
      rules: {
        avater:[
          { required: true, message: "请上传头像", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "邮箱格式错误",
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "手机号格式错误",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 15, message: "密码5到15之间", trigger: "change" }
        ],
        code: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { len: 4, message: "图形码必须四位", trigger: "blur" }
        ],
        rcode: [{ required: true, message: "请输入验证码", trigger: "blur" },
        { len: 4, message: "手机验证码必须四位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.reqform.validate(valid => {
        if (valid) {

          register({
            username:this.form.name,
            phone:this.form.phone,
            email:this.form.email,
            avatar:this.form.avater,
            password:this.form.password,
            rcode:this.form.rcode
          }).then(res=>{
           if(res.data.code==200){
             this.$message.success('注册成功')
             this.$refs.reqform.resetFields();
             this.imageUrl=''
             this.dialogFormVisible = false;
           }else{
             this.$message.error(res.data.message)
           }
          })
        }
      });

    },
    add() {
      // alert(123)
      this.picUrl =
        process.env.VUE_APP_URL +
        "/captcha?type=sendsms" +
        "&" +
        this.t +
        "=" +
        Math.random() * 999;
    },
    yanzcode() {
      //给短信验证码调优
      //判断手机号码是否合法
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        //提升用户手机手机号格式有误
        this.$message.error("手机号码格式不正确");
        return;
      }
      //判断图形码格式
      if (this.form.code.length != 4) {
        this.$message.error("图形码长度不对");
        return;
      }
      this.sec = 60;
      //写一个每隔一秒触发的计时器
      let timerID = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timerID);
        }
      }, 1000);
      //获取手机验证码
      sendSMS({
        code: this.form.code,
        phone: this.form.phone
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("获取验证码为:" + res.data.data.captcha);
        } else {
          this.$message.warning(res.data.message);
        }
      });
      // axios({
      //   url:process.env.VUE_APP_URL+'/sendsms',
      //  method:"post",
      //  data:{
      //    code:this.form.code,
      //    phone:this.form.phone
      //  },
      //  withCredentials:true
      // }).then(res=>{
      //    console.log(res)
      //    if(res.data.code==200){
      //      this.$message.success('获取验证码为:'+res.data.data.captcha)
      //    }else{
      //      this.$message.warning(res.data.message)
      //    }
      //  })
    },

    handleAvatarSuccess(res, file) {
      // console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.avater=res.data.file_path;
      this.$refs.reqform.validateField('avater')
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || 'image/png' || 'image/gif' ;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像文件只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #11bfee, #2491e9);
  .el-dialog__title {
    color: white;
    font-size: 17px;
  }
}
.imgcode {
  width: 100%;
  height: 41px;
  //解决默认img基线对齐
  vertical-align: top;
}
.avatar-uploader{
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
