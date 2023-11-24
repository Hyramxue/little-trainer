const js = {
  path: "jsdemo",
  name: "jsdemo",

  component: () => import("@/views/js/index"),
  meta: {
    title: "js小案例",
  },
  children: [
    {
      path: "echarts",
      name: "echarts",

      component: () => import("@/views/js/echarts/index"),
      meta: {
        title: "echarts",
      },
    },
    {
      path: "popconfirm",
      name: "popconfirm",

      component: () => import("@/views/js/popconfirm/popconfirm"),
      meta: {
        title: "弹窗",
      },
    },
    {
      path: "day",
      name: "day",

      component: () => import("@/views/js/date/dayjs"),
      meta: {
        title: "时间处理",
      },
    },
    //定位
    {
      path: "location",
      name: "location",

      component: () => import("@/views/js/location/location"),
      meta: {
        title: "定位",
      },
    },
    //food
    {
      path: "food",
      name: "food",

      component: () => import("@/views/js/food/index"),
      meta: {
        title: "食物",
      },
    },
    //food
    {
      path: "charging1",
      name: "charging1",

      component: () => import("@/views/js/charging/index"),
      meta: {
        title: "电",
      },
    },
    //Three.js
    {
      path: "threeJs",
      name: "threeJs",

      component: () => import("@/views/js/threeJs/index"),
      meta: {
        title: "Three.js ",
      },
    },
    //ml5
    {
      path: "ml5",
      name: "ml5",

      component: () => import("@/views/js/ml5/index"),
      meta: {
        title: "ml5",
      },
    },
    //echarts

    //echarts
    {
      path: "drawing",
      name: "drawing",

      component: () => import("@/views/js/drawing/index"),
      meta: {
        title: "画板",
      },
    },
    //切图
    {
      path: "imgly",
      name: "imgly",

      component: () => import("@/views/js/imgly/index"),
      meta: {
        title: "抠图",
      },
    },
    //切图
    {
      path: "leaferUi",
      name: "leaferUi",

      component: () => import("@/views/js/leaferUi/index"),
      meta: {
        title: "切图",
      },
    },
    //天地图
    {
      path: "tianditu",
      name: "tianditu",

      component: () => import("@/views/js/tianditu/index"),
      meta: {
        title: "天地图",
      },
    },
    //天地图
    {
      path: "mediaDevices",
      name: "mediaDevices",

      component: () => import("@/views/js/mediaDevices/index"),
      meta: {
        title: "拍照",
      },
    },
  ],
};

export default js;
