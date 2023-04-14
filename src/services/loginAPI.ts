import { request } from '@/utils/request'
import type { CodeType, UserInfo } from '@/types/userInfo'

// 密码登录
export const loginByPwAPI = (mobile: string, password: string) =>
  request<UserInfo>('/login/password', 'post', { mobile, password })

// 获取验证码
// 在{}内需要return ,否则返回值是undefined
export const getCodeAPI = (mobile: string, type: CodeType) => {
  return request<{ code: string }>('/code', 'get', { mobile, type })
}

// 验证码登录
export const loginByCodeAPI = (mobile: string, code: string) => {
  return request<UserInfo>('/login', 'post', { mobile, code })
}

// qq登录
export const loginByQQAPI = (data: {
  openId: string
  source: string
  nickname?: string
  avatar?: string
}) => {
  return request<UserInfo>('/login/thirdparty', 'post', data)
}

// 三方登录绑定手机号
export const bindPhoneAPI = (data: { mobile: string; code: string; openId: string }) => {
  return request<UserInfo>('/login/binding', 'post', data)
}

// 解除绑定手机号
export const unBindPhoneAPI = (userInfo: string) => {
  return request<{}>(`/unbound/{${userInfo}`, 'put')
}
