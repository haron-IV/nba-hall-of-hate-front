import Axios from 'axios';
import { axiosHeaders, host_origin } from '@/components/utility/config';

const getCommentsCount = async (id, vm) => {
    await Axios.get(`${host_origin()}/api/player-comments/${id}/count`, axiosHeaders() ).then( 
        res => {
            vm.$store.commit("setPlayerCommentsHateCount", res.data.hateCount);
            vm.$store.commit("setPlayerCommentsRespectCount", res.data.respectCount);
        },
        err => {
            console.error(err);
        }
    );
};

export { getCommentsCount };