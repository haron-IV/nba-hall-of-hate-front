import { v4 as uuid } from 'uuid';

const generateId = () => {
    return uuid();
};

const createUserObject = () => {
    return {
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
    setUserObject(user);
};

const checkIsUserExist = () => {
    if (localStorage.getItem("user") === null) return false;
    return true;
};

const identifier = () => {
    if (checkIsUserExist() === false) {
        const user = JSON.stringify(createUserObject());
        setUserObject(user);
    };
};

const getUserObject = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export { identifier, getUserObject };