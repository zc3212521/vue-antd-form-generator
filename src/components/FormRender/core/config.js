const defaultConfig = {
  input: {
    value: '',
    type: 'string',
    placeholder: '请填入'
  },
  inputNumber: {
    value: 0,
    type: 'number',
    placeholder: '请填入'
  },
  radio: {
    value: undefined,
    type: 'any'
  },
  checkbox: { // 注意：凡是数组类型的最少验证需要添加 required:true 配置项
    value: [],
    type: 'array'
  },
  select: {
    value: undefined,
    type: 'any',
    placeholder: '请选择'
  }
}

export const defaultMsg = {
  required: '此项为必选项！',
  range: '此项需大于{min}小于{max}',
  len: '此项长度为{len}',
  whitespace: '不能是空格'
}

export const patterns = {
  lowercase: { // todo 添加模式邮箱，url...
    regexp: /^[a-z]+$/,
    message: '填入内容非小写字母！'
  }
}

export const validateUI = {
  icon: true
}

export default defaultConfig
