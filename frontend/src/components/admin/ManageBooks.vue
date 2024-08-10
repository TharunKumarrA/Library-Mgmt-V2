<template>
  <div class="bg-dark text-white min-vh-100 py-5">
    <div class="container">
      <h1 class="text-center mb-5">Book Management System</h1>
      <div class="row">
        <div class="col-md-3 mb-4">
          <div class="card bg-secondary text-white">
            <div class="card-body">
              <h5 class="card-title mb-3">Actions</h5>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" @click="showModal('add')">
                  <i class="bi bi-plus-circle me-2"></i>Add Book
                </button>
                <button
                  class="btn btn-warning"
                  @click="showModal('edit')"
                  :disabled="!selectedBook"
                >
                  <i class="bi bi-pencil me-2"></i>Edit Book
                </button>
                <button
                  class="btn btn-danger"
                  @click="showModal('delete')"
                  :disabled="!selectedBook"
                >
                  <i class="bi bi-trash me-2"></i>Delete Book
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="card bg-dark text-white border-light">
            <div class="card-body">
              <h5 class="card-title mb-3">Book Inventory</h5>
              <div class="table-responsive">
                <table class="table table-hover table-dark">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Section</th>
                      <th>Description</th>
                      <th>Copies</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="book in books"
                      :key="book[0]"
                      @click="selectBook(book)"
                      :class="{
                        'table-active':
                          selectedBook && selectedBook[0] === book[0],
                      }"
                    >
                      <td>{{ book[0] }}</td>
                      <td>{{ book[1] }}</td>
                      <td>{{ book[2] }}</td>
                      <td>{{ book[3] }}</td>
                      <td>{{ book[4] }}</td>
                      <td>{{ book[5] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals for add, edit, delete -->
    <AddBookModal
      v-if="showAddModal"
      :sections="sections"
      @close="closeModal('add')"
      @add-book="addBook"
    />
    <EditBookModal
      v-if="showEditModal"
      :book="selectedBook"
      :sections="sections"
      @close="closeModal('edit')"
      @edit-book="editBook"
    />
    <DeleteBookModal
      v-if="showDeleteModal"
      :book="selectedBook"
      @close="closeModal('delete')"
      @delete-book="deleteBook"
    />

    <!-- Toast message -->
    <div
      v-if="showToast"
      class="toast-container position-fixed bottom-0 start-50 translate-middle-x p-3"
    >
      <div
        class="toast show text-light bg-primary"
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        <div class="toast-body">
          {{ toastMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import AddBookModal from "./book/AddBookModal.vue";
import EditBookModal from "./book/EditBookModal.vue";
import DeleteBookModal from "./book/DeleteBookModal.vue";

export default {
  name: "ManageBooks",
  components: {
    AddBookModal,
    EditBookModal,
    DeleteBookModal,
  },
  setup() {
    const books = ref([]);
    const sections = ref([]);
    const selectedBook = ref(null);
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const toastMessage = ref("");
    const showToast = ref(false);

    const fetchBooks = async () => {
      try {
        const response = await axios.get("/books");
        books.value = response.data;
      } catch (error) {
        console.error("Error fetching books:", error);
        displayToast("Error fetching books");
      }
    };

    const fetchSections = async () => {
      try {
        const response = await axios.get("/sections");
        sections.value = response.data;
      } catch (error) {
        console.error("Error fetching sections:", error);
        displayToast("Error fetching sections");
      }
    };

    onMounted(async () => {
      await fetchBooks();
      await fetchSections();
    });

    const showModal = (type) => {
      if (type === "add") showAddModal.value = true;
      if (type === "edit" && selectedBook.value) showEditModal.value = true;
      if (type === "delete" && selectedBook.value) showDeleteModal.value = true;
    };

    const closeModal = (type) => {
      if (type === "add") showAddModal.value = false;
      if (type === "edit") showEditModal.value = false;
      if (type === "delete") showDeleteModal.value = false;
    };

    const selectBook = (book) => {
      selectedBook.value = book;
    };

    const addBook = async () => {
      await fetchBooks();
      displayToast("Book added successfully");
    };

    const editBook = async (updatedBook) => {
      try {
        await axios.put("/manage/books", updatedBook);
        await fetchBooks();
        selectedBook.value = updatedBook;
        displayToast("Book updated successfully");
      } catch (error) {
        console.error("Error updating book:", error);
        displayToast("Error updating book");
      }
    };

    const deleteBook = async (bookId) => {
      try {
        await axios.delete("/manage/books", { data: { id: bookId } });
        await fetchBooks();
        selectedBook.value = null;
        displayToast("Book deleted successfully");
      } catch (error) {
        console.error("Error deleting book:", error);
        displayToast("Error deleting book");
      }
    };

    const displayToast = (message) => {
      toastMessage.value = message;
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    };

    return {
      books,
      sections,
      selectedBook,
      showAddModal,
      showEditModal,
      showDeleteModal,
      toastMessage,
      showToast,
      showModal,
      closeModal,
      selectBook,
      addBook,
      editBook,
      deleteBook,
    };
  },
};
</script>

<style scoped>
.bg-dark {
  background-color: #121212 !important;
}

.card {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table-dark {
  color: #fff;
  background-color: #343a40;
}

.table-active {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.table th,
.table td {
  vertical-align: middle;
}

.btn i {
  font-size: 0.9rem;
}
</style>
