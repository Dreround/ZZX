import request from '@/utils/request'
export function authVerify (params) {
  return request({
    url: process.env.WEB_API + 'HomePage/Login',
    method: 'get',
    params
  })
}
export function getFeedbackList(params) {
  return request({
    url: process.env.WEB_API + '/oauth/getFeedbackList',
    method: 'get',
    params
  })
}
/**
 * 本地登录
 * @param params
 */
export function localLogin (params) {
  return request({
    url: process.env.WEB_API + 'HomePage/Login',
    method: 'get',
    params
  })
}

/**
 * 本地注册
 * @param params
 */
export function localRegister (params) {
  return request({
    url: process.env.WEB_API + 'HomePage/Register',
    method: 'post',
    data: params
  })
}

export function deleteUserAccessToken(params) {
  return request({
    url: process.env.WEB_API + 'oauth/delete/' + params,
    method: 'post',
  })
}

export function logout (params) {
  return request({
    url: process.env.WEB_API + 'user/logout',
    method: 'post',
    data: params
  })
}

// 修改密码
export function pwdUpd (params) {
  return request({
    url: 'user/pwdupd',
    method: 'post',
    data: params
  })
}

// 修改用户名
export function changeName (params) {
  return request({
    url: 'user/changename',
    method: 'post',
    data: params
  })
}
