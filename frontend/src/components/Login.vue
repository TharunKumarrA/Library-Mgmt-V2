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
                <router-link to="/signup" class="text-info">
                  Sign Up
                </router-link>
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
import axios from "../routers/axios.js"; // Adjust the import path if necessary
import { Toast } from "bootstrap";

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
    async submitForm() {
      const apiUrl = "/login";
      const requestData = {
        username: this.username,
        password: this.password,
      };

      console.log("Submitting form with data:", requestData);
      console.log("API URL:", apiUrl);

      try {
        const response = await axios.post(apiUrl, requestData);

        console.log("Response status:", response.status);
        console.log("Response data:", response.data);

        if (response.status === 200) {
          this.toastMessage = "Login successful!";
          this.$router.push("/"); // Redirect to a different page after successful login
        }
      } catch (error) {
        console.error("Error occurred:", error);

        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);

          switch (error.response.status) {
            case 400:
              this.toastMessage = "Bad request. Please check your input.";
              break;
            case 401:
              this.toastMessage = "Invalid credentials. Please try again.";
              break;
            case 500:
              this.toastMessage =
                "An error occurred on the server. Please try again later.";
              break;
            default:
              this.toastMessage = "An error occurred. Please try again.";
          }
        } else {
          this.toastMessage = "Network error. Please check your connection.";
        }
      } finally {
        this.$nextTick(() => {
          if (this.toastMessage) {
            const toastElement = document.querySelector(".toast");
            if (toastElement) {
              const toast = new Toast(toastElement);
              toast.show();
            }
          }
        });
      }
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
