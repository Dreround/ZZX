<template>
  <blog title="修改菜谱" :is-edit-form="true" :steps=steps :ingredient="ingredient"
        :recipe_id="recipe_id" :recipe_name=recipe_name :tip="tip"></blog>
</template>

<script>
import blog from './blog'

export default {
name: "updateRecipe",
  data() {
    return {
      steps: "",
      recipe_name: "",
      tip: "",
      ingredient: "",
      recipe_id: "",
    };
  },
  created() {
    this.recipe_id = this.$route.query.recipe_id;
    this.steps = this.$route.query.steps;
    this.ingredient = this.$route.query.ingredient;
    this.tip = this.$route.query.tip;
    this.recipe_name = this.$route.query.recipe_name;
  },
  components: {
    blog
  },
}

</script>

<style scoped>

</style>
