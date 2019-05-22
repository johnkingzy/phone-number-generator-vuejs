<template>
  <div id="app">
    <div class="columns">
      <div class="column container is-flex">
        <Jumbotron/>
      </div>
      <div class="column container is-flex">
        <div class="card is-flex">
          <Main/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Main from './components/Main'
import Jumbotron from './components/Jumbotron'

export default {
  name: 'App',
  components: {
    Main,
    Jumbotron
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #009fff; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #009fff, #ec2f4b); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #009fff, #ec2f4b)
}
#app {
  height: 100vh;
}
#app > .columns {
  height: 100%;
}
#app > .columns > .column {
  align-items: center;
  justify-content: center;
}
.card {
  width: 40rem;
  align-self: center;
  justify-self: center;
}
</style>
