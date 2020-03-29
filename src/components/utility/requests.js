import Axios from "axios";
import { axiosHeaders, host_origin } from "./config.js";

const GET = async (path, responseMethod, errorMethod) => {
    await Axios.get(`${host_origin()}${path}`, axiosHeaders() ).then( 
        res => {
            responseMethod(res);
        },
        err => {
            errorMethod(err);
        }
    );
};

export { GET };