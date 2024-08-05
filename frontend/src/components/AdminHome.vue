<template>
  <div class="container text-white mt-5">
    <div class="row">
      <div class="col-md-12 text-center mb-4">
        <h1 class="display-4">Welcome, {{ name }}!</h1>
        <p class="lead">
          You're now logged in as an admin. What would you like to do?
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3" v-for="option in options" :key="option.title">
        <div class="card bg-dark text-white border-light">
          <div class="card-body text-center">
            <img
              :src="option.image"
              class="img-fluid mb-3"
              :alt="option.title"
            />
            <h5 class="card-title">{{ option.title }}</h5>
            <router-link :to="option.link" class="btn btn-primary">
              Go to {{ option.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminHome",
  data() {
    return {
      name: "Admin",
      options: [
        {
          title: "Manage Books",
          image: new URL("@/assets/images/books.webp", import.meta.url).href,
          link: "/manage-books",
        },
        {
          title: "Manage Sections",
          image: new URL("@/assets/images/sections.svg", import.meta.url).href,
          link: "/manage-sections",
        },
        {
          title: "Manage Users",
          image: new URL("@/assets/images/user.png", import.meta.url).href,
          link: "/manage-users",
        },
        {
          title: "Manage Requests",
          image: new URL("@/assets/images/requests.svg", import.meta.url).href,
          link: "/manage-requests",
        },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.card {
  transition: transform 0.3s;
}
.card:hover {
  transform: scale(1.05);
}
</style>
