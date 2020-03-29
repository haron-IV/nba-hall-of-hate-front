import { GET, POST } from "./requests.js";

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

const checkIsUserExist = () => {
    if (localStorage.getItem("user") === null) return false;
    return true;
};

const getUserObject = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const addUser = async () => {
    if (checkIsUserExist() === false){
        POST("/api/user/add", { username: "" }, 
            res => {
                const user = createUserObject();
                user.id = res.data.userId;
                localStorage.setItem( "user", JSON.stringify(user) );
            }
        );
    }
};

// const addNickname = async (id) => {
//     GET(`/api/user/check/${id}`, 
//         res => {
//             if (res.data.userId) {

//             }
//         }
//     )
// };

export { getUserObject, setUserNickname, addUser };


// check if user exist in database
// if exist do nothing
// if not -> add then:
// 1: get user id from response and sava it in ss