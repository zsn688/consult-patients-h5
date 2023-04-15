<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>

<template>
  <div class="home-page">
    <div class="home-head">
      <div class="head-title">优医</div>
      <div class="head-search">
        <van-search
          v-model="value"
          placeholder="搜一搜: 疾病/症状/医生/健康知识"
          shape="round"
          background="none"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  .home-head {
    height: 98px;
    padding: 0 15px;
    &:before {
      content: '';
      position: absolute;
      z-index: -999;
      left: 0;
      top: 0;
      width: 100%;
      height: 90px;
      background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
      border-bottom-left-radius: 150px 20px;
      border-bottom-right-radius: 150px 20px;
    }
    .head-title {
      padding: 20px 5px;
      font-size: 18px;
      color: #fff;
    }
    .head-search {
      :deep() {
        .van-search {
          padding: 0;
          box-shadow: 0 4vw 5.86667vw -1.86667vw #e0ecfa;
          .van-search__field {
            height: 40px;
          }
          #van-search-1-input::placeholder {
            color: var(--cp-dark);
          }
        }
      }
    }
  }
}
</style>
