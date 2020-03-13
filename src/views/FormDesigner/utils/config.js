import { deepClone } from './index'

export const controlType = [
  {
    name: 'form',
    title: '表单控件'
  },
  {
    name: 'layout',
    title: '布局控件'
  }
]

export const controls = [
  {
    name: '输入框',
    type: 'input',
    category: controlType[0],
    icon: 'plus',
    attr: {
      id: '',
      label: '输入框',
      placeholder: '请输入文字',
      initialValue: '',
      rules: [],
      layout: 4
    }
  },
  {
    name: '数字输入框',
    type: 'inputNumber',
    category: controlType[0],
    icon: 'plus',
    attr: {
      id: '',
      label: '数字输入框',
      placeholder: '请输入数字',
      initialValue: '',
      rules: [],
      layout: 4
    }
  },
  {
    name: '单选框',
    type: 'radio',
    category: controlType[0],
    icon: 'plus',
    attr: {
      id: '',
      label: '单选框',
      initialValue: '',
      rules: [],
      layout: 4,
      options: [
        { label: 'A', value: 0 },
        { label: 'B', value: 1 }
      ]
    }
  },
  {
    name: '多选框',
    type: 'checkbox',
    category: controlType[0],
    icon: 'plus',
    attr: {
      id: '',
      label: '多选框',
      initialValue: [],
      rules: [],
      layout: 4,
      options: [
        { label: 'A', value: 0 },
        { label: 'B', value: 1 }
      ]
    }
  },
  {
    name: '选择器',
    type: 'select',
    category: controlType[0],
    icon: 'plus',
    attr: {
      id: '',
      label: '选择器',
      placeholder: '请选择',
      initialValue: '',
      rules: [],
      layout: 4,
      options: [
        { label: 'A', value: 0 },
        { label: 'B', value: 1 }
      ]
    }
  },
  {
    name: '栅格',
    type: 'grid',
    category: controlType[1],
    icon: 'plus',
    attr: {
      id: '',
      count: 2,
      options: [
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '6', value: 6 }
      ]
    },
    columns: [
      {
        span: 12,
        children: []
      },
      {
        span: 12,
        children: []
      }
    ]
  }
]

export const renderRowType = {
  formItem: ['input', 'inputNumber', 'select', 'radio', 'checkbox', 'grid']
}

export function getControlList () {
  const controlData = []
  for (let i = 0; i < controlType.length; i++) {
    const topLevel = deepClone(controlType[i])
    const list = []
    for (let n = 0; n < controls.length; n++) {
      if (controlType[i].name === controls[n].category.name) {
        list.push(controls[n])
      }
    }
    topLevel.list = list
    controlData.push(topLevel)
  }
  return controlData
}
