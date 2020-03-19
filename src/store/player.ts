const playerComments = {
  hate: null,
  respect: null
};

const clearSelectedPlayer = (state : any) => {
  state.player.selectedPlayer = null;
};

export { playerComments, clearSelectedPlayer };
