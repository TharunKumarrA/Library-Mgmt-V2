import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./routers/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "../src/routers/axios.js";

const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(router);
app.mount("#app");
