import type { ArticleList } from '@/types/article'
import { request } from '@/utils/request'

// 查询推荐/减脂/饮食健康/关注页面--百科文章列表
//type类型 recommend推荐，fatReduction减脂，food健康饮食like关注医生页面文章
export const articleListAPI = (data: {
  type: 'like' | 'recommend' | 'fatReduction' | 'food'
  current: string
  pageSize: string
}) => request<ArticleList>('/patient/home/knowledge', 'get', data)
