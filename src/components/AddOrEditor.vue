<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    destroy-on-close
    :before-close="dialogClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      v-loading="articleLoading"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="ruleForm.title" :disabled="!canEditor"></el-input>
      </el-form-item>
      <el-form-item label="文章内容" prop="description">
        <el-input type="textarea" :autosize="{ minRows: 3 }" v-model="ruleForm.description" :disabled="!canEditor"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="handleEvent">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddOrEditor',
  props: {
    type: {
      type: String,
      default: '',
      required: true,
      validator: val => ['detail', 'add', 'editor'].indexOf(val) > -1
    },
    show: {
      type: Boolean,
      default: false
    },
    curArticle: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      articleLoading: false,
      ruleForm: {
        title: '',
        description: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    canEditor () {
      return ['add', 'editor'].includes(this.type)
    },
    dialogTitle () {
      let res
      switch (this.type) {
        case 'detail':
          res = '文章详情'
          break
        case 'add':
          res = '添加文章'
          break
        case 'editor':
          res = '编辑文章'
          break
        default:
          res = ''
          break
      }
      return res
    },
    dialogVisible: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('toggle', val)
      }
    }
  },
  watch: {
    show: {
      handler (val) {
        if (val && ['detail', 'editor'].includes(this.type)) {
          this.getArticle()
        }
      },
      immediate: true
    }
  },
  methods: {
    dialogClose () {
      this.$emit('toggle', false)
    },

    handleEvent () {
      if (['add', 'editor'].includes(this.type)) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.postArticle()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },

    postArticle () {
      if (this.articleLoading) return false
      this.articleLoading = true
      if (this.type === 'add') {
        this.$axios.post('/api/articles', {
          data: {
            ...this.ruleForm,
            time: this.$dayjs().format('YYYY-MM-DD HH:mm:ss'),
            author: this.user.name
          }
        }).then(res => {
          this.$message.success(res.msg)
          this.$emit('refresh')
          this.$emit('toggle', false)
        }).catch(err => {
          console.log(err)
        }).finally(_ => {
          this.articleLoading = false
        })
      } else if (this.type === 'editor') {
        this.$axios.put(`/api/articles/${this.curArticle.id}`, {
          data: {
            ...this.curArticle,
            ...this.ruleForm
          }
        }).then(res => {
          this.$message.success(res.msg)
          this.$emit('refresh')
          this.$emit('toggle', false)
        }).catch(err => {
          console.log(err)
        }).finally(_ => {
          this.articleLoading = false
        })
      }
    },

    getArticle () {
      if (this.articleLoading) return false
      this.articleLoading = true
      this.$axios.get(`/api/articles/${this.curArticle.id}`).then(res => {
        this.ruleForm = res.article
      }).catch(err => {
        console.log(err)
      }).finally(_ => {
        this.articleLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
