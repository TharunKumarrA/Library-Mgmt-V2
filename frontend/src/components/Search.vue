<template>
  <div class="bg-dark text-white min-vh-100 py-5">
    <div class="container">
      <h1 class="text-center mb-5">Search Books</h1>
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card bg-secondary text-white">
            <div class="card-body">
              <h5 class="card-title mb-3">Search Criteria</h5>
              <form @submit.prevent="searchBooks">
                <div class="mb-3">
                  <label for="title" class="form-label">Book Title</label>
                  <input
                    type="text"
                    class="form-control bg-dark text-white"
                    id="title"
                    v-model="searchForm.title"
                    placeholder="Enter book title"
                  />
                </div>
                <div class="mb-3">
                  <label for="author" class="form-label">Author</label>
                  <input
                    type="text"
                    class="form-control bg-dark text-white"
                    id="author"
                    v-model="searchForm.author"
                    placeholder="Enter author name"
                  />
                </div>
                <div class="mb-3">
                  <label for="section" class="form-label">Section</label>
                  <input
                    type="text"
                    class="form-control bg-dark text-white"
                    id="section"
                    v-model="searchForm.section"
                    placeholder="Enter section name"
                  />
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <i class="bi bi-search me-2"></i>
                    {{ loading ? 'Searching...' : 'Search' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <div class="card bg-dark text-white border-light">
            <div class="card-body">
              <h5 class="card-title mb-3">Search Results</h5>
              <div v-if="loading" class="text-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
              <div v-if="error" class="alert alert-danger" role="alert">
                {{ error }}
              </div>
              <div v-if="books.length > 0" class="table-responsive">
                <table class="table table-hover table-dark">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Section ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="book in books" :key="book[0]">
                      <td>{{ book[1] }}</td>
                      <td>{{ book[2] }}</td>
                      <td>{{ book[3] }}</td>
                      <td>
                        <button class="btn btn-sm btn-primary" @click="requestBook(book[0])">
                          Request
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p v-else-if="searched && !loading" class="text-muted">No books found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBooks',
  data() {
    return {
      searchForm: {
        title: '',
        author: '',
        section: ''
      },
      books: [],
      searched: false,
      loading: false,
      error: null
    }
  },
  methods: {
    async searchBooks() {
  this.loading = true;
  this.error = null;
  this.searched = false;
  this.books = [];

  try {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.searchForm),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (Array.isArray(data.books)) {
      this.books = data.books;
    } else {
      throw new Error('Invalid data format received from server');
    }

    this.searched = true;
  } catch (err) {
    console.error('Search error:', err);
    this.error = 'An error occurred while searching. Please try again.';
  } finally {
    this.loading = false;
  }
},
    requestBook(bookId) {
      // Implement book request functionality
      console.log(`Requesting book with ID: ${bookId}`);
    }
  }
}
</script>

<style scoped>
.bg-dark {
  background-color: #121212 !important;
}

.card {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-control {
  background-color: #343a40 !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-control:focus {
  background-color: #454d55 !important;
  color: white !important;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.table-dark {
  color: #fff;
  background-color: #343a40;
}

.table-hover tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.alert-danger {
  background-color: #721c24;
  border-color: #f5c6cb;
  color: #f8d7da;
}

.btn i {
  font-size: 0.9rem;
}
</style>