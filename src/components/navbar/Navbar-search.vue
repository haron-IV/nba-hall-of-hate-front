<template>
    <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchingContent">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search player</button>

        <ul class="list-group list-group--search" v-if="response !== null">
            <a class="list-group-item" v-for="player in response" :key="player.playerId">
                <div class="bmd-list-group-col item-info">
                    <img :src="getPlayerImg(player.firstName, player.lastName)" class="img">
                    <div class="information">
                        <p class="list-group-item-heading">{{player.firstName}} {{player.lastName}}</p>
                        <p class="list-group-item-text">{{player.dateOfBirth}}</p>
                    </div>
                </div>
            </a>
        </ul>
    </form>
</template>

<script>
import Axios from "axios";
import debounce from "lodash/debounce";

export default {
  components: {},
  data(){
    return {
        searchingContent: null,
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
        Axios.get( this.$store.state.urlApiNba + "/players/lastName" + `/${this.searchingContent}`, { params:{}, headers: this.$store.state.headersAuth })
        .then((res) => {
            if (res.status === 200){
                this.response = res.data.api.players;
            }
        }).catch((err) => {})
    }, 1000),

    getPlayerImg(playerName, playerLastName){
        // return `https://nba-players.herokuapp.com/players/${playerLastName}/${playerName}`

        return `http://d2cwpp38twqe55.cloudfront.net/req/202002141/images/players/${playerLastName.toLowerCase().slice(0, 5)}${playerName.toLowerCase().slice(0, 2)}01.jpg`
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
        justify-content: center;
        border-radius: 2px;
        cursor: pointer;

        &:hover {
            background: lighten(rgba(gray, .50), 40%);
        }

        .item-info{
            flex-direction: row;

            .img {
                max-width: 65px;
                height: auto;
            }
        }
    }
}
</style>
