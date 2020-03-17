const formCommonSetting = {
  state: {
    gutter: 24,
    ifShowButton: false,
    bottomButton: [
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
      }
    ],
    bottomButtonLayout: 'center'
  },
  mutations: {
    setGutter (state, gutter) {
      state.gutter = gutter
    },
    setIfShowButton (state, sign) {
      state.ifShowButton = sign
    },
    setBottomButton (state, buttonData) {
      state.bottomButton = buttonData
    },
    setBottomButtonLayout (state, layout) {
      state.bottomButtonLayout = layout
    }
  }
}

export default formCommonSetting
