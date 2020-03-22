import Axios from 'axios';
import { axiosHeaders, host_origin } from '@/components/utility/config';

const getCommentsCount = async (id, vm) => {
    let response = null;

    await Axios.get(`${host_origin()}/api/player-comments/${id}/count`, axiosHeaders() ).then( 
        res => {
            vm.$store.commit("setPlayerCommentsHateCount", res.data.hateCount);
            vm.$store.commit("setPlayerCommentsRespectCount", res.data.respectCount);
            
            response = res.data;
        },
        err => {
            console.error(err);
        }
    );

    return response;
};

export { getCommentsCount };