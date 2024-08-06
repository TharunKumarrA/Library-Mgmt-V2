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
          <h5 class="modal-title">Add Section</h5>
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
              <label for="sectionName">Section Name</label>
              <input
                type="text"
                class="form-control bg-dark text-white"
                id="sectionName"
                v-model="sectionName"
                required
              />
            </div>
            <div class="form-group">
              <label for="sectionDesc">Section Description</label>
              <textarea
                class="form-control bg-dark text-white"
                id="sectionDesc"
                v-model="sectionDesc"
                rows="3"
              ></textarea>
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
import { ref } from "vue";

export default {
  name: "AddSectionModal",
  emits: ["close", "add-section"],
  setup(props, { emit }) {
    const sectionName = ref("");
    const sectionDesc = ref("");

    const submitForm = () => {
      emit("add-section", [Date.now(), sectionName.value, sectionDesc.value]);
      emit("close");
    };

    return {
      sectionName,
      sectionDesc,
      submitForm,
    };
  },
};
</script>
