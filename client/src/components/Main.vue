<template>
  <nav class="panel">
    <div class="panel-block">
      <div class="column is-flex">
        <nav class="pagination is-right" role="navigation" aria-label="pagination">
          <button
            class="pagination-previous"
            @click="currentPage = currentPage - 1"
            :disabled="currentPage == 1"
          >Previous</button>
          <button
            class="pagination-next"
            @click="currentPage = currentPage + 1"
            :disabled="currentPage == totalCount/limit"
          >Next page</button>
          <ul class="pagination-list">
            <li>
              <a
                @click="order = 'ascending'"
                :disabled="order == 'ascending'"
                class="pagination-link"
              >
                <span class="icon is-small">
                  <i class="fas fa-caret-up"></i>
                </span>
              </a>
            </li>
            <li>
              <a
                @click="order = 'descending'"
                :disabled="order == 'descending'"
                class="pagination-link"
              >
                <span class="icon is-small">
                  <i class="fas fa-caret-down"></i>
                </span>
              </a>
            </li>
            <li>
              <button
                @click="generateNumbers()"
                class="pagination-link has-text-link"
              >Generate Numbers</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="panel-block">
      <div class="column is-flex">
        <div>
          <span>Page {{currentPage}} of {{totalCount / limit}}</span>
        </div>
      </div>
    </div>
    <p v-if="!numbers.length" class="panel-block">You haven't generated any phone number</p>
    <div v-for="number in paginatedNumbers" :key="number.id" class="panel-block">
      <div class="column is-one-quarter is-flex" id="list" style="margin: 0 10px;">
        <p>
          <i class="fas fa-mobile-alt" aria-hidden="true"></i>
          {{number.value}}
        </p>
      </div>
      <div class="column">
        <p class="is-pulled-right is-size-7 has-text-grey">
          {{new Date(number.timestamp).toUTCString()}}
        </p>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Main',
  data() {
    return {
      numbers: [],
      currentPage: 1,
      limit: 10,
      totalCount: 0,
      order: 'descending'
    };
  },
  mounted() {
    this.generateNumbers();
  },
  methods: {
    async generateNumbers() {
      try {
        const response = await axios.get('http://localhost:8000/api/numbers');
        this.totalCount = response.data.numbers.length;
        this.numbers = response.data.numbers;
      } catch (error) {
        console.log('error', error);
      }
    },
    paginate(data) {
      if (data && data.length) {
        const start = this.limit * (this.currentPage - 1);
        const end = this.limit * this.currentPage;
        return data.slice(start, end);
      }
      return false;
    },
    sort(data, order) {
      const removePrefix = obj => Number(obj.value.replace(/-/g, ''));
      switch (order) {
        case 'ascending':
          return data.sort((a, b) => removePrefix(a) - removePrefix(b));
        case 'descending':
          return data.sort((a, b) => removePrefix(b) - removePrefix(a));
        default:
          return data;
      }
    }
  },
  computed: {
    paginatedNumbers() {
      if (this.numbers.length) {
        const start = this.limit * (this.currentPage - 1);
        const end = this.limit * this.currentPage;
        const numbers = this.sort(this.numbers, this.order);
        return numbers.slice(start, end);
      }
      return [];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
nav.panel {
  width: 100%;
  height: 100%;
}
/* a {
  color: #3273dc;
} */
button {
  color: #3273dc;
}
button:hover {
  border-color: #dc375f;
  cursor: pointer;
}
.select:not(.is-multiple) {
  margin: 0.25rem;
}
.pagination-link[disabled] {
  background-color: #3273dc;
  border-color: #3273dc;
  color: #fff;
}
.panel-block #list {
  padding: 0.2rem;
}
</style>
