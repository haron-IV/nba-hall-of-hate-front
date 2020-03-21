<template>
<div class="content">
    <button class="btn btn-add btn-add--hate" v-if="!disabledButton">
        <Icon name="add" />
    </button>
    <span class="number" :style="{margin: disabledButtonMargin}">{{count}}</span>
</div> 
</template>
 
<script>
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
    disabledButton: { type: Boolean, default: false }
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