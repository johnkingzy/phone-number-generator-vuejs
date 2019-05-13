<template>
  <section class="section">
      <div class="container">
        <nav class="panel">
          <div class="panel-heading">
            List of Generated Phone Numbers
          </div>
          <div class="panel-block">
            <button class="button is-link is-outlined is-fullwidth">
              Generate
            </button>
          </div>
          <p v-if="!numbers.length" class="panel-block">
            You haven't generated any phone number
          </p>
          <a v-for="number in paginatedNumbers" :key="number.id" class="panel-block">
            <span class="panel-icon">
              <i class="fas fa-mobile-alt" aria-hidden="true"></i>
            </span>
            {{number.value}}
          </a>
            <div class="panel-block">
              <nav class="pagination" role="navigation" aria-label="pagination">
                <a class="pagination-previous" title="This is the first page" disabled>Previous</a>
                <a class="pagination-next">Next page</a>
                <ul class="pagination-list">
                  <li v-for="i in (totalCount / limit)" :key="i">
                    <a @click="currentPage = i" class="pagination-link"
                      aria-label="Goto page 2">{{i}}</a>
                  </li>
                </ul>
              </nav>
            </div>
        </nav>
      </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      numbers: [],
      currentPage: 1,
      limit: 10,
      totalCount: 0
    }
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
    }
  },
  computed: {
    paginatedNumbers() {
      if (this.numbers.length) {
        const start = this.limit * (this.currentPage - 1);
        const end = this.limit * this.currentPage;
        return this.numbers.slice(start, end);
      }
      return []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
a {
  color: #3273dc;
}
</style>
