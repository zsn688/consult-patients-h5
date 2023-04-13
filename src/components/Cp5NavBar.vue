<script setup lang="ts">
import router from '@/router'
import { defineProps } from 'vue'
defineProps<{ title?: string; rightText?: string }>()
const onClickLeft = () => {
  if (history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
const emit = defineEmits<{ (e: 'click-right'): void }>()
const onClickRight = () => {
  emit('click-right')
}
</script>

<template>
  <van-nav-bar
    :title="title"
    :right-text="rightText"
    @click-left="onClickLeft"
    @click-right="onClickRight"
    left-arrow
    fixed
  ></van-nav-bar>
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }

    &__text {
      font-size: 15px;
    }
  }
}
</style>
