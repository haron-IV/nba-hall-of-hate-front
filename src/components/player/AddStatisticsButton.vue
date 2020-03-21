<template>
<div class="content">
    <button class="btn btn-add btn-add--hate">
        <Icon name="add" />
    </button>
    <span class="number">{{hateCount}}</span>
</div> 
</template>
 
<script>
import Icon from "@/components/utility/Icon";

export default {
name: '',
data() {
    return {}
},
components: {
    Icon
},
props: {
    hateCount: { type: Number }
},
computed: {},
watch: {},
mounted() {},
created() {},
methods: {}
}
</script>

<style lang='scss'>
</style>