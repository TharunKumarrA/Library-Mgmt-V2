<template>
  <div
    class="modal fade show"
    style="display: block"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header">
          <h5 class="modal-title">Add Book</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="$emit('close')"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="book">Upload Book</label>
              <input
                type="file"
                class="form-control bg-dark text-white"
                id="book"
                ref="bookFile"
                accept=".pdf"
                @change="updateTitle"
                required
              />
            </div>
            <div class="form-group">
              <label for="bookTitle">Title</label>
              <input
                type="text"
                class="form-control bg-dark text-white"
                id="bookTitle"
                v-model="bookTitle"
              />
            </div>
            <div class="form-group">
              <label for="bookAuthor">Author</label>
              <input
                type="text"
                class="form-control bg-dark text-white"
                id="bookAuthor"
                v-model="bookAuthor"
                required
              />
            </div>
            <div class="form-group">
              <label for="bookSection">Section ID</label>
              <select
                class="form-control bg-dark text-white"
                id="bookSection"
                v-model="bookSection"
                required
              >
                <option
                  v-for="section in sections"
                  :key="section[0]"
                  :value="section[0]"
                >
                  {{ section[1] }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="bookDesc">Description</label>
              <textarea
                class="form-control bg-dark text-white"
                id="bookDesc"
                v-model="bookDesc"
                rows="3"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="bookCopies">Number of Copies</label>
              <input
                type="number"
                class="form-control bg-dark text-white"
                id="bookCopies"
                v-model="bookCopies"
                min="1"
                required
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="$emit('close')"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AddBookModal",
  props: {
    sections: {
      type: Array,
      required: true,
    },
  },
  emits: ["close", "add-book"],
  setup(props, { emit }) {
    const bookFile = ref(null);
    const bookTitle = ref("");
    const bookAuthor = ref("");
    const bookSection = ref("");
    const bookDesc = ref("");
    const bookCopies = ref(1);

    const updateTitle = () => {
      if (bookFile.value.files.length > 0) {
        const fileName = bookFile.value.files[0].name.replace(".pdf", "");
        bookTitle.value = fileName;
      }
    };

    const submitForm = () => {
      const newBook = {
        title: bookTitle.value,
        author: bookAuthor.value,
        section_id: parseInt(bookSection.value),
        desc: bookDesc.value,
        copies: parseInt(bookCopies.value),
      };
      emit("add-book", newBook);
      emit("close");
    };

    return {
      bookFile,
      bookTitle,
      bookAuthor,
      bookSection,
      bookDesc,
      bookCopies,
      updateTitle,
      submitForm,
    };
  },
};
</script>
