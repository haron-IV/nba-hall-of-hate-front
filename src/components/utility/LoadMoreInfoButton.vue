<template>
<button type="button" class="btn btn-outline-success btn--load-more" @click="loadMore()">
    <Icon name="down-arrow" width="12" height="12" class="icon" style="margin: 0 5px;"/>
    <span>Load more</span>
    <Icon name="down-arrow" width="12" height="12" class="icon" style="margin: 0 5px;"/>
</button> 
</template>
 
<script>
import Icon from "@/components/utility/Icon";

export default {
    name: 'Load-more-info-button',
    components: { Icon },
    data() {
        return {}
    },
    props: {
        which: { type: String },
        function: { type: Function }
    },
    computed: {},
    watch: {},
    mounted() {},
    created() {},
    methods: {
        async loadMore(){
            switch(this.which){
                case "wallPlayers": {
                    await this.loadMorePlayers();
                    break;
                };
                case "playerComments": {
                    await this.loadMoreComments();
                    break;
                }
            }            
        },
        async loadMorePlayers() {
            const count = this.$store.state.loadMoreInfo.wallPlayers.playersOnPage;
            this.$store.commit("setPlayersOnPage", count + Math.round(count / 2));
            await this.function();
        },

        async loadMoreComments() {
            await this.function();
        }
    }
}
</script>

<style lang='scss'>
@keyframes bounce {
  0% { transform: translateY(-1px) }
  100% { transform: translateY(1px) }
}

.icon {
  animation-name: bounce;
  animation-duration: 700ms;
  animation-timing-function: ease;
  animation-iteration-count: infinite;

  animation-play-state: paused; 
}

.btn--load-more {
  &:hover {
    .icon {
      animation-play-state: running; 
    }
  }
}
</style>