<template>
 <div class="alert alert-danger" role="alert" v-if="$store.state.errors.error.isVisible">
    {{$store.state.errors.error.content}}
</div>
</template>
 
<script>
    export default {
    name: 'Error-modal',
    data() {
        return {}
    },
    props: {},
    computed: {},
    watch: {},
    mounted() {},
    created() {
        this.autoRemoveError();
    },
    methods: {
        autoRemoveError() {
            setTimeout(() => {
                this.$store.commit("hideError")    
            }, 1000 * 15);
        }
    }
}
</script>

<style lang='scss'>
</style>