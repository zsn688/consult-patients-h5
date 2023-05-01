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

// 验证姓名
export const validateName = [
  { required: true, message: '请输入真实姓名' },
  { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '中文2-16个字符' }
]

// 验证身份证号
// IDValidator.js或者可以使用插件
export const validateIdCard = [
  { required: true, message: '请输入身份证号码' },
  {
    pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: '请输入正确的身份证号'
  }
]
