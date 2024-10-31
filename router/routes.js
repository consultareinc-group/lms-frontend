const routes = [
  {
    path: "/production",
    name: "Production Management System",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      { path: "", name: "Home", component: () => import("../pages/IndexPage.vue") },
      { path: "nav1", name: "Nav1", component: () => import("../pages/IndexPage.vue") },
      { path: "nav2", name: "Nav2", component: () => import("../pages/IndexPage.vue") },
      { path: "nav3", name: "Nav3", component: () => import("../pages/IndexPage.vue") },
    ],
  },
];

export default routes;
