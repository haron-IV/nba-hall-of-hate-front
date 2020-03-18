<template>
    <div class="comment">
        <!-- <div class="card-header" id="headingTwo">
            <h5 class="mb-0">
                <button class="btn btn-link collapsed" 
                data-toggle="collapse"
                data-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
                @click="toggleComment()">
                    {{comment.content.slice(0, 30)}}...
                    TODO: here should be a few words from comment content -- as title
                </button>
            </h5>
        </div>  -->

        <div id="collapseTwo"
        class="collapse"
        :class="{ show : showComment }"
        aria-labelledby="headingTwo"
        data-parent="#accordion">
            <!-- each comment should be uncollapse -->

            <div class="card-body">
                <div class="comment-info">
                    <p class="user-name">
                        <b> {{comment.author}} </b>
                    </p>

                    <p class="comment-date">
                        <i> {{comment.createdDate.slice(0, 10)}} </i>
                    </p>
                </div>

                <div class="comment__content pl-1">
                    <!-- raport - spam -->
                    <p>{{comment.content}}</p>
                    
                    <div class="like-section">
                        <button class="btn">
                            <icon name="like" class="btn__icon"/>
                            <span class="count">{{comment.commentLike}}</span>
                        </button>
                        
                        <button class="btn">
                            <icon name="dislike" class="btn__icon"/>
                            <span class="count">{{comment.commentDislike}}</span>
                        </button>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
import likeIcon from "@/components/utility/Icon";

export default {
    name: 'Player-card-collapse-comment', 
    props:{},
    data(){
        return {
            showComment: true
        }
    },
    props: {
        comment: { type: Object }
    },
    components: {
        icon: likeIcon
    },
    methods:{
        toggleComment(){
            this.showComment = !this.showComment;
        }
    },
};
</script>

<style lang="scss" scoped>
.comment {
    margin-bottom: .5rem;
    border-bottom: 1px solid rgba(0, 0, 0, .2);
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.30);

    &:last-child {
        margin-bottom: 0;
    }
    
    .card-body {
        display: flex;

        .comment-info {
            display: flex;
            flex-direction: column;
            justify-content: center;

            border: 1px solid rgba(#000, .1);
            border-width: 0 1px 0 0;
            padding-right: 1rem;
        }
        .comment-date {
            width: max-content;
        }
        .comment__content {
            flex-grow: inherit;

            .like-section {
                display: flex;
                justify-content: center;;

                .btn {
                    display: flex;
                    flex-direction: column;

                    &__icon {
                        opacity: .2;
                        transition: opacity ease-in-out 400ms;
                    }

                    &:hover {
                        .btn__icon {
                            
                            opacity: 1;
                        }
                    }
                    

                    .count {
                        margin-top: .3rem;
                        color: rgba(0, 0, 0, .5);
                        width: -webkit-fill-available;
                    }
                }
            }
        }
    }
}
</style>