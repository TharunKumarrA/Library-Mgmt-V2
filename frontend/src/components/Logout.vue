<template>
  <div>Logging out...</div>
</template>

<script>
import { inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "../routers/axios.js";

export default {
  name: "Logout",
  setup() {
    const userState = inject("userState");
    const router = useRouter();

    const logout = async () => {
      console.log("Initiating logout process...");

      try {
        const response = await axios.post("/logout");
        console.log("Logout API response:", response.data);

        localStorage.removeItem("sessionId");
        localStorage.removeItem("username");
        localStorage.removeItem("isAdmin");

        userState.isLoggedIn = false;
        userState.isAdmin = false;
        userState.username = "";

        // Log the state after logout
        console.log("Logout successful, redirecting to login page...");
        router.push("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
        }
        console.log("Redirecting to login page due to error...");
        router.push("/login");
      }
    };

    onMounted(() => {
      console.log("Logout component mounted, calling logout function...");
      logout();
    });

    return {};
  },
};
</script>
