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
