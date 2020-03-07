// import { getCurrentInfo } from '@/http/home'

const userInfo = {
  state: {
    community: null,
    user: null,
    userId: null
  },
  mutations: {
    setCommunity (state, info) {
      state.community = info
    },
    setUser (state, info) {
      state.user = info
    },
    setClearUserInfo (state) {
      state.community = null
      state.user = null
    },
    setUserId (state, id) {
      state.userId = id
    }
  },
  actions: {
    generateUserInfo ({ commit }) {
      // getCurrentInfo({}).then(res => {
      //   if (res.data.code === 10000) {
      //     let info = res.data.data
      //     commit('setCommunity', info.community)
      //     commit('setUser', info.user)
      //   }
      // })
      commit('setUser')
    },
    clearUserInfo ({ commit }) {
      commit('setClearUserInfo')
    },
    getUserId ({ commit }, id) {
      commit('setUserId', id)
    }
  }
}

export default userInfo
