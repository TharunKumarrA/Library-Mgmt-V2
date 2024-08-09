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
          <h5 class="modal-title">Delete Book</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="$emit('close')"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this book?</p>
          <p>
            <strong>{{ bookTitle }}</strong>
          </p>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="deleteBookId">Book ID</label>
              <input
                type="text"
                class="form-control bg-dark text-white"
                id="deleteBookId"
                v-model="deleteBookId"
                readonly
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
              <button type="submit" class="btn btn-danger">Delete</button>
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
  name: "DeleteBookModal",
  props: {
    book: {
      type: Array,
      required: true,
    },
  },
  emits: ["close", "delete-book"],
  setup(props, { emit }) {
    const deleteBookId = ref("");
    const bookTitle = ref("");

    onMounted(() => {
      deleteBookId.value = props.book[0];
      bookTitle.value = props.book[1];
    });

    const submitForm = () => {
      emit("delete-book", parseInt(deleteBookId.value));
      emit("close");
    };

    return {
      deleteBookId,
      bookTitle,
      submitForm,
    };
  },
};
</script>
