import { generateUnitId, deepClone } from './index'
import { controls, renderRowType } from './config'

export function formatViewData (e) {
  return generateControlData(e.type)
}

function generateControlData (type) {
  const unitKey = type + '-' + generateUnitId()
  let result = null
  for (let i = 0; i < controls.length; i++) {
    if (controls[i].type === type) {
      result = deepClone(controls[i])
      result.key = result.attr.id = unitKey
      delete result.category
      delete result.icon
    }
  }
  return result
}

export function findIndexWithKey (formData, key) {
  let arr = []
  for (let i = 0; i < formData.length; i++) {
    if (formData[i].key === key) {
      // console.log('lev-1', i)
      arr = [i]
      break
    }
    if (formData[i].type === 'grid') {
      for (let n = 0; n < formData[i].columns.length; n++) {
        for (let m = 0; m < formData[i].columns[n].children.length; m++) {
          if (formData[i].columns[n].children[m].key === key) {
            // console.log('lev-3', i, n, m)
            arr = [i, n, m]
            break
          }
        }
      }
    }
  }
  return arr
}

export function ifRequiredInRules (rules) {
  let sign = false
  rules.forEach(item => {
    const keys = Object.keys(item)
    if (keys.includes('required')) sign = true
  })
  return sign
}

/**
 * 生成渲染列数据
 * @param formData
 * @returns {{formDesc: {ui: null, footer: null, rows: []}}}
 */
export function demoData2renderData (formData) {
  const renderRowData = generateRowData(formData)
  console.log('renderRowData', renderRowData)
  return {
    formDesc: {
      rows: renderRowData,
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
      }
    }
  }
}

/**
 * 生成渲染行数据
 * @param formData
 * @returns {[]}
 */
function generateRowData (formData) {
  const rows = []
  formData.forEach((rowData, index) => {
    if (renderRowType.formItem.includes(rowData.type)) { // 1版本均为renderRowType
      rows.push({
        type: 'formItem',
        content: generateContent(rowData)
      })
    }
  })
  console.log(333, rows)
  return rows
}

/**
 * 生成content属性
 * @param rowData
 * @returns {{}}
 */
function generateContent (rowData) {
  const content = {}
  if (rowData.type === 'grid') {
    rowData.columns.forEach((col, ind) => {
      const colData = col.children[0]
      const { attr, contentKey } = transformItemAttr(colData)
      content[contentKey] = attr
    })
  } else {
    const { attr, contentKey } = transformItemAttr(rowData)
    content[contentKey] = attr
  }
  console.log(222, content)
  return content
}

/**
 * 转换展示数据attr属性为渲染数据的content块属性
 * @param colData
 * @returns {{contentKey: (string), attr: *}}
 */
function transformItemAttr (colData) {
  const { attr } = colData
  const contentKey = attr.id
  delete attr.id
  attr.type = colData.type
  if (attr.type === 'grid') {
    attr.grid = { // todo grid的处理
      span: colData.span,
      offset: 0
    }
    attr.layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
  } else {
    attr.grid = { // todo grid的处理
      span: 12,
      offset: 0
    }
    attr.layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    }
  }
  console.log(111, attr, contentKey)
  return {
    attr, contentKey
  }
}

// todo 废弃
export function transformAddData (list, formData, index) {
  formData.splice(index, 0, list[index])
  return formData
}

export function transformMoveData (formData, oldIndex, newIndex) {
  const oldData = formData[newIndex]
  formData[newIndex] = formData[oldIndex]
  formData[oldIndex] = oldData
  return formData
}

export function transformDeleteData (formData, index) {
  // console.log('before slice', formData)
  formData.splice(index, 1)
  console.log('after slice', formData)
  return formData
}

export function transformAddSubData (list, formData, index, subIndex) {
  console.log(222, list, formData, index, subIndex)
  if (formData[index].children) {
    formData[index].children.splice(subIndex, 0, list[subIndex])
  }
  return formData
}

export function transformMoveSubData (formData, index, subOldIndex, subNewIndex) {
  const subData = formData[index].children
  const oldSubData = subData[subNewIndex]
  subData[subNewIndex] = subData[subOldIndex]
  subData[subOldIndex] = oldSubData
  formData[index].children = subData
  return formData
}

export function transformDeleteSubData (formData, index, subIndex) {
  const subData = formData[index].children
  subData.splice(subIndex, 1)
  formData[index].children = subData
  return formData
}
