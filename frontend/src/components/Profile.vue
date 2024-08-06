<template>
  <div class="container text-white">
    <div class="row">
      <div class="col-md-6">
        <h2>Profile</h2>
        <form @submit.prevent="saveProfile">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control bg-dark text-white"
              id="username"
              :value="username"
              disabled
            />
          </div>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control bg-dark text-white"
              id="name"
              v-model="name"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control bg-dark text-white"
              id="email"
              v-model="email"
              placeholder="Enter your email"
            />
          </div>
          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea
              class="form-control bg-dark text-white"
              id="bio"
              v-model="bio"
              rows="3"
              placeholder="Enter a short bio"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>

    <!-- Toast component -->
    <div
      class="toast align-items-center text fixed-bottom start-50 translate-middle-x text-bg-primary border-0"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      ref="toast"
      style="margin-bottom: 16px"
    >
      <div class="d-flex">
        <div class="toast-body">{{ toastMessage }}</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          @click="hideToast"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "bootstrap";

export default {
  name: "Profile",
  data() {
    return {
      username: "",
      name: "",
      email: "",
      bio: "",
      toastMessage: "",
      toast: null,
    };
  },
  mounted() {
    this.fetchProfileData();
    this.toast = new Toast(this.$refs.toast);
  },
  methods: {
    fetchProfileData() {
      // Implement API call to fetch profile data
      // This is a placeholder, replace with actual API call
      this.username = "user123";
      this.name = "John Doe";
      this.email = "john@example.com";
      this.bio = "A short bio";
    },
    saveProfile() {
      // Implement API call to save profile data
      // This is a placeholder, replace with actual API call
      console.log("Profile data:", {
        name: this.name,
        email: this.email,
        bio: this.bio,
      });

      // Simulate successful save
      this.displayToast("Profile updated successfully");
    },
    displayToast(message) {
      this.toastMessage = message;
      this.toast.show();
    },
    hideToast() {
      this.toast.hide();
    },
  },
};
</script>

<style scoped>
.form-control {
  background-color: #343a40 !important;
  color: white !important;
}
.form-control:focus {
  background-color: #454d55 !important;
  color: white !important;
}
</style>
