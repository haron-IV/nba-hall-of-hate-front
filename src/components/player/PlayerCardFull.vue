<template>
    <div class="card text-center" @click="$store.commit('hideSearcherList')">
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
                        <b>Hate:</b> {{hateCount}}
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Respect:</b> {{respectCount}}
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <b>Followers:</b> {{followCount}}
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

            <Player-button-comment-toggle /> 

            <div class="container-fluid player-feed-box">
                <Player-card-collapse
                    v-show="$store.state.player.commentBox.hate"
                    spacer="mr-2"
                    title="Hate"
                    heading=""
                    :comments="playerFeedBox.hateComments"
                />
                
                <Player-card-collapse
                    v-show="$store.state.player.commentBox.respect"
                    spacer="ml-2"
                    title="Respect"
                    heading=""
                    :comments="playerFeedBox.respectComments"
                />
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';

import Icon from '@/components/utility/Icon';
import { axiosHeaders, host_origin } from '@/components/utility/config';
import { getPlayerImg } from '@/components/utility/player.js';

import PlayerCardCollapse from '@/components/player/PlayerCardCollapse';
import PlayerButtonCommentToggle from '@/components/player/PlayerButtonCommentToggle';


export default {
  name: "Player-card",
  components: {
    'Player-card-collapse': PlayerCardCollapse,
    Icon,
    'Player-button-comment-toggle': PlayerButtonCommentToggle
  },
  data() {
    return {
        playerFeedBox: {
            hate: false,
            respect: false,
            hateComments: null,
            respectComments: null
        },
        hateCount: null,
        respectCount: null,
        followCount: null
    }
  },

  watch: {
    async '$store.state.player.selectedPlayer'() {
        await this.requestPack();
    }
  },
  
  async created(){
    await this.requestPack();
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
        await Axios.post( `${host_origin()}/api/player`, {
            playerId: this.$store.state.player.selectedPlayer.playerId,
            name: this.$store.state.player.selectedPlayer.firstName,
            surname: this.$store.state.player.selectedPlayer.lastName,
            jerseyNumber: this.playerNumber, 
            height: this.$store.state.player.selectedPlayer.heightInMeters,
            birthDate: this.$store.state.player.selectedPlayer.dateOfBirth,
            hateCount: 0,
            respectCount: 0,
            followCount: 0
        }, axiosHeaders() ).then( res => {}, err => {
            console.error(err);
        });
    },
    async getPlayer() {
        const id = this.$store.state.player.selectedPlayer.playerId;
    
        await Axios.get(`${host_origin()}/api/player/${id}`, axiosHeaders() ).then( 
            res => {
                const player = this.$store.state.player.selectedPlayer;

                if (res.data) {
                    this.hateCount = res.data.hateCount;
                    this.respectCount = res.data.respectCount;
                    this.followCount = res.data.followCount;
                }

                this.$store.commit("setSelectedPlayer", player);
            },
            err => {
                console.error(err);
            }
        );
    },
    async getPlayerHateComments() {
        await Axios.get(`${host_origin()}/api/player-comments/hate/${this.$store.state.player.selectedPlayer.playerId}`, axiosHeaders() ).then( res => {
            this.playerFeedBox.hateComments = res.data;
        });
    },
    async getPlayerRespectComments() {
        await Axios.get(`${host_origin()}/api/player-comments/respect/${this.$store.state.player.selectedPlayer.playerId}`, axiosHeaders() ).then( res => {
            this.playerFeedBox.respectComments = res.data;
        });
    },
    async requestPack() {
        // all request needed for update player components
        await this.setPlayer();
        await this.getPlayer();
        await this.getPlayerHateComments();
        await this.getPlayerRespectComments();
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