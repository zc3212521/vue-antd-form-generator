import { deepClone, generateUnitId } from './index'

export const controlType = [
  {
    name: 'form',
    title: '表单控件'
  },
  {
    name: 'group',
    title: '分组控件'
  },
  {
    name: 'layout',
    title: '布局'
  }
]

export const controls = [
  {
    id: 'input-' + generateUnitId(),
    type: 'input',
    listAttr: {
      type: controlType[0].name,
      icon: 'plus',
      name: '输入框'
    },
    viewAttr: {
      inWholeGrid: false
    },
    settingAttr: {
      initialValue: '',
      rules: [],
      placeholder: ''
    }
  },
  {
    id: 'inputNumber-' + generateUnitId(),
    type: 'inputNumber',
    listAttr: {
      type: controlType[0].name,
      icon: 'plus',
      name: '数字输入框'
    },
    viewAttr: {
      inWholeGrid: false
    },
    settingAttr: {
      initialValue: '',
      rules: [],
      placeholder: ''
    }
  },
  {
    id: 'radio-' + generateUnitId(),
    type: 'radio',
    listAttr: {
      type: controlType[0].name,
      icon: 'plus',
      name: '单选框'
    },
    viewAttr: {
      inWholeGrid: false
    },
    settingAttr: {
      initialValue: '',
      rules: [],
      placeholder: ''
    }
  },
  {
    id: 'checkbox-' + generateUnitId(),
    type: 'checkbox',
    listAttr: {
      type: controlType[0].name,
      icon: 'plus',
      name: '多选框'
    },
    viewAttr: {
      inWholeGrid: false
    },
    settingAttr: {
      initialValue: '',
      rules: [],
      placeholder: ''
    }
  },
  {
    id: 'select-' + generateUnitId(),
    type: 'select',
    listAttr: {
      type: controlType[0].name,
      icon: 'plus',
      name: '选择器'
    },
    viewAttr: {
      inWholeGrid: false
    },
    settingAttr: {
      initialValue: '',
      rules: [],
      placeholder: ''
    }
  },
  {
    id: 'group-' + generateUnitId(),
    type: 'group',
    listAttr: {
      type: controlType[1].name,
      icon: 'plus',
      name: '分组'
    },
    viewAttr: {
      inWholeGrid: true
    },
    settingAttr: {}
  },
  {
    id: 'grid-' + generateUnitId(),
    type: 'grid',
    listAttr: {
      type: controlType[2].name,
      icon: 'plus',
      name: '栅格'
    },
    viewAttr: {
      inWholeGrid: true
    },
    settingAttr: {}
  }
]

export function getControlList () {
  const controlList = []
  for (let i = 0; i < controlType.length; i++) {
    const topLevel = deepClone(controlType[i])
    const list = []
    for (let n = 0; n < controls.length; n++) {
      if (controlType[i].name === controls[n].listAttr.type) {
        list.push(controls[n])
      }
    }
    topLevel.children = list
    controlList.push(topLevel)
  }
  return controlList
}

export const testData = [
  {
    name: '输入框',
    type: 'input',
    attr: {
      id: 'input-myt1oy43l4m',
      label: '输入框',
      placeholder: '请输入文字',
      initialValue: '',
      rules: [],
      layout: 4
    },
    key: 'input-myt1oy43l4m'
  },
  {
    name: '栅格',
    type: 'grid',
    attr: {
      id: 'grid-tkf87lq1ri',
      count: 2,
      options: [
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '6', value: 6 }]
    },
    columns: [
      {
        span: 12,
        children: [
          {
            name: '选择器',
            type: 'select',
            attr: {
              id: 'select-ygu6wpt3jop',
              label: '选择器',
              placeholder: '请选择',
              initialValue: '',
              rules: [],
              layout: 4,
              options: [
                { label: 'A', value: 0 },
                { label: 'B', value: 1 }]
            },
            key: 'select-ygu6wpt3jop'
          }]
      },
      {
        span: 12,
        children: [
          {
            name: '单选框',
            type: 'radio',
            attr: {
              id: 'radio-oypwrlr2bn',
              label: '单选框',
              initialValue: '',
              rules: [],
              layout: 4,
              options: [
                { label: 'A', value: 0 },
                { label: 'B', value: 1 }]
            },
            key: 'radio-oypwrlr2bn'
          }]
      }],
    key: 'grid-tkf87lq1ri'
  }]
