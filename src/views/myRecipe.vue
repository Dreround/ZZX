<template>
  <div>
    <div class="pagebg sorts"></div>
    <div class="container">
      <h1 class="t_nav">
        <a href="/" class="n1">网站首页</a>
        <a href="javascript:void(0);" class="n2">我的菜谱</a>
      </h1>
      <div class="sortBox">
        <div class="article">
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="item in itemBySort"
                :key="item.time"
                :timestamp="item.time"
                placement="top"
              >
                <el-card>
                  <h4 @click="goToList('recipeContent', item)" class="itemTitle">{{item.recipe_name}}</h4>
                  <br>
                  <el-tag
                    class="elTag"
                    v-if="item.holder"
                    @click="goToList('holder', item)"
                  >{{item.holder}}</el-tag>

                  <el-tag
                    class="elTag"
                    type="success"
                    v-if="item.tips != null"
                    @click="goToList('recipeContent', item.recipe_name)"
                  >{{item.tips}}</el-tag>
                  <el-tag style="cursor: pointer;"
                          @click="updateMyRecipe(item.recipe_id)">编辑</el-tag>
                  <el-tag style="cursor: pointer;"
                          @click="deleteMyRecipe(item.recipe_id)">删除</el-tag>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyRecipe,deleteMyRecipe,getRecipeById} from '../api/myRecipe'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      selectContent: '',
      description: '',
      reverse: true,
      activities: [],
      itemBySort: [],
      articleByDate: {}
    }
  },
  components: {
    // 注册组件
  },
  mounted () {},
  created () {
    //this.$commonUtil.message.info('xxx')
    let info = {}
    info.uid = 1
    this.setUserInfo(info)
    info = this.$store.state.user.userInfo
    console.log(info.uid)
    //this.$commonUtil.message.info(this.$store.state.user.userInfo)
    getMyRecipe(info).then(response => {
      if (response.data.code == this.$ECode.SUCCESS) {
        this.itemBySort = response.data.records
      }
    }).catch(error => {
      this.$commonUtil.message.info('后端数据获取失败')
      for (let i = 0; i < 5; ++i) {
        this.itemBySort.push({recipe_name: 'test', recipe_id:'1', holder: 'ptss', tips: '略略略', time: '2020-12-2'})
      }
    })
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    deleteMyRecipe (id) {
      var params = new URLSearchParams()
      params.append('recipe_id', id)
      deleteMyRecipe(params).then(response => {
        if (response.data.code == this.$ECode.SUCCESS) {
          this.$commonUtil.message.info('删除成功')
        }
      }).catch(error => {
        this.$commonUtil.message.info('删除失败')
      })
    },
    updateMyRecipe (id) {
      var params = new URLSearchParams()
      params.append('recipe_id', id)
      getRecipeById(params).then(response => {
        if (response.data.code == this.$ECode.SUCCESS) {
          let recipe = {}
          recipe = response.data.records
          let routeData = this.$router.resolve({
            path: '/updateRecipe',
            query: recipe
          })
          window.open(routeData.href, '_blank')
        }
      }).catch(error => {
        this.$commonUtil.message.info('编辑失败')
        let recipe = {
          'recipe_id': "1",
          'recipe_name': "name",
          'tips': "this is a test",
          'ingredient': "this is ingredient",
          'steps': "this is steps"
        }
        let routeData = this.$router.resolve({
          path: '/updateRecipe',
          query: recipe
        })
        window.open(routeData.href, '_blank')
      })
    },
    // 跳转到搜索详情页
    goToList (type, entity) {
      switch (type) {
        // case 'tag':
        // {
        //   // 标签uid
        //   let routeData = this.$router.resolve({
        //     path: '/list',
        //     query: { tagUid: entity.uid }
        //   })
        //   window.open(routeData.href, '_blank')
        // }
        //   break
        // case 'blogSort':
        // {
        //   let routeData = this.$router.resolve({
        //     path: '/list',
        //     query: { sortUid: entity.blogSort.uid }
        //   })
        //   window.open(routeData.href, '_blank')
        // }
        //   break
        case 'holder':
        {
          let routeData = this.$router.resolve({
            path: '/list',
            query: { keyword: entity.holder }
          })
          window.open(routeData.href, '_blank')
        }
          break

        case 'recipeContent':
        {
          //if (entity.type == '0') {
            let routeData = this.$router.resolve({
              path: '/info',
              query: { recipe_id: entity.recipe_id }
            })
            window.open(routeData.href, '_blank')
          //} else if (entity.type == '1') {
            //window.open(entity.outsideLink, '_blank')
          //}
        }
          break
      }
    },
    formatDate: function (time) {
      var date = new Date(time)
      var year = date.getFullYear()
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      // 拼接
      return year + '-' + month + '-' + day
    }
  }
}
</script>

<style>
.sortBox {
  color: #555;
}

.sortBoxSpan {
  cursor: pointer;
}
.sortBoxSpan:hover {
  color: #409eff;
}
.sortBoxSpanSelect {
  color: #409eff;
}

.itemTitle {
  cursor: pointer;
}
.itemTitle:hover {
  color: #409eff;
}
.elTag {
  cursor: pointer;
}
</style>
