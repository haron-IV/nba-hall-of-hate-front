<template>
 <div class="alert alert-danger" role="alert" v-if="$store.state.errors.error.isVisible">
    This is a danger alert—check it out!
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
    created() {},
    methods: {}
}
</script>

<style lang='scss'>
</style>