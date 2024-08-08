import { createApp, reactive } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routers/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "../src/routers/axios.js";

const app = createApp(App);

// Create a reactive user state
const userState = reactive({
  isLoggedIn: false,
  isAdmin: false,
  username: "",
});

// Provide the user state to all components
app.provide("userState", userState);

app.config.globalProperties.$axios = axios;
app.use(router);
app.mount("#app");
