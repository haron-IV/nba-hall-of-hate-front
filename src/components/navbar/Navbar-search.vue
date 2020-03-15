<template>
    <div class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2 width-15rem"
        type="text"
        placeholder="Search player by last name"
        aria-label="Search"
        v-on:keyup.enter.prevent="searchPlayers()"
        @focus="searcherList = true"
        v-model="searchingContent">

        <button class="btn btn-outline-success my-2 my-sm-0" @click="searchPlayers()">Search player</button>

        <ul class="list-group list-group--search" v-if="response !== null && searcherList">
            <a class="list-group-item" v-for="player in response" :key="player.playerId" @click="showPlayerCard(player), closeSearchList()">
                <div class="bmd-list-group-col item-info">
                    <img :src="playerImg(player.firstName, player.lastName)" class="img" v-show="playerImg(player.firstName, player.lastName)">
                    <div class="information">
                        <p class="list-group-item-heading">{{player.firstName}} {{player.lastName}}</p>
                        <p class="list-group-item-text">{{player.dateOfBirth}}</p>
                    </div>
                </div>
            </a>
        </ul>
    </div>
</template>

<script>
import Axios from "axios";
import debounce from "lodash/debounce";
import uniq from "lodash/uniq";

import { getPlayerImg } from '@/components/utility/player.js';

export default {
  components: {},
  data(){
    return {
        searchingContent: null,
        searcherList: false,
        response: null
    }
  },
  watch: {
    searchingContent(){
        this.searchPlayers();
    }
  },
  computed: {
  },
  methods: {
    searchPlayers: debounce( function() {
        this.response = null;

        Axios.get( this.$store.state.urlApiNba + "/players/lastName" + `/${this.searchingContent}`, { params:{}, headers: this.$store.state.headersAuth })
        .then((res) => {
            if (res.status === 200){
                this.response = this.removeDoubledPlayers(res.data.api.players);
                this.showSearchList();
            }
        }).catch((err) => {})
    }, 1000),

    playerImg(name, lastName) {
        return getPlayerImg(name, lastName)
    },

    removeDoubledPlayers(players) {
        return [...new Map(players.map(item => [item['dateOfBirth'], item])).values()]
    },

    showSearchList() {
        this.searcherList = true;
    },

    closeSearchList() {
        this.searcherList = false;
    },

    showPlayerCard(player) {
        this.$store.commit("showPlayerCardFullView");
        this.$store.commit('clearSelectedPlayer');
        this.$store.commit("setSelectedPlayer", player);
    }
  }
}
</script>

<style lang="scss">

.list-group {
    &--search{
        position: absolute;
        top: 3rem;
        border: 1px solid gray;
        border-width: 0px 0px 1px;
    }

    .list-group-item {
        font-family: Helvetica;
        justify-content: center;
        border-radius: 2px;
        cursor: pointer;
        transition: all ease-in-out 450ms;

        &:hover {
            background: lighten(rgba(gray, .50), 40%);
            .list-group-item-heading {
                text-shadow: 1px 1px 3px rgba(#000, .65);
            }
            .img {
                transform: scale(1.1);
            }
        }
        .list-group-item-heading {
            transition: all ease-in-out 450ms;
        }

        .item-info{
            flex-direction: row;

            .img {
                transition: all ease-in-out 450ms;
                max-width: 65px;
                height: auto;
            }
        }
    }
}

.width-15rem {
    width: 15rem !important;
}
</style>
