<template>
  <div
    class="d-flex bg-dark text-white min-vh-100 py-5"
  >
    <div class="container">
      <h1 class="text-center mb-5">Section Management System</h1>
      <div class="row">
        <div class="col-md-3 mb-4">
          <div class="card bg-secondary text-white">
            <div class="card-body">
              <h5 class="card-title mb-3">Actions</h5>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" @click="showModal('add')">
                  <i class="bi bi-plus-circle me-2"></i>Add Section
                </button>
                <button
                  class="btn btn-warning"
                  @click="showModal('edit')"
                  :disabled="!selectedSection"
                >
                  <i class="bi bi-pencil me-2"></i>Edit Section
                </button>
                <button
                  class="btn btn-danger"
                  @click="showModal('delete')"
                  :disabled="!selectedSection"
                >
                  <i class="bi bi-trash me-2"></i>Delete Section
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="card bg-dark text-white border-light">
            <div class="card-body">
              <h5 class="card-title mb-3">Sections Inventory</h5>
              <div class="table-responsive">
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

.btn i {
  font-size: 0.9rem;
}
</style>
