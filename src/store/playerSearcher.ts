const playerSearcher = {
    searcherList: false
};

const showSearcherList = (state: any) => {
    state.playerSearcher.searcherList = true;
};

const hideSearcherList = (state: any) => {
    state.playerSearcher.searcherList = false;
}


export { playerSearcher, showSearcherList, hideSearcherList };