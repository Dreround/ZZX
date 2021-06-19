import request from '@/utils/request'

export function getCommentList (params) {
  return request({
    url: process.env.WEB_API + 'RecipeDetail/ViewComment',
    method: 'get',
    params
  })
}

export function getHistoryList (params) {
  return request({
    url: process.env.WEB_API + 'PersonalCenter/ViewBrowsingHistory',
    method: 'get',
    params
  })
}

export function getCollectList (params) {
  return request({
    url: process.env.WEB_API + 'PersonalCenter/ViewRecipeCollection',
    method: 'get',
    params
  })
}

export function getCommentListByUser (params) {
  return request({
    url: process.env.WEB_API + 'PersonalCenter/ViewComment',
    method: 'get',
    params
  })
}

export function getHistoryListByUser (params) {
  return request({
    url: process.env.WEB_API + 'PersonalCenter/ViewBrowsingHistory',
    method: 'get',
    params
  })
}
export function getCollectListByUser (params) {
  return request({
    url: process.env.WEB_API + 'PersonalCenter/ViewRecipeCollection',
    method: 'get',
    params
  })
}

export function getFollowListByUser (params) {
  return request({
    url: process.env.WEB_API + '/web/comment/getFollowListByUser',
    method: 'get',
    params
  })
}

export function addHistory (params) {
  return request({
    url: process.env.WEB_API + 'RecipeDetail/AddHistory',
    method: 'post',
    data: params
  })
}

export function addCollect (params) {
  return request({
    url: process.env.WEB_API + '/info/CommentRecipe',
    method: 'post',
    data: params
  })
}

export function addComment (params) {
  return request({
    url: process.env.WEB_API + 'RecipeDetail/CommentRecipe',
    method: 'post',
    data: params
  })
}
export function deleteCollect (params) {
  return request({
    url: process.env.WEB_API + 'RecipeDetail/CancelCollection',
    method: 'post',
    data: params
  })
}

export function deleteHistory (params) {
  return request({
    url: process.env.WEB_API + 'PersonalCenter/DeleteHistory',
    method: 'post',
    data: params
  })
}

export function deleteComment (params) {
  return request({
    url: process.env.WEB_API + 'PersonalCenter/DeleteComment',
    method: 'get',
    params
  })
}
export function reportComment (params) {
  return request({
    url: process.env.WEB_API + '/web/comment/report',
    method: 'post',
    data: params
  })
}
