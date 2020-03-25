<template>
<div class="card card--player">
  <img class="card-img-top" :src="imgSrc" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">
        <b>{{playerName}} {{playerSurname}}</b>
    </h5>

    <div class="card-text">
        <p>
            <!-- player short info -->
        </p>
    </div>
    <a class="btn btn-primary" @click="openPlayer()">Go to player</a>
  </div>
</div>
</template>
 
<script>
import { getPlayerImg } from "@/components/utility/player";
import { getCommentsCount } from "@/components/utility/comment.js";

export default {
name: 'Player-card-wall',
data() {
    return {}
},
props: {
    player: { type: Object },
    imgSrc: { type: String },
    playerName: { type: String },
    playerSurname: { type: String }
},
computed: {
},
watch: {},
mounted() {},
async created() {
    await this.getPlayerCommentsCount()
},
methods: {
    openPlayer(player = this.player) {
        const mappedPlayer = {
            dateOfBirth: player.birthDate,
            firstName: player.name,
            heightInMeters: player.height,
            lastName: player.surname,
            leagues:{
                standard: {
                    jersey: player.jerseyNumber
                }
            },
            playerId: player.playerId
        }
        
        this.$store.commit("showPlayerCardFullView");
        this.$store.commit('clearSelectedPlayer');
        this.$store.commit("setSelectedPlayer", mappedPlayer);
    }
}
}
</script>

<style lang='scss'>
.card {
    &--player {
        width: 12rem !important;

        .card-title {
            font-size: 1.2rem !important;
        }

        .card-img-top {
            height: 14rem;
        }
    }
}
</style>