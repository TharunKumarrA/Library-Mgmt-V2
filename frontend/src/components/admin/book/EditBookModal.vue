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
          <h5 class="modal-title">Edit Book</h5>
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
              <label for="editBookId">Book ID</label>
              <input
                type="text"
                class="form-control bg-dark text-white"
                id="editBookId"
                v-model="editBookId"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="editBookTitle">Title</label>
              <input
                type="text"
                class="form-control bg-dark text-white"
                id="editBookTitle"
                v-model="editBookTitle"
              />
            </div>
            <div class="form-group">
              <label for="editBookAuthor">Author</label>
              <input
                type="text"
                class="form-control bg-dark text-white"
                id="editBookAuthor"
                v-model="editBookAuthor"
              />
            </div>
            <div class="form-group">
              <label for="editBookSection">Section ID</label>
              <select
                class="form-control bg-dark text-white"
                id="editBookSection"
                v-model="editBookSection"
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
              <label for="editBookDesc">Description</label>
              <textarea
                class="form-control bg-dark text-white"
                id="editBookDesc"
                v-model="editBookDesc"
                rows="3"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="editBookCopies">Number of Copies</label>
              <input
                type="number"
                class="form-control bg-dark text-white"
                id="editBookCopies"
                v-model="editBookCopies"
                min="1"
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
              <button type="submit" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  name: "EditBookModal",
  props: {
    book: {
      type: Array,
      required: true,
    },
    sections: {
      type: Array,
      required: true,
    },
  },
  emits: ["close", "edit-book"],
  setup(props, { emit }) {
    const editBookId = ref("");
    const editBookTitle = ref("");
    const editBookAuthor = ref("");
    const editBookSection = ref("");
    const editBookDesc = ref("");
    const editBookCopies = ref(1);

    onMounted(() => {
      editBookId.value = props.book[0];
      editBookTitle.value = props.book[1];
      editBookAuthor.value = props.book[2];
      editBookSection.value = props.book[3];
      editBookDesc.value = props.book[4];
      editBookCopies.value = props.book[5];
    });

    const submitForm = () => {
      const updatedBook = {
        id: parseInt(editBookId.value),
        title: editBookTitle.value,
        author: editBookAuthor.value,
        section_id: parseInt(editBookSection.value),
        desc: editBookDesc.value,
        copies: parseInt(editBookCopies.value),
      };
      emit("edit-book", updatedBook);
      emit("close");
    };

    return {
      editBookId,
      editBookTitle,
      editBookAuthor,
      editBookSection,
      editBookDesc,
      editBookCopies,
      submitForm,
    };
  },
};
</script>
