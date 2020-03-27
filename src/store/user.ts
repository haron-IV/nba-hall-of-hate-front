const user = {
    id: null,
    nickname: null
};

const setUserId = (state: any, id: String) => {
    state.user.id = id;
};

const setUserNickname = (state: any, nickname: String) => {
    state.user.nickname = nickname;
}

export { user, setUserId, setUserNickname };