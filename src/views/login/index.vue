<template>
  <div class="login-warapper">
      <div class="login-img">
      <div class="login-title">
        <img src="./images/login_logo.png" alt="" class="title-img" />
        <span class="title-left">肖哥后台</span>
        <i></i>
        <span class="title-right">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form :model="form" label-width="43px" :rules="rules" ref='loginForm' class="loginForm">
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" v-model="form.phone" clearable>
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            show-password
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-row>
            <el-col :span='17'>
              <el-input placeholder="请输入验证码" v-model='form.code' clearable>
                <i slot="prefix" class="el-input__icon el-icon-key"></i>
              </el-input>
            </el-col>
            <el-col :span='7'>
                <img src="./images/login_code.png" alt="" class="code">
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop='agree'>
            <div class="agree-box">
                <el-checkbox v-model="form.agree" ></el-checkbox>
            <span class="agree-center">
              我已阅读并同意
              <el-link type="primary" :underline="false">用户协议</el-link>和
              <el-link type="primary" :underline="false">隐私条款</el-link>
            </span>
            </div>
        </el-form-item>

        <el-form-item>
          <el-button class="box-btn" type="primary" @click="doLogin">登录</el-button>
          <el-button class="box-btn" type="primary" @click="add">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="./images/login_banner_ele.png" alt="" />
    <motai ref='motai'></motai>
  </div>
</template>

<script>
import motai from '../login/components/motai'
export default {
     components:{
         motai
     },
  data() {
    return {
      form: {
        phone: "",
        password: "",
        code: "",
        agree:false
      },
      //规则对象
      rules: {
        phone: [
          { required: true, message: "不能为空", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "不能为空", trigger: "blur" },
          { message: "不能为空", trigger: "blur" }
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
        agree:[
            { pattern:/true/, message:'必须勾选同意用户协议',trigger:"change"}
        ]
      }
    };
  },

      methods: {
    doLogin() {
      // 找到表单对象，调用validate方法
      this.$refs.loginForm.validate(v => {
        if (v) {
          alert("全部通过");
          // 正儿八经发请求比较合理
        }
      });
    },
    add(){
        this.$refs.motai.dialogFormVisible=true
    }
  }
};
</script>

<style lang="less">
.login-warapper {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  //主轴居中
  justify-content: space-around;
  align-items: center;
  .login-img {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-right: 41px;
    box-sizing: border-box;
  }
  .login-title {
    margin-top: 48px;
    margin-left: 48px;
    display: flex;
    //   副轴居中
    align-items: center;
    .title-left {
      margin-left: 14px;
      font-size: 22px;
    }
    i {
      width: 1px;
      height: 28px;
      background: rgba(199, 199, 199, 1);
      margin: 0 14px 0 14px;
    }
    .title-right {
      font-size: 21px;
    }
  }
 .loginForm{
     margin-top: 35px;
      .code{
      width: 100%;
      height: 42px;
      vertical-align: top;
  }
  .agree{
      display: flex;
  }
  .box-btn{
      width: 100%;
      &:nth-child(2) {
        margin-left: 0;
        margin-top: 26px;
      }
  }
 }
}
</style>
