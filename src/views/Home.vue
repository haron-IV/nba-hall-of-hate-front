<template>
  <article class="mt-3">
    <!-- <Player-card></Player-card> -->
    <Player-card-full v-if="$store.state.player.playerCardFullView"></Player-card-full>
  </article>
</template>

<script>
// @ is an alias to /src
import PlayerCard from '@/components/player/PlayerCard';
import PlayerCardFull from '@/components/player/PlayerCardFull';

export default {
  name: "Home",
  components: {
    'Player-card': PlayerCard,
    'Player-card-full': PlayerCardFull
  }
};
</script>
