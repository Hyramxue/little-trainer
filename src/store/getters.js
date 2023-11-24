const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  firstPath: state => state.menu.firstPath,
  childrenArr: state => state.menu.childrenArr,
  leftShow: state => state.menu.leftShow,
}
export default getters
