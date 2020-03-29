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

import { addUser } from "@/components/utility/identifier.js";
// import { POST } from "@/components/utility/requests.js";

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
  },
  created() {
    // this.$store.commit("setUserNickname", getUserObject().nickname);

    addUser();
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $link--dark-blue;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $link--dark-blue;

    &.router-link-exact-active {
      color: $link--green;
    }
  }
}
</style>
