import { routes } from '@/router'

const permission = {
  state: {
    routers: routes,
    userAuth: [],
    userMenu: []
  },
  mutations: {
    setClearAuth (state) {
      state.userMenu = []
      state.userAuth = []
    },
    setAllAuth (state, auth) {
      state.userAuth = auth
    },
    setAllMenu (state, menu) {
      state.userMenu = menu
    }
  },
  actions: {
    generateLoginOut ({ commit }) {
      commit('setClearAuth')
    },
    generateMenu ({ commit }, userMenu) {
      commit('setAllMenu', userMenu)
    },
    generateAuth ({ commit }, userAuth) {
      commit('setAllAuth', userAuth)
    },
    generateMenuAndAuth ({ commit }, menuAndAuth) {
      commit('setAllMenu', menuAndAuth[0])
      commit('setAllAuth', menuAndAuth[1])
    }
  },
  getters: {
    getAllRoutes (state) {
      return state.routers
    },
    getUserAuth (state) {
      return state.userAuth
    },
    getUserMenu (state) {
      return state.userMenu
    }
  }
}

export default permission
