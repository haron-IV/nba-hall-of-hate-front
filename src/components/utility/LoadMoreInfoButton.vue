<template>
<button type="button" class="btn btn-outline-success btn--load-more" @click="loadMorePlayers(playersCount)">
    <Icon name="down-arrow" width="12" height="12" class="icon" style="margin: 0 5px;"/>
    <span>Load more</span>
    <Icon name="down-arrow" width="12" height="12" class="icon" style="margin: 0 5px;"/>
</button> 
</template>
 
<script>
    export default {
    name: '',
    data() {
        return {}
    },
    props: {
        playersCount: { type: Number }
    },
    computed: {},
    watch: {},
    mounted() {},
    created() {},
    methods: {
        async loadMorePlayers(playersCount) {
            this.playersCount = playersCount + (playersCount / 2);
            await this.getPlayers();
        },

        async getPlayers() {
            await Axios.get( `${host_origin()}/api/players/${this.playersCount}`,axiosHeaders() ).then( 
                res => {
                this.wall.players = res.data;
                }, err => {console.error(err);}
            );
        },
    }
}
</script>

<style lang='scss'>
</style>   