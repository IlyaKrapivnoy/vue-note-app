import { createStore } from "vuex";

export default createStore({
  state: {
    userName: "",
  },
  getters: {},
  mutations: {
    setUserName(state, newName) {
      state.userName = newName;
    },
  },
  actions: {
    updateUserName({ commit }, newName) {
      commit("setUserName", newName);
    },
  },
  modules: {},
});
