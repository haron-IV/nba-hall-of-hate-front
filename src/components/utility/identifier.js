// import { v4 as uuid } from 'uuid';
import { GET, POST } from "./requests.js";

// const generateId = () => {
//     return uuid();
// };

const createUserObject = () => {
    return {
        id: null,
        nickname: null
    };
};

const setUserObject = (userObject) => {
    localStorage.setItem("user", userObject);
};

const setUserNickname = (nickname) => {
    const user = getUserObject();
    user.nickname = nickname;
    setUserObject(JSON.stringify(user));
};
////////////////////////////////////////////////////////////////

const checkIsUserExist = () => {
    if (localStorage.getItem("user") === null) return false;
    return true;
};

const identifier = () => {
    // if (checkIsUserExist() === false) {
    //     const user = createUserObject();
    //     setUserObject(JSON.stringify(user));
    // };
};



const getUserObject = () => {
    return JSON.parse(localStorage.getItem("user"));
};
//////////////////////////////////////////////////////////////



const addUser = async () => {
    // check if exist
    POST("/api/user/add", { username: "" }, 
        res => {
            const user = createUserObject();
            user.id = res.data.userId;
            localStorage.setItem( "user", JSON.stringify(user) );
        }
    );
};













export { identifier, getUserObject, setUserNickname, addUser};







// check if user exist in database
// if exist do nothing
// if not -> add then:
// 1: get user id from response and sava it in ss



