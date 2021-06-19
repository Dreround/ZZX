import request from '@/utils/request'

export function getFreezeList () {
  return request({
    url: process.env.WEB_API + 'Administrator/UserManage',
    method: 'get'
  })
}
export function getMuteList () {
  return request({
    url: process.env.WEB_API + 'Administrator/UserManage',
    method: 'get'
  })
}
export function getRecipeList () {
  return request({
    url: process.env.WEB_API + 'Administrator/RecipeManage',
    method: 'get'
  })
}
export function workReport (params) {
  return request({
    url: process.env.WEB_API + '/admin/workReport',
    method: 'post',
    data: params
  })
}
export function FreezeUser (params) {
  return request({
    url: process.env.WEB_API + 'Administrator/UserManage/FreezeUser',
    method: 'post',
    data: params
  })
}
export function UnfreezeUser (params) {
  return request({
    url: process.env.WEB_API + 'Administrator/UserManage/UnfreezeUser',
    method: 'post',
    data: params
  })
}
export function MuteUser (params) {
  return request({
    url: process.env.WEB_API + 'Administrator/UserManage/MuteUser',
    method: 'post',
    data: params
  })
}
export function UnmuteUser (params) {
  return request({
    url: process.env.WEB_API + 'Administrator/UserManage/UnmuteUser',
    method: 'post',
    data: params
  })
}

export function RecommendRecipe (params) {
  return request({
    url: process.env.WEB_API + 'Administrator/RecipeManage/RecommendRecipe',
    method: 'post',
    data: params
  })
}
