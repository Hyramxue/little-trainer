const vueDepot =
  //vue
  {
    path: "vueDepot",
    name: "vueDepot",

    component: () => import("@/views/childrenRouter"),
    meta: {
      title: "vue组件库",
    },
    children: [
      // infinitegrid grid布局
      {
        path: "infinitegrid",
        name: "infinitegrid",

        component: () => import("@/views/vueDepot/infinitegrid/infinitegrid"),
        meta: {
          title: "grid布局",
        },
      },
      {
        path: "identifyQrCode",
        name: "identifyQrCode",

        component: () => import("@/views/vueDepot/qrCode/identifyQrCode"),
        meta: {
          title: "二维码识别",
        },
      },
    ],
  };

export default vueDepot;
