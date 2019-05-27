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
            @click="currentPage = currentPage + 1;"
            :disabled="currentPage == totalCount/limit"
          >Next page</button>
          <ul class="pagination-list">
            <li>
              <a
                @click="order = 'ascending'; currentPage = 1"
                :disabled="order == 'ascending'"
                class="pagination-link ascending"
              >
                <span class="icon is-small">
                  <i class="fas fa-caret-up"></i>
                </span>
              </a>
            </li>
            <li>
              <a
                @click="order = 'recent'; currentPage = 1"
                :disabled="order == 'recent'"
                class="pagination-link recent"
              >
                <span class="icon is-small">
                  <i class="fas fa-history"></i>
                </span>
              </a>
            </li>
            <li>
              <a
                @click="order = 'descending'; currentPage = 1"
                :disabled="order == 'descending'"
                class="pagination-link descending"
              >
                <span class="icon is-small">
                  <i class="fas fa-caret-down"></i>
                </span>
              </a>
            </li>
            <li>
              <button
                @click="generateNumbers()"
                class="pagination-link generate"
              >Generate Numbers</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div id="page-info" class="panel-block">
      <div class="column is-flex">
        <div>
          <span style="text-transform: capitalize;">Sorting: {{order}}</span>
        </div>
        <div class="is-pulled-right">
          <span>Page {{currentPage}} of {{totalCount / limit}}</span>
        </div>
      </div>
    </div>
    <p v-if="!numbers.length" class="panel-block">You haven't generated any phone number</p>
    <!-- Add this tag to enable fade animation -->
    <!-- <transition-group name="list" tag="div"> -->
      <div
        v-for="number in paginatedNumbers"
        :key="number.id"
        class="panel-block"
        id="list"
      >
        <div class="column is-one-quarter is-flex" id="list-item">
          <p>
            <span class="icon is-small">
              <i class="fas fa-mobile-alt" aria-hidden="true"></i>
            </span>
            <span style="vertical-align: text-bottom;">
              {{number.value}}
            </span>
          </p>
        </div>
        <div class="column">
          <p class="is-pulled-right is-size-7 has-text-grey">
            {{new Date(number.timestamp).toUTCString().replace(' GMT', '')}}
          </p>
        </div>
      </div>
    <!-- </transition-group> -->
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Main',
  data() {
    return {
      numbers: [],
      // paginatedNumbers: [], // This is also required for animation
      currentPage: 1,
      limit: 10,
      totalCount: 0,
      order: 'recent'
    };
  },
  methods: {
    generateNumbers() {
      const getPromise = axios.get(`${process.env.API_URL}/api/numbers`);
      getPromise
        .then((response) => {
          this.totalCount = response.data.numbers.length;
          this.numbers = response.data.numbers;
        })
      return getPromise;
    },
    sort(value, order) {
      const data = JSON.parse(JSON.stringify(value));
      switch (order) {
        case 'ascending':
          return data.sort((a, b) => this.removePrefix(a) - this.removePrefix(b));
        case 'descending':
          return data.sort((a, b) => this.removePrefix(b) - this.removePrefix(a));
        case 'recent':
          return data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        default:
          return data;
      }
    },
    removePrefix(obj) {
      return Number(obj.value.replace(/-/g, ''));
    }
  },
  mounted() {
    this.generateNumbers();
  },
  /**
   * Take out the computed property and replace with asyncComputed below
   * It sets the value asynchronously with a timeout of 5s
   * - Required for animating list of numbers
   */
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
  // asyncComputed: {
  //   paginate() {
  //     if (this.numbers.length) {
  //       const self = this;
  //       const start = this.limit * (this.currentPage - 1);
  //       const end = this.limit * this.currentPage;
  //       const numbers = this.sort(this.numbers, this.order);
  //       this.paginatedNumbers = [];
  //       setTimeout(() => {
  //         self.paginatedNumbers = numbers.slice(start, end);
  //       }, 500);
  //     }
  //   }
  // }
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
nav.pagination {
  width: 100%;
}
/* a {
  color: #7c5eed;
} */
button {
  color: #623cea;
}
button.generate {
  width: 100%;
  color: #fff;
  background: #623cea;
  border: navajowhite;
  border-radius: 2rem;
}
button:hover, a:hover {
  border-color: #623cea;
  cursor: pointer;
}
.panel-block {
  border-left: none;
  border-right: none;
  color: #616994;
}
.select:not(.is-multiple) {
  margin: 0.25rem;
}
.list-enter-active, .list-leave-active {
  transition: opacity .5s;
}
.list-enter, .list-leave-to {
  opacity: 0;
}

.pagination-link {
  color: #623cea;
}
.pagination-next {
  margin-right: .8rem;
}

.pagination-previous {
  margin-left: .8rem;
}
.pagination-link,
.pagination-next,
.pagination-previous
{
  background-color: #fff;
}
.pagination-link[disabled],
.pagination-next[disabled],
.pagination-previous[disabled],
#page-info {
  background-color: #f2f4ff;
  color: #623cea;
}
#page-info > .column {
  justify-content: space-between;
  padding: .5em 1.4em;
}
#list {
  padding: .5em 1.4em;
}
.panel-block #list-item {
  padding: 0.2rem;
  margin: 0 10px;
}
#list-item .icon {
  color: #623cea;
}
.panel-block:first-child {
  border-top: none;
}
.panel-block:last-child {
  border-bottom: none;
}
</style>
