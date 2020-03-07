export const exampleData = {
  basic: {
    version: ''
  },
  formDesc: {
    rows: [
      {
        type: 'group',
        content: '分组1'
      },
      {
        type: 'formItem',
        content: {
          name: {
            type: 'input',
            label: '姓名',
            rules: [
              { min: 2, max: 6, message: '长度在2-6之间' },
              { len: 3, message: '长度需为3' },
              { pattern: 'uppercase' }
            ],
            initialValue: '',
            placeholder: 'placeholder',
            required: true,
            grid: {
              span: 12,
              offset: 0
            },
            layout: {
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
            }
          },
          sex: {
            type: 'radio',
            label: '性别',
            // initialValue: 0,
            options: [
              { label: '男', value: 0 },
              { label: '女', value: 1 }
            ],
            required: true,
            grid: {
              span: 12,
              offset: 0
            },
            layout: {
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
            }
          }
        }
      },
      {
        type: 'group',
        content: '分组2'
      },
      {
        type: 'formItem',
        content: {
          hobby: {
            type: 'checkbox',
            label: '爱好',
            initialValue: [],
            options: [
              { label: '篮球', value: '0' },
              { label: '游泳', value: '1' },
              { label: '电动', value: '2', disabled: true }
            ],
            rules: [
              { min: 2, message: '必填2项' }
            ],
            required: true,
            grid: {
              span: 8,
              offset: 0
            },
            layout: {
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
            }
          },
          book: {
            type: 'select',
            label: '书籍类型',
            placeholder: null,
            initialValue: '0',
            options: [
              { label: '古典', value: '0' },
              { label: '言情', value: '1' },
              { label: '科幻', value: '2', disabled: true }
            ],
            required: true,
            grid: {
              span: 8,
              offset: 0
            },
            layout: {
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
            }
          },
          score: {
            type: 'inputNumber',
            label: '分数',
            placeholder: null,
            disabled: false,
            initialValue: 6,
            exclusive: {
              min: 0,
              max: 10
            },
            grid: {
              span: 8,
              offset: 0
            },
            layout: {
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
            }
          }
        }
      }
    ],
    footer: {
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14, offset: 2 }
      },
      buttons: [
        {
          text: '确定',
          type: 'primary',
          size: 'default',
          disabled: false,
          ifValidateForm: true
        },
        {
          text: '取消',
          type: 'default',
          size: 'default',
          disabled: false,
          ifValidateForm: false
        },
        {
          text: '下一步',
          type: 'default',
          size: 'default',
          disabled: false,
          ifValidateForm: false
        }
      ]
    },
    ui: {
      style: { padding: '80px' },
      gutter: 32
      // showType: 'inline', // vertical, inline, horizontal todo 此属性与 grid组件不兼容
    },
    associate: { // 关联属性 todo 如何在ui层添加逻辑
      login: {
        value: true,
        properties: ['PW'],
        type: 'show' // 'disable'
      }
    }
  },
  api: {
    url: 'xxx',
    token: 'xxx',
    fieldName: 'data'
  }
}
export const extendPattern = {
  uppercase: {
    regexp: /^[A-Z]+$/,
    message: '填入内容非大写字母！'
  },
  abc: {
    regexp: /abc/,
    message: '填入内容非大写字母！'
  }
}
