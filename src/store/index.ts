import Vue from "vue";
import Vuex from "vuex";

import { playerComments, clearSelectedPlayer, setPlayerCommentsHateCount, setPlayerCommentsRespectCount } from '@/store/player';
import { playerSearcher, showSearcherList, hideSearcherList } from '@/store/playerSearcher';
import { commentBox, showPlayerCommentBox } from '@/store/commentBox';
import { errors, showError, hideError } from "@/store/errors";

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
      commentBox,
      playerComments
    },
    playerSearcher,
    errors
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
    setPlayerCommentsHateCount: (state, count) => setPlayerCommentsHateCount(state, count),
    setPlayerCommentsRespectCount: (state, count) => setPlayerCommentsRespectCount(state, count),

    showSearcherList: state => showSearcherList(state),
    hideSearcherList: state => hideSearcherList(state),

    showError: (state, data) => showError(state, data),
    hideError: state => hideError(state)
  },

  getters: {},

  actions: {
  },
  modules: {}
});
