<template>
  <div id="app" @click="hidePlayerSearcher($event)">
    <main class="container-fluid">
      <Navbar />
      <router-view />
    </main>
  </div>
</template>

<script>
/* eslint-disable */

import Navbar from '@/components/navbar/Navbar';

export default {
  components: {
    Navbar
  },
  methods: {
    hidePlayerSearcher(event) {
      if (event.target.id !== "player-searcher") {
        this.$store.commit('hideSearcherList')
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
