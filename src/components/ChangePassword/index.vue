<template>
  <!-- 修改密码界面 -->
  <el-dialog :title="$t('common.changePassword')" width="40%" :visible.sync="cgpwdVisible" :close-on-click-modal="false" :modal-append-to-body='false'>
    <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
             label-position="right">
      <el-form-item label="旧密码" prop="oldpassword">
        <el-input v-model="dataForm.oldpassword" type="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-input v-model="dataForm.newpassword" type="password" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" style="margin-top: 5px;">
      <el-button :size="size" @click.native="cgpwdVisible = false">{{$t('action.cancel')}}</el-button>
      <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">{{$t('action.submit')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>

import {pwdUpd} from '../../api/user'
export default {
  data() {
    return {
      size: 'small',
      cgpwdVisible: true, // 编辑界面是否显示
      editLoading: false,   //载入图标
      //初始化数据
      dataForm: {
        oldpassword: '',
        newpassword: ''
      },
      //设置属性
      dataFormRules: {
        oldpassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      },
      //获取全局url
      baseUrl: this.global.baseUrl
    }
  },
  methods: {
    // 设置可见性
    setCgpwdVisible: function (cgpwdVisible) {
      this.cgpwdVisible = cgpwdVisible
    },
    // 提交请求
    submitForm: function () {
      //this.$refs.XXX 获取ref绑定的节点
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            let params = Object.assign({}, this.dataForm)
            params.user = 'admin'
            pwdUpd(params).then(response => {
              if (response.data.code == this.$ECode.SUCCESS) {
                this.$message({
                  type: 'success',
                  message: response.data.message
                })
                // 打开登录页面
                this.cgpwdVisible = true
              } else {
                this.$message({
                  type: 'error',
                  message: response.data.message
                })
              }
            })
          })
        }
      })
    }
  },
//mounted： 在这发起后端请求，拿回数据，配合路由钩子做一些事情  （dom渲染完成 组件挂载完成 ）
  mounted() {

  }
}
</script>

<style scoped>

</style>
