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
          <h5 class="modal-title">Edit Section</h5>
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
              <label for="editSectionId">Section ID</label>
              <input
                type="text"
                class="form-control bg-dark text-white"
                id="editSectionId"
                v-model="sectionId"
                required
                readonly
              />
            </div>
            <div class="form-group">
              <label for="editSectionName">Section Name</label>
              <input
                type="text"
                class="form-control bg-dark text-white"
                id="editSectionName"
                v-model="sectionName"
                required
              />
            </div>
            <div class="form-group">
              <label for="editSectionDesc">Section Description</label>
              <textarea
                class="form-control bg-dark text-white"
                id="editSectionDesc"
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
import axios from "axios";

export default {
  name: "EditSectionModal",
  props: {
    section: {
      type: Array,
      required: true,
    },
  },
  emits: ["close", "edit-section"],
  setup(props, { emit }) {
    const sectionId = ref(props.section[0]);
    const sectionName = ref(props.section[1]);
    const sectionDesc = ref(props.section[2]);

    const submitForm = async () => {
      try {
        await axios.put("/manage/sections", {
          id: sectionId.value,
          name: sectionName.value,
          desc: sectionDesc.value,
        });
        emit("edit-section", [
          sectionId.value,
          sectionName.value,
          sectionDesc.value,
        ]);
        emit("close");
      } catch (error) {
        console.error("Error editing section:", error);
      }
    };

    return {
      sectionId,
      sectionName,
      sectionDesc,
      submitForm,
    };
  },
};
</script>
