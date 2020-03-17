import formCommonSetting from './formCommonSetting'
const formDesigner = {
  state: {
    formData: [],
    activeKey: '',
    patterns: [{
      desc: '测试正则，所填内容是否为大写',
      message: '大写',
      name: 'upper',
      regexp: /^[A-Z]+$/
    }],
    renderData: []
  },
  modules: {
    formCommonSetting
  },
  mutations: {
    setFormData (state, newData) {
      state.formData = newData
    },
    setActiveKey (state, key) {
      state.activeKey = key
    },
    setPatterns (state, patterns) {
      state.patterns = patterns
    },
    setRenderData (state, data) {
      state.renderData = data
    }
  }
}

export default formDesigner
