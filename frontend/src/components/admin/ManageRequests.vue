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
              <input type="hidden" name="action" value="ISSUE" />
              <button type="submit" class="btn btn-success">Issue Book</button>
            </form>
            <form
              v-else-if="request[5] === 1"
              @submit.prevent="revokeBook(request)"
            >
              <input type="hidden" name="username" :value="request[1]" />
              <input type="hidden" name="book_id" :value="request[2]" />
              <input type="hidden" name="action" value="REVOKE" />
              <button type="submit" class="btn btn-danger">Revoke Book</button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
    fetchRequests() {
      // Implement API call to fetch book requests
      // This is a placeholder, replace with actual API call
      this.requests = [
        [
          1,
          "user1",
          "book1",
          "2023-05-01",
          "2023-05-15",
          0,
          "Book Title 1",
          "Author 1",
        ],
        [
          2,
          "user2",
          "book2",
          "2023-05-02",
          "2023-05-16",
          1,
          "Book Title 2",
          "Author 2",
        ],
      ];
    },
    issueBook(request) {
      console.log("Issue Book Form Data:", {
        username: request[1],
        request_id: request[0],
        action: "ISSUE",
      });
      // Implement API call to issue book
      // This is a placeholder, replace with actual API call
      // After successful API call, update the requests data
    },
    revokeBook(request) {
      console.log("Revoke Book Form Data:", {
        username: request[1],
        book_id: request[2],
        action: "REVOKE",
      });
      // Implement API call to revoke book
      // This is a placeholder, replace with actual API call
      // After successful API call, update the requests data
    },
  },
};
</script>

<style scoped>
.table-dark {
  background-color: #343a40;
}
</style>
