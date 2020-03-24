const playerComments = {
  hate: null,
  respect: null,
  count: {
    hate: 0,
    respect: 0
  }
};

const clearSelectedPlayer = (state : any) => {
  state.player.selectedPlayer = null;
};

const setPlayerCommentsHateCount = (state: any, count: Number) => {
  state.player.playerComments.count.hate = count;
};

const setPlayerCommentsRespectCount = (state: any, count: Number) => {
  state.player.playerComments.count.respect = count;
};

export { playerComments, clearSelectedPlayer, setPlayerCommentsHateCount, setPlayerCommentsRespectCount };
