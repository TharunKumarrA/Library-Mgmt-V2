// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import userHome from "../components/userHome.vue";
import Login from "../components/Login.vue";
import SignUp from "../components/SignUp.vue";
import AdminHome from "../components/admin/AdminHome.vue";
import ManageSections from "../components/admin/ManageSections.vue";
import ManageBooks from "../components/admin/ManageBooks.vue";
import ManageUsers from "../components/admin/ManageUsers.vue";
import ManageRequests from "../components/admin/ManageRequests.vue";
import Profile from "../components/Profile.vue";
import Books from "../components/Books.vue";
import Search from "../components/Search.vue";
import Logout from "../components/Logout.vue";

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
  {
    path: "/admin/manage-books",
    name: "manageBooks",
    component: ManageBooks,
  },
  {
    path: "/admin/manage-users",
    name: "manageUsers",
    component: ManageUsers,
  },
  {
    path: "/admin/manage-requests",
    name: "manageRequests",
    component: ManageRequests,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/books",
    name: "books",
    component: Books,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  // Add more routes here
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
