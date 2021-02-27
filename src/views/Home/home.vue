<template>
  <el-container class="home-container">
    <!--左侧内容-->
    <el-aside width="230px">
      <img src="../../assets/img/logo_03.png" class="logo-img"/>
      <el-menu
          class="home-menu"
          background-color="#002542"
          text-color="#ffffff"
          active-text-color="#ffffff"
          :unique-opened="true"
          router
          :default-active="ActivePath">
        <el-menu-item index="/Worker" @click="SavePathIndex('/Worker')">
          <i class="iconfont icon-zhuye"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu :index="'/'+ item.path"
          v-for="item in navList"
          :key="item.id">
          <template slot="title">
            <i :class="navIcon[item.id]"></i>
            <span>{{item.navName}}</span>
          </template>
          <el-menu-item :index="'/' + chiItem.path"
            v-for="chiItem in item.children"
            :key="chiItem.id"
            @click="SavePathIndex('/' + chiItem.path)">
            <template slot="title">
              <i class="iconfont icon-youxiang"></i>
              <span>{{chiItem.navName}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <!--右侧头部-->
      <el-header>
        <img src="../../assets/img/head.jpg" class="head-img"/>
        <span>Hi,星星星</span>
        <div class="flex back-but">
          <span class="iconfont icon-tuichu"></span>
          <span>退出</span>
        </div>
      </el-header>
      <!--主体内容-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {GetNavList} from "../../api/home";

  export default {
    data(){
      return {
        navList: [],
        ActivePath: '/Worker',
        navIcon: {
          2: "iconfont icon-qidongzhaopinguanli",
          3: "iconfont icon-yuangongguanli",
          4: "iconfont icon-xitongshezhi",
          5: "iconfont icon-icon-",
        }
      }
    },
    created() {
      this.ActivePath = window.sessionStorage.getItem('pathIndex');
    },
    mounted() {
      // 获取左侧列表
      GetNavList().then(res=> {
        this.navList = res.data;
      })
    },
    methods: {
      // 存储点击的路由，刷新页面时取出赋值给默认
      SavePathIndex(path) {
        window.sessionStorage.setItem('pathIndex', path);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-container {
    height: 100vh;
  }
  .el-header{
    background-color: #ffffff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-bottom: 1px solid #e4e4e466;

    .head-img {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      margin-right: 6px;
    }

    .back-but {
      margin-left: 18px;
      cursor: pointer;
      span:nth-of-type(1) {
        font-size: 16px;
        font-width: 500;
        margin-right: 4px;
      }
    }
  }

  .el-aside {
    background-color: #002542;

    .logo-img {
      height: 120px;
      width: 187px;
      margin: 26px 0 0 10px;
    }

    .el-menu {
      border: 0;
    }
    .home-menu {
      padding: 20px 9px 0px 12px;
      .iconfont {
        margin-right: 13px;
        color: #ffffff;
        font-size: 15px;
      }
    }
  }

  .el-main {
    background-color: #F6F6F6;
    padding: 18px 40px;
  }

</style>
