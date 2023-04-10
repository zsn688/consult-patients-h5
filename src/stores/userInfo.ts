import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/userInfo'
import { ref } from 'vue'

export const useUserInfoStore = defineStore(
  'cp5-userInfo',
  () => {
    const userInfo = ref<UserInfo>()
    const setUserInfo = (u: UserInfo) => {
      userInfo.value = u
    }
    const delUserInfo = () => {
      userInfo.value = undefined
    }
    return { userInfo, setUserInfo, delUserInfo }
  },
  {
    persist: true
  }
)
