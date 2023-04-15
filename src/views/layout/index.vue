<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
</script>

<template>
  <div class="layout-page">
    <router-view></router-view>
    <van-tabbar v-model="active" fixed route>
      <van-tabbar-item to="/home">
        <span>首页</span>
        <template #icon="{ active }">
          <cp5-svg-icon :name="`index-${!active ? 'default' : 'active'}`" dir="home"></cp5-svg-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/article">
        <span>健康百科</span>
        <template #icon="{ active }">
          <cp5-svg-icon
            :name="`article-${!active ? 'default' : 'active'}`"
            dir="home"
          ></cp5-svg-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/notify">
        <span>消息中心</span>
        <template #icon="{ active }">
          <cp5-svg-icon
            :name="`notice-${!active ? 'default' : 'active'}`"
            dir="home"
          ></cp5-svg-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        <span>我的</span>
        <template #icon="{ active }">
          <cp5-svg-icon :name="`mine-${!active ? 'default' : 'active'}`" dir="home"></cp5-svg-icon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
.layout-page {
  :deep() {
    .van-tabbar-item {
      &__icon {
        // __ 是两条_
        font-size: 21px;
      }
      &__text {
        font-size: 13px;
      }
      &:not(.van-tabbar-item--active) {
        color: var(--cp-text3);
      }
    }
  }
}
</style>
