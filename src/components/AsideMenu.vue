<template>
  <el-menu
    class="el-menu-vertical"
    background-color="#545c64"
    text-color="#fff"
    router
    :default-active="defaultActive">
    <el-menu-item
      v-for="item in menuList"
      :key="item.index"
      :index="item.index"
    >
      <template slot="title">
        <span>{{ item.name }}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AsideMenu',
  data () {
    return {}
  },
  computed: {
    defaultActive () {
      return this.$route.path
    },
    isLogin () {
      return this.$store.getters.isLogin
    },
    menuList () {
      const normalList = [
        {
          index: '/article',
          name: '文章列表'
        }
      ]
      const authorList = [
        {
          index: '/login',
          name: '登录'
        }
      ]
      if (this.isLogin) {
        return normalList
      } else {
        return authorList.concat(normalList)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
