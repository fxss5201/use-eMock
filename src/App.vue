<template>
  <div id="app">
    <el-container class="page">
      <el-header class="header-box">
        <div class="header-wrapper">eMock的使用示例</div>
      </el-header>
      <el-container>
        <el-aside width="200px" class="page-aside">
          <aside-menu></aside-menu>
        </el-aside>
        <el-container>
          <el-main style="height: calc(100vh - 120px);">
            <router-view></router-view>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from '@/components/AsideMenu.vue'

export default {
  name: 'app',
  components: {
    AsideMenu
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100vh;

  .header-box {
    padding: 0;
    background-color: #545c64;
    .header-wrapper {
      padding: 0 15px;
      font-size: 18px;
      color: #fff;
      line-height: 60px;
    }
  }

  .page-aside {
    background-color: #545c64;
  }
}
</style>
