import request from '@/utils/request'

export function getMyRecipe (params) {
  return request({
    url: process.env.WEB_API + '/personalRecipeManage/viewRecipe',
    method: 'post',
    params
  })
}

export function deleteMyRecipe (params) {
  return request({
    url: process.env.WEB_API + '/personalRecipeManage/deleteRecipe',
    method: 'post',
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
