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
    renderData: [],
    ifShowButton: false,
    bottomButton: [
      {
        text: '确定',
        validate: true,
        type: 'primary'
      },
      {
        text: '取消',
        validate: false,
        type: 'default'
      }
    ]
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
    },
    setIfShowButton (state, sign) {
      state.ifShowButton = sign
    },
    setBottomButton (state, buttonData) {
      state.bottomButton = buttonData
    }
  }
}

export default formDesigner
