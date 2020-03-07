import { generateUnitId, deepClone } from './index'
import { controls } from './config'

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
