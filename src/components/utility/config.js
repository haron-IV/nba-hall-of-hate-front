const axiosHeaders = () => {
    return { 
        params:{}, headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    }
}

// Here you can set enpoints base usrl for nba hoh api
const host_origin = () => {
    const dev = "http://localhost:8080";
    const prod = null;

    return dev;
}

export { axiosHeaders, host_origin };