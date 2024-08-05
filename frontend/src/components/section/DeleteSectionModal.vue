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
          <h5 class="modal-title">Delete Section</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            @click="$emit('close')"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete this section?</p>
          <p>{{ sectionName }}</p>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="deleteSectionId">Section ID</label>
              <input
                type="text"
                class="form-control bg-dark text-white"
                id="deleteSectionId"
                v-model="sectionId"
                required
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
              <button type="submit" class="btn btn-danger">
                Delete Section
              </button>
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
  name: "DeleteSectionModal",
  props: {
    section: {
      type: Array,
      required: true,
    },
  },
  emits: ["close", "delete-section"],
  setup(props, { emit }) {
    const sectionId = ref(props.section[0]);
    const sectionName = ref(props.section[1]);

    const submitForm = () => {
      emit("delete-section", sectionId.value);
      emit("close");
    };

    return {
      sectionId,
      sectionName,
      submitForm,
    };
  },
};
</script>
