import type { UserInfoDetail } from '@/types/userInfo'
import { request } from '@/utils/request'

// 获取个人用户信息 用于我的页面显示用户信息
export const getUserDetailInfoAPI = () => {
  return request<UserInfoDetail>('/patient/myUser')
}

// 消息通知-所有未读数量
export const getNotificationAPI = () => {
  return request<number>('/patient/message/unRead/all')
}
