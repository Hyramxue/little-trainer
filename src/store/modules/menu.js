const menu = {
  namespaced: true,
  state: {
    firstPath: null,
    childrenArr: [],
    leftShow: false,
  },

  mutations: {
    SET_FIRSTPATH: (state, firstPath) => {
      state.firstPath = firstPath;
    },
    SET_CHILDRENARR: (state, childrenArr) => {
      state.childrenArr = childrenArr;
      state.leftShow = childrenArr.length ? true : false;
      console.log(state.leftShow);
    },
  },

  actions: {},
};

export default menu;
