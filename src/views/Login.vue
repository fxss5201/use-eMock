<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name" type="text"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginLoading: false,
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },
          { pattern: /^[0-9a-zA-Z_]+$/, message: '请输入正确格式（仅包含数字字母下划线）', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm (formName) {
      this.$refs[formName].resetFields()
    },

    login () {
      if (this.loginLoading) return false
      this.loginLoading = true
      this.$axios.post('/api/login', {
        data: {
          name: this.ruleForm.name,
          password: this.ruleForm.password
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      }).finally(_ => {
        this.loginLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
