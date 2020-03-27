import uuid from "uuid/v4";

const generateId = () => {
    return uuid();
};

const createUserObject = () => {
    return user = {
        id: generateId(),
        nickname: null
    };
};

const setUserObject = (userObject) => {
    localStorage.setItem("user", userObject);
};

const setUserNickname = (nickname) => {
    const user = getUserObject();
    user.nickname = nickname;
};

const checkIsUserExist = () => {
    if (localStorage.getItem("user") === null) return false;
    return true;
};

const identifier = () => {
    if (checkIsUserExist() === false) {
        const user = JSON.stringify(createUserObject());
        localStorage.setItem("user", user);
    };
};

const getUserObject = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export { identifier, getUserObject };