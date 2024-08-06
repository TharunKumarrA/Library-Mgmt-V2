<template>
  <div class="container text-white">
    <h1>Search Books</h1>
    <form @submit.prevent="searchBooks">
      <div class="form-group mb-3">
        <label for="title" class="form-label">Book Title</label>
        <input
          type="text"
          class="form-control bg-dark text-white"
          id="title"
          v-model="searchForm.title"
          placeholder="Enter book title"
        />
      </div>
      <div class="form-group mb-3">
        <label for="author" class="form-label">Author</label>
        <input
          type="text"
          class="form-control bg-dark text-white"
          id="author"
          v-model="searchForm.author"
          placeholder="Enter author name"
        />
      </div>
      <div class="form-group mb-3">
        <label for="section" class="form-label">Section</label>
        <input
          type="text"
          class="form-control bg-dark text-white"
          id="section"
          v-model="searchForm.section"
          placeholder="Enter section name"
        />
      </div>
      <button type="submit" class="btn btn-primary mt-3" :disabled="loading">
        {{ loading ? "Searching..." : "Search" }}
      </button>
    </form>

    <hr class="bg-light my-4" />

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <div v-if="books.length > 0">
      <h2>Search Results</h2>
      <div class="table-responsive">
        <table class="table table-bordered table-dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Section ID</th>
              <!-- Add more columns as needed -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book[0]">
              <td>{{ book[1] }}</td>
              <td>{{ book[2] }}</td>
              <td>{{ book[3] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p v-else-if="searched && !loading" class="text-muted">No books found.</p>
  </div>
</template>

<script>
export default {
  name: "SearchBooks",
  data() {
    return {
      searchForm: {
        title: "",
        author: "",
        section: "",
      },
      books: [],
      searched: false,
      loading: false,
      error: null,
    };
  },
  methods: {
    async searchBooks() {
      this.loading = true;
      this.error = null;
      this.searched = false;
      this.books = [];

      try {
        // Replace this with your actual API call
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.searchForm),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          this.books = data;
        } else {
          throw new Error("Invalid data format received from server");
        }

        this.searched = true;
      } catch (err) {
        console.error("Search error:", err);
        this.error = "An error occurred while searching. Please try again.";
      } finally {
        this.loading = false;
      }
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
.table-dark {
  background-color: #343a40;
}
.alert-danger {
  background-color: #721c24;
  border-color: #f5c6cb;
  color: #f8d7da;
}
</style>
