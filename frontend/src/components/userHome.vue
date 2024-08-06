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
export default {
  name: "Home",
  data() {
    return {
      borrowedBooks: [],
      username: "Tharun", // You'll need to set this from your authentication system
    };
  },
  mounted() {
    this.fetchBorrowedBooks();
  },
  methods: {
    async fetchBorrowedBooks() {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/borrowed-books");
        if (!response.ok) {
          throw new Error("Failed to fetch borrowed books");
        }
        this.borrowedBooks = await response.json();
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
        // You might want to show an error message to the user here
      }
    },
    async revokeBook(bookId) {
      try {
        const response = await fetch(`/api/revoke/${this.username}/${bookId}`, {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Failed to revoke book");
        }
        // Refresh the borrowed books list
        this.fetchBorrowedBooks();
      } catch (error) {
        console.error("Error revoking book:", error);
        // You might want to show an error message to the user here
      }
    },
    readBook(title) {
      // Implement your read book functionality here
      console.log(`Reading book: ${title}`);
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
