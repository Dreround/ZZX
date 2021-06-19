<template>
  <div>
    <div class="pagebg sh"></div>
    <div class="container">
      <h1 class="t_nav">
        <span>慢生活，不是懒惰，放慢速度不是拖延时间，而是让我们在生活中寻找到平衡。</span>
        <a href="/" class="n1">网站首页</a>
        <a href="/" class="n2">搜索</a>
      </h1>

      <!--blogsbox begin-->
      <div class="blogsbox">
        <div
          v-for="item in RecipeData"
          :key="item.recipe_id"
          class="blogs"
          data-scroll-reveal="enter bottom over 1s"
        >
          <h3 class="blogtitle">
            <a
              href="javascript:void(0);"
              @click="goToInfo(item.recipe_id)"
              v-html="item.recipe_name"
            >{{item.recipe_name}}</a>
          </h3>
<!--          <span class="blogpic">-->
<!--            <a href="javascript:void(0);" @click="goToInfo(item.recipe_id?item.recipe_id:item.recipe_id)" title>-->
<!--              <img v-if="item.photoUrl" :src="item.photoUrl" alt="">-->
<!--            </a>-->
<!--          </span>-->
          <p class="blogtext" v-html="item.tips">{{item.tips}}</p>
          <div class="bloginfo">
            <ul>
              <li class="author">
                <span class="iconfont">&#xe60f;</span>
                <a href="javascript:void(0);" @click="goToList(item.holder)">{{item.holder}}</a>
              </li>
<!--              <li class="lmname" v-if="item.blogSortName">-->
<!--                <span class="iconfont">&#xe603;</span>-->
<!--                <a href="javascript:void(0);" @click="goToList(item.blogSortUid)">{{item.blogSortName}}</a>-->
<!--              </li>-->
<!--              <li class="createTime"><span class="iconfont">&#xe606;</span>{{item.createTime}}</li>-->
            </ul>
          </div>
        </div>

        <div class="isEnd">
          <div
            class="loadContent"
            @click="loadContent"
            v-if="!isEnd && !loading && totalPages>0"
          >点击加载更多</div>

          <div class="lds-css ng-scope" v-if="!isEnd && loading">
            <div style="width:100%;height:100%" class="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <span v-if="RecipeData.length >= 0 && isEnd &&!loading && totalPages>0">我也是有底线的~</span>

          <span v-if="totalPages == 0 && !loading">空空如也~</span>
        </div>
      </div>
      <!--blogsbox end-->

      <div class="sidebar">
        <!-- 三级推荐 -->
<!--        <ThirdRecommend></ThirdRecommend>-->

<!--        &lt;!&ndash;标签云&ndash;&gt;-->
<!--        <TagCloud></TagCloud>-->

<!--        &lt;!&ndash;四级推荐&ndash;&gt;-->
<!--        <FourthRecommend></FourthRecommend>-->

<!--        &lt;!&ndash;点击排行&ndash;&gt;-->
<!--        <HotBlog></HotBlog>-->

<!--        <Link></Link>-->

<!--        &lt;!&ndash;关注我们&ndash;&gt;-->
<!--        <FollowUs></FollowUs>-->
      </div>
    </div>
  </div>
</template>

<script>

import ThirdRecommend from "../components/ThirdRecommend";
import FourthRecommend from "../components/FourthRecommend";
import TagCloud from "../components/TagCloud";
import HotBlog from "../components/HotBlog";
import FollowUs from "../components/FollowUs";
import {
  searchRecipe,
  searchBlogByTag,
  searchBlogBySort,
  searchBlogByAuthor
} from "../api/search";

