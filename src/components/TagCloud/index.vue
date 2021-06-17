<template>
  <div class="cloud" v-if="hotTagData.length > 0">
    <h2 class="hometitle">标签云</h2>
    <ul>
      <a v-for="item in hotTagData" :key="item.uid" href="javascript:void(0);"
         @click="goToList(item.name)">{{ item.name }}</a>
    </ul>
  </div>
</template>

<script>
import {getHotTag} from '../../api/index'

export default {
  name: 'TagCloud',
  data () {
    return {
      hotTagData: [] // 标签列表
    }
  },
  created () {
    getHotTag().then(response => {
      if (response.data.code === this.$ECode.SUCCESS) {
        this.hotTagData = response.data.records
        console.log(this.hotTagData)
      }
    }).catch(error => {
      console.log(error)
      this.hotTagData.push({uid: '1', name: '川菜'})
      this.hotTagData.push({uid: '2', name: '豫菜'})
      this.hotTagData.push({uid: '3', name: '湘菜'})
      this.hotTagData.push({uid: '4', name: '浙菜'})
      this.hotTagData.push({uid: '5', name: '粤菜'})
    })
  },
  methods: {
    // 跳转到搜索详情页
    goToList (tag) {
      let routeData = this.$router.resolve({path: '/list', query: {keyword: tag}})
      window.open(routeData.href, '_blank')
    }
  }
}
</script>
<style>
</style>
