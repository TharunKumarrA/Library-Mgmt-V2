<template>
  <div class="container text-white mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card bg-dark border-light">
          <div class="card-body">
            <h2 class="card-title text-center">Profile</h2>
            <form @submit.prevent="saveProfile">
              <div class="form-group mb-3">
                <label for="username">Username</label>
                <input
                  type="text"
                  class="form-control text-white"
                  id="username"
                  :value="username"
                  disabled
                />
              </div>
              <div class="form-group mb-3">
                <label for="name">Name</label>
                <input
                  type="text"
                  class="form-control text-white"
                  id="name"
                  v-model="name"
                />
              </div>
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control text-white"
                  id="email"
                  v-model="email"
                  placeholder="Enter your email"
                />
              </div>
              <div class="form-group mb-3">
                <label for="bio">Bio</label>
                <textarea
                  class="form-control text-white"
                  id="bio"
                  v-model="bio"
                  rows="3"
                  placeholder="Enter a short bio"
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary w-100">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast component -->
    <div
      class="toast align-items-center text-bg-primary border-0 fixed-bottom start-50 translate-middle-x"
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
.card {
  border-radius: 10px;
  color: white !important;
}

.form-control {
  background-color: #343a40 !important;
  color: white !important;
}

.form-control:focus {
  background-color: #454d55 !important;
  color: white !important;
}

.card-title {
  margin-bottom: 20px;
}

.toast {
  border-radius: 10px;
}
</style>
