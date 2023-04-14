<script lang="ts" setup>
import { defineProps } from 'vue'
const {
  name,
  dir,
  color = '#333'
} = defineProps<{ name: string; dir: 'consult' | 'login' | 'home' | 'user'; color?: string }>()
</script>
<template>
  <svg aria-hidden="true" class="svg-icon">
    <!-- 有些图标可以根据 style 中 color 的值来设置颜色，图标是否有这个功能取决于 UI 做图片时否开启 -->
    <use :href="`#icon-${dir}-${name}`" :fill="color" />
  </svg>
</template>

<style scoped lang="scss">
// 和字体一样大
.svg-icon {
  width: 1em;
  height: 1em;
}
</style>
