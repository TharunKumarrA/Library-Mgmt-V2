<template>
  <div class="bg-dark text-white min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">LMS</router-link>
        <div class="navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                v-if="currentRoute == '/admin' || isAdmin"
                class="nav-link"
                to="/admin"
                >Home</router-link
              >

              <router-link v-else class="nav-link" to="/"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/books">Books</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/search">Search</router-link>
            </li>
            <li
              class="nav-item"
              v-if="currentRoute !== '/login' && currentRoute !== '/signup'"
            >
              <router-link class="nav-link" to="/profile">Profile</router-link>
            </li>
            <li
              class="nav-item"
              v-if="currentRoute !== '/login' && currentRoute !== '/signup'"
            >
              <router-link class="nav-link" to="/logout">Log out</router-link>
            </li>
            <li class="nav-item" v-if="currentRoute === '/login'">
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
      isAdmin: false,
    };
  },
  watch: {
    $route(to) {
      this.currentRoute = to.path;
    },
  },
  created() {
    this.currentRoute = this.$route.path;
  },
};
</script>

<style scoped>
.bg-dark {
  background-color: #121212 !important;
}
</style>
