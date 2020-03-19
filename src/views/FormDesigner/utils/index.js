/**
 * 获取obj的类型
 * @param obj
 * @returns {string|*}
 */
export function getType (obj) {
  const str = Object.prototype.toString.call(obj)
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    // 判断是否是dom元素，如div等
    return 'element'
  }
  return map[str]
}

/**
 * 深拷贝对象
 * @param ori
 * @returns {Array|any}
 */
export function deepClone (ori) {
  const type = getType(ori)
  let copy
  switch (type) {
    case 'array':
      return copyArray(ori, type, copy)
    case 'object':
      return copyObject(ori, type, copy)
    default:
      return ori
  }
}

/**
 * 拷贝数组
 * @param ori
 * @param type
 * @param copy
 * @returns {Array}
 */
function copyArray (ori, type, copy = []) {
  for (const [index, value] of Object.entries(ori)) {
    copy[index] = deepClone(value)
  }
  return copy
}

/**
 * 拷贝对象
 * @param ori
 * @param type
 * @param copy
 */
function copyObject (ori, type, copy = {}) {
  for (const [key, value] of Object.entries(ori)) {
    if (getType(value) === 'function') {
      copy[key] = ori[key]
    } else {
      copy[key] = deepClone(value)
    }
  }
  return copy
}

/**
 * 生成唯一ID
 * @returns {string}
 */
export function generateUnitId () {
  return Math.random().toString(36).substr(2)
}

/**
 * 获取浏览器窗口高度
 */
export function getClientHeight () {
  return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}
