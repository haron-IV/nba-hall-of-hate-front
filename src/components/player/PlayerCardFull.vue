<template>
    <div class="card text-center">
        <div class="card-header">
            <ul class="nav nav-pills card-header-pills">
            <li class="nav-item">
                <a class="nav-link active" href="#">Show Statistics</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#"></a>
            </li>
            <li class="nav-item">
                <a class="nav-link disabled" title="This feature will be added soon :)" href="#">Follow</a>
            </li>
            </ul>
        </div>
        <div class="card-body">
            <h5 class="card-title">{{$store.state.player.selectedPlayer.firstName}} {{$store.state.player.selectedPlayer.lastName}}</h5>
            <div class="card-text">
                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Birth:</b> {{$store.state.player.selectedPlayer.dateOfBirth}} ({{playerAge}})
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Height:</b> {{$store.state.player.selectedPlayer.heightInMeters}}m
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Number:</b> {{playerNumber}}
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Hate points:</b> [in future]
                    </li>
                </ul>

                <img :src="playerImg($store.state.player.selectedPlayer.firstName, $store.state.player.selectedPlayer.lastName)" alt="" class="img ml-3">
            </div>
            <button class="btn btn-primary" @click="playerFeedBox = !playerFeedBox">Hate or Respect</button>

            <!-- should be a separated component -->
            <!-- container for 2 list like this (default hidden container) -->
            <div class="container-fluid player-feed-box" v-show="playerFeedBox">
                <Player-card-collapse 
                    spacer="mr-2"
                    title="Hate"
                    heading="Here is throwing meat."
                />
                
                <Player-card-collapse 
                    spacer="ml-2"
                    title="Respect"
                    heading="Here is throwning respect."
                />
            </div>
        </div>
    </div>
</template>

<script>
import PlayerCardCollapse from '@/components/player/PlayerCardCollapse';
import { getPlayerImg } from '@/components/utility/player.js';

export default {
  name: "Player-card",
  components: {
    'Player-card-collapse': PlayerCardCollapse
  },
  data() {
    return {
        player: {
            name: null,
            lastName: null,
            birth: null,
            id: null,
            height: null
        },
        playerFeedBox: false
    }
  },
  
  computed: {
    playerAge(){ 
        return new Date().getFullYear() - JSON.parse(this.$store.state.player.selectedPlayer.dateOfBirth.split('-')[0])
    },
    playerNumber(){
        const leagues = this.$store.state.player.selectedPlayer.leagues;

        if (leagues) {
            if (leagues.standard) {
                return leagues.standard.jersey
            }
        }
    }
  },

  methods: {
    playerImg(name, lastName) {
        return getPlayerImg(name, lastName);
    }
  }
};
</script>

<style lang="scss">
.card-body {
    .card-text {
        display: flex;

        .list-group {
            
        }   
    }

    .player-feed-box {
        display: flex;
    }
}

</style>