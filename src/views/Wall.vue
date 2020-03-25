<template>
  <article class="mt-3">
    <Player-card-full v-if="$store.state.player.playerCardFullView" />

    <div class="card-columns" v-if="!$store.state.player.playerCardFullView">
      <Player-card-wall
      v-for="card in $store.state.loadMoreInfo.wallPlayers.players"
      :key="card.playerId"
      :player="card"
      :imgSrc="imgSrc(card.name, card.surname)"
      :playerName="card.name"
      :playerSurname="card.surname"
      />
    </div>
    
    <Load-more-info-button v-if="!$store.state.player.playerCardFullView && $store.state.loadMoreInfo.wallPlayers.players.length >= 24"
    which="wallPlayers"
    :function="getPlayers"/>
  </article>
</template>

<script>
import Axios from "axios";
import { axiosHeaders, host_origin } from '@/components/utility/config';

import Icon from "@/components/utility/Icon";
import { getCommentsCount } from "@/components/utility/comment.js";
import PlayerCardFull from '@/components/player/PlayerCardFull';
import PlayerCardWall from "@/components/player/PlayerCardWall";
import { getPlayerImg } from "@/components/utility/player";
import LoadMoreInfoButton from "@/components/utility/LoadMoreInfoButton";

export default {
  name: "Wall",
  components: {
    'Player-card-full': PlayerCardFull,
    'Player-card-wall': PlayerCardWall,
    Icon,
    'Load-more-info-button': LoadMoreInfoButton
  },
  data() {
    return {
      vm: this,
      playersCount: 24
    }
  },
  async created(){
    await this.getPlayers();
  },

  methods: {
    imgSrc(name, surname) {
      return getPlayerImg(name, surname)
    },

    async getPlayers() {
      await Axios.get( `${host_origin()}/api/players/${this.$store.state.loadMoreInfo.wallPlayers.playersOnPage}`,axiosHeaders() ).then( 
        res => {
        this.$store.commit("setWallPlayers", res.data);
        }, err => {console.error(err);}
      );
    },
  }
};
</script>

<style lang="scss">
.card-columns {
  // TODO: breakepoints
  column-count: 6;
}
</style>