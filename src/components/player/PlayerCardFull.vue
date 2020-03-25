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

            <button class="btn btn--close" @click="closePlayerCard()">
                <Icon name="add" style="transform: rotate(45deg)"/>
            </button>
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
                    <li class="list-group-item list-group-item--statistics d-flex justify-content-between align-items-center">
                        <header class="header">Hate:</header>
                        <Add-statistics-button class="btn--add" 
                        :count="hateCount"
                        type="Hate"/>
                    </li>
                    <li class="list-group-item list-group-item--statistics d-flex justify-content-between align-items-center">
                        <header class="header">Respect:</header> 
                        <Add-statistics-button 
                        :count="respectCount" 
                        type="Respect"/>
                    </li>
                    <li class="list-group-item list-group-item--statistics d-flex justify-content-between align-items-center">
                        <header class="header">Followers:</header> 
                        <Add-statistics-button :count="followCount" :disabledButton="true"/>
                    </li>
                    <li class="list-group-item list-group-item--statistics d-flex justify-content-between align-items-center">
                        <b>Hate points:</b> [in future]
                    </li>
                    <li class="list-group-item list-group-item--statistics d-flex justify-content-between align-items-center">
                        <b>Hate lvl:</b> [in future]
                    </li>
                </ul>

                <div style="max-height: 175px; align-self: center">
                    <img :src="playerImg($store.state.player.selectedPlayer.firstName, $store.state.player.selectedPlayer.lastName)" alt="" class="img ml-3" >
                    <p style="font-size: .6rem">Views: {{views}}</p>
                </div>
            </div>

            <Player-button-comment-toggle /> 

            <div class="container-fluid player-feed-box">
                <Player-card-collapse
                    v-show="$store.state.player.commentBox.hate"
                    spacer="mr-2"
                    title="Hate"
                    :comments="$store.state.player.playerComments.hate"
                    :commentsCount="$store.state.player.playerComments.count.hate"
                />
                
                <Player-card-collapse
                    v-show="$store.state.player.commentBox.respect"
                    spacer="ml-2"
                    title="Respect"
                    :comments="$store.state.player.playerComments.respect"
                    :commentsCount="$store.state.player.playerComments.count.respect"
                />
            </div>

            <Load-more-info-button
            v-if="$store.state.player.commentBox.hate || $store.state.player.commentBox.respect"
            which="playerComments"
            :function="getPlayerComments"/>

        </div>

        <Scroll-top-button :limit="playerFeedBox.commentsLimit"/>
        <Add-comment-modal />
    </div>
</template>

<script>
import Axios from 'axios';

import Icon from '@/components/utility/Icon';
import { axiosHeaders, host_origin } from '@/components/utility/config';
import { getPlayerImg } from '@/components/utility/player.js';
import { getCommentsCount } from "@/components/utility/comment.js"
import { formatNumbers } from "@/components/utility/formatBigNumbers.js";

import PlayerCardCollapse from '@/components/player/PlayerCardCollapse';
import PlayerButtonCommentToggle from '@/components/player/PlayerButtonCommentToggle';
import AddCommentModal from '@/components/utility/AddCommentModal';
import AddStatisticsButton from "@/components/player/AddStatisticsButton";
import LoadMoreInfoButton from "@/components/utility/LoadMoreInfoButton";
import ScrollTopButton from "@/components/utility/ScrollTopButton";

export default {
  name: "Player-card",
  components: {
    'Player-card-collapse': PlayerCardCollapse,
    Icon,
    'Player-button-comment-toggle': PlayerButtonCommentToggle,
    'Add-comment-modal': AddCommentModal,
    'Add-statistics-button': AddStatisticsButton,
    'Load-more-info-button': LoadMoreInfoButton,
    'Scroll-top-button': ScrollTopButton
  },
  data() {
    return {
        playerFeedBox: {
            hate: false,
            respect: false,
            hateComments: null,
            respectComments: null,
            commentsLimit: 20
        },
        hateCount: null,
        respectCount: null,
        followCount: null,
        views: null
    }
  },
  computed: {},

  watch: {
    async '$store.state.player.selectedPlayer'() {
        await this.requestPack();
    }
  },
  
  async created(){
    await this.requestPack();
    await this.getCommentsCount();
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
            views: 0,
            name: this.$store.state.player.selectedPlayer.firstName,
            surname: this.$store.state.player.selectedPlayer.lastName,
            jerseyNumber: this.playerNumber, 
            height: this.$store.state.player.selectedPlayer.heightInMeters,
            birthDate: this.$store.state.player.selectedPlayer.dateOfBirth,
            hateCount: 0,
            respectCount: 0,
            followCount: 0
        }, axiosHeaders() ).then( res => {}, err => {});
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
                    this.views = formatNumbers(res.data.views);
                }

                this.$store.commit("setSelectedPlayer", player);
            },
            err => {
                console.error(err);
            }
        );
    },
    async getPlayerHateComments() {
        await Axios.get(`${host_origin()}/api/player-comments/hate/${this.$store.state.player.selectedPlayer.playerId}/${this.playerFeedBox.commentsLimit}`, axiosHeaders() ).then( res => {
            this.$store.state.player.playerComments.hate = res.data;
        });
    },
    async getPlayerRespectComments() {
        await Axios.get(`${host_origin()}/api/player-comments/respect/${this.$store.state.player.selectedPlayer.playerId}/${this.playerFeedBox.commentsLimit}`, axiosHeaders() ).then( res => {
            this.$store.state.player.playerComments.respect = res.data;
        });
    },

    async getPlayerComments() {
        this.playerFeedBox.commentsLimit = this.playerFeedBox.commentsLimit + 20;
        await this.getPlayerHateComments();
        await this.getPlayerRespectComments();
    },

    async getCommentsCount() {
        const id = this.$store.state.player.selectedPlayer.playerId;
        
        getCommentsCount(id, this);
    },
    async requestPack() {
        // all request needed for update player components
        await this.setPlayer();
        await this.getPlayer();
        await this.getPlayerHateComments();
        await this.getPlayerRespectComments();
    },

    closePlayerCard() {
        this.$store.state.player.playerCardFullView = false;
        this.$store.state.player.commentBox.buttonVisibility.hate = false;
        this.$store.state.player.commentBox.buttonVisibility.respect = false;
        this.$store.state.player.commentBox.hate = false;
        this.$store.state.player.commentBox.respect = false;
    }
  }
};
</script>

<style lang="scss">
.card-header {
    .btn--close {
        position: absolute;
        top: 0;
        right: 0;
    }
}

.card-body {
    .collapse-box {
        .card {
            flex-direction: column-reverse;
        }
    }
    .list-group {
        .list-group-item {
            &--statistics {
                &:hover {
                    .content {
                        .btn-add {
                            opacity: 1;
                        }
                    }
                }
                .header {
                    font-weight: 900;
                }
                .content {
                    display: flex;
                    align-items: center;

                    .btn-add {
                        transition: opacity ease-in-out 400ms;
                        opacity: 0;

                        img {
                            padding: 0;
                            margin: 0;
                        }

                        &--hate{
                            padding: .3rem .5rem;
                        }       
                    }
                }
            }
        }
    }
    .card-text {
        display: flex;
    }

    .player-feed-box {
        display: flex;   
    }
}
</style>