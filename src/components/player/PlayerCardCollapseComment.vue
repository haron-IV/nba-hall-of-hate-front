<template>
    <div class="comment">
        <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" 
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
                @click="toggleComment()">
                    Collapsible Group Item #2
                </button>
            </h5>
        </div>

        <div id="collapseTwo"
        class="collapse"
        :class="{ show : showComment }"
        aria-labelledby="headingTwo"
        data-parent="#accordion">
            
            <!-- comment owner nickname -->
            <!-- comment owner img -->
            <!-- comment likes -->
            <!-- raport - spam -->
            <!-- each comment should be uncollapse -->
            <!-- each comment should have max long -->

            <div class="card-body">
                <div class="comment-info">
                    <p class="user-name">
                        Tommy
                    </p>

                    <p class="comment-date">
                        10.02.2020
                    </p>
                </div>

                <div class="comment-content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur porro hic soluta dolorem eveniet fugit ex autem ad eum inventore nihil, perspiciatis, ullam exercitationem officiis facere possimus placeat molestiae. Nihil!
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Player-card-collapse-comment', 
    props:{},
    data(){
        return {
            showComment: false
        }
    },
    methods:{
        toggleComment(){
            this.showComment = !this.showComment;
        }
    },
};
</script>

<style lang="scss" scoped>
.card-body {
    display: flex;

    .comment-info {
        border: 1px solid rgba(#000, .1);
        border-width: 0 1px 0 0;
        padding-right: 1rem;
    }
}
</style>