<template>
<div id="accordion" class="collapse-box" v-bind:class="this.spacer">
    <div class="card">
        <div class="card-header" id="headingOne">
            <h5 class="mb-0">
                <button class="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    {{title}}
                    <!-- TODO: click make full width for this column for better reading -->
                </button>
            </h5>
            
            <button type="button" class="btn btn-primary bmd-btn-fab">
                <Icon name="hate" parentStyle="background-color: red !important;"/>
            </button>

        </div>

        <div id="" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
                {{heading}}        
            </div>
        </div>
    </div>

    <div class="card">
        <!-- card will be generated -->
        <!-- add specyfic id to each card -->
        <Player-card-collapse-comment></Player-card-collapse-comment>
    </div>
</div>
</template>

<script>
import PlayerCardCollapseComment from '@/components/player/PlayerCardCollapseComment';
import Icon from '@/components/utility/Icon';

export default {
    name: 'Player-card-collapse', 
    components: {
        "Player-card-collapse-comment": PlayerCardCollapseComment,
        Icon
    },
    props: {
        spacer: { type: String },
        title: { type: String },
        heading: { type: String }
    },
    methods:{}
};
</script>

<style lang="scss">
.collapse-box {
    flex-grow: 1;
}
</style>