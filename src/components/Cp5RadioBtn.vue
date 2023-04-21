<script setup lang="ts">
defineProps<{
  options: { label: string; value: number | string }[]
  modelValue?: number | string
}>()
const emit = defineEmits<{ (event: 'update:modelValue', value: string | number): void }>()

const selectFn = (v: string | number) => {
  emit('update:modelValue', v)
}
</script>

<template>
  <div class="radio-btn" v-for="item in options" :key="item.label">
    <a
      href="#"
      class="item"
      :class="{ active: modelValue === item.value }"
      @click="selectFn(item.value)"
      >{{ item.label }}</a
    >
  </div>
</template>

<style lang="scss" scoped>
.radio-btn {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 60px;
    height: 32px;
    margin: 0 10px 10px 0;
    background-color: var(--cp-bg);
    text-align: center;
    line-height: 32px;
    border: 1px solid var(--cp-bg);
    border-radius: 4px;
  }
  .active {
    background-color: var(--cp-bg);
    border-color: var(--cp-primary);
  }
}
</style>
