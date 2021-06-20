<template>
  <div class="share">
    <p class="dasbox"  @click="collectToggle()">
      <a href="javascript:void(0)"  class="collect" title="收藏">{{Message}}</a>
    </p>
  </div>
</template>

<script>
import { getWebConfig } from '../../api/index'
import {
   getCollect, CollectRecipe
} from '../../api/blogContent'
import {mapMutations} from 'vuex'
export default {
  name: 'Collect',
  props: {
    recipe_id: ''
  },
  data () {
    return {
      showCollect: '',
      collectName: '',
      showReport: '',
      reportReason: '',
      Message: '收藏'
    }
  },
  created () {
    this.Message = '收藏'
    this.getIsCollect(this.recipe_id)
  },
  methods: {
    // 拿到vuex中的写的方法
    ...mapMutations(['setLoginMessage']),
    collectToggle: function () {
      this.collectRecipe(this.recipe_id)
    },

    // 获取是否收藏
    getIsCollect: function (recipe_id) {
      var that = this
      let info = this.$store.state.user.userInfo
      let obj = {}
      obj.recipe_id = recipe_id
      obj.user_id = info.user_id
      getCollect(obj).then(response => {
        if(response.data.message === 'duplicate'){
          that.Message = '已收藏'
        }
        // else {
        //   that.$commonUtil.message.info(response.data.message)
        // }
      }).catch(function () {
        that.Message = '已收藏'
        that.$commonUtil.message.info('收藏失败')
      })
    },
    collectRecipe: function (recipe_id) {
      let that = this
      let info = this.$store.state.user.userInfo
      let obj = {}
      obj.recipe_id = recipe_id
      obj.user_id = info.user_id
      CollectRecipe(obj).then(response => {
        if(response.data.message === 'duplicate'){
          that.$commonUtil.message.info('您已经收藏过了哦~')
        }
        else if (response.data.code === this.$ECode.SUCCESS) {
          //that.collectToggle()
          that.$commonUtil.message.info('收藏成功')
          that.Message = '已收藏'
        }
        else
        {
          this.$message({
            type: 'error',
            message: response.data.message
          })
        }
      }).catch(function () {
        that.$commonUtil.message.info('收藏失败')
      })
    }
  }
}
</script>

<style>
.diggit {
  cursor: pointer;
}
.dasbox {
  cursor: pointer;
}
.registerBtn{
  cursor: pointer;
}
</style>
