<template>
  <div id="app" @click="hidePlayerSearcher($event)">
    <main class="container-fluid">
      <Navbar />
      <Error-modal />
      <router-view />
    </main>
  </div>
</template>

<script>
/* eslint-disable */
import Navbar from '@/components/navbar/Navbar';
import ErrorModal from "@/components/modals/ErrorModal";

export default {
  components: {
    Navbar,
    "Error-modal": ErrorModal
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
