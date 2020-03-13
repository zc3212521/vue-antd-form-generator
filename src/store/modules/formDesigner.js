const formDesigner = {
  state: {
    formData: [],
    activeKey: '',
    patterns: [{
      desc: '666',
      message: '大写',
      name: 'upper',
      regexp: /^[A-Z]+$/
    }],
    renderData: []
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
