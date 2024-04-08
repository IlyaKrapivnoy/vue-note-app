import { createStore } from "vuex";

export default createStore({
  state: {
    userName: "",
    selectedCategory: "work",
  },
  getters: {},
  mutations: {
    setUserName(state, newName) {
      state.userName = newName;
    },
    setSelectedCategory(state, newCategory) {
      state.selectedCategory = newCategory;
    },
  },
  actions: {
    updateUserName({ commit }, newName) {
      commit("setUserName", newName);
    },
  },
  modules: {},
});
