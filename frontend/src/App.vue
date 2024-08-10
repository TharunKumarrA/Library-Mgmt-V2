<template>
  <div class="bg-dark text-white min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">LMS</router-link>
        <div class="navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                v-if="currentRoute == '/admin' || userState.isAdmin"
                class="nav-link"
                to="/admin"
                >Home</router-link
              >
              <router-link v-else class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/books">Books</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/search">Search</router-link>
            </li>
            <li class="nav-item" v-if="userState.isLoggedIn">
              <router-link class="nav-link" to="/profile">Profile</router-link>
            </li>
            <li class="nav-item" v-if="userState.isLoggedIn">
              <router-link class="nav-link" to="/logout">Log out</router-link>
            </li>
            <li class="nav-item" v-if="!userState.isLoggedIn">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="!userState.isLoggedIn">
              <router-link class="nav-link" to="/signup">Sign Up</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { inject, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const userState = inject("userState") || {
      isLoggedIn: false,
      isAdmin: false,
      username: "",
    };
    const route = useRoute();
    const router = useRouter(); // Use useRouter to get the router instance

    const checkSession = () => {
      const sessionId = localStorage.getItem("sessionId");
      const username = localStorage.getItem("username");
      const isAdmin = localStorage.getItem("isAdmin");

      if (
        !sessionId ||
        sessionId === "undefined" ||
        sessionId === "null" ||
        sessionId === ""
      ) {
        router.push("/login"); // Use router.push for navigation
      } else {
        userState.isLoggedIn = true;
        userState.isAdmin = isAdmin === "true";
        userState.username = username;
      }
    };

    onMounted(() => {
      checkSession();
    });

    watch(
      () => route.path,
      (newPath) => {
        if (
          !userState.isLoggedIn &&
          newPath !== "/login" &&
          newPath !== "/signup"
        ) {
          router.push("/login"); // Use router.push for navigation
        }
      }
    );

    return {
      userState,
      currentRoute: route.path,
    };
  },
};
</script>

<style scoped>
.bg-dark {
  background-color: #121212 !important;
}
</style>
