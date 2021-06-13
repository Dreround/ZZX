<template>
  <blog title="修改菜谱" :is-edit="true"></blog>
</template>

<script>
import blog from './blog'

export default {
name: "updateRecipe",
  data() {
    return {
      steps: "",
      recipe_name: "",
      tips: "",
      ingredient: "",
      recipe_id: "",
    };
  },
  created() {
    this.recipe_id = this.$route.query.recipe_id;
  },
  components: {
    blog
  },
}

</script>

<style scoped>

</style>
