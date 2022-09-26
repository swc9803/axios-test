import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Todos from "../pages/todos/index.vue";
import Todo from "../pages/todos/_id.vue";
import TodoCreate from "../pages/todos/create/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "Home" */ "../pages/Home.vue"),
  },
  {
    path: "/todos",
    name: "Todos",
    component: Todos,
  },
  {
    path: "/todos/create",
    name: "TodoCreate",
    component: TodoCreate,
  },
  {
    path: "/todos/:id",
    name: "Todo",
    component: Todo,
  },
  {
    path: "/pinia",
    name: "Pinia",
    component: () =>
      import(/* webpackChunkName: "Piniatest" */ "../pages/PiniaTest.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
