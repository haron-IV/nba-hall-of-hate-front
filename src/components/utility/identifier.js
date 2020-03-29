import { v4 as uuid } from 'uuid';
import { GET, POST, PUT } from "./requests.js";

const createUserObject = () => {
    return {
        id: null,
        nickname: null
    };
};

const setUserObject = (userObject) => {
    localStorage.setItem("user", userObject);
};

const setUserNickname = (id, nickname) => {
    if (getUserObject().nickname !== null || getUserObject().nickname !== "") {
        PUT(`/api/user/update/${id}/${nickname}`);
    }
    
    const user = getUserObject();
    user.nickname = nickname;
    setUserObject(JSON.stringify(user));
};

const checkIsUserExist = () => {
    if (localStorage.getItem("user") === null) return false;
    return true;
};

const getUserObject = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const addUser = async () => {
    if (checkIsUserExist() === false){
        POST("/api/user/add", { username: uuid().slice(0, 8) }, 
            res => {
                const user = createUserObject();
                user.id = res.data.userId;
                localStorage.setItem( "user", JSON.stringify(user) );
            }
        );
    }
};

export { getUserObject, setUserNickname, addUser };