export default {
  name: "list",
  data() {
    return {
      RecipeData: [],
      keywords: "",
      //holder: "",
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      total: 0, //总数量
      tagUid: "",
      searchRecipeData: [], //搜索出来的文章
      sortUid: "",
      isEnd: false, //是否到底底部了
      loading: false //内容是否正在加载
    };
  },
  components: {
    FourthRecommend,
    ThirdRecommend,
    TagCloud,
    HotBlog,
    FollowUs,
  },
  created() {
    this.keywords = this.$route.query.keyword;
    // this.tagUid = this.$route.query.tagUid;
    // this.sortUid = this.$route.query.sortUid;
    this.holder = this.$route.query.holder;

    if (
       this.keywords == undefined
      // this.tagUid == undefined &&
      // this.sortUid == undefined &&
      // this.author == undefined
    ) {
      return;
    }

    this.search();
  },
  mounted() {
    // 注册scroll事件并监听
    // var that = this;
    // window.addEventListener("scroll", function() {
    //   let scrollTop = document.documentElement.scrollTop; //当前的的位置
    //   let scrollHeight = document.documentElement.scrollHeight; //最高的位置
    //   if (scrollTop >= 0.6 * scrollHeight && !that.isEnd && !that.loading) {
    //     that.loading = true;
    //     that.currentPage = that.currentPage + 1;
    //     that.search();
    //   }
    // });
  },
  watch: {
    $route(to, from) {
      this.keywords = this.$route.query.keyword;
      //this.tagUid = this.$route.query.tagUid;
      //this.sortUid = this.$route.query.sortUid;
      this.searchRecipeData = [] // 清空查询出来的博客
      this.search();
    }
  },
  methods: {
    //跳转到文章详情
    goToInfo(recipe_id) {
      let routeData = this.$router.push({
        path: "/info",
        query: { recipe_id: recipe_id }
      });
      //window.open(routeData.href, '_blank');
    },
    //点击了作者
    goToList(holder) {
      let routeData = this.$router.push({
        path: "/list",
        query: { keyword: holder }
      });
      //window.open(routeData.href, '_blank');
    },
    // goToAuthor(author) {
    //   let routeData = this.$router.resolve({
    //     path: "/list",
    //     query: {holder: holder}
    //   });
    //   window.open(routeData.href, '_blank');
    // },
    // 加载内容
    loadContent: function() {
      var that = this;
      that.currentPage = that.currentPage + 1;
      that.search();
    },
    search: function() {
      var that = this;

      that.loading = true;

      if (this.keywords != undefined) {
        var params = new URLSearchParams();
        //params.append("currentPage", that.currentPage);
        //params.append("pageSize", that.pageSize);
        params.append("name", that.keywords);
        searchRecipe(params).then(response => {
          if (response.data.code == this.$ECode.SUCCESS) {
            //that.isEnd = false;
            //获取总页数
            //that.totalPages = response.data.length;
            //that.total = response.data.total;
            //that.pageSize = response.data.pageSize;
            //that.currentPage = response.data.currentPage;
            var RecipeData = response.data.obj;

            // 判断搜索的博客是否有内容
            if(response.data.total <= 0) {
              that.isEnd = true;
              that.loading = false;
              this.RecipeData = []
              return;
            }

            //全部加载完毕
            if (RecipeData.length < that.pageSize) {
              that.isEnd = true;
            }

            RecipeData = that.searchRecipeData.concat(RecipeData);
            that.searchRecipeData = RecipeData;
            this.RecipeData = RecipeData;
          } else {
            that.isEnd = true;
          }
          that.loading = false;
        }).catch(error => {
              console.log(error)
              for (let i = 0; i < 5; ++i) {
                this.RecipeData.push({recipe_name: this.keywords, recipe_id:'1', holder: 'ptss', tips: '略略略', time: '2020-12-2'})
              }
              //this.totalPages = this.RecipeData.length;
              //this.loading = false;
              //this.isEnd = false;
            });
      // } else if (this.tagUid != undefined) {
      //   var params = new URLSearchParams();
      //
      //   params.append("tagUid", that.tagUid);
      //   params.append("currentPage", that.currentPage);
      //   params.append("pageSize", that.pageSize);
      //
      //   searchBlogByTag(params).then(response => {
      //     if (response.code == this.$ECode.SUCCESS && response.data.records.length > 0) {
      //       that.isEnd = false;
      //       //获取总页数
      //       that.totalPages = response.data.total;
      //
      //       var RecipeData = response.data.records;
      //       that.total = response.data.total;
      //       that.pageSize = response.data.size;
      //       that.currentPage = response.data.current;
      //
      //       //全部加载完毕
      //       if (RecipeData.length < that.pageSize) {
      //         that.isEnd = true;
      //       }
      //
      //       // 设置分类名
      //       for (var i = 0; i < RecipeData.length; i++) {
      //         RecipeData[i].blogSort = RecipeData[i].blogSort.sortName;
      //       }
      //
      //       RecipeData = that.searchRecipeData.concat(RecipeData);
      //       that.searchRecipeData = RecipeData;
      //       this.RecipeData = RecipeData;
      //       that.loading = false;
      //
      //     } else {
      //
      //       that.isEnd = true;
      //       that.loading = false;
      //     }
      //   });
      // } else if (this.sortUid != undefined) {
      //   var params = new URLSearchParams();
      //
      //   params.append("blogSortUid", that.sortUid);
      //   params.append("currentPage", that.currentPage);
      //   params.append("pageSize", that.pageSize);
      //
      //   searchBlogBySort(params).then(response => {
      //     if (response.code == this.$ECode.SUCCESS && response.data.records.length > 0) {
      //       that.isEnd = false;
      //       //获取总页数
      //       that.totalPages = response.data.total;
      //
      //       var RecipeData = response.data.records;
      //       that.total = response.data.total;
      //       that.pageSize = response.data.size;
      //       that.currentPage = response.data.current;
      //
      //       //全部加载完毕
      //       if (RecipeData.length < that.pageSize) {
      //         that.isEnd = true;
      //       }
      //
      //       for (var i = 0; i < RecipeData.length; i++) {
      //         RecipeData[i].blogSort = RecipeData[i].blogSort.sortName;
      //       }
      //
      //       RecipeData = that.searchRecipeData.concat(RecipeData);
      //       that.searchRecipeData = RecipeData;
      //       this.RecipeData = RecipeData;
      //       that.loading = false;
      //     } else {
      //
      //
      //       that.isEnd = true;
      //       that.loading = false;
      //     }
      //   });
      // } else if (this.author != undefined) {
      //   var params = new URLSearchParams();
      //   params.append("author", that.author);
      //   params.append("currentPage", that.currentPage);
      //   params.append("pageSize", that.pageSize);
      //   searchBlogByAuthor(params).then(response => {
      //     if (response.code == this.$ECode.SUCCESS && response.data.records.length > 0) {
      //       that.loading = false;
      //
      //       that.isEnd = false;
      //
      //       //获取总页数
      //       that.totalPages = response.data.total;
      //
      //       var RecipeData = response.data.records;
      //       that.total = response.data.total;
      //       that.pageSize = response.data.size;
      //       that.currentPage = response.data.current;
      //
      //       //全部加载完毕
      //       if (RecipeData.length < that.pageSize) {
      //         that.isEnd = true;
      //       }
      //
      //       for (var i = 0; i < RecipeData.length; i++) {
      //         if (RecipeData[i].blogSort == undefined) {
      //           RecipeData[i].blogSort = "未分类";
      //         } else {
      //           RecipeData[i].blogSort = RecipeData[i].blogSort.sortName;
      //         }
      //       }
      //
      //       RecipeData = that.searchRecipeData.concat(RecipeData);
      //       that.searchRecipeData = RecipeData;
      //       this.RecipeData = RecipeData;
      //       that.loading = false;
      //     } else {
      //
      //       that.isEnd = true;
      //       that.loading = false;
      //     }
      //   });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

<style>
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
</style>

