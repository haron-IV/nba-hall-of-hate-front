<template>
  <article class="mt-3">
    <Player-card-full v-if="$store.state.player.playerCardFullView"></Player-card-full>
  </article>
</template>

<script>
// @ is an alias to /src
import PlayerCardFull from '@/components/player/PlayerCardFull';

export default {
  name: "Home",
  components: {
    'Player-card-full': PlayerCardFull
  }
};
</script>
