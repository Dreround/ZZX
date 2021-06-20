<template>
  <article>
    <el-dialog :visible.sync="dialogPictureVisible" fullscreen>
      <img :src="dialogImageUrl" alt="dialogImageUrl" style="margin: 0 auto;"/>
    </el-dialog>
    <h1 class="t_nav">
      <a href="/" class="n1">网站首页</a>
      <a href="javascript:void(0);" class="n2">菜谱详情</a>
<!--      <a-->
<!--        href="javascript:void(0);"-->
<!--        v-if="blogData.blogSort"-->
<!--        @click="goToSortList(blogData.blogSort)"-->
<!--        class="n2"-->
<!--      >{{ blogData.blogSort ? blogData.blogSortName : "" }}</a>-->
    </h1>
    <div class="infosbox">
      <div class="newsview">
        <h3 class="news_title" v-if="recipeData.recipe_name">{{ recipeData.recipe_name }}</h3>
<!--        <div class="bloginfo" v-if="recipeData.labels">-->
          <ul>
            <li class="author">
              <span class="iconfont">&#xe60f;</span>
              <a href="javascript:void(0);" @click="goToList(recipeData.holder)">{{ recipeData.holder }}</a>
            </li>
<!--            <li class="lmname">-->
<!--              <span class="iconfont">&#xe603;</span>-->
<!--&lt;!&ndash;              <a&ndash;&gt;-->
<!--&lt;!&ndash;                href="javascript:void(0);"&ndash;&gt;-->
<!--&lt;!&ndash;                @click="goToSortList(blogData.blogSort)"&ndash;&gt;-->
<!--&lt;!&ndash;              >{{ blogData.blogSort ? blogData.blogSort : "" }}</a>&ndash;&gt;-->
<!--            </li>-->
<!--            <li class="createTime">-->
<!--              <span class="iconfont">&#xe606;</span>-->
<!--              {{ blogData.time }}-->
<!--            </li>-->
<!--            <li class="view">-->
<!--              <span class="iconfont">&#xe8c7;</span>-->
<!--              {{ blogData.clickCount }}-->
<!--            </li>-->
<!--            <li class="like">-->
<!--              <span class="iconfont">&#xe663;</span>-->
<!--              {{ blogData.likeCount }}-->
<!--            </li>-->
          </ul>
<!--        </div>-->
<!--        <div class="tags">-->
<!--          <a-->
<!--            v-if="blogData.labels"-->
<!--            v-for="item in blogData.labels"-->
<!--            :key="item"-->
<!--            href="javascript:void(0);"-->
<!--            @click="goToList(item)"-->
<!--            target="_blank"-->
<!--          >{{ item }}</a>-->
<!--        </div>-->
<!--        <div v-if="blogData.need_credit !=0">-->
<!--          <img class="center" :src="lockImageUrl" alt="lock">-->
<!--          <div class="center fit-content">-->
<!--            <el-button type="primary" align="center" @click="payCredit">需要花费 {{blogData.need_credit}} 积分</el-button>-->
<!--          </div>-->
<!--        </div>-->
<!--          <div-->
<!--            v-if="blogData.need_credit ==0"-->
        <el-tabs>
          <el-tab-pane label="食材">
          <div class="news_con ck-content"
               v-html="recipeData.recipe_ingredient"
               v-highlight
               @click="imageChange"
          >{{ recipeData.recipe_ingredient }}
          </div>
          </el-tab-pane>
          <el-tab-pane label="步骤">
            <div class="news_con ck-content"
                 v-html="recipeData.recipe_steps"
                 v-highlight
                 @click="imageChange"
            ></div>
          </el-tab-pane>
          <el-tab-pane label="小贴士">
            <div class="news_con ck-content"
                 v-html="recipeData.recipe_tips"
                 v-highlight
                 @click="imageChange"
            ></div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-popover placement="right" trigger="hover" v-if="recipeData.image">
        <img :src="recipeData.image" style="width: 500px;height: 300px">
        <img slot="reference" :src="recipeData.image" style="width: 600px;height: 400px">
      </el-popover>
      <!--点赞和收藏和举报-->
      <Collect v-if="openAdmiration === '1' & this.$store.state.user.isLogin" :recipe_id="recipe_id"
                       ></Collect>
      <div class="news_pl" :style="openCommentCss">
        <h2>文章评论</h2>
        <ul>
          <CommentBox
            :userInfo="userInfo"
            :commentInfo="commentInfo"
            @submit-box="submitBox"
            :showCancel="showCancel"
            v-if="openComment === 'z'"
          ></CommentBox>
          <div class="message_infos">
            <CommentList :comments="comments" :commentInfo="commentInfo"></CommentList>
            <div class="noComment" v-if="comments.length ===0">还没有评论，快来抢沙发吧！</div>
          </div>
        </ul>
      </div>
    </div>
    <div class="sidebar2" v-if="showSidebar">
      <side-catalog
        :class="vueCategory"
        v-bind="catalogProps"
      >
      </side-catalog>
    </div>
  </article>
