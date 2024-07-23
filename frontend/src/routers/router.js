// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";
import userHome from "../components/userHome.vue";

const routes = [
  {
    path: "/",
    name: "userHome",
    component: userHome,
  },

  // Add more routes here
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
