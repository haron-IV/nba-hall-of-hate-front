<template>
<button type="button" class="btn btn-outline-success btn--load-more" @click="loadMorePlayers()">
    <Icon name="down-arrow" width="12" height="12" class="icon" style="margin: 0 5px;"/>
    <span>Load more</span>
    <Icon name="down-arrow" width="12" height="12" class="icon" style="margin: 0 5px;"/>
</button> 
</template>
 
<script>
    export default {
    name: 'Load-more-info-button',
    data() {
        return {}
    },
    props: {
        playersCount: { type: Number },
        function: { type: Function }
    },
    computed: {},
    watch: {},
    mounted() {},
    created() {},
    methods: {
        async loadMorePlayers() {
            const count = this.$store.state.loadMoreInfo.wallPlayers.playersOnPage;
            this.$store.commit("setPlayersOnPage", count + Math.round(count / 2));
            await this.function();
        }
    }
}
</script>

<style lang='scss'>
</style>   