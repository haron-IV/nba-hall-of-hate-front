<template>
  <article class="mt-3">
    <Player-card-full v-if="$store.state.player.playerCardFullView" />

    <div class="card-columns" v-if="!$store.state.player.playerCardFullView">
      <Player-card-wall
      v-for="card in wall.players" 
      :key="card.playerId"
      :player="card"
      :imgSrc="imgSrc(card.name, card.surname)"
      :playerName="card.name"
      :playerSurname="card.surname"
      />
    </div>
  </article>
</template>

<script>
import Axios from "axios";
import { axiosHeaders, host_origin } from '@/components/utility/config';

import PlayerCardFull from '@/components/player/PlayerCardFull';
import PlayerCardWall from "@/components/player/PlayerCardWall";
import { getPlayerImg } from "@/components/utility/player";

export default {
  name: "Wall",
  components: {
    'Player-card-full': PlayerCardFull,
    'Player-card-wall': PlayerCardWall
  },
  data() {
    return {
      playersCount: 20,
      wall: {
        players: null
      }
    }
  },
  async created(){
    await this.getPlayers();
  },

  methods: {
    async getPlayers() {
      await Axios.get( `${host_origin()}/api/players/${this.playersCount}`,axiosHeaders() ).then( 
        res => {
          console.log("res", res);
          
          this.wall.players = res.data;
        }, err => {console.error(err);}
      );
    },

    imgSrc(name, surname) {
      return getPlayerImg(name, surname)
    }
  }
};
</script>

<style lang="scss">
.card-columns {
  // TODO: breakepoints
  column-count: 6;
}
</style>