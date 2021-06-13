import request from '@/utils/request'

export function getMyRecipe (params) {
  return request({
    url: process.env.WEB_API + '/sort/getMyRecipe',
    method: 'get',
    params
  })
}

// export function getArticleBySort (params) {
//   return request({
//     url: process.env.WEB_API + '/sort/getArticleBySort',
//     method: 'get',
//     params
//   })
// }
