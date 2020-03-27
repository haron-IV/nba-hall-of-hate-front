<template>
<div class="add-comment-modal" id="addCommentModal" tabindex="-1" aria-labelledby="exampleModalLabel" v-show="$store.state.player.commentBox.isVisibleAddCommentModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
                <span>Add</span>
                <button class="btn btn-change-comment-type" @click="toggleCommentType($store.state.player.commentBox.commentType)">{{$store.state.player.commentBox.commentType}}</button>
                <span>comment</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="modal-body">
            <form @submit.prevent>
                <div class="form-group" v-if="withSetNickname">
                    <label for="recipient-name" class="col-form-label">Set nickname:</label>
                    <Icon name="question" width="12" height="12" style="margin: 0 0 2px 2px; cursor: help" title="this nickname will be stored and reusable in future for your actions."/>
                    <input type="text" class="form-control" id="recipient-name" v-model="userNickname" >
                </div>
                <div class="form-group">
                    <label for="message-text" class="col-form-label">Comment:</label>
                    <textarea class="form-control" id="message-text" v-model="commentContent" @keyup.enter="addComment()"></textarea>
                </div>
            </form>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-add-comment" @click="addComment(), getCommentsCount()">
                <span class="btn-add-comment__text">Add comment</span>
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
import { getCommentsCount } from "@/components/utility/comment.js";
import { setUserNickname } from "@/components/utility/identifier.js";

import Icon from "@/components/utility/Icon";

export default {
  name: "Add-comment-modal",
  components: { 
    Icon
  },
  data() {
    return {
        userNickname: null,
        commentContent: null
    }
  },
  props: {
    withSetNickname: { type: Boolean, default: true }
  },
  watch: {},
  created(){},
  computed: {},
  methods: {
    async addComment() {
        const commentType = this.$store.state.player.commentBox.commentType;

        if (this.checkIsEmpty()) {
            await Axios.post( `${host_origin()}/api/player-comment/${commentType}`, { 
                playerId: this.$store.state.player.selectedPlayer.playerId,
                author: this.userNickname,
                createdDate: new Date(`${new Date().toString().split('GMT')[0]} UTC`).toISOString(),
                content: this.commentContent,
                commentLike: 0,
                commentDislike: 0
            },
            axiosHeaders() ).then( res => {
                switch(commentType) {
                    case 'hate':
                        this.$store.state.player.playerComments.hate.push(res.data);
                        break;
                    case 'respect':
                        this.$store.state.player.playerComments.respect.push(res.data);
                        break;
                };

                setUserNickname(this.userNickname);
            }, err => {
                console.error(err);
            });
        }
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
    },

    getCommentsCount(){
        // TODO: fix this. counting load after seond click
        getCommentsCount(this.$store.state.player.selectedPlayer.playerId, this);
    },

    closeModal() {
        this.$store.state.player.commentBox.isVisibleAddCommentModal = false;
    },

    checkIsEmpty() {
        if (this.userNickname === null || this.userNickname === "") {
            this.$store.commit("showError", "Your nickname can't be empty.");
            return false;
        } else if (this.commentContent === null || this.commentContent === "") {
            this.$store.commit("showError", "Comment can't be empty.");
            return false
        }
        this.closeModal();
        this.$store.commit("hideError");
        
        return true;
    },

    setUserNickname() {

    }
  }
};
</script>

<style lang="scss">
.add-comment-modal {
    position: fixed;
    min-width: $full-width;
    justify-self: center;
    align-self: center;

    .btn-change-comment-type {
        text-transform: lowercase;
        font-family: Arial, sans-serif;
        font-size: $regular-font-size;
        font-weight: 400;
        opacity: .85;
        margin-top: 1px;
        padding: $margin-horizontal-small;
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