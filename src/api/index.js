import request from '@/utils/request'

export function getRecipeByLevel () {
  return request({
    url: process.env.WEB_API + 'HomePage/getRecipeByLevel',
    method: 'get'
  })
}

export function getNewRecipe () {
  return request({
    url: process.env.WEB_API + 'HomePage/BrowseRecipe',
    method: 'get'
  })
}

export function getBlogByTime (params) {
  return request({
    url: process.env.WEB_API + '/index/getBlogByTime',
    method: 'get',
    params
  })
}

export function getHotBlog (params) {
  return request({
    url: process.env.WEB_API + '/index/getHotBlog',
    method: 'get',
    params
  })
}

export function getHotTag (params) {
  return request({
    url: process.env.WEB_API + '/index/getHotTag',
    method: 'get',
    params
  })
}

export function getLink (params) {
  return request({
    url: process.env.WEB_API + '/index/getLink',
    method: 'get',
    params
  })
}

export function addLinkCount (params) {
  return request({
    url: process.env.WEB_API + '/index/addLinkCount',
    method: 'get',
    params
  })
}

export function getWebConfig (params) {
  return request({
    url: process.env.WEB_API + '/index/getWebConfig',
    method: 'get',
    params
  })
}

export function recorderVisitPage (params) {
  return request({
    url: process.env.WEB_API + '/index/recorderVisitPage',
    method: 'get',
    params
  })
}
