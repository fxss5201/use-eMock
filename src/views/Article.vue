<template>
  <div class="view-box">
    <div class="view-title">获取文章列表<span v-if="!isLogin">（要获得编辑权限请先 <router-link to="/login">登录</router-link> ）</span></div>
    <div class="view-tools">
      <el-button @click="refreshGetArticles">刷新文章列表</el-button>
      <el-button @click="addArticle" v-if="isLogin">添加文章</el-button>
    </div>
    <div v-loading="articleListLoading">
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
            <div class="item-btn-box" v-if="isLogin">
              <el-button size="mini" icon="el-icon-view" title="详情" @click="itemBtnEvent('detail', item)"></el-button>
              <el-button size="mini" icon="el-icon-edit" title="编辑" @click="itemBtnEvent('editor', item)"></el-button>
              <el-button size="mini" icon="el-icon-delete" title="删除" @click="itemBtnEvent('delete', item)"></el-button>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
        v-if="list.length"
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
        :total="page.total"
        @current-change="currentChange"
        @size-change="sizeChange">
      </el-pagination>
    </div>

    <!-- 添加或者编辑文章 -->
    <add-or-editor
      :type="dialogArticleType"
      :show="dialogArticleShow"
      :curArticle="curArticle"
      @toggle="dialogArticleToggle"
      @refresh="getArticles"
    ></add-or-editor>
  </div>
</template>

<script>
import AddOrEditor from './../components/AddOrEditor'

export default {
  name: 'Article',
  components: {
    AddOrEditor
  },
  data () {
    return {
      list: [],
      page: {
        currentPage: 1,
        pageSize: 5,
        total: 0
      },
      articleListLoading: false,
      dialogArticleType: 'add',
      dialogArticleShow: false,
      curArticle: {}
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    getArticles () {
      if (this.articleListLoading) return false
      this.articleListLoading = true
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
        this.articleListLoading = false
      })
    },

    refreshGetArticles () {
      this.page.currentPage = 1
      this.getArticles()
    },

    currentChange (val) {
      this.page.currentPage = val
      this.getArticles()
    },

    sizeChange (val) {
      this.page.pageSize = val
      this.getArticles()
    },

    addArticle () {
      this.dialogArticleType = 'add'
      this.dialogArticleShow = true
    },

    dialogArticleToggle (val) {
      this.dialogArticleShow = val
    },

    itemBtnEvent (val, article) {
      if (val === 'detail') {
        this.dialogArticleType = 'detail'
        this.curArticle = article
        this.dialogArticleShow = true
      } else if (val === 'editor') {
        this.dialogArticleType = 'editor'
        this.curArticle = article
        this.dialogArticleShow = true
      } else if (val === 'delete') {
        this.curArticle = article
        this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.articleDelete()
        }).catch(err => {
          console.log(err)
        })
      }
    },

    articleDelete () {
      if (this.articleListLoading) return false
      this.articleListLoading = true
      this.$axios.delete(`/api/articles/${this.curArticle.id}`).then(res => {
        this.articleListLoading = false
        this.getArticles()
        this.$message.success(res.msg)
      }).catch(err => {
        console.log(err)
      }).finally(_ => {
        this.articleListLoading = false
      })
    }
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
      .item-btn-box {
        flex: 1;
        display: none;
        text-align: right;
      }
      &:hover {
        .item-btn-box {
          display: block;
        }
      }
    }
    .view-list-item + .view-list-item {
      border-top: 1px solid #ddd;
    }
  }
}
</style>
