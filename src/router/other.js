const other = {
  path: "other",
  name: "other",

  component: () => import("@/views/other/index"),
  meta: {
    title: "其他瞎搞",
  },
  children: [
    {
      path: "mynotice",
      name: "mynotice",
      component: () => import("@/views/other/mynotice/mynotice"),
      meta: { title: "我的消息", icon: "" },
    },
    {
      path: "file",
      name: "file",
      component: () => import("@/views/other/file/file"),
      meta: { title: "文件预览", icon: "" },
    },
  ],
};

export default other;
