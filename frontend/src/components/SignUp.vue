<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card bg-dark text-light border-light">
          <div class="card-header bg-secondary">Register</div>
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
                <label for="name" class="form-label">Name:</label>
                <input
                  type="text"
                  class="form-control bg-dark text-light border-light"
                  id="name"
                  v-model="name"
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
              <div class="mb-3">
                <label for="confirmPassword" class="form-label"
                  >Confirm Password:</label
                >
                <input
                  type="password"
                  class="form-control bg-dark text-light border-light"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  required
                />
              </div>
              <div class="mb-3 form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAdmin"
                  v-model="isAdmin"
                />
                <label class="form-check-label" for="isAdmin">Admin</label>
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="!isFormValid"
              >
                Register
              </button>
              <p class="mt-3">
                Already have an account?
                <router-link to="/login" class="text-info">Login</router-link>
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
  name: "SignUp",
  data() {
    return {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
      toastMessage: "",
    };
  },
  computed: {
    isFormValid() {
      return (
        this.password === this.confirmPassword && this.username && this.name
      );
    },
  },
  methods: {
    submitForm() {
      // Handle form submission here
      console.log("Form submitted", {
        username: this.username,
        name: this.name,
        password: this.password,
        isAdmin: this.isAdmin,
      });

      // Example: Display toast message on form submission
      this.toastMessage = "Registration successful!";
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
</style>
