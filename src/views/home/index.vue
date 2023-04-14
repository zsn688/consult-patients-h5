<script setup lang="ts">
import { queryAddressListAPI } from '@/services/orderAPI'
const clickFn = async () => {
  const res = await queryAddressListAPI()
  console.log(res.data)
}
</script>

<template>
  <div class="home-page">
    <van-button @click="clickFn">点我发送</van-button>
  </div>
</template>

<style lang="scss" scoped></style>
