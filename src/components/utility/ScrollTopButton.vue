<template>
    <button class="btn bmd-btn-fab btn--scroll-top" @click="scrollTop()" v-if="limit > 35 && showScrollButton">
        <Icon name="down-arrow" 
        width="12" 
        height="12" 
        class="icon"/>
    </button>
</template>
 
<script>
import Icon from "@/components/utility/Icon";

export default {
    name: 'Scroll-top-button',
    components: { Icon },
    data() {
        return {
            showScrollButton: true
        }
    },
    props: {
        limit: { type: Number }
    },
    computed: {},
    watch: {},
    mounted() {},
    created() {},
    methods: {
        scrollTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            this.showScrollButton = false;
        }
    }
}
</script>

<style lang='scss'>
.btn {
    &--scroll-top {
        position: fixed;
        align-self: flex-end;
        right: 25px;
        bottom: 10px;
        transform: rotate(180deg);

        .icon {
            margin-bottom: -3px;
            animation-name: jumping;
            animation-duration: 900ms;
            animation-iteration-count: infinite;
            animation-play-state: running;
        }

        @keyframes jumping {
            0% { transform: translateY(-2px); }
            100% { transform: translateY(2px); }
        }
    }
}
</style>