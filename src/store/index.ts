import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    urlApiNba: 'https://api-nba-v1.p.rapidapi.com',
    headersAuth: {
      "x-rapidapi-host":"api-nba-v1.p.rapidapi.com",
      "x-rapidapi-key":"4137e79b32msh43112b0a5a690e6p170fe7jsnab0eef0292ea"
    },
    player: {
      playerCardFullView: false,
      selectedPlayer: null
    }
  },
  mutations: {
    showPlayerCardFullView(state) {
      state.player.playerCardFullView = true;
    },

    setSelectedPlayer(state, player) {
      state.player.selectedPlayer = player; 
    }
  },
  actions: {},
  modules: {}
});
