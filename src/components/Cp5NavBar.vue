<script setup lang="ts">
import router from '@/router'
import { defineProps } from 'vue'
const props = defineProps<{ title?: string; rightText?: string; openPopup?: boolean }>()
const emit = defineEmits<{
  (e: 'click-right'): void
  (e: 'close-popup'): void
}>()
const onClickLeft = () => {
  if (props.openPopup) return emit('close-popup')
  if (history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}
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
    &__title {
      font-size: 16px;
      font-weight: normal;
    }
  }
}
</style>
