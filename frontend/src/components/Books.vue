<template>
  <div class="container text-white py-5">
    <h1 class="mb-4 text-center">Library Catalog</h1>
    <div class="table-responsive">
      <table class="table table-hover table-dark">
        <thead class="thead-light">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Copies Available</th>
            <th v-if="!isAdmin">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book[0]">
            <td>{{ book[1] }}</td>
            <td>{{ book[2] }}</td>
            <td>{{ book[5] }}</td>
            <td v-if="!isAdmin">
              <button
                class="btn btn-primary btn-sm"
                @click="openRequestModal(book[0])"
              >
                Request Book
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Request Modal -->
    <div
      class="modal fade"
      id="requestModal"
      tabindex="-1"
      aria-labelledby="requestModalLabel"
      aria-hidden="true"
      ref="modal"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header border-bottom border-secondary">
            <h5 class="modal-title" id="requestModalLabel">
              Request Book: {{ selectedBook ? selectedBook[1] : "" }}
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitRequest">
              <input type="hidden" name="action" value="request" />
              <input
                type="hidden"
                name="book_id"
                :value="selectedBook ? selectedBook[0] : ''"
              />
              <input type="hidden" name="current_date" :value="currentDate" />
              <div class="mb-3">
                <label
                  :for="'requestDate' + (selectedBook ? selectedBook[0] : '')"
                  class="form-label"
                  >Return By</label
                >
                <input
                  type="input"
                  class="form-control bg-secondary text-white"
                  :id="'requestDate' + (selectedBook ? selectedBook[0] : '')"
                  :value="tillDate"
                  disabled
                />
              </div>
            </form>
          </div>
          <div class="modal-footer border-top border-secondary">
            <button
              type="button"
              class="btn btn-outline-light"
              @click="closeModal"
            >
              Cancel
            </button>
            <button type="button" @click="submitRequest" class="btn btn-danger">
              Confirm Request
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast component -->
    <div
      class="toast align-items-center text-white bg-primary border-0 position-fixed bottom-0 start-50 translate-middle-x mb-4"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref="toast"
    >
      <div class="d-flex">
        <div class="toast-body">{{ toastMessage }}</div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          @click="hideToast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal, Toast } from "bootstrap";
import axios from "axios";

export default {
  name: "AllBooks",
  data() {
    return {
      books: [],
      selectedBook: null,
      currentDate: new Date().toISOString().split("T")[0],
      tillDate: "",
      toastMessage: "",
      modal: null,
      toast: null,
      isAdmin: false,
    };
  },
  mounted() {
    this.fetchBooks();
    this.modal = new Modal(this.$refs.modal);
    this.toast = new Toast(this.$refs.toast);
    this.calculateTillDate();
    this.checkAdminStatus();
  },
  methods: {
    fetchBooks() {
      axios
        .get("/books") // Update the URL to match your backend endpoint
        .then((response) => {
          this.books = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the books!", error);
        });
    },
    openRequestModal(bookId) {
      console.log("Opening modal for book ID:", bookId);
      this.selectedBook = this.books.find((book) => book[0] === bookId);
      if (this.selectedBook) {
        this.modal.show();
      }
    },
    closeModal() {
      this.modal.hide();
    },
    submitRequest() {
      if (!this.selectedBook) {
        console.error("No book selected");
        return;
      }

      console.log("Submitting request for book:", this.selectedBook);

      const requestData = {
        username: localStorage.getItem("username"), // assuming you store the username in localStorage
        book_id: this.selectedBook[0],
        start_date: this.currentDate,
        end_date: this.tillDate,
      };

      // Make a POST request to submit the book request
      axios
        .post("/books/request", requestData)
        .then((response) => {
          this.displayToast("Book requested successfully");
          this.closeModal();
          this.fetchBooks(); // Refresh book data to update available copies
        })
        .catch((error) => {
          console.error("There was an error submitting the request!", error);
          this.displayToast("Failed to request the book");
        });
    },

    calculateTillDate() {
      const date = new Date();
      date.setDate(date.getDate() + 14); // 14 days from now
      this.tillDate = date.toISOString().split("T")[0];
    },
    displayToast(message) {
      this.toastMessage = message;
      this.toast.show();
    },
    hideToast() {
      this.toast.hide();
    },
    checkAdminStatus() {
      this.isAdmin = localStorage.getItem("isAdmin") === "true";
    },
  },
};
</script>

<style scoped>
.table {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.table thead th {
  background-color: #343a40;
  border-color: #454d55;
}

.table-hover tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.075);
}

.modal-content {
  background-color: #343a40 !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-control:disabled {
  background-color: #6c757d !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-close:focus {
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.toast {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>
