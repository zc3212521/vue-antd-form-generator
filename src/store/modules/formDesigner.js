const formDesigner = {
  state: {
    formData: [],
    activeKey: ''
  },
  mutations: {
    setFormData (state, newData) {
      state.formData = newData
    },
    setActiveKey (state, key) {
      console.log('mutations', key)
      state.activeKey = key
    }
  }
}

export default formDesigner
