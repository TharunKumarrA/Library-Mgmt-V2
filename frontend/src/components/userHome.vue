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
                <tr v-for="book in borrowedBooks" :key="book.id">
                  <td>{{ book.id }}</td>
                  <td>{{ book.title }}</td>
                  <td>{{ book.author }}</td>
                  <td class="d-flex">
                    <form @submit.prevent="readBook(book.title)" class="me-2">
                      <input
                        type="submit"
                        class="btn btn-primary btn-sm"
                        value="Read"
                      />
                    </form>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="revokeBook(book.id)"
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
  name: "LibraryDashboard",
  setup() {
    const username = ref("");
    const isAdmin = ref(false);
    const borrowedBooks = ref([]);

    onMounted(async () => {
      // Retrieve username and isAdmin from localStorage
      username.value = localStorage.getItem("username") || "";
      isAdmin.value = localStorage.getItem("isAdmin") === "true";

      // Fetch borrowed books from the API
      try {
        const response = await axios.get(`/books/borrowed/${username.value}`);
        console.log("API Response:", response.data);
        borrowedBooks.value = response.data.map((book) => ({
          id: book[0],
          title: book[1],
          author: book[2],
        }));
      } catch (error) {
        console.error("Failed to fetch borrowed books:", error);
      }
    });

    const readBook = (title) => {
      console.log(`Reading book: ${title}`);
    };

    const revokeBook = (bookId) => {
      console.log(`Revoking book with ID: ${bookId}`);
    };

    return {
      username,
      isAdmin,
      borrowedBooks,
      readBook,
      revokeBook,
    };
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
