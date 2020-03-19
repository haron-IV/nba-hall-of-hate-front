import Vue from "vue";
import Vuex from "vuex";

import { clearSelectedPlayer, showPlayerCommentBox } from '@/store/player';
import { playerSearcher, showSearcherList, hideSearcherList } from '@/store/playerSearcher';

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
      selectedPlayer: null,
      commentBox: {
        hate: false,
        respect: false,
        isVisibleAddCommentModal: false
      }
    },
    playerSearcher
  },
  mutations: {
    showPlayerCardFullView(state) {
      state.player.playerCardFullView = true;
    },

    setSelectedPlayer(state, player) {
      state.player.selectedPlayer = player; 
    },

    clearSelectedPlayer: state => clearSelectedPlayer(state),
    showPlayerCommentBox: (state, which) => showPlayerCommentBox(state, which),

    showSearcherList: state => showSearcherList(state),
    hideSearcherList: state => hideSearcherList(state)
  },

  getters: {
    // SelectedPlayer(state) {
    //   return state.player.selectedPlayer;
    // }
  },

  actions: {
  },
  modules: {}
});
