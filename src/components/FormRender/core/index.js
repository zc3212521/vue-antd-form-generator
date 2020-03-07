import Schema from 'async-validator'
import { deepClone, generateUnitId } from './utils'
import defaultConfig, { defaultMsg, validateUI, patterns } from './config'

export function metaData2ViewData (MetaData, extendPattern) {
  return serialize(MetaData, extendPattern)
}

/**
 * 将元数据转换成可用于视图展示的结构
 * @param metaData
 * @param extendPattern
 * @returns {{formDesc}|Array|any}
 */
function serialize (metaData, extendPattern) {
  const _metaData = deepClone(metaData)
  if ('formDesc' in _metaData) {
    const { formDesc } = metaData
    formDesc.errors = []
    if ('rows' in formDesc) {
      const { rows } = formDesc
      for (let i = 0; i < rows.length; i++) {
        rows[i].key = generateUnitId()
        if (rows[i].type === 'formItem') { // 序列化 formItem
          const formItem = rows[i].content
          let formItemArr = transformItem2Array(formItem)
          formItemArr = addDefaultConfig(formItemArr)
          formItemArr = addValidateOption(formItemArr)
          formItemArr = transformPattern(formItemArr, extendPattern)
          rows[i].content = formItemArr
        }
      }
      formDesc.rows = rows
      _metaData.formDesc = formDesc
    }
  } else {
    throw new Error('formData must has a property: formDesc')
  }
  return _metaData
}

function transformItem2Array (formItem) {
  const result = []
  for (const [key, value] of Object.entries(formItem)) {
    const item = {
      id: key,
      ...value
    }
    result.push(item)
  }
  return result
}

function addDefaultConfig (formItemArr) {
  formItemArr.forEach(item => {
    const cfg = findDefaultCfgByType(item.type)
    // init placeholder
    if (cfg.placeholder) {
      if (item.placeholder === undefined) {
        item.placeholder = cfg.placeholder
      }
    }
    // init rules
    if (!item.rules) item.rules = []

    if (item.rules.length) {
      item.rules.forEach(it => {
        it.type = cfg.type
      })
    }
    item.value = item.initialValue === undefined ? cfg.value : item.initialValue
    if (item.value === undefined) item.value = cfg.value // add initialValue
    if (item.required) { // combine validator
      if (!ifRulesHasRequired(item.rules)) {
        item.rules.push({
          type: cfg.type,
          required: item.required,
          message: defaultMsg.required
        })
      }
      delete item.required
    }
  })
  return formItemArr
}

function findDefaultCfgByType (type) {
  const result = defaultConfig[type]
  if (result === undefined) throw new Error(`check if this type exist:${type}`)
  return result
}

function ifRulesHasRequired (rules) {
  return rules.some(item => Object.keys(item).includes('required'))
}

function addValidateOption (formItemArr) {
  for (let i = 0; i < formItemArr.length; i++) {
    formItemArr[i].validateOption = {
      status: null,
      icon: validateUI.icon,
      message: null
    }
  }
  return formItemArr
}

/**
 * 根据表单名，校验视图数据，传入第二个参数表示校验名为fieldName的表单项，不传校验所有表单项
 * @param viewData
 * @param fieldName
 * @returns {*}
 */
export function validateForm (viewData, fieldName) {
  const { formDesc } = viewData
  formDesc.errors = []
  if (formDesc.rows && formDesc.rows.length) {
    const { rows } = formDesc
    rows.forEach(item => {
      if (item.type === 'formItem') {
        const formItem = item.content
        item.content = validateFormItem(formItem, formDesc, fieldName)
      }
    })
    formDesc.rows = rows
  }
  viewData.formDesc = formDesc
  return viewData
}

function validateFormItem (formItem, formDesc, fieldName) {
  for (let i = 0; i < formItem.length; i++) {
    if (!formItem[i].rules || !formItem[i].rules.length) continue
    if (fieldName) { // 校验单个field
      if (formItem[i].id === fieldName) {
        formItem[i] = validateField(formItem[i], formDesc)
      }
    } else { // 校验所有field
      formItem[i] = validateField(formItem[i], formDesc)
    }
  }
  return formItem
}

function validateField (field, formDesc) {
  const descriptor = generateValidateDescriptor(field)
  const validator = new Schema(descriptor)
  validator.validate({ [field.id]: field.value }, (error, fields) => {
    if (error) {
      field.validateOption.status = 'error'
      field.validateOption.message = error[0].message
      formDesc.errors.push(...error)
    } else {
      field.validateOption.status = 'success'
      field.validateOption.message = null
    }
  })
  return field
}

export function updateViewDataByField (newFieldValue, viewData) { // 检查单field表单项，适合onChange，不适合全局表单更新
  const newViewData = deepClone(viewData)
  const { formDesc } = newViewData
  formDesc.rows = formDesc.rows.map(item => {
    if (item.type === 'formItem') {
      const formItem = item.content
      for (let i = 0; i < formItem.length; i++) {
        if (formItem[i].id === Object.keys(newFieldValue)[0]) {
          formItem[i].value = newFieldValue[Object.keys(newFieldValue)[0]]
        }
      }
      item.content = formItem
    }
    return item
  })
  newViewData.formDesc = formDesc
  console.log('add new value:', newViewData)
  return newViewData
}
export function viewData2MetaData (ViewData) {
  // return MetaData
}

function generateValidateDescriptor (fieldData) {
  if ('rules' in fieldData) {
    return {
      [fieldData.id]: fieldData.rules
    }
  }
  return {}
}

function transformPattern (formItemArr, extendPattern) {
  const totalPatterns = combinePattern(patterns, extendPattern)
  for (let i = 0; i < formItemArr.length; i++) {
    for (let n = 0; n < formItemArr[i].rules.length; n++) {
      const patternName = (formItemArr[i].rules[n].pattern && typeof (formItemArr[i].rules[n].pattern) === 'string') ? formItemArr[i].rules[n].pattern : null
      if (patternName) {
        const pattern = totalPatterns[patternName]
        formItemArr[i].rules[n].pattern = pattern.regexp
        formItemArr[i].rules[n].message = pattern.message
      }
    }
  }
  return formItemArr
}

export function combinePattern (defaultPattern, extendPattern) {
  return {
    ...defaultPattern,
    ...extendPattern
  }
}
