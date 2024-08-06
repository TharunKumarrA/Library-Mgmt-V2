<template>
  <div class="container text-white">
    <h2>User Management</h2>
    <div class="table-responsive">
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Bio</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user[0]">
            <td>{{ user[0] }}</td>
            <td>{{ user[1] }}</td>
            <td>{{ user[3] }}</td>
            <td>{{ user[4] }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                :data-bs-target="'#borrowsModal' + user[0]"
              >
                Borrows
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modals for Borrows -->
    <div
      v-for="(borrows, user_id) in borrowsData"
      :key="user_id"
      :id="'borrowsModal' + user_id"
      class="modal fade"
      tabindex="-1"
      :aria-labelledby="'borrowsModalLabel' + user_id"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header">
            <h5 class="modal-title" :id="'borrowsModalLabel' + user_id">Borrows</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>User: {{ user_id }}</p>
            <p>Books Borrowed:</p>
            <ul>
              <li v-for="borrow in borrows" :key="borrow[0]">
                {{ borrow[1] }}
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManagement',
  data() {
    return {
      users: [],
      borrowsData: {}
    }
  },
  mounted() {
    // Fetch users and borrows data from your API
    this.fetchUsers()
    this.fetchBorrows()
  },
  methods: {
    fetchUsers() {
      // Implement API call to fetch users
      // This is a placeholder, replace with actual API call
      this.users = [
        ['user1', 'John Doe', 'john@example.com', 'Bio 1'],
        ['user2', 'Jane Smith', 'jane@example.com', 'Bio 2'],
      ]
    },
    fetchBorrows() {
      // Implement API call to fetch borrows data
      // This is a placeholder, replace with actual API call
      this.borrowsData = {
        'user1': [
          [1, 'Book 1'],
          [2, 'Book 2']
        ],
        'user2': [
          [3, 'Book 3']
        ]
      }
    }
  }
}
</script>

<style scoped>
.modal-content {
  background-color: #343a40;
}
</style>