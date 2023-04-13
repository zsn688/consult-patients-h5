// 验证手机号
export const validateMobile = [
  {
    required: true,
    message: '请输入手机号'
  },
  {
    pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    message: '手机号格式不正确'
  }
]
// 验证密码
export const validatePassword = [
  { required: true, message: '请输入密码' },
  {
    pattern: /^[a-zA-Z]\w{7,23}$/,
    message: '请输入以字母开头，长度在8~24之间，只能包含字母、数字和下划线的密码'
  }
]
// 验证验证码
export const validateCode = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '请输入6位数字验证码' }
]
