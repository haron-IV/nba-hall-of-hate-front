<template>
    <div class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2 width-15rem"
        id="player-searcher"
        type="text"
        placeholder="Search player by last name"
        aria-label="Search"
        v-on:keyup.enter.prevent="searchPlayers()"
        v-on:keyup="navigateListWithArrows($event)"
        @click="selectSearchText($event)"
        @focus="$store.commit('showSearcherList')"
        v-model="searchingContent">

        <button class="btn btn-outline-success my-2 my-sm-0" @click="searchPlayers()">Search player</button>

        <ul class="list-group list-group--search" v-if="$store.state.playerSearcher.searcherList" ref="searcherList">
            <Loader :visible="showLoader" />

            <a class="list-group-item list-group-item--player-searcher" v-for="player in response" 
            :key="player.playerId" 
            @click="showPlayerCard(player), closeSearchList()"
            :id="'searcher-list-el__' + player.playerId">
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
import Loader from '@/components/utility/Loader';

export default {
  components: { Loader },
  data(){
    return {
        searchingContent: null,
        searcherList: false,
        response: null,
        showLoader: false,
        arrowsList: {
            counter: -1,
            actualElement: null
        }
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
    searchPlayers: debounce( async function() {
        this.response = null;
        
        if (this.searchingContent != ""){
            this.showLoader = true;
            this.showSearchList();

            await Axios.get( this.$store.state.urlApiNba + "/players/lastName" + `/${this.searchingContent}`, { params:{}, headers: this.$store.state.headersAuth })
            .then((res) => {    
                if (res.status === 200 && res.data.api.players.length >= 1){
                    this.response = this.removeDoubledPlayers(res.data.api.players);
                    this.showLoader = false;
                }
            }).catch((err) => {});
        } else if (this.searchingContent == ""){
            this.showLoader = false;
        }
        
    }, 1000),

    playerImg(name, lastName) {
        return getPlayerImg(name, lastName);
    },

    removeDoubledPlayers(players) {
        return [...new Map(players.map(item => [item['dateOfBirth'], item])).values()];
    },

    showSearchList() {
        this.$store.commit("showSearcherList");
    },

    closeSearchList() {
        this.$store.commit("hideSearcherList");
    },

    showPlayerCard(player) {
        this.$store.commit("showPlayerCardFullView");
        this.$store.commit('clearSelectedPlayer');
        this.$store.commit("setSelectedPlayer", player);
    },

    selectSearchText(event) {
        event.target.select();
    },

    navigateListWithArrows(event) {
        const vm = this;

        switch(event.key) {
            case "ArrowDown": {
                if(this.arrowsList.counter < this.response.length - 1){
                    this.arrowsList.counter++;
                } else {
                    this.arrowsList.counter = 0;
                }
                break;
            };
            case "ArrowUp": {
                if(this.arrowsList.counter > -1 ){
                    this.arrowsList.counter--;
                } else {
                    this.arrowsList.counter = this.response.length - 1;
                }
                break;
            };
            case "Enter": {
                this.showPlayerCard(this.response[vm.arrowsList.counter]);
                this.closeSearchList();
                this.arrowsList.counter = -1;
                break;
            };
        }

        if (this.arrowsList.counter >= -1 ) {
            this.arrowsList.actualElement = this.response[vm.arrowsList.counter];
            this.scrollToSelectedElement()
        }
        
        this.removeHiglihtFromListElements();
        this.addHiglihtFromListElement(vm.arrowsList.actualElement.playerId);
    },

    addHiglihtFromListElement(playerId){
        document.querySelector(`#searcher-list-el__${playerId}`).classList.add("list-group-item--selected");
    },

    removeHiglihtFromListElements(){
        const list = [... document.querySelectorAll(".list-group-item--player-searcher")];
        
        for (const element of list) {
            element.classList.remove("list-group-item--selected");
        }
    },

    scrollToSelectedElement() {
        if (this.arrowsList.counter > 5){
            const increasedScrollTop = this.$refs.searcherList.scrollTop + this.$refs.searcherList.scrollHeight;

            this.$refs.searcherList.scrollTo({
                top: increasedScrollTop
            })
        }else {
            const increasedScrollTop = 0;

            this.$refs.searcherList.scrollTo({
                top: increasedScrollTop
            })
        }
    }
  }
}
</script>

<style lang="scss">
.list-group {
    &--search{
        padding-bottom: 0;
        max-height: 80vh;
        overflow: scroll;
        background-color:rgba(64, 208, 191, 0.02);
        min-width: 233px;
        position: absolute;
        top: 3rem;
        border: 1px solid gray;
        border-width: 0px 0px 1px;
        transition: none;
    }

    .list-group-item {
        font-family: Helvetica;
        justify-content: center;
        border-radius: 2px;
        cursor: pointer;
        transition: all ease-in-out 450ms;

        &--selected {
            transition: all ease 200ms;
            background-color: darken(rgba(64, 208, 191, 0.08), 50%);
            border: 1px solid rgba(64, 208, 191, 0.5);
            border-width: 1px 0 1px 0;
            box-shadow: -1px 3px 6px -2px rgba(0,0,0,0.75);
        }

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

            .information {
                width: 180px;
            }

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
