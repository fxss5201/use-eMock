<template>
  <div id="app">
    <el-container class="page">
      <el-header class="header-box">
        <div class="header-wrapper">
          <div class="header-wrapper-left">eMock的使用示例</div>
          <div class="header-wrapper-right">
            <el-dropdown v-if="isLogin" @command="handleCommand">
              <span class="el-dropdown-link">
                {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
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
  },
  data () {
    return {
      loginLoading: false,
      logoutLoading: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    },
    user () {
      return this.$store.state.user
    }
  },
  created () {
    if (this.$cookie.get('mockCookie')) {
      this.loginByCookie()
    }
  },
  methods: {
    loginByCookie () {
      if (this.loginLoading) return false
      this.loginLoading = true
      this.$axios.post('/api/loginByCookie').then(res => {
        this.$store.commit('setUser', res.user)
        this.$cookie.set('mockCookie', res.user.cookie, { expires: 7 })
        if (this.$route.path === '/login') {
          this.$router.push('/article')
        }
      }).catch(err => {
        console.log(err)
      }).finally(_ => {
        this.loginLoading = false
      })
    },

    handleCommand (command) {
      this[command]()
    },

    logout () {
      if (this.logoutLoading) return false
      this.logoutLoading = true
      this.$axios.post('/api/logout').then(res => {
        this.$store.commit('setUser', {})
        this.$cookie.remove('mockCookie')
        this.$router.push('/login')
      }).catch(err => {
        console.log(err)
      }).finally(_ => {
        this.logoutLoading = false
      })
    }
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
      display: flex;
      align-items: center;
      padding: 0 15px;
      font-size: 18px;
      color: #fff;
      .header-wrapper-left {
        flex: 1;
        line-height: 60px;
      }
      .header-wrapper-right {
        color: #fff;
        .el-dropdown {
          color: #fff;
        }
      }
    }
  }

  .page-aside {
    background-color: #545c64;
  }
}
</style>
