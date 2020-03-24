const commentBox = {
  hate: false,
  respect: false,
  isVisibleAddCommentModal: false,
  commentType: null,
  buttonVisibility: { 
    hate: false, 
    respect: false 
  }
};


const showPlayerCommentBox = (state: any, which: any) => {
    if (which === "hate") {
      state.player.commentBox.hate = !state.player.commentBox.hate;
    } else if (which === 'respect'){
      state.player.commentBox.respect = !state.player.commentBox.respect;
    }
};

export { commentBox, showPlayerCommentBox };