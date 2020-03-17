<template>
<div id="accordion" class="collapse-box" v-bind:class="this.spacer">
    <div class="card">
        <div class="card-header" id="headingOne">
            <h5 class="mb-0">
                <button class="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    {{title}}
                </button>
            </h5>
        </div>

        <div id="" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
            <div class="card-body">
                {{heading}}        
            </div>
        </div>
    </div>

    <div class="card">

        <!-- add searching only user comments and show in right place. Hate in hate and respect in respect -->
        <Player-card-collapse-comment v-for="comment in comments" :key="comment.commentId"/>
    </div>
</div>
</template>

<script>
import Axios from 'axios';
import { axiosHeaders, host_origin } from '@/components/utility/config';

import PlayerCardCollapseComment from '@/components/player/PlayerCardCollapseComment';
import Icon from '@/components/utility/Icon';

export default {
    name: 'Player-card-collapse', 
    components: {
        "Player-card-collapse-comment": PlayerCardCollapseComment,
        Icon
    },
    data() {
        return {
        }
    },
    props: {
        spacer: { type: String },
        title: { type: String },
        heading: { type: String },
        comments: { type: Object }
    },
    watch: {},
    
    methods:{}
};
</script>

<style lang="scss">
.collapse-box {
    flex-grow: 1;
}
</style>