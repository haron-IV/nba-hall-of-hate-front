<template>
  <article class="mt-3">
    <Player-card></Player-card>
  </article>
</template>

<script>
// @ is an alias to /src
import PlayerCard from '@/components/player/PlayerCard';

export default {
  name: "Home",
  components: {
    'Player-card': PlayerCard
  }
};
</script>
