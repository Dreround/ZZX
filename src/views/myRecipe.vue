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
                  <h4 @click="goToList('blogContent', item)" class="itemTitle">{{item.title}}</h4>
                  <br>
                  <el-tag
                    class="elTag"
                    v-if="item.author"
                    @click="goToList('author', item)"
                  >{{item.author}}</el-tag>

                  <el-tag
                    class="elTag"
                    type="success"
                    v-if="item.summary != null"
                    @click="goToList('blogContent', item.title)"
                  >{{item.summary}}</el-tag>
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
import { getMyRecipe} from '../api/myRecipe'

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
    let uid = 1
    getMyRecipe(uid).then(response => {
      if (response.data.code == this.$ECode.SUCCESS) {
        this.itemBySort = response.data.records
      }
    }).catch(error => {
      this.$commonUtil.message.info(uid)
      for (let i = 0; i < 5; ++i) {
        this.itemBySort.push({title: 'test', author: 'ptss', labels: ['技术', '数据库'], summary: '略略略', clickCount: 100, likeCount: 200, time: '2020-12-2'})
      }
      console.log("getsortlist failed")
    })
  },
  methods: {
    // clickActivity (id) {
    //   this.selectContent = id
    //   var params = new URLSearchParams()
    //   console.log("this is id")
    //   console.log(id)
    //   params.append('id', id)
    //   getArticleBySort(params).then(response => {
    //     if (response.data.code == this.$ECode.SUCCESS) {
    //       this.itemBySort = response.data.records
    //       console.log(this.itemBySort)
    //     }
    //   })
    // },
    // 跳转到搜索详情页
    goToList (type, entity) {
      switch (type) {
        case 'tag':
        {
          // 标签uid
          let routeData = this.$router.resolve({
            path: '/list',
            query: { tagUid: entity.uid }
          })
          window.open(routeData.href, '_blank')
        }
          break
        case 'blogSort':
        {
          let routeData = this.$router.resolve({
            path: '/list',
            query: { sortUid: entity.blogSort.uid }
          })
          window.open(routeData.href, '_blank')
        }
          break
        case 'author':
        {
          let routeData = this.$router.resolve({
            path: '/list',
            query: { author: entity.author }
          })
          window.open(routeData.href, '_blank')
        }
          break

        case 'blogContent':
        {
          if (entity.type == '0') {
            let routeData = this.$router.resolve({
              path: '/info',
              query: { blogOid: entity.oid }
            })
            window.open(routeData.href, '_blank')
          } else if (entity.type == '1') {
            window.open(entity.outsideLink, '_blank')
          }
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
