<template>
  <div class="container text-light">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card bg-dark text-light border-light">
          <div class="card-header bg-secondary">Login</div>
          <div class="card-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input
                  type="text"
                  class="form-control bg-dark text-light border-light"
                  id="username"
                  v-model="username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input
                  type="password"
                  class="form-control bg-dark text-light border-light"
                  id="password"
                  v-model="password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary mt-3 w-100">
                Login
              </button>
              <p class="mt-3">
                Don't have an account?
                <router-link to="/signup" class="text-info"
                  >Sign Up</router-link
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="toastMessage"
      class="toast align-items-center text-light bg-primary border-0 fixed-bottom start-50 translate-middle-x"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      style="margin-bottom: 16px"
    >
      <div class="d-flex">
        <div class="toast-body">{{ toastMessage }}</div>
        <button
          type="button"
          class="btn-close btn-close-light me-2 m-auto"
          @click="closeToast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      toastMessage: "",
    };
  },
  methods: {
    submitForm() {
      // Handle form submission here
      console.log("Form submitted", {
        username: this.username,
        password: this.password,
      });

      // Example: Display toast message on form submission
      this.toastMessage = "Form submitted successfully!";
    },
    closeToast() {
      this.toastMessage = "";
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
.toast {
  margin-bottom: 16px;
}
</style>
