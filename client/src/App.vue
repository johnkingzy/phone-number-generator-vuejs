<template>
  <div id="app">
    <div class="columns is-desktop">
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
html, #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #616994;
  background: #f2f4ff;
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
  width: 41rem;
  align-self: center;
  justify-self: center;
  border-radius: 1rem;
  margin: 10px;
  min-height: 46rem;
  overflow: hidden;
}
.has-text-primary {
  color: #623cea !important;
}
.has-text-accent {
  color: #616994 !important;
}
</style>
