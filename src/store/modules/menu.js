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
      state.leftShow = firstPath ? true : false;
      console.log( state.leftShow);
    },
    SET_CHILDRENARR: (state, childrenArr) => {
      state.childrenArr = childrenArr;
    },
  },

  actions: {},
};

export default menu;
