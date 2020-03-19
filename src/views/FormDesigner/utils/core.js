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
export function transformRowsData (formData) {
  const renderRowData = generateRowData(formData)
  console.log('renderRowData', renderRowData)
  return {
    rows: renderRowData
  }
}

export function transFormFooterData (commonSetting, ifShow) {
  const buttons = ifShow ? commonSetting.bottomButton : []
  return {
    footer: {
      layout: {
        type: commonSetting.bottomButtonLayout
      },
      buttons
    }
  }
}

export function transFormUiData (commonSetting) {
  return {
    ui: {
      style: { padding: '10px' },
      gutter: commonSetting.gutter
    }
  }
}

export function combineRenderData (rowData, footerData, uiData) {
  return {
    formDesc: {
      ...rowData,
      ...footerData,
      ...uiData
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

/**
 * 转换patterns
 * @param patterns, toString:boolean(是否正则表达式转换成字符串)
 */
export function transformPattern (patterns, ifReg2string) {
  const result = {}
  patterns.forEach(item => {
    if (ifReg2string) {
      result[item.name] = {
        regexp: item.regexp.toString(),
        message: item.message
      }
    } else {
      result[item.name] = {
        regexp: item.regexp,
        message: item.message
      }
    }
  })
  return result
}

export function getCode (renderData, patterns) {
  const codeStr = `
  <template>
    <form-render
      :meta-data="renderData"
      @click-btn="getClick"
      :extend-pattern="patterns"
    />
  </template>
  <script>
  import FormRender from '@/components/business/FormRender'
  export defalut {
    name: 'FormRender',
    components: {
      FormRender
    },
    data () {
      return {
        renderData: ${renderData},
        patterns: ${patterns}
      }
    },
    methods: {
      getClick (val, index) {
        console.log(val, index)
      }
    }
  }
  </script>
  `
  return codeStr
}
