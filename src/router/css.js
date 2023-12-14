const css = {
  path: "cssdemo",
  name: "cssdemo",

  component: () => import("@/views/css/index"),
  meta: {
    title: "css小案例",
  },
  children: [
    {
      path: "Loaders",
      name: "Loaders",
      component: () => import("@/views/css/Loaders/Loaders"),
      meta: { title: "加载动效", icon: "" },
    },
    {
      path: "spring",
      name: "spring",
      component: () => import("@/views/css/spring/spring"),
      meta: { title: "魔力弹簧", icon: "" },
    },
    {
      path: "charging",
      name: "charging",
      component: () => import("@/views/css/charging/charging"),
      meta: { title: "充电", icon: "" },
    },
    {
      path: "notesHTML",
      name: "notesHTML",
      component: () => import("@/views/css/notes/notesHTML/notesHTML"),
      meta: { title: "代办HTML", icon: "" },
    },
    {
      path: "notesElement",
      name: "notesElement",
      component: () => import("@/views/css/notes/notesElement/notes"),
      meta: { title: "代办Element", icon: "" },
    },
  ],
};

export default css;
