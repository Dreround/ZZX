 <template>
  <article>
    <!--banner begin-->
    <div class="picsbox">
      <FirstRecommend></FirstRecommend>
      <!--banner end-->
      <!-- 二级推荐 -->
<!--      <div class="toppic">-->
<!--        <li v-for="item in secondData" :key="item.title" @click="goToInfo(item)">-->
<!--          <a href="javascript:void(0);">-->
<!--            <i>-->
<!--              <img v-if="item.photoList" :src="item.photoList[0]">-->
<!--            </i>-->
<!--            <h2>{{ item.title }}</h2>-->
<!--            <span>{{ item.labels[0] }}</span>-->
<!--          </a>-->
<!--        </li>-->
<!--      </div>-->
    </div>
    <div class="blank"></div>

    <!--blogsbox begin-->
    <div class="blogsbox">
      <div
        v-for="item in newRecipeData"
        :key="item.recipe_id"
        class="blogs"
        data-scroll-reveal="enter bottom over 1s"
      >
        <h3 class="blogtitle">
          <a href="javascript:void(0);" @click="goToInfo(item)">{{ item.recipe_name }}</a>
        </h3>

<!--        <span class="blogpic">-->
<!--          <a href="javascript:void(0);" @click="goToInfo(item)" title>-->
<!--            <img v-if="item.photoList" :src="item.photoList[0]" alt>-->
<!--          </a>-->
<!--        </span>-->

<!--        <p class="blogtext">{{ item.summary }}</p>-->
        <div class="bloginfo">
          <ul>

            <li class="author">
              <span class="iconfont">&#xe60f;</span>
              <a href="javascript:void(0);" @click="goToList(item.holder)">{{ item.holder }}</a>
            </li>
            <li class="lmname" v-if="item.tips">
              <span class="iconfont">&#xe603;</span>
              <a
                href="javascript:void(0);"
                @click="goToList(item.tips)"
              >{{ item.tips}}</a>
            </li>
<!--            <li class="view">-->
<!--              <span class="iconfont">&#xe8c7;</span>-->
<!--              <span>{{ item.clickCount }}</span>-->
<!--            </li>-->
<!--            <li class="like">-->
<!--              <span class="iconfont">&#xe663;</span>-->
<!--              {{ item.likeCount }}-->
<!--            </li>-->
<!--            <li class="createTime">-->
<!--              <span class="iconfont">&#xe606;</span>-->
<!--              {{ item.time }}-->
<!--            </li>-->
          </ul>
        </div>
      </div>

      <div class="isEnd">
<!--         <span v-if="!isEnd">正在加载中~</span> -->
        <div class="loadContent" @click="loadContent" v-if="!isEnd&&!loading">点击加载更多</div>

        <div class="lds-css ng-scope" v-if="!isEnd&&loading">
          <div style="width:100%;height:100%" class="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <span v-if="isEnd">我也是有底线的~</span>
      </div>
    </div>
    <!--blogsbox end-->
<!--    删除-->
    <div class="sidebar">
      <!--标签云-->
<!--      <TagCloud></TagCloud>-->

      <!--关注我们-->
<!--      <FollowUs></FollowUs>-->

      <!-- 三级推荐 -->
<!--      <ThirdRecommend></ThirdRecommend>-->

<!--      &lt;!&ndash;四级推荐&ndash;&gt;-->
<!--      <FourthRecommend></FourthRecommend>-->

      <!--点击排行-->
<!--      <HotBlog></HotBlog>-->

    </div>

  </article>
</template>

<script>
import FirstRecommend from '../components/FirstRecommend'
import ThirdRecommend from '../components/ThirdRecommend'
import FourthRecommend from '../components/FourthRecommend'
import TagCloud from '../components/TagCloud'
import HotBlog from '../components/HotBlog'
import FollowUs from '../components/FollowUs'
import Link from '../components/Link'
import {getBlogByLevel, getNewRecipe, recorderVisitPage} from '../api/index'
import {Loading} from 'element-ui'
import {getBlogByUid} from '../api/blogContent'

