const loadMoreInfo = {
    wallPlayers: {
        playersOnPage: 24,
        players: null
    },

    commentPlayers: {
        
    }
};

const setPlayersOnPage = (state: any, count: Number) => {
    state.loadMoreInfo.wallPlayers.playersOnPage = count;
};

const setWallPlayers = (state: any, players: Object) => {
    state.loadMoreInfo.wallPlayers.players = players;
}

export { loadMoreInfo, setPlayersOnPage, setWallPlayers};