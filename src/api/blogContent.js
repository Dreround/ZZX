import request from '@/utils/request'

export function payCreditByUid (params) {
  return request({
    url: process.env.WEB_API + '/web/comment/payCreditByUid',
    method: 'get',
    params
  })
}

export function getRecipeById (params) {
  return request({
    url: process.env.WEB_API + 'HomePage/SearchById',
    method: 'get',
    params
  })
}

export function CollectRecipe (params) {
  return request({
    url: process.env.WEB_API + 'RecipeDetail/CollectRecipe',
    method: 'post',
    data: params
  })
}
export function reportBlog (params) {
  return request({
    url: process.env.WEB_API + '/api/reportBlog',
    method: 'get',
    params
  })
}

export function getSameBlogByTagUid (params) {
  return request({
    url: process.env.WEB_API + '/api/getSameBlogByTagUid',
    method: 'get',
    params
  })
}

export function getSameBlogByBlogUid (params) {
  return request({
    url: process.env.WEB_API + '/api/getSameBlogByBlogUid',
    method: 'get',
    params
  })
}

export function getCollect (params) {
  return request({
    url: process.env.WEB_API + 'RecipeDetail/isDuplicate',
    method: 'post',
    data: params
  })
}

export function getBlogPraiseCountByUid (params) {
  return request({
    url: process.env.WEB_API + '/api/getBlogPraiseCountByUid',
    method: 'get',
    params
  })
}

export function getFollowedByUid (params) {
  return request({
    url: process.env.WEB_API + '/api/getFollowedByUid',
    method: 'get',
    params
  })
}

export function followByUid (params) {
  return request({
    url: process.env.WEB_API + '/api/FollowByUid',
    method: 'get',
    params
  })
}
