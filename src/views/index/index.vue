<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left-div">
        <i  @click="isCollapse = !isCollapse"
          :class="isCollapse ?  'el-icon-s-unfold' : 'el-icon-s-fold' "></i>
        <img src="./images/login_logo.png" alt="" />
        <span class="left-title">肖哥后台</span>
      </div>
      <div class="right-div">
        <img :src="$store.state.avatar" alt="" />
        <span class="right-title">{{ $store.state.username }},您好!!!</span>
        <el-button type="success" @click="open">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my-aside" width='auto'>
        <el-menu
        :collapse="isCollapse"
        router
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
        <!-- 从vuex中拿到用户的权限名称进行判断,该用户是否可以显示此网页 -->
        <template v-for="(item,index) in children">
          <el-menu-item :key="index" :index="'/index/'+item.path" v-if="item.meta.roles.includes($store.state.role)">
            <i :class="item.icon"></i>
            <span slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </template>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import children from '@/router/childrenRouter.js'
import { logout } from "@/api/index.js";
//导入操作token的工具
import { removeToken } from "@/utilis/token.js";
export default {
  data() {
    return {
      userimg: "",
      username: "",
     isCollapse:false,
     children
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
              //清空vuex中的数据
              this.$store.commit('changeusername','');
              this.$store.commit('changeavatar','')
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
//   created() {
//     info().then(res => {
//       console.log(res);

//           this.userimg = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
//       this.username = res.data.data.username;
//     });
//   },
//   beforeCreate() {
//       if(getToken()==null){
//           this.$router.push('/login')
//       }
//   },
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
    background:rgba(232,233,236,1);
  }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
