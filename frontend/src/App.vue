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
import { useRoute } from "vue-router";

export default {
  name: "App",
  setup() {
    const userState = inject("userState");
    const route = useRoute();

    const checkSession = () => {
      const sessionId = localStorage.getItem("sessionId");
      const username = localStorage.getItem("username");
      const isAdmin = localStorage.getItem("isAdmin");

      if (sessionId && username) {
        userState.isLoggedIn = true;
        userState.isAdmin = isAdmin === "true";
        userState.username = username;
      } else {
        userState.isLoggedIn = false;
        userState.isAdmin = false;
        userState.username = "";
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
          // Redirect to login if no valid session
          route.push("/login");
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
