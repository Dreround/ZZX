<template>
  <blog title="修改菜谱" :is-edit="true" :steps=steps :ingredient="ingredient"
        :recipe_id="recipe_id" :recipe_name=recipe_name :tips="tips"></blog>
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
    this.steps = this.$route.query.steps;
    this.ingredient = this.$route.query.ingredient;
    this.tips = this.$route.query.tips;
    this.recipe_name = this.$route.query.recipe_name;
  },
  components: {
    blog
  },
}

</script>

<style scoped>

</style>
