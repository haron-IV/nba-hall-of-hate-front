<template>
    <div class="comment">
        <div id="collapseTwo"
        class="collapse"
        :class="{ show : showComment }"
        aria-labelledby="headingTwo"
        data-parent="#accordion">

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
                    <button class="btn btn--spam" title="report as spam">
                        <Icon name="spam" />
                    </button>
                    <p>{{comment.content}}</p>
                    
                    <div class="like-section">
                        <button class="btn">
                            <Icon name="like" class="btn__icon"/>
                            <span class="count">{{comment.commentLike}}</span>
                        </button>
                        
                        <button class="btn">
                            <Icon name="dislike" class="btn__icon"/>
                            <span class="count">{{comment.commentDislike}}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "@/components/utility/Icon";

export default {
    name: 'Player-card-collapse-comment',
    data(){
        return {
            showComment: true
        }
    },
    props: {
        comment: { type: Object }
    },
    components: {
        Icon
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
    border-bottom: 1px solid $light-border-black;
    box-shadow: 0px 3px 5px 0px $box-shadow-super-light;

    &:first-child {
        margin-bottom: 0;
    }
    
    .card-body {
        display: flex;

        .comment-info {
            display: flex;
            flex-direction: column;
            justify-content: center;

            border: 1px solid $light-border-black;
            border-width: 0 1px 0 0;
            padding-right: 1rem;
        }
        .comment-date {
            width: max-content;
        }
        .comment__content {
            flex-grow: inherit;
            display: flex;
            flex-direction: column;

            .btn {
                &--spam {
                    align-self: flex-end;
                    position: absolute;
                }

                &__icon {
                    opacity: .2;
                    transition: opacity ease-in-out 400ms;
                }
            }

            .like-section {
                display: flex;
                justify-content: center;

                .btn {
                    display: flex;
                    flex-direction: column;

                    &:hover {
                        .btn__icon {
                            opacity: 1;
                        }
                    }
                    
                    .count {
                        margin-top: .3rem;
                        color: $half-black;
                        width: -webkit-fill-available;
                    }
                }
            }
        }
    }
}
</style>