<template>
  <div>
    <div class="box CPBox" v-if="showCP == true" append-to-body>
      <div class="title">
        <span class="t1">
          修改密码
        </span>
      </div>
      <el-divider></el-divider>
      <el-form :rules="rules" :label-position="labelPosition" :model="CPForm" ref="CPForm">

        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="CPForm.password" placeholder="密码长度在5~20之间" :disabled="CPType.password"></el-input>
        </el-form-item>

        <el-form-item label="重复密码" prop="password2">
          <el-input type="password" v-model="CPForm.password2" placeholder="请再次输入密码" :disabled="CPType.password"></el-input>
        </el-form-item>


        <el-row class="btn">
          <el-button class="loginBtn" type="primary" @click="startCP" :disabled="CPType.password">修改</el-button>
          <el-button class="registerBtn" type="info" @click="closeCP" :disabled="CPType.password">取消</el-button>
        </el-row>

        <!--        <div class="loginTip">注册后，需要到邮箱进行邮件认证~</div>-->
      </el-form>
    </div>

    <div class="mask"></div>

  </div>
</template>

<script>
import {localLogin, localRegister, pwdUpd} from '../../api/user'
import { Loading } from 'element-ui'
export default {
  name: 'share',
  data () {
    return {
      loading: null,
      option: {
        fullscreen: true,
        lock: true
      },
      vueMoguWebUrl: process.env.VUE_MOGU_WEB,
      // 显示登录页面
      showCP: true,
      table: false,
      dialog: false,
      labelPosition: 'right',
      CPType: {
        password: false,
        gitee: true,
        github: true,
        qq: true,
        wechat: true
      },
      CPForm: {
        user_id:'',
        password: '',
        password2: '',
      },
      // 登录类别
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, message: '密码长度需要大于等于 5 个字符', trigger: 'blur' },
          { max: 20, message: '密码长度不能大于 20 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { min: 5, message: '密码长度需要大于等于 5 个字符', trigger: 'blur' },
          { max: 20, message: '密码长度不能大于 20 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  components: {},
  methods: {
    startCP: function () {
      this.$refs.CPForm.validate((valid) => {
        if (!valid) {
          console.log('校验失败')
        } else {
          let passWord = this.CPForm.password
          let passWord2 = this.CPForm.password2
          if (passWord != passWord2) {
            this.$message({
              type: 'error',
              message: '两次密码不一致'
            })
            return
          }
          var params = {}
          params.user_id = this.$store.state.user.userInfo.user_id
          params.passWord = this.CPForm.password
          pwdUpd(params).then(response => {
            if (response.data.code == this.$ECode.SUCCESS) {
              this.$message({
                type: 'success',
                message: response.data.message
              })
            } else {
              this.$message({
                type: 'error',
                message: response.data.message
              })
            }
          })
        }
      })
    },
    goCP: function () {
      this.showCP = true
    },
    closeCP: function () {
      this.$emit('closeCPBox', '')
      this.showCP = false
    }
  }
}
</script>

<style>
.box {
  width: 400px;
  height: 420px;
  background: white;
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999; /* 要比遮罩层大 */
}

.CPBox {
  height: 400px;
}

.box .title {
  height: 48px;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  line-height: 48px;
}
.box .title .t2 {
  font-size: 16px;
  float: right;
  margin-right: 6px;
  margin-top: -6px;
  cursor: pointer;
}

.box .el-divider--horizontal {
  margin: 12px 0;
}

.box .el-form-item__label {
  margin-left: 10px;
  font-size: 16px;
}

.box .el-input__inner {
  margin-left: 10px;
  width: 90%;
}

.box .btn {
  text-align: center;
}

.box .loginBtn {
  width: 40%;
}

.box .registerBtn {
  width: 40%;
}

.elRow {
  margin-top: 15px;
  text-align: center;
}

.loginTip {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  color: #bababa;
}

.remarksBox {
  position: fixed;
  left: 50%;
  margin-left: -100px;
  top: 50%;
  margin-top: -50px;
  border: 1px solid red;
  width: 200px;
  height: 100px;
  text-align: center;
  z-index: 101; /* 要比遮罩层大 */
}

/* 遮罩层 */
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
</style>
