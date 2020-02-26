<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left-div">
        <i class="el-icon-s-fold"></i>
        <img src="./images/login_logo.png" alt="" />
        <span class="left-title">黑马面面</span>
      </div>
      <div class="right-div">
        <img :src="userimg" alt="" />
        <span class="right-title">{{ username }},您好!!!</span>
        <el-button type="success" @click="open">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">
        <el-menu
        router
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概况</span>
          </el-menu-item>

          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>

          <el-menu-item index="/index/question">
            <i
              class="el-icon-edit-outline"
            ></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/index/qiye">
            <i class="el-icon-tickets"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>

          <el-menu-item index="/index/xueke">
            <i class="el-icon-tickets"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { info, logout } from "@/api/index.js";
//导入操作token的工具
import { removeToken,getToken } from "@/utilis/token.js";
export default {
  data() {
    return {
      userimg: "",
      username: ""
    };
  },
  methods: {
    open() {
      this.$confirm("此操作将退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("退出成功");
              //删除token
              removeToken();
              this.$router.push("/login");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "感谢你还留下来,陪我!!!"
          });
        });
    }
  },
  created() {
    info().then(res => {
      console.log(res);

          this.userimg = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
      this.username = res.data.data.username;
    });
  },
  beforeCreate() {
      if(getToken()==null){
          this.$router.push('/login')
      }
  },
};
</script>

<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    .left-div {
      height: 100%;
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
      }
      img {
        margin-right: 10px;
        margin-left: 20px;
        width: 33px;
        height: 28px;
      }
      .left-title {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right-div {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
      }
      .right-title {
        margin-left: 10px;
        margin-right: 30px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
      }
    }
  }
  .my-aside {

  }
  .my-main {
    background-color: red;
  }
}
</style>
