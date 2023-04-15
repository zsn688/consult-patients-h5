import { useUserInfoStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

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
          component: () => import('@/views/home/index.vue')
        },
        {
          path: '/article',
          name: 'article',
          component: () => import('@/views/article/index.vue')
        },
        {
          path: '/notify',
          name: 'notify',
          component: () => import('@/views/notify/index.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user/index.vue')
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
  const store = useUserInfoStore()
  // 没有token,并且不在whitelist内，返回login页面
  if (!store.userInfo?.token && !whiteList.includes(to.path)) return '/login'
})

export default router
