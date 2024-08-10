<template>
  <div class="container text-white">
    <div class="text-center mb-5">
      <h1>Book Requests</h1>
    </div>
    <table class="table table-bordered table-dark">
      <thead>
        <tr>
          <th>Username</th>
          <th>Title</th>
          <th>Author</th>
          <th>Borrow Date</th>
          <th>Return Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="request in requests" :key="request[0]">
          <td>{{ request[1] }}</td>
          <td>{{ request[6] }}</td>
          <td>{{ request[7] }}</td>
          <td>{{ request[3] }}</td>
          <td>{{ request[4] }}</td>
          <td>
            <form v-if="request[5] === 0" @submit.prevent="issueBook(request)">
              <input type="hidden" name="username" :value="request[1]" />
              <input type="hidden" name="request_id" :value="request[0]" />
              <button type="submit" class="btn btn-success">Issue Book</button>
            </form>
            <form
              v-else-if="request[5] === 1"
              @submit.prevent="revokeBook(request)"
            >
              <input type="hidden" name="username" :value="request[1]" />
              <input type="hidden" name="book_id" :value="request[2]" />
              <button type="submit" class="btn btn-danger">Revoke Book</button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BookRequests",
  data() {
    return {
      requests: [],
    };
  },
  mounted() {
    this.fetchRequests();
  },
  methods: {
    async fetchRequests() {
      try {
        const response = await axios.get("/requests");
        this.requests = response.data;
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    },
    async issueBook(request) {
      try {
        const response = await axios.post("/issue", {
          request_id: request[0],
        });
        if (response.status === 200) {
          this.fetchRequests(); // Refresh the list after issuing the book
        }
      } catch (error) {
        console.error("Error issuing book:", error);
      }
    },
    async revokeBook(request) {
      try {
        const response = await axios.post(
          `/revoke/${request[1]}/${request[2]}`
        );
        if (response.status === 200) {
          this.fetchRequests(); // Refresh the list after revoking the book
        }
      } catch (error) {
        console.error("Error revoking book:", error);
      }
    },
  },
};
</script>

<style scoped>
.table-dark {
  background-color: #343a40;
}
</style>
