<template>
  <div class="bg-dark text-white min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">MyApp</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              class="nav-item"
              v-if="currentRoute === '/' || currentRoute === '/admin'"
            >
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li
              class="nav-item"
              v-if="currentRoute === '/' || currentRoute === '/admin'"
            >
              <router-link class="nav-link" to="/admin">Admin</router-link>
            </li>
            <li class="nav-item" v-if="currentRoute === '/login'">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item" v-if="currentRoute === '/login'">
              <router-link class="nav-link" to="/signup">Sign Up</router-link>
            </li>
            <li class="nav-item" v-if="currentRoute === '/signup'">
              <router-link class="nav-link" to="/signup">Sign Up</router-link>
            </li>
            <li class="nav-item" v-if="currentRoute === '/signup'">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      currentRoute: this.$route.path,
    };
  },
  watch: {
    $route(to) {
      this.currentRoute = to.path;
    },
  },
};
</script>

<style scoped>
.bg-dark {
  background-color: #121212 !important;
}
</style>
