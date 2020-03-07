const orgstructure = {
  state: {
    orgTree: [],
    orgSelectId: '',
    orgSelectName: ''
  },
  mutations: {
    setOrgTree (state, orgTree) {
      state.orgTree = orgTree
    },
    setOrgSelectId (state, id) {
      state.orgSelectId = id
    },
    setOrgSelectName (state, orgName) {
      state.orgSelectName = orgName
    }
  },
  actions: {
    updateOrgTree ({ commit }, orgTree) {
      commit('setOrgTree', orgTree)
    },
    updateOrgSelectId ({ commit }, orgSelectId) {
      commit('setOrgSelectId', orgSelectId)
    },
    updateOrgSelectName ({ commit }, orgSelectName) {
      commit('setOrgSelectName', orgSelectName)
    }
  }
}

export default orgstructure
