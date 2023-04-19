<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserDetailInfoAPI } from '@/services/userAPI'
import type { UserInfoDetail } from '@/types/userInfo'
import type { OrderInfo } from '@/types/order'
import { useUserInfoStore } from '@/stores'
import router from '@/router'
import { showConfirmDialog, closeDialog } from 'vant'

const userInfoDetail = ref<UserInfoDetail>()
const orderInfo = ref<OrderInfo>()
const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]
onMounted(async () => {
  const res = await getUserDetailInfoAPI()
  userInfoDetail.value = res.data
  orderInfo.value = res.data?.orderInfo
  // console.log(userInfoDetail.value)
})

//退出登录
const exitFn = () => {
  const store = useUserInfoStore()
  showConfirmDialog({ message: '确认退出优医问诊吗' })
    .then(() => {
      store.delUserInfo()
      router.push('/login')
    })
    .catch(() => {
      closeDialog()
    })
}
</script>

<template>
  <div class="user-page">
    <div class="user-head">
      <div class="user-info">
        <van-image
          :src="
            userInfoDetail?.avatar ||
            'https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/consult/avatar3.png'
          "
          width="70px"
          height="70px"
          alt="avatar"
          round
        />
        <div class="left">
          <span class="user-nick">{{ userInfoDetail?.account || '未登录' }}</span>
          <span class="user-intro">
            <cp5-svg-icon name="edit" dir="user"></cp5-svg-icon>
          </span>
        </div>
      </div>
      <div class="user-msg">
        <div class="item-1">
          <div class="msg-num">{{ userInfoDetail?.collectionNumber || 0 }}</div>
          <div class="msg-name">收藏</div>
        </div>
        <div class="item-1">
          <div class="msg-num">{{ userInfoDetail?.likeNumber || 0 }}</div>
          <div class="msg-name">关注</div>
        </div>
        <div class="item-1">
          <div class="msg-num">{{ userInfoDetail?.score || 0 }}</div>
          <div class="msg-name">积分</div>
        </div>
        <div class="item-1">
          <div class="msg-num">{{ userInfoDetail?.couponNumber || 0 }}</div>
          <div class="msg-name">优惠劵</div>
        </div>
      </div>
    </div>
    <div class="user-order">
      <van-cell title="药品订单" is-link value="全部订单" to="/order" />
      <van-grid :border="false">
        <van-grid-item text="待付款" :badge="orderInfo?.paidNumber || ''">
          <template #icon>
            <cp5-svg-icon name="paid" dir="user"></cp5-svg-icon>
          </template>
        </van-grid-item>
        <van-grid-item text="待发货" :badge="orderInfo?.shippedNumber || ''">
          <template #icon>
            <cp5-svg-icon name="shipped" dir="user"></cp5-svg-icon>
          </template>
        </van-grid-item>
        <van-grid-item text="待收货" :badge="orderInfo?.receivedNumber || ''">
          <template #icon>
            <cp5-svg-icon name="received" dir="user"></cp5-svg-icon>
          </template>
        </van-grid-item>
        <van-grid-item text="已完成" :badge="orderInfo?.finishedNumber || ''">
          <template #icon>
            <cp5-svg-icon name="finished" dir="user"></cp5-svg-icon>
          </template>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="user-tool">
      <van-cell-group inset>
        <van-cell title="快捷工具" />
        <van-cell
          v-for="(item, index) in tools"
          :key="item.path"
          :title="item.label"
          is-link
          center
          :to="item.path"
        >
          <template #icon>
            <cp5-svg-icon :name="`tool-0${index + 1}`" dir="user" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="user-exit" @click="exitFn">退出登录</div>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  background-color: var(--cp-bg);
  padding-bottom: 65px;
  .user-head {
    height: 200px;
    padding: 50px 15px 0;
    box-sizing: border-box;
    background: linear-gradient(rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
    .user-info {
      display: flex;
      .left {
        height: 70px;
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        justify-content: space-around;
        .user-nick {
          font-size: 18px;
        }
        .user-intro {
          font-size: 16px;
          color: var(--cp-primary);
        }
      }
    }
    .user-msg {
      display: flex;
      justify-content: space-around;
      padding-top: 15px;
      .item-1 {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .msg-num {
          font-size: 18px;
        }
        .msg-name {
          margin-top: 4px;
          font-size: 13px;
          color: var(--cp-dark);
        }
      }
    }
  }
  .user-order {
    height: 118px;
    padding: 0 15px 15px;
    margin-bottom: 15px;
    :deep() {
      .van-cell {
        border-radius: 8px 8px 0 0;
      }

      .van-cell__title {
        font-weight: bold;
        font-size: 16px;
        color: var(--cp-text1);
      }
      .van-cell__value {
        color: var(--cp-tip);
      }
      .van-cell__right-icon {
        color: var(--cp-tip);
      }
      .van-badge__wrapper {
        font-size: 14px;
      }
      .van-grid {
        .van-badge__wrapper {
          font-size: 28px;
        }
        .van-grid-item__text {
          padding-top: 4px;
          font-size: 13px;
          color: var(--cp-text1);
        }
      }
    }
  }
  .user-tool {
    padding: 0 15px;
    :deep() {
      .van-cell-group--inset {
        margin: 0;
        .van-cell {
          padding: 14px 16px;
        }
        .van-cell__title:first-child {
          font-size: 16px;
          font-weight: bold;
        }
        .svg-icon {
          font-size: 17px;
          margin-right: 10px;
        }
      }
    }
  }
  .user-exit {
    padding: 0 15px;
    margin: 20px 0;
    text-align: center;
    color: var(--cp-price);
  }
}
</style>
