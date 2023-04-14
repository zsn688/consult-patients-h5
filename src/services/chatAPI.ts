import { request } from '@/utils/request'
import type { SendChatMsg, ReceiveChatMsg } from '@/types/chat'

// 发送对话信息
export const sendChatMsgAPI = (data: SendChatMsg) => request<{}>('/sendChatMsg', 'post', data)

// 接收对话信息
export const receiveChatMsgAPI = (data: {}) =>
  request<ReceiveChatMsg>('/receiveChatMsg', 'post', data)

// 修改信息为已读
export const updateMsgStatusAPI = (data: { id: string }) =>
  request<{}>('/updateMsgStatus', 'get', data)
