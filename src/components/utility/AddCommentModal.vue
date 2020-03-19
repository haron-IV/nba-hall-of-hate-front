<template>
<div class="add-comment-modal" id="addCommentModal" tabindex="-1" aria-labelledby="exampleModalLabel" v-show="$store.state.player.commentBox.isVisibleAddCommentModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New message</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$store.state.player.commentBox.isVisibleAddCommentModal = false">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
            <div class="form-group">
                <label for="recipient-name" class="col-form-label">Recipient:</label>
                <input type="text" class="form-control" id="recipient-name">
            </div>
            <div class="form-group">
                <label for="message-text" class="col-form-label">Message:</label>
                <textarea class="form-control" id="message-text"></textarea>
            </div>
            </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Send message</button>
        </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "Add-comment-modal",
  components: {},
  props: {
  },
  watch: {},
  created(){},
  computed: {},
  methods: {}
};
</script>

<style lang="scss">
.add-comment-modal {
    position: fixed;
    min-width: 100%;
    justify-self: center;
    align-self: center;
}

</style>