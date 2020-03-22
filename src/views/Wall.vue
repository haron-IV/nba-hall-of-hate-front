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
    
    <button type="button" class="btn btn-outline-success btn--load-more" >
      <Icon name="down-arrow" width="12" height="12" class="icon" style="margin: 0 5px;"/>
      <span>Load more</span>
      <Icon name="down-arrow" width="12" height="12" class="icon" style="margin: 0 5px;"/>
    </button>
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

export default {
  name: "Wall",
  components: {
    'Player-card-full': PlayerCardFull,
    'Player-card-wall': PlayerCardWall,
    Icon
  },
  data() {
    return {
      vm: this,
      playersCount: 24,
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
@keyframes bounce {
  0% { transform: translateY(-1px) }
  100% { transform: translateY(1px) }
}

.icon {
  animation-name: bounce;
  animation-duration: 700ms;
  animation-timing-function: ease;
  animation-iteration-count: infinite;

  animation-play-state: paused; 
}

.btn--load-more {
  &:hover {
    .icon {
      animation-play-state: running; 
    }
  }
}
</style>