</template>

<script>
import {delCookie, getCookie, setCookie} from '@/utils/cookieUtils'
import {getWebConfig} from '../api/index'
import {getRecipeById, payCreditByUid} from '../api/blogContent'
import CommentList from '../components/CommentList'
import CommentBox from '../components/CommentBox'
// vuex中有mapState方法，相当于我们能够使用它的getset方法
import {mapMutations} from 'vuex'
import ThirdRecommend from '../components/ThirdRecommend'
import FourthRecommend from '../components/FourthRecommend'
import TagCloud from '../components/TagCloud'
import HotBlog from '../components/HotBlog'
import FollowUs from '../components/FollowUs'
import Link from '../components/Link'
import {addComment, addHistory, getCommentList} from '../api/comment'
import {Loading} from 'element-ui'
import Sticky from '@/components/Sticky'
import SideCatalog from '@/components/VueSideCatalog'
import Collect from '../components/Collect/index'
import {authVerify} from '../api/user'

export default {
  name: 'info',
  data () {
    return {
      // 目录列表数
      lockImageUrl: '../static/images/lock.png',
      catalogSum: 0,
      showStickyTop: false,
      showSideCatalog: true,
      showSidebar: true, // 是否显示侧边栏
      catalogProps: {
        // 内容容器selector(必需)
        container: '.ck-content',
        watch: true,
        levelList: ['h2', 'h3']
      },
      isEnd: false,
      loadingInstance: null, // loading对象
      showCancel: false,
      submitting: false,
      comments: [],
      commentInfo: {
        recipe_id: ''
      },
      currentPage: 1,
      pageSize: 5,
      total: 0, // 总数量
      toInfo: {},
      userInfo: {},
      recipe_id: null, // 传递过来的菜谱uid
      // blogOid: 0, // 传递过来的博客oid
      // blogId: 0,
      recipeData: {},
      canShow: '',
      dialogPictureVisible: false,
      dialogImageUrl: '',
      openComment: 'z', // 开启评论
      openAdmiration: '1' // 开启赞赏
    }
  },
  computed: {
    vueCategory: function () {
      if (!this.showStickyTop && this.showSideCatalog) {
        return 'catalog'
      }
      if (!this.showStickyTop && !this.showSideCatalog) {
        return 'catalog'
      }
      if (this.showStickyTop && this.showSideCatalog) {
        return 'catalog3'
      }
      if (this.showStickyTop && !this.showSideCatalog) {
        return 'catalog2'
      }
    },
    openCommentCss: function () {
      if (this.openComment === 'z') {
        return {
          'min-height': '10px'
        }
      }
    }
  },
  components: {
    // 注册组件
    Collect,
    FourthRecommend,
    ThirdRecommend,
    TagCloud,
    HotBlog,
    FollowUs,
    CommentList,
    CommentBox,
    SideCatalog,
    Link,
    Sticky
  },
  mounted () {
    this.getToken()
    this.openComment = this.$store.state.user.userInfo.mute
    //this.openComment = '1'
    this.recipe_id = this.$route.query.recipe_id
    var that = this
    var params = new URLSearchParams()
    params.append('recipe_id', this.recipe_id)
    getRecipeById(params).then(response => {
      if (response.data.code === this.$ECode.SUCCESS) {
        //this.$commonUtil.message.info(response.data.message)
        //this.recipeData = response.data.obj
        console.log(this.recipeData)
        this.recipeData.recipe_steps = response.data.obj.steps
        this.recipeData.recipe_ingredient = response.data.obj.ingredient
        this.recipeData.recipe_tips = response.data.obj.tip
        this.recipeData.holder = response.data.obj.holder
        this.recipeData.recipe_name = response.data.obj.recipe_name
        this.recipeData.image = response.data.obj.image
        //this.getCommentDataList()
      }
      setTimeout(() => {
        that.recipeData.recipe_steps = response.data.obj.steps
        that.recipeData.recipe_ingredient = response.data.obj.ingredient
        that.recipeData.recipe_tips = response.data.obj.tip
        that.recipeData.holder = response.data.obj.holder
        that.loadingInstance.close()
      }, 20)
    }).catch(error => {
      console.log(error)
      // this.blogData.labels = ['技术', '大数据']
      // this.blogData.blogSort = '技术'
      this.recipeData.recipe_ingredient = 'This is a recipe ingredient'
      this.recipeData.recipe_steps = 'this is a recipe step'
      this.recipeData.recipe_tips = 'this is a recipe tip'
      this.recipeData.recipe_name = 'test'
      this.recipeData.holder = 'ptss'
      this.getCommentDataList()
      that.loadingInstance.close()
    })

    var after = 0
    var offset = 110
    // eslint-disable-next-line no-undef
    $(window).scroll(function () {
      // eslint-disable-next-line no-undef
      let docHeight = $(document).height() // 获取整个页面的高度(不只是窗口,还包括为显示的页面)
      // eslint-disable-next-line no-undef
      let winHeight = $(window).height() // 获取当前窗体的高度(显示的高度)
      // eslint-disable-next-line no-undef
      let winScrollHeight = $(window).scrollTop() // 获取滚动条滚动的距离(移动距离)

      if (winScrollHeight < offset) {
        that.showStickyTop = false
      } else {
        that.showStickyTop = true
      }

      if (winScrollHeight > after) {
        // console.log("隐藏顶部栏", winScrollHeight)
        that.showSideCatalog = true
      } else {
        // console.log("显示顶部栏", winScrollHeight)
        that.showSideCatalog = false
      }
      after = winScrollHeight
      // 还有30像素的时候,就查询
      if (docHeight === winHeight + winScrollHeight) {
        if (that.isEnd) {
          console.log('已经到底了')
          return
        }
        let params = {}
        params.recipe_id = that.recipe_id
        params.page_num = that.currentPage
        params.page_size = that.pageSize
        getCommentList(params).then(response => {
          if (response.data.code === that.$ECode.SUCCESS) {
            that.comments = that.comments.concat(response.data.obj.comments)
            that.currentPage = response.data.obj.page_num
            //that.pageSize = response.data.size
            if(response.data.message === 'end'){
              that.isEnd = true
            }
            //that.total = response.data.total
          }
        }).catch(error => {
          console.log(error)
          this.comments = [{ user: {user_name: 'ptss', user_id: '2'}, content: '我怀疑你在ghs'}]
        })
      }
    })

    // 屏幕自适应
    window.onresize = () => {
      return (() => {
        // 屏幕大于950px的时候，显示侧边栏
        that.showSidebar = document.body.clientWidth > 950
      })()
    }
  },
  created () {
    this.loadingInstance = Loading.service({
      fullscreen: true,
      text: '正在努力加载中~'
    })
    //this.getToken()
    //this.$store.state.user.userInfo.user_id = '1'
    this.userInfo = this.$store.state.user.userInfo
    //this.$commonUtil.message.info(this.$store.state.user.userInfo)
    this.recipe_id = this.$route.query.recipe_id
    this.commentInfo.recipe_id = this.recipe_id
    //this.$commonUtil.message.info(this.recipe_id)
    var history = {}
    history.user_id = this.userInfo.user_id
    history.recipe_id = this.recipe_id
    addHistory(history).then(response => {
      if (response.data.code === this.$ECode.SUCCESS) {
        //this.$commonUtil.message.info(response.data.message)
        //this.$commonUtil.message.info('www')
      }
    }).catch(error => {
      console.log(error)
      //this.$commonUtil.message.info('sss')
    })
    console.log(this.$route.query.recipe_id)
    //this.setCommentAndAdmiration()
    // 屏幕大于950px的时候，显示侧边栏
    this.showSidebar = document.body.clientWidth > 950
  },
  methods: {
    // 拿到vuex中的写的两个方法
    ...mapMutations(['setCommentList', 'setWebConfigData']),
    handleCurrentChange: function (val) {
      this.currentPage = val
      this.getCommentDataList()
    },
    getUrlVars: function () {
      var vars = {}
      // eslint-disable-next-line no-unused-vars
      var parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&#]*)/gi,
        function (m, key, value) {
          vars[key] = value
        }
      )
      return vars
    },
    getToken: function () {
      let token = this.getUrlVars()['token']
      let pwd = this.getUrlVars()['pwd']
      // 判断url中是否含有token
      if (token != undefined) {
        // 设置token七天过期
        setCookie('token', token, 7)
        setCookie('pwd', pwd, 7)
      } else {
        // 从cookie中获取token
        token = getCookie('token')
        pwd = getCookie('pwd')
      }
      console.log('token:------------' + token)
      if (token != undefined && token != null) {
        console.log('this issssssssssssssssssssssssss')
        console.log(token)
        var params = new URLSearchParams()
        params.append('user_name', token)
        params.append('password',pwd)
        authVerify(params).then(response => {
          if (response.data.code == this.$ECode.SUCCESS) {
            this.isLogin = true
            this.userInfo = response.data.obj
            console.log(this.userInfo)
            this.setUserInfo(this.userInfo)
            this.setLoginState(this.isLogin)
          } else {
            delCookie('token')
          }
        }).catch(error => {
          this.userInfo.role = 1
          this.userInfo.reputation = 5
        })
      }
    },
    // 设置是否开启评论和赞赏
    // setCommentAndAdmiration () {
    //   let webConfigData = this.$store.state.app.webConfigData
    //   if (webConfigData.createTime) {
    //     this.openAdmiration = webConfigData.openAdmiration
    //     this.openComment = webConfigData.openComment
    //   } else {
    //     getWebConfig().then(response => {
    //       if (response.data.code === this.$ECode.SUCCESS) {
    //         webConfigData = response.data
    //         // 存储在Vuex中
    //         this.setWebConfigData(response.data)
    //         this.openAdmiration = webConfigData.openAdmiration
    //         this.openComment = webConfigData.openComment
    //       }
    //     })
    //   }
    // },
    // payCredit () {
    //   var params = new URLSearchParams()
    //   params.append('blog_id', this.blogUid)
    //   payCreditByUid(params).then(response => {
    //     if (response.data.code === this.$ECode.SUCCESS) {
    //       this.blogData.need_credit = 0
    //     } else {
    //       this.$commonUtil.message.error(response.data.message)
    //     }
    //   })
    // },
    submitBox (e) {
      this.$commonUtil.message.info('添加评论')
      let params = {}
      params.recipe_id = e.recipe_id
      params.user_id = e.user_id
      params.content = e.content
      params.type = 'p'
      params.message_id = ''
      params.user_name = e.user_name
      //this.$commonUtil.message.info(params)
      console.log(params)
      addComment(params).then(response => {
        if (response.data.code === this.$ECode.SUCCESS) {
          this.$notify({
            title: '成功',
            message: '发表成功~',
            type: 'success',
            offset: 100
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: response.data.message,
            offset: 100
          })
        }
        this.comments = []
        this.currentPage = 1
        this.isEnd = false
        this.getCommentDataList()
      })
    },
    getCommentDataList: function () {
      let params = {}
      // params.source = this.commentInfo.source
      params.recipe_id = this.recipe_id
      console.log(params.recipe_id)
      params.page_num = this.currentPage
      params.page_size = this.pageSize
      getCommentList(params).then(response => {
        if (response.data.code === this.$ECode.SUCCESS) {
          this.comments = response.data.obj.comments
          //console.log(this.comments)
          this.setCommentList(this.comments)
          //this.currentPage = response.data.current
          //this.pageSize = response.data.size
          if(response.data.message === 'end'){
            this.isEnd = true
          }
          //this.total = response.data.total
        }
      }).catch(error => {
        this.comments = [{recipe_id: '1', user_name: 'ptss', user_id: '2', content: '我怀疑你在ghs', message_id:'1'}]
        this.isEnd = true
      })
    },
    // 跳转到搜索详情页
    goToList (holder) {
      let routeData = this.$router.push({
        path: '/list',
        query: {keyword: holder}
      });
      //window.open(routeData.href, '_blank')
    },
    // 跳转到搜索详情页
    // goToSortList (uid) {
    //   let routeData = this.$router.resolve({
    //     path: '/list',
    //     query: {sortUid: uid}
    //   })
    //   window.open(routeData.href, '_blank')
    // },
    // 跳转到搜索详情页
    // goToAuthor (author) {
    //   let routeData = this.$router.resolve({
    //     path: '/list',
    //     query: {author: author}
    //   })
    //   window.open(routeData.href, '_blank')
    // },

    imageChange: function (e) {
      // 首先需要判断点击的是否是图片
      var type = e.target.localName
      if (type === 'img') {
        // window.open(e.target.currentSrc);
        this.dialogPictureVisible = true
        this.dialogImageUrl = e.target.currentSrc
      }
    },
    // 切割字符串
    subText: function (str, index) {
      if (str.length < index) {
        return str
      }
      return str.substring(0, index) + '...'
    }
  }
}
</script>

<style>
.emoji-panel-wrap {
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background-color: #ffffff;
  width: 470px;
  height: 190px;
  position: absolute;
  z-index: 999;
  left: 35px;
  top: 10px;
}

.emoji-size-small {
  zoom: 0.3;
  margin: 5px;
  vertical-align: middle;
}

.emoji-size-large {
  zoom: 0.5;
/ / emojipanel表情大小 margin: 5 px;
}

.iconfont {
  font-size: 14px;
  margin-right: 3px;
}

.message_infos {
  width: 96%;
  margin-left: 10px;
}

.noComment {
  width: 100%;
  text-align: center;
}

.catalog {
  position: fixed;
  margin-left: 20px;
  /*max-height: 700px*/
}

.catalog2 {
  position: fixed;
  margin-left: 20px;
  top: 70px;
}

.catalog3 {
  position: fixed;
  margin-left: 20px;
  top: 20px;
}

.line-style {
  display: inline-block;
  height: 20px;
  width: 3px;
  background: transparent;
}

.line-style--active {
  background: currentColor;
}

.fit-content{
  width: fit-content;
}
.center{
  margin: auto;
}
</style>
