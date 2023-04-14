import type { FocusAndRecommend } from '@/types/focus'
import { request } from '@/utils/request'

// 关注的医生列表：优先展示没有关注过的医生。
// 在疾病详情页面，专家推荐也使用这个接口。
export const focusAndRecommendAPI = (data: { current: string; pageSize: string }) =>
  request<FocusAndRecommend>('home/page/doc', 'get', data)

//关注操作
// type  topic百科话题,knowledge百科文章,doc医生,disease疾病
export const onFocusAPI = (data: {
  type: 'topic' | 'knowledge' | 'doc' | 'disease'
  id: string
}) => {
  return request<{ id: string }>('/like', 'get', data)
}
