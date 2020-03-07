import baseConfig from '@/baseConfig'

const { frontSetting, customFrontSetting } = baseConfig
const {
  theme,
  // showHistoryStack,
  popType,
  primaryColor
} = customFrontSetting

const frontSettings = {
  state: {
    theme: frontSetting ? (localStorage.getItem('theme') || 'light') : theme,
    // showHistoryStack: frontSetting ? (localStorage.getItem('showHistoryStack') || '1') : showHistoryStack // 是否显示历史导航组件，'0' | '1'，
    showHistoryStack: '0', // 是否显示历史导航组件，0 | 1，暂时不显示历史导航
    popType: frontSetting ? (localStorage.getItem('popType') || 'drawer') : popType,
    primaryColor: frontSetting ? (localStorage.getItem('primaryColor') || '#1890ff') : primaryColor
  },
  mutations: {
    setTheme (state, theme) {
      state.theme = theme
    },
    setShowHistoryStack (state, type) { // type : '1' 显示， ‘0’ 不显示
      state.showHistoryStack = type
    },
    setPopType (state, type) {
      state.popType = type
    },
    setPrimaryColor (state, color) {
      state.primaryColor = color
    }
  },
  actions: {
    updateTheme ({ commit }, theme) {
      localStorage.setItem('theme', theme)
      commit('setTheme', theme)
    },
    updateShowHistoryStack ({ commit }, type) {
      localStorage.setItem('showHistoryStack', type)
      commit('setShowHistoryStack', type)
    },
    updatePopType ({ commit }, type) {
      localStorage.setItem('popType', type)
      commit('setPopType', type)
    },
    updatePrimaryColor ({ commit }, color) {
      localStorage.setItem('primaryColor', color)
      commit('setPrimaryColor', color)
    }
  }
}

export default frontSettings
