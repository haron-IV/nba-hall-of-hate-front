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
                    <li class="list-group-item d-flex justify-content-between align-items-center" v-if="$store.state.player.selectedPlayer.dateOfBirth">
                        <b>Birth:</b> {{$store.state.player.selectedPlayer.dateOfBirth}} ({{playerAge}})
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center" v-if="$store.state.player.selectedPlayer.heightInMeters">
                        <b>Height:</b> {{$store.state.player.selectedPlayer.heightInMeters}}m
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center" v-if="playerNumber != null">
                        <b>Number:</b> {{playerNumber}}
                    </li>

                    <p>
                        Hate Statistics:
                    </p>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Hate:</b> {{player.hateCount}}
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Respect:</b> {{player.respectCount}}
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Followers:</b> {{player.followCount}}
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Hate points:</b> [in future]
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Hate lvl:</b> [in future]
                    </li>
                </ul>

                <img :src="playerImg($store.state.player.selectedPlayer.firstName, $store.state.player.selectedPlayer.lastName)" alt="" class="img ml-3" style="max-height: 175px; align-self: center">
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
import Axios from 'axios';

import { axiosHeaders } from '@/components/utility/config';
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
            height: null,
            hateCount: null,
            respectCount: null,
            followCount: null
        },
        playerFeedBox: false
    }
  },

  watch: {},
  
  async onrender(){
    await this.getPlayer()
  },
  async updated(){
    await this.setPlayer();
    await this.getPlayer();
  },
  
  computed: {
    playerAge(){ 
        if (this.$store.state.player.selectedPlayer.dateOfBirth){
            return new Date().getFullYear() - JSON.parse(this.$store.state.player.selectedPlayer.dateOfBirth.split('-')[0])
        }
        
        return "";
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
    },
    async setPlayer() {
        Axios.post('http://localhost:8080/api/player', {
            playerId: this.$store.state.player.selectedPlayer.playerId,
            name: this.$store.state.player.selectedPlayer.firstName,
            surname: this.$store.state.player.selectedPlayer.lastName,
            jerseyNumber: this.playerNumber, 
            height: this.$store.state.player.selectedPlayer.heightInMeters,
            birthDate: this.$store.state.player.selectedPlayer.dateOfBirth,
            hateCount: 0,
            respectCount: 0,
            followCount: 0
        }, axiosHeaders() );
    },
    async getPlayer() {
        const id = this.$store.state.player.selectedPlayer.playerId;

        setTimeout(() => {
            Axios.get(`http://localhost:8080/api/player/${id}`, axiosHeaders() ).then( res => {
                const player = this.$store.state.player.selectedPlayer;
                

                player.hateCount = res.data.hateCount;
                player.respectCount = res.data.respectCount;
                player.followCount = res.data.followCount;

                this.player.hateCount = res.data.hateCount;
                this.player.respectCount = res.data.respectCount;
                this.player.followCount = res.data.followCount;
                

                this.$store.commit("setSelectedPlayer", player);
                console.log("PLAYER: ", this.$store.state.player.selectedPlayer);
            });    
        }, 550);
        
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