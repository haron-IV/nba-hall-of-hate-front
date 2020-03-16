const clearSelectedPlayer = (state : any) => {
  state.player.selectedPlayer = null;
};

const showPlayerCommentBox = (state: any, which: any) => {
  if (which === "hate") {
    state.player.commentBox.hate = !state.player.commentBox.hate;
  } else if (which === 'respect'){
    state.player.commentBox.respect = !state.player.commentBox.respect;
  }
};

export { clearSelectedPlayer, showPlayerCommentBox };
