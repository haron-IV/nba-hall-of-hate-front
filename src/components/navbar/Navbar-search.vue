<template>
    <div class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2 width-15rem"
        type="text"
        placeholder="Search player by last name"
        aria-label="Search"
        v-on:keyup.enter.prevent="searchPlayers()"
        v-model="searchingContent">

        <button class="btn btn-outline-success my-2 my-sm-0" @click="searchPlayers()">Search player</button>

        <ul class="list-group list-group--search" v-if="response !== null && searcherList">
            <a class="list-group-item" v-for="player in response" :key="player.playerId" @click="showPlayerCard(), closeSearchList()">
                <div class="bmd-list-group-col item-info">
                    <img :src="getPlayerImg(player.firstName, player.lastName)" class="img">
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

    removeDoubledPlayers(players) {
        return [...new Map(players.map(item => [item['dateOfBirth'], item])).values()]
    },

    getPlayerImg(playerName, playerLastName){
        // return `https://nba-players.herokuapp.com/players/${playerLastName}/${playerName}` <-- if way under have not anu pic of this player should us this api

        return `http://d2cwpp38twqe55.cloudfront.net/req/202002141/images/players/${playerLastName.toLowerCase().slice(0, 5)}${playerName.toLowerCase().slice(0, 2)}01.jpg`
    },

    showSearchList() {
        this.searcherList = true;
    },

    closeSearchList() {
        this.searcherList = false;
    },

    showPlayerCard() {
        this.$store.commit("playerCardFullViewToggle");
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
