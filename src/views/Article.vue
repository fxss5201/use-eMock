<template>
  <div class="view-box">
    <div class="view-title">获取文章列表<span v-if="!isLogin">（要获得编辑权限请先 <router-link to="/login">登录</router-link> ）</span></div>
    <div class="view-tools">
      <el-button @click="getArticles">获取文章</el-button>
      <el-button @click="addArticle">添加文章</el-button>
    </div>
    <div v-loading="getLoading">
      <div class="view-list">
        <div
          v-for="item in list"
          :key="item.id"
          class="view-list-item">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-description">{{ item.description }}</div>
          <div class="item-tools">
            <div class="item-time">{{ item.time }}</div>
            <div class="item-author">{{ item.author }}</div>
            <div class="item-btn-box">
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        v-if="list.length"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @current-change="currentChange"
        @size-change="sizeChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      list: [],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      getLoading: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  },
  methods: {
    getArticles () {
      if (this.getLoading) return false
      this.getLoading = true
      this.$axios.get('/api/articles', {
        params: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        }
      }).then(res => {
        this.list = res.list
        this.page.total = res.total
      }).catch(err => {
        console.log(err)
      }).finally(_ => {
        this.getLoading = false
      })
    },

    currentChange (val) {
      this.page.currentPage = val
      this.getArticles()
    },

    sizeChange (val) {
      this.page.pageSize = val
      this.getArticles()
    },

    addArticle () {}
  }
}
</script>

<style lang="scss" scoped>
.view-box {
  .view-title {
    font-size: 16px;
  }
  .view-tools {
    margin: 15px 0;
  }
  .view-list {
    margin: 15px 0;
    .view-list-item {
      padding: 10px 0;
      font-size: 14px;
      .item-title {
        font-weight: 700;
        line-height: 24px;
      }
      .item-description {
        line-height: 20px;
        overflow: hidden;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; // 弹性伸缩盒
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .item-tools {
        display: flex;
        line-height: 30px;
        .item-author {
          margin-left: 15px;
        }
      }
    }
    .view-list-item + .view-list-item {
      border-top: 1px solid #ddd;
    }
  }
}
</style>
