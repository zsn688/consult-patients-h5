// 用户信息
export type UserInfo = {
  token: string
  id: string
  account: string
  mobile: string
  avatar: string
}

// 验证码类型
// login登录register注册changeMobile更换手机号forgetPassword找回密码,bindMobile绑定三方登录，区分验证码
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'
