// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import userHome from "../components/userHome.vue";
import Login from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import AdminHome from "../components/AdminHome.vue";
import ManageSections from "../components/ManageSections.vue";

const routes = [
  {
    path: "/",
    name: "userHome",
    component: userHome,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/admin",
    name: "adminHome",
    component: AdminHome,
  },
  {
    path: "/admin/manage-sections",
    name: "manageSections",
    component: ManageSections,
  },
  // Add more routes here
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
