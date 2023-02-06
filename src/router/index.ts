import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Readonly<RouteRecordRaw[]> = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
    redirect: "/money",
    children: [
      {
        path: "/enter",
        name: "Enter",
        component: () => import("@/views/home/enter.vue")
      },
      {
        path: "/money",
        name: "Money",
        component: () => import("@/views/home/money.vue")
      },
      {
        path: "/record",
        name: "Record",
        component: () => import("@/views/home/record.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
