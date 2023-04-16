import { useUserInfoStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('@/views/article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          name: 'notify',
          component: () => import('@/views/notify/index.vue'),
          meta: { title: '消息中心' }
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/index.vue'),
          meta: { title: '我的' }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/order/index.vue')
    },
    {
      path: '/consult',
      component: () => import('@/views/consult/index.vue')
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('@/views/room/index.vue')
    }
  ]
})

const whiteList = ['/login', '/register']
// 路由守卫 whiteList不需要token可以直接访问
router.beforeEach((to) => {
  NProgress.start()
  const store = useUserInfoStore()
  // 没有token,并且不在whitelist内，返回login页面
  if (!store.userInfo?.token && !whiteList.includes(to.path)) return '/login'
})

//切换标题
router.afterEach((to) => {
  document.title = to.meta.title || '优医问诊'
  NProgress.done()
})

export default router
