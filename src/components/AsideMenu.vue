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
    return {
      menuList: [
        {
          index: '/login',
          name: '登录'
        },
        {
          index: '/article',
          name: '文章列表'
        }
      ]
    }
  },
  computed: {
    defaultActive () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
