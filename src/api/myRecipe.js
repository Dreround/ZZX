import request from '@/utils/request'

export function getMyRecipe (params) {
  return request({
    url: process.env.WEB_API + 'PersonalRecipeManage/ViewRecipe',
    method: 'get',
    params
  })
}

export function deleteMyRecipe (params) {
  return request({
    url: process.env.WEB_API + 'PersonalRecipeManage/DeleteRecipe',
    method: 'get',
    params
  })
}

export function getRecipeById (params) {
  return request({
    url: process.env.WEB_API + '/personalRecipeManage/getRecipeById',
    method: 'post',
    params
  })
}