export default {
  name: 'index',
  components: {
    // 注册组件
    FirstRecommend,
    FourthRecommend,
    ThirdRecommend,
    TagCloud,
    HotBlog,
    FollowUs,
    Link
  },
  data () {
    return {
      loadingInstance: null, // loading对象
      //VUE_MOGU_WEB: process.env.VUE_MOGU_WEB,
      firstData: [], // ；一级推荐数据
      secondData: [], // ；二级级推荐数据
      newRecipeData: [], // 最新文章
      hotBlogData: [], // 最热文章
      hotTagData: [], // 最新标签
      keyword: '',
      currentPage: 1,
      pageSize: 6,
      total: 0, // 总数量
      isEnd: false, // 是否到底底部了
      loading: false // 是否正在加载
    }
  },
  mounted () {
    // 注册scroll事件并监听
    this.loading = false
  },
  created () {
    // 接口：二级推荐博客
    // var secondParams = new URLSearchParams()
    // secondParams.append('level', 2)
    // // 是否排序
    // secondParams.append('useSort', 1)
    // getBlogByLevel(secondParams).then(response => {
    //   if (response.data.code === this.$ECode.SUCCESS) {
    //     this.secondData = response.data.records
    //   }
    // }).catch(error => {
    //   console.log(error)
    //   for (let i = 0; i < 2; ++i) {
    //     this.secondData.push({title: '烩面', labels: '豫菜', photoList: ['../../static/images/huimian.jpeg']})
    //   }
    // })
    // 获取最新博客
    this.newRecipeList()
    // var params = new URLSearchParams()
    // params.append('pageName', 'INDEX')
    // recorderVisitPage(params).then(response => {
    // })
  },
  methods: {
    // 跳转到文章详情【或推广链接】
    goToInfo (recipe) {
      let routeData = this.$router.push({
        path: "/info",
        query: {recipe_id: recipe.recipe_id}
      });
      // if (blog.type === '0') {
      //   let routeData = this.$router.resolve({
      //     path: '/info',
      //     query: {blogOid: blog.oid}
      //   })
      //   window.open(routeData.href, '_blank')
      // } else if (blog.type === '1') {
      //   var params = new URLSearchParams()
      //   params.append('uid', blog.uid)
      //   getBlogByUid(params).then(response => {
      //     // 记录一下用户点击日志
      //   })
      //   window.open(blog.outsideLink, '_blank')
      // }
    },
    // 跳转到搜索详情页
    goToList (keyword) {
      //在当前页面跳转
      this.$router.push({
        path: '/list',
        query: {keyword: keyword}
      })
    },

    // 跳转到搜索详情页
    // goToAuthor (holder) {
    //   this.$router.push({
    //     path: '/list',
    //     query: {holder: holder}
    //   })
    // },

    // 最新博客列表
    newRecipeList () {
      var that = this
      that.loadingInstance = Loading.service({
        lock: true,
        text: '正在努力加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // 接口：博客列表
      var params = new URLSearchParams()
      params.append('page_num', this.currentPage)
      params.append('page_size', this.pageSize)
      getNewRecipe(params).then(response => {
        //this.$commonUtil.message.info(response.data)
        if (response.data.code === this.$ECode.SUCCESS) {
          this.$commonUtil.message.info('success')
          console.log(response.data.obj.recipes)
          that.newRecipeData = response.data.obj.recipes
          // that.total = response.data.total
           //that.pageSize = response.data.size
           that.currentPage = response.data.obj.page_num
        }
        that.loadingInstance.close()
        // eslint-disable-next-line handle-callback-err
      }).catch(error => {
        for (let i = 0; i < 5; ++i) {
          this.newRecipeData.push({recipe_name: 'test', holder: 'ptss', tips: '略略略',recipe_id: '111'})
        }
        that.loadingInstance.close()
      })
    },

    loadContent: function () {
      var that = this
      that.loading = true
      //that.currentPage = that.currentPage + 1
       var params = new URLSearchParams()
      // // 接口：博客列表
       params.append('page_num', that.currentPage)
       params.append('page_size', that.pageSize)
      getNewRecipe(params).then(response => {
        if (response.data.code === this.$ECode.SUCCESS && response.data.obj.recipes.length > 0) {
          this.$commonUtil.message.info('成功')
          that.isEnd = false
          console.log(response.data.obj.recipes)
          var newData = that.newRecipeData.concat(response.data.obj.recipes)
          that.newRecipeData = newData
          // that.total = response.data.total
          // that.pageSize = response.data.size
           that.currentPage = response.data.obj.page_num
          // 全部加载完毕
          // if (newData.length < that.pageSize) {
          //   that.isEnd = true
          // }
          if (response.data.message === "end"){
            that.isEnd = true
          }
        } else {
          that.isEnd = true
         }
        that.loading = false
      }).catch(error => {
        this.$commonUtil.message.info('XXX')
        console.log(error)
        for (let i = 0; i < 5; ++i) {
          this.newRecipeData.push({recipe_name: 'newTest', recipe_id:'1', holder: 'ptss', tips: '略略略', time: '2020-12-2'})
        }
        this.loading = false;
        this.isEnd = false;
      })
    }
  }
}
</script>

<style>
.el-loading-mask {
  z-index: 2002;
}

.isEnd {
  float: left;
  width: 100%;
  height: 80px;
  text-align: center;
}

.ng-scope {
  margin: 0 auto;
  width: 18%;
  height: 10%;
}

.loadContent {
  width: 120px;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
  color: aliceblue;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.8);
}

@keyframes lds-facebook_1 {
  0% {
    top: 0px;
    height: 200px;
  }
  50% {
    top: 80px;
    height: 40px;
  }
  100% {
    top: 80px;
    height: 40px;
  }
}

@-webkit-keyframes lds-facebook_1 {
  0% {
    top: 0px;
    height: 200px;
  }
  50% {
    top: 80px;
    height: 40px;
  }
  100% {
    top: 80px;
    height: 40px;
  }
}

@keyframes lds-facebook_2 {
  0% {
    top: 20px;
    height: 160px;
  }
  50% {
    top: 80px;
    height: 40px;
  }
  100% {
    top: 80px;
    height: 40px;
  }
}

@-webkit-keyframes lds-facebook_2 {
  0% {
    top: 20px;
    height: 160px;
  }
  50% {
    top: 80px;
    height: 40px;
  }
  100% {
    top: 80px;
    height: 40px;
  }
}

@keyframes lds-facebook_3 {
  0% {
    top: 40px;
    height: 120px;
  }
  50% {
    top: 80px;
    height: 40px;
  }
  100% {
    top: 80px;
    height: 40px;
  }
}

@-webkit-keyframes lds-facebook_3 {
  0% {
    top: 40px;
    height: 120px;
  }
  50% {
    top: 80px;
    height: 40px;
  }
  100% {
    top: 80px;
    height: 40px;
  }
}

.lds-facebook {
  position: relative;
}

.lds-facebook div {
  position: absolute;
  width: 20px;
}

.lds-facebook div:nth-child(1) {
  left: 40px;
  background: #1d0e0b;
  -webkit-animation: lds-facebook_1 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation: lds-facebook_1 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}

.lds-facebook div:nth-child(2) {
  left: 90px;
  background: #774023;
  -webkit-animation: lds-facebook_2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation: lds-facebook_2 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  -webkit-animation-delay: -0.1s;
  animation-delay: -0.1s;
}

.lds-facebook div:nth-child(3) {
  left: 140px;
  background: #d88c51;
  -webkit-animation: lds-facebook_3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  animation: lds-facebook_3 1s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.lds-facebook {
  width: 90px !important;
  height: 90px !important;
  -webkit-transform: translate(-45px, -45px) scale(0.45) translate(45px, 45px);
  transform: translate(-45px, -45px) scale(0.45) translate(45px, 45px);
}

.iconfont {
  font-size: 15px;
  margin-right: 2px;
}

</style>
