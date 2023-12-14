/**
 * vue实例的离开事件后绑定。确保在任何浏览器中都会调用after leave.
 *
 * @param {Vue} instance 实例视图.
 * @param {Function} callback callback of after-leave event
 * @param {Number} speed 转换速度，默认值为300ms
 * @param {Boolean} once weather bind after-leave once. default value is false.
 */
export default function (instance, callback, speed = 300, once = false) {
  if (!instance || !callback)
    throw new Error("instance & callback is required");
  let called = false;
  const afterLeaveCallback = function () {
    if (called) return;
    called = true;
    if (callback) {
      callback.apply(null, arguments);
    }
  };
  if (once) {
    instance.$once("after-leave", afterLeaveCallback);
  } else {
    instance.$on("after-leave", afterLeaveCallback);
  }
  setTimeout(() => {
    afterLeaveCallback();
  }, speed + 100);
}
