<template>
<div class="content">
    <button class="btn btn-add btn-add--hate" 
    v-if="!disabledButton"
    @click="addPoint(type)">
        <Icon name="add" />
    </button>
    <span class="number" :style="{margin: disabledButtonMargin}">{{count}}</span>
</div> 
</template>
 
<script>
import Axios from "axios";
import { axiosHeaders, host_origin } from '@/components/utility/config';

import Icon from "@/components/utility/Icon";

export default {
name: '',
data() {
    return {
        disabledButtonMargin: 0
    }
},
components: {
    Icon
},
props: {
    count: { type: Number },
    type: { type: String },
    disabledButton: { type: Boolean, default: false },
},
computed: {},
watch: {},
mounted() {},
created() {},
methods: {
    addPoint(type) {
        switch(type) {
            case "Hate": {
                Axios.put( `${host_origin()}/api/player/addHate`, {
                    playerId: this.$store.state.player.selectedPlayer.playerId
                }, axiosHeaders() ).then( res => {
                    this.count = res.data.hateCount;
                }, err => {});
                break;
            };

            case "Respect": {
                Axios.put( `${host_origin()}/api/player/addRespect`, {
                    playerId: this.$store.state.player.selectedPlayer.playerId
                }, axiosHeaders() ).then( res => {
                    this.count = res.data.respectCount;
                }, err => {});
                break;
            };
        }
    }
}
}
</script>

<style lang='scss'>
.content {
    .number {
        min-width: 50px;
    }
}
</style>