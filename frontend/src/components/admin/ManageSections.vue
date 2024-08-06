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
              Add Section
            </button>
            <button
              type="button"
              class="btn btn-secondary btn-block mb-3"
              @click="showModal('edit')"
              :disabled="!selectedSection"
            >
              Edit Section
            </button>
            <button
              type="button"
              class="btn btn-danger btn-block"
              @click="showModal('delete')"
              :disabled="!selectedSection"
            >
              Delete Section
            </button>
          </div>
        </div>
        <div class="col-md-9">
          <!-- Table to display sections -->
          <table class="table table-hover table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="section in sections"
                :key="section[0]"
                @click="selectSection(section)"
                :class="{
                  'table-active':
                    selectedSection && selectedSection[0] === section[0],
                }"
              >
                <td>{{ section[0] }}</td>
                <td>{{ section[1] }}</td>
                <td>{{ section[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals for add, edit, delete -->
    <AddSectionModal
      v-if="showAddModal"
      @close="closeModal('add')"
      @add-section="addSection"
    />
    <EditSectionModal
      v-if="showEditModal"
      :section="selectedSection"
      @close="closeModal('edit')"
      @edit-section="editSection"
    />
    <DeleteSectionModal
      v-if="showDeleteModal"
      :section="selectedSection"
      @close="closeModal('delete')"
      @delete-section="deleteSection"
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
import AddSectionModal from "./section/AddSectionModal.vue";
import EditSectionModal from "./section/EditSectionModal.vue";
import DeleteSectionModal from "./section/DeleteSectionModal.vue";

export default {
  name: "ManageSections",
  components: {
    AddSectionModal,
    EditSectionModal,
    DeleteSectionModal,
  },
  setup() {
    const sections = ref([]);
    const selectedSection = ref(null);
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const showDeleteModal = ref(false);
    const toastMessage = ref("");

    const showModal = (type) => {
      if (type === "add") showAddModal.value = true;
      if (type === "edit" && selectedSection.value) showEditModal.value = true;
      if (type === "delete" && selectedSection.value)
        showDeleteModal.value = true;
    };

    const closeModal = (type) => {
      if (type === "add") showAddModal.value = false;
      if (type === "edit") showEditModal.value = false;
      if (type === "delete") showDeleteModal.value = false;
    };

    const selectSection = (section) => {
      selectedSection.value = section;
    };

    const addSection = (section) => {
      sections.value.push(section);
      displayToast("Section added successfully");
    };

    const editSection = (updatedSection) => {
      const index = sections.value.findIndex((s) => s[0] === updatedSection[0]);
      if (index !== -1) {
        sections.value[index] = updatedSection;
        selectedSection.value = updatedSection;
        displayToast("Section updated successfully");
      }
    };

    const deleteSection = (sectionId) => {
      sections.value = sections.value.filter((s) => s[0] !== sectionId);
      selectedSection.value = null;
      displayToast("Section deleted successfully");
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
      // Fetch sections data from API or store
      // For now, we'll use dummy data
      sections.value = [
        [1, "Section 1", "Description 1"],
        [2, "Section 2", "Description 2"],
        [3, "Section 3", "Description 3"],
      ];
    });

    return {
      sections,
      selectedSection,
      showAddModal,
      showEditModal,
      showDeleteModal,
      toastMessage,
      showModal,
      closeModal,
      selectSection,
      addSection,
      editSection,
      deleteSection,
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
