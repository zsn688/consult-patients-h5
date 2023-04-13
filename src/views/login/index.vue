<script setup lang="ts">
import Cp5NavBar from '@/components/Cp5NavBar.vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserInfoStore } from '@/stores'
import { loginByPwAPI, getCodeAPI, loginByCodeAPI } from '@/services/loginAPI'
import { showToast, type FormInstance } from 'vant'
import { ref } from 'vue'
import { validateMobile, validatePassword, validateCode } from '@/utils/validate'

const router = useRouter()
const route = useRoute()
// 注册按钮
const registerFn = () => {
  router.push('/register')
}
// 切换密码登录/短信登录
const pwLogin = ref(true)
const changeFn = () => {
  pwLogin.value = !pwLogin.value
  mobile.value = ''
  password.value = ''
}
// 表单数据，验证，提交
const mobile = ref('')
const password = ref('')
const agree = ref(false)
const onLogin = async () => {
  if (!agree.value) showToast('请勾选我已同意')
  const store = useUserInfoStore()
  if (pwLogin.value) {
    // 密码登录
    const userInfo = await loginByPwAPI(mobile.value, password.value)
    // console.log(userInfo)
    store.setUserInfo(userInfo.data)
  } else {
    // 验证码登录
    // 此处password是输入的code
    const userInfo = await loginByCodeAPI(mobile.value, password.value)
    store.setUserInfo(userInfo.data)
  }
  // 如果有回跳地址就进行回跳，没有跳转到个人中心

  router.push((route.query.returnUrl as string) || '/user')
  showToast('登录成功')
}

// 发送验证码
const send = ref(false)
const time = ref(60 * 1000)
const form = ref<FormInstance>()
const sendCode = async () => {
  // 手机号必填
  await form.value?.validate('mobile')
  send.value = !send.value
  // 获取验证码
  const res = await getCodeAPI(mobile.value, 'login')
  console.log(res.data)
}
const timeFinish = () => {
  send.value = !send.value
}
</script>

<template>
  <div class="login-page">
    <cp5-nav-bar :right-text="'注册'" @click-right="registerFn"></cp5-nav-bar>
    <div class="login-head">
      <h3>{{ pwLogin ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="#" @click="changeFn">
        <span>{{ !pwLogin ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </a>
    </div>
    <van-form @submit="onLogin" class="login-form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="validateMobile"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        :placeholder="pwLogin ? '请输入密码' : '请输入验证码'"
        :rules="pwLogin ? validatePassword : validateCode"
      >
        <template #button>
          <div class="icon" v-if="pwLogin">
            <img src="@/icons/login/eye-off.svg" alt="eye-off" />
          </div>
          <div v-else class="send-code">
            <a href="#">
              <span v-if="!send" @click="sendCode">发送验证码</span>
              <van-count-down :time="time" format="ss 秒后再次发送" v-else @finish="timeFinish" />
            </a>
          </div>
        </template>
      </van-field>
      <van-checkbox v-model="agree" class="form-cell" icon-size="14px">
        <span>我已同意</span>
        <a href="#">用户协议</a>
        <span>及</span>
        <a href="#">隐私条款</a>
      </van-checkbox>
      <div class="form-cell">
        <van-button round block type="primary" native-type="submit"> 登 录 </van-button>
      </div>
      <div class="form-cell">
        <a href="#">忘记密码？</a>
      </div>
    </van-form>
    <div class="login-other">
      <van-divider>第三方登录</van-divider>
      <div class="icon">
        <img src="@/assets/qq.svg" alt="qq" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  padding-top: 46px;
  .login-head {
    padding: 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    // 弹性盒子元素的侧轴（纵轴）结束位置的边界紧靠住该行的侧轴结束边界。
    line-height: 1;
    h3 {
      font-weight: normal;
      font-size: 24px;
    }
    a {
      span {
        font-size: 15px;
      }
    }
  }
  .login-form {
    padding: 20px 14px 0 14px;
    :deep() {
      .van-cell {
        padding: 14px 16px;
      }
    }
    .form-cell {
      height: 52px;
      padding: 14px 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .van-checkbox__label {
        a {
          margin: 0 5px;
          color: var(--cp-primary);
        }
      }
      :deep() {
        .van-button__text {
          font-size: 16px;
        }
      }
    }
    img {
      width: 14px;
      margin-right: 10px;
    }
    .send-code a {
      color: var(--cp-primary);
    }
  }
  .login-other {
    margin-top: 60px;
    padding: 0 30px;
    .icon {
      display: flex;
      justify-content: center;
      img {
        width: 36px;
        height: 36px;
        padding: 4px;
      }
    }
  }
}
</style>
