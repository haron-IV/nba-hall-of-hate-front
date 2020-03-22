<template>
  <article class="mt-3">
    <h1>elo</h1>
    <Player-card-full v-if="$store.state.player.playerCardFullView"></Player-card-full>
  </article>
</template>


<script>
import PlayerCardFull from '@/components/player/PlayerCardFull';

export default {
  name: "About",
  components: {
    'Player-card-full': PlayerCardFull
  }
};
</script>