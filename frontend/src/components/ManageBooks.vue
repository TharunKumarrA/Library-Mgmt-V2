<template>
  <div
    class="d-flex justify-content-center align-items-center bg-dark text-white"
  >
    <div class="container">
      <!-- Button group for add, edit, delete -->
      <div class="row mb-4">
        <div class="col-md-3">
          <div class="btn-group-vertical" role="group">
            <button
              type="button"
              class="btn btn-primary btn-block mb-3"
              @click="showModal('add')"
            >
              Add Book
            </button>
            <button
              type="button"
              class="btn btn-secondary btn-block mb-3"
              @click="showModal('edit')"
              :disabled="!selectedBook"
            >
              Edit Book
            </button>
            <button
              type="button"
              class="btn btn-danger btn-block"
              @click="showModal('delete')"
              :disabled="!selectedBook"
            >
              Delete Book
            </button>
          </div>
        </div>
        <div class="col-md-9">
          <!-- Table to display books -->
          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Section ID</th>
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
                  'table-active': selectedBook && selectedBook[0] === book[0],
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
          @click="closeToast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
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

    const addBook = (book) => {
      books.value.push(book);
      displayToast("Book added successfully");
    };

    const editBook = (updatedBook) => {
      const index = books.value.findIndex((b) => b[0] === updatedBook[0]);
      if (index !== -1) {
        books.value[index] = updatedBook;
        selectedBook.value = updatedBook;
        displayToast("Book updated successfully");
      }
    };

    const deleteBook = (bookId) => {
      books.value = books.value.filter((b) => b[0] !== bookId);
      selectedBook.value = null;
      displayToast("Book deleted successfully");
    };

    const displayToast = (message) => {
      toastMessage.value = message;
      const toast = new bootstrap.Toast(document.querySelector(".toast"));
      toast.show();
    };

    const closeToast = () => {
      const toast = bootstrap.Toast.getInstance(
        document.querySelector(".toast")
      );
      toast.hide();
    };

    onMounted(() => {
      // Fetch books and sections data from API or store
      // For now, we'll use dummy data
      books.value = [
        [1, "Book 1", "Author 1", 1, "Description 1", 5],
        [2, "Book 2", "Author 2", 2, "Description 2", 3],
        [3, "Book 3", "Author 3", 1, "Description 3", 7],
      ];
      sections.value = [
        [1, "Section 1"],
        [2, "Section 2"],
      ];
    });

    return {
      books,
      sections,
      selectedBook,
      showAddModal,
      showEditModal,
      showDeleteModal,
      toastMessage,
      showModal,
      closeModal,
      selectBook,
      addBook,
      editBook,
      deleteBook,
      displayToast,
      closeToast,
    };
  },
};
</script>

<style scoped>
.bg-dark {
  background-color: #121212 !important;
}

.table-dark {
  color: #fff;
  background-color: #343a40;
}

.table-active {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>
