<template>
<div class="add-comment-modal" id="addCommentModal" tabindex="-1" aria-labelledby="exampleModalLabel" v-show="$store.state.player.commentBox.isVisibleAddCommentModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
                <span>Add</span>
                <button class="btn btn-change-comment-type" @click="toggleCommentType($store.state.player.commentBox.commentType.toLowerCase())">{{$store.state.player.commentBox.commentType.toLowerCase()}}</button>
                <span>comment</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$store.state.player.commentBox.isVisibleAddCommentModal = false">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Set nickname:</label>
                    <input type="text" class="form-control" id="recipient-name" v-model="userNickname">
                </div>
                <div class="form-group">
                    <label for="message-text" class="col-form-label">Comment:</label>
                    <textarea class="form-control" id="message-text" v-model="commentContent"></textarea>
                </div>
            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-add-comment">
                <span class="btn-add-comment__text" @click="addComment()">Add comment</span>
                <Icon :name="$store.state.player.commentBox.commentType" v-if="$store.state.player.commentBox.commentType" width="30" height="30" />
            </button>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import Axios from 'axios';

import { axiosHeaders, host_origin } from '@/components/utility/config';
import Icon from "@/components/utility/Icon";

export default {
  name: "Add-comment-modal",
  components: { Icon },
  data() {
    return {
        userNickname: null,
        commentContent: null
    }
  },
  props: {},
  watch: {},
  created(){},
  computed: {},
  methods: {
    async addComment() {
        const commentType = this.$store.state.player.commentBox.commentType.toLowerCase();

        await Axios.post( `${host_origin()}/api/player-comment/${commentType}`, { 
            playerId: this.$store.state.player.selectedPlayer.playerId,
            author: this.userNickname,
            createdDate: new Date(`${new Date().toString().split('GMT')[0]} UTC`).toISOString(),
            content: this.commentContent,
            commentLike: 0,
            commentDislike: 0
        },
        axiosHeaders() ).then( res => {}, err => {
            console.error(err);
        });
    },

    toggleCommentType(commentType) {
        
        switch(commentType) {
            case 'hate':
                this.$store.state.player.commentBox.commentType = "respect";
                break;
            case 'respect':
                this.$store.state.player.commentBox.commentType = "hate";
                break;
        }
    }
  }
};
</script>

<style lang="scss">
.add-comment-modal {
    position: fixed;
    min-width: 100%;
    justify-self: center;
    align-self: center;

    .btn-change-comment-type {
        text-transform: lowercase;
        font-family: Arial, sans-serif;
        font-size: 1.15rem;
        font-weight: 400;
        opacity: .85;
        margin-top: 1px;
        padding: 0 .5rem;
    }

    .btn-add-comment {
        display: flex;
        justify-content: center;
        align-items: center;

        &__text {
            margin: 5px 10px 0 0;
        }
    }
}

</style>