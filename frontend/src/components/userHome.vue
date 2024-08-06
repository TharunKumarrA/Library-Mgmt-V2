<template>
  <div class="container text-white">
    <div class="row mt-5">
      <!-- Welcome and Request Book section -->
      <div class="col-md-6">
        <!-- Welcome section -->
        <div class="p-3 mb-4 bg-dark rounded-3">
          <h1 class="display-4">Welcome, {{ username }}</h1>
          <p class="lead">
            This is your personal library dashboard. Here you can manage your
            borrowed books and explore new ones.
          </p>
        </div>

        <!-- Request book section -->
        <div class="p-3 mb-4 bg-secondary rounded-3">
          <h2 class="h4">Request a Book</h2>
          <p>Explore our collection and request a book to borrow.</p>
          <router-link to="/books" class="btn btn-primary"
            >Request Book</router-link
          >
        </div>

        <!-- Quote section -->
        <div class="p-3 mb-4 bg-dark rounded-3">
          <figure class="text-center">
            <blockquote class="blockquote">
              <p class="mb-0">
                There is more treasure in books than in all the pirate's loot on
                Treasure Island.
              </p>
            </blockquote>
            <figcaption class="blockquote-footer text-light">
              WALT DISNEY<cite title="Source Title" />
            </figcaption>
          </figure>
        </div>
      </div>

      <!-- Books in Hand section -->
      <div class="col-md-6">
        <div class="p-3 mb-4 bg-dark rounded-3">
          <h2 class="h4">Books in Hand</h2>
          <p>Here are the books you currently have borrowed:</p>
          <div class="table-responsive">
            <table class="table table-bordered table-dark table-striped">
              <thead>
                <tr>
                  <th>Book ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="book in borrowedBooks" :key="book[0]">
                  <td>{{ book[0] }}</td>
                  <td>{{ book[1] }}</td>
                  <td>{{ book[2] }}</td>
                  <td class="d-flex">
                    <form @submit.prevent="readBook(book[1])" class="me-2">
                      <input
                        type="submit"
                        class="btn btn-primary btn-sm"
                        value="Read"
                      />
                    </form>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="revokeBook(book[0])"
                    >
                      Revoke
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "../routers/axios.js"; // Adjust the import path if necessary

export default {
  name: "YourComponent",
  setup() {
    const username = ref("");
    const borrowedBooks = ref([]);

    const checkSession = async () => {
      try {
        const response = await axios.get("/check_session");
        if (response.status === 200) {
          const { sessionId, username: user, isAdmin } = response.data;
          localStorage.setItem("sessionId", sessionId);
          localStorage.setItem("username", user);
          localStorage.setItem("isAdmin", isAdmin);
          username.value = user;
          console.log("Session is active");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Not logged in, redirect to login page
          window.location.href = "/login"; // Use window.location.href for navigation
        } else {
          console.error("Error checking session:", error);
        }
      }
    };

    onMounted(() => {
      checkSession();
    });

    return {
      username,
      borrowedBooks,
      checkSession,
    };
  },
  methods: {
    readBook(title) {
      console.log(`Reading book: ${title}`);
    },
    revokeBook(bookId) {
      console.log(`Revoking book with ID: ${bookId}`);
    },
  },
};
</script>

<style scoped>
.table-dark {
  background-color: #343a40;
}
.blockquote-footer {
  color: #adb5bd !important;
}
</style>
